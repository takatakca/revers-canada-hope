import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Heart, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveNewsletterInterest } from "@/lib/newsletterService";
import { FIELD_LIMITS } from "@/lib/validation";

export function SiteFooter() {
  const { t, lang } = useLang();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await saveNewsletterInterest({ firstName, lastName, email, lang, consent: true });
      if (!result.ok) {
        toast.error(t.footer.newsletterErr);
        return;
      }
      if (result.alreadySubscribed) {
        toast(t.footer.newsletterAlready);
      } else {
        toast.success(t.footer.newsletterOk);
      }
      setFirstName("");
      setLastName("");
      setEmail("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-ink text-white">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="bg-[color:var(--cream)] p-8 md:p-12 text-ink">
          <h3 className="font-display text-2xl mb-2">{t.footer.newsletter}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{t.footer.newsletterD}</p>
          <form onSubmit={handleSubscribe} className="space-y-3 max-w-md">
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder={t.footer.firstName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                maxLength={FIELD_LIMITS.name}
                className="bg-white"
                aria-label={t.footer.firstName}
              />
              <Input
                placeholder={t.footer.lastName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                maxLength={FIELD_LIMITS.name}
                className="bg-white"
                aria-label={t.footer.lastName}
              />
            </div>
            <Input
              type="email"
              required
              maxLength={FIELD_LIMITS.email}
              placeholder={t.footer.emailPh}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
              aria-label={t.footer.emailPh}
            />
            <Button type="submit" disabled={submitting} className="bg-ink text-white hover:bg-ink/90">
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> : null}
              {t.footer.subscribe} <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Link
            to="/revpere"
            className="group relative flex items-center justify-center bg-gradient-to-br from-[color:var(--teal)] to-[color:var(--teal-deep)] p-10 text-center text-white transition hover:brightness-110"
          >
            <span className="font-display text-3xl tracking-wider">
              <BookOpen className="mx-auto mb-2 h-7 w-7" /> {t.brand.program}
            </span>
          </Link>
          <Link
            to="/donate"
            className="group relative flex items-center justify-center bg-gradient-to-br from-[color:var(--leaf)] to-[color:var(--teal-deep)] p-10 text-center text-white transition hover:brightness-110"
          >
            <span className="font-display text-3xl tracking-wider">
              <Heart className="mx-auto mb-2 h-7 w-7" /> {t.nav.donateCta}
            </span>
          </Link>
          <Link
            to="/ressources"
            className="col-span-full relative flex items-center justify-center bg-gradient-to-br from-[color:var(--teal-deep)] to-[color:var(--leaf)] p-10 text-center text-white transition hover:brightness-110"
          >
            <span className="font-display text-3xl tracking-wider">{t.nav.resources}</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
              {t.footer.colProgram}
            </div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li><Link to="/revpere" className="hover:text-white">{t.nav.pillars}</Link></li>
              <li><Link to="/piliers/$pilier" params={{ pilier: "emploi" }} className="hover:text-white">{t.nav.emploi}</Link></li>
              <li><Link to="/piliers/$pilier" params={{ pilier: "numerique" }} className="hover:text-white">{t.nav.numerique}</Link></li>
              <li><Link to="/piliers/$pilier" params={{ pilier: "web" }} className="hover:text-white">{t.nav.web}</Link></li>
              <li><Link to="/piliers/$pilier" params={{ pilier: "distance" }} className="hover:text-white">{t.nav.distance}</Link></li>
              <li><Link to="/piliers/$pilier" params={{ pilier: "ia" }} className="hover:text-white">{t.nav.ia}</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
              {t.footer.colOrg}
            </div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li><Link to="/mission" className="hover:text-white">{t.nav.mission}</Link></li>
              <li><Link to="/about" className="hover:text-white">{t.nav.about}</Link></li>
              <li><Link to="/programs" className="hover:text-white">{t.nav.programs}</Link></li>
              <li><Link to="/habitation" className="hover:text-white">{t.nav.housing}</Link></li>
              <li><Link to="/alimentaire" className="hover:text-white">{t.nav.food}</Link></li>
              <li><Link to="/international" className="hover:text-white">{t.nav.international}</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
              {t.footer.colSupport}
            </div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li><Link to="/donate" className="hover:text-white">{t.nav.donate}</Link></li>
              <li><Link to="/partenaires" className="hover:text-white">{t.nav.partners}</Link></li>
              <li><Link to="/communaute" className="hover:text-white">{t.nav.community}</Link></li>
              <li><Link to="/ressources" className="hover:text-white">{t.nav.resources}</Link></li>
              <li><Link to="/privacy" className="hover:text-white">{t.footer.privacy}</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
              {t.footer.colContact}
            </div>
            <address className="mt-3 not-italic text-sm leading-relaxed text-white/75">
              5505 Rue Irwin<br />
              LaSalle, QC H8N 1A1<br />
              Canada<br />
              <a href="tel:5148252825" className="hover:text-white">514-825-2825</a><br />
              <a href="mailto:reverscanada@gmail.com" className="hover:text-white">reverscanada@gmail.com</a>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <div className="font-display text-xl">REVERS<span className="text-[color:var(--leaf)]">CANADA</span></div>
            <p className="mt-1 text-sm text-white/70">{t.footer.tagline}</p>
            <p className="mt-1 text-xs text-white/50">{t.footer.registered}</p>
          </div>

          <address className="not-italic text-sm text-white/80 leading-relaxed">
            5505 Rue Irwin<br />
            LaSalle, QC H8N 1A1<br />
            Canada<br />
            <a href="tel:5148252825" className="hover:text-white underline-offset-2 hover:underline">514-825-2825</a>
            <span className="mx-1 text-white/40">·</span>
            <a href="mailto:reverscanada@gmail.com" className="hover:text-white underline-offset-2 hover:underline">reverscanada@gmail.com</a>
          </address>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="text-white/70 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-white/70 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="text-xs text-white/60">
              © {new Date().getFullYear()} Revers Canada. {t.footer.rights}{" "}
              <Link to="/privacy" className="underline hover:text-white">{t.footer.privacy}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
