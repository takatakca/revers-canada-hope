import { createFileRoute } from "@tanstack/react-router";
import { releaseSha } from "@/lib/release";

function configured(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

/**
 * Readiness must prove that the *operational* REVERS database is reachable.
 * Returning 200 merely because a Supabase URL and key exist masks outages
 * and risks activating a broken production release.
 */
async function isOperationalDatabaseReady(): Promise<boolean> {
  if (!configured(process.env.SUPABASE_URL) || !configured(process.env.SUPABASE_SERVICE_ROLE_KEY)) {
    return false;
  }

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("contacts")
      .select("id")
      .limit(1)
      .abortSignal(AbortSignal.timeout(3_500));
    return !error;
  } catch {
    return false;
  }
}

export const Route = createFileRoute("/readyz")({
  server: {
    handlers: {
      GET: async () => {
        const environmentReady =
          configured(process.env.PUBLIC_SITE_URL) &&
          configured(process.env.REVERS_SESSION_SECRET);
        const ready = environmentReady && await isOperationalDatabaseReady();

        // No sensitive config diagnostics or donor records in a public endpoint.
        return new Response(
          JSON.stringify({
            ok: ready,
            service: "revers-canada-web",
            release: releaseSha(),
          }),
          {
            status: ready ? 200 : 503,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          },
        );
      },
    },
  },
});
