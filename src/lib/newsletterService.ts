import { sanitizeText, validateEmail, FIELD_LIMITS } from "./validation";
import { safeSet, STORAGE_KEYS } from "./storage";
import { supabase } from "@/integrations/supabase/client";

export type NewsletterInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  lang?: "fr" | "en";
  consent?: boolean;
};

export type NewsletterResult = {
  ok: boolean;
  /** True when persisted to backend, false when only stored locally. */
  saved?: boolean;
  /** Already-subscribed flag — UI should show a friendly "already on the list" message. */
  alreadySubscribed?: boolean;
  error?: "invalid_email" | "storage_failed";
};

/**
 * Save a newsletter interest in the backend, with localStorage as fallback.
 *
 * NOTE: A real mailing provider (Brevo / Mailchimp / etc.) is NOT yet wired up.
 * Status stays `pending` until that integration is added.
 */
export async function saveNewsletterInterest(input: NewsletterInput): Promise<NewsletterResult> {
  if (!validateEmail(input.email)) return { ok: false, error: "invalid_email" };

  const payload = {
    email: sanitizeText(input.email, FIELD_LIMITS.email).toLowerCase(),
    firstName: sanitizeText(input.firstName ?? "", FIELD_LIMITS.name),
    lastName: sanitizeText(input.lastName ?? "", FIELD_LIMITS.name),
    lang: input.lang ?? "fr",
    consent: Boolean(input.consent ?? true),
    source: "REVERS_CANADA_GAR" as const,
    savedAt: new Date().toISOString(),
  };

  // 1) Try backend insert.
  try {
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: payload.email,
      language: payload.lang,
      consent: payload.consent,
      source: payload.source,
    });

    if (!error) {
      safeSet(STORAGE_KEYS.newsletter, payload);
      return { ok: true, saved: true };
    }

    // Postgres unique_violation
    if (error.code === "23505") {
      return { ok: true, saved: true, alreadySubscribed: true };
    }

    if (import.meta.env.DEV) console.warn("[newsletter] insert failed:", error.message);
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[newsletter] insert threw:", err);
  }

  // 2) Fallback to localStorage.
  const ok = safeSet(STORAGE_KEYS.newsletter, payload);
  return ok ? { ok: true, saved: false } : { ok: false, error: "storage_failed" };
}
