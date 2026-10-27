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


## Latest operator handoff (2026-10-15; post-status-audit work)

**Repository / branch:** `takatakca/revers-canada-hope` / `main`. **Last verified pushed code SHA:** `98295aa1e3541bfe04a956c6d432dc0a05e39c2e`. This handoff's documentation commit succeeds that SHA: use GitHub `main` as the authoritative latest pushed commit.

**Last task finished:**
- Case-status changes now use atomic `public.revers_transition_support_status(...)` invoker RPC, writing `revers_support_status_audit` with the signed TAKATAK operator UUID. No case narratives/emails/phones in the audit.
- Authorized support operators can view each case's recorded status history via the same private endpoint, with no-store responses, explicit `REVERS_CANADA_GAR` contact verification, and a 50-entry limit. Anonymous and ordinary product users remain 403 by default.
- Migration prepared: `supabase/migrations/20261015235500_support_status_audit.sql`. **Not applied** anywhere; REVERS database access is still missing. Existing changes are not backfilled.

**Files modified (code):** `src/routes/api/internal/revers/support.ts`, `src/routes/admin/support.tsx`, `src/integrations/supabase/types.ts`, `tests/support-admin.test.mjs`, new audit SQL file. **Documentation:** `WORKLOG.md` and all five canonical `docs/` files.

