// Lightweight input validation utilities (no external deps).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  const v = email.trim();
  return v.length > 0 && v.length <= 255 && EMAIL_RE.test(v);
}

export function validateRequired(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateDonationAmount(amount: unknown): boolean {
  const n = typeof amount === "string" ? Number(amount) : (amount as number);
  return Number.isFinite(n) && n > 0 && n <= 1_000_000;
}

/** Strip control chars and clamp length. Prevents accidental HTML/script injection in text payloads. */
export function sanitizeText(input: string, maxLength = 1000): string {
  if (typeof input !== "string") return "";
  // eslint-disable-next-line no-control-regex
  return input.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
}

export const FIELD_LIMITS = {
  name: 100,
  email: 255,
  phone: 40,
  subject: 150,
  message: 2000,
} as const;
