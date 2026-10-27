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

| 2026-10-15 | Newsletter opt-out uses a 32+ character server-only HMAC secret and opaque subscriber UUID | Avoid an email-in-URL token, unauthenticated address-based revocation and automatic link-scan unsubscribes | Explicit POST required, fail-closed without secret, durable status/consent update, manual provider wiring and stable key management required |

| 2026-10-15 | Audit support-case status changes atomically with an authorized TAKATAK operator identity in REVERS-only Postgres | Family support requests need accountability; a two-request update and log can drift on partial failures | `SECURITY INVOKER` RPC executes only as server-side `service_role`, private RLS audit table, least-privilege immutable history in support UI; requires migration and real database tests before release |

| 2026-10-16 | Fail closed on any unpersisted REVERS→TAKATAK outbox state change | Supabase write APIs return `error` without throwing; an HTTP 2xx from TAKATAK is not proof of durable local delivery | Check recovery and claims, require matching-row `processing → delivered/retrying/failed` updates, emit worker failure if retry itself cannot persist; accept at-least-once retransmission with same `event_id` for idempotency |

| 2026-10-16 | Resource directory links only verified official guidance, without claiming partner affiliation | Families navigating mediation/shared custody need trustworthy navigation, not fabricated service availability | External links to Gouvernement du Québec, Retraite Québec, 211 and JuridiQC; bilingual descriptions, independence/eligibility notice, regression tests; real browser QA pending |

| 2026-10-26 | Prepare a Coolify preview of `main` while the live MochaHost site stays unchanged | `deploy-mochahost.yml` cannot upload (no MochaHost secrets) and the live site is an older build; the owner wants to approve the release before the domain moves | Preview `reverscanada-preview` on vps2 auto-builds `main` with public values only; DNS untouched; release requires server secrets, migrations and owner approval, and only the website A records move (mail stays at MochaHost) |

| 2026-10-27 | Make MochaHost publication opt-in and verify the Coolify build after each CI-validated push | The MochaHost secrets were never configured, so every push failed; the reseller account is being retired and Coolify already builds `main` | `REVERS_MOCHAHOST_DEPLOY=true` re-enables automatic MochaHost runs; `confirm-coolify.yml` requires `/healthz.release` = CI SHA (`SOURCE_COMMIT` on Coolify), and `/readyz` 200 once the origin is the production domain |
