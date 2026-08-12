import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import housingImg from "@/assets/revers-housing.jpg";

export const Route = createFileRoute("/habitation")({
  head: () => ({
    meta: [
      { title: "Habitation communautaire — logement et maintien | REVERS CANADA" },
      {
        name: "description",
        content:
          "Recherche de logement abordable, logement transitoire, maintien en logement et droits des locataires : le volet habitation de REVERS CANADA.",
      },
      { property: "og:title", content: "Habitation communautaire — logement et maintien | REVERS CANADA" },
      {
        property: "og:description",
        content: "Sans logement stable, aucun parcours d'emploi ne tient. Nous accompagnons chaque étape.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HousingPage,
});

function HousingPage() {
  const { t } = useLang();
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-24">
        <img
          src={housingImg}
          alt=""
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-6xl">{t.housing.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{t.housing.lead}</p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {t.housing.items.map((c, i) => (
              <Reveal key={c.t} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <h2 className="font-display text-2xl text-ink">{c.t}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex gap-3 rounded-2xl border border-[color:var(--teal)]/40 bg-[color:var(--cream)] p-6">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--teal-deep)]" aria-hidden />
            <div>
              <div className="font-semibold text-ink">{t.housing.noteT}</div>
              <p className="mt-1 text-sm text-ink/75">{t.housing.noteD}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--leaf)] text-white">
                {t.nav.contact} <ArrowRight className="ml-2 h-4 w-4" />
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
