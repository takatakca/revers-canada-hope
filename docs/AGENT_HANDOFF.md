# REVERS CANADA — Agent handoff

**Captured:** 2026-10-14. **Repository:** `takatakca/revers-canada-hope`. **Publication branch:** `main`.
**Last GitHub head independently confirmed at start of this batch:** `ede77977b686057c657ae1e9bdf6707aa692e21b`. This handoff is committed with subsequent changes: for the actual last pushed SHA consult `git rev-parse origin/main` or the GitHub `main` ref; the final assistant report records the newly pushed commit.

## Last finished task
- Improved CI-to-deploy gating and SHA-aware health verification; attempted deterministic `npm ci`; temporarily reverted to `npm install` after CI proved lockfile drift.
- Added standardized five-document status, task queue, deployment, decisions and agent-handoff continuity.
- Prior existing batch finished father-focused support categories and privacy warning.

## Current task
- Verify CI on the latest commit; address any workflow issues.
- Follow the P0 list in `docs/TASK_QUEUE.md`.

## Files in this batch
- `.github/workflows/deploy-mochahost.yml`, `.github/workflows/ci.yml`, `AGENTS.md`, `WORKLOG.md`.
- `docs/PROJECT_STATUS.md`, `docs/TASK_QUEUE.md`, `docs/AGENT_HANDOFF.md`, `docs/DEPLOYMENT.md`, `docs/DECISIONS.md`.

## Technical verification evidence at start of batch
- GitHub `main` SHA read via Git refs API: `ede77977b686057c657ae1e9bdf6707aa692e21b`.
- GitHub CI `38610837318`: **success** (migration, typecheck, lint, Nitro build).
- Deploy `38610837590`: **failure** at Validate deployment configuration, no SSH/production transfer.
- No open GitHub issues or PRs in initial search.
- Initial new CI [38613420293](https://github.com/takatakca/revers-canada-hope/actions/runs/38613420293) failed during `npm ci`: lockfile missing current Supabase/Nitro/Stripe packages and outdated transitive versions. Regenerate lockfile with Node 22/npm 10, then restore `npm ci`. The next commit restores previously working `npm install` to unblock other checks.

## Blocking issues (no invented access)
- GitHub `production` environment missing `MOCHAHOST_HOST` (proven from earlier logs); remaining deployment secrets unverified.
- Public `reverscanada.ca` health and TLS not successfully checked; external browsing could not fetch the site.
- Supabase migration state, TAKATAK credentials, Stripe webhook and newsletter provider integrations not verified.
- Remote server login and live smoke tests cannot be performed through GitHub Actions until secrets are configured.

## Next exact action
1. Read this file, `AGENTS.md` and the top of `WORKLOG.md`.
2. Check latest `main` SHA and latest `REVERS CI` result; if CI fails, retrieve failed job logs and fix.
3. Confirm workflow-run deploy only fires after successful `REVERS CI`, and that the deployment config gate reports missing secrets.
4. Configure the named secrets in `docs/DEPLOYMENT.md` with authorized cPanel/GitHub access; never commit secret values.
5. Verify production `/healthz.release` equals exact SHA and `/readyz` returns 200, then continue TAKATAK/Stripe/Supabase P0 gates.

## Donation service hardening, 2026-10-14

Donation intent creation has been moved from the browser Supabase client to a TanStack server function using server-only `supabaseAdmin`. This removes the browser's dependency on direct operational writes for donations. **The live database privilege revocation is still a P0 action.** The repository points to Supabase project `cmcbsbjxrrwtmxvcsbsg` (public project ref only), which is not present in the currently connected Supabase project's list; do not modify unrelated databases. Add the server-only policy after accessing the correct project, then test anon/authenticated insert is denied, and service_role insert succeeds. No real database changes were claimed in this batch.

## Operational readiness health update (2026-10-14)

`src/routes/readyz.ts` now performs a real low-cost Supabase `contacts` table query with a 3.5s timeout and fails closed with HTTP 503 when the DB/table is unreachable. This is a public endpoint with no secret-status details. The live REVERS Supabase project remains inaccessible through the connected account, so this check is code-only until the correct project can be verified. It is **not** a reason to bypass the readiness gate.

## TAKATAK security hardening (2026-10-14)

Signed product cookies now reject invalid expiration values, reject already expired upstream sessions, cap signed payload expiration at ten minutes, and require a session signing secret at least 32 characters long. The HMAC outbox worker requires a strong token and uses constant-time comparison, with error details logged server-side only. Files: `src/lib/takatak/session.ts`, `src/lib/takatak/client.ts`, `src/routes/api/internal/takatak/outbox.ts`. Verify a real TAKATAK launch and worker authorization after connection is configured.

## Stripe verification guard (2026-10-14)

Initial payment webhook checks signed Stripe Checkout project metadata against REVERS, verifies session-id/amount/currency/frequency match the stored donation intent before marking paid, and applies failure/expiry only to that session. One-time Stripe PaymentIntent now carries the same metadata for failure handling. Needs actual Stripe test-mode event verification; no production keys available in GitHub documents.

## Release-pointer safety, 2026-10-14

Changed `.github/workflows/deploy-mochahost.yml` to atomically switch `CURRENT` and never prune a release referenced by `CURRENT`/`PREVIOUS`. This is source-side CI/CD hardening, not evidence that MochaHost accepted a release. Check that the YAML quality gates still pass and remote upload remains blocked only by missing deployment secrets.
