import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  const { t } = useLang();

  const blocks: { title: string; items: { to: "/" | "/donate" | "/further" | "/international" | "/organizers" | "/brochures" | "/contact" | "/about"; label: string }[] }[] = [
    {
      title: t.navGroups.discover,
      items: [
        { to: "/", label: t.nav.home },
        { to: "/about", label: t.nav.about },
        { to: "/brochures", label: t.nav.brochures },
      ],
    },
    {
      title: t.navGroups.act,
      items: [
        { to: "/donate", label: t.nav.donate },
        { to: "/further", label: t.nav.further },
        { to: "/international", label: t.nav.international },
        { to: "/organizers", label: t.nav.organizers },
      ],
    },
    {
      title: t.navGroups.resources,
      items: [{ to: "/contact", label: t.nav.contact }],
    },
  ];

  return (
    <footer className="bg-[color:var(--charcoal)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        {/* Newsletter */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--teal)]">
            {t.footer.newsletter}
          </p>
          <h3 className="mt-2 font-display text-3xl">{t.footer.newsletterD}</h3>
          <form onSubmit={(e) => e.preventDefault()} className="mt-5 max-w-md space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder={t.footer.firstName} className="bg-white/10 text-white placeholder:text-white/50 border-white/20" />
              <Input placeholder={t.footer.lastName} className="bg-white/10 text-white placeholder:text-white/50 border-white/20" />
            </div>
            <Input
              type="email"
              placeholder={t.footer.emailPh}
              className="bg-white/10 text-white placeholder:text-white/50 border-white/20"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-[color:var(--leaf)] to-[color:var(--qc-blue)] text-white"
            >
              {t.footer.subscribe} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Nav blocks */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {blocks.map((b) => (
            <div key={b.title}>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--teal)]">
                {b.title}
              </p>
              <ul className="space-y-2">
                {b.items.map((it) => (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className="text-sm font-medium text-white/85 transition hover:text-[color:var(--leaf)]"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="font-display text-xl">
              REVERS<span className="text-[color:var(--leaf)]">CANADA</span>
            </div>
            <p className="mt-1 text-xs text-white/60">{t.footer.registered}</p>
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
            © {new Date().getFullYear()} Revers Canada. {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
