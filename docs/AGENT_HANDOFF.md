# REVERS CANADA — Agent handoff (canonical)

**Updated:** 2026-10-14. **Repository:** `takatakca/revers-canada-hope` — **branch:** `main`.

**Last independently confirmed pushed code commit before this handoff update:** `193e729c76ad60e40b3b9fb8086fca23e8efaa15`. This file is itself committed after that SHA; the final published handoff commit is the current GitHub `main` head (`git rev-parse origin/main`, or [GitHub main](https://github.com/takatakca/revers-canada-hope/commits/main)). Avoid confusing the captured predecessor SHA with the current head.

## Latest completed development

1. CI-only automatic MochaHost deployment using `workflow_run` only after a successful `main` push, checking out the validated SHA. Failed CI prevents deployment.
2. Immutable Nitro release activates with an atomic `CURRENT` pointer, rollback on failed health, protects `CURRENT`/`PREVIOUS` from cleanup, and checks exact `/healthz.release` SHA and `/readyz`.
3. Donation intent creation moved from browser Supabase insert to server-only function. `/readyz` now probes the operational Supabase `contacts` table within 3.5s, fails closed and hides config diagnostics.
4. TAKATAK derived product session has a signed maximum ten-minute validity and rejects bad expiry; worker bearer token is constant-time checked, with sanitized API errors.
5. Signed Stripe initial payment webhook validates intent ID, checkout session, amount, currency, mode and project metadata before marking paid; one-time PaymentIntent carries project metadata. Recurring renewals remain a separate unimplemented ledger task.
6. Added `tests/validation.test.mjs` (Node.js 22 built-in runner), a `npm run test` script, and mandatory test steps to both CI and deployment. CAD donations reject exponent/hex/sub-cent amounts; custom amount UI has a 0.01 step.

## Current task / next exact action

1. Read this file, `AGENTS.md`, `WORKLOG.md` and `docs/TASK_QUEUE.md`.
2. Check current `main` SHA and GitHub Actions **REVERS CI** result for that exact SHA; retrieve failed job logs and fix if needed. Initial unit-test run `38615246341` was **queued** at the last observation (commit `193e729c`), not a verified success.
3. If green, inspect the corresponding `workflow_run` deployment. It should still stop in `Validate deployment configuration` until authorized production secrets are set.
4. Continue executable source tasks without retrying missing credentials. For live deployment, obtain the correct REVERS MochaHost and Supabase access; apply/verify scoped RLS and migrations, Stripe test webhooks and real TAKATAK exchange.
5. Run `/healthz` and `/readyz` checks against `https://reverscanada.ca` and verify the release SHA before declaring production live.

## Verification and errors

- CI successful for [`6b2e92b` run 38613967661](https://github.com/takatakca/revers-canada-hope/actions/runs/38613967661) and [`44a0f272` run 38614682169](https://github.com/takatakca/revers-canada-hope/actions/runs/38614682169).
- Several intermediate CI runs were **cancelled** by push concurrency; cancellation is not a test failure or success.
- [`npm ci` run 38613420293](https://github.com/takatakca/revers-canada-hope/actions/runs/38613420293) failed EUSAGE because `package-lock.json` is out of sync (Supabase/Nitro/Stripe dependencies and transitives). Temporarily reverted to `npm install`; proper lockfile regeneration remains P0.
- Multiple automatic deploy runs failed before upload at missing `MOCHAHOST_HOST` in GitHub `production`. The new success-only trigger works but does not create credentials.
- `reverscanada.ca` DNS/TLS and production HTTP checks were not verified from current tools.
- Connected Supabase workspace does **not** include the repository's REVERS project `cmcbsbjxrrwtmxvcsbsg`. Do not apply REVERS migrations to other listed projects.
- No live Stripe service credentials or TAKATAK service/HMAC token exchange verified. No live authenticated support admin portal or newsletter provider connected.

## Files touched during this session

`.github/workflows/ci.yml`, `.github/workflows/deploy-mochahost.yml`, `AGENTS.md`, `package.json`, `src/lib/donation.functions.ts`, `src/lib/donationService.ts`, `src/lib/checkout.functions.ts`, `src/lib/validation.ts`, `src/lib/takatak/session.ts`, `src/lib/takatak/client.ts`, `src/routes/api/internal/takatak/outbox.ts`, `src/routes/api/public/stripe-webhook.ts`, `src/routes/readyz.ts`, `src/routes/donate.tsx`, `tests/validation.test.mjs`, `WORKLOG.md`, documentation files.

## Required authorized configuration (never commit secret values)

**GitHub environment `production`:** `MOCHAHOST_HOST`, `MOCHAHOST_USER`, `MOCHAHOST_SSH_PORT`, `MOCHAHOST_APP_ROOT`, `MOCHAHOST_SSH_PRIVATE_KEY`, `MOCHAHOST_KNOWN_HOSTS`, `REVERS_PRODUCTION_URL`.

**cPanel runtime:** `PUBLIC_SITE_URL`, operational `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `REVERS_SESSION_SECRET`, TAKATAK launch/service/HMAC/outbox credentials, Stripe secret and webhook signing secret when donations are enabled. Set build-time Vite publishable configuration separately.

**Real status:** CODE ADVANCING. CI for latest release requires fresh verification. PRODUCTION NOT DEPLOYED/NOT VERIFIED. The project is **not 100% complete**; consult `docs/TASK_QUEUE.md`.

## Lockfile and mobile UI remediation (2026-10-14)

The dedicated GitHub [repair workflow](https://github.com/takatakca/revers-canada-hope/actions/runs/38615786073) succeeded and bot committed synchronized `package-lock.json` at `8f3ba2b67f50ec83913c2caf40f7be7c9dc583ab` after passing `npm ci --ignore-scripts`. Both main CI and deployment workflows have been restored to `npm ci --no-audit --no-fund` (with normal scripts); verify on the resulting commit. `src/components/PlatformExtras.tsx` now implements a real PWA install prompt/fallback instructions and removes invented workshop/ad placeholders; `src/components/SiteLayout.tsx` removes the unsolicited welcome popup and misleading announcement strip.


## Outbox scheduler and verified CI (2026-10-14)

- After Prettier repair, **CI run [38616454152](https://github.com/takatakca/revers-canada-hope/actions/runs/38616454152) succeeded** on `d55a2b139903f83e310c7839399dc4c7f3d5ca6d`.
- **Deploy run [38616599494](https://github.com/takatakca/revers-canada-hope/actions/runs/38616599494) failed before upload**; logs confirm missing `MOCHAHOST_HOST`. Production is not verified.
- New `.github/workflows/deliver-takatak-outbox.yml` runs scheduled or manual delivery, gated by matching `REVERS_OUTBOX_WORKER_TOKEN` in GitHub `production` and in cPanel runtime. Missing tokens skip safely. No live delivery has been verified.
- Next agent must check CI for the latest `main`, configure authorized production secrets, test a queued TAKATAK event end-to-end, and keep the scheduler disabled by missing secrets until the server is verified.


## Latest verified CI and stale deploy guard (2026-10-14)

- [REVERS CI run 38616907443](https://github.com/takatakca/revers-canada-hope/actions/runs/38616907443) **succeeded** for `090e55d53955b835b3dbcf2d54fc8b65e8e677eb` (migration check, `npm ci`, typecheck, lint, tests, build).
- [Deployment 38617055204](https://github.com/takatakca/revers-canada-hope/actions/runs/38617055204) **failed** before SSH due to missing GitHub `production` secret `MOCHAHOST_HOST`, confirmed in workflow logs.
- `curl -sSIL --max-time 8 https://reverscanada.ca/healthz` could not resolve the host from this execution environment; production DNS is **unverified** and must be checked independently from the host / registrar. Do not conclude a successful live release.
- The TAKATAK callback `src/routes/api/auth/takatak/callback.ts` was fixed to redirect via absolute HTTPS `PUBLIC_SITE_URL`; a Node 22 `Response.redirect("/")` call otherwise throws `TypeError`.
- The deploy workflow now rejects old CI SHAs after a newer push to `main`, and insists on a subdirectory of `/home/<account>` for safe artifact removal.
- **Next step:** verify CI for the newest main commit, configure the authorized `production` GitHub secrets and cPanel runtime, confirm DNS, then run SSH deploy with `/healthz.release` and `/readyz`.

## Final live evidence captured on 2026-10-14

1. Last non-documentation code/pipeline commit `cb03c7a99f8ad4c84abe2d48d076cf57e0159c56`: stale-CI release guard and safe app-root validation.
2. [REVERS CI run 38617278856](https://github.com/takatakca/revers-canada-hope/actions/runs/38617278856) **success** for `cb03c7a9`: `npm ci`, migration check, typecheck, lint, Node validation tests, Vite/Nitro production build and artifact existence check.
3. [Deploy run 38617413243](https://github.com/takatakca/revers-canada-hope/actions/runs/38617413243) **failure** at `Validate deployment configuration` before upload; same missing `MOCHAHOST_HOST` environment secret as all earlier attempts. No successful real deployment observed.
4. Latest verified `main` at documentation refresh start: `cb03c7a99f8ad4c84abe2d48d076cf57e0159c56`. This document's commit will be newer; read the current main ref and verify CI for that SHA.
5. Next practical action: configure `production` secrets in GitHub, confirm REVERS DNS resolves and TLS is valid, connect the actual REVERS Supabase project `cmcbsbjxrrwtmxvcsbsg`, configure runtime secrets, then validate deploy `/healthz.release` & `/readyz` and actual TAKATAK/Stripe flows.
6. **Not done:** domain availability, online deployment, Supabase migration/permissions audit, real TAKATAK exchange, Stripe test-mode webhook, recurring reconciliation, newsletter sender, restricted case-management portal. Do not report 100%.
