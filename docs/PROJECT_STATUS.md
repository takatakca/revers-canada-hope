# REVERS CANADA — Project status

Updated: 2026-10-14. Source: GitHub `takatakca/revers-canada-hope`, default branch `main`.

## Verified completed
- GitHub migration/PR #1 merged 2026-10-10. Lovable-only Vite adapter removed.
- TanStack Start + Nitro Node.js 22, cPanel Passenger immutable release loader, `/healthz` and `/readyz`.
- FR/EN public pages for RêvPÈRE, programs, contact, donations, resources, housing, food and organization.
- Contact form saves server-side, produces privacy-minimized TAKATAK lead outbox record.
- TAKATAK launch/exchange contract, service authentication, server-side derived product session and outbox code in repository.
- Newsletter with explicit consent and backend save acknowledgement (provider not connected).
- Stripe one-time and recurring Checkout code with signed payment webhook and a verified status screen (no live transaction verified).
- SEO cleanup, canonical sitemap, privacy corrections, searchable community resources.
- **First completed CI at initial resumption:** [REVERS CI run 38610837318](https://github.com/takatakca/revers-canada-hope/actions/runs/38610837318) succeeded for `ede77977b686057c657ae1e9bdf6707aa692e21b`.

## Incomplete / not verified
- Production deployment: **BLOCKED** by missing `MOCHAHOST_HOST` in GitHub `production` environment; no release uploaded in observed workflow run [38610837590](https://github.com/takatakca/revers-canada-hope/actions/runs/38610837590).
- MochaHost application instance, domain DNS/TLS and `https://reverscanada.ca/healthz`: no successful external verification.
- Actual production Supabase migration state, Stripe signed webhook, Stripe recurring renewals/cancellations and tax-receipt eligibility not confirmed.
- TAKATAK live token exchange, HMAC outbox delivery and entitlement contract not confirmed.
- Newsletter sending integration and opt-out delivery workflow not built/verified.
- Support intake has categories but no dedicated private case-management dashboard. Do not claim operational crisis response.
- No controlled evidence of production end-to-end security, accessibility or payment tests.

The repository is **not 100% complete** and the website must **not** be called deployed until the documented gates pass.

## Database account access finding (2026-10-14)

Connected Supabase currently lists TAKATAK STAGING, FESTI ICE, TAKATAK Dashboard, foodhub and ALKAO, but **does not list the operational REVERS project ref `cmcbsbjxrrwtmxvcsbsg`** found in repository configuration. The live REVERS database cannot be migrated or verified from this connection. Do not apply REVERS SQL to other TAKATAK projects.

## Incremental verification, 2026-10-14

- [CI 38613967661](https://github.com/takatakca/revers-canada-hope/actions/runs/38613967661) passed after server-only donation intent migration to TanStack server functions.
- [CI 38614682169](https://github.com/takatakca/revers-canada-hope/actions/runs/38614682169) passed after TAKATAK session and Stripe payment validation hardening.
- New `node:test` validation checks were introduced after those runs. At the time of capture, CI `38615246341` for `193e729c` was queued, so their success is **not yet claimed**.
- CI-triggered deploys still fail before SSH due to missing `MOCHAHOST_HOST`; exact production release unverified.

## Lockfile recovery and interface correction (2026-10-14)

- GitHub [repair-lockfile run 38615786073](https://github.com/takatakca/revers-canada-hope/actions/runs/38615786073) completed **successfully**; bot commit `8f3ba2b67f50ec83913c2caf40f7be7c9dc583ab` synchronized the lockfile. Main/deploy restored to `npm ci` pending fresh full CI result.
- Removed misleading welcome popup and unverified event/ad claims. Mobile home-screen installation now uses an actual browser prompt where supported and fallback instructions elsewhere; device verification remains pending.


## Most recent verified pipeline (2026-10-14)

- `d55a2b139903f83e310c7839399dc4c7f3d5ca6d` passed all [CI run 38616454152](https://github.com/takatakca/revers-canada-hope/actions/runs/38616454152), after formatting the validation tests.
- [Deploy run 38616599494](https://github.com/takatakca/revers-canada-hope/actions/runs/38616599494) failed before remote upload due to missing `MOCHAHOST_HOST`. No release was observed in production.
- Added scheduled TAKATAK event outbox worker workflow; production credentials remain unconfigured/unverified.

Latest source verification: [CI 38616907443](https://github.com/takatakca/revers-canada-hope/actions/runs/38616907443) passed for `090e55d5`; [deploy 38617055204](https://github.com/takatakca/revers-canada-hope/actions/runs/38617055204) failed before upload at `MOCHAHOST_HOST`. A direct DNS/curl probe for `reverscanada.ca` in this environment could not resolve the host. The site remains **unverified / not deployed by this session**.

Last objectively green source CI: [38617278856](https://github.com/takatakca/revers-canada-hope/actions/runs/38617278856), commit `cb03c7a9`, including Node tests and production build. Deployment [38617413243](https://github.com/takatakca/revers-canada-hope/actions/runs/38617413243) still fails missing `MOCHAHOST_HOST` before file transfer. Documentation-only successors require a new SHA-specific CI check.

## Recurring-donation development (2026-10-15)

A signed Stripe invoice and subscription event handler plus unique recurring-invoice ledger migration were committed under `8165bd3bb4476f70ee28aef6550ea55c66f5a154`. TypeScript database types and unit tests were added. This is **code implementation**, not proof that recurring payments run in production. REVERS migration, live webhook event, billing renewal and cancellation testing are not yet possible without the operational REVERS Supabase project and Stripe test-mode configuration. Public release remains unverified.

## CI confirmation (2026-10-15)
- [REVERS CI 38775784157](https://github.com/takatakca/revers-canada-hope/actions/runs/38775784157) **success** on commit `0be884a53bc1bbe139607f02950745ab78f390fb`: npm ci, migration check, typecheck, lint, unit tests including recurring invoices, production build and artifact inspection.
- [MochaHost deployment 38775967756](https://github.com/takatakca/revers-canada-hope/actions/runs/38775967756) **failed before upload**: missing `MOCHAHOST_HOST` production secret, explicitly verified in job log.
- Added fail-closed billing guard: monthly Stripe Checkout is disabled until the server can query the new recurring-invoice table. One-time checkout can remain independent. The guard itself requires CI verification on the next SHA.

## Server-only form RLS hardening (2026-10-15)

Prepared migration `supabase/migrations/20261015133000_lock_down_public_form_writes.sql` revokes `anon`/`authenticated` direct DML and the old public write RLS policies on contacts, newsletter subscribers and donation intents. This is the required database half of the server-only form transition. **The migration is not applied** because the connected Supabase account does not expose the REVERS operational project. No existing unrelated project's tables were touched. Latest Stripe ledger guard passed [REVERS CI 38776251714](https://github.com/takatakca/revers-canada-hope/actions/runs/38776251714) on `a0feb15c`.

## API payload safety (2026-10-15)

Untrusted public contact and Stripe webhook bodies now pass through a bounded stream reader. Contact requests are capped at 16 KiB; signed Stripe webhook payloads are capped at 256 KiB, returning HTTP 413 on excess. New Node tests verify exact boundaries and UTF-8 byte lengths. This code requires a fresh CI run after push. The prior RLS migration source passed [CI 38776537435](https://github.com/takatakca/revers-canada-hope/actions/runs/38776537435), but was not applied to the missing REVERS Supabase connection.

## Latest verified code and deployment (2026-10-15)
- Source SHA `dcd339c04cb19f138c0e4ccc0e28a66c2d4881a6`: [CI 38776928312](https://github.com/takatakca/revers-canada-hope/actions/runs/38776928312) **success** for Node unit tests, typecheck, lint and Nitro build.
- [Deployment 38777067780](https://github.com/takatakca/revers-canada-hope/actions/runs/38777067780) **failure before upload** from absent `MOCHAHOST_HOST`. Production unverified.
- Recurring invoice and public-table restriction SQL migrations remain **unapplied** to REVERS Supabase; live Stripe and TAKATAK integrations remain unverified.


## Restricted support-operations source (2026-10-15)
- Added `/admin/support` with bilingual case list, status filtering, pagination and real status updates backed by `contacts`.
- `GET/PATCH /api/internal/revers/support` accesses **only** `source=REVERS_CANADA_GAR`; all reads/writes require a valid cryptographically signed TAKATAK derived product session and a server-configured delegated TAKATAK UUID.
- Mutation validates the expected current status, current legal status constraint (`new/reviewed/archived`), JSON origin and request-size cap. No anonymous or general REVERS member receives case-management privileges.
- New authorization tests: `tests/support-admin.test.mjs`. Code commit [e8991116](https://github.com/takatakca/revers-canada-hope/commit/e89911160766e7e798bf7027f04bc3a7780e7f43). Production operator delegation and private data workflow **not tested live**.


## Most recent verified results (2026-10-15)
- **Support console compiled/tested:** [CI 38791380042](https://github.com/takatakca/revers-canada-hope/actions/runs/38791380042), commit `9a75362e`, successful.
- **Newsletter opt-out compiled/tested:** [CI 38791857874](https://github.com/takatakca/revers-canada-hope/actions/runs/38791857874), code `460992911d43b153ca3c6b7624384c032cf1fbe5`, successful. Includes HMAC token verification, POST-only confirmed unsubscribe, no mutation on GET preview and consent false after unsubscribe. Existing unsubscribed subscriber cannot silently resubscribe by repeating signup.
- **MochaHost:** [deploy 38792000621](https://github.com/takatakca/revers-canada-hope/actions/runs/38792000621) failed *before upload* at missing GitHub secret `MOCHAHOST_HOST`. No production release verified.
- **Database:** current connected Supabase projects do **not** include the REVERS-specific operational project; do not apply migrations to a neighboring TAKATAK project.
- **Email:** provider and sender not connected, so opt-out link rendering in real email remains pending. Do not claim email delivery exists.
