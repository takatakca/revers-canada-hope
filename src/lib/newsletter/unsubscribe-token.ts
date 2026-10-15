import { createHmac, timingSafeEqual } from "node:crypto";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SIGNATURE = /^[A-Za-z0-9_-]{43}$/;
const PREFIX = "revers-newsletter-unsubscribe-v1:";

function calculate(id: string, secret: string): string {
  return createHmac("sha256", secret).update(PREFIX + id).digest("base64url");
}

/** For verified newsletter senders only. Token reveals an opaque row UUID, never the email. */
export function createUnsubscribeToken(subscriberId: string, secret: string): string {
  if (!UUID.test(subscriberId) || secret.length < 32) {
    throw new Error("Invalid newsletter signing configuration");
  }
  const id = subscriberId.toLowerCase();
  return `${id}.${calculate(id, secret)}`;
}

/** A bearer token: possession authorizes only stopping mail for this subscriber. */
export function verifyUnsubscribeToken(
  token: string,
  secret: string | undefined,
): string | null {
  if (!secret || secret.length < 32 || token.length > 160) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [id, signature] = parts;
  if (!UUID.test(id) || !SIGNATURE.test(signature)) return null;
  const expected = Buffer.from(calculate(id.toLowerCase(), secret));
  const actual = Buffer.from(signature);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return null;
  }
  return id.toLowerCase();
}
