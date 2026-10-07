import { createFileRoute } from "@tanstack/react-router";
import { Check, Heart } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — Revers Canada" },
      {
        name: "description",
        content:
          "Revers Canada est un organisme de bienfaisance enregistré au Québec, dédié à la réinsertion des femmes et enfants en situation d'itinérance.",
      },
      { property: "og:title", content: "À propos — Revers Canada" },
      {
        property: "og:description",
        content: "Notre mission, notre vision et nos valeurs au service des familles québécoises.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-gradient-hero py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-5xl sm:text-6xl">{t.about.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">{t.about.lead}</p>
        </div>
      </section>
      <div className="relative h-10 bg-gradient-hero">
        <div className="absolute inset-x-0 -bottom-px h-10 bg-background torn-top" />
      </div>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-3">
          {[
            { t: t.about.missionT, d: t.about.missionD },
            { t: t.about.visionT, d: t.about.visionD },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl bg-white p-8 shadow-card">
              <h2 className="font-display text-3xl text-[color:var(--teal-deep)]">{b.t}</h2>
              <p className="mt-3 text-muted-foreground">{b.d}</p>
            </div>
          ))}
          <div className="rounded-2xl bg-ink p-8 text-white shadow-card">
            <h2 className="font-display text-3xl">{t.about.valuesT}</h2>
            <ul className="mt-4 space-y-2">
              {t.about.values.map((v) => (
                <li key={v} className="flex items-center gap-2 text-white/90">
                  <Check className="h-4 w-4 text-[color:var(--leaf)]" /> {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--cream)] py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center shadow-card">
          <Heart className="mx-auto h-10 w-10 text-[color:var(--leaf)]" />
          <h2 className="mt-3 font-display text-3xl text-ink">{t.about.taxT}</h2>
          <p className="mt-3 text-muted-foreground">{t.about.taxD}</p>
        </div>
      </section>
    </>
  );
}
