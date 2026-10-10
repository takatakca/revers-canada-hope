import { createFileRoute } from "@tanstack/react-router";

import { deliverPendingTakatakEvents } from "@/lib/takatak/outbox";

export const Route = createFileRoute("/api/internal/takatak/outbox")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env.REVERS_OUTBOX_WORKER_TOKEN?.trim() ?? "";
        const authorization = request.headers.get("authorization") ?? "";

        if (
          !expected ||
          !authorization.startsWith("Bearer ") ||
          authorization.slice(7).trim() !== expected
        ) {
          return Response.json({ ok: false }, { status: 403 });
        }

        try {
          const result = await deliverPendingTakatakEvents();
          return Response.json({ ok: true, ...result });
        } catch (error) {
          return Response.json(
            {
              ok: false,
              error:
                error instanceof Error ? error.message : "Outbox worker failed.",
            },
            { status: 503 },
          );
        }
      },
    },
  },
});
