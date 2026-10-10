import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  donation_intent_id: z.string().uuid(),
});

type Result =
  | { ok: true; checkout_url: string }
  | { ok: false; error: "not_found" | "invalid_status" | "invalid_amount" | "stripe_not_configured" | "stripe_failed" };

/**
 * Server-only: create a Stripe Checkout session for an existing donation_intent.
 *
 * SECURITY: Never trusts the amount sent by the frontend. The amount is re-read
 * from the database using the service role client.
 */
export const createDonationCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }): Promise<Result> => {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return { ok: false, error: "stripe_not_configured" };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // 1) Re-read intent from DB (never trust client values)
    const { data: intent, error: readError } = await supabaseAdmin
      .from("donation_intents")
      .select("id, amount_cents, currency, frequency, language, status")
      .eq("id", data.donation_intent_id)
      .maybeSingle();

    if (readError || !intent) return { ok: false, error: "not_found" };
    if (intent.status !== "pending_checkout") return { ok: false, error: "invalid_status" };
    if (!intent.amount_cents || intent.amount_cents <= 0) return { ok: false, error: "invalid_amount" };

    // 2) Build URLs. Never fall back to a preview or invented production host.
    const siteUrl = process.env.PUBLIC_SITE_URL?.trim();
    if (!siteUrl) return { ok: false, error: "stripe_not_configured" };

    // 3) Create Stripe Checkout session
    try {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(secret);

      const isMonthly = intent.frequency === "monthly";
      const currency = (intent.currency || "CAD").toLowerCase();
      const language = intent.language === "en" ? "en" : "fr";

      const productName =
        language === "en"
          ? isMonthly
            ? "Monthly donation — REVERS CANADA"
            : "One-time donation — REVERS CANADA"
          : isMonthly
            ? "Don mensuel — REVERS CANADA"
            : "Don ponctuel — REVERS CANADA";

      const session = await stripe.checkout.sessions.create({
        mode: "payment", // monthly support requires Stripe Price + subscription mode (future phase)
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency,
              product_data: { name: productName },
              unit_amount: intent.amount_cents,
            },
            quantity: 1,
          },
        ],
        metadata: {
          donation_intent_id: intent.id,
          project: "REVERS_CANADA",
          source: "REVERS_CANADA_GAR",
          frequency: intent.frequency,
        },
        locale: language === "en" ? "en" : "fr",
        success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/donate/cancelled`,
      });

      if (!session.url) return { ok: false, error: "stripe_failed" };

      // 4) Persist session id + status
      const { error: updateError } = await supabaseAdmin
        .from("donation_intents")
        .update({
          stripe_checkout_session_id: session.id,
          status: "checkout_created",
        })
        .eq("id", intent.id);

      if (updateError) {
        console.error("[checkout] failed to persist session id:", updateError.message);
        // Still return URL — webhook will reconcile via metadata.donation_intent_id
      }

      return { ok: true, checkout_url: session.url };
    } catch (err) {
      console.error("[checkout] Stripe error:", err);
      return { ok: false, error: "stripe_failed" };
    }
  });

/** Public flag for the UI — true when Stripe is wired on the server. */
export const isStripeConfigured = createServerFn({ method: "GET" }).handler(async () => {
  return { configured: Boolean(process.env.STRIPE_SECRET_KEY) };
});
