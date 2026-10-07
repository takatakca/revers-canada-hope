import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export function EditorialHero({
  label,
  title,
  lead,
  image,
}: {
  label?: string;
  title: string;
  lead: string;
  image?: string;
}) {
  if (image) {
    return (
      <section className="bg-ink text-primary-foreground">
        <div className="home-shell grid lg:grid-cols-12">
          <div className="flex flex-col justify-end px-5 pb-14 pt-28 sm:px-8 lg:col-span-5 lg:px-0 lg:pr-12">
            {label && <p className="editorial-label text-leaf">{label}</p>}
            <h1 className="editorial-title mt-5 text-primary-foreground">{title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/75">{lead}</p>
          </div>
          <div className="relative min-h-[320px] lg:col-span-7 lg:min-h-[560px]">
            <img
              src={image}
              alt=""
              width={1600}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-ink pb-16 pt-24 text-primary-foreground sm:pb-20 sm:pt-28">
      <div className="home-shell grid gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-0">
        <div className="lg:col-span-7">
          {label && <p className="editorial-label text-leaf">{label}</p>}
          <h1 className="editorial-title mt-5 text-primary-foreground">{title}</h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-primary-foreground/75 lg:col-span-4 lg:col-start-9 lg:self-end">
          {lead}
        </p>
      </div>
    </section>
  );
}

export function EditorialList({
  items,
  cols = 2,
}: {
  items: { t: string; d: string }[];
  cols?: 2 | 3;
}) {
  return (
    <div
      className={`grid border-t border-ink/20 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
    >
      {items.map((c, i) => (
        <Reveal key={c.t} className="border-b border-ink/20 py-9 md:pr-10">
          <span className="text-xs font-bold tabular-nums text-teal-deep">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h2 className="mt-3 text-3xl leading-tight text-ink">{c.t}</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{c.d}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function EditorialNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-12 max-w-3xl border-l border-leaf pl-5">
      <p className="font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-6 text-ink/75">{children}</p>
    </div>
  );
}

export function EditorialCta({
  title,
  body,
  cta,
  to = "/contact",
}: {
  title: string;
  body: string;
  cta: string;
  to?: "/contact" | "/donate";
}) {
  return (
    <section className="bg-leaf py-16 text-ink sm:py-20">
      <div className="home-shell flex flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-0">
        <div>
          <h2 className="max-w-3xl text-4xl leading-[1.04] sm:text-5xl">{title}</h2>
          {body && <p className="mt-5 max-w-2xl leading-7 text-ink/75">{body}</p>}
        </div>
        <Link to={to}>
          <Button size="lg" className="rounded-none bg-ink text-primary-foreground hover:bg-ink/90">
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
