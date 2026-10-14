import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MapPin, Loader2 } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { prepareContactSubmission } from "@/lib/contactService";
import { FIELD_LIMITS } from "@/lib/validation";

const supportTopics = [
  { value: "Paternité et famille", fr: "Paternité, séparation ou DPJ", en: "Fatherhood, separation or youth protection" },
  { value: "Aide alimentaire", fr: "Alimentation et besoins des enfants", en: "Food and children’s needs" },
  { value: "Logement", fr: "Logement et hébergement", en: "Housing and shelter" },
  { value: "Emploi et numérique", fr: "Emploi, formation et numérique", en: "Employment, training and digital skills" },
  { value: "Sports et loisirs", fr: "Sports et activités père-enfant", en: "Father-child sports and activities" },
  { value: "Bénévolat et partenariat", fr: "Bénévolat ou partenariat", en: "Volunteering or partnership" },
  { value: "Autre", fr: "Autre demande", en: "Other request" },
];

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
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await prepareContactSubmission({ ...form, lang });
      if (!result.ok) {
        toast.error(result.errors?.includes("backend_unavailable") ? t.contact.unavailable : t.contact.missing);
        return;
      }
      if (result.saved) {
        toast.success(t.contact.sent);
      } else if (!result.saved) {
        toast.error(t.contact.unavailable);
        return;
      }
      setForm({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
    } catch {
      toast.error(t.contact.unavailable);
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
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--teal-deep)]" aria-hidden />
              <div className="text-sm text-ink">
                <div className="font-medium">REVERS CANADA</div>
                <div>5505 Rue Irwin</div>
                <div>LaSalle, QC H8N 1A1</div>
                <div>Canada</div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=5505%20Rue%20Irwin%20LaSalle%20QC%20H8N%201A1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-[color:var(--teal-deep)] underline hover:opacity-80"
                >
                  {t.contact.mapsLabel}
                </a>
              </div>
            </div>
            <a
              href="tel:5148252825"
              className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card transition hover:shadow-soft"
            >
              <Phone className="h-5 w-5 text-[color:var(--teal-deep)]" aria-hidden />
              <span className="text-sm text-ink">{t.contact.phoneNum}</span>
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
            <div>
              <label htmlFor="contact-topic" className="mb-2 block text-sm font-semibold text-ink">
                {lang === "fr" ? "Quel type de soutien cherchez-vous ?" : "What kind of support do you need?"}
              </label>
              <select id="contact-topic" value={form.subject} onChange={update("subject")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">{lang === "fr" ? "Choisir un sujet (facultatif)" : "Choose a topic (optional)"}</option>
                {supportTopics.map((topic) => <option key={topic.value} value={topic.value}>
                  {lang === "fr" ? topic.fr : topic.en}
                </option>)}
              </select>
            </div>
            <Textarea
              required
              maxLength={FIELD_LIMITS.message}
              value={form.message}
              onChange={update("message")}
              placeholder={t.contact.message}
              rows={6}
              aria-label={t.contact.message}
            />
            <p className="text-xs leading-5 text-muted-foreground">
              {lang === "fr"
                ? "Pour protéger votre famille, ne transmettez pas de numéros de dossier, documents judiciaires, renseignements médicaux ou informations sensibles sur les enfants dans ce formulaire."
                : "To protect your family, do not include case numbers, court documents, medical details or sensitive information about children in this form."}
            </p>
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
