import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Facebook, Instagram, Loader2 } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { saveNewsletterInterest } from "@/lib/newsletterService";
import { FIELD_LIMITS } from "@/lib/validation";
import { ManageCookiesLink } from "@/consent/ManageCookiesLink";

// TODO(owner): real Facebook / Instagram page URLs. Links whose href is "#" are not rendered.
const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Instagram", href: "#", Icon: Instagram },
].filter((link) => link.href !== "#");

export function SiteFooter() {
  const { t, lang } = useLang();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // CASL: newsletter consent box is unticked by default.
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    if (!consent) {
      toast.error(t.footer.newsletterConsentRequired);
      return;
    }
    setSubmitting(true);
    try {
      const result = await saveNewsletterInterest({ firstName, lastName, email, lang, consent });
      if (!result.ok) {
        toast.error(
          result.error === "consent_required"
            ? t.footer.newsletterConsentRequired
            : t.footer.newsletterErr,
        );
        return;
      }
      toast[result.alreadySubscribed ? "message" : "success"](
        result.alreadySubscribed ? t.footer.newsletterAlready : t.footer.newsletterOk,
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setConsent(false);
    } finally {
      setSubmitting(false);
    }
  };

  const programLinks = [
    [t.nav.emploi, "emploi"],
    [t.nav.numerique, "numerique"],
    [t.nav.web, "web"],
    [t.nav.distance, "distance"],
    [t.nav.ia, "ia"],
  ] as const;

  return (
    <footer className="bg-ink text-primary-foreground">
      <div className="home-shell px-5 pb-14 pt-20 sm:px-8 lg:px-0 lg:pt-28">
        <div className="grid gap-12 border-b border-primary-foreground/15 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-leaf">{t.brand.program}</p>
            <p className="mt-5 max-w-xl font-display text-4xl leading-[1.02] sm:text-5xl">
              Emploi. Web.<br />IA. Autonomie.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="text-2xl text-primary-foreground">{t.footer.newsletter}</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/60">{t.footer.newsletterD}</p>
            <form onSubmit={handleSubscribe} className="mt-7">
              <div className="grid gap-px bg-primary-foreground/20 sm:grid-cols-2">
                <Input value={firstName} onChange={(event) => setFirstName(event.target.value)} maxLength={FIELD_LIMITS.name} placeholder={t.footer.firstName} aria-label={t.footer.firstName} className="h-12 rounded-none border-0 bg-ink text-primary-foreground placeholder:text-primary-foreground/45 focus-visible:ring-leaf" />
                <Input value={lastName} onChange={(event) => setLastName(event.target.value)} maxLength={FIELD_LIMITS.name} placeholder={t.footer.lastName} aria-label={t.footer.lastName} className="h-12 rounded-none border-0 bg-ink text-primary-foreground placeholder:text-primary-foreground/45 focus-visible:ring-leaf" />
              </div>
              <div className="mt-px flex bg-primary-foreground/20">
                <Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} maxLength={FIELD_LIMITS.email} placeholder={t.footer.emailPh} aria-label={t.footer.emailPh} className="h-12 rounded-none border-0 bg-ink text-primary-foreground placeholder:text-primary-foreground/45 focus-visible:ring-leaf" />
                <Button type="submit" size="icon" disabled={submitting} className="h-12 w-12 shrink-0 rounded-none bg-leaf text-ink hover:bg-leaf/90" aria-label={t.footer.subscribe}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
              <label className="mt-4 flex max-w-md cursor-pointer items-start gap-3 text-xs leading-5 text-primary-foreground/70">
                <Checkbox
                  checked={consent}
                  onCheckedChange={(value) => setConsent(value === true)}
                  aria-required="true"
                  className="mt-0.5 border-leaf data-[state=checked]:bg-leaf data-[state=checked]:text-ink"
                />
                <span>{t.footer.newsletterConsent}</span>
              </label>
            </form>
          </div>
        </div>

        <div className="grid gap-10 border-b border-primary-foreground/15 py-14 sm:grid-cols-2 lg:grid-cols-5">
          <FooterColumn title="RêvPÈRE">
            <li><Link to="/revpere">{t.nav.pillars}</Link></li>
            {programLinks.map(([label, slug]) => <li key={slug}><Link to="/piliers/$pilier" params={{ pilier: slug }}>{label}</Link></li>)}
          </FooterColumn>
          <FooterColumn title={t.footer.colSupport}>
            <li><Link to="/ressources">{t.nav.resources}</Link></li>
            <li><Link to="/communaute">{t.nav.community}</Link></li>
            <li><Link to="/partenaires">{t.nav.partners}</Link></li>
            <li><Link to="/donate">{t.nav.donate}</Link></li>
          </FooterColumn>
          <FooterColumn title="REVERS CANADA">
            <li><Link to="/habitation">{t.nav.housing}</Link></li>
            <li><Link to="/alimentaire">{t.nav.food}</Link></li>
            <li><Link to="/international">{t.nav.international}</Link></li>
          </FooterColumn>
          <FooterColumn title={t.footer.colOrg}>
            <li><Link to="/mission">{t.nav.mission}</Link></li>
            <li><Link to="/about">{t.nav.about}</Link></li>
            <li><Link to="/contact">{t.nav.contact}</Link></li>
            <li><Link to="/privacy">{t.footer.privacy}</Link></li>
          </FooterColumn>
          <div>
            <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/40">{t.footer.colContact}</h3>
            <address className="mt-5 not-italic text-sm leading-7 text-primary-foreground/70">
              5505 Rue Irwin<br />LaSalle, QC H8N 1A1<br />Canada<br />
              <a href="tel:5148252825">514-825-2825</a><br />
              <a href="mailto:reverscanada@gmail.com" className="break-all">reverscanada@gmail.com</a>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-8 pt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-display text-3xl">REVERS<span className="text-leaf">CANADA</span></div>
            <p className="mt-2 text-xs text-primary-foreground/45">{t.footer.registered}</p>
          </div>
          {SOCIAL_LINKS.length > 0 ? (
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-primary-foreground/55 transition hover:text-leaf"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          ) : null}
          <p className="text-xs text-primary-foreground/45">
            © {new Date().getFullYear()} Revers Canada. {t.footer.rights}{" "}
            <ManageCookiesLink className="ml-2 underline-offset-2 hover:underline" />
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/40">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70 [&_a]:transition [&_a:hover]:text-leaf">{children}</ul>
    </div>
  );
}