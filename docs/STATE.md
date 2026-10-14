# ATLAS — État de reprise

- **Branche** : `codex/atlas-refondation-pedagogique-20261014` (préversion expérimentale ; `main` inchangé).
- **Mandat** : `docs/refondation/PLAN_MAITRE.md` ; **avancement** : `docs/refondation/PROGRESS.md`.
- **Implémentation courante de cette branche** : catalogue hiérarchique des niveaux 0–5 dans `src/curriculum.js` ; 3 leçons pratiques du niveau zéro ; 4 anciennes missions Git du niveau 1 ; lexique interactif de 30 notions dans `src/glossary.js` ; fenêtres natives avec retour du focus ; sauvegarde rétrocompatible ; tests supplémentaires.
- **Statuts** : N0/N1 partiels ; N2–N5 prévus et explicitement inactifs. Pas d'intégration distante réelle, pas de simulation présentée comme authentique.
- **Construction** : `npm ci && npm run build && npm test && node tests/local_open.mjs` ; workflow de branche `atlas-local-audit.yml`.
- **Validation du premier lot** : GitHub Actions [38557184335](https://github.com/vialdjoukang-spec/GITHUB_Mastering/actions/runs/38557184335) = 98/98 tests principaux, puis ouverture directe file:// Chromium 154 et Firefox 157 réussie. Source et HTML synchronisés au commit c5d5ea8. Les changements documentaires ultérieurs n'ajoutent pas de fonctions.
- **Prochaines tâches** : supprimer toute régression détectée, synchroniser ATLAS.html après réussite de la CI, reprendre l'isolation des exercices, ajouter démonstrations et renforcements pédagogiques.
