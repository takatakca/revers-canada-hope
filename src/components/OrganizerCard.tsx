import { ArrowRight } from "lucide-react";

export function OrganizerCard({
  name,
  role,
  city,
  raised,
  goal,
  image,
}: {
  name: string;
  role: string;
  city: string;
  raised?: number;
  goal?: number;
  image?: string;
}) {
  const pct = raised && goal ? Math.min(100, Math.round((raised / goal) * 100)) : null;
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft">
      <div className="aspect-[4/3] overflow-hidden bg-[color:var(--soft)]">
        {image ? (
          <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center font-display text-5xl text-[color:var(--qc-blue)]/40">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--qc-blue)]">{role}</p>
        <h3 className="mt-1 font-display text-2xl text-[color:var(--navy)]">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{city}</p>
        {pct !== null && (
          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--soft)]">
              <div className="h-full rounded-full bg-gradient-to-r from-[color:var(--qc-blue)] to-[color:var(--leaf)]" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold text-[color:var(--navy)]">{raised?.toLocaleString("fr-CA")} $</span>
              <span>{pct}% de {goal?.toLocaleString("fr-CA")} $</span>
            </div>
          </div>
        )}
        <button className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--qc-blue)] hover:underline">
          Soutenir <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
