import { createFileRoute } from "@tanstack/react-router";

import { createExpiredReversSessionCookie } from "@/lib/takatak/session";

export const Route = createFileRoute("/api/auth/takatak/logout")({
  server: {
    handlers: {
      POST: async () => {
        const response = Response.json({ ok: true });
        response.headers.set("Cache-Control", "no-store");
        response.headers.set(
          "Set-Cookie",
          createExpiredReversSessionCookie(),
        );
        return response;
      },
    },
  },
});
