import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { enqueueTakatakEvent } from "@/lib/takatak/outbox";
import {
  FIELD_LIMITS,
  sanitizeText,
  validateEmail,
  validateRequired,
} from "@/lib/validation";

const InputSchema = z.object({
  name: z.string().max(FIELD_LIMITS.name),
  email: z.string().max(FIELD_LIMITS.email),
  phone: z.string().max(FIELD_LIMITS.phone).optional().default(""),
  subject: z.string().max(FIELD_LIMITS.subject).optional().default(""),
  message: z.string().max(FIELD_LIMITS.message),
  website: z.string().max(200).optional().default(""),
  lang: z.enum(["fr", "en"]).optional().default("fr"),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;

        try {
          body = await request.json();
        } catch {
          return Response.json(
            { ok: false, error: "invalid_json" },
            { status: 400 },
          );
        }

        const parsed = InputSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "invalid_input" },
            { status: 400 },
          );
        }

        const input = parsed.data;

        // Honeypot: return success without creating a record.
        if (input.website.trim()) {
          return Response.json({ ok: true, saved: false });
        }

        if (
          !validateRequired(input.name) ||
          !validateEmail(input.email) ||
          !validateRequired(input.message)
        ) {
          return Response.json(
            { ok: false, error: "validation_failed" },
            { status: 400 },
          );
        }

        const name = sanitizeText(input.name, FIELD_LIMITS.name);
        const email = sanitizeText(input.email, FIELD_LIMITS.email);
        const phone = sanitizeText(input.phone, FIELD_LIMITS.phone);
        const subject = sanitizeText(input.subject, FIELD_LIMITS.subject);
        const message = sanitizeText(input.message, FIELD_LIMITS.message);

        const { data: contact, error } = await supabaseAdmin
          .from("contacts")
          .insert({
            name,
            email,
            phone: phone || null,
            subject: subject || null,
            message,
            language: input.lang,
            source: "REVERS_CANADA_GAR",
            user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
          })
          .select("id, created_at")
          .single();

        if (error || !contact) {
          return Response.json(
            { ok: false, error: "save_failed" },
            { status: 503 },
          );
        }

        // Only a privacy-minimized lead event is sent to TAKATAK.
        // The contact message, email and phone remain in REVERS.
        let eventId: string | null = null;
        try {
          const queued = await enqueueTakatakEvent({
            eventType: "lead.created",
            sourceEntityType: "contact",
            sourceEntityId: contact.id,
            idempotencyKey: `lead.created:contact:${contact.id}`,
            occurredAt: contact.created_at,
            payload: {
              source: "contact_form",
              language: input.lang,
              sourceEntityId: contact.id,
            },
          });
          eventId = queued.eventId;
        } catch (queueError) {
          console.error(
            "[contact] TAKATAK outbox enqueue failed:",
            queueError instanceof Error ? queueError.message : queueError,
          );
        }

        return Response.json({
          ok: true,
          saved: true,
          eventQueued: Boolean(eventId),
        });
      },
    },
  },
});
