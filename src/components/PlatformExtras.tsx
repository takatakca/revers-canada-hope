import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, Smartphone, Bell, Heart, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

/** VISUAL ONLY — no backend, no install logic, no ad scripts. */

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("rc_welcome_seen")) return;
    const id = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(id);
  }, []);
  if (!open) return null;
  const close = () => {
    sessionStorage.setItem("rc_welcome_seen", "1");
    setOpen(false);
  };
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenue"
    >
      <div className="relative w-full max-w-md bg-background p-7 shadow-xl">
        <button
          onClick={close}
          aria-label="Fermer"
          className="absolute right-3 top-3 p-2 text-ink/60 hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="editorial-label text-teal-deep">Bienvenue chez REVERS CANADA</p>
        <h2 className="mt-3 text-3xl leading-tight text-ink">Par où voulez-vous commencer?</h2>
        <div className="mt-6 grid border-t border-ink/15">
          {[
            {
              icon: UserPlus,
              t: "Je veux participer",
              d: "Inscription participant — bientôt",
              to: "/revpere" as const,
            },
            {
              icon: Heart,
              t: "Je veux soutenir",
              d: "Faire un don ou devenir partenaire",
              to: "/donate" as const,
            },
            {
              icon: Bell,
              t: "J'ai besoin d'aide",
              d: "Trouver une ressource près de chez moi",
              to: "/ressources" as const,
            },
          ].map(({ icon: I, t, d, to }) => (
            <Link
              key={t}
              to={to}
              onClick={close}
              className="flex items-center gap-4 border-b border-ink/15 py-4 hover:bg-muted"
            >
              <I className="h-5 w-5 shrink-0 text-teal-deep" />
              <span>
                <span className="block font-semibold text-ink">{t}</span>
                <span className="block text-sm text-muted-foreground">{d}</span>
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">Gestion numérique par TAKATAK</p>
      </div>
    </div>
  );
}

export function AnnouncementStrip() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="bg-leaf text-ink">
      <div className="home-shell flex items-center justify-between gap-3 px-5 py-3 text-sm sm:px-8 lg:px-0">
        <span className="flex items-center gap-2">
          <Bell className="h-4 w-4" /> Annonce : inscriptions aux ateliers numériques bientôt
          ouvertes.
        </span>
        <button onClick={() => setHidden(true)} aria-label="Masquer l'annonce">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function AdSlot({ label }: { label: string }) {
  return (
    <div className="flex min-h-[140px] flex-col items-center justify-center border border-dashed border-ink/25 bg-muted/40 p-6 text-center">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="mt-2 text-sm text-ink/70">Annonce à venir</span>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="mx-auto w-[220px] rounded-[2rem] border-8 border-ink bg-background p-3 shadow-xl">
      <div className="bg-ink px-3 py-4 text-primary-foreground">
        <p className="text-[10px] uppercase tracking-widest text-leaf">REVERS</p>
        <p className="mt-1 text-sm font-semibold">Bonjour 👋</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {["Emploi", "Aide alimentaire", "Habitation", "Ressources"].map((x) => (
          <div key={x} className="bg-muted px-2 py-4 text-center text-[11px] font-medium text-ink">
            {x}
          </div>
        ))}
      </div>
      <div className="mt-3 bg-leaf px-2 py-2 text-center text-[11px] font-semibold text-ink">
        Prochain atelier : IA
      </div>
    </div>
  );
}

export function AppAndPartners() {
  return (
    <section className="border-t border-ink/15 bg-background py-16 sm:py-20">
      <div className="home-shell grid gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-0">
        <div className="lg:col-span-7">
          <p className="editorial-label text-teal-deep">Application mobile</p>
          <h2 className="mt-4 max-w-xl text-4xl leading-[1.05] text-ink sm:text-5xl">
            REVERS CANADA dans votre poche.
          </h2>
          <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
            Ajoutez le site à l'écran d'accueil de votre téléphone : ressources, ateliers et
            annonces en un geste.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="rounded-none bg-ink text-primary-foreground hover:bg-ink/90"
            >
              <Smartphone className="mr-2 h-4 w-4" /> Télécharger sur mon téléphone
            </Button>
            <span className="self-center text-xs text-muted-foreground">
              iPhone : Partager → « Sur l'écran d'accueil »
            </span>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <AdSlot label="Espace partenaire" />
            <AdSlot label="Publicité locale" />
            <AdSlot label="Commanditaire communautaire" />
          </div>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <PhoneMock />
        </div>
      </div>
      <p className="home-shell mt-12 px-5 text-xs text-muted-foreground sm:px-8 lg:px-0">
        Propulsé par TAKATAK · Espace publicitaire Google AdSense à venir
      </p>
    </section>
  );
}
