import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { Hero } from "@/components/Hero";
import { TornDivider } from "@/components/TornDivider";
import { PagePlaceholder } from "./about";

export const Route = createFileRoute("/organizers")({
  head: () => ({
    meta: [
      { title: "Organisateurs — Revers Canada" },
      { name: "description", content: "Lancez une collecte au profit de Revers Canada." },
      { property: "og:title", content: "Organisateurs — Revers Canada" },
      { property: "og:description", content: "Devenez organisateur d'une campagne." },
    ],
  }),
  component: OrganizersPage,
});

function OrganizersPage() {
  const { t } = useLang();
  return (
    <>
      <Hero eyebrow="ORGANISATEURS" title={t.organizers.title} subtitle={t.organizers.lead} align="center" />
      <TornDivider variant="to-light" />
      <PagePlaceholder kicker={t.common.soon}>{t.common.construction}</PagePlaceholder>
    </>
  );
}
