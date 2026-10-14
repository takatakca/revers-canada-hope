import { sanitizeText, validateEmail, FIELD_LIMITS } from "./validation";
import { submitNewsletterSignup } from "./newsletter.functions";

export type NewsletterInput = {
  email: string;
  lang?: "fr" | "en";
  consent: boolean;
};

export type NewsletterResult =
  | { ok: true; saved: true; alreadySubscribed: boolean }
  | { ok: false; saved: false; error: "invalid_email" | "consent_required" | "save_failed" };

/** The UI can only report success after REVERS confirms durable storage. */
export async function saveNewsletterInterest(input: NewsletterInput): Promise<NewsletterResult> {
  const email = sanitizeText(input.email, FIELD_LIMITS.email).toLowerCase();
  if (!validateEmail(email)) return { ok: false, saved: false, error: "invalid_email" };
  if (input.consent !== true) {
    return { ok: false, saved: false, error: "consent_required" };
  }
  try {
    return await submitNewsletterSignup({
      data: { email, lang: input.lang === "en" ? "en" : "fr", consent: true },
    });
  } catch {
    return { ok: false, saved: false, error: "save_failed" };
  }
}
