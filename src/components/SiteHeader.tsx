import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Globe, Heart } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { OverlayMenu } from "./OverlayMenu";

export function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const desktopLinks = [
    { to: "/" as const, label: t.nav.home },
    { to: "/donate" as const, label: t.nav.donate },
    { to: "/further" as const, label: t.nav.further },
    { to: "/international" as const, label: t.nav.international },
    { to: "/organizers" as const, label: t.nav.organizers },
    { to: "/contact" as const, label: t.nav.contact },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[color:var(--charcoal)]/95 text-white backdrop-blur supports-[backdrop-filter]:bg-[color:var(--charcoal)]/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl tracking-wide">
              REVERS<span className="text-[color:var(--leaf)]">CANADA</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {desktopLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/75 transition hover:text-white"
                activeProps={{ className: "text-[color:var(--leaf)]" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="hidden items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold uppercase text-white/90 transition hover:bg-white/10 sm:inline-flex"
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <Link to="/donate" className="hidden sm:block">
              <Button className="bg-gradient-to-r from-[color:var(--leaf)] to-[color:var(--qc-blue)] text-white shadow-soft hover:opacity-95">
                <Heart className="mr-1.5 h-4 w-4" /> {t.nav.donateCta}
              </Button>
            </Link>
            <button
              className="rounded-md p-2 text-white lg:hidden"
              onClick={() => setOpen(true)}
              aria-label={t.nav.menu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <OverlayMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
