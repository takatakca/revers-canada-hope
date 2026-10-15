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

## Verified closing evidence — 2026-10-15

- **Latest independently verified source SHA:** `dcd339c04cb19f138c0e4ccc0e28a66c2d4881a6`. This handoff update itself is committed after that code SHA; consult the current GitHub main ref for the exact latest head.
- [REVERS CI 38776928312](https://github.com/takatakca/revers-canada-hope/actions/runs/38776928312) **SUCCESS** for the above SHA. All gates passed: npm ci, migration QA, TypeScript, lint, Node unit tests including Stripe invoices and bounded bodies, Nitro build and release-artifact validation.
- [MochaHost deploy 38777067780](https://github.com/takatakca/revers-canada-hope/actions/runs/38777067780) **FAILURE**, before uploading files, at Validate deployment configuration. Verified job log: `Missing required deployment secret: MOCHAHOST_HOST`.
- Both REVERS-only migrations (`20261015131500_revers_recurring_invoices.sql` and `20261015133000_lock_down_public_form_writes.sql`) are prepared in source, **not applied**. The operational REVERS Supabase project `cmcbsbjxrrwtmxvcsbsg` is not in the available connected project list; never run these on another TAKATAK project.
- Live `https://reverscanada.ca/healthz` and `/readyz` could not be verified. The production site must not be reported as deployed or 100% finished.
- Latest finished work: monthly Stripe renewal invoice ledger and fail-closed activation, server-only form write-lockdown migration, and 16 KiB contact / 256 KiB webhook request body caps. Exact affected files are identified in recent WORKLOG and commits.
- Current unresolved tasks: production credentials and DNS, REVERS database migrations/RLS validation, signed Stripe webhook tests, TAKATAK service-token exchange/HMAC delivery, newsletter provider/opt-out, scoped support admin portal and production QA.

**Next exact action:** check the GitHub main SHA and latest CI. Configure production secret `MOCHAHOST_HOST` and the other named MochaHost credentials through approved GitHub environment settings (never source); connect correct REVERS Supabase, apply both migrations and test negative anon permissions; test Stripe/TakataK; deploy and prove both /healthz.release SHA and /readyz 200. Do not rerun the unchanged failed deploy.


## Support operations development (2026-10-15)
- **Last source task completed:** case-management screen `src/routes/admin/support.tsx`, authenticated server endpoints `src/routes/api/internal/revers/support.ts`, strict TAKATAK operator helper `src/lib/support/access.ts`, and unit tests `tests/support-admin.test.mjs`, pushed as [e8991116](https://github.com/takatakca/revers-canada-hope/commit/e89911160766e7e798bf7027f04bc3a7780e7f43).
- **Current task:** verify CI for this commit (workflow 38791034845 initially in progress), fix any lint/build/tests, and enable only after authorized cPanel configuration.
- **Exact permissions:** a valid signed REVERS product session with `revers_access` *and* a matching server-only `REVERS_SUPPORT_ADMIN_IDENTITY_IDS` TAKATAK master identity UUID. No access is granted by default. Protected API implements status constraints, strict same-origin mutation, pagination and optimistic conflict checks. GET exposes private contact data solely on this authorized API; do not add a public link or anonymous access.
- **Files also modified for continuity:** `.env.example`, `WORKLOG.md`, `docs/PROJECT_STATUS.md`, `docs/TASK_QUEUE.md`, `docs/AGENT_HANDOFF.md`, `docs/DEPLOYMENT.md`, `docs/DECISIONS.md`.
- **Checks at start:** CI [38777285234](https://github.com/takatakca/revers-canada-hope/actions/runs/38777285234) successful for prior SHA `a76c9db218c04bd0e00ceb3f3297ba22b8d2a036`; deploy [38777430045](https://github.com/takatakca/revers-canada-hope/actions/runs/38777430045) failed. Live `https://reverscanada.ca/healthz` and `/readyz` could not be read from web; no successful release verified.
- **Blocking:** cPanel and REVERS Supabase access absent, `MOCHAHOST_HOST` previously missing in GitHub `production`, live Stripe/TAKATAK flow unverified. Do not set operator UUIDs from public inputs or expose case details in logs.
- **Next exact action:** check latest `main` and CI for the handoff successor SHA; inspect failed step logs and fix red gates. Then configure an authorized TAKATAK master identity UUID in cPanel `REVERS_SUPPORT_ADMIN_IDENTITY_IDS`, deploy after GitHub secrets/DNS are correctly configured, sign in through TAKATAK, prove non-operator 403 and operator case read/update in the actual REVERS environment. Verify full production /healthz SHA and /readyz 200 before claiming deployment.


## Verified handoff after support + newsletter work — October 15, 2026
**Current branch:** `main`. **Latest tested code SHA:** `460992911d43b153ca3c6b7624384c032cf1fbe5`. A documentation commit follows this SHA; obtain the exact final head from the GitHub main ref rather than interpreting the code SHA as the last documentation commit.

**Last completed tasks and files:**
- Support administration code `e89911160766e7e798bf7027f04bc3a7780e7f43`: `src/lib/support/access.ts`, `src/routes/api/internal/revers/support.ts`, `src/routes/admin/support.tsx`, `tests/support-admin.test.mjs` and `src/routeTree.gen.ts`.
- Newsletter privacy lifecycle code `460992911d43b153ca3c6b7624384c032cf1fbe5`: `src/lib/newsletter/unsubscribe-token.ts`, `src/routes/api/public/newsletter/unsubscribe.ts`, `src/routes/newsletter/unsubscribe.tsx`, `src/lib/newsletter.functions.ts`, `tests/newsletter-unsubscribe.test.mjs`, `src/routeTree.gen.ts`, `.env.example`.
- Supporting changes: `WORKLOG.md` and all five canonical status/decision/deployment/handoff files.

**Commands/checks executed through GitHub Actions:**
- [CI 38791380042](https://github.com/takatakca/revers-canada-hope/actions/runs/38791380042) **SUCCESS** for the updated support route tree (`9a75362eb3c3c72f3ec56e8ced40e575f7ffae54`). Typecheck, lint, Node tests, Nitro build, output artifact all passed.
- [CI 38791857874](https://github.com/takatakca/revers-canada-hope/actions/runs/38791857874) **SUCCESS** for new newsletter code (`46099291...`), including signed-token tests, typecheck, lint, Nitro build and artifact.
- [Deployment 38792000621](https://github.com/takatakca/revers-canada-hope/actions/runs/38792000621) **FAILURE**, validated in the failed job's log: `Missing required deployment secret: MOCHAHOST_HOST`. The gate stopped before SSH, upload or health verification. **Production not deployed or verified**.
- Connected Supabase `list_projects` still does not include operational REVERS project `cmcbsbjxrrwtmxvcsbsg`; do not run pending REVERS migration SQL on any visible TAKATAK/FESTI ICE/ALKAO project.
- Direct public `https://reverscanada.ca/healthz` and `/readyz` requests remained inaccessible; no TLS/release proof.

**Current task:** live deployment, correct database security migrations, authorized admin browser test, Stripe monthly billing, TAKATAK exchange and newsletter sender setup; these depend on external authorized access.

**Configuration still required, values never committed:** GitHub `production` environment `MOCHAHOST_HOST`, `MOCHAHOST_USER`, `MOCHAHOST_SSH_PORT`, `MOCHAHOST_APP_ROOT`, `MOCHAHOST_SSH_PRIVATE_KEY`, `MOCHAHOST_KNOWN_HOSTS`, `REVERS_PRODUCTION_URL`; cPanel `REVERS_SUPPORT_ADMIN_IDENTITY_IDS` (delegated TAKATAK UUID list) and stable 32+ char `REVERS_NEWSLETTER_UNSUBSCRIBE_SECRET` plus prior SUPABASE/TAKATAK/Stripe settings. Newsletter provider not yet connected; **no mailing capability claimed**.

**Next exact action:** verify GitHub head and CI for handoff's new documentation SHA; if green, do not rerun MochaHost deployment without filling missing credentials. Obtain access to **the exact REVERS** Supabase project and verify/apply `20261015131500` then `20261015133000`; check anon write denial and service role. Configure correct authorized operator identity and newsletter HMAC key on cPanel. Verify anonymous/user 403 vs delegated user access to `/api/internal/revers/support`, newsletter signed link opt-out and prevention of accidental GET changes. Integrate actual email sender and include HMAC opt-out links. Verify domain/TLS, successful CI-triggered deploy exact release SHA and /readyz 200 before declaring production.
