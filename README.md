# ATLAS — GitHub Mastery Lab
Prototype reconstruit : quatre leçons en français, vrai moteur Git local (isomorphic-git), éditeur, index/commits/branches/fusions fast-forward, terminal limité, Issues/PR simulées, sauvegardes JSON et rapport IA local.

Télécharger `ATLAS.html`, puis l’ouvrir dans un navigateur. Aucun CDN ni serveur n’est appelé par le produit. Les tests de livraison du 14 octobre 2026 ont confirmé l’ouverture directe file:// sous Chromium 154 et Firefox 157 sur les runners Ubuntu GitHub Actions. La compatibilité sur chaque PC utilisateur reste à confirmer ; la suite principale teste également un serveur de test local hors ligne.

## Développement et reproduction
Node.js et Git CLI nécessaires aux tests :
```
npm ci
npm run build
npm test
```
La suite suppose Chromium à `/usr/bin/chromium`. Les rapports et limites sont dans `docs/AUDIT_FINAL.md`. Les sources sont dans `src/` ; le HTML est généré, ne pas le modifier directement.

Les données restent dans le navigateur ; téléchargez régulièrement une sauvegarde. Le stockage file:// varie selon le navigateur et l’emplacement du fichier. Aucun appel IA, GitHub ou serveur externe n’est effectué. Les badges ne certifient pas une expertise. Parcours expert : plan d’extension, pas contenu livré.

## Ouvrir immédiatement
- [ATLAS — prévisualisation HTML (raw.githack)](https://raw.githack.com/vialdjoukang-spec/GITHUB_Mastering/main/ATLAS.html) : service tiers, première ouverture susceptible d'afficher une confirmation de sécurité.
- [ATLAS.html — fichier source téléchargeable](https://raw.githubusercontent.com/vialdjoukang-spec/GITHUB_Mastering/main/ATLAS.html) : enregistrez sous `ATLAS.html`, puis ouvrez-le localement.
- [Résultats des contrôles](https://github.com/vialdjoukang-spec/GITHUB_Mastering/actions/runs/38543465176) : 94 tests du laboratoire réussis, ouvertures file:// Chromium et Firefox réussies.

**Statut : PROTOTYPE fonctionnel, quatre leçons.** La formation GitHub professionnelle complète (Codex, Claude Code, conflits/rebase, CI, sécurité) n'est pas encore implémentée. GitHub Pages attend son activation dans Settings > Pages avant la première publication automatique.
