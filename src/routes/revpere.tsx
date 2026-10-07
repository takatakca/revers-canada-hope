import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import employmentImage from "@/assets/home/pillar-emploi.jpg";
import digitalImage from "@/assets/home/pillar-numerique.jpg";
import webImage from "@/assets/home/pillar-web.jpg";
import remoteImage from "@/assets/home/pillar-teletravail.jpg";
import aiImage from "@/assets/home/pillar-ia.jpg";
import { seoHead } from "@/seo/head";

export const Route = createFileRoute("/revpere")({
  head: () => {
    const seo = seoHead({
      title: "RêvPÈRE — les 5 piliers | REVERS CANADA",
      description:
        "RêvPÈRE : emploi, compétences numériques, web, travail à distance et intelligence artificielle. Le programme de REVERS CANADA pour l'autonomie des pères.",
      path: "/revpere",
    });
    return {
      meta: [
        ...seo.meta,
        {
          property: "og:description",
          content:
            "Cinq modules concrets pour ramener les pères vers un travail durable : emploi, numérique, web, télétravail et IA.",
        },
      ],
      links: seo.links,
    };
  },
  component: RevpereHub,
});

const images = [employmentImage, digitalImage, webImage, remoteImage, aiImage];
const slugs = ["emploi", "numerique", "web", "distance", "ia"] as const;

function RevpereHub() {
  const { t } = useLang();
  const pillars = [t.pillars.emploi, t.pillars.numerique, t.pillars.web, t.pillars.distance, t.pillars.ia];

  return (
    <>
      <section className="bg-ink pb-16 pt-24 text-primary-foreground sm:pb-20 sm:pt-28">
        <div className="home-shell grid gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-0">
          <div className="lg:col-span-7">
            <p className="editorial-label text-leaf">{t.brand.umbrella}</p>
            <h1 className="editorial-title mt-5 text-primary-foreground">{t.pillarsHub.title}</h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-primary-foreground/75 lg:col-span-4 lg:col-start-9 lg:self-end">
            {t.pillarsHub.lead}
          </p>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          {pillars.map((p, i) => (
            <Reveal key={p.name}>
              <Link
                to="/piliers/$pilier"
                params={{ pilier: slugs[i] }}
                className="group grid gap-6 border-t border-ink/20 py-10 md:grid-cols-12 md:items-center last:border-b"
              >
                <span className="font-display text-5xl text-leaf md:col-span-1">{p.n}</span>
                <div className="md:col-span-3">
                  <img src={images[i]} alt="" width={1024} height={1280} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.015]" />
                </div>
                <div className="md:col-span-6 md:px-6">
                  <h2 className="text-3xl leading-tight text-ink sm:text-4xl">{p.name}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{p.lead}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-deep md:col-span-2 md:justify-end">
                  {t.pillarsHub.cta}<ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <p className="border-l border-leaf pl-5 text-base leading-7 text-ink/80 lg:col-span-6">{t.pillarsHub.note}</p>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:col-start-8 lg:justify-end">
              <Link to="/contact">
                <Button size="lg" className="w-full rounded-none bg-ink text-primary-foreground hover:bg-ink/90 sm:w-auto">
                  {t.nav.start}<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/ressources">
                <Button size="lg" variant="outline" className="w-full rounded-none border-ink bg-transparent text-ink hover:bg-ink/10 sm:w-auto">
                  {t.nav.resources}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
