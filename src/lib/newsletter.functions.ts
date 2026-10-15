import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { FIELD_LIMITS, sanitizeText, validateEmail } from "./validation";

const NewsletterInput = z.object({
  email: z.string().min(1).max(FIELD_LIMITS.email),
  lang: z.enum(["fr", "en"]),
  consent: z.literal(true),
});

type NewsletterResponse =
  | { ok: true; saved: true; alreadySubscribed: boolean }
  | { ok: false; saved: false; error: "invalid_email" | "save_failed" };

/** Persist an explicit opt-in; never claim success from browser-only storage. */
export const submitNewsletterSignup = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => NewsletterInput.parse(data))
  .handler(async ({ data }): Promise<NewsletterResponse> => {
    const email = sanitizeText(data.email, FIELD_LIMITS.email).toLowerCase();
    if (!validateEmail(email)) return { ok: false, saved: false, error: "invalid_email" };

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("newsletter_subscribers").insert({
        email,
        language: data.lang,
        consent: true,
        source: "REVERS_CANADA_GAR",
      });

      if (error?.code === "23505") {
        const { data: existing, error: lookupError } = await supabaseAdmin
          .from("newsletter_subscribers")
          .select("status,consent")
          .eq("email", email)
          .eq("source", "REVERS_CANADA_GAR")
          .maybeSingle();
        // Never silently re-enable addresses that opted out. A confirmed
        // email-based resubscription flow is required before reactivation.
        if (lookupError || !existing || !existing.consent || existing.status === "unsubscribed") {
          return { ok: false, saved: false, error: "save_failed" };
        }
        return { ok: true, saved: true, alreadySubscribed: true };
      }
      if (error) {
        console.error("[newsletter] registration failed:", error.code ?? "unknown");
        return { ok: false, saved: false, error: "save_failed" };
      }
      return { ok: true, saved: true, alreadySubscribed: false };
    } catch {
      return { ok: false, saved: false, error: "save_failed" };
    }
  });
