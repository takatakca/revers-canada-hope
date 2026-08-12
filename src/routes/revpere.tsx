import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Laptop, MonitorSmartphone, Globe2, Cpu } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/revpere")({
  head: () => ({
    meta: [
      { title: "RêvPÈRE — les 5 piliers | REVERS CANADA" },
      {
        name: "description",
        content:
          "RêvPÈRE : emploi, compétences numériques, web, travail à distance et intelligence artificielle. Le programme de REVERS CANADA pour l'autonomie des pères.",
      },
      { property: "og:title", content: "RêvPÈRE — les 5 piliers | REVERS CANADA" },
      {
        property: "og:description",
        content:
          "Cinq modules concrets pour ramener les pères vers un travail durable : emploi, numérique, web, télétravail et IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RevpereHub,
});

const icons = [Briefcase, Laptop, MonitorSmartphone, Globe2, Cpu];
const slugs = ["emploi", "numerique", "web", "distance", "ia"] as const;

function RevpereHub() {
  const { t } = useLang();
  const pillars = [t.pillars.emploi, t.pillars.numerique, t.pillars.web, t.pillars.distance, t.pillars.ia];

  return (
    <>
      <section className="bg-ink py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
            {t.brand.umbrella}
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl">{t.pillarsHub.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">{t.pillarsHub.lead}</p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={p.name} delay={i * 70}>
                  <Link
                    to="/piliers/$pilier"
                    params={{ pilier: slugs[i] }}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--cream)] text-[color:var(--teal-deep)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-2xl text-ink/15">{p.n}</span>
                    </div>
                    <h2 className="mt-5 font-display text-2xl text-ink">{p.name}</h2>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.lead}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--teal-deep)]">
                      {t.pillarsHub.cta}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-[color:var(--cream)] p-6 text-sm text-ink/80">
            {t.pillarsHub.note}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--leaf)] text-white">
                {t.nav.start} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/ressources">
              <Button variant="outline">{t.nav.resources}</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
