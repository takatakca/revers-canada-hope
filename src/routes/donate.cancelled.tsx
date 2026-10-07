import { createFileRoute, Link } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

export const Route = createFileRoute("/donate/cancelled")({
  head: () => ({
    meta: [{ title: "Paiement annulé — Revers Canada" }, { name: "robots", content: "noindex" }],
  }),
  component: CancelledPage,
});

function CancelledPage() {
  const { lang } = useLang();
  return (
    <section className="bg-[color:var(--cream)] py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <XCircle className="mx-auto h-16 w-16 text-muted-foreground" aria-hidden />
        <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">
          {lang === "fr" ? "Paiement annulé" : "Payment cancelled"}
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          {lang === "fr"
            ? "Le paiement n'a pas été complété. Vous pouvez réessayer ou communiquer avec REVERS CANADA."
            : "The payment was not completed. You can try again or contact REVERS CANADA."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/donate"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {lang === "fr" ? "Réessayer" : "Try again"}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-muted"
          >
            {lang === "fr" ? "Nous contacter" : "Contact us"}
          </Link>
        </div>
      </div>
    </section>
  );
}
