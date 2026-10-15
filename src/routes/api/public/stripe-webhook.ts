import { createFileRoute } from "@tanstack/react-router";
import { invoiceSubscriptionId, matchesMonthlyInvoice, validFailedMonthlyInvoice } from "@/lib/stripe/recurring";
import type { RecurringInvoice } from "@/lib/stripe/recurring";

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
          // All recurring invoices are validated against the live subscription metadata,
          // the REVERS donation intent and the expected amount. Webhook events may arrive
          // out of order; unique invoice IDs and paid-wins writes prevent double counting.
          if (event.type === "invoice.payment_succeeded" || event.type === "invoice.payment_failed") {
            const invoice = event.data.object as unknown as RecurringInvoice;
            const subscriptionId = invoiceSubscriptionId(invoice);
            if (!subscriptionId) return Response.json({ received: true });

            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            if (subscription.metadata?.project !== "REVERS_CANADA") {
              return Response.json({ received: true });
            }
            const intentId = subscription.metadata?.donation_intent_id;
            if (!intentId) return Response.json({ received: true });

            const { data: intent, error: readError } = await supabaseAdmin
              .from("donation_intents")
              .select("id, amount_cents, currency, frequency, stripe_subscription_id, stripe_customer_id")
              .eq("id", intentId)
              .maybeSingle();
            if (readError || !intent || intent.frequency !== "monthly" ||
                (intent.stripe_subscription_id && intent.stripe_subscription_id !== subscriptionId)) {
              throw new Error("Recurring invoice cannot be matched to a REVERS monthly donation.");
            }
            const customer = typeof subscription.customer === "string"
              ? subscription.customer : subscription.customer.id;
            if (intent.stripe_customer_id && intent.stripe_customer_id !== customer) {
              throw new Error("Recurring invoice customer mismatch.");
            }

            if (event.type === "invoice.payment_succeeded") {
              if (!matchesMonthlyInvoice(invoice, intent.amount_cents, intent.currency)) {
                throw new Error("Recurring invoice payment amount/status/currency mismatch.");
              }
              const paidAt = invoice.status_transitions?.paid_at
                ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
                : new Date().toISOString();
              const { error } = await supabaseAdmin.from("revers_recurring_invoices").upsert({
                donation_intent_id: intent.id,
                stripe_invoice_id: invoice.id,
                stripe_subscription_id: subscriptionId,
                stripe_event_id: event.id,
                currency: "CAD",
                amount_cents: invoice.amount_paid,
                status: "paid",
                paid_at: paidAt,
              }, { onConflict: "stripe_invoice_id" });
              if (error) throw new Error(`Failed recording recurring invoice: ${error.code ?? "unknown"}`);
            } else if (validFailedMonthlyInvoice(invoice)) {
              const { error } = await supabaseAdmin.from("revers_recurring_invoices").insert({
                donation_intent_id: intent.id,
                stripe_invoice_id: invoice.id,
                stripe_subscription_id: subscriptionId,
                stripe_event_id: event.id,
                currency: "CAD",
                amount_cents: invoice.amount_due,
                status: "failed",
              });
              // Duplicate invoice: a delayed failure must not demote a prior paid charge.
              if (error && error.code !== "23505") {
                throw new Error(`Failed recording declined recurring invoice: ${error.code ?? "unknown"}`);
              }
            }
            return Response.json({ received: true });
          }

          switch (event.type) {
            case "checkout.session.completed":
            case "checkout.session.async_payment_succeeded": {
              const session = event.data.object as import("stripe").Stripe.Checkout.Session;
              // Checkout completion does not always mean that funds were received.
              if (session.payment_status !== "paid") break;
              if (session.metadata?.project !== "REVERS_CANADA") break;
              const intentId = session.metadata?.donation_intent_id;
              if (!intentId) {
                console.warn("[stripe-webhook] completed session without donation_intent_id");
                break;
              }

              const { data: existing, error: lookupError } = await supabaseAdmin
                .from("donation_intents")
                .select("id,status,amount_cents,currency,frequency,stripe_checkout_session_id")
                .eq("id", intentId)
                .maybeSingle();

              if (lookupError || !existing) {
                throw new Error("Donation intent for signed Stripe session is missing.");
              }
              if (
                existing.stripe_checkout_session_id &&
                existing.stripe_checkout_session_id !== session.id
              ) {
                throw new Error("Stripe session does not match the donation intent.");
              }
              if (
                existing.amount_cents !== session.amount_total ||
                existing.currency.toLowerCase() !== session.currency?.toLowerCase() ||
                (existing.frequency === "monthly") !== (session.mode === "subscription")
              ) {
                throw new Error("Stripe payment amount, currency or frequency mismatch.");
              }
              // Signed duplicate notifications must not count a donation twice.
              if (existing.status === "paid") break;

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

              const { data: updated, error } = await supabaseAdmin
                .from("donation_intents")
                .update({
                  status: "paid",
                  paid_at: new Date().toISOString(),
                  stripe_checkout_session_id: session.id,
                  stripe_payment_intent_id: paymentIntentId,
                  stripe_customer_id: customerId,
                  ...(session.mode === "subscription" ? {
                    stripe_subscription_id: typeof session.subscription === "string"
                      ? session.subscription : session.subscription?.id ?? null,
                  } : {}),
                  donor_email: donorEmail,
                  donor_name: donorName,
                })
                .eq("id", intentId)
                .select("id")
                .maybeSingle();
              if (error || !updated) throw new Error(`Could not record paid donation: ${error?.code ?? "missing"}`);
              break;
            }

            case "customer.subscription.updated":
            case "customer.subscription.deleted": {
              const subscription = event.data.object as import("stripe").Stripe.Subscription;
              if (subscription.metadata?.project !== "REVERS_CANADA") break;
              const intentId = subscription.metadata?.donation_intent_id;
              if (!intentId) break;
              const { data: intent, error: findError } = await supabaseAdmin
                .from("donation_intents")
                .select("id,frequency,stripe_subscription_id,stripe_customer_id")
                .eq("id", intentId)
                .maybeSingle();
              const cust = typeof subscription.customer === "string"
                ? subscription.customer : subscription.customer.id;
              if (findError || !intent || intent.frequency !== "monthly" ||
                  (intent.stripe_subscription_id && intent.stripe_subscription_id !== subscription.id) ||
                  (intent.stripe_customer_id && intent.stripe_customer_id !== cust)) {
                throw new Error("Stripe subscription lifecycle identity mismatch.");
              }
              const { error } = await supabaseAdmin.from("donation_intents").update({
                stripe_subscription_id: subscription.id,
                subscription_status: subscription.status,
              }).eq("id", intentId);
              if (error) throw new Error("Failed updating subscription status.");
              break;
            }

            case "checkout.session.async_payment_failed": {
              const session = event.data.object as import("stripe").Stripe.Checkout.Session;
              if (session.metadata?.project !== "REVERS_CANADA") break;
              const intentId = session.metadata?.donation_intent_id;
              if (!intentId) break;
              const { error } = await supabaseAdmin
                .from("donation_intents")
                .update({ status: "failed" })
                .eq("id", intentId)
                .eq("stripe_checkout_session_id", session.id)
                .neq("status", "paid");
              if (error) throw new Error(`Could not record failed checkout: ${error.code ?? "unknown"}`);
              break;
            }

            case "checkout.session.expired": {
              const session = event.data.object as import("stripe").Stripe.Checkout.Session;
              if (session.metadata?.project !== "REVERS_CANADA") break;
              const intentId = session.metadata?.donation_intent_id;
              if (!intentId) break;
              const { error } = await supabaseAdmin
                .from("donation_intents")
                .update({ status: "cancelled" })
                .eq("id", intentId)
                .eq("stripe_checkout_session_id", session.id)
                .neq("status", "paid");
              if (error) throw new Error(`Could not cancel donation intent: ${error.code ?? "unknown"}`);
              break;
            }

            case "payment_intent.payment_failed": {
              const pi = event.data.object as import("stripe").Stripe.PaymentIntent;
              if (pi.metadata?.project !== "REVERS_CANADA") break;
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
