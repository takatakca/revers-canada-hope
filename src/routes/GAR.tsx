import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "./index";

// Alias route: /GAR shows the same homepage as /
export const Route = createFileRoute("/GAR")({
  head: () => ({
    meta: [
      { title: "Revers Canada — GAR" },
      {
        name: "description",
        content:
          "Organisme de bienfaisance québécois offrant refuge, nourriture et réinsertion professionnelle aux femmes et enfants en situation d'itinérance.",
      },
    ],
  }),
  component: HomePage,
});
