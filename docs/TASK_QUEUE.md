# REVERS CANADA — Prioritized task queue

| Priority | Task | State | Evidence / acceptance |
| --- | --- | --- | --- |
| P0 | Release `main` on Coolify (or configure MochaHost) | domain switched 2026-10-27; server secrets + migrations pending | `reverscanada.ca` serves `2f4754c` from Coolify. Add the runtime secrets listed in `docs/DEPLOYMENT.md`, apply migrations, set `REVERS_COOLIFY_ORIGIN`, prove HTTP-200 `/readyz` |
| P0 | Gate deployment on successful CI SHA and check production SHA | code implemented; live verify pending | `workflow_run` on successful push, `/healthz.release` matches validated Git SHA, rollback on failure |
| P0 | Regenerate and commit a synchronized npm lockfile | complete; `npm ci` verified in CI 38617278856 | `npm ci` fails with EUSAGE: missing Nitro/Supabase/Stripe packages and invalid transitive versions; regenerate with Node 22/npm 10, commit lockfile, restore `npm ci` |
| P0 | Configure MochaHost production environment secrets | superseded 2026-10-27: MochaHost deploy is opt-in (`REVERS_MOCHAHOST_DEPLOY`); Coolify builds main and `confirm-coolify.yml` verifies the SHA | Set `MOCHAHOST_HOST` and other names in `docs/DEPLOYMENT.md` via GitHub UI, not git |
| P0 | Verify real database readiness health gate | code implemented; production pending | `/readyz` returns HTTP 200 only if configured and operational contacts-table query succeeds; test failure mode against correct REVERS instance |
| P0 | Verify DNS/TLS and actual MochaHost root | blocked: hosting access | Browser and curl checks show correct production health and version |
| P0 | Revoke direct anonymous Supabase table insertion grants | migration committed; applying blocked: REVERS Supabase project not connected | Donation/contact/newsletter now save server-side; REVERS-only migration 20261015133000 revokes public writes. After confirming database, verify denied anon/authenticated inserts and working server submissions |
| P0 | Apply/verify Supabase migrations | blocked: project access/credentials | Migration history and service-role-only policies reviewed, no public cross-tenant data |
| P0 | Schedule durable TAKATAK outbox delivery | workflow added; live blocked | New GitHub scheduled outbox job every 30 minutes; requires verified production worker token in GitHub environment and successful live HMAC delivery |
| P0 | Prove TAKATAK launch/exchange & entitlement | blocked: live integration secrets | Full real server exchange and a denied unauthorized user |
| P0 | Test Stripe webhook and recurring billing end to end | blocked: Stripe credentials | Signed event replay + renewal/cancel/failed payment; no official tax receipt unless entitled |
| P1 | Implement monthly recurring-payment reconciliation ledger | CI validated on 0be884a; live migration/Stripe tests blocked | Idempotent monthly invoice record, retries and status sync tested |
| P1 | Newsletter provider opt-in/opt-out lifecycle | signed opt-out code/test CI green (46099291); sender blocked | HMAC-confirmed unsubscribe changes consent/status in REVERS; link must be included in real verified email provider delivery; sender and reactivation-confirmation remain pending |
| P1 | Private support-request admin operations | CI green (9a75362e); deployment/live authorization blocked | Signed TAKATAK session + server-only REVERS operator UUID delegation, private /admin/support and GET/PATCH API with optimistic updates; live operator and RLS tests still required |
| P1 | Verified father/family partner-resource directory | partial | Vet real partner names, locations and services, add links without fabricated availability |
| P2 | Unit tests for money and input validation | complete in CI 38617278856 | Node 22 `node:test` added, test step in CI/deploy; inspect latest CI outcome |
| P2 | Mobile/accessibility/performance/security checks | partial: bounded public requests and Node tests implemented; live validation pending | Automated and real-device evidence, no dead controls |
| P2 | Post-release operations and rollback drill | pending | Healthy exact SHA, rollback to known-good release, incident playbook |

Do not reorder around secrets by inventing values. Independently executable source tasks can advance while deployment awaits credentials.

Security follow-up: test invalid/expired TAKATAK sessions, replay after ten minutes, and internal worker authorization with a live authorized environment. The current code and CI cannot substitute for real integration tests.

