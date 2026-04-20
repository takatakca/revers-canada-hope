import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { Hero } from "@/components/Hero";
import { TornDivider } from "@/components/TornDivider";
import { CTABlock } from "@/components/CTABlock";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donner — Revers Canada" },
      { name: "description", content: "Faire un don à Revers Canada. Reçu fiscal officiel." },
      { property: "og:title", content: "Donner — Revers Canada" },
      { property: "og:description", content: "Soutenez les femmes et enfants du Québec." },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  const { t } = useLang();
  return (
    <>
      <Hero eyebrow="DONNER" title={t.donate.title} subtitle={t.donate.lead} align="center" />
      <TornDivider variant="to-light" />
      <PagePlaceholder kicker={t.common.soon}>{t.common.construction}</PagePlaceholder>
      <CTABlock title={t.home.ctaBand} ctaLabel={t.home.ctaBandBtn} />
    </>
  );
}
