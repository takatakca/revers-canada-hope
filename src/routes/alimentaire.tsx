import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { EditorialHero, EditorialList, EditorialNote, EditorialCta } from "@/components/Editorial";
import foodImg from "@/assets/home/stream-food.jpg";
import { seoHead } from "@/seo/head";

export const Route = createFileRoute("/alimentaire")({
  head: () => {
    const seo = seoHead({
      title: "Aide et sécurité alimentaire | REVERS CANADA",
      description:
        "Dépannage alimentaire, cuisines collectives et autonomie alimentaire : le volet alimentaire de REVERS CANADA à Montréal.",
      path: "/alimentaire",
    });
    return {
      meta: [
        ...seo.meta,
        {
          property: "og:description",
          content: "Manger correctement n'est pas un luxe : c'est la base d'un retour à l'emploi.",
        },
      ],
      links: seo.links,
    };
  },
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
