import { createFileRoute } from "@tanstack/react-router";
import { Route as IndexRoute } from "./index";

// Alias route: /GAR shows the same homepage as /
export const Route = createFileRoute("/GAR")({
  head: IndexRoute.options.head,
  component: IndexRoute.options.component!,
});
