# ATLAS — GitHub Mastery Lab
Prototype reconstruit : quatre leçons en français, vrai moteur Git local (isomorphic-git), éditeur, index/commits/branches/fusions fast-forward, terminal limité, Issues/PR simulées, sauvegardes JSON et rapport IA local.

Télécharger `ATLAS.html`, puis l’ouvrir dans un navigateur. Aucun CDN ni serveur n’est appelé par le produit. La compatibilité directe file:// reste à vérifier hors de l’environnement géré : sa politique Chromium refuse cette navigation et Firefox n’a pas pu être installé. Les tests exécutés emploient un serveur de test local, réseau du navigateur ensuite désactivé.

## Développement et reproduction
Node.js et Git CLI nécessaires aux tests :
```
npm ci
npm run build
npm test
```
La suite suppose Chromium à `/usr/bin/chromium`. Les rapports et limites sont dans `docs/AUDIT_FINAL.md`. Les sources sont dans `src/` ; le HTML est généré, ne pas le modifier directement.

Les données restent dans le navigateur ; téléchargez régulièrement une sauvegarde. Le stockage file:// varie selon le navigateur et l’emplacement du fichier. Aucun appel IA, GitHub ou serveur externe n’est effectué. Les badges ne certifient pas une expertise. Parcours expert : plan d’extension, pas contenu livré.
