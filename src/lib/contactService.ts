import { sanitizeText, validateEmail, validateRequired, FIELD_LIMITS } from "./validation";
import { safeSet, STORAGE_KEYS } from "./storage";

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

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...payload,
        website: "",
      }),
    });

    const result = (await response.json()) as {
      ok?: boolean;
      saved?: boolean;
    };

    if (!response.ok || result.ok !== true || result.saved !== true) {
      return { ok: false, errors: ["backend_unavailable"], payload };
    }

    safeSet(STORAGE_KEYS.contactLast, {
      submittedAt: payload.submittedAt,
      source: payload.source,
      saved: true,
    });

    return { ok: true, saved: true, payload };
  } catch {
    return { ok: false, errors: ["backend_unavailable"], payload };
  }
}
