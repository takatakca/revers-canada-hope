# REVERS CANADA — reverscanada.ca

RêvPÈRE is the Montréal community program supporting fathers and families through employment, digital independence and referrals. Other REVERS CANADA initiatives address housing, food and international in-kind support.

## Stack
React / TanStack Start / TypeScript / Tailwind / Nitro Node.js 22 / Supabase / Stripe / TAKATAK experience bridge.

## Contributing
Read [AGENTS.md](AGENTS.md), [WORKLOG.md](WORKLOG.md), [current agent handoff](docs/AGENT_HANDOFF.md), [task queue](docs/TASK_QUEUE.md), [project status](docs/PROJECT_STATUS.md), and [architectural decisions](docs/DECISIONS.md) before work. `npm install` and `npm run dev` start local development. GitHub CI performs migration verification, typecheck, lint, `npm run test` and build.

## Deployment
[MochaHost deployment](docs/GITHUB_TAKATAK_DEPLOYMENT.md) builds in GitHub Actions, uploads an immutable release, and restarts Passenger; there is no server-side build. The owner confirmed `reverscanada.ca` as target on 2026-10-14; production DNS/TLS and deployment are not yet verified. The deployment run failed before upload because the GitHub production secret `MOCHAHOST_HOST` was missing. Configure the remaining required GitHub and cPanel runtime secrets before activating payment or TAKATAK integrations.

## Safety
Newsletter requests require explicit opt-in and a successful backend insert. Stripe Checkout handles one-time and monthly subscription payments when configured; the signed webhook only records payment upon Stripe confirmation. A Checkout success page is not an official tax receipt.
