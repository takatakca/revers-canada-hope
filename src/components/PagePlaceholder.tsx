import type { ReactNode } from "react";

export function PagePlaceholder({ kicker, children }: { kicker?: string; children?: ReactNode }) {
  return (
    <section className="bg-textured py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        {kicker && (
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--qc-blue)]">
            {kicker}
          </p>
        )}
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{children}</p>
      </div>
    </section>
  );
}
