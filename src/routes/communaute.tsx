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
      { property: "og:title", content: "Communauté RêvPÈRE — groupes de pairs et mentorat | REVERS CANADA" },
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
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-24">
        <img
          src={communityImg}
          alt=""
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-6xl">{t.community.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{t.community.lead}</p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {t.community.items.map((c, i) => (
              <Reveal key={c.t} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <h2 className="font-display text-2xl text-ink">{c.t}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-[color:var(--cream)] px-6 py-10 sm:px-10">
            <h2 className="font-display text-3xl text-ink">{t.community.volunteerT}</h2>
            <p className="mt-3 text-muted-foreground">{t.community.volunteerD}</p>
            <Link to="/contact" className="mt-6 inline-block">
              <Button className="bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--leaf)] text-white">
                {t.community.volunteerCta} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
