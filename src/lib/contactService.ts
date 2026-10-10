import { sanitizeText, validateEmail, validateRequired, FIELD_LIMITS } from "./validation";
import { safeSet, STORAGE_KEYS } from "./storage";
import { supabase } from "@/integrations/supabase/client";

export type ContactInput = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  website?: string;
  lang?: string;
};

export type ContactSubmission = {
  ok: boolean;
  errors?: string[];
  saved?: boolean;
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

/**
 * Store a contact request inside REVERS.
 *
 * There is deliberately no mailto fallback: public forms must create an
 * internal REVERS record and must never depend on an invented mailbox.
 */
export async function prepareContactSubmission(
  input: ContactInput,
): Promise<ContactSubmission> {
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
        typeof navigator !== "undefined"
          ? navigator.userAgent.slice(0, 500)
          : null,
    });

    if (!error) saved = true;
    else if (import.meta.env.DEV) {
      console.warn("[contact] insert failed:", error.message);
    }
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[contact] insert threw:", err);
  }

  safeSet(STORAGE_KEYS.contactLast, {
    submittedAt: payload.submittedAt,
    source: payload.source,
    saved,
  });

  if (!saved) {
    return { ok: false, errors: ["backend_unavailable"], payload };
  }

  return { ok: true, saved: true, payload };
}
