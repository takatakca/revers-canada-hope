import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { Hero } from "@/components/Hero";
import { TornDivider } from "@/components/TornDivider";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — Revers Canada" },
      { name: "description", content: "Mission, vision et valeurs de Revers Canada, organisme québécois." },
      { property: "og:title", content: "À propos — Revers Canada" },
      { property: "og:description", content: "Mission, vision et valeurs de Revers Canada." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLang();
  return (
    <>
      <Hero eyebrow="À PROPOS" title={t.about.title} subtitle={t.about.lead} align="center" />
      <TornDivider variant="to-light" />
      <PagePlaceholder kicker={t.common.soon}>{t.common.construction}</PagePlaceholder>
    </>
  );
}
