import { Link } from "@tanstack/react-router";
import { Heart, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingCTA({ label = "Soutenir" }: { label?: string }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Retour en haut"
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-[color:var(--navy)] shadow-card transition hover:scale-105"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      <Link
        to="/donate"
        aria-label={label}
        className="pulse-ring group grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[color:var(--leaf)] to-[color:var(--qc-blue)] text-white shadow-float transition hover:scale-105 sm:h-[72px] sm:w-[72px]"
      >
        <Heart className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="sr-only">{label}</span>
      </Link>
    </div>
  );
}
