import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { Hero } from "@/components/Hero";
import { TornDivider } from "@/components/TornDivider";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/further")({
  head: () => ({
    meta: [
      { title: "Aller plus loin — Revers Canada" },
      { name: "description", content: "Bénévolat, partenariats, dons planifiés et campagnes." },
      { property: "og:title", content: "Aller plus loin — Revers Canada" },
      { property: "og:description", content: "Toutes les façons de soutenir Revers Canada." },
    ],
  }),
  component: FurtherPage,
});

function FurtherPage() {
  const { t } = useLang();
  return (
    <>
      <Hero eyebrow="ALLER PLUS LOIN" title={t.further.title} subtitle={t.further.lead} align="center" />
      <TornDivider variant="to-light" />
      <PagePlaceholder kicker={t.common.soon}>{t.common.construction}</PagePlaceholder>
    </>
  );
}
