import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { TornDivider } from "@/components/TornDivider";
import { CTABlock } from "@/components/CTABlock";
import heroImg from "@/assets/hero-mother-child.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Revers Canada — Refuge & retour à l'emploi pour les familles du Québec" },
      {
        name: "description",
        content:
          "Organisme de bienfaisance québécois offrant refuge, nourriture et réinsertion professionnelle aux femmes et enfants en situation d'itinérance.",
      },
      { property: "og:title", content: "Revers Canada — Redonner espoir aux familles" },
      {
        property: "og:description",
        content: "Refuge, sécurité alimentaire et retour à l'emploi pour les mères et enfants du Québec.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useLang();
  return (
    <>
      <Hero
        eyebrow={t.home.heroEyebrow}
        image={heroImg}
        title={
          <>
            {t.home.heroTitleA}{" "}
            <span className="brush-underline text-white">{t.home.heroTitleHighlight}</span>{" "}
            {t.home.heroTitleB}
          </>
        }
        subtitle={t.home.heroSubtitle}
      >
        <Link to="/donate">
          <Button size="lg" className="bg-gradient-to-r from-[color:var(--leaf)] to-[color:var(--qc-blue)] text-white shadow-soft hover:opacity-95">
            <Heart className="mr-2 h-4 w-4" /> {t.home.ctaDonate}
          </Button>
        </Link>
        <Link to="/further">
          <Button size="lg" variant="outline" className="border-white/40 bg-white/5 text-white hover:bg-white/15">
            {t.home.ctaLearn} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </Hero>

      <TornDivider variant="to-light" />

      {/* Stats */}
      <section className="bg-textured py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4">
          {t.home.stats.map((s) => (
            <div key={s.l} className="rounded-2xl bg-white p-5 shadow-card">
              <div className="font-display text-3xl text-[color:var(--qc-blue)]">{s.n}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <TornDivider variant="to-teal" />

      <section className="bg-gradient-band py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl sm:text-5xl">{t.home.ctaBand}</h2>
          <Link to="/donate" className="mt-8 inline-block">
            <Button size="lg" className="bg-white text-[color:var(--navy)] hover:bg-white/90">
              <Heart className="mr-2 h-4 w-4" /> {t.home.ctaBandBtn}
            </Button>
          </Link>
        </div>
      </section>

      <TornDivider variant="to-light" />

      <CTABlock
        title={t.home.heroTitleA}
        body={t.home.heroSubtitle}
        ctaLabel={t.home.ctaDonate}
      />
    </>
  );
}
