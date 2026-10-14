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
  if (typeof amount !== "string" && typeof amount !== "number") return false;
  // Accept only plain CAD amounts with at most two decimal places.
  const decimal = String(amount).trim();
  if (!/^[0-9]+([.][0-9]{1,2})?$/.test(decimal)) return false;
  const value = Number(decimal);
  const cents = Math.round(value * 100);
  return Number.isFinite(value) &&
    value >= 1 &&
    value <= 1_000_000 &&
    Number.isSafeInteger(cents);
}

/** Strip control chars and clamp length. Not an HTML sanitizer: render as text. */
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
