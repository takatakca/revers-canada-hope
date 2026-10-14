import { validateDonationAmount } from "./validation";
import { createDonationIntent } from "./donation.functions";

export type DonationFrequency = "once" | "monthly";

export type DonationInput = {
  amount: number | string;
  frequency: DonationFrequency;
  lang?: "fr" | "en";
};

export type DonationIntent = {
  amount: number;
  frequency: DonationFrequency;
  lang: "fr" | "en";
  source: "REVERS_CANADA_GAR";
  status: "pending_checkout";
  savedAt: string;
};

export type DonationResult =
  | { ok: true; intent: DonationIntent; saved: true; intentId: string }
  | { ok: false; error: "invalid_amount" | "storage_failed" };

/** Server persistence is required. A local intent is not a donation or payment. */
export async function saveDonationIntent(input: DonationInput): Promise<DonationResult> {
  if (!validateDonationAmount(input.amount)) {
    return { ok: false, error: "invalid_amount" };
  }

  const intent: DonationIntent = {
    amount: Number(input.amount),
    frequency: input.frequency,
    lang: input.lang === "en" ? "en" : "fr",
    source: "REVERS_CANADA_GAR",
    status: "pending_checkout",
    savedAt: new Date().toISOString(),
  };

  try {
    const result = await createDonationIntent({
      data: { amount: intent.amount, frequency: intent.frequency, lang: intent.lang },
    });
    if (!result.ok) {
      return { ok: false, error: result.error === "invalid_amount" ? "invalid_amount" : "storage_failed" };
    }
    return { ok: true, intent, saved: true, intentId: result.intentId };
  } catch {
    return { ok: false, error: "storage_failed" };
  }
}
