import { createFileRoute } from "@tanstack/react-router";

import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { exchangeTakatakLaunchCode } from "@/lib/takatak/client";
import { createReversSessionCookie } from "@/lib/takatak/session";

export const Route = createFileRoute("/api/auth/takatak/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const code = new URL(request.url).searchParams.get("code")?.trim() ?? "";

        if (!code) {
          return Response.json(
            { ok: false, error: "missing_code" },
            { status: 400, headers: { "Cache-Control": "no-store" } },
          );
        }

        try {
          const session = await exchangeTakatakLaunchCode(code);

          const { error: profileError } = await supabaseAdmin
            .from("revers_profiles")
            .upsert(
              {
                takatak_master_identity_id: session.identityId,
                sync_status: "linked",
              },
              { onConflict: "takatak_master_identity_id" },
            );

          if (profileError) {
            throw new Error(
              `Unable to link REVERS profile: ${profileError.message}`,
            );
          }

          const response = Response.redirect("/", 303);
          response.headers.set("Cache-Control", "no-store");
          response.headers.set(
            "Set-Cookie",
            createReversSessionCookie(session),
          );
          return response;
        } catch (error) {
          console.error(
            "[takatak-auth] exchange failed:",
            error instanceof Error ? error.message : error,
          );

          return Response.json(
            { ok: false, error: "takatak_exchange_failed" },
            { status: 503, headers: { "Cache-Control": "no-store" } },
          );
        }
      },
    },
  },
});
