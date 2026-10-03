import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { EditorialHero, EditorialList, EditorialCta } from "@/components/Editorial";

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
      <EditorialHero label="RêvPÈRE" title={t.partners.title} lead={t.partners.lead} />
      <section className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <EditorialList items={t.partners.groups} />
        </div>
      </section>
      <EditorialCta title={t.partners.ctaT} body={t.partners.ctaD} cta={t.nav.contact} />
    </>
  );
}
