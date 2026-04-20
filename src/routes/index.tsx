import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Home, Utensils, Briefcase } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-mother-child.jpg";
import shelterImg from "@/assets/program-shelter.jpg";
import foodImg from "@/assets/program-food.jpg";
import jobsImg from "@/assets/program-jobs.jpg";

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
        content:
          "Refuge, sécurité alimentaire et retour à l'emploi pour les mères et enfants du Québec.",
      },
    ],
  }),
  component: HomePage,
});

const programIcons = [Home, Utensils, Briefcase];

function HomePage() {
  const { t } = useLang();
  const programImgs = [shelterImg, foodImg, jobsImg];

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            width={1536}
            height={1024}
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <p className="mb-4 inline-block rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
            {t.home.heroEyebrow}
          </p>
          <h1 className="max-w-3xl font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            {t.home.heroTitleA}{" "}
            <span className="brush-underline text-white">{t.home.heroTitleHighlight}</span>{" "}
            {t.home.heroTitleB}
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            {t.home.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/donate">
              <Button size="lg" className="bg-gradient-to-r from-[color:var(--leaf)] to-[color:var(--teal)] text-white shadow-soft hover:opacity-95">
                <Heart className="mr-2 h-4 w-4" /> {t.home.ctaDonate}
              </Button>
            </Link>
            <Link to="/programs">
              <Button size="lg" variant="outline" className="border-white/40 bg-white/5 text-white hover:bg-white/15">
                {t.home.ctaLearn} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TORN TRANSITION */}
      <div className="relative h-10 bg-ink">
        <div className="absolute inset-x-0 -bottom-px h-10 bg-[color:var(--cream)] torn-top" />
      </div>

      {/* MISSION */}
      <section className="bg-[color:var(--cream)] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]">
              {t.home.programsKicker}
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {t.home.missionTitle}
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">{t.home.missionBody}</p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 font-semibold text-[color:var(--teal-deep)] hover:underline">
              {t.nav.about} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {t.home.stats.map((s) => (
              <div
                key={s.l}
                className="col-span-2 rounded-2xl bg-white p-5 shadow-card"
              >
                <div className="font-display text-3xl text-[color:var(--teal-deep)]">{s.n}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS BAND */}
      <div className="relative h-10 bg-[color:var(--cream)]">
        <div className="absolute inset-x-0 -bottom-px h-10 bg-gradient-band torn-top" />
      </div>
      <section className="bg-gradient-band py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-4xl sm:text-5xl">{t.home.programsTitle}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.home.programs.map((p, i) => {
              const Icon = programIcons[i];
              return (
                <div
                  key={p.t}
                  className="group overflow-hidden rounded-2xl bg-white text-ink shadow-card transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={programImgs[i]}
                      alt={p.t}
                      width={1280}
                      height={896}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--cream)] text-[color:var(--teal-deep)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-2xl">{p.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="relative h-10 bg-gradient-band">
        <div className="absolute inset-x-0 -bottom-px h-10 bg-background torn-top" />
      </div>

      {/* CTA BAND */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-hero px-6 py-14 text-center text-white shadow-soft sm:px-12">
          <h2 className="font-display text-3xl sm:text-4xl">{t.home.ctaBand}</h2>
          <Link to="/donate" className="mt-6 inline-block">
            <Button size="lg" className="bg-white text-[color:var(--teal-deep)] hover:bg-white/90">
              <Heart className="mr-2 h-4 w-4" /> {t.home.ctaBandBtn}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
