import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Clock3, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useLang } from "@/i18n/LangContext";
import { getDonationCheckoutStatus } from "@/lib/checkout.functions";

export const Route = createFileRoute("/donate/success")({
  head: () => ({
    meta: [
      { title: "Suivi de votre don — REVERS CANADA" },
      { name: "description", content: "Vérification du statut de votre don avec Stripe." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

type PaymentStatus = "checking" | "paid" | "pending" | "unavailable";

function SuccessPage() {
  const { lang } = useLang();
  const [status, setStatus] = useState<PaymentStatus>("checking");
  const getStatus = useServerFn(getDonationCheckoutStatus);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
      setStatus("unavailable");
      return;
    }
    let active = true;
    getStatus({ data: { session_id: sessionId } })
      .then((result) => {
        if (active) setStatus(result.status);
      })
      .catch(() => {
        if (active) setStatus("unavailable");
      });
    return () => { active = false; };
  }, [getStatus]);

  const copy = {
    checking: {
      title: lang === "fr" ? "Vérification du paiement" : "Checking your payment",
      description: lang === "fr"
        ? "Nous vérifions le statut directement auprès de Stripe."
        : "We are checking the status directly with Stripe.",
    },
    paid: {
      title: lang === "fr" ? "Merci pour votre soutien" : "Thank you for your support",
      description: lang === "fr"
        ? "Stripe confirme la réception de votre paiement. Votre soutien compte pour les familles de REVERS CANADA."
        : "Stripe confirms your payment was received. Your support matters to REVERS CANADA families.",
    },
    pending: {
      title: lang === "fr" ? "Confirmation en attente" : "Confirmation pending",
      description: lang === "fr"
        ? "Stripe n’a pas encore confirmé le paiement. Aucun don n'est déclaré payé avant cette confirmation."
        : "Stripe has not confirmed payment yet. We do not mark the donation paid until it is confirmed.",
    },
    unavailable: {
      title: lang === "fr" ? "Statut non disponible" : "Status unavailable",
      description: lang === "fr"
        ? "Nous ne pouvons pas vérifier le paiement pour l’instant. Consultez votre confirmation Stripe ou contactez-nous."
        : "We cannot verify the payment right now. Check your Stripe confirmation or contact us.",
    },
  }[status];

  return (
    <section className="bg-[color:var(--cream)] py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6" role="status" aria-live="polite">
        {status === "paid" ? <CheckCircle2 className="mx-auto h-16 w-16 text-[color:var(--leaf)]" aria-hidden />
          : status === "checking" ? <Loader2 className="mx-auto h-16 w-16 animate-spin text-teal-deep" aria-hidden />
          : status === "pending" ? <Clock3 className="mx-auto h-16 w-16 text-teal-deep" aria-hidden />
          : <AlertCircle className="mx-auto h-16 w-16 text-muted-foreground" aria-hidden />}
        <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">{copy.title}</h1>
        <p className="mt-4 text-base text-muted-foreground">{copy.description}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          {lang === "fr"
            ? "La confirmation de paiement ne constitue pas un reçu fiscal officiel."
            : "Payment confirmation is not an official tax receipt."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            {lang === "fr" ? "Retour à l'accueil" : "Back to home"}
          </Link>
          {status !== "paid" && <Link to="/contact" className="inline-flex items-center justify-center rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-muted">
            {lang === "fr" ? "Nous contacter" : "Contact us"}
          </Link>}
        </div>
      </div>
    </section>
  );
}
