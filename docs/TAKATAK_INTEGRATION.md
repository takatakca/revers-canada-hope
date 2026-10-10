# REVERS CANADA — TAKATAK integration contract

## Authority

TAKATAK is the master identity and authorization authority. REVERS is an independent product experience and operational data owner.

REVERS does not create a master customer table and does not read TAKATAK tables directly.

## Browser authentication

REVERS sends the user to the TAKATAK experience launch endpoint:

GET https://takatak.ca/api/experiences/revers/launch

TAKATAK authenticates the user with its existing authentication flow, checks the REVERS entitlement, and redirects to the configured REVERS callback with a one-time code.

The final REVERS callback URL is configured by environment variable and is not hardcoded because the production domain has not been confirmed.

## Server exchange

REVERS sends the one-time code server-to-server:

POST /api/experiences/revers/exchange

Authentication:

Authorization: Bearer <dedicated REVERS service token>

The code is valid for 90 seconds and can be consumed once.

Successful exchange returns:
- master identity id
- display name
- product code revers
- entitlement revers_access
- plan code
- product-session expiry

No password, OTP, email, phone, private case notes, legal records or payment credentials are returned.

## Product session

REVERS stores a signed, HttpOnly, Secure, SameSite=Lax product-session cookie.

The cookie is a derived product session, not a second master identity system.

Privileged REVERS actions must use the server-side identity context and must not trust client-provided identity IDs or roles.

## Outbound events

REVERS uses a durable outbox.

Envelope:

{
  eventId,
  eventType,
  version,
  occurredAt,
  workspaceId,
  customerId,
  payload
}

Headers:

- X-TAKATAK-Integration
- X-TAKATAK-Timestamp
- X-TAKATAK-Nonce
- X-TAKATAK-Signature

Signing input:

timestamp + nonce + HTTP method + request path + SHA256(body)

Current event:

lead.created

The contact message, email and phone remain in REVERS. TAKATAK receives only the minimum lead event metadata required for the integration.

## Integration status

Until production secrets and a real exchange are verified, the status is NOT CONFIGURED.

Do not display CONNECTED merely because environment variables exist.