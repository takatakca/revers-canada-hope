import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import shelterImg from "@/assets/program-shelter.jpg";
import foodImg from "@/assets/program-food.jpg";
import jobsImg from "@/assets/program-jobs.jpg";
import { Heart } from "lucide-react";
import { seoHead } from "@/seo/head";

export const Route = createFileRoute("/programs")({
  head: () => {
    const seo = seoHead({
      title: "Nos programmes — Revers Canada",
      description:
        "Refuge, sécurité alimentaire et retour à l'emploi : trois piliers pour reconstruire des vies au Québec.",
      path: "/programs",
    });
    return {
      meta: [
        ...seo.meta,
        {
          property: "og:description",
          content:
            "Hébergement, alimentation et réinsertion professionnelle pour les femmes et enfants du Québec.",
        },
      ],
      links: seo.links,
    };
  },
  component: ProgramsPage,
});

function ProgramsPage() {
  const { t } = useLang();
  const imgs = [shelterImg, foodImg, jobsImg];
  return (
    <>
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-5xl sm:text-6xl">{t.programs.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{t.programs.lead}</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6">
          {t.programs.items.map((p, i) => (
            <div
              key={p.t}
              className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>div:first-child]:order-last" : ""}`}
            >
              <div className="overflow-hidden rounded-3xl shadow-card">
                <img
                  src={imgs[i]}
                  alt={p.t}
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="inline-block rounded-full bg-[color:var(--teal)]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[color:var(--teal-deep)]">
                  {p.tag}
                </span>
                <h2 className="mt-3 font-display text-4xl text-ink">{p.t}</h2>
                <p className="mt-3 text-lg text-muted-foreground">{p.d}</p>
                <Link to="/donate" className="mt-5 inline-block">
                  <Button className="bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--leaf)] text-white">
                    <Heart className="mr-2 h-4 w-4" /> {t.nav.donateCta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
