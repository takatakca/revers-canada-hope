# REVERS CANADA — Canonical agent handoff

**Updated:** 2026-10-15. **Repository:** `takatakca/revers-canada-hope`. **Branch:** `main`.
**Last completed pushed code commit verified at handoff preparation:** `8165bd3bb4476f70ee28aef6550ea55c66f5a154` (recurring ledger). This handoff commit itself follows that SHA; inspect GitHub `main` for actual latest SHA.

## Last completed work
- Recurring donation invoice ledger implemented with private RLS, per-invoice uniqueness and paid-wins handling.
- Stripe signed event handler now processes `invoice.payment_succeeded` / `invoice.payment_failed` and subscription lifecycle events. Validation checks subscription metadata and exact expected CAD amount, Stripe customer and source intent; a delayed failed event cannot overwrite an already paid invoice.
- Added typed REVERS Supabase schema and pure Node unit tests for invoice shapes and amount rules.
- Migration file `supabase/migrations/20261015131500_revers_recurring_invoices.sql` is **prepared but not applied**. The correct REVERS database remains inaccessible. Do not apply to another TAKATAK project.
- Original validated public site and deployment architecture remain intact.

## Current task
1. Check `main` SHA; GitHub Actions `REVERS CI` outcome for this handoff commit (typecheck, lint, Node tests and Vite/Nitro build); fix any reported errors.
2. Verify deployed-production credentials and DNS; production remains blocked, **not live-verified**.
3. Apply REVERS-only migration to the correct connected Supabase project after verifying migration history, then test signed Stripe events with test-mode account; do not enable production recurring payments until then.
4. Continue P1 newsletter unsubscribe/delivery and authenticated case management if independent of unavailable external credentials.

## Changed files in this batch
- `src/routes/api/public/stripe-webhook.ts`
- `src/lib/stripe/recurring.ts` (new)
- `supabase/migrations/20261015131500_revers_recurring_invoices.sql` (new)
- `src/integrations/supabase/types.ts`
- `tests/stripe-recurring.test.mjs` (new)
- `docs/AGENT_HANDOFF.md`, `docs/PROJECT_STATUS.md`, `docs/TASK_QUEUE.md`, `docs/DEPLOYMENT.md`, `docs/DECISIONS.md`, `docs/GITHUB_TAKATAK_DEPLOYMENT.md`, `WORKLOG.md`.

## Checks and evidence
- GitHub latest starting source SHA: `f0fb45493309d845206975b9d76ce5d8e4c74ebe`.
- CI [38617635439](https://github.com/takatakca/revers-canada-hope/actions/runs/38617635439) **success** for the previous main commit.
- Deploy [38617755402](https://github.com/takatakca/revers-canada-hope/actions/runs/38617755402) **failure** before live deployment; GitHub production `MOCHAHOST_HOST` missing as documented by prior logs.
- New recurring ledger code commit `8165bd3bb4476f70ee28aef6550ea55c66f5a154` pushed to `main`.
- No direct `npm ci` or live Stripe event was executed in this workspace: use resulting GitHub Actions logs to validate.
- No access to REVERS operational Supabase project `cmcbsbjxrrwtmxvcsbsg` confirmed; do not migrate unrelated datasets.
- No confirmed `https://reverscanada.ca/healthz` release SHA, DNS or production TLS.

## Production configuration required (secret names only)
GitHub `production`: `MOCHAHOST_HOST`, `MOCHAHOST_USER`, `MOCHAHOST_SSH_PORT`, `MOCHAHOST_APP_ROOT`, `MOCHAHOST_SSH_PRIVATE_KEY`, `MOCHAHOST_KNOWN_HOSTS`, `REVERS_PRODUCTION_URL`.
cPanel: `PUBLIC_SITE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `REVERS_SESSION_SECRET`, TAKATAK token/HMAC/outbox worker, Stripe key/webhook signing secret.
The actual REVERS Supabase instance must become accessible before applying migrations or validating RLS.

## Exact next action
Read `AGENTS.md`, this handoff and `docs/TASK_QUEUE.md`, retrieve the latest GitHub CI jobs. Fix anything red on `main`. When production secrets and correct REVERS Supabase are available, apply migration, verify signed Stripe invoice success/failure/cancel and run MochaHost deployment; prove exact `/healthz.release` SHA and `/readyz` HTTP 200 before marking deployed.

**Status: source progressing; migration pending; production unverified; NOT 100%.**

## Verified pipeline follow-up (2026-10-15)
- The recurring-ledger code and test formatting fix at `0be884a53bc1bbe139607f02950745ab78f390fb` passed [CI 38775784157](https://github.com/takatakca/revers-canada-hope/actions/runs/38775784157): dependency installation, typecheck, lint, unit tests, build and output check all succeeded.
- Automatic production release [38775967756](https://github.com/takatakca/revers-canada-hope/actions/runs/38775967756) started only after that successful CI but **failed before upload at missing `MOCHAHOST_HOST`**, verified from logs.
- Additional safety code on the following commit disables monthly Stripe Checkout until the new private ledger table is present in the operational REVERS database. The latest post-guard CI must be checked before any release.

## Public database access follow-up (2026-10-15)
- After confirming the server-only form handlers and successful main CI on `a0feb15c` (run 38776251714), added pending REVERS-only SQL migration `20261015133000_lock_down_public_form_writes.sql` to revoke old `anon` and `authenticated` form-table INSERT privileges/policies.
- Next action on correct REVERS Supabase access: verify migration history; apply recurring ledger migration first, then public-form grant revocation; run negative anon tests and positive server-handler smoke tests before enabling production billing.
- The upcoming commit has not been locally applied to Supabase. CI and deployment must be inspected on its exact SHA.

## Subsequent request-size safeguard (2026-10-15)
- [REVERS CI 38776537435](https://github.com/takatakca/revers-canada-hope/actions/runs/38776537435) passed the preceding REVERS-only public-write revoke migration commit `c29737a9` (source only; migration unapplied).
- Implemented `src/lib/http/read-limited-body.ts` with new `tests/http-body.test.mjs`: contact limit 16 KiB and Stripe webhook 256 KiB; oversized requests receive HTTP 413 before parsing. No real production runtime verification yet.
- After this commit, inspect the exact commit CI, deploy failure and logs, then pursue only tasks independent of missing hosting/Supabase/Stripe secrets.
