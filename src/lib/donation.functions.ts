import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { validateDonationAmount } from "./validation";

const DonationInputSchema = z.object({
  amount: z.union([z.number(), z.string().max(32)]),
  frequency: z.enum(["once", "monthly"]),
  lang: z.enum(["fr", "en"]),
});

type CreationResult =
  | { ok: true; intentId: string }
  | { ok: false; error: "invalid_amount" | "save_failed" };

/**
 * A public form is not permitted to insert into the operational database
 * with a browser key. Keep service-role access inside this server handler.
 * IMPORTANT: deploy corresponding RLS privilege revocations separately
 * after verifying the project's migration state.
 */
export const createDonationIntent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => DonationInputSchema.parse(input))
  .handler(async ({ data }): Promise<CreationResult> => {
    if (!validateDonationAmount(data.amount)) {
      return { ok: false, error: "invalid_amount" };
    }

    const amountCents = Math.round(Number(data.amount) * 100);
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: intent, error } = await supabaseAdmin
        .from("donation_intents")
        .insert({
          amount_cents: amountCents,
          currency: "CAD",
          frequency: data.frequency === "monthly" ? "monthly" : "one_time",
          language: data.lang,
          source: "REVERS_CANADA_GAR",
        })
        .select("id")
        .single();
      if (error || !intent) {
        console.error("[donation] unable to create donation intent:", error?.code ?? "unknown");
        return { ok: false, error: "save_failed" };
      }
      return { ok: true, intentId: intent.id };
    } catch {
      return { ok: false, error: "save_failed" };
    }
  });
