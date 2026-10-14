import "@tanstack/react-start/server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { getTakatakConfig } from "./config";

export const REVERS_SESSION_COOKIE = "__Host-revers-product-session";

export type ReversProductSession = {
  identityId: string;
  displayName: string | null;
  product: "revers";
  entitlement: "revers_access";
  planCode: string;
  expiresAt: string;
};

function encode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value, "utf8").digest("base64url");
}

function serializeCookie(
  value: string,
  maxAgeSeconds: number,
): string {
  return [
    `${REVERS_SESSION_COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAgeSeconds}`,
  ].join("; ");
}

export function createReversSessionCookie(
  session: ReversProductSession,
): string {
  const secret = getTakatakConfig().sessionSecret;
  if (secret.length < 32) throw new Error("REVERS_SESSION_SECRET must be at least 32 characters.");

  const now = Date.now();
  const upstreamExpiresAt = Date.parse(session.expiresAt);
  if (
    session.product !== "revers" ||
    session.entitlement !== "revers_access" ||
    !session.identityId.trim() ||
    !Number.isFinite(upstreamExpiresAt) ||
    upstreamExpiresAt <= now
  ) {
    throw new Error("TAKATAK returned an expired or invalid product session.");
  }

  // Cap the cryptographically signed payload, not only the browser cookie.
  // An extracted cookie therefore cannot be replayed after ten minutes.
  const expiresAt = new Date(Math.min(upstreamExpiresAt, now + 600_000)).toISOString();
  const payload = encode(JSON.stringify({ ...session, expiresAt }));
  const signed = `${payload}.${sign(payload, secret)}`;
  const remaining = Math.max(1, Math.floor((Date.parse(expiresAt) - now) / 1000));
  return serializeCookie(signed, remaining);
}

export function createExpiredReversSessionCookie(): string {
  return serializeCookie("", 0);
}

export function getCookie(request: Request, name: string): string | null {
  const raw = request.headers.get("cookie") ?? "";
  for (const part of raw.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=") || null;
  }
  return null;
}

export function readReversSession(
  request: Request,
): ReversProductSession | null {
  const secret = getTakatakConfig().sessionSecret;
  if (secret.length < 32) return null;

  const raw = getCookie(request, REVERS_SESSION_COOKIE);
  if (!raw) return null;

  const separator = raw.lastIndexOf(".");
  if (separator <= 0) return null;

  const payload = raw.slice(0, separator);
  const signature = raw.slice(separator + 1);
  const expected = sign(payload, secret);
  const actualBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const session = JSON.parse(decode(payload)) as ReversProductSession;
    if (
      session.product !== "revers" ||
      session.entitlement !== "revers_access" ||
      typeof session.identityId !== "string" ||
      !session.identityId.trim() ||
      typeof session.expiresAt !== "string" ||
      !Number.isFinite(Date.parse(session.expiresAt)) ||
      Date.parse(session.expiresAt) <= Date.now()
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}