**Commands and verification:** GitHub API source/head/PR/issue inspections, GitHub CI jobs and failed logs reviewed. New integration SQL syntax was researched against current Supabase function/grant documentation, but could not be executed without the real database. First source CI lint identified three Prettier errors (runs `38848126533` and `38848213037`); fixed by code commit `98295aa1`. [CI 38848287271](https://github.com/takatakca/revers-canada-hope/actions/runs/38848287271) **succeeded** through installation, migration QA, TS, lint, Node tests, build and Nitro artifact. [deployment 38848381314](https://github.com/takatakca/revers-canada-hope/actions/runs/38848381314) **failed** at `Validate deployment configuration`: `Missing required deployment secret: MOCHAHOST_HOST`; no transfer occurred.

**Current task:** production connection, database schema/RLS application and signed application smoke tests. Never claim audit behavior was verified in live Postgres. Live `https://reverscanada.ca/healthz` and `/readyz` could not be fetched in the current web environment, so production release SHA and readiness remain unverified.

**Access required (names only, no secret values):**
- GitHub `production`: `MOCHAHOST_HOST` (confirmed missing), `MOCHAHOST_USER`, `MOCHAHOST_SSH_PORT`, `MOCHAHOST_APP_ROOT`, `MOCHAHOST_SSH_PRIVATE_KEY`, `MOCHAHOST_KNOWN_HOSTS`, `REVERS_PRODUCTION_URL`.
- cPanel Node runtime: existing `PUBLIC_SITE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `REVERS_SESSION_SECRET`, TAKATAK service/HMAC/outbox credentials, Stripe secrets, `REVERS_SUPPORT_ADMIN_IDENTITY_IDS` and newsletter signing secret as applicable.
- The actual REVERS-only Supabase instance `cmcbsbjxrrwtmxvcsbsg` must be connected; do not apply SQL to any other visible project.

**Next exact action:** verify latest `main` SHA and new documentation-commit CI. Obtain authorized REVERS Supabase access; inspect migration history and apply `20261015131500`, `20261015133000`, then `20261015235500`, verifying RLS/EXECUTE denials and atomic status/audit rollback. Set authorized TAKATAK operator UUID at runtime; verify real 403 vs authorized list/update/history. Resolve GitHub `production` secrets tracked by [issue #2](https://github.com/takatakca/revers-canada-hope/issues/2), fix DNS/TLS and run a *successful* CI-triggered MochaHost deploy. Check exact `/healthz.release` SHA and HTTP-200 `/readyz`, then test Stripe signed events, live TAKATAK exchange and newsletters. Until then **NOT 100% / NOT LIVE-VERIFIED**.


## Session handoff — 16 octobre 2026 (TAKATAK outbox reliability)

**GitHub authoritative repository:** `takatakca/revers-canada-hope`, branch `main`. **Last verified pushed source SHA:** `5fff67c33bcbe067149450409d7ecc76e8f67ccc`. The documentation-only successor SHA is resolved by fetching the current `refs/heads/main` (this file cannot self-reference the commit containing itself).

**Last task completed:** fail-closed TAKATAK outbox persistence `src/lib/takatak/outbox.ts` with pure policy/check helper `src/lib/takatak/outbox-state.ts` and unit tests `tests/takatak-outbox-state.test.mjs`. Recovery errors, claim errors, delivered acknowledgement errors, retry-state errors are no longer ignored. Only persisted matching event rows count toward response counters. On a remote delivery that succeeded but whose acknowledgement failed, the worker attempts an eventual retry with the SAME immutable `event_id`; receiving TAKATAK must deduplicate. No new identity authority or shared family-support data introduced.

**Checks actually executed:** GitHub latest `main`, open PRs (none), open issue #2, and recent workflows reviewed; files, bridge schema and scheduled worker inspected. Connected Supabase project list inspected: `cmcbsbjxrrwtmxvcsbsg` REVERS operational project **not present**; no SQL run on another account. Direct `curl` for `https://reverscanada.ca/healthz` and `/readyz` could not resolve hostname. Initial [CI 38942784926](https://github.com/takatakca/revers-canada-hope/actions/runs/38942784926) failed one Prettier import formatting error; corrected in `5fff67c33bcbe067149450409d7ecc76e8f67ccc`. [CI 38942916738](https://github.com/takatakca/revers-canada-hope/actions/runs/38942916738) **SUCCEEDED**: `npm ci`, GitHub migration QA, TypeScript, lint, Node tests, Vite/Nitro build, production output. [MochaHost 38943041446](https://github.com/takatakca/revers-canada-hope/actions/runs/38943041446) **FAILED** at `Validate deployment configuration` / `Missing required deployment secret: MOCHAHOST_HOST` before SSH/upload.

**Files changed in current session:** `src/lib/takatak/outbox.ts`, `src/lib/takatak/outbox-state.ts` (new), `tests/takatak-outbox-state.test.mjs` (new), and for continuity `WORKLOG.md`, `docs/PROJECT_STATUS.md`, `docs/TASK_QUEUE.md`, `docs/AGENT_HANDOFF.md`, `docs/DEPLOYMENT.md`, `docs/DECISIONS.md`.

**Current task:** production integration/deployment is blocked by missing authorized credentials; independent tasks (newsletter sender integration, directory validation, hardening/privacy/security and product browser tests) remain executable at source level. Pending REVERS-only migrations `20261015131500_revers_recurring_invoices.sql`, `20261015133000_lock_down_public_form_writes.sql`, `20261015235500_support_status_audit.sql` remain unapplied.

**Required access, without values:** GitHub `production` secrets `MOCHAHOST_HOST` (missing), `MOCHAHOST_USER`, `MOCHAHOST_SSH_PORT`, `MOCHAHOST_APP_ROOT`, `MOCHAHOST_SSH_PRIVATE_KEY`, `MOCHAHOST_KNOWN_HOSTS`, `REVERS_PRODUCTION_URL`, `REVERS_OUTBOX_WORKER_TOKEN`; actual REVERS Supabase project `cmcbsbjxrrwtmxvcsbsg`; authorized cPanel runtime SUPABASE/TAKATAK/REVERS session/Stripe/newsletter credentials; valid authoritative DNS/TLS. Never commit values.

**Exact next action:** fetch GitHub `main` and latest CI/deploy; do not repeat unchanged failed deploy. Once authorized, connect **only** the REVERS Supabase project; inspect migration history and apply the three pending migrations in order, verify RLS and service-role access, test real REVERS case state/audit, webhook invoices, and TAKATAK outbox delivery with deliberate retry/dedupe. Configure GitHub MochaHost secrets tracked by [issue #2](https://github.com/takatakca/revers-canada-hope/issues/2), fix DNS, deploy from a successful head SHA and prove exact `/healthz.release` and HTTP 200 `/readyz`. **Not production verified; NOT 100%.**


## Latest session continuation — 16 octobre 2026 (family directory)

**Repository and branch:** `takatakca/revers-canada-hope`, `main`. **Last pushed and CI-verified source SHA:** `48bf4f4534c8bd9b16faf22fe16419f02eda74d9`; this documentation commit is later — fetch the GitHub branch ref for the exact new head. No force pushes, no open PRs at session start.

**Most recent finished task:** Bilingual `/ressources` links to official family mediation instructions from Gouvernement du Québec and shared-custody/Family Allowance guidance from Retraite Québec; preserved 211 Grand Montréal/JuridiQC links; explicit statement external services are independent from REVERS and conditions/timing must be confirmed. No fake partner relationship. Added static source-link/disclaimer tests.

**Modified source files this new batch:** `src/routes/ressources.tsx` and `tests/resource-directory.test.mjs`; earlier in same session `src/lib/takatak/outbox.ts`, `src/lib/takatak/outbox-state.ts`, `tests/takatak-outbox-state.test.mjs`. Also updated `WORKLOG.md` and all five canonical docs.

**Commands and checks:** Inspected GitHub `AGENTS.md`, last handoff, task queue, `main` SHA, no open PRs, issue #2, and workflow logs. Checked 211, JuridiQC, Québec mediation and Retraite Québec public official pages and their content; no live service booking or eligibility inferred. Outbox code CI [38942916738](https://github.com/takatakca/revers-canada-hope/actions/runs/38942916738) successful; deploy [38943041446](https://github.com/takatakca/revers-canada-hope/actions/runs/38943041446) failed at missing `MOCHAHOST_HOST`. First directory code CI `38943492072` failed only three Prettier issues; corrected in SHA `48bf4f4534c8bd9b16faf22fe16419f02eda74d9`. [CI 38943633417](https://github.com/takatakca/revers-canada-hope/actions/runs/38943633417) **SUCCESS** (npm ci, migration QA, TypeScript, lint, Node tests, Nitro build and artifact). [Deploy 38943739162](https://github.com/takatakca/revers-canada-hope/actions/runs/38943739162) triggered after CI; see its completed conclusion in GitHub before assuming any release. Direct production /healthz and /readyz from this runner could not resolve `reverscanada.ca` earlier in session.

**Currently in progress:** Production environment access and release verification; apply all three REVERS-only pending Supabase migrations after verifying history and scope, then real authorized support/audit, Stripe, TAKATAK outbox and newsletter sender end-to-end tests. Correct REVERS Supabase project `cmcbsbjxrrwtmxvcsbsg` remains missing from connected accounts; do not alter other Supabase projects. No producer app currently confirmed live at `reverscanada.ca`.

**Authorization needed, no values:** GitHub environment `production` secrets `MOCHAHOST_HOST`, `MOCHAHOST_USER`, `MOCHAHOST_SSH_PORT`, `MOCHAHOST_APP_ROOT`, `MOCHAHOST_SSH_PRIVATE_KEY`, `MOCHAHOST_KNOWN_HOSTS`, `REVERS_PRODUCTION_URL`, `REVERS_OUTBOX_WORKER_TOKEN`. cPanel runtime proper REVERS Supabase, session, TAKATAK integration, Stripe, support operator and newsletter signing/sending configuration. Correct domain DNS/TLS.

**Next exact action:** Check `main` and CI for documentation successor, and [Deploy 38943739162](https://github.com/takatakca/revers-canada-hope/actions/runs/38943739162) terminal logs; update this record if status differs. If GitHub production `MOCHAHOST_HOST` is still missing, avoid rerunning unchanged broken deploy and retain [issue #2](https://github.com/takatakca/revers-canada-hope/issues/2). Connect real REVERS operational database, verify and apply in order the three pending migrations, test tenant isolation and role denials, test authenticated cases and outbox idempotency, then authorize MochaHost deployment and prove exact Git SHA on `/healthz.release` + HTTP-200 `/readyz`. **Project NOT 100% / publication unverified.**

## Coolify preview and real hosting facts (2026-10-26)
- **What actually serves `reverscanada.ca` today:** DNS A `209.42.24.129`, the MochaHost reseller cPanel account `reverscanada` (Passenger, `apps/reverscanada/server.cjs`), zone serial `2026090300` on `ns1–ns4.mysecurecloudhost.com`. The page served there is an **older build**: `/readyz` returns the HTML app shell (route missing) and the home title is "REVERS CANADA | Espoir, soutien et communauté à LaSalle". It was not produced by `deploy-mochahost.yml`; that workflow still fails before upload (latest [38943995419](https://github.com/takatakca/revers-canada-hope/actions/runs/38943995419) on `bea8bfd`).
- **New non-production preview on Coolify:** application `reverscanada-preview` (uuid `awgyeyiknkiq2vwshfdlg3f6`, project "REVERS CANADA", server vps2 `209.145.49.63`), building `main` automatically through the Coolify GitHub App. Nixpacks Node 22, `npm ci --no-audit --no-fund`, `npm run build` with `NITRO_PRESET=node-server`, start `node .output/server/index.mjs`, health check `/healthz`. Temporary address: `http://awgyeyiknkiq2vwshfdlg3f6.209.145.49.63.sslip.io` (plain HTTP, not indexed by DNS for the real domain).
- First deployment built `bea8bfdcfb9854a43c49ac335fc6e6257a6ff78a` and passed the container health check. `/healthz` → `{"ok":true,"service":"revers-canada-web","release":null}`; `/readyz` → HTTP 503 as expected, because no server secrets are configured. Browser check (Playwright, fr-CA): `/`, `/ressources`, `/contact` and `/en` render without page errors.
- Preview environment holds **public values only**: `VITE_SUPABASE_URL` / `VITE_SUPABASE_PROJECT_ID` / `VITE_SUPABASE_PUBLISHABLE_KEY` (the anon values already shipped in the live bundle, project `cmcbsbjxrrwtmxvcsbsg`), `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `PUBLIC_SITE_URL=https://reverscanada.ca`. **Not set:** `SUPABASE_SERVICE_ROLE_KEY`, `REVERS_SESSION_SECRET`, Stripe, TAKATAK, newsletter and outbox secrets.
- `release` is `null` on the preview because `RELEASE_SHA` is only set by the MochaHost loader (`app.js`). Before a Coolify production release, make `/healthz` report Coolify's commit (for example fall back to `SOURCE_COMMIT`).
- **No domain change was made.** The owner chose to keep the live site as is until they approve the release. The domain also exists as an addon in the bolonca cPanel account (not authoritative: the cluster still serves the reseller zone, serial `2026090300`), prepared for retiring the reseller account.

**Next exact action:** owner decides between (a) keeping MochaHost (configure `MOCHAHOST_*` secrets) or (b) releasing on Coolify: add the server secrets in Coolify, apply the pending migrations to the correct project, attach `reverscanada.ca` + `www` to `reverscanada-preview`, point only the website A records to `209.145.49.63`, then verify `/healthz`, HTTP-200 `/readyz` and TLS on the real domain before retiring the reseller account.

## 2026-10-27 — MochaHost deploy failures replaced by a Coolify check (Claude)
- **Problem:** after the merge of PR #3, [Deploy #48](https://github.com/takatakca/revers-canada-hope/actions/runs/40450106727) failed again at `Missing required deployment secret: MOCHAHOST_HOST`, as #46 and #47 did. The MochaHost secrets were never configured, and the reseller account they would target is being retired in favour of Coolify.
- **Change (branch `claude/coolify-release-check`):**
  - `deploy-mochahost.yml` runs automatically only when the repository variable `REVERS_MOCHAHOST_DEPLOY=true`; manual dispatch is unchanged.
  - New `confirm-coolify.yml`: after `REVERS CI` passes on a push to `main`, it waits up to 15 minutes until the Coolify origin's `/healthz` reports that exact commit. The default origin is the preview; the variable `REVERS_COOLIFY_ORIGIN` overrides it, and `/readyz` must be 200 when the origin is `https://reverscanada.ca`.
  - `/healthz` and `/readyz` report `SOURCE_COMMIT` when `RELEASE_SHA` (the MochaHost loader) is absent, via `src/lib/release.ts`, tested in `tests/release.test.mjs`.
- **Coolify:** "include source commit in build" is now on for `reverscanada-preview`.
- **Evidence:** the branch head `161222da6fbf11dde89bcd902c0ddc4fd63cf020` built on the preview and served `{"ok":true,"service":"revers-canada-web","release":"161222da…"}`. The application was then switched back to `main`.
  - Local runs: migration QA, typecheck, lint (no errors; warnings only on lines already present on `main`), 22/22 Node tests, and the Nitro build.
  - One Coolify build failed with esbuild `ETXTBSY` during `npm ci` (a transient overlay-filesystem race); the rebuild passed. If `confirm-coolify.yml` fails, open the Coolify deployment log first and redeploy.
- **Next exact action:** after merge, check that `REVERS CI` and "Confirm REVERS CANADA on Coolify" pass on the merge commit and that "Deploy REVERS CANADA to MochaHost" is **skipped**. Production `reverscanada.ca` is still the older MochaHost build until the owner approves the Coolify release (steps in `docs/DEPLOYMENT.md`).
