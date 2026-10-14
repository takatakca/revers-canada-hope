# TAKATAK bridge — historical handoff

The GitHub migration PR #1 merged on 2026-10-10. This document is retained as a pointer to the original migration decisions.

**Current universal agent handoff:** [AGENT_HANDOFF.md](AGENT_HANDOFF.md)  
**Current task queue:** [TASK_QUEUE.md](TASK_QUEUE.md)  
**Production deployment:** [DEPLOYMENT.md](DEPLOYMENT.md)  
**TAKATAK contract:** [TAKATAK_INTEGRATION.md](TAKATAK_INTEGRATION.md)

TAKATAK remains the identity and entitlement authority; REVERS is an independent product. `reverscanada.ca` is owner-confirmed as target domain, but live callbacks, secrets, DNS/TLS and production health remain unverified. Never mark integration CONNECTED without a successful real server-side exchange. The migration and deployment workflow are source-complete only, not production verified.
