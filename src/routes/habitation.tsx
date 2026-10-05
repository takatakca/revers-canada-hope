import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { EditorialHero, EditorialList, EditorialNote, EditorialCta } from "@/components/Editorial";
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
