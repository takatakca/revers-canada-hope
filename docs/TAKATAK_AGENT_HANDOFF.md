# TAKATAK agent handoff

## Current branch

`feat/github-takatak-migration`

## Completed

- Removed Lovable-only Vite/runtime integration.
- Switched the application build to portable TanStack Start + Nitro node-server.
- Added Node 22 and cPanel/Passenger release loader.
- Added `/healthz` and `/readyz`.
- Added direct GitHub CI and immutable MochaHost deployment workflow with rollback.
- Removed the unverified contact email/mailto fallback.
- Added server-side contact submission.
- Added TAKATAK experience launch/exchange adapter.
- Added signed HMAC outbox contract and worker.
- Added `revers_profiles` and `takatak_outbox` migrations.

## Current blockers

- The final REVERS production domain/callback is not hardcoded because it has not been confirmed in the repository.
- Production TAKATAK service and HMAC secrets must be installed through the approved secret manager.
- The MochaHost application root must be provided as the GitHub production secret `MOCHAHOST_APP_ROOT`.
- Production deployment remains unverified until the GitHub deployment workflow succeeds and both `/healthz` and `/readyz` return HTTP 200.

## Next agent

1. Run the GitHub CI workflow from the pull request.
2. Fix only evidence-backed typecheck/lint/build failures.
3. Review the generated route tree and Nitro output.
4. Apply Supabase migration in the correct environment.
5. Configure TAKATAK production secrets outside source control.
6. Configure the final REVERS callback URL in TAKATAK.
7. Verify the real TAKATAK launch → exchange → REVERS session flow.
8. Merge/deploy only after the production gates are satisfied.