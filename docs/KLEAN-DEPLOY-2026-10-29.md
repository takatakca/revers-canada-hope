# KLEAN — Note déploiement reverscanada.ca — 2026-10-29

Note AVANT / PENDANT / APRÈS, signée KLEAN. Version complète dans Google Drive, dossier « 00 — Opérations TAKATAK » : « KLEAN — Déploiement 3/10 : reverscanada.ca + drone-air.ca — 2026-10-29 ». Aucun secret dans ce document.

## AVANT
- Main : e7808f3. Cible Coolify déclarée : app `reverscanada`, vps2, domaine reverscanada.ca, mail chez MochaHost. Health : /healthz (release SHA) et /readyz.
- PR ouvertes : #6 (header + hero), #7 (header + OWNER_ACTIONS), #8 (note vague), #9 (port hero 1 ligne, base = branche #7). Issue #2 ouverte (P0 accès production).
- Blocage GitHub 429 vers 17:16 EDT : pause stricte, aucune rafale, levé après ~120 s.

## PENDANT (autorisation client 17:14 EDT : merger les PR prêtes, repos clients)
- #7 vérifiée fichier par fichier (8 fichiers, SiteHeader.tsx inclus, index.tsx inchangé) ; quality success, mergeable clean → MERGÉE 17:28 EDT, main 51f9c47.
- #9 vérifiée (1 fichier : src/routes/index.tsx) ; re-ciblée sur main 51f9c47 (sinon elle aurait atterri sur la branche #7, pas sur main) ; quality success, mergeable clean → MERGÉE, main 91c6618.
- #6 fermée comme remplacée par #7 + #9 (chevauchement SiteHeader confirmé ; correctif hero préservé par #9). #6 n'a jamais été mergée.
- #8 laissée ouverte, non touchée.

## APRÈS — état en ligne avec preuve (17:41 EDT)
- https://reverscanada.ca/healthz : {"ok":true,"service":"revers-canada-web","release":"91c6618bd38e1c175e686367169024d2615f7ed9"} — le SHA servi = le nouveau main. Auto-déploiement Coolify EFFECTIF (prouvé par health, pas par le panneau Coolify, auquel KLEAN n'a pas accès).
- /readyz : HTTP 503 observé — cohérent avec les étapes propriétaire O-09/O-11 restantes, pas un échec de déploiement.

## Checklist propriétaire restante
1. O-09 → O-12 de docs/OWNER_ACTIONS.md, puis O-13 (retrait revendeur MochaHost après sauvegarde).
2. Secrets runtime restants dans Coolify (noms dans docs/DEPLOYMENT.md), redémarrage.
3. Migrations Supabase projet revers, webhooks Stripe, vérification /readyz = 200.
4. Issue #2 reste ouverte jusqu'à ces vérifications.

Signé : KLEAN — agent déploiement 3/10, 2026-10-29.
