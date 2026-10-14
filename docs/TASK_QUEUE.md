# REVERS CANADA — Prioritized task queue

| Priority | Task | State | Evidence / acceptance |
| --- | --- | --- | --- |
| P0 | Gate deployment on successful CI SHA and check production SHA | in progress (this batch) | `workflow_run` on successful push, `/healthz.release` matches validated Git SHA, rollback on failure |
| P0 | Regenerate and commit a synchronized npm lockfile | pending (CI evidence) | `npm ci` fails with EUSAGE: missing Nitro/Supabase/Stripe packages and invalid transitive versions; regenerate with Node 22/npm 10, commit lockfile, restore `npm ci` |
| P0 | Configure MochaHost production environment secrets | blocked: human credentials | Set `MOCHAHOST_HOST` and other names in `docs/DEPLOYMENT.md` via GitHub UI, not git |
| P0 | Verify real database readiness health gate | code implemented; production pending | `/readyz` returns HTTP 200 only if configured and operational contacts-table query succeeds; test failure mode against correct REVERS instance |
| P0 | Verify DNS/TLS and actual MochaHost root | blocked: hosting access | Browser and curl checks show correct production health and version |
| P0 | Revoke direct anonymous Supabase table insertion grants | blocked: REVERS Supabase project not connected | Donation, contact and newsletter now save server-side; after confirming correct project, revoke anon/authenticated INSERT and update policies and verify negative RLS checks |
| P0 | Apply/verify Supabase migrations | blocked: project access/credentials | Migration history and service-role-only policies reviewed, no public cross-tenant data |
| P0 | Prove TAKATAK launch/exchange & entitlement | blocked: live integration secrets | Full real server exchange and a denied unauthorized user |
| P0 | Test Stripe webhook and recurring billing end to end | blocked: Stripe credentials | Signed event replay + renewal/cancel/failed payment; no official tax receipt unless entitled |
| P1 | Implement monthly recurring-payment reconciliation ledger | pending | Idempotent monthly invoice record, retries and status sync tested |
| P1 | Newsletter provider opt-in/opt-out lifecycle | pending | Consent and unsubscribe recorded, actual delivery verified |
| P1 | Private support-request admin operations | pending | Server-enforced TAKATAK entitlement and scoped permissions, no exposed case data |
| P1 | Verified father/family partner-resource directory | partial | Vet real partner names, locations and services, add links without fabricated availability |
| P2 | Mobile/accessibility/performance/security checks | pending | Automated and real-device evidence, no dead controls |
| P2 | Post-release operations and rollback drill | pending | Healthy exact SHA, rollback to known-good release, incident playbook |

Do not reorder around secrets by inventing values. Independently executable source tasks can advance while deployment awaits credentials.

Security follow-up: test invalid/expired TAKATAK sessions, replay after ten minutes, and internal worker authorization with a live authorized environment. The current code and CI cannot substitute for real integration tests.

Stripe initial Checkout webhook now validates the signed event's project, intent linkage, amount, currency, payment mode and session association before marking a donation paid. A separate recurring-invoice ledger remains a pending P1 requirement; do not claim successful renewal reconciliation yet.
