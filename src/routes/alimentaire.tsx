import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import foodImg from "@/assets/program-food.jpg";

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
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-24">
        <img
          src={foodImg}
          alt=""
          width={1280}
          height={896}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-6xl">{t.food.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{t.food.lead}</p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {t.food.items.map((c, i) => (
              <Reveal key={c.t} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <h2 className="font-display text-2xl text-ink">{c.t}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex gap-3 rounded-2xl border border-[color:var(--teal)]/40 bg-[color:var(--cream)] p-6">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--teal-deep)]" aria-hidden />
            <div>
              <div className="font-semibold text-ink">{t.food.noteT}</div>
              <p className="mt-1 text-sm text-ink/75">{t.food.noteD}</p>
            </div>
          </div>

          <Link to="/contact" className="mt-8 inline-block">
            <Button className="bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--leaf)] text-white">
              {t.nav.contact} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
