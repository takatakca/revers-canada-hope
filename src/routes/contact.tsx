import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Nous joindre — Revers Canada" },
      {
        name: "description",
        content: "Contactez Revers Canada pour un partenariat, une question ou un besoin d'aide.",
      },
      { property: "og:title", content: "Contact — Revers Canada" },
      { property: "og:description", content: "Écrivez-nous, nous vous répondrons rapidement." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-5xl sm:text-6xl">{t.contact.title}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-white/85">{t.contact.lead}</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">{t.contact.info}</h2>
            <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card">
              <MapPin className="mt-0.5 h-5 w-5 text-[color:var(--teal-deep)]" />
              <span className="text-sm text-ink">{t.contact.address}</span>
            </div>
            <a href={`tel:${t.contact.phone}`} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card hover:shadow-soft">
              <Phone className="h-5 w-5 text-[color:var(--teal-deep)]" />
              <span className="text-sm text-ink">{t.contact.phone}</span>
            </a>
            <a href={`mailto:${t.contact.mail}`} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card hover:shadow-soft">
              <Mail className="h-5 w-5 text-[color:var(--teal-deep)]" />
              <span className="text-sm text-ink">{t.contact.mail}</span>
            </a>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success(t.contact.sent);
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="space-y-4 rounded-3xl bg-white p-8 shadow-card"
          >
            <Input required placeholder={t.contact.name} />
            <Input required type="email" placeholder={t.contact.email} />
            <Input required placeholder={t.contact.subject} />
            <Textarea required placeholder={t.contact.message} rows={6} />
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--leaf)] text-white"
            >
              {t.contact.send}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
