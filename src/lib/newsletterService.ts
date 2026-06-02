import { sanitizeText, validateEmail, FIELD_LIMITS } from "./validation";
import { safeSet, STORAGE_KEYS } from "./storage";

export type NewsletterInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  lang?: "fr" | "en";
  consent?: boolean;
};

export type NewsletterResult = {
  ok: boolean;
  error?: "invalid_email" | "storage_failed";
};

/**
 * Save a newsletter interest locally.
 *
 * TODO: Replace local storage with real provider (Brevo / Mailchimp / HubSpot)
 * via a server function. Never call provider APIs from the browser with secrets.
 */
export function saveNewsletterInterest(input: NewsletterInput): NewsletterResult {
  if (!validateEmail(input.email)) return { ok: false, error: "invalid_email" };

  const payload = {
    email: sanitizeText(input.email, FIELD_LIMITS.email),
    firstName: sanitizeText(input.firstName ?? "", FIELD_LIMITS.name),
    lastName: sanitizeText(input.lastName ?? "", FIELD_LIMITS.name),
    lang: input.lang ?? "fr",
    consent: Boolean(input.consent ?? true),
    source: "REVERS_CANADA_GAR" as const,
    savedAt: new Date().toISOString(),
  };

  const ok = safeSet(STORAGE_KEYS.newsletter, payload);
  return ok ? { ok: true } : { ok: false, error: "storage_failed" };
}

/** Future: real provider subscription via server function. */
export async function subscribeToNewsletter(_email: string): Promise<NewsletterResult> {
  // TODO: implement via createServerFn -> Brevo / Mailchimp API
  return { ok: false, error: "storage_failed" };
}
