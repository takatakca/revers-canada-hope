import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { readLimitedBody } from "@/lib/http/read-limited-body";
import { verifyUnsubscribeToken } from "@/lib/newsletter/unsubscribe-token";

const Input = z.object({ token: z.string().min(1).max(160) }).strict();

function result(body: Record<string, unknown>, status: number): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

export const Route = createFileRoute("/api/public/newsletter/unsubscribe")({
  server: {
    handlers: {
      // Email/link scanners must never unsubscribe through a GET preview.
      GET: async () => result({ ok: false, error: "confirmation_required" }, 405),
      POST: async ({ request }) => {
        if (!request.headers.get("content-type")?.startsWith("application/json")) {
          return result({ ok: false, error: "invalid_content_type" }, 415);
        }
        const body = await readLimitedBody(request, 2048);
        if (body === null) return result({ ok: false, error: "invalid_body" }, 413);
        let data: z.infer<typeof Input>;
        try {
          data = Input.parse(JSON.parse(body));
        } catch {
          return result({ ok: false, error: "invalid_token" }, 400);
        }

        const secret = process.env.REVERS_NEWSLETTER_UNSUBSCRIBE_SECRET;
        if (!secret || secret.length < 32) {
          return result({ ok: false, error: "unavailable" }, 503);
        }
        const subscriberId = verifyUnsubscribeToken(data.token, secret);
        if (!subscriberId) return result({ ok: false, error: "invalid_token" }, 400);

        try {
          const { error } = await supabaseAdmin
            .from("newsletter_subscribers")
            .update({ consent: false, status: "unsubscribed" })
            .eq("id", subscriberId)
            .eq("source", "REVERS_CANADA_GAR");
          if (error) throw error;
          // Same outcome if an old signed ID no longer exists: no address enumeration.
          return result({ ok: true }, 200);
        } catch (error) {
          console.error(
            "[newsletter] opt-out failed:",
            error instanceof Error ? error.message : "unknown",
          );
          return result({ ok: false, error: "unavailable" }, 503);
        }
      },
    },
  },
});
