import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import communityImg from "@/assets/revpere-community-father-child.jpg";

export const Route = createFileRoute("/communaute")({
  head: () => ({
    meta: [
      { title: "Communauté RêvPÈRE — groupes de pairs et mentorat | REVERS CANADA" },
      {
        name: "description",
        content:
          "Groupes de pairs, mentorat, ateliers pratiques et moments père-enfant : la communauté RêvPÈRE de REVERS CANADA à Montréal.",
      },
      {
        property: "og:title",
        content: "Communauté RêvPÈRE — groupes de pairs et mentorat | REVERS CANADA",
      },
      {
        property: "og:description",
        content: "La formation ouvre des portes, la communauté empêche de retomber.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-ink text-primary-foreground">
        <div className="home-shell grid lg:grid-cols-12">
          <div className="flex flex-col justify-end px-5 pb-14 pt-28 sm:px-8 lg:col-span-5 lg:px-0 lg:pr-12">
            <h1 className="editorial-title text-primary-foreground">{t.community.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/75">
              {t.community.lead}
            </p>
          </div>
          <div className="relative min-h-[360px] lg:col-span-7 lg:min-h-[560px]">
            <img
              src={communityImg}
              alt=""
              width={1600}
              height={912}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <div className="grid border-t border-ink/20 md:grid-cols-2">
            {t.community.items.map((c, i) => (
              <Reveal
                key={c.t}
                className="border-b border-ink/20 py-9 md:odd:pr-10 md:even:border-l md:even:pl-10"
              >
                <span className="text-xs font-bold tabular-nums text-teal-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-3xl leading-tight text-ink">{c.t}</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-leaf py-16 text-ink sm:py-20">
        <div className="home-shell flex flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-0">
          <div>
            <h2 className="max-w-3xl text-4xl leading-[1.04] sm:text-5xl">
              {t.community.volunteerT}
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-ink/75">{t.community.volunteerD}</p>
          </div>
          <Link to="/contact">
            <Button
              size="lg"
              className="rounded-none bg-ink text-primary-foreground hover:bg-ink/90"
            >
              {t.community.volunteerCta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
