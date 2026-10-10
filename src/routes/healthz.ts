import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/healthz")({
  server: {
    handlers: {
      GET: async () => {
        const response = Response.json({
          ok: true,
          service: "revers-canada-web",
          release: process.env.RELEASE_SHA ?? null,
        });
        response.headers.set("Cache-Control", "no-store");
        return response;
      },
    },
  },
});
