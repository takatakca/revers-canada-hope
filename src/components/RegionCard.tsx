import { MapPin } from "lucide-react";

export function RegionCard({
  region,
  city,
  hours,
  address,
}: {
  region: string;
  city: string;
  hours?: string;
  address?: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--leaf)]">{region}</p>
      <h3 className="mt-1 font-display text-2xl text-[color:var(--navy)]">{city}</h3>
      {address && (
        <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--qc-blue)]" />
          <span>{address}</span>
        </p>
      )}
      {hours && <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[color:var(--navy)]/70">{hours}</p>}
    </article>
  );
}
