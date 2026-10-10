import "server-only";

import { randomUUID } from "node:crypto";

import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { postTakatakEvent, type TakatakEventEnvelope } from "./client";

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
    payload: envelope.payload,
    status: "pending",
    attempts: 0,
    next_attempt_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Unable to enqueue TAKATAK event: ${error.message}`);
  }

  return { eventId };
}

function retryDelaySeconds(attempts: number): number {
  return Math.min(3_600, 30 * 2 ** Math.max(0, attempts - 1));
}

export async function deliverPendingTakatakEvents(
  limit = 25,
): Promise<{ delivered: number; retried: number; failed: number }> {
  const result = { delivered: 0, retried: 0, failed: 0 };

  // Recover work left in processing by a worker that died.
  await supabaseAdmin
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

    if (claim.error || !claim.data) continue;

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
      await supabaseAdmin
        .from("takatak_outbox")
        .update({
          status: "delivered",
          delivered_at: new Date().toISOString(),
          last_error: null,
        })
        .eq("id", row.id);

      result.delivered += 1;
    } catch (error) {
      const attempts = row.attempts + 1;
      const permanent = attempts >= 8;
      const message =
        error instanceof Error ? error.message.slice(0, 1000) : "Unknown error";

      await supabaseAdmin
        .from("takatak_outbox")
        .update({
          status: permanent ? "failed" : "retrying",
          attempts,
          last_error: message,
          next_attempt_at: new Date(
            Date.now() + retryDelaySeconds(attempts) * 1000,
          ).toISOString(),
        })
        .eq("id", row.id);

      if (permanent) result.failed += 1;
      else result.retried += 1;
    }
  }

  return result;
}
