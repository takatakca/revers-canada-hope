- 2026-10-14 | ChatGPT/GitHub agent | main → direct commit | done; prod blocked | Father-focused contact triage topics and sensitive-family-information warning (FR/EN) | CI, secure operational routing, production secrets
- 2026-10-14 | ChatGPT/GitHub agent | main → direct commit | done; prod blocked | Correct backend-unavailable contact feedback and donation amount safety | CI then production secrets/DNS/Stripe setup
- 2026-10-14 | ChatGPT/GitHub agent | main → direct commit | done; prod blocked | Stripe idempotency for donation intents and async payment failure reconciliation | CI, deploy secrets and signed Stripe webhook configuration
- 2026-10-14 | ChatGPT/GitHub agent | main → direct commit | done; prod blocked | Server-verified Stripe payment status on donation confirmation page, privacy-minimized response | CI and MochaHost deployment pending secret setup
- 2026-10-14 | ChatGPT/GitHub agent | main → direct commit | done; prod blocked | Searchable bilingual resource directory and verified external reference links (211, JuridiQC) | CI; add verified partner organization inventory later
- 2026-10-14 | ChatGPT/GitHub agent | main → direct commit | done; prod blocked | Bilingual privacy cleanup, legacy GAR noindex, remove dead social links, publish sitemap/robots and document Stripe/webhook setup | CI then configure missing MOCHAHOST_HOST secret
- 2026-10-14 | ChatGPT/GitHub agent | main → direct commit | done; production unverified | Correct RêvPÈRE SEO, require durable newsletter opt-in, prevent false donation success, implement recurring Stripe Checkout with paid-only webhook handling, update production-domain handoff | GitHub CI and deployment checks; configure DNS/TLS/secrets, review Stripe recurring reconciliation
- 2026-10-10 | ChatGPT/GitHub agent | feat/github-takatak-migration → PR #1 | TESTED / CI IN PROGRESS | Removed provider-coupled build/auth paths, kept Node/Nitro + MochaHost deployment, fixed route-tree/server-only/typecheck gates | wait for lint/build; owner merges PR #1 only after CI is green
# Work log

Newest first, one line per piece of work. Rule: `AGENTS.md` › Work log rule.
Format: `YYYY-MM-DD | agent | branch → PR | status | what | next step`

- 2026-10-10 | ChatGPT/GitHub agent | feat/github-takatak-migration → PR pending | active | Disconnect REVERS from Lovable, migrate deployment/build to direct GitHub + Cloudflare, and establish TAKATAK integration boundary | implement adapter, remove Lovable-only code, add CI/deploy, validate and open PR
- 2026-10-08 | claude (owner setup) | default branch | done | Added the work log rule, this log and the stop reminder | every agent follows AGENTS.md › Work log rule
