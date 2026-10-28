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

**Fail-closed monthly billing gate:** `isStripeConfigured` now reports `monthlyConfigured=false` when the REVERS `revers_recurring_invoices` table cannot be queried, and `createDonationCheckout` independently refuses monthly Checkout until it can query the ledger. No subscription can start without the private renewal-recording schema.

## Public-form database lockdown

Apply the file `supabase/migrations/20261015133000_lock_down_public_form_writes.sql` after `20261015131500_revers_recurring_invoices.sql`, **only in REVERS operational Supabase**, never shared TAKATAK production. Then verify browser anon INSERT is denied for `contacts`, `newsletter_subscribers` and `donation_intents`; repeat legitimate server-only contact/newsletter/donation submissions to confirm service-role writes and no confidential read access. Keep service-role secret in runtime only. The SQL is committed but was **not applied** from this agent session.

## Most recent pipeline evidence (2026-10-15)
[CI 38776928312](https://github.com/takatakca/revers-canada-hope/actions/runs/38776928312) passed for `dcd339c04cb19f138c0e4ccc0e28a66c2d4881a6`. [Deploy 38777067780](https://github.com/takatakca/revers-canada-hope/actions/runs/38777067780) failed at missing `MOCHAHOST_HOST` before upload. No live version switch, rollback, or production health check occurred. Do not confuse a queued deployment or scheduled outbox workflow with a verified publication.


## Restricted support console runtime settings
- Optional server-only `REVERS_SUPPORT_ADMIN_IDENTITY_IDS`: comma-separated **TAKATAK master identity UUIDs** assigned by the REVERS operator. Empty means no admin can view any requests. This is a temporary, explicit product-role delegation until TAKATAK's REVERS-specific administration entitlement is available; TAKATAK remains sole identity issuer.
- The assigned operator must first complete the ordinary TAKATAK `revers_access` launch/exchange and hold a valid ten-minute signed REVERS product cookie. An arbitrary matching UUID in the browser is never sufficient.
- `/admin/support` is deliberately unlisted and `noindex`. Its GET/PATCH API reads/writes the REVERS `contacts` table with the server-only service role, filters `source=REVERS_CANADA_GAR` and checks operator authorization for every request. PATCH requires `Origin` matching `PUBLIC_SITE_URL`.
- Do not enable the console until the correct REVERS Supabase migrations and RLS restrictions are verified. Acceptance: an anonymous caller and ordinary TAKATAK user both receive 403, a delegated authenticated operator can read and update `new → reviewed → archived`, and stale status updates return 409.
- Revocation: remove the UUID from the server setting and restart Passenger, or expire the signed REVERS product session (max ten minutes). Confirm revocation with an API 403.


## Newsletter unsubscribe integration
- Configure cPanel server-only `REVERS_NEWSLETTER_UNSUBSCRIBE_SECRET` with a **stable 32+ character high-entropy secret**. Do not expose it in a Vite/browser variable or GitHub source. Rotation invalidates issued unsub links until old-version verification is implemented.
- For each verified outgoing email, the REVERS server creates `createUnsubscribeToken(subscriber.id, process.env.REVERS_NEWSLETTER_UNSUBSCRIBE_SECRET)` from `src/lib/newsletter/unsubscribe-token.ts`. Link to `https://reverscanada.ca/newsletter/unsubscribe?token=<signed token>`.
- Preview GET is non-mutating. Explicit POST to `/api/public/newsletter/unsubscribe` verifies the signed token, scopes `newsletter_subscribers` to `REVERS_CANADA_GAR`, and saves `consent=false`, `status=unsubscribed`. Replays are idempotent and anonymous email address guesses cannot unsubscribe anyone.
- A newsletter sender/ESP **is not yet integrated or configured**. Verify its list suppression, double opt-in as appropriate, and ability to include the per-subscriber signed unsubscribe link **before sending**.
- Existing opted-out emails are not reactivated by unauthenticated repeated footer submissions; reconfirmation with verified email ownership must be designed before permitting resubscription.
- Acceptance when REVERS Supabase is available: valid token changes real row; GET preview does not; invalid/tampered token cannot change any row; database service-role permissions and error behavior tested.


## Case-change audit migration (2026-10-15)
1. In the authorized **REVERS operational** Supabase project only, verify `contacts` has the known `new/reviewed/archived` status constraint. Do not run this SQL against TAKATAK STAGING, FESTI ICE, ALKAO or other shared tenants.
2. Apply prepared SQL `supabase/migrations/20261015235500_support_status_audit.sql` **after** `20261015131500_revers_recurring_invoices.sql` and `20261015133000_lock_down_public_form_writes.sql`, with the correct migration history.
3. Verify `revers_support_status_audit` RLS enabled and no `anon`/`authenticated` SELECT, INSERT, UPDATE or DELETE grants. Confirm `has_function_privilege('anon','public.revers_transition_support_status(uuid,text,text,uuid)','EXECUTE')` and the same for `authenticated` are both false.
4. With an authorized, delegated TAKATAK operator in a nonproduction test environment, transition a `REVERS_CANADA_GAR` case `new → reviewed`. Confirm exactly one audit row with old/new status and the verified server-side TAKATAK identity UUID. Repeat with stale expected status; expect HTTP 409 and no extra row. Simulate audit insertion failure in an isolated transaction; the status update must roll back. Unauthorized callers must see HTTP 403.
5. Confirm `GET /api/internal/revers/support?history=<contact UUID>` gives a private, no-store history of at most 50 entries solely to authorized operators; other REVERS source records must not appear.
6. Deploy only after correct GitHub MochaHost secrets, runtime settings, migrations and domain DNS/TLS are verified. Source CI [CI 38848287271](https://github.com/takatakca/revers-canada-hope/actions/runs/38848287271) passed; production [deployment 38848381314](https://github.com/takatakca/revers-canada-hope/actions/runs/38848381314) **failed before upload**, `MOCHAHOST_HOST` absent. Do not treat the scheduled TAKATAK outbox's success as production confirmation.

The SQL migration is committed but **not applied**; the Supabase CLI/database client was not available for a real Postgres execution in this session.


## Outbox worker durable-state verification — 2026-10-16
- Validated source `5fff67c33bcbe067149450409d7ecc76e8f67ccc` by [CI 38942916738](https://github.com/takatakca/revers-canada-hope/actions/runs/38942916738): worker checks errors on stale processing recovery and event claims, and acknowledges `delivered`/retry only after database confirms the matching row was updated. Any failed acknowledgement must be treated as at-least-once delivery; the TAKATAK receiving service must deduplicate by `eventId`.
- Production [MochaHost 38943041446](https://github.com/takatakca/revers-canada-hope/actions/runs/38943041446) **failed** at `Validate deployment configuration`: `Missing required deployment secret: MOCHAHOST_HOST`. **No files uploaded.** The scheduled workflow's green run may only mean it skipped due to missing `REVERS_PRODUCTION_URL` or worker token; it is not proof events were delivered.
- Once the correct REVERS host and database are connected, check: (1) generated event enqueued `pending`, (2) authorized worker POST changes row to `delivered`, (3) deliberate TAKATAK or Supabase failure increments `attempts` and schedules retry, (4) repeated same `event_id` cannot create two TAKATAK records, (5) failed database persistence makes worker endpoint 503; no worker-token or personal-data leak in logs.
- The 2026-10-16 direct DNS check for `https://reverscanada.ca/healthz` and `/readyz` failed name resolution in this runtime. Fix/verify authoritative DNS, TLS, MochaHost runtime configuration before declaring `/healthz.release` and `/readyz` successful.


## Directory update follow-up (2026-10-16)
- The verified-resource source changes on `48bf4f4534c8bd9b16faf22fe16419f02eda74d9` passed [CI 38943633417](https://github.com/takatakca/revers-canada-hope/actions/runs/38943633417). Publication is not implied by CI.
- Automatic [Deploy 38943739162](https://github.com/takatakca/revers-canada-hope/actions/runs/38943739162) was triggered as a consequence. Inspect its **terminal status and validation-step logs** before claiming any upload. If it again fails at `MOCHAHOST_HOST`, stop retrying unchanged secrets.
- After a real release, check `/ressources` in French/English, responsive/mobile keyboard navigation, external links (211, JuridiQC, Québec family mediation, Retraite Québec shared custody), and the explicit no-partnership/eligibility disclaimer.

## Coolify preview (vps2) — prepared 2026-10-26, production unchanged
- Application `reverscanada-preview` (uuid `awgyeyiknkiq2vwshfdlg3f6`) on Coolify server vps2 (`209.145.49.63`) builds `main` on every push (Coolify GitHub App). Build: Nixpacks, Node 22, `npm ci --no-audit --no-fund`, `npm run build` (`NITRO_PRESET=node-server`), start `node .output/server/index.mjs`, health check `/healthz`.
- Preview URL: `http://awgyeyiknkiq2vwshfdlg3f6.209.145.49.63.sslip.io`. Public Supabase values only; server secrets are absent, so `/readyz` is 503 and server-side features fail closed.
- `reverscanada.ca` still resolves to MochaHost `209.42.24.129` (reseller account `reverscanada`, older build). A Coolify release needs: server secrets in Coolify (names in "Required cPanel runtime environment"), migrations applied to the correct project, domains `reverscanada.ca` and `www.reverscanada.ca` attached to the application, then **only** the website A records changed to `209.145.49.63` (mail/MX/SPF/DKIM stay at MochaHost), then a redeploy so Traefik issues the certificate, then `/healthz` and `/readyz` checks on the real domain.

## Automatic publication since 2026-10-27
- **Coolify builds `main` itself** (application `reverscanada-preview`, GitHub App auto-deploy). `.github/workflows/confirm-coolify.yml` uploads nothing. After a successful `REVERS CI` push run it requires `/healthz.release` to equal the CI-validated SHA, which Coolify supplies as `SOURCE_COMMIT`.
- **Origin:** `vars.REVERS_COOLIFY_ORIGIN`, defaulting to the preview address. Set it to `https://reverscanada.ca` when the domain moves to Coolify; `/readyz` must then also return 200.
- **MochaHost publication** (`deploy-mochahost.yml`) is opt-in: automatic runs need the repository variable `REVERS_MOCHAHOST_DEPLOY=true` plus the `production` secrets listed above. Without that variable the job is skipped rather than failing at the secret check.

## Production on Coolify (2026-10-27)
`reverscanada.ca` and `www` point to Coolify vps2 (`209.145.49.63`); the application is `reverscanada`. Mail stays at MochaHost. Server secrets still missing: `SUPABASE_SERVICE_ROLE_KEY`, `REVERS_SESSION_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `TAKATAK_API_BASE_URL`, `TAKATAK_EXPERIENCE_LAUNCH_URL`, `TAKATAK_REVERS_SERVICE_TOKEN`, `TAKATAK_REVERS_HMAC_SECRET`, `REVERS_OUTBOX_WORKER_TOKEN`, `REVERS_SUPPORT_ADMIN_IDENTITY_IDS`, `REVERS_NEWSLETTER_UNSUBSCRIBE_SECRET`. Add them in Coolify as runtime-only variables, then set `REVERS_COOLIFY_ORIGIN=https://reverscanada.ca`.
