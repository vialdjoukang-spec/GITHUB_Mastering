# ATLAS — Audit phase 1

Décision : **INCOMPLÈTE** dans le périmètre du prototype de quatre leçons.

Version testée SHA-256 : `d653fd6e13bf7eaf5f2056a5b3c88a1a6684f6a44ad6e690c72e4aef93748cec`. Navigateur : Chromium `154.0.8037.57`.

Conditions : HTML servi uniquement pour le harnais de test sur 127.0.0.1 ; réseau navigateur coupé après chargement. Ce résultat ne remplace pas la vérification file://, bloquée par la politique navigateur. Firefox non disponible.

Corrections : Buffer et chemins mémoire ; licences intégrées.

| Test | Objet | Statut |
|---|---|---|
| P1-FILE-CHROMIUM | Ouverture file:// Chromium | BLOCKED |
| P1-FIREFOX | Firefox file:// hors ligne | BLOCKED |
| P1-BOOT | Initialisation et ressources intégrées | PASS |
| P1-GIT | Objets Git authentiques hors ligne | PASS |
| P1-DEPENDENCIES | Inventaire des dépendances intégrées | PASS |
| P1-SECURITY | Aucune vulnérabilité critique connue signalée par npm audit | PASS |

Détails reproductibles et observations : [registre](evidence/audit-register.json), [script](../tests/audit.mjs), [journal](evidence/test-run.log). Association aux exigences : [TRACEABILITY.md](TRACEABILITY.md).

Les PASS ne valent que pour les cas exécutés. Les tests automatiques ont été relancés après corrections. La grille pédagogique est une revue interne documentée, pas une mesure scientifique.
