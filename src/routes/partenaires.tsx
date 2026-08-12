import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: "Partenaires et employeurs | REVERS CANADA" },
      {
        name: "description",
        content:
          "Organismes, employeurs, formateurs et donateurs : rejoignez le réseau RêvPÈRE de REVERS CANADA pour ramener les pères vers l'emploi.",
      },
      { property: "og:title", content: "Partenaires et employeurs | REVERS CANADA" },
      {
        property: "og:description",
        content: "RêvPÈRE fonctionne en réseau : zéro doublon, zéro personne perdue entre deux services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-ink py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-6xl">{t.partners.title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-white/80">{t.partners.lead}</p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {t.partners.groups.map((g, i) => (
              <Reveal key={g.t} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <h2 className="font-display text-2xl text-ink">{g.t}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{g.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-hero px-6 py-10 text-white sm:px-10">
            <h2 className="font-display text-3xl">{t.partners.ctaT}</h2>
            <p className="mt-3 max-w-2xl text-white/85">{t.partners.ctaD}</p>
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
