import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { Reveal } from "@/components/Reveal";
import { EditorialHero, EditorialNote, EditorialCta } from "@/components/Editorial";
import { seoHead } from "@/seo/head";

export const Route = createFileRoute("/ressources")({
  head: () => {
    const seo = seoHead({
      title: "Bottin de ressources pour les pères — Montréal | REVERS CANADA",
      description:
        "Répertoire des ressources montréalaises pour les pères : hébergement, alimentation, santé mentale, emploi, droit familial. Maintenu par REVERS CANADA.",
      path: "/ressources",
    });
    return {
      meta: [
        ...seo.meta,
        {
          property: "og:description",
          content:
            "Trouver la bonne porte est souvent le plus difficile. Voici les ressources montréalaises regroupées par besoin.",
        },
      ],
      links: seo.links,
    };
  },
  component: ResourcesPage,
});

function ResourcesPage() {
  const { t } = useLang();
  const r = t.resources;
  return (
    <>
      <EditorialHero label="Bottin" title={r.title} lead={r.lead} />
      <section className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <EditorialNote title="Urgence">{r.urgent}</EditorialNote>
          <div className="mt-14 grid border-t border-ink/20 md:grid-cols-2 lg:grid-cols-3">
            {r.categories.map((c, i) => (
              <Reveal key={c.t} className="border-b border-ink/20 py-9 md:pr-10">
                <span className="text-xs font-bold tabular-nums text-teal-deep">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-3xl leading-tight text-ink">{c.t}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
                <ul className="mt-4 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="border-l border-leaf pl-3 text-sm text-ink/80">{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm leading-6 text-ink/70">{r.note}</p>
        </div>
      </section>
      <EditorialCta title={r.helpT} body={r.helpD} cta={t.nav.contact} />
    </>
  );
}
