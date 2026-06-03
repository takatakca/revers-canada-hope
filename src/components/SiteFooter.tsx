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
            to="/programs"
            className="group relative flex items-center justify-center bg-gradient-to-br from-[color:var(--teal)] to-[color:var(--teal-deep)] p-10 text-center text-white transition hover:brightness-110"
          >
            <span className="font-display text-3xl tracking-wider">
              <BookOpen className="mx-auto mb-2 h-7 w-7" /> {t.nav.programs}
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
            to="/international"
            className="col-span-full relative flex items-center justify-center bg-gradient-to-br from-[color:var(--teal-deep)] to-[color:var(--leaf)] p-10 text-center text-white transition hover:brightness-110"
          >
            <span className="font-display text-3xl tracking-wider">
              {t.nav.international}
            </span>
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="font-display text-xl">REVERS<span className="text-[color:var(--leaf)]">CANADA</span></div>
            <p className="mt-1 text-sm text-white/70">{t.footer.tagline}</p>
            <p className="mt-1 text-xs text-white/50">{t.footer.registered}</p>
          </div>
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
    </footer>
  );
}
