# Owner actions — reverscanada.ca

Updated 2026-10-29. Hands-on checklist for the hosting move (MochaHost → Coolify). The main file for all sites is in Google Drive › 00 — Opérations TAKATAK: “2026-10-29 — TAKATAK hosting (MochaHost → Coolify) — MAIN FILE — OWNER and CLAUDE actions”. Item numbers are the same everywhere. No secret values are written here, only key names and where to find them.

**Labels**

- 🔧 OWNER — you do it by hand (accounts, keys, payments, approvals, merges, WHM)
- 🤖 CLAUDE — the agent does it; usually waits for an OWNER item
- ✅ DONE — finished and verified

## Where this site runs

- Website: https://reverscanada.ca (www redirects) — Coolify server vps2 (209.145.49.63), project REVERS CANADA, app `reverscanada`, auto-deploys `main`; `confirm-coolify.yml` checks every commit
- Supabase project: `cmcbsbjxrrwtmxvcsbsg`. `/readyz` is 503 until O-09 and O-11 are done
- DNS zone: MochaHost reseller account `reverscanada` until O-13, then bolonca (copy prepared). Mail stays at MochaHost
- MochaHost deploy (`deploy-mochahost.yml`) is opt-in only (REVERS_MOCHAHOST_DEPLOY)

## 🔧 OWNER — manual work

### O-01 · 🔧 OWNER · ⬜ TO DO — Merge the open pull requests
- ocarinaspa #3 (removes Lovable; it also contains #2, so #2 closes by itself)
- The notes/fix PRs opened on 2026-10-29: revers-canada-hope (header fix + notes), droneair (revision + health check + notes), mimtcaapp (notes), r2neet (notes)
- mimtcaapp #77 (from another agent: removes the old FTP uploads from the Deploy workflow)

### O-09 · 🔧 OWNER · ⬜ TO DO — Add the server keys in Coolify
- Where: Coolify → Projects → REVERS CANADA → production → reverscanada → Environment Variables → + Add. Turn “Available at Buildtime” OFF except for keys starting with VITE_. Save all, then Restart (or Redeploy if a VITE_ key changed).
- SUPABASE_SERVICE_ROLE_KEY — Supabase → project cmcbsbjxrrwtmxvcsbsg → Project Settings → API Keys
- STRIPE_SECRET_KEY — the REVERS Stripe account → Developers → API keys
- TAKATAK_REVERS_SERVICE_TOKEN, TAKATAK_REVERS_HMAC_SECRET — must match the REVERS settings on takatak.ca
- REVERS_SUPPORT_ADMIN_IDENTITY_IDS — TAKATAK user IDs allowed to read support requests, comma-separated
- REVERS_OUTBOX_WORKER_TOKEN — a long random value of your choice (same value in GitHub, O-12)
- Not needed: TAKATAK_API_BASE_URL / TAKATAK_EXPERIENCE_LAUNCH_URL (default https://takatak.ca)

### O-10 · 🔧 OWNER · ⬜ TO DO — Stripe webhook
- Endpoint https://reverscanada.ca/api/public/stripe-webhook → Signing secret into STRIPE_WEBHOOK_SECRET
- Events: checkout.session.completed, checkout.session.async_payment_succeeded, checkout.session.async_payment_failed, checkout.session.expired, payment_intent.payment_failed, invoice.payment_succeeded, invoice.payment_failed, customer.subscription.updated, customer.subscription.deleted

### O-11 · 🔧 OWNER · ⬜ TO DO — Run the pending database migrations
- Supabase → project cmcbsbjxrrwtmxvcsbsg → Database → Migrations: check which ones already ran
- SQL Editor, in this order, only the missing ones: 20261010060000_takatak_bridge.sql, 20261015131500_revers_recurring_invoices.sql, 20261015133000_lock_down_public_form_writes.sql, 20261015235500_support_status_audit.sql
- Then Restart the reverscanada app in Coolify
- *Waits on:* O-09

### O-12 · 🔧 OWNER · ⬜ TO DO — GitHub secrets and variable
- GitHub → takatakca/revers-canada-hope → Settings → Secrets and variables → Actions
- Secrets: REVERS_OUTBOX_WORKER_TOKEN (same value as Coolify), REVERS_PRODUCTION_URL = https://reverscanada.ca
- Variable REVERS_COOLIFY_ORIGIN = https://reverscanada.ca — only after Claude confirms /readyz is OK (C-09)
- *Waits on:* O-09, C-09

### O-13 · 🔧 OWNER · ⬜ TO DO — Back up, then remove the 4 reseller accounts in WHM
- First download each backup from that account's cPanel → File Manager → home folder: backup-10.26.2026_16-26-14_droneair.tar.gz, backup-10.26.2026_16-26-23_ocarinaspa.tar.gz, backup-10.26.2026_16-26-25_r2nette.tar.gz, backup-10.26.2026_16-26-25_reverscanada.tar.gz
- WHM (reseller takatakc) → Terminate Accounts — one at a time, only after that site works on Coolify
- r2nette can go first (website already on vps1; its 3 forwarders already exist in bolonca). Its mailboxes evaluation@ and recouvrement@ (~1.5 MB each) exist only in the backup.
- Tell Claude after each removal (C-10) — bolonca then holds the domain, its DNS and its mail
- *Waits on:* each site working (O-02…O-11)

### O-17 · 🔧 OWNER · ⬜ TO DO — Rotate every token shared in the chat
- bolonca cPanel API token, Coolify API token, reseller WHM token (takatakc), the 4 reseller cPanel tokens (droneair, ocarinaspa, r2nette, reverscanada), the new_server SSH key

## 🤖 CLAUDE — agent work

### C-02 · 🤖 CLAUDE · ✅ DONE — Header no longer wraps over the photo on laptops (PR opened 2026-10-29)
- Full menu from 1280 px, one line per item, soft dark fade behind the transparent header; measured at 1024–1920 px
- *Waits on:* O-01 (merge)

### C-08 · 🤖 CLAUDE · ⏳ WAITING — Test each site end to end after its keys are in
- Restart/redeploy, then forms, emails, Stripe test payment, /readyz; update the GitHub notes and this main file
- *Waits on:* O-02…O-11

### C-09 · 🤖 CLAUDE · ⏳ WAITING — Confirm https://reverscanada.ca/readyz returns 200
- Then you set REVERS_COOLIFY_ORIGIN (O-12)
- *Waits on:* O-09, O-11

### C-10 · 🤖 CLAUDE · ⏳ WAITING — After each reseller account removal: check bolonca's zone is the one served
- Compare the served SOA serial with bolonca's, re-save the zone if needed, check website + mail
- *Waits on:* O-13

### C-12 · 🤖 CLAUDE · 🔁 ONGOING — Keep the notes current
- docs/OWNER_ACTIONS.md in each repo and this main file

When you finish an OWNER item, tell the agent its number (for example “O-02 done”); the agent then does the CLAUDE items waiting on it and updates this file.
