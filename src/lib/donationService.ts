import { validateDonationAmount } from "./validation";
import { safeSet, STORAGE_KEYS } from "./storage";

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
  | { ok: true; intent: DonationIntent }
  | { ok: false; error: "invalid_amount" | "storage_failed" };

/**
 * Persist a donation intent locally so it can be picked up by a real
 * checkout flow later.
 *
 * TODO: Connect to Stripe Checkout when backend endpoint is ready.
 */
export function saveDonationIntent(input: DonationInput): DonationResult {
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

  const ok = safeSet(STORAGE_KEYS.donation, intent);
  return ok ? { ok: true, intent } : { ok: false, error: "storage_failed" };
}

/** Future: create a real Stripe Checkout session via server function. */
export async function createDonationCheckoutSession(
  _data: DonationInput,
): Promise<{ ok: false; error: "not_implemented" }> {
  // TODO: implement via createServerFn -> Stripe Checkout
  return { ok: false, error: "not_implemented" };
}
