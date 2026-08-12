import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Globe, Heart, ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const pillarLinks = [
    { to: "/piliers/emploi", label: t.nav.emploi },
    { to: "/piliers/numerique", label: t.nav.numerique },
    { to: "/piliers/web", label: t.nav.web },
    { to: "/piliers/distance", label: t.nav.distance },
    { to: "/piliers/ia", label: t.nav.ia },
  ] as const;

  const mainLinks = [
    { to: "/mission", label: t.nav.mission },
    { to: "/programs", label: t.nav.programs },
    { to: "/ressources", label: t.nav.resources },
    { to: "/communaute", label: t.nav.community },
    { to: "/international", label: t.nav.international },
    { to: "/partenaires", label: t.nav.partners },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 text-white backdrop-blur supports-[backdrop-filter]:bg-ink/85">
      <div className="hidden border-b border-white/10 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/55">
          <span>{t.footer.registered}</span>
          <div className="flex items-center gap-5">
            <a href="tel:5148252825" className="transition hover:text-white">514-825-2825</a>
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="inline-flex items-center gap-1.5 transition hover:text-white"
              aria-label="Toggle language"
            >
              <Globe className="h-3 w-3" />
              {lang === "fr" ? "English" : "Français"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-wide">
            REVERS<span className="text-[color:var(--leaf)]">CANADA</span>
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
            {t.brand.programTag}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          <div className="group relative">
            <Link
              to="/revpere"
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:text-white"
              activeProps={{ className: "text-white" }}
            >
              {t.brand.program} <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-ink shadow-soft">
                <div className="border-b border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {t.nav.pillars}
                </div>
                {pillarLinks.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="block px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {mainLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:text-white"
              activeProps={{ className: "text-white" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase text-white/90 transition hover:bg-white/10 lg:hidden"
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
            className="rounded-md p-2 text-white xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink xl:hidden">
          <div className="max-h-[75vh] overflow-y-auto px-4 py-4">
            <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-white/40">
              {t.brand.program}
            </div>
            <Link
              to="/revpere"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/10"
            >
              {t.nav.pillars}
            </Link>
            {pillarLinks.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-6 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
              >
                {p.label}
              </Link>
            ))}

            <div className="mb-2 mt-4 text-[10px] uppercase tracking-[0.22em] text-white/40">
              {t.footer.colOrg}
            </div>
            {mainLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider text-white/90 hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-4 flex items-center gap-2">
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
