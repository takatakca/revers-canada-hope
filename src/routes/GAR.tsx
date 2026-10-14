import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "./index";

// Alias route: /GAR shows the same homepage as /
export const Route = createFileRoute("/GAR")({
  head: () => ({
    meta: [
      { title: "REVERS CANADA — RêvPÈRE" },
      { name: "robots", content: "noindex,follow" },
      {
        name: "description",
        content:
          "Ancienne adresse de REVERS CANADA : découvrez RêvPÈRE et les ressources d’accompagnement des pères de Montréal.",
      },
    ],
  }),
  component: HomePage,
});
