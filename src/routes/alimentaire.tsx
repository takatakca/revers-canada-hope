import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { EditorialHero, EditorialList, EditorialNote, EditorialCta } from "@/components/Editorial";
import foodImg from "@/assets/home/stream-food.jpg";

export const Route = createFileRoute("/alimentaire")({
  head: () => ({
    meta: [
      { title: "Aide et sécurité alimentaire | REVERS CANADA" },
      {
        name: "description",
        content:
          "Dépannage alimentaire, cuisines collectives et autonomie alimentaire : le volet alimentaire de REVERS CANADA à Montréal.",
      },
      { property: "og:title", content: "Aide et sécurité alimentaire | REVERS CANADA" },
      {
        property: "og:description",
        content: "Manger correctement n'est pas un luxe : c'est la base d'un retour à l'emploi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FoodPage,
});

function FoodPage() {
  const { t } = useLang();
  return (
    <>
      <EditorialHero label="REVERS CANADA" title={t.food.title} lead={t.food.lead} image={foodImg} />
      <section className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <EditorialList items={t.food.items} />
          <EditorialNote title={t.food.noteT}>{t.food.noteD}</EditorialNote>
        </div>
      </section>
      <EditorialCta title={t.food.title} body={t.food.lead} cta={t.nav.contact} />
    </>
  );
}
