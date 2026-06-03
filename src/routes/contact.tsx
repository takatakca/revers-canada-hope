import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { prepareContactSubmission } from "@/lib/contactService";
import { FIELD_LIMITS } from "@/lib/validation";

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
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [submitting, setSubmitting] = useState(false);

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await prepareContactSubmission({ ...form, lang });
      if (!result.ok) {
        toast.error(t.contact.missing);
        return;
      }
      if (result.saved) {
        toast.success(t.contact.sent);
      } else if (result.mailtoHref) {
        // Backend insert failed — fall back to mailto so the user is never stuck.
        window.location.href = result.mailtoHref;
        toast.success(t.contact.sentFallback);
      }
      setForm({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
    } catch {
      toast.error(t.contact.missing);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-ink py-16 text-white animate-fade-in">
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
              <MapPin className="mt-0.5 h-5 w-5 text-[color:var(--teal-deep)]" aria-hidden />
              <span className="text-sm text-ink">{t.contact.address}</span>
            </div>
            <a
              href={`tel:${t.contact.phoneNum}`}
              className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card transition hover:shadow-soft"
            >
              <Phone className="h-5 w-5 text-[color:var(--teal-deep)]" aria-hidden />
              <span className="text-sm text-ink">{t.contact.phoneNum}</span>
            </a>
            <a
              href={`mailto:${t.contact.mail}`}
              className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card transition hover:shadow-soft"
            >
              <Mail className="h-5 w-5 text-[color:var(--teal-deep)]" aria-hidden />
              <span className="text-sm text-ink">{t.contact.mail}</span>
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-white p-8 shadow-card" noValidate>
            {/* Honeypot — hidden from real users, catches naive bots */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={update("website")}
                />
              </label>
            </div>

            <Input
              required
              maxLength={FIELD_LIMITS.name}
              value={form.name}
              onChange={update("name")}
              placeholder={t.contact.name}
              aria-label={t.contact.name}
            />
            <Input
              required
              type="email"
              maxLength={FIELD_LIMITS.email}
              value={form.email}
              onChange={update("email")}
              placeholder={t.contact.email}
              aria-label={t.contact.email}
            />
            <Input
              maxLength={FIELD_LIMITS.phone}
              value={form.phone}
              onChange={update("phone")}
              placeholder={t.contact.phone}
              aria-label={t.contact.phone}
            />
            <Input
              maxLength={FIELD_LIMITS.subject}
              value={form.subject}
              onChange={update("subject")}
              placeholder={t.contact.subject}
              aria-label={t.contact.subject}
            />
            <Textarea
              required
              maxLength={FIELD_LIMITS.message}
              value={form.message}
              onChange={update("message")}
              placeholder={t.contact.message}
              rows={6}
              aria-label={t.contact.message}
            />
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--leaf)] text-white transition hover:opacity-95"
            >
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> : null}
              {t.contact.send}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
