import type { ReactNode } from "react";

export function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--charcoal)] text-white">
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-45"
          />
          <div
            className={`absolute inset-0 ${
              align === "center"
                ? "bg-gradient-to-b from-[color:var(--charcoal)]/85 via-[color:var(--charcoal)]/55 to-[color:var(--charcoal)]/90"
                : "bg-gradient-to-r from-[color:var(--charcoal)] via-[color:var(--charcoal)]/80 to-transparent"
            }`}
          />
        </div>
      )}
      <div
        className={`relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {eyebrow && (
          <p className="reveal-up mb-4 inline-block rounded-full border border-white/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
            {eyebrow}
          </p>
        )}
        <h1
          className={`reveal-up font-display text-4xl leading-[0.95] sm:text-6xl lg:text-7xl ${
            align === "center" ? "mx-auto max-w-4xl" : "max-w-3xl"
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`reveal-up mt-6 text-base text-white/85 sm:text-lg ${
              align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
            }`}
          >
            {subtitle}
          </p>
        )}
        {children && <div className="reveal-up mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
