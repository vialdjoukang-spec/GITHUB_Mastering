# ATLAS — règles de contribution

Lire dans l'ordre : docs/refondation/PLAN_MAITRE.md, docs/refondation/PROGRESS.md, docs/SPEC.md, docs/STATE.md ; ensuite seulement les sources concernées.

- Un seul produit : src/ -> npm run build -> ATLAS.html, ouverture locale file:// sans CDN ni réseau obligatoire.
- Thème **exclusivement clair**, contraste élevé et lisibilité mobile. Ne jamais ajouter de thème sombre.
- Niveau, module, chapitre, leçon, exercice : utiliser src/curriculum.js comme source des noms/statuts, sans annoncer comme actif un chapitre prévu.
- Chaque terme technique nécessaire doit être défini concrètement dans src/glossary.js et rendu interactif dans la leçon ; aucun terme ne mène à une fenêtre vide.
- Git local authentique via isomorphic-git ; les fonctionnalités GitHub distantes restent simulées et explicitement étiquetées. Jamais de validation pédagogique sur un simple clic.
- Garder les sauvegardes compatibles, les données privées locales et les exports volontaires. Ne jamais exporter de secrets.
- Lancer build, tests fonctionnels, négatifs, file:// Chromium/Firefox et audit d'accessibilité. Ne cocher une tâche qu'après preuve portant sur la version finale de la branche.
- Ne pas fusionner dans main avant une revue des changements et des résultats. Mettre à jour PROGRESS.md et STATE.md à chaque lot.
