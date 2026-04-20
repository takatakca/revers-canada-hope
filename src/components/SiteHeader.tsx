import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Globe, Heart } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/programs", label: t.nav.programs },
    { to: "/international", label: t.nav.international },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/80 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wide">
            REVERS<span className="text-[color:var(--leaf)]">CANADA</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium uppercase tracking-wider text-white/80 transition hover:text-white"
              activeProps={{ className: "text-white" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase text-white/90 transition hover:bg-white/10"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <Link to="/donate" className="hidden sm:block">
            <Button className="bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--leaf)] text-white shadow-soft hover:opacity-95">
              <Heart className="mr-1.5 h-4 w-4" /> {t.nav.donateCta}
            </Button>
          </Link>
          <button
            className="lg:hidden rounded-md p-2 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-ink">
          <div className="flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider text-white/90 hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2 px-1">
              <button
                onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase"
              >
                <Globe className="h-3.5 w-3.5" /> {lang === "fr" ? "English" : "Français"}
              </button>
              <Link to="/donate" onClick={() => setOpen(false)} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-[color:var(--teal)] to-[color:var(--leaf)] text-white">
                  <Heart className="mr-1.5 h-4 w-4" /> {t.nav.donateCta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
