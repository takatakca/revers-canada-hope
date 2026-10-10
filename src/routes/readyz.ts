import { createFileRoute } from "@tanstack/react-router";

function has(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

export const Route = createFileRoute("/readyz")({
  server: {
    handlers: {
      GET: async () => {
        const checks = {
          publicOrigin: has(process.env.PUBLIC_SITE_URL),
          supabase: has(process.env.SUPABASE_URL) && has(process.env.SUPABASE_SERVICE_ROLE_KEY),
          sessionSecret: has(process.env.REVERS_SESSION_SECRET),
          takatak: has(process.env.TAKATAK_REVERS_SERVICE_TOKEN) &&
            has(process.env.TAKATAK_REVERS_HMAC_SECRET)
            ? "configured"
            : "not_configured",
        };

        const ready = checks.publicOrigin && checks.supabase && checks.sessionSecret;
        const response = Response.json(
          {
            ok: ready,
            service: "revers-canada-web",
            ready,
            checks,
          },
          { status: ready ? 200 : 503 },
        );
        response.headers.set("Cache-Control", "no-store");
        return response;
      },
    },
  },
});
