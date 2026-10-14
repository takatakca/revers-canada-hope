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
