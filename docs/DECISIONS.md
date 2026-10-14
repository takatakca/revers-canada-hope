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
