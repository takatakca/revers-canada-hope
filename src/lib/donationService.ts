import { validateDonationAmount } from "./validation";
import { safeSet, STORAGE_KEYS } from "./storage";
import { supabase } from "@/integrations/supabase/client";

export type DonationFrequency = "once" | "monthly";

export type DonationInput = {
  amount: number | string;
  frequency: DonationFrequency;
  coverFee?: boolean;
  lang?: "fr" | "en";
};

export type DonationIntent = {
  amount: number;
  frequency: DonationFrequency;
  coverFee: boolean;
  lang: "fr" | "en";
  source: "REVERS_CANADA_GAR";
  status: "pending_checkout";
  savedAt: string;
};

export type DonationResult =
  | { ok: true; intent: DonationIntent; saved: boolean }
  | { ok: false; error: "invalid_amount" | "storage_failed" };

/**
 * Persist a donation intent in the backend (with localStorage fallback).
 *
 * NOTE: No real payment is taken here. Stripe Checkout is wired in a later phase.
 */
export async function saveDonationIntent(input: DonationInput): Promise<DonationResult> {
  if (!validateDonationAmount(input.amount)) return { ok: false, error: "invalid_amount" };

  const intent: DonationIntent = {
    amount: Number(input.amount),
    frequency: input.frequency,
    coverFee: Boolean(input.coverFee),
    lang: input.lang ?? "fr",
    source: "REVERS_CANADA_GAR",
    status: "pending_checkout",
    savedAt: new Date().toISOString(),
  };

  const dbFrequency = intent.frequency === "monthly" ? "monthly" : "one_time";
  const amountCents = Math.round(intent.amount * 100);

  // 1) Try backend insert.
  try {
    const { error } = await supabase.from("donation_intents").insert({
      amount_cents: amountCents,
      currency: "CAD",
      frequency: dbFrequency,
      language: intent.lang,
      source: intent.source,
    });
    if (!error) {
      safeSet(STORAGE_KEYS.donation, intent);
      return { ok: true, intent, saved: true };
    }
    if (import.meta.env.DEV) console.warn("[donation] insert failed:", error.message);
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[donation] insert threw:", err);
  }

  // 2) Fallback to localStorage.
  const ok = safeSet(STORAGE_KEYS.donation, intent);
  if (!ok) return { ok: false, error: "storage_failed" };
  return { ok: true, intent, saved: false };
}

/** Future: create a real Stripe Checkout session via server function. */
export async function createDonationCheckoutSession(
  _data: DonationInput,
): Promise<{ ok: false; error: "not_implemented" }> {
  // TODO: implement via createServerFn -> Stripe Checkout
  return { ok: false, error: "not_implemented" };
}
