import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Heart } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import type { PillarKey } from "@/i18n/translations";

const SLUGS = ["emploi", "numerique", "web", "distance", "ia"] as const;

const META: Record<PillarKey, { title: string; description: string }> = {
  emploi: {
    title: "Emploi — RêvPÈRE | REVERS CANADA",
    description:
      "Bilan de compétences, CV, entrevues et suivi après l'embauche : le pilier emploi du programme RêvPÈRE de REVERS CANADA.",
  },
  numerique: {
    title: "Compétences numériques — RêvPÈRE | REVERS CANADA",
    description:
      "Courriel, bureautique, démarches en ligne et accès à l'équipement : le pilier numérique du programme RêvPÈRE.",
  },
  web: {
    title: "Web — RêvPÈRE | REVERS CANADA",
    description:
      "Créer un site, se rendre visible en ligne et décrocher ses premiers contrats : le pilier web du programme RêvPÈRE.",
  },
  distance: {
    title: "Travail à distance — RêvPÈRE | REVERS CANADA",
    description:
      "Outils, discipline et recherche d'emploi en télétravail : le pilier travail à distance du programme RêvPÈRE.",
  },
  ia: {
    title: "Intelligence artificielle — RêvPÈRE | REVERS CANADA",
    description:
      "Utiliser l'IA comme levier d'employabilité, avec esprit critique : le pilier IA du programme RêvPÈRE.",
  },
};

export const Route = createFileRoute("/piliers/$pilier")({
  beforeLoad: ({ params }) => {
    if (!SLUGS.includes(params.pilier as (typeof SLUGS)[number])) throw notFound();
  },
  head: ({ params }) => {
    const m = META[params.pilier as PillarKey] ?? META.emploi;
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.description },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PillarPage,
});

function PillarPage() {
  const { pilier } = Route.useParams();
  const { t } = useLang();
  const key = (SLUGS.includes(pilier as (typeof SLUGS)[number]) ? pilier : "emploi") as PillarKey;
  const p = t.pillars[key];

  return (
    <>
      <section className="bg-ink py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link to="/revpere" className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60 hover:text-white">
            {t.brand.program} · {t.nav.pillars}
          </Link>
          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-display text-5xl text-white/20">{p.n}</span>
            <h1 className="font-display text-4xl sm:text-5xl">{p.title}</h1>
          </div>
          <p className="mt-5 max-w-2xl text-lg text-white/80">{p.lead}</p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 md:grid-cols-2">
          {p.sections.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <h2 className="font-display text-2xl text-ink">{s.t}</h2>
                <ul className="mt-4 space-y-3">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-3 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--leaf)]" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center gap-3 px-4 sm:px-6">
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--leaf)] text-white">
              {t.nav.start} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/revpere">
            <Button variant="outline">{t.nav.pillars}</Button>
          </Link>
          <Link to="/donate">
            <Button variant="ghost">
              <Heart className="mr-2 h-4 w-4" /> {t.nav.donateCta}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
