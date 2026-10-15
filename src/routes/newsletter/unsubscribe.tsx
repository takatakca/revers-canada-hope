import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LangContext";

type Result = "idle" | "saving" | "success" | "invalid" | "error";

export const Route = createFileRoute("/newsletter/unsubscribe")({
  head: () => ({
    meta: [
      { title: "Désinscription de l'infolettre — REVERS CANADA" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: NewsletterUnsubscribe,
});

function NewsletterUnsubscribe() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const [token, setToken] = useState<string | null>(null);
  const [state, setState] = useState<Result>("idle");

  useEffect(() => {
    const value = new URL(window.location.href).searchParams.get("token") ?? "";
    setToken(value);
    if (!value) setState("invalid");
  }, []);

  async function unsubscribe() {
    if (!token || state === "saving" || state === "success") return;
    setState("saving");
    try {
      const response = await fetch("/api/public/newsletter/unsubscribe", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const body = (await response.json()) as { ok?: boolean };
      if (response.ok && body.ok === true) {
        setState("success");
        return;
      }
      setState(response.status === 400 ? "invalid" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-4xl text-ink">
        {fr ? "Se désinscrire de l’infolettre" : "Unsubscribe from the newsletter"}
      </h1>
      {state === "success" ? (
        <p role="status" className="mt-6 text-base leading-7 text-ink">
          {fr
            ? "Votre demande de désinscription a été enregistrée. Aucun autre envoi de cette liste ne devrait vous parvenir."
            : "Your unsubscribe request has been saved. You should no longer receive messages from this list."}
        </p>
      ) : state === "invalid" ? (
        <p role="alert" className="mt-6 text-sm text-ink">
          {fr
            ? "Ce lien de désinscription est invalide. Utilisez le lien fourni dans votre courriel."
            : "This unsubscribe link is invalid. Please use the link in your email."}
        </p>
      ) : (
        <>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            {fr
              ? "Confirmez votre désinscription. L’ouverture du lien seule ne modifie pas vos préférences."
              : "Please confirm your unsubscribe request. Opening this link alone does not change your preferences."}
          </p>
          {state === "error" && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {fr
                ? "Impossible de sauvegarder la désinscription. Réessayez."
                : "We could not save your unsubscribe request. Please try again."}
            </p>
          )}
          <button
            type="button"
            onClick={() => void unsubscribe()}
            disabled={!token || state === "saving"}
            className="mt-6 rounded-md bg-teal-deep px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {state === "saving"
              ? fr
                ? "Enregistrement…"
                : "Saving…"
              : fr
                ? "Confirmer la désinscription"
                : "Confirm unsubscribe"}
          </button>
        </>
      )}
      <p className="mt-8 text-sm text-muted-foreground">
        <Link to="/privacy" className="font-semibold text-teal-deep underline">
          {fr ? "Confidentialité" : "Privacy"}
        </Link>
      </p>
    </section>
  );
}
