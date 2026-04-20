import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, MapPin, Clock, PackageCheck } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import intlImg from "@/assets/help-international.jpg";
import animalsImg from "@/assets/help-animals.jpg";

export const Route = createFileRoute("/international")({
  head: () => ({
    meta: [
      { title: "Aide internationale — Dons matériels — Revers Canada" },
      {
        name: "description",
        content:
          "Déposez vêtements, nourriture, médicaments et fournitures vétérinaires dans nos points de collecte. Aucun don monétaire pour ce programme.",
      },
      { property: "og:title", content: "Aide internationale — Revers Canada" },
      {
        property: "og:description",
        content:
          "Programme de dons matériels (vêtements, nourriture, soins vétérinaires) pour les communautés à l'étranger.",
      },
      { property: "og:image", content: intlImg },
    ],
  }),
  component: IntlPage,
});

function IntlPage() {
  const { t } = useLang();
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white">
        <img
          src={intlImg}
          alt=""
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="font-display text-5xl sm:text-6xl">{t.international.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{t.international.lead}</p>
        </div>
      </section>

      {/* NOTICE */}
      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex gap-4 rounded-2xl border-l-4 border-[color:var(--leaf)] bg-[color:var(--cream)] p-6 shadow-card">
            <AlertCircle className="h-6 w-6 shrink-0 text-[color:var(--teal-deep)]" />
            <div>
              <h2 className="font-display text-xl text-ink">{t.international.noticeT}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.international.noticeD}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE ACCEPT */}
      <section className="bg-[color:var(--cream)] py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-4xl text-ink">{t.international.acceptT}</h2>
            <ul className="mt-6 space-y-3">
              {t.international.accept.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card">
                  <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--leaf)]" />
                  <span className="text-sm text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img src={animalsImg} alt="" width={1280} height={896} loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* DROP OFF */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-4xl text-ink">{t.international.dropT}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {t.international.drops.map((d) => (
              <div key={d.city} className="rounded-2xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl text-ink">{d.city}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.addr}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--teal-deep)]">
                  <Clock className="h-3.5 w-3.5" /> {d.hours}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-gradient-band py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl">{t.international.whyT}</h2>
          <p className="mt-4 text-white/90">{t.international.whyD}</p>
        </div>
      </section>
    </>
  );
}
