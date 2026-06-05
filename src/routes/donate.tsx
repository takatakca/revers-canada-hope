import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, ShieldCheck, Loader2 } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { saveDonationIntent } from "@/lib/donationService";
import { useServerFn } from "@tanstack/react-start";
import { createDonationCheckout, isStripeConfigured } from "@/lib/checkout.functions";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Faire un don — Revers Canada" },
      {
        name: "description",
        content:
          "Soutenez les femmes et enfants du Québec avec un don ponctuel ou mensuel sécurisé par Stripe. Reçu fiscal officiel.",
      },
      { property: "og:title", content: "Faire un don — Revers Canada" },
      {
        property: "og:description",
        content: "Don sécurisé par Stripe. Reçu fiscal pour tout don de 20 $ et plus.",
      },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  const { t, lang } = useLang();
  const [type, setType] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<string>("50");
  const [other, setOther] = useState("");
  const [coverFee, setCoverFee] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);

  const checkConfig = useServerFn(isStripeConfigured);
  const createCheckout = useServerFn(createDonationCheckout);

  useEffect(() => {
    checkConfig().then((r) => setStripeReady(Boolean(r?.configured))).catch(() => {});
  }, [checkConfig]);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const raw = other.trim() !== "" ? other : amount;
    setSubmitting(true);
    try {
      const result = await saveDonationIntent({
        amount: raw,
        frequency: type,
        coverFee,
        lang,
      });
      if (!result.ok) {
        toast.error(t.donate.invalidAmount);
        return;
      }

      // If Stripe is configured AND we have a DB id, try Checkout.
      if (stripeReady && result.intentId) {
        toast.loading(t.donate.preparing, { id: "checkout" });
        try {
          const checkout = await createCheckout({
            data: { donation_intent_id: result.intentId },
          });
          if (checkout.ok && checkout.checkout_url) {
            toast.success(t.donate.redirecting, { id: "checkout" });
            window.location.href = checkout.checkout_url;
            return;
          }
          toast.dismiss("checkout");
          toast.error(t.donate.stripeUnavailable);
          return;
        } catch (err) {
          toast.dismiss("checkout");
          if (import.meta.env.DEV) console.warn("[donate] checkout failed:", err);
          toast.error(t.donate.stripeUnavailable);
          return;
        }
      }

      // Fallback: just confirm intent saved.
      toast.success(t.donate.intentSaved(String(result.intent.amount)));
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <>
      <section className="bg-gradient-hero py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-5xl sm:text-6xl">{t.donate.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{t.donate.lead}</p>
        </div>
      </section>
      <div className="relative h-10 bg-gradient-hero">
        <div className="absolute inset-x-0 -bottom-px h-10 bg-[color:var(--cream)] torn-top" />
      </div>

      <section className="bg-[color:var(--cream)] py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          {/* IMPACT */}
          <div>
            <h2 className="font-display text-3xl text-ink">{t.donate.verseT}</h2>
            <ul className="mt-5 space-y-3">
              {t.donate.impactList.map((i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card">
                  <Heart className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--leaf)]" />
                  <span className="text-sm text-ink">{i}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-2 rounded-xl bg-white p-4 text-sm text-muted-foreground shadow-card">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--teal-deep)]" />
              <span>{t.donate.stripeNote}</span>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleDonate} className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-border">
              {([
                { k: "once", l: t.donate.onceT },
                { k: "monthly", l: t.donate.monthlyT },
              ] as const).map((tab) => (
                <button
                  key={tab.k}
                  type="button"
                  onClick={() => setType(tab.k)}
                  className={`px-4 py-3 text-sm font-bold uppercase tracking-wider transition ${
                    type === tab.k
                      ? "bg-[color:var(--teal)] text-white"
                      : "bg-white text-ink hover:bg-muted"
                  }`}
                >
                  {tab.l}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {t.donate.amounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => {
                    setAmount(a);
                    setOther("");
                  }}
                  className={`rounded-xl border-2 px-3 py-4 text-lg font-bold transition ${
                    amount === a && !other
                      ? "border-[color:var(--leaf)] bg-[color:var(--leaf)] text-white"
                      : "border-border bg-white text-ink hover:border-[color:var(--teal)]"
                  }`}
                >
                  ${a}
                  {type === "monthly" ? "/mo" : ""}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t.donate.other}
              </label>
              <div className="mt-1 flex items-center rounded-xl border border-border bg-white px-3">
                <span className="text-muted-foreground">$</span>
                <Input
                  type="number"
                  min="1"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  placeholder="0.00"
                  className="border-0 focus-visible:ring-0"
                />
              </div>
            </div>

            <label className="mt-5 flex items-center gap-2 text-sm text-ink">
              <Checkbox
                checked={coverFee}
                onCheckedChange={(v) => setCoverFee(Boolean(v))}
              />
              {t.donate.coverFee}
            </label>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="mt-6 w-full bg-gradient-to-r from-[color:var(--leaf)] to-[color:var(--teal)] text-white shadow-soft hover:opacity-95"
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Heart className="mr-2 h-4 w-4" aria-hidden />
              )}
              {type === "monthly"
                ? stripeReady ? t.donate.monthlyBtnSecure : t.donate.monthlyBtn
                : stripeReady ? t.donate.donateBtnSecure : t.donate.donateBtn}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
