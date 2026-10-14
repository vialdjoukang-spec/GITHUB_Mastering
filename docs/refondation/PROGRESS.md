# ATLAS — Suivi vérifiable de la refondation

Ce fichier distingue **écrit**, **testé** et **validé**. Une case [x] signifie qu'une réalisation vérifiée existe ; une ligne « en vérification » ne vaut pas validation. Les commits et les exécutions de CI servent de preuve.

## A — Mandat et architecture
- [x] A01 — Relire le mandat fondateur de 34 pages, identifier objectifs et contraintes (PLAN_MAITRE.md).
- [x] A02 — Auditer le prototype actuel et ses limites (PLAN_MAITRE.md).
- [x] A03 — Définir niveaux 0–5, lexique interactif et exigences de preuve (PLAN_MAITRE.md).
- [x] A04 — Isoler les travaux sur `codex/atlas-refondation-pedagogique-20261014`.

## B — Construction du socle
- [ ] B01 — Synchroniser les spécifications et règles communes d'agents (à faire).
- [ ] B02 — Comparer les outils candidats et décisions de dépendances (à faire).

## C — Parcours pédagogique
- [x] C01 — Catalogue niveaux / modules / chapitres / leçons : vérifié par P1-CATALOGUE (CI 38557184335).
- [x] C02 — Navigation active et distinction disponible/prévu : vérifiées par P1-CATALOGUE et tests Git historiques (CI 38557184335).

## D — Fenêtres interactives
- [ ] D01 — Lexique de 30 notions concrètes : codé dans `src/glossary.js`, revue de contenu à poursuivre.
- [ ] D02 — Fenêtres au clic et au clavier, retour du focus : vérifiés P1-LEXIQUE ; parcours tactiles spécifiques à compléter avant clôture.

## E — Laboratoire
- [ ] E01 — Laboratoire GitHub fidèle (dépôt local réel ; Issues et PR actuellement simulées) : à approfondir.
- [ ] E02 — Isolation des exercices, migration et restauration : à développer.

## F — Leçons
- [ ] F01 — Première chaîne pédagogique complète : 3 leçons N0 actives, intégration et épreuve en cours de vérification.
- [ ] F02 — Démonstrations rejouables, remédiation et exports : à approfondir.

## G — Évaluations
- [ ] G01 — Évaluer prédiction, diagnostic et explication causale, au-delà du quiz.
- [ ] G02 — Transfert réellement inédit : renforcer la situation initiale, ne pas seulement renommer les fichiers.
- [ ] G03 — Révision différée et remédiation personnalisée.

## H — Couverture
- [ ] H00 — Niveau 0 terminé (3 leçons de départ seulement).
- [ ] H01 — Niveau 1 terminé (4 exercices historiques ; contenu à approfondir).
- [ ] H02 — Niveau 2 terminé.
- [ ] H03 — Niveau 3 terminé.
- [ ] H04 — Niveau 4 terminé.
- [ ] H05 — Niveau 5 terminé.

## I — Audits et livraison
- [ ] I01 — Tests Git indépendants et contrôles négatifs sur le fichier de cette branche.
- [ ] I02 — Audit pédagogique/lexical systématique sur chaque terme.
- [x] I03 — Sur les contenus implémentés : Chromium 154 et Firefox 157 sous file://, mobile et sauvegarde/restauration vérifiés (CI 38557184335).
- [ ] I04 — Audit accessibilité et sécurité complet.
- [ ] J01 — Exercices GitHub distant autorisés et vérifiés.
- [ ] J02 — Construction du fichier définitif complet et preuves SHA (une préversion testée existe ; cursus complet non livré).
- [ ] J03 — Lien public de la préversion, puis validation utilisateur.

## Sécurité de la livraison
Pas de fusion automatique dans `main`. Aucun cours prévu n'est interactif, et aucun test non exécuté ne doit être compté réussi. Le site `main` reste le prototype antérieur pendant l'audit.

## Reçu vérifiable du premier lot — 14 octobre 2026

- **CI GitHub Actions** : [run 38557184335](https://github.com/vialdjoukang-spec/GITHUB_Mastering/actions/runs/38557184335), succès.
- **Tests du laboratoire** : 98 PASS, 0 FAIL ; notamment hiérarchie, lexique, trois leçons N0 positives/négatives, missions Git historiques, sauvegardes et accessibilité sur les vues testées.
- **Ouverture directe hors ligne** : Chromium 154.0.8037.0 et Firefox 157.0 PASS sous file://, dans l'environnement GitHub Actions Ubuntu.
- **Fichier de préversion** : `ATLAS.html` construit et synchronisé sur la branche par commit [c5d5ea8](https://github.com/vialdjoukang-spec/GITHUB_Mastering/commit/c5d5ea8c03bfad28754f60572eaf1cf233fd580c).
- **Audit médical ou diplôme professionnel** : sans objet ; la compétence experte en GitHub n'est pas certifiée par ces tests fonctionnels.
- **Reste ouvert** : revue humaine de toutes les définitions, essais tactiles ciblés, isolation des ateliers, vraie profondeur didactique, contenus des niveaux 2 à 5, validation utilisateur.
