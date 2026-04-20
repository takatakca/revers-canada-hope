import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABlock({
  title,
  body,
  ctaLabel,
  ctaTo = "/donate",
  variant = "gradient",
  icon = "heart",
}: {
  title: ReactNode;
  body?: ReactNode;
  ctaLabel: string;
  ctaTo?: "/donate" | "/further" | "/contact" | "/international";
  variant?: "gradient" | "light";
  icon?: "heart" | "arrow";
}) {
  const Icon = icon === "heart" ? Heart : ArrowRight;
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div
        className={`mx-auto max-w-5xl rounded-3xl px-6 py-12 text-center shadow-soft sm:px-12 sm:py-16 ${
          variant === "gradient"
            ? "bg-gradient-hero text-white"
            : "bg-white text-[color:var(--navy)]"
        }`}
      >
        <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
        {body && (
          <p
            className={`mx-auto mt-4 max-w-2xl text-base sm:text-lg ${
              variant === "gradient" ? "text-white/90" : "text-muted-foreground"
            }`}
          >
            {body}
          </p>
        )}
        <Link to={ctaTo} className="mt-8 inline-block">
          <Button
            size="lg"
            className={
              variant === "gradient"
                ? "bg-white text-[color:var(--navy)] hover:bg-white/90"
                : "bg-gradient-to-r from-[color:var(--leaf)] to-[color:var(--qc-blue)] text-white"
            }
          >
            <Icon className="mr-2 h-4 w-4" /> {ctaLabel}
          </Button>
        </Link>
      </div>
    </section>
  );
}
