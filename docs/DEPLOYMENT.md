# REVERS CANADA — Deployment runbook

Production target: `https://reverscanada.ca` (domain confirmed by owner, not live-verified). Hosting architecture from repository: MochaHost cPanel / Passenger Node.js 22, immutable Nitro builds performed by GitHub Actions.

## Automatic publication
1. Every push to `main` triggers `REVERS CI`; it currently runs `npm install` (temporary while an out-of-sync lockfile is repaired), migration verification, typecheck, lint and production build.
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

## Lockfile drift warning

CI run [38613420293](https://github.com/takatakca/revers-canada-hope/actions/runs/38613420293) failed because the package-lock.json does not satisfy package.json (`npm ci` EUSAGE, missing @supabase/supabase-js, nitro, stripe and transitive dependencies). We have temporarily restored the previously passing `npm install` step. On an authorized Node 22/npm 10 environment, regenerate and commit the correct lockfile, then change both workflows back to `npm ci` and verify the build. Do not claim deterministic supply-chain locking until this succeeds.

## Real database readiness gate

`/readyz` now checks the operational `contacts` table using server-side credentials with a 3.5-second abort timeout. It returns HTTP 503 on failed connectivity or missing migration instead of claiming readiness from the presence of environment variables. The public response reveals no secret configuration detail or contact record. Ensure the correct REVERS Supabase project is ready before deploying; this is intentional and may block activation until migration and network access are fixed.

## Atomic release activation and retention

The deployment writes `CURRENT.next` and uses atomic `mv` to switch the live release pointer. Retention preserves every release referenced by `CURRENT` or `PREVIOUS` even if it falls outside the newest five other releases. The upload uses an immutable commit directory; health checks verify that exact commit. Remote tests still require working SSH/cPanel credentials.

## Deterministic lockfile restored

The [Repair REVERS npm lockfile run 38615786073](https://github.com/takatakca/revers-canada-hope/actions/runs/38615786073) successfully regenerated/verified the npm lockfile with Node 22, producing commit `8f3ba2b`. The main CI and deployment install steps were restored to `npm ci --no-audit --no-fund`. Verify that normal install scripts work on the current main CI, not only the repair job's `--ignore-scripts` validation.


## TAKATAK outbox delivery

A separate [scheduled GitHub Actions workflow](../.github/workflows/deliver-takatak-outbox.yml) calls `POST https://reverscanada.ca/api/internal/takatak/outbox` approximately every 30 minutes, or on operator-requested `workflow_dispatch`. GitHub Actions schedules are best-effort; they may be delayed under load, so delivery latency is **not guaranteed**. The workflow requires **two production GitHub secrets**: `REVERS_PRODUCTION_URL=https://reverscanada.ca` and `REVERS_OUTBOX_WORKER_TOKEN` (minimum 32 characters, equal to the cPanel runtime worker token). If either is missing, scheduled iterations log "not configured" and do no work. The handler obtains pending events from the operational database and signs HMAC events server-side with TAKATAK credentials. No event payload, personal data, or tokens are printed to GitHub logs. Test a real queued event and check delivered status before claiming that TAKATAK is connected.


## Stale-release guard

The deploy workflow compares the *validated* CI head SHA with the **current** `origin/main` SHA before reading secrets or uploading a build. If another agent has already pushed a newer main commit, the old release is rejected rather than rolling production backward. An explicit operator dispatch also needs to target the current main release. `MOCHAHOST_APP_ROOT` must point to an application subdirectory **below** the account's home directory, not directly to `/home/<account>`.

## Required recurring-donation migration (2026-10-15)

Before enabling monthly Stripe subscriptions, apply `supabase/migrations/20261015131500_revers_recurring_invoices.sql` to **REVERS operational Supabase only**, after confirming migration history. This creates server-only `revers_recurring_invoices` with unique Stripe invoice IDs and adds Stripe subscription identity/status to the donation intent. Update the signed Stripe webhook subscriptions to `invoice.payment_succeeded`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted` in addition to previously configured events. Test live signed webhook delivery in Stripe test mode and duplicate/out-of-order invoice events. If the database schema is missing, handlers return 500 so Stripe can retry; do not silence these failures.
