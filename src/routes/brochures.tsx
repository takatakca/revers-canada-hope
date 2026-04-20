import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { Hero } from "@/components/Hero";
import { TornDivider } from "@/components/TornDivider";
import { PagePlaceholder } from "./about";

export const Route = createFileRoute("/brochures")({
  head: () => ({
    meta: [
      { title: "Brochures — Revers Canada" },
      { name: "description", content: "Téléchargez nos documents officiels et trousses de partenariat." },
      { property: "og:title", content: "Brochures — Revers Canada" },
      { property: "og:description", content: "Documents officiels de Revers Canada." },
    ],
  }),
  component: BrochuresPage,
});

function BrochuresPage() {
  const { t } = useLang();
  return (
    <>
      <Hero eyebrow="BROCHURES" title={t.brochures.title} subtitle={t.brochures.lead} align="center" />
      <TornDivider variant="to-light" />
      <PagePlaceholder kicker={t.common.soon}>{t.common.construction}</PagePlaceholder>
    </>
  );
}
