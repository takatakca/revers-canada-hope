import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { EditorialHero, EditorialList, EditorialCta } from "@/components/Editorial";
import { seoHead } from "@/seo/head";

export const Route = createFileRoute("/partenaires")({
  head: () => {
    const seo = seoHead({
      title: "Partenaires et employeurs | REVERS CANADA",
      description:
        "Organismes, employeurs, formateurs et donateurs : rejoignez le réseau RêvPÈRE de REVERS CANADA pour ramener les pères vers l'emploi.",
      path: "/partenaires",
    });
    return {
      meta: [
        ...seo.meta,
        {
          property: "og:description",
          content:
            "RêvPÈRE fonctionne en réseau : zéro doublon, zéro personne perdue entre deux services.",
        },
      ],
      links: seo.links,
    };
  },
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
