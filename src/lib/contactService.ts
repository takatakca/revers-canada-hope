import { sanitizeText, validateEmail, validateRequired, FIELD_LIMITS } from "./validation";
import { safeSet, STORAGE_KEYS } from "./storage";

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
 * Prepare a contact submission: validates, sanitizes and builds a mailto fallback.
 *
 * TODO: Replace mailto fallback with real backend email service
 * (e.g. POST /api/contact -> Resend/SendGrid via server function).
 */
export function prepareContactSubmission(input: ContactInput): ContactSubmission {
  // Honeypot — silently reject bots but pretend success
  if (input.website && input.website.trim() !== "") {
    return { ok: true };
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

  safeSet(STORAGE_KEYS.contactLast, { submittedAt: payload.submittedAt, source: payload.source });

  return { ok: true, mailtoHref, payload };
}
