import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "node:crypto";

import { deliverPendingTakatakEvents } from "@/lib/takatak/outbox";

export const Route = createFileRoute("/api/internal/takatak/outbox")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env.REVERS_OUTBOX_WORKER_TOKEN?.trim() ?? "";
        const authorization = request.headers.get("authorization") ?? "";

        const actual = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
        const expectedBytes = Buffer.from(expected);
        const actualBytes = Buffer.from(actual);
        const authorized = expectedBytes.length >= 32 &&
          expectedBytes.length === actualBytes.length &&
          timingSafeEqual(expectedBytes, actualBytes);

        if (!authorized) {
          return Response.json(
            { ok: false },
            { status: 403, headers: { "Cache-Control": "no-store" } },
          );
        }

        try {
          const result = await deliverPendingTakatakEvents();
          return Response.json({ ok: true, ...result }, { headers: { "Cache-Control": "no-store" } });
        } catch (error) {
          console.error(
            "[revers-outbox] worker failed:",
            error instanceof Error ? error.message : "unknown",
          );
          return Response.json(
            { ok: false, error: "outbox_unavailable" },
            { status: 503, headers: { "Cache-Control": "no-store" } },
          );
        }
      },
    },
  },
});
