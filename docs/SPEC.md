# ATLAS — spécification de reconstruction
Autorisation : le prototype perdu doit être reconstruit. Démarche Spec Kit appliquée manuellement ; aucun outil Spec Kit exécuté.

## Produit et contraintes
Un seul ATLAS.html, ressources intégrées, français, file:// hors ligne sur Chromium et Firefox. Quatre leçons constituent le prototype vertical ; le programme expert reste un plan visible, pas une promesse de fonctionnalités livrées.

| Fonction | Réalisation | Acceptation |
|---|---|---|
| Fichiers, index, commit, branches, historique, fusion rapide | isomorphic-git et système de fichiers mémoire ; véritables objets Git | comparaison avec Git CLI |
| Issues, demandes de fusion | simulation locale explicitement nommée | état conservé, PR fusionnée seulement après fusion réelle |
| Actions, permissions, API, publication, agents distants | parcours futurs nécessitant GitHub réel | aucun bouton fictif |
| Sauvegarde | JSON complet versionné, stockage navigateur et téléchargement | restauration atomique et validation structurelle/Git |
| Checkpoints | objets Git et contenu vérifiés, transfert sur autre fichier | refus des états non conformes |
| Soumission IA | rapport local, copie et téléchargement | aucune transmission réseau |

Architecture : sources JS/CSS/HTML intégrées par esbuild. isomorphic-git authentique en mémoire via memfs ; les sauvegardes transportent les octets de tous les fichiers, dont .git. Aucun serveur à l’exécution. Fusion limitée au fast-forward, refus explicite des divergences. Terminal à grammaire limitée, sans shell système. Limites : pas de rebase ni résolution de conflit dans cette version ; pas d’évaluation automatique fiable d’une explication libre.

Premier lot : moteur Git et sauvegarde ; interface et quatre leçons ; tests navigateur et Git indépendant ; audits et livraison par hash.
Critères du prototype : créer/indexer/committer des fichiers, créer une branche et fusionner en fast-forward ; quatre missions vérifiées ; import/export sans perte ; rapport IA ; ouverture hors ligne ; noms accessibles et cinq largeurs. Les critères complets restent ceux de ACCEPTANCE_CRITERIA.md.
