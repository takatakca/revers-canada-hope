import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteLayout } from "@/components/SiteLayout";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-7xl text-foreground">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable / Page not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            La page demandée n'existe pas. The page you're looking for doesn't exist.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Revers Canada — Refuge, nourriture & retour à l'emploi au Québec" },
      {
        name: "description",
        content:
          "Revers Canada est un organisme de bienfaisance québécois qui accompagne les femmes et enfants en situation d'itinérance vers un toit, des repas et un emploi.",
      },
      { name: "author", content: "Revers Canada" },
      { property: "og:title", content: "Revers Canada — Refuge, nourriture & retour à l'emploi au Québec" },
      {
        property: "og:description",
        content:
          "Refuge, sécurité alimentaire et réinsertion professionnelle pour les femmes et enfants du Québec.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Revers Canada — Refuge, nourriture & retour à l'emploi au Québec" },
      { name: "description", content: "Revers Canada is a nonprofit website connecting Canadians with resources and support for homeless women and children." },
      { property: "og:description", content: "Revers Canada is a nonprofit website connecting Canadians with resources and support for homeless women and children." },
      { name: "twitter:description", content: "Revers Canada is a nonprofit website connecting Canadians with resources and support for homeless women and children." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-512.png" },
      { rel: "icon", href: "/icon-512.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}
