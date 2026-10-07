import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "./index";
import { seoHead } from "@/seo/head";

// Alias route: /GAR shows the same homepage as /
export const Route = createFileRoute("/GAR")({
  // Same content as the home page: canonical points to "/" (not listed in the sitemap).
  head: () =>
    seoHead({
      title: "Revers Canada — GAR",
      description:
        "Organisme de bienfaisance québécois offrant refuge, nourriture et réinsertion professionnelle aux femmes et enfants en situation d'itinérance.",
      path: "/",
    }),
  component: HomePage,
});
