import { createFileRoute } from "@tanstack/react-router";
import { releaseSha } from "@/lib/release";

export const Route = createFileRoute("/healthz")({
  server: {
    handlers: {
      GET: async () => {
        const response = Response.json({
          ok: true,
          service: "revers-canada-web",
          release: releaseSha(),
        });
        response.headers.set("Cache-Control", "no-store");
        return response;
      },
    },
  },
});
