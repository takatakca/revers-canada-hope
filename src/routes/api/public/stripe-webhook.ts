import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.STRIPE_SECRET_KEY;
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!secret || !webhookSecret) {
          return new Response("Stripe not configured", { status: 503 });
        }

        const signature = request.headers.get("stripe-signature");
        if (!signature) return new Response("Missing signature", { status: 400 });

        const rawBody = await request.text();

        const Stripe = (await import("stripe")).default;
        const stripe = new Stripe(secret);

        let event: import("stripe").Stripe.Event;
        try {
          event = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret);
        } catch (err) {
          console.error("[stripe-webhook] signature verification failed:", err);
          return new Response("Invalid signature", { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        try {
          switch (event.type) {
            case "checkout.session.completed":
            case "checkout.session.async_payment_succeeded": {
              const session = event.data.object as import("stripe").Stripe.Checkout.Session;
              // Checkout completion does not always mean that funds were received.
              if (session.payment_status !== "paid") break;
              const intentId = session.metadata?.donation_intent_id;
              if (!intentId) {
                console.warn("[stripe-webhook] completed session without donation_intent_id");
                break;
              }

              // Idempotency: skip if already paid
              const { data: existing } = await supabaseAdmin
                .from("donation_intents")
                .select("status")
                .eq("id", intentId)
                .maybeSingle();
              if (existing?.status === "paid") break;

              const paymentIntentId =
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : session.payment_intent?.id ?? null;
              const customerId =
                typeof session.customer === "string"
                  ? session.customer
                  : session.customer?.id ?? null;
              const donorEmail = session.customer_details?.email ?? session.customer_email ?? null;
              const donorName = session.customer_details?.name ?? null;

              const { error } = await supabaseAdmin
                .from("donation_intents")
                .update({
                  status: "paid",
                  paid_at: new Date().toISOString(),
                  stripe_checkout_session_id: session.id,
                  stripe_payment_intent_id: paymentIntentId,
                  stripe_customer_id: customerId,
                  donor_email: donorEmail,
                  donor_name: donorName,
                })
                .eq("id", intentId);
              if (error) throw new Error(`Could not record paid donation: ${error.code ?? "unknown"}`);
              break;
            }

            case "checkout.session.async_payment_failed": {
              const session = event.data.object as import("stripe").Stripe.Checkout.Session;
              const intentId = session.metadata?.donation_intent_id;
              if (!intentId) break;
              const { error } = await supabaseAdmin
                .from("donation_intents")
                .update({ status: "failed" })
                .eq("id", intentId)
                .neq("status", "paid");
              if (error) throw new Error(`Could not record failed checkout: ${error.code ?? "unknown"}`);
              break;
            }

            case "checkout.session.expired": {
              const session = event.data.object as import("stripe").Stripe.Checkout.Session;
              const intentId = session.metadata?.donation_intent_id;
              if (!intentId) break;
              const { error } = await supabaseAdmin
                .from("donation_intents")
                .update({ status: "cancelled" })
                .eq("id", intentId)
                .neq("status", "paid");
              if (error) throw new Error(`Could not cancel donation intent: ${error.code ?? "unknown"}`);
              break;
            }

            case "payment_intent.payment_failed": {
              const pi = event.data.object as import("stripe").Stripe.PaymentIntent;
              const intentId = pi.metadata?.donation_intent_id;
              if (!intentId) break;
              const { error } = await supabaseAdmin
                .from("donation_intents")
                .update({ status: "failed" })
                .eq("id", intentId)
                .neq("status", "paid");
              if (error) throw new Error(`Could not mark donation failed: ${error.code ?? "unknown"}`);
              break;
            }

            default:
              // Ignore other events
              break;
          }
        } catch (err) {
          console.error("[stripe-webhook] handler error:", err);
          return new Response("Handler error", { status: 500 });
        }

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
