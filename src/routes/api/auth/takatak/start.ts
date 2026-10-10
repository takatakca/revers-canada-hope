import { createFileRoute } from "@tanstack/react-router";

import { assertHttpsUrl, getTakatakConfig } from "@/lib/takatak/config";

export const Route = createFileRoute("/api/auth/takatak/start")({
  server: {
    handlers: {
      GET: async () => {
        const config = getTakatakConfig();
        const launchUrl = assertHttpsUrl(
          config.launchUrl,
          "TAKATAK_EXPERIENCE_LAUNCH_URL",
        );

        const response = Response.redirect(launchUrl.toString(), 303);
        response.headers.set("Cache-Control", "no-store");
        return response;
      },
    },
  },
});
