import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

export const Route = createFileRoute("/donate/success")({
  head: () => ({
    meta: [
      { title: "Merci pour votre don — Revers Canada" },
      { name: "description", content: "Confirmation de votre intention de don à Revers Canada." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { lang } = useLang();
  return (
    <section className="bg-[color:var(--cream)] py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <CheckCircle2 className="mx-auto h-16 w-16 text-[color:var(--leaf)]" aria-hidden />
        <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">
          {lang === "fr" ? "Merci pour votre soutien" : "Thank you for your support"}
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          {lang === "fr"
            ? "Si le paiement a été confirmé par Stripe, votre don sera enregistré officiellement dans notre système. Vous recevrez un courriel de confirmation de Stripe."
            : "If the payment is confirmed by Stripe, your donation will be officially recorded in our system. You will receive a confirmation email from Stripe."}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          {lang === "fr"
            ? "Ce courriel ou cette confirmation ne constitue pas un reçu fiscal officiel."
            : "This email or confirmation does not constitute an official tax receipt."}
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {lang === "fr" ? "Retour à l'accueil" : "Back to home"}
          </Link>
        </div>
      </div>
    </section>
  );
}
