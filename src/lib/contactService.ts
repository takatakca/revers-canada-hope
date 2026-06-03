import { sanitizeText, validateEmail, validateRequired, FIELD_LIMITS } from "./validation";
import { safeSet, STORAGE_KEYS } from "./storage";
import { supabase } from "@/integrations/supabase/client";

export type ContactInput = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  // Honeypot — must be empty for legitimate submissions
  website?: string;
  lang?: string;
};

export type ContactSubmission = {
  ok: boolean;
  errors?: string[];
  /** True when the record was saved to the backend database. */
  saved?: boolean;
  /** mailto fallback href used when the backend insert failed. */
  mailtoHref?: string;
  payload?: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    submittedAt: string;
    source: "REVERS_CANADA_GAR";
    lang: string;
  };
};

const RECIPIENT = "info@reverscanada.org";

/**
 * Prepare and send a contact submission.
 *
 * Flow:
 * 1. Validate + sanitize input (and run the honeypot check).
 * 2. Try to INSERT into Lovable Cloud `contacts` table.
 * 3. If the insert fails (offline, RLS, etc.), fall back to a mailto: link
 *    so the user can still reach us.
 */
export async function prepareContactSubmission(
  input: ContactInput,
): Promise<ContactSubmission> {
  // Honeypot — silently accept bots but do nothing
  if (input.website && input.website.trim() !== "") {
    return { ok: true, saved: false };
  }

  const errors: string[] = [];
  if (!validateRequired(input.name)) errors.push("name");
  if (!validateEmail(input.email)) errors.push("email");
  if (!validateRequired(input.message)) errors.push("message");

  if (errors.length) return { ok: false, errors };

  const payload = {
    name: sanitizeText(input.name, FIELD_LIMITS.name),
    email: sanitizeText(input.email, FIELD_LIMITS.email),
    phone: sanitizeText(input.phone ?? "", FIELD_LIMITS.phone),
    subject: sanitizeText(input.subject ?? "", FIELD_LIMITS.subject),
    message: sanitizeText(input.message, FIELD_LIMITS.message),
    submittedAt: new Date().toISOString(),
    source: "REVERS_CANADA_GAR" as const,
    lang: input.lang ?? "fr",
  };

  // 1) Try to persist in the backend.
  let saved = false;
  try {
    const { error } = await supabase.from("contacts").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      subject: payload.subject || null,
      message: payload.message,
      language: payload.lang,
      source: payload.source,
      user_agent:
        typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
    });
    if (!error) saved = true;
    else if (import.meta.env.DEV) console.warn("[contact] insert failed:", error.message);
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[contact] insert threw:", err);
  }

  safeSet(STORAGE_KEYS.contactLast, {
    submittedAt: payload.submittedAt,
    source: payload.source,
    saved,
  });

  if (saved) return { ok: true, saved: true, payload };

  // 2) Fallback: build a mailto link so the user is never stuck.
  const subjectLine = payload.subject || "Message via reverscanada.org";
  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : "",
    `Source: ${payload.source}`,
    `Submitted: ${payload.submittedAt}`,
    "",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  const mailtoHref = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
    subjectLine,
  )}&body=${encodeURIComponent(body)}`;

  return { ok: true, saved: false, mailtoHref, payload };
}
