# REVERS CANADA — Architecture decisions

| Date | Decision | Reason | Implication |
| --- | --- | --- | --- |
| 2026-10-10 | Preserve existing TanStack Start + Nitro Node app, remove Lovable runtime coupling | Own build/release lifecycle from GitHub | GitHub builds immutable `.output` on Node 22; cPanel/Passenger launches it |
| 2026-10-10 | TAKATAK holds master identity and entitlements; REVERS owns product operations | Strict service and tenant boundaries | REVERS never becomes a parallel master CRM and never accesses TAKATAK DB directly |
| 2026-10-10 | REVERS keeps data in operational Supabase with server-only sensitive access | Ensure data separation | Never expose service-role key to Vite/public bundles |
| 2026-10-14 | `reverscanada.ca` is the intended canonical production domain | Owner confirmed target | Require DNS/TLS proof and exact-release health check before calling site live |
| 2026-10-14 | Contact and newsletter must confirm server persistence | Local browser storage is not delivery | Show an honest error instead of fake success |
| 2026-10-14 | Payments are authoritative only after Stripe confirmation | Avoid false donation/tax receipt statements | Monthly checkout uses Stripe subscription; reconciliation remains a P0/P1 task |
| 2026-10-14 | Deployment follows successful CI on the exact commit | Avoid publishing unvalidated SHA | `workflow_run` success-only gate, SHA-aware /healthz, no force-push |
| 2026-10-14 | Keep public REVERS identity visually independent from TAKATAK dashboard | Separate product audience and entitlements | Shared services invisible until needed; no automatic cross-product menu |

| 2026-10-14 | Cap signed REVERS product sessions to 10 minutes and reject invalid/expired TAKATAK expiry | Prevent replay even if browser cookie expiry is bypassed | Session signing key must be at least 32 characters; exchange remains TAKATAK-authoritative |
| 2026-10-14 | Use constant-time worker token comparison and generic public errors | Reduce secret-timing and error-disclosure risk | Worker token should have at least 32 bytes; operational failures logged only server-side |

| 2026-10-14 | Fail closed when a CI-validated SHA is no longer current `main` | Avoid delayed workflow_run deployments reverting the active release | No automatic force push or stale publication; fresh CI required on latest head |

| 2026-10-15 | Record monthly Stripe charges by immutable invoice ID in REVERS-only private table | Signed Stripe invoice webhooks may retry or arrive out of order; checkout success alone covers only first payment | Unique `stripe_invoice_id`; paid-wins upsert; failed-only insert; separate subscription lifecycle from initial paid donation; migration awaits correct Supabase access |

| 2026-10-15 | Remove public database writes for REVERS contact, newsletter and donation intents | These operations now persist using server-only service credentials; unrestricted public DML is unnecessary exposure | Apply `20261015133000_lock_down_public_form_writes.sql` on correct REVERS project only and confirm anonymous negative permission tests |

| 2026-10-15 | Support cases are administered by signed TAKATAK identities with an explicit server-only REVERS operator UUID delegation | `revers_access` is only a general product entitlement; it cannot alone authorize reading private family-support messages | Fail closed with empty allowlist, never create secondary identity accounts or trust browser role flags; replace delegation with a verified TAKATAK administration entitlement when supported |
