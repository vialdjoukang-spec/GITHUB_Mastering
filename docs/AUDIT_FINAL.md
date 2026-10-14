# ATLAS — Audit final de reconstruction

**Prototype livré, ATLAS globalement NON VALIDÉ selon la matrice complète.** Quatre leçons et un vrai laboratoire Git ; programme avancé non implémenté.

| Phase | Tests prévus | PASS | FAIL | BLOCKED | NOT RUN | Taux | Corrections | Décision |
|---|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 6 | 4 | 0 | 2 | 0 | 66.7 % | Buffer et chemins mémoire ; licences intégrées | INCOMPLÈTE |
| 2 | 21 | 21 | 0 | 0 | 0 | 100.0 % | Moteur réel et contrôles fonctionnels reconstruits | VALIDÉE |
| 3 | 5 | 5 | 0 | 0 | 0 | 100.0 % | Définitions précoces d’index, commit, arbre et parent | VALIDÉE |
| 4 | 23 | 22 | 1 | 0 | 0 | 95.7 % | Badges importés recalculés ; contrôles Git | NON VALIDÉE |
| 5 | 14 | 12 | 0 | 0 | 2 | 85.7 % | Défilement accessible au clavier ; avis sans superposition | INCOMPLÈTE |
| 6 | 37 | 36 | 0 | 0 | 1 | 97.3 % | Vérification SHA-1 des objets ; avertissement de stockage | INCOMPLÈTE |
| 7 | 6 | 4 | 1 | 1 | 0 | 66.7 % | Régression complète sur le hash final | NON VALIDÉE |

Taux = PASS / tests prévus, y compris BLOCKED et NOT RUN. Les comptes incluent les contrôles éditoriaux et documentaires explicitement identifiés.

## Fichier livré
`ATLAS.html` — 360459 octets.

SHA-256 : `d653fd6e13bf7eaf5f2056a5b3c88a1a6684f6a44ad6e690c72e4aef93748cec`. Le fichier n’a pas été modifié après la dernière suite.

## Anomalies et limites résiduelles
- ENV-FILE : Chromium refuse file:// avec ERR_BLOCKED_BY_ADMINISTRATOR. Firefox absent et installation refusée HTTP 403 ; aucune compatibilité file:// déclarée validée.
- PED-TRANSFER : transfert guidé annoncé, pas encore mission inédite cumulative ; critère majeur de phase 4 échoué.
- QA-KEYBOARD/MOBILE : essais partiels réussis ; couverture exhaustive des parcours clavier et tactiles à compléter.
- QA-INTERRUPT : rechargement, réouverture d’onglet, stockage refusé et restaurations testés ; arrêt brutal du navigateur à tester.
- Produit : fusion rapide seulement ; pas de gestion de conflits/rebase, pas de connexion GitHub/IA ; Issues et PR locales simulées.

## Preuves et reproduction
`npm ci`, `npm run build`, `npm test` (Node et Git CLI, Chromium /usr/bin/chromium).

- [Registre complet](evidence/audit-register.json) : identifiants, conditions, étapes, attendu/observé, statuts, environnement et hash.
- [Résultats navigateur](evidence/results.json), [journal](evidence/test-run.log), [captures](evidence/screenshots/), [état avant correction](evidence/before/).
- [Traçabilité](TRACEABILITY.md), [dépendances](DEPENDENCIES.md), [relecture pédagogique](PEDAGOGY_REVIEW.md).
- [Phase 1](AUDIT_P1.md), [phase 2](AUDIT_P2.md), [phase 3](AUDIT_P3.md), [phase 4](AUDIT_P4.md), [phase 5](AUDIT_P5.md), [phase 6](AUDIT_P6.md).
- [Plan d’extension](EXTENSION_PLAN.md).

Les anciennes preuves d’absence du produit sont conservées comme historique et exclues des comptes actuels.
