import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, X, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLang } from "@/i18n/LangContext";
import { Reveal } from "@/components/Reveal";
import { EditorialHero, EditorialNote, EditorialCta } from "@/components/Editorial";

const normalize = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const Route = createFileRoute("/ressources")({
  head: () => ({
    meta: [
      { title: "Bottin de ressources pour les pères — Montréal | REVERS CANADA" },
      {
        name: "description",
        content:
          "Guide d’orientation pour les pères : logement, alimentation, santé mentale, emploi et droit familial à Montréal.",
      },
      { property: "og:title", content: "Bottin de ressources pour les pères — Montréal | REVERS CANADA" },
      {
        property: "og:description",
        content: "Trouver la bonne porte est souvent le plus difficile. Voici les ressources montréalaises regroupées par besoin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { t, lang } = useLang();
  const r = t.resources;
  const [search, setSearch] = useState("");
  const query = normalize(search.trim());
  const categories = query
    ? r.categories.filter((category) =>
        normalize([category.t, category.d, ...category.items].join(" ")).includes(query),
      )
    : r.categories;
  return (
    <>
      <EditorialHero label="Bottin" title={r.title} lead={r.lead} />
      <section className="section-space bg-background">
        <div className="home-shell px-5 sm:px-8 lg:px-0">
          <EditorialNote title="Urgence">{r.urgent}</EditorialNote>
          <div className="mt-10 max-w-xl">
            <label htmlFor="resource-search" className="mb-2 block text-sm font-semibold text-ink">
              {lang === "fr" ? "Rechercher par besoin" : "Search by need"}
            </label>
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" aria-hidden />
              <Input id="resource-search" type="search" value={search} maxLength={120}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={lang === "fr" ? "Ex. garde, logement, emploi…" : "E.g. custody, housing, employment…"}
                className="h-12 rounded-none pl-12 pr-10" />
              {search ? <button type="button" onClick={() => setSearch("")}
                aria-label={lang === "fr" ? "Effacer la recherche" : "Clear search"}
                className="absolute right-3 p-1 text-muted-foreground hover:text-ink"><X className="h-4 w-4" /></button> : null}
            </div>
            <p className="mt-2 text-sm text-muted-foreground" role="status" aria-live="polite">
              {categories.length} {lang === "fr" ? "catégorie(s)" : "categories"}
            </p>
          </div>
          <div className="mt-10 grid border-t border-ink/20 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.t} className="border-b border-ink/20 py-9 md:pr-10">
                <span className="text-xs font-bold tabular-nums text-teal-deep">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-3xl leading-tight text-ink">{c.t}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
                <ul className="mt-4 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="border-l border-leaf pl-3 text-sm text-ink/80">{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          {categories.length === 0 && <p className="py-8 text-sm text-muted-foreground">
            {lang === "fr" ? "Aucune correspondance. Essayez un autre terme." : "No matching category. Try another search."}
          </p>}
          <section aria-labelledby="external-help" className="mt-16 border-t border-ink/20 pt-10">
            <h2 id="external-help" className="text-3xl text-ink">
              {lang === "fr" ? "Services externes pour aller plus loin" : "External services for next steps"}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <a href="https://www.211qc.ca/" target="_blank" rel="noopener noreferrer"
                className="border border-ink/20 p-6 transition hover:border-teal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-deep">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-ink">211 Grand Montréal <ExternalLink className="h-4 w-4" aria-hidden /></h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {lang === "fr" ? "Références communautaires : alimentation, logement et services près de chez vous." : "Community referrals for food, housing and local social services."}
                </p>
              </a>
              <a href="https://www.juridiqc.gouv.qc.ca/separation-et-divorce" target="_blank" rel="noopener noreferrer"
                className="border border-ink/20 p-6 transition hover:border-teal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-deep">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-ink">JuridiQC <ExternalLink className="h-4 w-4" aria-hidden /></h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {lang === "fr" ? "Information sur la séparation, les enfants et la médiation familiale." : "Information on separation, children and family mediation."}
                </p>
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {lang === "fr" ? "Ces services sont indépendants de REVERS CANADA." : "These services are independent of REVERS CANADA."}
            </p>
          </section>
          <p className="mt-10 max-w-3xl text-sm leading-6 text-ink/70">{r.note}</p>
        </div>
      </section>
      <EditorialCta title={r.helpT} body={r.helpD} cta={t.nav.contact} />
    </>
  );
}
