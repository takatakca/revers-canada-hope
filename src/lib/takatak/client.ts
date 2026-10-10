import { assertHttpsUrl, getTakatakConfig } from "./config";
import {
  createNonce,
  createTakatakSignature,
  TAKATAK_EVENTS_PATH,
  TAKATAK_INTEGRATION_ID,
} from "./hmac";

export type TakatakExperienceSession = {
  active: true;
  identityId: string;
  displayName: string | null;
  product: "revers";
  entitlement: "revers_access";
  planCode: string;
  expiresAt: string;
};

export async function exchangeTakatakLaunchCode(
  code: string,
): Promise<TakatakExperienceSession> {
  const config = getTakatakConfig();

  if (!config.serviceToken) {
    throw new Error("TAKATAK REVERS service token is not configured.");
  }

  const baseUrl = assertHttpsUrl(config.apiBaseUrl, "TAKATAK_API_BASE_URL");
  const url = new URL("/api/experiences/revers/exchange", baseUrl);

  const body = JSON.stringify({ code });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${config.serviceToken}`,
    },
    body,
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`TAKATAK launch exchange failed with HTTP ${response.status}.`);
  }

  const data = (await response.json()) as {
    ok?: boolean;
    session?: Partial<TakatakExperienceSession>;
  };

  if (
    data.ok !== true ||
    data.session?.active !== true ||
    data.session.product !== "revers" ||
    data.session.entitlement !== "revers_access" ||
    typeof data.session.identityId !== "string" ||
    typeof data.session.expiresAt !== "string"
  ) {
    throw new Error("TAKATAK returned an invalid REVERS session.");
  }

  return {
    active: true,
    identityId: data.session.identityId,
    displayName:
      typeof data.session.displayName === "string"
        ? data.session.displayName
        : null,
    product: "revers",
    entitlement: "revers_access",
    planCode:
      typeof data.session.planCode === "string"
        ? data.session.planCode
        : "revers_community",
    expiresAt: data.session.expiresAt,
  };
}

export type TakatakEventEnvelope = {
  eventId: string;
  eventType: string;
  version: string;
  occurredAt: string;
  workspaceId: string | null;
  customerId: string | null;
  payload: Record<string, unknown>;
};

export async function postTakatakEvent(
  event: TakatakEventEnvelope,
): Promise<void> {
  const config = getTakatakConfig();

  if (!config.hmacSecret) {
    throw new Error("TAKATAK REVERS HMAC secret is not configured.");
  }

  const baseUrl = assertHttpsUrl(config.apiBaseUrl, "TAKATAK_API_BASE_URL");
  const url = new URL(TAKATAK_EVENTS_PATH, baseUrl);
  const body = JSON.stringify(event);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const nonce = createNonce();
  const signature = createTakatakSignature({
    secret: config.hmacSecret,
    timestamp,
    nonce,
    method: "POST",
    path: TAKATAK_EVENTS_PATH,
    body,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-TAKATAK-Integration": TAKATAK_INTEGRATION_ID,
      "X-TAKATAK-Timestamp": timestamp,
      "X-TAKATAK-Nonce": nonce,
      "X-TAKATAK-Signature": signature,
    },
    body,
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`TAKATAK event delivery failed with HTTP ${response.status}.`);
  }
}
