# REVERS CANADA — GitHub / TAKATAK deployment

## Architecture

REVERS is now developed from GitHub directly. Lovable is not part of the build or runtime.

Runtime:
- TanStack Start
- Nitro node-server
- Node.js 22
- cPanel / Passenger on MochaHost

Builds happen in GitHub Actions. MochaHost receives the immutable build artifact only.

## Release layout

Production application root:

- releases/<GITHUB_SHA>/.output/
- releases/<GITHUB_SHA>/RELEASE_SHA
- CURRENT
- PREVIOUS
- app.js
- tmp/restart.txt

The permanent app.js reads CURRENT and loads the selected Nitro server entry. A deployment switches CURRENT only after the release is fully uploaded.

MochaHost must not run npm install, npm run build or npm start.

## Deployment gates

GitHub builds with Node 22 and runs:

- npm run typecheck
- npm run lint
- npm run build

After activation, the deployment checks:

- GET /healthz
- GET /readyz

If the health gate fails, CURRENT is restored to PREVIOUS and Passenger is restarted.

## Required GitHub production secrets

- MOCHAHOST_HOST
- MOCHAHOST_USER
- MOCHAHOST_SSH_PORT
- MOCHAHOST_APP_ROOT
- MOCHAHOST_SSH_PRIVATE_KEY
- MOCHAHOST_KNOWN_HOSTS
- REVERS_PRODUCTION_URL

Do not put application secrets in this workflow.

## Required runtime secrets/configuration

- PUBLIC_SITE_URL
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- REVERS_SESSION_SECRET
- TAKATAK_API_BASE_URL
- TAKATAK_EXPERIENCE_LAUNCH_URL
- TAKATAK_REVERS_SERVICE_TOKEN
- TAKATAK_REVERS_HMAC_SECRET
- REVERS_OUTBOX_WORKER_TOKEN
- STRIPE_SECRET_KEY when Stripe is enabled

Production secrets belong in the cPanel application's environment or approved secret manager, never in GitHub source.

## TAKATAK

TAKATAK is the master identity and product-access authority.

REVERS uses the TAKATAK experience bridge:

GET /api/experiences/revers/launch
POST /api/experiences/revers/exchange

TAKATAK issues a one-time 90-second launch code. REVERS exchanges it server-to-server and creates a short-lived product session derived from the TAKATAK master identity.

REVERS never reads TAKATAK database tables.

## Event outbox

REVERS stores outbound events in takatak_outbox before delivery.

Current safe event:
- lead.created from the internal contact form

Only privacy-minimized data is sent to TAKATAK. The contact message, email and phone remain in REVERS.

Outbound events use the current TAKATAK HMAC contract:

- X-TAKATAK-Integration
- X-TAKATAK-Timestamp
- X-TAKATAK-Nonce
- X-TAKATAK-Signature

Signing input:

timestamp + nonce + HTTP method + request path + SHA256(body)

Delivery is idempotent and retryable.

## Domain rule

The final REVERS production domain is not hardcoded in source. Configure PUBLIC_SITE_URL and REVERS_PRODUCTION_URL only after the owner confirms the production domain.

## Current status

GitHub migration branch is prepared for CI validation and pull-request review.
TAKATAK integration code is implemented but production connection is not claimed until a real exchange succeeds.
