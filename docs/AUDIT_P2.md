# ATLAS — Audit phase 2

Décision : **VALIDÉE** dans le périmètre du prototype de quatre leçons.

Version testée SHA-256 : `d653fd6e13bf7eaf5f2056a5b3c88a1a6684f6a44ad6e690c72e4aef93748cec`. Navigateur : Chromium `154.0.8037.57`.

Conditions : HTML servi uniquement pour le harnais de test sur 127.0.0.1 ; réseau navigateur coupé après chargement. Ce résultat ne remplace pas la vérification file://, bloquée par la politique navigateur. Firefox non disponible.

Corrections : Moteur réel et contrôles fonctionnels reconstruits.

| Test | Objet | Statut |
|---|---|---|
| P2-GIT-01 | Création des fichiers | PASS |
| P2-GIT-02 | Indexation | PASS |
| P2-GIT-03 | Séparation index et travail | PASS |
| P2-GIT-04 | Commit de la version indexée | PASS |
| P2-GIT-05 | Refus de changement de branche avec travail sale | PASS |
| P2-GIT-06 | Historique de deux commits | PASS |
| P2-GIT-07 | Changement de branche réel | PASS |
| P2-GIT-08 | Fusion divergente rejetée | PASS |
| P2-GIT-09 | Fusion fast-forward réelle | PASS |
| P2-GIT-10 | Suppression indexée | PASS |
| P2-GIT-11 | Commit vide rejeté | PASS |
| P2-UI | Parcours éditeur et contrôles principaux | PASS |
| P2-SIMULATION | Issues et PR locales | PASS |
| P2-EXPORT | Export JSON et réimport interface | PASS |
| P2-REPORT | Rapport IA et téléchargement | PASS |
| P2-TERMINAL | Terminal pris en charge | PASS |
| P2-UI-BRANCHES | Branches, fusion et suppression par boutons | PASS |
| P2-UI-RESTART | Recommencer avec confirmation | PASS |
| P2-UI-DISCLOSURES | Navigation et panneaux dépliables | PASS |
| P2-RESTORE-BUTTON | Sélection de sauvegarde | PASS |
| P2-TERMINAL-GRAMMAR | Toutes les commandes terminal documentées | PASS |

Détails reproductibles et observations : [registre](evidence/audit-register.json), [script](../tests/audit.mjs), [journal](evidence/test-run.log). Association aux exigences : [TRACEABILITY.md](TRACEABILITY.md).

Les PASS ne valent que pour les cas exécutés. Les tests automatiques ont été relancés après corrections. La grille pédagogique est une revue interne documentée, pas une mesure scientifique.
