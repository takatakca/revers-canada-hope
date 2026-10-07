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
      <section className="bg-ink pb-16 pt-24 text-primary-foreground sm:pb-20 sm:pt-28">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <Link to="/revpere" className="editorial-label text-leaf hover:text-primary-foreground">
            {t.brand.program} · {t.nav.pillars}
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="font-display text-7xl text-leaf sm:text-8xl">{p.n}</span>
              <h1 className="editorial-title mt-3 text-primary-foreground">{p.title}</h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-primary-foreground/75 lg:col-span-4 lg:self-end">
              {p.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          {p.sections.map((s, i) => (
            <Reveal key={s.t}>
              <div className="grid gap-6 border-t border-ink/20 py-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <span className="text-xs font-bold tabular-nums text-teal-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-3xl leading-tight text-ink">{s.t}</h2>
                </div>
                <ul className="grid gap-x-8 gap-y-3 text-base text-ink/80 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
                  {s.items.map((it) => (
                    <li key={it} className="border-b border-ink/10 pb-3">
                      — {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <div className="mt-6 flex flex-col gap-3 border-t border-ink/20 pt-10 sm:flex-row">
            <Link to="/contact">
              <Button
                size="lg"
                className="w-full rounded-none bg-ink text-primary-foreground hover:bg-ink/90 sm:w-auto"
              >
                {t.nav.start}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/revpere">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-none border-ink bg-transparent text-ink hover:bg-ink/10 sm:w-auto"
              >
                {t.nav.pillars}
              </Button>
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 self-start border-b border-teal-deep pb-1 text-sm font-semibold text-teal-deep sm:self-center sm:ml-4"
            >
              <Heart className="h-4 w-4" />
              {t.nav.donateCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
