import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LangContext";
import { homeCopy } from "@/content/home";
import heroImage from "@/assets/home/hero-father-advisor.jpg";
import workshopImage from "@/assets/revpere-workshop.jpg";
import employmentImage from "@/assets/home/pillar-emploi.jpg";
import digitalImage from "@/assets/home/pillar-numerique.jpg";
import webImage from "@/assets/home/pillar-web.jpg";
import remoteImage from "@/assets/home/pillar-teletravail.jpg";
import aiImage from "@/assets/home/pillar-ia.jpg";
import communityImage from "@/assets/revpere-community-father-child.jpg";
import parkImage from "@/assets/home/community-park.jpg";
import housingImage from "@/assets/revers-housing.jpg";
import foodImage from "@/assets/home/stream-food.jpg";
import internationalImage from "@/assets/help-international.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "REVERS CANADA — RêvPÈRE : emploi et autonomie" },
      {
        name: "description",
        content:
          "RêvPÈRE accompagne les pères de Montréal vers l'emploi, l'autonomie numérique, le Web, le télétravail et l'intelligence artificielle.",
      },
      { property: "og:title", content: "REVERS CANADA — RêvPÈRE : emploi et autonomie" },
      {
        property: "og:description",
        content: "Aider un père à se remettre debout, c'est aussi aider ses enfants à avancer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const pillarImages = [employmentImage, digitalImage, webImage, remoteImage, aiImage];
const pillarSlugs = ["emploi", "numerique", "web", "distance", "ia"] as const;

export function HomePage() {
  const { lang } = useLang();
  const copy = homeCopy[lang];

  const streams = [
    {
      index: "01",
      label: copy.org.streams.housingLabel,
      title: copy.org.streams.housingTitle,
      body: copy.org.streams.housingBody,
      cta: copy.org.streams.housingCta,
      to: "/habitation" as const,
      image: housingImage,
      alt: lang === "fr" ? "Immeuble résidentiel à Montréal" : "Residential building in Montréal",
    },
    {
      index: "02",
      label: copy.org.streams.foodLabel,
      title: copy.org.streams.foodTitle,
      body: copy.org.streams.foodBody,
      cta: copy.org.streams.foodCta,
      to: "/alimentaire" as const,
      image: foodImage,
      alt: lang === "fr" ? "Bénévoles préparant une aide alimentaire" : "Volunteers preparing food support",
    },
    {
      index: "03",
      label: copy.org.streams.intlLabel,
      title: copy.org.streams.intlTitle,
      body: copy.org.streams.intlBody,
      cta: copy.org.streams.intlCta,
      to: "/international" as const,
      image: internationalImage,
      alt: lang === "fr" ? "Aide matérielle internationale" : "International material aid",
    },
  ];

  return (
    <>
      <section className="home-hero bg-ink text-primary-foreground">
        <div className="home-shell grid min-h-[760px] grid-cols-1 lg:grid-cols-12">
          <div className="relative z-10 flex flex-col justify-end px-5 pb-14 pt-32 sm:px-8 lg:col-span-5 lg:px-0 lg:pb-20 lg:pr-14 lg:pt-40">
            <p className="hero-step text-[11px] font-bold uppercase tracking-[0.18em] text-leaf">
              {copy.hero.eyebrow}
            </p>
            <h1 className="hero-step mt-6 text-[clamp(3rem,5.2vw,5.8rem)] leading-[1.03] text-primary-foreground">
              {copy.hero.titleA}<br />
              <span className="text-leaf">{copy.hero.titleB}</span>
            </h1>
            <p className="hero-step mt-8 max-w-xl text-base leading-7 text-primary-foreground/75 sm:text-lg">
              {copy.hero.subtitle}
            </p>
            <p className="hero-step mt-6 max-w-lg border-l border-leaf pl-5 text-sm font-semibold leading-6 text-primary-foreground">
              {copy.hero.human}
            </p>
            <div className="hero-step mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact">
                <Button size="lg" className="w-full rounded-none bg-leaf text-ink hover:bg-leaf/90 sm:w-auto">
                  {copy.hero.ctaPrimary}<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/revpere">
                <Button size="lg" variant="outline" className="w-full rounded-none border-primary-foreground/35 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto">
                  {copy.hero.ctaSecondary}
                </Button>
              </Link>
            </div>
          </div>

          <div className="hero-step relative min-h-[480px] lg:col-span-7 lg:min-h-full">
            <img src={heroImage} alt={copy.hero.imageAlt} width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/15 lg:bg-gradient-to-r lg:from-ink/35 lg:via-transparent lg:to-transparent" />
            <Link to="/ressources" className="absolute bottom-7 right-5 inline-flex items-center gap-3 border-b border-primary-foreground/65 pb-2 text-sm font-semibold text-primary-foreground sm:right-8 lg:bottom-10">
              {copy.hero.ctaQuiet}<ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <nav aria-label={copy.pillarsIntro.label} className="signature-band bg-leaf text-ink">
        <ol className="home-shell grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {copy.signage.map((item, index) => (
            <li key={item} className="flex min-h-24 items-center gap-3 border-b border-ink/20 px-5 py-5 md:px-6 lg:border-b-0 lg:border-r last:border-r-0">
              <span className="text-[10px] font-bold tabular-nums text-ink/55">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-sm font-bold uppercase tracking-[0.12em]">{item}</span>
            </li>
          ))}
        </ol>
      </nav>

      <section className="section-space bg-cream">
        <div className="home-shell grid gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-0">
          <Reveal className="lg:col-span-5 lg:pb-12">
            <p className="editorial-label text-teal-deep">{copy.shift.label}</p>
            <h2 className="editorial-title mt-5 text-ink">{copy.shift.titleA}<br /><span className="text-teal-deep">{copy.shift.titleB}</span></h2>
            <p className="mt-7 max-w-md text-lg leading-8 text-muted-foreground">{copy.shift.lead}</p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
              <img src={workshopImage} alt={copy.shift.imageAlt} width={1600} height={1008} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute bottom-0 left-0 max-w-sm bg-ink p-6 text-primary-foreground sm:p-8">
                <p className="text-lg font-semibold leading-7">{copy.shift.close}</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-start-6 lg:col-span-7">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 border-t border-ink/20 pt-6 text-sm text-ink/70">
              {copy.shift.items.map((item) => <li key={item}>— {item}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="piliers" className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <Reveal>
            <p className="editorial-label text-teal-deep">{copy.pillarsIntro.label}</p>
            <h2 className="editorial-title mt-5 max-w-3xl text-ink">{copy.pillarsIntro.title}</h2>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="hidden lg:col-span-3 lg:block">
              <ol className="sticky top-28 border-t border-ink/20">
                {copy.pillars.map((pillar) => (
                  <li key={pillar.key}>
                    <a href={`#pillar-${pillar.key}`} className="group flex items-center gap-4 border-b border-ink/20 py-5 text-ink/55 transition-colors hover:text-teal-deep">
                      <span className="text-xs tabular-nums">{pillar.n}</span>
                      <span className="font-bold uppercase tracking-[0.1em]">{pillar.nav}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="lg:col-span-9">
              {copy.pillars.map((pillar, index) => (
                <article id={`pillar-${pillar.key}`} key={pillar.key} className="pillar-chapter scroll-mt-28 border-t border-ink/20 py-12 first:pt-0 lg:py-20">
                  <Reveal>
                    <div className="grid gap-8 md:grid-cols-2 md:items-center">
                      <div className={index % 2 === 1 ? "md:order-2" : ""}>
                        <span className="text-6xl font-display text-leaf sm:text-8xl">{pillar.n}</span>
                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-teal-deep">{pillar.nav}</p>
                        <h3 className="mt-4 text-4xl leading-[1.02] text-ink sm:text-5xl">{pillar.title}</h3>
                        <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">{pillar.lead}</p>
                        <ul className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-ink/15 pt-6 text-sm text-ink/75">
                          {pillar.items.map((item) => <li key={item}>— {item}</li>)}
                        </ul>
                        <Link to="/piliers/$pilier" params={{ pilier: pillarSlugs[index] }} className="mt-8 inline-flex items-center gap-2 border-b border-teal-deep pb-1 text-sm font-semibold text-teal-deep">
                          {pillar.cta}<ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className={index % 2 === 1 ? "md:order-1" : ""}>
                        <img src={pillarImages[index]} alt={pillar.imageAlt} width={1024} height={1280} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                      </div>
                    </div>
                  </Reveal>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-ink text-primary-foreground">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <Reveal>
            <p className="editorial-label text-leaf">{copy.method.label}</p>
          </Reveal>
          <ol className="relative mt-12 grid gap-0 border-t border-primary-foreground/20 md:grid-cols-3">
            {copy.method.chapters.map((chapter, index) => (
              <Reveal key={chapter.n} delay={index * 90} className="border-b border-primary-foreground/20 py-9 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <li>
                  <span className="text-sm font-bold text-leaf">{chapter.n}</span>
                  <h3 className="mt-5 text-3xl uppercase leading-[1.05] text-primary-foreground">{chapter.title}</h3>
                  {chapter.items.length > 0 ? (
                    <p className="mt-5 text-sm leading-7 text-primary-foreground/65">{chapter.items.join(" · ")}</p>
                  ) : (
                    <p className="mt-5 text-sm leading-7 text-primary-foreground/65">{chapter.body}</p>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space bg-teal-deep text-primary-foreground">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <Reveal className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="editorial-title max-w-xl text-primary-foreground">{copy.resources.titleA}<br /><span className="text-leaf">{copy.resources.titleB}</span></h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
              <form action="/ressources" className="flex border-b border-primary-foreground/55 pb-2">
                <Input name="q" aria-label={copy.resources.placeholder} placeholder={copy.resources.placeholder} className="h-14 rounded-none border-0 bg-transparent px-0 text-lg text-primary-foreground placeholder:text-primary-foreground/55 focus-visible:ring-0" />
                <Button type="submit" size="icon" className="h-14 w-14 shrink-0 rounded-none bg-leaf text-ink hover:bg-leaf/90" aria-label={copy.resources.cta}>
                  <Search className="h-5 w-5" />
                </Button>
              </form>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/75">
                {copy.resources.examples.map((example) => <li key={example}>— {example}</li>)}
              </ul>
              <p className="mt-8 max-w-xl text-sm leading-6 text-primary-foreground/60">{copy.resources.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space overflow-hidden bg-cream">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-4">
              <p className="editorial-label text-teal-deep">{copy.community.label}</p>
              <h2 className="mt-5 text-4xl leading-[1.02] text-ink sm:text-6xl">{copy.community.title}</h2>
              <p className="mt-7 leading-7 text-muted-foreground">{copy.community.body}</p>
              <Link to="/communaute" className="mt-8 inline-flex items-center gap-2 border-b border-teal-deep pb-1 text-sm font-semibold text-teal-deep">
                {copy.community.cta}<ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-8">
              <div className="community-collage grid grid-cols-5 grid-rows-5 gap-3">
                <img src={communityImage} alt={copy.community.alts[0]} width={1600} height={912} loading="lazy" className="col-span-5 row-span-3 h-full w-full object-cover sm:col-span-3 sm:row-span-5" />
                <img src={parkImage} alt={copy.community.alts[1]} width={1536} height={1024} loading="lazy" className="col-span-3 row-span-2 h-full w-full object-cover sm:col-span-2 sm:row-span-3" />
                <img src={workshopImage} alt={copy.community.alts[2]} width={1600} height={1008} loading="lazy" className="col-span-2 row-span-2 h-full w-full object-cover sm:row-span-2" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <Reveal className="grid gap-8 border-b border-ink/20 pb-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="editorial-label text-teal-deep">{copy.org.label}</p>
              <h2 className="mt-4 text-5xl text-ink sm:text-7xl">{copy.org.title}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground lg:col-span-6 lg:col-start-7 lg:pt-8">{copy.org.body}</p>
          </Reveal>
          <div>
            {streams.map((stream, index) => (
              <Reveal key={stream.to}>
                <article className="group grid gap-7 border-b border-ink/20 py-10 md:grid-cols-12 md:items-center">
                  <span className="text-sm font-bold text-teal-deep md:col-span-1">{stream.index}</span>
                  <div className="md:col-span-3">
                    <img src={stream.image} alt={stream.alt} width={1024} height={768} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.015]" />
                  </div>
                  <div className="md:col-span-5 md:px-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-deep">{stream.label}</p>
                    <h3 className="mt-3 text-3xl leading-tight text-ink">{stream.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">{stream.body}</p>
                  </div>
                  <Link to={stream.to} className="inline-flex items-center gap-2 text-sm font-semibold text-teal-deep md:col-span-3 md:justify-end">
                    {stream.cta}<ArrowUpRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="home-shell grid gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-0">
          <Reveal className="lg:col-span-7">
            <p className="editorial-label text-teal-deep">{copy.partners.label}</p>
            <h2 className="editorial-title mt-5 text-ink">{copy.partners.title}</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{copy.partners.body}</p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
            <ul className="border-t border-ink/20">
              {copy.partners.categories.map((category) => <li key={category} className="border-b border-ink/20 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-ink">{category}</li>)}
            </ul>
            <Link to="/partenaires" className="mt-8 inline-flex items-center gap-2 border-b border-teal-deep pb-1 text-sm font-semibold text-teal-deep">
              {copy.partners.cta}<ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-leaf py-16 text-ink sm:py-20">
        <Reveal className="home-shell flex flex-col gap-9 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-0">
          <div>
            <h2 className="max-w-4xl text-4xl leading-[1.04] text-ink sm:text-6xl">{copy.final.title}</h2>
            <p className="mt-6 max-w-2xl leading-7 text-ink/75">{copy.final.body}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link to="/contact"><Button size="lg" className="w-full rounded-none bg-ink text-primary-foreground hover:bg-ink/90 sm:w-auto">{copy.final.ctaPrimary}<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link to="/donate"><Button size="lg" variant="outline" className="w-full rounded-none border-ink bg-transparent text-ink hover:bg-ink/10 sm:w-auto"><Heart className="mr-2 h-4 w-4" />{copy.final.ctaSecondary}</Button></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}