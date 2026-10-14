# REVERS CANADA — Prioritized task queue

| Priority | Task | State | Evidence / acceptance |
| --- | --- | --- | --- |
| P0 | Gate deployment on successful CI SHA and check production SHA | in progress (this batch) | `workflow_run` on successful push, `/healthz.release` matches validated Git SHA, rollback on failure |
| P0 | Configure MochaHost production environment secrets | blocked: human credentials | Set `MOCHAHOST_HOST` and other names in `docs/DEPLOYMENT.md` via GitHub UI, not git |
| P0 | Verify DNS/TLS and actual MochaHost root | blocked: hosting access | Browser and curl checks show correct production health and version |
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
