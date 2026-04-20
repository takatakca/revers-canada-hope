import type { ReactNode } from "react";

export function DonationCard({
  amount,
  impact,
  highlight = false,
  icon,
  onSelect,
  selected = false,
}: {
  amount: string;
  impact: string;
  highlight?: boolean;
  icon?: ReactNode;
  onSelect?: () => void;
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex h-full flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition ${
        selected
          ? "border-[color:var(--leaf)] bg-white shadow-soft"
          : highlight
            ? "border-[color:var(--qc-blue)] bg-white shadow-card hover:-translate-y-0.5"
            : "border-transparent bg-white shadow-card hover:-translate-y-0.5"
      }`}
    >
      {highlight && !selected && (
        <span className="absolute -top-2 right-4 rounded-full bg-[color:var(--leaf)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          Populaire
        </span>
      )}
      {icon && (
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--soft)] text-[color:var(--qc-blue)]">
          {icon}
        </span>
      )}
      <div className="font-display text-3xl text-[color:var(--navy)]">{amount}</div>
      <p className="text-sm text-muted-foreground">{impact}</p>
    </button>
  );
}
