import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import intlImg from "@/assets/help-international.jpg";
import animalsImg from "@/assets/help-animals.jpg";
import { EditorialHero, EditorialNote } from "@/components/Editorial";
import { Reveal } from "@/components/Reveal";
import { seoHead } from "@/seo/head";

export const Route = createFileRoute("/international")({
  head: () => {
    const seo = seoHead({
      title: "Aide internationale — Dons matériels — Revers Canada",
      description:
        "Déposez vêtements, nourriture, médicaments et fournitures vétérinaires dans nos points de collecte. Aucun don monétaire pour ce programme.",
      path: "/international",
    });
    return {
      meta: [
        ...seo.meta,
        { property: "og:title", content: "Aide internationale — Revers Canada" },
        {
          property: "og:description",
          content:
            "Programme de dons matériels (vêtements, nourriture, soins vétérinaires) pour les communautés à l'étranger.",
        },
      ],
      links: seo.links,
    };
  },
  component: IntlPage,
});

function IntlPage() {
  const { t } = useLang();
  const i = t.international;
  return (
    <>
      <EditorialHero label="Help International" title={i.title} lead={i.lead} image={intlImg} />

      <section className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <EditorialNote title={i.noticeT}>{i.noticeD}</EditorialNote>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-4xl leading-tight text-ink sm:text-5xl">{i.acceptT}</h2>
              <ul className="mt-8 border-t border-ink/20">
                {i.accept.map((item, n) => (
                  <li key={item} className="flex gap-5 border-b border-ink/20 py-5">
                    <span className="text-xs font-bold tabular-nums text-teal-deep">{String(n + 1).padStart(2, "0")}</span>
                    <span className="text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <img src={animalsImg} alt="" width={1280} height={896} loading="lazy" className="h-full min-h-[300px] w-full object-cover" />
            </div>
          </div>

          <h2 className="mt-20 text-4xl leading-tight text-ink sm:text-5xl">{i.dropT}</h2>
          <div className="mt-8 grid border-t border-ink/20 md:grid-cols-3">
            {i.drops.map((d) => (
              <Reveal key={d.city} className="border-b border-ink/20 py-8 md:pr-10">
                <h3 className="text-3xl text-ink">{d.city}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.addr}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal-deep">{d.hours}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-leaf py-16 text-ink sm:py-20">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <h2 className="max-w-3xl text-4xl leading-[1.04] sm:text-5xl">{i.whyT}</h2>
          <p className="mt-5 max-w-2xl leading-7 text-ink/75">{i.whyD}</p>
        </div>
      </section>
    </>
  );
}
