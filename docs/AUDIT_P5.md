# ATLAS — Audit phase 5

Décision : **INCOMPLÈTE** dans le périmètre du prototype de quatre leçons.

Version testée SHA-256 : `d653fd6e13bf7eaf5f2056a5b3c88a1a6684f6a44ad6e690c72e4aef93748cec`. Navigateur : Chromium `154.0.8037.57`.

Conditions : HTML servi uniquement pour le harnais de test sur 127.0.0.1 ; réseau navigateur coupé après chargement. Ce résultat ne remplace pas la vérification file://, bloquée par la politique navigateur. Firefox non disponible.

Corrections : Défilement accessible au clavier ; avis sans superposition.

| Test | Objet | Statut |
|---|---|---|
| P5-dark-360 | Responsive, noms et contrastes | PASS |
| P5-dark-390 | Responsive, noms et contrastes | PASS |
| P5-dark-768 | Responsive, noms et contrastes | PASS |
| P5-dark-1024 | Responsive, noms et contrastes | PASS |
| P5-dark-1440 | Responsive, noms et contrastes | PASS |
| P5-light-360 | Responsive, noms et contrastes | PASS |
| P5-light-390 | Responsive, noms et contrastes | PASS |
| P5-light-768 | Responsive, noms et contrastes | PASS |
| P5-light-1024 | Responsive, noms et contrastes | PASS |
| P5-light-1440 | Responsive, noms et contrastes | PASS |
| P5-MOBILE-ACTION | Écriture, indexation et commit à 360 px | PASS |
| P5-KEYBOARD | Clavier et dialogue | PASS |
| P5-KEYBOARD-EXHAUSTIVE | Parcours clavier de 100 % des contrôles et états | NOT RUN |
| P5-MOBILE-ALL | Tous les parcours essentiels tactiles sur mobile | NOT RUN |

Détails reproductibles et observations : [registre](evidence/audit-register.json), [script](../tests/audit.mjs), [journal](evidence/test-run.log). Association aux exigences : [TRACEABILITY.md](TRACEABILITY.md).

Les PASS ne valent que pour les cas exécutés. Les tests automatiques ont été relancés après corrections. La grille pédagogique est une revue interne documentée, pas une mesure scientifique.
