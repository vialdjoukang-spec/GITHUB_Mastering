# Inventaire interactif du prototype
Périmètre : éléments statiques de src/index.html, éléments dynamiques de src/app.js et sept formes de commandes terminal. Les contrôles sont testés par clic/saisie sauf indication explicite ; les opérations sous-jacentes sont également comparées à Git CLI.

| Contrôles / interaction | Action attendue | Preuve exécutée |
|---|---|---|
| theme | alterner clair/sombre | P2-UI, P5-dark/light-* |
| backup | télécharger JSON complet | P2-EXPORT |
| restore, importFile | choisir puis charger JSON | P2-RESTORE-BUTTON, P2-EXPORT |
| navigation 4 leçons | changer objectif et exercice | P3-STRUCTURE |
| demo | préparer chemin/contenu sans exécution | P2-UI |
| lien Aller au contenu | atteindre contenu principal | P2-UI-DISCLOSURES |
| tous les summary | ouvrir/fermer les panneaux | P2-UI-DISCLOSURES |
| fichier dynamique | charger chemin et texte | P2-UI |
| path, content, saveFile | écrire le fichier | P2-UI, P2-UI-BRANCHES, P5-MOBILE-ACTION |
| addFile | indexer le fichier sélectionné | P2-UI |
| deleteFile | supprimer et indexer suppression | P2-UI-BRANCHES, P2-GIT-10 |
| message, commit | créer objet commit | P2-UI |
| refresh | relire état Git | P2-UI |
| branchName, createBranch, checkout, merge | branche, changement, fusion rapide | P2-UI-BRANCHES |
| command, terminal | exécuter grammaire annoncée | P2-TERMINAL, P2-TERMINAL-GRAMMAR |
| issueTitle, issue | créer issue simulée | P2-SIMULATION |
| Fermer/Rouvrir dynamiques | changer état de l’issue | P2-SIMULATION |
| prSource, pr, mergePr | créer PR simulée et fusionner Git | P2-SIMULATION |
| explanation | conserver une explication libre | P2-REPORT |
| verify | calculer prédicats et badge de manipulation | P2-UI, P4-POSITIVE, P4-*-NEG-* |
| report, reportText | générer et lire rapport | P2-REPORT |
| copyReport, downloadReport, closeReport | copier, télécharger, fermer | P2-REPORT |
| restart et confirmation | annuler ou recréer dépôt vide | P2-UI-RESTART |
| dialogue : Échap / Entrée | ouvrir au clavier, fermer, retour focus natif | P5-KEYBOARD |

Commandes documentées : git status, git log, git add chemin, git commit -m "message", git branch nom, git switch nom, git merge nom. Test P2-TERMINAL-GRAMMAR et P2-TERMINAL ; le terminal ne revendique aucune autre commande. Les essais Git négatifs couvrent commit vide, branche sale, branche inconnue, nom invalide et divergence.

La couverture fonctionnelle de cet inventaire ne vaut pas couverture clavier exhaustive ni validation file://. Les textes du futur parcours sont informatifs, sans boutons inopérants présentés comme des fonctionnalités livrées.
