# ATLAS — Audit phase 6

Décision : **INCOMPLÈTE** dans le périmètre du prototype de quatre leçons.

Version testée SHA-256 : `d653fd6e13bf7eaf5f2056a5b3c88a1a6684f6a44ad6e690c72e4aef93748cec`. Navigateur : Chromium `154.0.8037.57`.

Conditions : HTML servi uniquement pour le harnais de test sur 127.0.0.1 ; réseau navigateur coupé après chargement. Ce résultat ne remplace pas la vérification file://, bloquée par la politique navigateur. Firefox non disponible.

Corrections : Vérification SHA-1 des objets ; avertissement de stockage.

| Test | Objet | Statut |
|---|---|---|
| P6-INVALID-1 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-2 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-3 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-4 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-5 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-6 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-7 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-8 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-9 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-10 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-11 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-12 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-13 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-14 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-15 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-16 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-17 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-18 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-19 | Import invalide refusé sans mutation | PASS |
| P6-INVALID-20 | Import invalide refusé sans mutation | PASS |
| P6-RESTORE-1 | Restauration valide répétée | PASS |
| P6-RESTORE-2 | Restauration valide répétée | PASS |
| P6-RESTORE-3 | Restauration valide répétée | PASS |
| P6-RESTORE-4 | Restauration valide répétée | PASS |
| P6-RESTORE-5 | Restauration valide répétée | PASS |
| P6-RESTORE-6 | Restauration valide répétée | PASS |
| P6-RESTORE-7 | Restauration valide répétée | PASS |
| P6-RESTORE-8 | Restauration valide répétée | PASS |
| P6-RESTORE-9 | Restauration valide répétée | PASS |
| P6-RESTORE-10 | Restauration valide répétée | PASS |
| P6-RELOAD | Persistance au rechargement | PASS |
| P6-NEGATIVE-OPS | Chemins, commandes et messages refusés | PASS |
| P6-CORRUPT-OBJECT | Objet Git corrompu rejeté sans mutation | PASS |
| P6-OBJECT-HASH | Objet compressé valide sous un hash falsifié | PASS |
| P6-REOPEN | Fermeture et réouverture d’un onglet | PASS |
| P6-STORAGE-FAILURE | Stockage refusé : avertissement visible et mémoire intacte | PASS |
| P6-INTERRUPTION | Interruption du processus navigateur et reprise | NOT RUN |

Détails reproductibles et observations : [registre](evidence/audit-register.json), [script](../tests/audit.mjs), [journal](evidence/test-run.log). Association aux exigences : [TRACEABILITY.md](TRACEABILITY.md).

Les PASS ne valent que pour les cas exécutés. Les tests automatiques ont été relancés après corrections. La grille pédagogique est une revue interne documentée, pas une mesure scientifique.
