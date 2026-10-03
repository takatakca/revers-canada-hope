import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { EditorialHero, EditorialList, EditorialCta } from "@/components/Editorial";

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
      <EditorialHero label="REVERS CANADA" title={t.mission.title} lead={t.mission.lead} />
      <section className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <EditorialList items={t.mission.blocks} cols={3} />
        </div>
      </section>
      <section className="section-space bg-cream">
        <div className="home-shell grid gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-0">
          <h2 className="editorial-title text-ink lg:col-span-4">{t.mission.valuesT}</h2>
          <ul className="border-t border-ink/20 lg:col-span-7 lg:col-start-6">
            {t.mission.values.map((v) => (
              <li key={v.t} className="grid gap-2 border-b border-ink/20 py-6 sm:grid-cols-3">
                <span className="font-display text-2xl text-teal-deep">{v.t}</span>
                <span className="text-sm leading-6 text-ink/75 sm:col-span-2">{v.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <EditorialCta title={t.mission.ctaT} body={t.mission.ctaD} cta={t.nav.contact} />
    </>
  );
}
