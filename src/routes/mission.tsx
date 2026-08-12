import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Notre mission | REVERS CANADA" },
      {
        name: "description",
        content:
          "REVERS CANADA accompagne les personnes en rupture vers l'autonomie économique et sociale à Montréal, avec le programme RêvPÈRE comme initiative principale.",
      },
      { property: "og:title", content: "Notre mission | REVERS CANADA" },
      {
        property: "og:description",
        content:
          "Accueillir, évaluer, orienter, former et suivre : le modèle de REVERS CANADA à Montréal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MissionPage,
});

function MissionPage() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-ink py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-6xl">{t.mission.title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-white/80">{t.mission.lead}</p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {t.mission.blocks.map((b, i) => (
              <Reveal key={b.t} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <h2 className="font-display text-2xl text-ink">{b.t}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <h2 className="mt-16 font-display text-3xl text-ink">{t.mission.valuesT}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.mission.values.map((v, i) => (
              <Reveal key={v.t} delay={i * 60}>
                <div className="h-full rounded-2xl bg-[color:var(--cream)] p-6">
                  <div className="font-display text-xl text-[color:var(--teal-deep)]">{v.t}</div>
                  <p className="mt-2 text-sm text-ink/75">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-hero px-6 py-10 text-white sm:px-10">
            <h2 className="font-display text-3xl">{t.mission.ctaT}</h2>
            <p className="mt-3 text-white/85">{t.mission.ctaD}</p>
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
