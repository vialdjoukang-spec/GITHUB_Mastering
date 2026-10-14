# ATLAS — protocole de livraison locale

## État
Branche candidate : `codex/atlas-local-release-20261014`. Publication dans `main` interdite avant vérification des preuves.
L'interface de cette candidate est uniquement claire.

## Construction et contrôles
Sur un poste équipé de Node.js 22, Git et Chromium :
```bash
npm ci
npx playwright install --with-deps chromium
npm run build
npm test
```
Le fichier généré est `ATLAS.html`. Il contient les bibliothèques intégrées ; il n'exige pas de compte GitHub ni de serveur applicatif. Les tests automatisés utilisent un serveur local pour plusieurs scénarios.

## Contrôle d'ouverture directe obligatoire
1. Télécharger l'artefact HTML construit par le dernier workflow GitHub Actions réussi.
2. Ouvrir **directement** le fichier dans Chromium puis Firefox via le chemin `file://`, sans HTTP ni connexion réseau.
3. Vérifier les quatre missions, la sauvegarde et restauration, le défi inédit, le rechargement, l'absence d'erreurs JavaScript et l'absence de ressource distante.
4. Réaliser la vérification clavier/mobile et recopier versions des navigateurs, résultats, date et empreinte du fichier dans le rapport final.

**Un succès sur HTTP local ne prouve pas la compatibilité file://.** Une preuve manquante reste NON VALIDÉE et interdit de présenter le produit comme définitivement livré.

## Validation finale
Exiger : zéro échec bloquant, zéro bouton essentiel inopérant, aucune validation de compétence sans objets Git conformes, sauvegarde/restauration intactes, transfert inédit réellement exécuté, fonctionnement hors ligne vérifié, artefact identique à celui des tests.

## Limite fonctionnelle
Le prototype possède un vrai Git local (via isomorphic-git) mais n'est pas une reproduction complète de GitHub. Issues/PR sont simulées. Codex, Claude Code, conflits et rebase restent à développer dans le parcours avancé.
