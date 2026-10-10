import { createFileRoute } from "@tanstack/react-router";

import { readReversSession } from "@/lib/takatak/session";

export const Route = createFileRoute("/api/auth/takatak/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const session = readReversSession(request);
        const response = Response.json({
          authenticated: Boolean(session),
          session: session
            ? {
                identityId: session.identityId,
                displayName: session.displayName,
                product: session.product,
                entitlement: session.entitlement,
                planCode: session.planCode,
                expiresAt: session.expiresAt,
              }
            : null,
        });
        response.headers.set("Cache-Control", "private, no-store");
        return response;
      },
    },
  },
});
