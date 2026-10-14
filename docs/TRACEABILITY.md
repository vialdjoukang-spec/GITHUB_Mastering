# Traçabilité exigences → essais et preuves

Les identifiants de gauche correspondent aux protocoles de ACCEPTANCE_CRITERIA.md. Les essais détaillés portent des suffixes explicites dans evidence/audit-register.json. Les lignes groupées partagent plusieurs preuves ; elles ne remplacent pas les critères individuels.

| Exigences | Essais / preuves | Limite ou conclusion |
|---|---|---|
| P1-01 | P1-DEPENDENCIES, DEPENDENCIES.md, bundle-inputs.json | Inventaire intégré et dépendances de développement |
| P1-02 à P1-05 | P1-BOOT, P1-GIT, P7-ERRORS, P7-NETWORK, P2-GIT-01 à 11 | Aucun appel distant pendant les scénarios ; objets vérifiés par Git CLI |
| P1-06 | P1-SECURITY, npm-audit.json | 0 vulnérabilité critique connue signalée à la date du contrôle |
| P1-07 à P1-08 | P1-FILE-CHROMIUM, P1-FIREFOX | BLOCKED pour la validation directe file:// ; fonctionnement réseau coupé testé après chargement HTTP local |
| P2-01 à P2-03, P2-07 à P2-08 | INTERACTIONS.md ; P2-UI*, P2-SIMULATION, P2-REPORT, P2-TERMINAL* | Périmètre des contrôles du prototype |
| P2-04 à P2-05 | P2-GIT-01 à 11 ; evidence/git-*.json | 11 scénarios avec états indépendamment vérifiés |
| P2-06 | P2-EXPORT et P6-RESTORE-1 à 10 | Export navigateur et import avec comparaison Git |
| P3-01 à P3-09 | P3-STRUCTURE ; P3-REVIEW-1 à 4 ; PEDAGOGY_REVIEW.md | Grille interne sur quatre leçons ; pas de mesure empirique |
| P4-01 à P4-05, P4-07 à P4-08 | P4-*-NEG-*, P4-POSITIVE, P4-FORGED-BADGES ; PEDAGOGY_REVIEW.md | 20 états négatifs, quatre positifs et badges recalculés ; explications libres non certifiées |
| P4-06 | P4-TRANSFER-UNSEEN | FAIL : transfert annoncé, pas inédit |
| P5-01 à P5-04, P5-06 à P5-08, P5-10 | P5-dark-* et P5-light-*, captures, axe, P2-UI* | Contrastes/noms/largeurs sur les vues testées ; pas garantie de tous les états |
| P5-05 et P5-09 | P5-KEYBOARD, P5-MOBILE-ACTION, P5-KEYBOARD-EXHAUSTIVE, P5-MOBILE-ALL | Couverture totale NOT RUN |
| P6-01 à P6-03, P6-05 à P6-08 | P6-INVALID-1 à 20, P6-RESTORE-1 à 10, P6-CORRUPT-OBJECT, P6-OBJECT-HASH, P6-NEGATIVE-OPS ; P7-REGRESSION | Cas exécutés PASS |
| P6-04 | P6-RELOAD, P6-REOPEN, P6-STORAGE-FAILURE, P6-INTERRUPTION | Aucune perte silencieuse observée ; arrêt brutal non testé |
| P7-01 à P7-04 | P7-PHASE-GATE, P7-REGRESSION | Validation globale refusée tant que les critères ouverts persistent |
| P7-05 | SPEC.md, CURRICULUM.md, STATE.md, README.md | Documentation limitée aux fonctions livrées |
| P7-06 à P7-08 | P7-FINAL-FILE, P7-NETWORK, P7-REGRESSION | file:// bloqué ; export/restauration réussis dans le contexte testé |
| P7-09 | audit-register.json, results.json, SHA256SUMS, rapports | Preuves présentes ; validation exhaustive incomplète |
