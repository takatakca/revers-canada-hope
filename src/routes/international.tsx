import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { Hero } from "@/components/Hero";
import { TornDivider } from "@/components/TornDivider";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/international")({
  head: () => ({
    meta: [
      { title: "Aide internationale — Revers Canada" },
      { name: "description", content: "Dons matériels pour familles, animaux et communautés à l'étranger." },
      { property: "og:title", content: "Aide internationale — Revers Canada" },
      { property: "og:description", content: "Dons matériels uniquement, jamais d'argent." },
    ],
  }),
  component: InternationalPage,
});

function InternationalPage() {
  const { t } = useLang();
  return (
    <>
      <Hero eyebrow="AIDE INTERNATIONALE" title={t.international.title} subtitle={t.international.lead} align="center" />
      <TornDivider variant="to-light" />
      <PagePlaceholder kicker={t.common.soon}>{t.common.construction}</PagePlaceholder>
    </>
  );
}
