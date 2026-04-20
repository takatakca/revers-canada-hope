import { Link } from "@tanstack/react-router";
import { X, Heart, Globe } from "lucide-react";
import { useEffect } from "react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";

type Item = { to: "/" | "/donate" | "/further" | "/international" | "/organizers" | "/brochures" | "/contact" | "/about"; label: string };

export function OverlayMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, lang, setLang } = useLang();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const groups: { title: string; items: Item[] }[] = [
    {
      title: t.navGroups.discover,
      items: [
        { to: "/", label: t.nav.home },
        { to: "/about", label: t.nav.about },
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
      items: [
        { to: "/brochures", label: t.nav.brochures },
        { to: "/contact", label: t.nav.contact },
      ],
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-[60] transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[color:var(--charcoal)] text-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <span className="font-display text-xl tracking-wide">
            REVERS<span className="text-[color:var(--leaf)]">CANADA</span>
          </span>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-6 py-6">
          {groups.map((g) => (
            <div key={g.title} className="mb-8">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--teal)]">
                {g.title}
              </p>
              <ul className="space-y-1">
                {g.items.map((it) => (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      onClick={onClose}
                      className="block rounded-md py-2 font-display text-2xl uppercase tracking-wide text-white transition hover:text-[color:var(--leaf)]"
                      activeProps={{ className: "text-[color:var(--leaf)]" }}
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold uppercase"
            >
              <Globe className="h-3.5 w-3.5" /> {lang === "fr" ? "English" : "Français"}
            </button>
            <Link to="/donate" onClick={onClose} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-[color:var(--leaf)] to-[color:var(--qc-blue)] text-white">
                <Heart className="mr-1.5 h-4 w-4" /> {t.nav.donateCta}
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
