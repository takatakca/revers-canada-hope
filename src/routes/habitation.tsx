import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { EditorialHero, EditorialList, EditorialNote, EditorialCta } from "@/components/Editorial";
import housingImg from "@/assets/revers-housing.jpg";
import { seoHead } from "@/seo/head";

export const Route = createFileRoute("/habitation")({
  head: () => {
    const seo = seoHead({
      title: "Habitation communautaire — logement et maintien | REVERS CANADA",
      description:
        "Recherche de logement abordable, logement transitoire, maintien en logement et droits des locataires : le volet habitation de REVERS CANADA.",
      path: "/habitation",
    });
    return {
      meta: [
        ...seo.meta,
        {
          property: "og:description",
          content:
            "Sans logement stable, aucun parcours d'emploi ne tient. Nous accompagnons chaque étape.",
        },
      ],
      links: seo.links,
    };
  },
  component: HousingPage,
});

function HousingPage() {
  const { t } = useLang();
  return (
    <>
      <EditorialHero label="REVERS CANADA" title={t.housing.title} lead={t.housing.lead} image={housingImg} />
      <section className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <EditorialList items={t.housing.items} />
          <EditorialNote title={t.housing.noteT}>{t.housing.noteD}</EditorialNote>
          <Link to="/ressources" className="mt-10 inline-flex items-center gap-2 border-b border-teal-deep pb-1 text-sm font-semibold text-teal-deep">
            {t.nav.resources}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <EditorialCta title="Un logement stable peut changer une vie." body="Vous avez un logement, un immeuble ou une ressource à offrir? Écrivez-nous." cta={t.nav.contact} />
    </>
  );
}
