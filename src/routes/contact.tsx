import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { Hero } from "@/components/Hero";
import { TornDivider } from "@/components/TornDivider";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Revers Canada" },
      { name: "description", content: "Joignez l'équipe de Revers Canada." },
      { property: "og:title", content: "Contact — Revers Canada" },
      { property: "og:description", content: "Écrivez-nous." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLang();
  return (
    <>
      <Hero eyebrow="CONTACT" title={t.contact.title} subtitle={t.contact.lead} align="center" />
      <TornDivider variant="to-light" />
      <PagePlaceholder kicker={t.common.soon}>{t.common.construction}</PagePlaceholder>
    </>
  );
}
