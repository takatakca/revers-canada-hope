import "@tanstack/react-start/server-only";

import { randomUUID } from "node:crypto";

import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Json } from "@/integrations/supabase/types";
import { postTakatakEvent, type TakatakEventEnvelope } from "./client";
import { requireOutboxMutation, retryDelaySeconds } from "./outbox-state";

export type EnqueueTakatakEventInput = {
  eventType: string;
  sourceEntityType: string;
  sourceEntityId: string;
  idempotencyKey: string;
  occurredAt?: string;
  workspaceId?: string | null;
  customerId?: string | null;
  payload: Record<string, unknown>;
};

export async function enqueueTakatakEvent(
  input: EnqueueTakatakEventInput,
): Promise<{ eventId: string }> {
  const eventId = randomUUID();
  const envelope: TakatakEventEnvelope = {
    eventId,
    eventType: input.eventType,
    version: "1",
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    workspaceId: input.workspaceId ?? null,
    customerId: input.customerId ?? null,
    payload: input.payload,
  };

  const { error } = await supabaseAdmin.from("takatak_outbox").insert({
    event_id: eventId,
    event_type: envelope.eventType,
    version: envelope.version,
    source_system: "revers",
    source_workspace: envelope.workspaceId,
    source_entity_type: input.sourceEntityType,
    source_entity_id: input.sourceEntityId,
    idempotency_key: input.idempotencyKey,
    occurred_at: envelope.occurredAt,
    payload: envelope.payload as Json,
    status: "pending",
    attempts: 0,
    next_attempt_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Unable to enqueue TAKATAK event: ${error.message}`);
  }

  return { eventId };
}

export async function deliverPendingTakatakEvents(
  limit = 25,
): Promise<{ delivered: number; retried: number; failed: number }> {
  const result = { delivered: 0, retried: 0, failed: 0 };

  // Recover work left in processing by a worker that died.
  const { error: recoveryError } = await supabaseAdmin
    .from("takatak_outbox")
    .update({
      status: "retrying",
      next_attempt_at: new Date().toISOString(),
      last_error: "Recovered stale processing event.",
    })
    .eq("status", "processing")
    .lt(
      "updated_at",
      new Date(Date.now() - 10 * 60_000).toISOString(),
    );
  if (recoveryError) {
    throw new Error("Unable to recover stalled TAKATAK outbox rows.");
  }

  const { data, error } = await supabaseAdmin
    .from("takatak_outbox")
    .select(
      "id,event_id,event_type,version,source_workspace,source_entity_type,source_entity_id,occurred_at,payload,status,attempts",
    )
    .in("status", ["pending", "retrying"])
    .lte("next_attempt_at", new Date().toISOString())
    .order("next_attempt_at", { ascending: true })
    .limit(limit);

  if (error) throw new Error(`Unable to read TAKATAK outbox: ${error.message}`);

  for (const row of data ?? []) {
    const claim = await supabaseAdmin
      .from("takatak_outbox")
      .update({ status: "processing" })
      .eq("id", row.id)
      .in("status", ["pending", "retrying"])
      .select("id")
      .maybeSingle();

    if (claim.error) throw new Error("Unable to claim pending TAKATAK outbox event.");
    // Another worker can claim the same candidate first; this is not an error.
    if (!claim.data) continue;

    const event: TakatakEventEnvelope = {
      eventId: row.event_id,
      eventType: row.event_type,
      version: row.version,
      occurredAt: row.occurred_at,
      workspaceId: row.source_workspace,
      customerId: null,
      payload:
        row.payload && typeof row.payload === "object" && !Array.isArray(row.payload)
          ? (row.payload as Record<string, unknown>)
          : {},
    };

    try {
      await postTakatakEvent(event);
      const acknowledgement = await supabaseAdmin
        .from("takatak_outbox")
        .update({
          status: "delivered",
          delivered_at: new Date().toISOString(),
          last_error: null,
        })
        .eq("id", row.id)
        .eq("status", "processing")
        .select("id")
        .maybeSingle();
      // The remote POST alone is not a durable acknowledgement. If this
      // fails, retry with the same event_id (TAKATAK must deduplicate it).
      requireOutboxMutation("delivery acknowledgement", acknowledgement);
      result.delivered += 1;
    } catch (error) {
      const attempts = row.attempts + 1;
      const permanent = attempts >= 8;
      const message =
        error instanceof Error ? error.message.slice(0, 1000) : "Unknown error";

      const retryState = await supabaseAdmin
        .from("takatak_outbox")
        .update({
          status: permanent ? "failed" : "retrying",
          attempts,
          last_error: message,
          next_attempt_at: new Date(
            Date.now() + retryDelaySeconds(attempts) * 1000,
          ).toISOString(),
        })
        .eq("id", row.id)
        .eq("status", "processing")
        .select("id")
        .maybeSingle();
      // If even retry persistence fails, return HTTP 503 to the scheduler.
      // Never report successful delivery/retry for a missing DB write.
      requireOutboxMutation("retry state", retryState);
      if (permanent) result.failed += 1;
      else result.retried += 1;
    }
  }

  return result;
}
