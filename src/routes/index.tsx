import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Laptop, Globe2, Cpu, Briefcase, MonitorSmartphone, Home as HomeIcon, Utensils, PackageOpen, Users, BookOpen } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import heroImg from "@/assets/revpere-hero-father-laptop.jpg";
import workshopImg from "@/assets/revpere-workshop.jpg";
import communityImg from "@/assets/revpere-community-father-child.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "REVERS CANADA — RêvPÈRE : emploi, numérique, web et IA pour les pères" },
      {
        name: "description",
        content:
          "RêvPÈRE, programme de REVERS CANADA à Montréal : emploi, compétences numériques, web, travail à distance et IA pour aider les pères à retrouver leur autonomie.",
      },
      { property: "og:title", content: "REVERS CANADA — RêvPÈRE : emploi, numérique, web et IA pour les pères" },
      {
        property: "og:description",
        content:
          "Aider un père à se remettre debout, c'est aussi aider ses enfants à avancer. Emploi, numérique, web, travail à distance et IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const pillarIcons = [Briefcase, Laptop, MonitorSmartphone, Globe2, Cpu];
const pillarSlugs = ["emploi", "numerique", "web", "distance", "ia"] as const;
const ecoIcons = [Briefcase, HomeIcon, Utensils, PackageOpen];

export function HomePage() {
  const { t } = useLang();
  const pillars = [
    t.pillars.emploi,
    t.pillars.numerique,
    t.pillars.web,
    t.pillars.distance,
    t.pillars.ia,
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            width={1024}
            height={1408}
            className="h-full w-full object-cover object-[60%_30%] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40 animate-fade-in">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
            {t.home.heroEyebrow}
          </p>
          <p className="font-display text-4xl tracking-wide text-[color:var(--leaf)] sm:text-5xl">
            {t.brand.program}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
            {t.home.heroTitleA}{" "}
            <span className="brush-underline text-white">{t.home.heroTitleHighlight}</span>
            {t.home.heroTitleB}
          </h1>
          <p className="mt-7 max-w-2xl text-base text-white/80 sm:text-lg">{t.home.heroSubtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/revpere">
              <Button size="lg" className="bg-gradient-to-r from-[color:var(--leaf)] to-[color:var(--teal)] text-white shadow-soft hover:opacity-95">
                {t.home.ctaStart} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/donate">
              <Button size="lg" variant="outline" className="border-white/40 bg-white/5 text-white hover:bg-white/15">
                <Heart className="mr-2 h-4 w-4" /> {t.home.ctaDonate}
              </Button>
            </Link>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
            {t.home.pillarStrip.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="relative h-10 bg-ink">
        <div className="absolute inset-x-0 -bottom-px h-10 bg-[color:var(--cream)] torn-top" />
      </div>

      {/* WHY */}
      <section className="bg-[color:var(--cream)] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--teal-deep)]">
              {t.home.whyKicker}
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-5xl">
              {t.home.whyTitle}
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">{t.home.whyBody}</p>
            <ul className="mt-7 space-y-4">
              {t.home.whyList.map((w) => (
                <li key={w} className="flex gap-3 text-sm text-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--leaf)]" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl shadow-card">
              <img
                src={workshopImg}
                alt="Atelier de groupe RêvPÈRE dans un centre communautaire"
                width={1600}
                height={1008}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <div className="relative h-10 bg-[color:var(--cream)]">
        <div className="absolute inset-x-0 -bottom-px h-10 bg-gradient-band torn-top" />
      </div>
      <section className="bg-gradient-band py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">
              {t.home.pillarsKicker}
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl">{t.home.pillarsTitle}</h2>
            <p className="mt-4 text-white/85">{t.home.pillarsLead}</p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <Reveal key={p.name} delay={i * 70}>
                  <Link
                    to="/piliers/$pilier"
                    params={{ pilier: pillarSlugs[i] }}
                    className="group flex h-full flex-col rounded-2xl bg-white p-7 text-ink shadow-card transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--cream)] text-[color:var(--teal-deep)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-2xl text-ink/15">{p.n}</span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl">{p.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.lead}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--teal-deep)]">
                      {t.pillarsHub.cta}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <div className="relative h-10 bg-gradient-band">
        <div className="absolute inset-x-0 -bottom-px h-10 bg-background torn-top" />
      </div>

      {/* MODEL */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--teal-deep)]">
              {t.home.modelKicker}
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-5xl">{t.home.modelTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.home.modelLead}</p>
          </Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {t.home.modelSteps.map((s, i) => (
              <Reveal key={s.t} delay={i * 60}>
                <li className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="font-display text-xl text-[color:var(--leaf)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 font-display text-xl text-ink">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="bg-[color:var(--cream)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--teal-deep)]">
              {t.home.ecosystemKicker}
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-5xl">{t.home.ecosystemTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.home.ecosystemLead}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {t.home.ecosystem.map((e, i) => {
              const Icon = ecoIcons[i];
              return (
                <Reveal key={e.t} delay={i * 70}>
                  <Link
                    to={e.to as "/revpere"}
                    className="group flex h-full gap-5 rounded-2xl bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--cream)] text-[color:var(--teal-deep)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="block">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--leaf)]">
                        {e.tag}
                      </span>
                      <span className="mt-1.5 block font-display text-2xl text-ink">{e.t}</span>
                      <span className="mt-2 block text-sm text-muted-foreground">{e.d}</span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--teal-deep)]">
                        {t.nav.programs} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIRECTORY + COMMUNITY */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 sm:p-10">
              <BookOpen className="h-7 w-7 text-[color:var(--teal-deep)]" />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--teal-deep)]">
                {t.home.directoryKicker}
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink">{t.home.directoryTitle}</h2>
              <p className="mt-4 flex-1 text-muted-foreground">{t.home.directoryLead}</p>
              <Link to="/ressources" className="mt-6">
                <Button variant="outline">{t.home.directoryCta} <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-ink p-8 text-white sm:p-10">
              <img
                src={communityImg}
                alt="Un père et son enfant cuisinent ensemble dans une cuisine communautaire"
                width={1600}
                height={912}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
              <div className="relative">
                <Users className="h-7 w-7 text-[color:var(--leaf)]" />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-white/70">
                  {t.home.communityKicker}
                </p>
                <h2 className="mt-3 font-display text-3xl">{t.home.communityTitle}</h2>
                <p className="mt-4 text-white/80">{t.home.communityBody}</p>
                <Link to="/communaute" className="mt-6 inline-block">
                  <Button className="bg-white text-ink hover:bg-white/90">
                    {t.home.communityCta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-background pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-hero px-6 py-14 text-center text-white shadow-soft sm:px-12">
          <h2 className="font-display text-3xl sm:text-4xl">{t.home.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">{t.home.finalLead}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/donate">
              <Button size="lg" className="bg-white text-[color:var(--teal-deep)] hover:bg-white/90">
                <Heart className="mr-2 h-4 w-4" /> {t.home.ctaBandBtn}
              </Button>
            </Link>
            <Link to="/partenaires">
              <Button size="lg" variant="outline" className="border-white/50 bg-white/10 text-white hover:bg-white/20">
                {t.partners.ctaT}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
