# REVERS CANADA — Deployment runbook

Production target: `https://reverscanada.ca` (domain confirmed by owner, not live-verified). Hosting architecture from repository: MochaHost cPanel / Passenger Node.js 22, immutable Nitro builds performed by GitHub Actions.

## Automatic publication
1. Every push to `main` triggers `REVERS CI`; it runs `npm ci`, migration verification, typecheck, lint and production build.
2. After a successful **push** CI from the same repository's `main`, the deploy workflow runs with `workflow_run`, checking out the exact validated `head_sha`.
3. The deploy job verifies configuration, performs its own quality gates, bundles and uploads `.output`, switches `CURRENT`, restarts Passenger, and checks both endpoints.
4. Health must report `{ ok: true, release: "<exact validated SHA>" }`, and readiness must return `ok: true`; otherwise rollback to `PREVIOUS`, or remove `CURRENT` on an unsuccessful first deployment.
5. Manual workflow dispatch is reserved for authorized operator recovery. Do not use it to bypass failed CI; assess the commit first.

## Required GitHub environment: production
In `https://github.com/takatakca/revers-canada-hope/settings/environments`, set:
- `MOCHAHOST_HOST` (currently confirmed **missing**), `MOCHAHOST_USER`, `MOCHAHOST_SSH_PORT`.
- `MOCHAHOST_APP_ROOT` (must be an application subdirectory within `/home/...`, not `/home`).
- `MOCHAHOST_SSH_PRIVATE_KEY`, `MOCHAHOST_KNOWN_HOSTS` (verified SSH host key, not disabled host checking).
- `REVERS_PRODUCTION_URL=https://reverscanada.ca`.

Never store values in source or build logs. Existing credentials for other TAKATAK projects are not proof of REVERS authorization or path.

## Required cPanel runtime environment
- `PUBLIC_SITE_URL=https://reverscanada.ca`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `REVERS_SESSION_SECRET`
- TAKATAK: `TAKATAK_API_BASE_URL`, `TAKATAK_EXPERIENCE_LAUNCH_URL`, `TAKATAK_REVERS_SERVICE_TOKEN`, `TAKATAK_REVERS_HMAC_SECRET`, `REVERS_OUTBOX_WORKER_TOKEN`
- When donations enabled: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.
- Public build-time configuration needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` if the browser connects to Supabase.

Apply migrations separately in the **correct project**, verify RLS and outbox worker. No build or dependency installation should occur on MochaHost.

## Verification / rollback
1. Check GitHub Actions `REVERS CI` and `Deploy REVERS CANADA to MochaHost` conclusions, not just job starts.
2. `curl -fsS https://reverscanada.ca/healthz` — `release` must equal deployed git SHA.
3. `curl -fsS https://reverscanada.ca/readyz` — `ok` true and HTTP 200.
4. Check public pages, contact, newsletter, Stripe signed webhook (test mode) and TAKATAK exchange with authorized test accounts.
5. On production failure, the workflow restores `PREVIOUS` and restarts Passenger. If the first deployment is unhealthy, it removes the bad `CURRENT` pointer.
6. Preserve server logs and last-good release for incident response; do not force deploy a failed build.

## Current evidence
- `REVERS CI` run [38610837318](https://github.com/takatakca/revers-canada-hope/actions/runs/38610837318): success, commit `ede77977`.
- Deploy run [38610837590](https://github.com/takatakca/revers-canada-hope/actions/runs/38610837590): failed before uploading because of missing `MOCHAHOST_HOST`.
- Production release: **unverified**.
