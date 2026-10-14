import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};

function PhonePreview() {
  return (
    <div className="mx-auto w-[220px] rounded-[2rem] border-8 border-ink bg-background p-3 shadow-xl">
      <div className="bg-ink px-3 py-4 text-primary-foreground">
        <p className="text-[10px] uppercase tracking-widest text-leaf">REVERS CANADA</p>
        <p className="mt-1 text-sm font-semibold">RêvPÈRE</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {["Emploi", "Alimentation", "Habitation", "Ressources"].map((label) => (
          <div key={label} className="bg-muted px-2 py-4 text-center text-[11px] font-medium text-ink">
            {label}
          </div>
        ))}
      </div>
      <p className="mt-3 bg-leaf px-2 py-2 text-center text-[11px] font-semibold text-ink">
        Un site, plusieurs ressources
      </p>
      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        Aperçu illustratif
      </p>
    </div>
  );
}

/** Browser installation prompt when available; accurate device instructions otherwise. */
export function AppAndPartners() {
  const { lang } = useLang();
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const browser = navigator as Navigator & { standalone?: boolean };
    setInstalled(window.matchMedia("(display-mode: standalone)").matches || browser.standalone === true);

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
      setShowInstructions(false);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (installed) return;
    if (!installEvent) {
      setShowInstructions((previous) => !previous);
      return;
    }

    try {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      setShowInstructions(choice.outcome !== "accepted");
    } catch {
      setShowInstructions(true);
    } finally {
      setInstallEvent(null);
    }
  };

  return (
    <section className="border-t border-ink/15 bg-background py-16 sm:py-20">
      <div className="home-shell grid gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-0">
        <div className="lg:col-span-7">
          <p className="editorial-label text-teal-deep">
            {lang === "fr" ? "Accès mobile" : "Mobile access"}
          </p>
          <h2 className="mt-4 max-w-xl text-4xl leading-[1.05] text-ink sm:text-5xl">
            {lang === "fr" ? "REVERS CANADA dans votre poche." : "REVERS CANADA in your pocket."}
          </h2>
          <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
            {lang === "fr"
              ? "Ajoutez ce site à l'écran d'accueil de votre téléphone pour retrouver les ressources et les programmes facilement."
              : "Add this website to your phone's home screen for easy access to resources and programs."}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button type="button" size="lg" disabled={installed} onClick={handleInstall}
              className="rounded-none bg-ink text-primary-foreground hover:bg-ink/90">
              {installed ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Smartphone className="mr-2 h-4 w-4" />}
              {installed
                ? lang === "fr" ? "Déjà installé" : "Already installed"
                : lang === "fr" ? "Ajouter à mon téléphone" : "Add to my phone"}
            </Button>
            {!installed && !installEvent && (
              <span className="text-xs text-muted-foreground">
                {lang === "fr" ? "Instructions selon votre appareil" : "Device-specific instructions"}
              </span>
            )}
          </div>
          {showInstructions && !installed && (
            <div className="mt-5 max-w-lg border-l-2 border-teal-deep bg-muted/40 p-5 text-sm text-ink"
              role="status">
              <p className="font-semibold">
                {lang === "fr" ? "Installation depuis le navigateur" : "Install from your browser"}
              </p>
              <p className="mt-2 leading-6">
                {lang === "fr"
                  ? "iPhone (Safari) : touchez Partager, puis « Sur l'écran d'accueil ». Android (Chrome) : ouvrez le menu ⋮ puis « Ajouter à l'écran d'accueil » ou « Installer l'application ». Les options dépendent du navigateur."
                  : "iPhone (Safari): tap Share, then Add to Home Screen. Android (Chrome): open the ⋮ menu and choose Add to Home Screen or Install app. Options depend on your browser."}
              </p>
            </div>
          )}

          <div className="mt-12 border-t border-ink/15 pt-8">
            <p className="font-semibold text-ink">
              {lang === "fr" ? "Agir avec REVERS CANADA" : "Get involved with REVERS CANADA"}
            </p>
            <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold text-teal-deep">
              <Link to="/ressources" className="inline-flex items-center gap-2 hover:underline">
                {lang === "fr" ? "Trouver de l'aide" : "Find support"} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/partenaires" className="inline-flex items-center gap-2 hover:underline">
                {lang === "fr" ? "Devenir partenaire" : "Become a partner"} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/donate" className="inline-flex items-center gap-2 hover:underline">
                {lang === "fr" ? "Soutenir la mission" : "Support the mission"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 lg:col-start-9"><PhonePreview /></div>
      </div>
    </section>
  );
}
