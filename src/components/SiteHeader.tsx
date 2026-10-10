import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

const PILLARS = ["emploi", "numerique", "web", "distance", "ia"] as const;

export function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overlay = pathname === "/" || pathname === "/GAR";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || !overlay;

  const pillarLabel: Record<(typeof PILLARS)[number], string> = {
    emploi: t.nav.emploi,
    numerique: t.nav.numerique,
    web: t.nav.web,
    distance: t.nav.distance,
    ia: t.nav.ia,
  };

  const mainLinks = [
    { to: "/ressources", label: t.nav.resources },
    { to: "/communaute", label: t.nav.community },
    { to: "/mission", label: "REVERS CANADA" },
    { to: "/partenaires", label: t.nav.partners },
  ] as const;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 text-white transition-[background-color,height,border-color,backdrop-filter] duration-[280ms]",
        solid
          ? "border-b border-white/12 bg-ink/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex max-w-[110rem] items-center justify-between gap-8 px-5 transition-all duration-[280ms] sm:px-8",
          solid ? "h-[68px]" : "h-[96px]",
        ].join(" ")}
      >
        <Link to="/" className="flex items-baseline gap-3 leading-none">
          <span
            className={[
              "font-display tracking-[0.02em] transition-all duration-[280ms]",
              solid ? "text-[19px]" : "text-[23px]",
            ].join(" ")}
          >
            REVERS<span className="text-[color:var(--leaf)]">CANADA</span>
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45 sm:inline">
            RêvPÈRE
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          <div className="group relative">
            <Link
              to="/revpere"
              className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 transition hover:text-white"
              activeProps={{ className: "text-white" }}
            >
              RêvPÈRE
            </Link>
            <div className="invisible absolute left-0 top-full z-50 w-60 pt-5 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="border-t-2 border-[color:var(--leaf)] bg-ink/98 backdrop-blur">
                {PILLARS.map((p, i) => (
                  <Link
                    key={p}
                    to="/piliers/$pilier"
                    params={{ pilier: p }}
                    className="flex items-baseline gap-3 border-b border-white/8 px-5 py-3 text-sm text-white/75 transition hover:bg-white/8 hover:text-white"
                  >
                    <span className="font-display text-xs text-white/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {pillarLabel[p]}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {mainLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:text-white"
              activeProps={{ className: "text-white" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60 transition hover:text-white"
            aria-label="Toggle language"
          >
            {lang === "fr" ? "FR / en" : "fr / EN"}
          </button>
          <Link
            to="/contact"
            className="hidden text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:text-white md:inline"
          >
            {t.nav.contact}
          </Link>
          <a
            href="/api/auth/takatak/start"
            className="hidden text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:text-white md:inline"
          >
            TAKATAK
          </a>
          <Link
            to="/revpere"
            className="hidden bg-[color:var(--leaf)] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[color:var(--teal-deep)] sm:inline-block"
          >
            {lang === "fr" ? "Commencer" : "Get started"}
          </Link>
          <button
            className="-mr-2 p-2 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-white/12 bg-ink lg:hidden">
          <div className="px-5 py-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
              RêvPÈRE
            </div>
            <Link
              to="/revpere"
              className="mt-3 block border-b border-white/10 py-3 font-display text-2xl"
            >
              {t.nav.pillars}
            </Link>
            {PILLARS.map((p, i) => (
              <Link
                key={p}
                to="/piliers/$pilier"
                params={{ pilier: p }}
                className="flex items-baseline gap-4 border-b border-white/8 py-3 text-base text-white/75"
              >
                <span className="font-display text-xs text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {pillarLabel[p]}
              </Link>
            ))}

            <div className="mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
              REVERS CANADA
            </div>
            {[...mainLinks, { to: "/contact", label: t.nav.contact } as const].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="block border-b border-white/10 py-3 font-display text-2xl"
              >
                {l.label}
              </Link>
            ))}

            <Link
              to="/revpere"
              className="mt-8 block bg-[color:var(--leaf)] px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.16em] text-white"
            >
              {lang === "fr" ? "Commencer" : "Get started"}
            </Link>
            <a
              href="/api/auth/takatak/start"
              className="mt-3 block border border-white/25 px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.16em] text-white/85"
            >
              Compte TAKATAK
            </a>
            <Link
              to="/donate"
              className="mt-3 block border border-white/25 px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.16em] text-white/85"
            >
              {t.nav.donateCta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
