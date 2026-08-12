import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/ressources")({
  head: () => ({
    meta: [
      { title: "Bottin de ressources pour les pères — Montréal | REVERS CANADA" },
      {
        name: "description",
        content:
          "Répertoire des ressources montréalaises pour les pères : hébergement, alimentation, santé mentale, emploi, droit familial. Maintenu par REVERS CANADA.",
      },
      { property: "og:title", content: "Bottin de ressources pour les pères — Montréal | REVERS CANADA" },
      {
        property: "og:description",
        content:
          "Trouver la bonne porte est souvent le plus difficile. Voici les ressources montréalaises regroupées par besoin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-ink py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-6xl">{t.resources.title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-white/80">{t.resources.lead}</p>
          <p className="mt-6 inline-flex items-start gap-2 rounded-xl border border-[color:var(--leaf)]/50 bg-white/5 px-4 py-3 text-sm text-white/90">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--leaf)]" aria-hidden />
            {t.resources.urgent}
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.resources.categories.map((c, i) => (
              <Reveal key={c.t} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <h2 className="font-display text-2xl text-ink">{c.t}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
                  <ul className="mt-4 space-y-2 border-t border-border pt-4">
                    {c.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-sm text-ink/80">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--teal)]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 rounded-2xl bg-[color:var(--cream)] p-6 text-sm text-ink/75">
            {t.resources.note}
          </p>

          <div className="mt-12 rounded-3xl bg-gradient-hero px-6 py-10 text-white sm:px-10">
            <h2 className="font-display text-3xl">{t.resources.helpT}</h2>
            <p className="mt-3 max-w-2xl text-white/85">{t.resources.helpD}</p>
            <Link to="/contact" className="mt-6 inline-block">
              <Button className="bg-white text-[color:var(--teal-deep)] hover:bg-white/90">
                {t.nav.contact} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
