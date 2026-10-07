import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteLayout } from "@/components/SiteLayout";
import { CookieBanner } from "@/consent/CookieBanner";
import { seoHead } from "@/seo/head";
import { jsonLdScript, siteJsonLd, websiteJsonLd } from "@/seo/jsonld";

// Site-wide defaults (no canonical here: each public route sets its own).
const defaultSeo = seoHead();

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
      { name: "author", content: "Revers Canada" },
      // Title, description, Open Graph, Twitter and share image (/icon-512.png) from src/site.config.ts.
      ...defaultSeo.meta,
    ],
    scripts: [jsonLdScript([siteJsonLd(), websiteJsonLd()])],
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
    <html lang="fr-CA">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <CookieBanner />
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