Stripe initial Checkout webhook now validates the signed event's project, intent linkage, amount, currency, payment mode and session association before marking a donation paid. A separate recurring-invoice ledger remains a pending P1 requirement; do not claim successful renewal reconciliation yet.

MochaHost deployment safety: live `CURRENT` activation is atomic, and cleanup preserves both `CURRENT` and `PREVIOUS` release directories. Exercise rollback on an authorized staging/production instance before marking release handling fully verified.

Public-interface honesty: replaced the fake mobile download button with a real browser install prompt or device instructions, removed unverified workshop announcements and ad-slot placeholders, and removed the blocking welcome popup. Verify accessibility on actual browsers before calling the PWA fully supported.

Deployment safety added: **reject stale CI builds** whose SHA does not equal current `main` before touching SSH; require app root subdirectory. Verify CI and production after secrets are configured. Known DNS probe from this runner did not resolve `reverscanada.ca`.


## Additional independently completed work — 2026-10-15
- **Source complete / CI green:** status-change audit migration `20261015235500_support_status_audit.sql`, private RPC with atomic case transition and audit insertion, typed client, protected audit GET API, operator history interface. Verified [CI 38848287271](https://github.com/takatakca/revers-canada-hope/actions/runs/38848287271) for `98295aa1`.
- **P0 database dependency:** apply the audit migration *after* baseline REVERS schema and prior `20261015131500` and `20261015133000` migrations; confirm `anon` and `authenticated` have no table access or function EXECUTE privilege, `service_role` can transition and log once, and stale transitions return a conflict without history entry.
- **P1 pending:** operational cross-browser testing, audit retention policy, and authenticated role/entitlement improvements when TAKATAK supplies dedicated REVERS admin entitlement.
- **P0 hosting dependency:** [deployment 38848381314](https://github.com/takatakca/revers-canada-hope/actions/runs/38848381314) failed before upload with missing `MOCHAHOST_HOST`. Keep [issue #2](https://github.com/takatakca/revers-canada-hope/issues/2) open until real production health.


## TAKATAK delivery follow-up (2026-10-16)
- **Done (code + CI):** fail-closed persistence of `takatak_outbox` worker transitions, verified [CI 38942916738](https://github.com/takatakca/revers-canada-hope/actions/runs/38942916738) for `5fff67c33bcbe067149450409d7ecc76e8f67ccc`. No false `delivered` count on an unpersisted acknowledgement. Tests verify errors/null row and bounded retry delays.
- **P0 live verification still pending:** after REVERS Supabase and hosting access, enqueue a privacy-minimized test lead, trigger the signed worker, verify a single canonical `event_id` and exactly-once effect at TAKATAK under deliberate repeated delivery, then inspect REVERS `delivered` status and the failed-ack retry path.
- **P0 hosting:** [MochaHost 38943041446](https://github.com/takatakca/revers-canada-hope/actions/runs/38943041446) failed before transfer because GitHub `production` lacks `MOCHAHOST_HOST`. DNS for `reverscanada.ca` also failed from this run environment. Avoid repeated manual retries without credential/DNS changes. Maintain [issue #2](https://github.com/takatakca/revers-canada-hope/issues/2).


## Family resource-directory source — 2026-10-16
- **P1 partially completed:** official family mediation and shared-custody/Allocation famille information linked with bilingual text and no false partner claims. [CI 38943633417](https://github.com/takatakca/revers-canada-hope/actions/runs/38943633417) green on `48bf4f4534c8bd9b16faf22fe16419f02eda74d9`.
- **Next P1:** audit remaining claims, check external-link accessibility and accessibility UX on real mobile browsers; maintain stable sources and avoid implying REVERS partnerships. Continue vetting additional real support organizations before listing them.
- **P0 deployment:** [Deploy 38943739162](https://github.com/takatakca/revers-canada-hope/actions/runs/38943739162) triggered by CI; still requires terminal result and then release health SHA. GitHub `production` `MOCHAHOST_HOST`, operational REVERS Supabase and DNS remain unverified/blocking until proven otherwise.

**2026-10-29:** the owner's manual steps (keys, Stripe webhook, migrations, GitHub secrets, reseller account) are numbered in `docs/OWNER_ACTIONS.md` (O-09 → O-13); the agent's steps are C-08 → C-10.
