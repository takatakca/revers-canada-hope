import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

// REVERS CANADA is deployed as a portable Node.js/TanStack Start application.
// Nitro produces the standalone .output/server/index.mjs runtime used by cPanel
// and other Node hosts. No Lovable or Cloudflare build adapter is required.
process.env.NITRO_PRESET = process.env.NITRO_PRESET || "node-server";

export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({ srcDirectory: "src" }),
    nitro(),
    react(),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
});
