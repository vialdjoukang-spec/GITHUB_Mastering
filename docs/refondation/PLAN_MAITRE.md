# ATLAS — Plan maître de refondation pédagogique

## Statut et périmètre

Document de conception, pas livraison d'une nouvelle application. Le code de main est conservé. Base examinée : b1eb9ccb1010c7e3a224e82060b0b9f3bb30f038, 14 octobre 2026. Cette branche ne contient pour le moment que la préparation documentaire de la refondation.

Référence fondatrice : conversation ATLAS fournie dans un PDF de 34 pages. Ce PDF a été lu intégralement ; il décrit le mandat et les critères, mais ne contient pas le code du prototype perdu. Le PDF privé n'est pas téléversé dans le dépôt. Les exigences techniques utiles sont reformulées ici. Les propositions nouvelles sont identifiées comme telles.

## 1. Ce qui est confirmé par le document

- Académie pratique du niveau zéro absolu à l'expertise avancée ; pas un simple manuel avec QCM (pp. 1, 17).
- Hiérarchie niveaux > modules > chapitres > leçons > exercices, avec prérequis et preuves de sortie (pp. 24-25).
- Six niveaux proposés dans la conversation : repères numériques ; fichiers et premiers commits ; branches et collaboration ; terminal et récupération ; automatisation et sécurité ; projets complexes et agents (p. 30).
- Cycle pédagogique : Comprendre > Observer > Manipuler > Expliquer > Réussir > Réutiliser (p. 22).
- Laboratoire accessible depuis le cours, ressemblant aux interfaces GitHub pertinentes, avec manipulations réellement possibles (pp. 20-21).
- Distinction A : Git réellement exécuté ; B : services GitHub simulés ; C : GitHub réel nécessitant connexion et autorisation (pp. 8, 21).
- Évaluations cumulatives, missions inédites, révisions différées et remédiation ; ni clics ni temps passé ne prouvent seuls une compétence (pp. 22-24).
- Démonstrations rejouables, ou microvidéos de 15 à 90 secondes pour les difficultés ; aucune simulation présentée comme une capture réelle (pp. 6-7, 24).
- ATLAS.html autonome ; ressources intégrées ; sans CDN obligatoire ; exercices locaux hors ligne ; ouverture file:// testée ; PC et smartphone (pp. 20, 32).
- Sauvegarde/restauration et rapport volontaire de soumission à une IA, sans collecte ou transmission silencieuse (pp. 25-26, 32).
- Examiner les bibliothèques, distinguer composants embarqués, outils de fabrication et références, vérifier licences et compatibilités ; ne pas installer toute une liste aveuglément (pp. 9-13, 26-27).
- Spec Kit pour spécifier ; Repomix pour sélectionner le contexte ; AGENTS.md et CLAUDE.md pour la continuité. Leur présence dans un prompt ne signifie pas qu'ils ont été exécutés (pp. 14-19).
- Un seul produit intégré, d'abord une chaîne pédagogique complète validée, puis extension méthodique. Aucun travail déclaré terminé sans preuves (pp. 27-28, 33-34).

## 2. Demande actuelle et arbitrages

Le vocabulaire doit disposer de fenêtres interactives contextualisées, explicites et compréhensibles sans prérequis implicite. Cette granularité est une précision de la demande actuelle.

Les thèmes sont exclusivement clairs. La proposition historique clair/sombre est remplacée. L'exigence de fidélité à GitHub porte sur les écrans et scénarios enseignés, non sur une promesse de reproduire tous les services distants dans un fichier local.

Driver.js reste le premier candidat pour le guidage. Monaco reste optionnel ; il ne peut compromettre smartphone ou file://. Phaser, FFmpeg.wasm, H5P, Zustand, Marked et Zod sont des options à motiver, pas des dépendances obligatoires. Les conseils historiques d'attendre une ancienne exécution ne constituent pas un blocage de ce mandat.

## 3. État initial constaté, sans nouveau test d'exécution

Fichiers examinés : AGENTS.md, docs/SPEC.md, docs/CURRICULUM.md, docs/STATE.md, README.md, src/index.html, parties pédagogiques de src/app.js, package.json.

- L'interface expose quatre missions, pas une navigation fonctionnelle dans tous les niveaux.
- Des niveaux avancés sont décrits dans CURRICULUM.md, explicitement non implémentés.
- Les définitions sont insérées dans des paragraphes ; aucun système lexical contextuel n'apparaît dans le rendu de leçon examiné.
- package.json déclare buffer/isomorphic-git et les outils de développement axe-core/playwright, esbuild, playwright. Il ne déclare pas Primer, Driver.js, rrweb, Repomix ou Spec Kit. Cela ne démontre pas l'absence de tout usage externe ou manuel.
- SPEC.md documente une application manuelle de la méthode Spec Kit, pas l'exécution du logiciel.
- README.md annonce des vérifications file:// réussies, mais STATE.md conserve un ancien état bloqué. Les documents et les preuves doivent être réconciliés par version.

Ce constat est une revue ciblée, pas un nouvel audit exhaustif ni une réexécution de la CI.

## 4. Architecture pédagogique proposée : six niveaux 0 à 5

La numérotation et les modules détaillés ci-dessous sont une proposition de refondation qui conserve les six niveaux du document.

| Niveau | Modules | Entrée | Preuve de sortie |
|---|---|---|---|
| N0 — Repères numériques | Fichiers/dossiers/chemins/extensions ; texte/code/éditeur/navigateur ; local/distant ; Git/GitHub ; reconnaître l'interface | Aucune connaissance technique | Créer, retrouver, modifier et sauvegarder des fichiers ; distinguer ordinateur, navigateur et dépôt distant ; expliquer ce qui change et où |
| N1 — Versionner un projet | Dépôt ; README/Markdown ; travail/index/commit ; historique ; comparaison ; changements sélectionnés | Repères N0 démontrés | Enregistrer une sélection précise, laisser une autre modification non enregistrée dans Git et retrouver une version antérieure |
| N2 — Branches et collaboration | Branches ; fusion rapide ; dépôt distant/fork/clone ; Issues ; PR ; commentaires/revue ; conventions de contribution | N1 démontré | Livrer une évolution isolée, examiner une différence et corriger une contribution avant fusion ; simulation et transfert réel distingués |
| N3 — Terminal et récupération | Commande/argument/répertoire courant ; Git CLI/GitHub CLI ; historique divergent ; conflit ; fusion/rebase ; revert/reset/reflog | N2 et initiation terminal | Diagnostiquer un conflit et récupérer un travail dans une mission inédite, sans détruire une modification indépendante |
| N4 — Automatiser, publier, sécuriser | Tests et CI ; GitHub Actions ; artefacts ; versions/releases/Pages ; permissions ; protections ; secrets ; dépendances | N3 démontré | Corriger une livraison échouée, empêcher une fusion non conforme et vérifier une publication reproductible, avec privilèges limités |
| N5 — Projets complexes et agents | API/intégrations ; architecture et maintenance ; diagnostic avancé ; Codex ; Claude Code ; instructions persistantes ; contexte ; orchestration et revues | N4 et garde de sécurité | Concevoir, déléguer, contrôler, intégrer, publier puis réparer un projet inédit ; justifier les choix et vérifier les propositions des agents |

Les nombres définitifs de leçons ne sont pas inventés avant la carte des compétences. Chaque capacité doit posséder au moins un enseignement, une manipulation et une preuve de transfert. La programmation minimale nécessaire est enseignée au moment utile ; elle n'est pas supposée acquise.

## 5. Contrat du vocabulaire interactif

Chaque terme technique a un identifiant stable, un niveau d'introduction, des prérequis et une définition progressive. Les occurrences dans les leçons, consignes, tableaux et messages d'erreur doivent donner accès à l'aide pertinente. Les blocs de code restent copiables sans altération.

Contenu de fenêtre : définition simple ; utilité ; exemple concret ; ce que le terme ne désigne pas ; mécanisme plus précis ; erreur fréquente et correction ; lien vers une manipulation préconfigurée dans un laboratoire isolé.

Le glossaire général complète les fenêtres, il ne les remplace pas. Les noms visibles de GitHub en anglais sont conservés et expliqués en français. Pas de définition circulaire ni de cascade de fenêtres imposée. Accès au clic, au clavier et au tactile ; fermeture Échap ; retour du focus et de la position de lecture. Un tutoriel ne modifie jamais silencieusement le dépôt de l'apprenant.

## 6. Outils : choix de conception, pas installations déclarées

| Groupe | Décision |
|---|---|
| Spec Kit | Structurer spécification, plan, tâches et cohérence. Distinguer exécution de l'outil et méthode manuelle ; conserver un reçu d'exécution si installé |
| Repomix | Préparer des contextes ciblés, exclure bundles/preuves binaires/secrets, compter les tokens et garder l'accès au code original |
| AGENTS.md / CLAUDE.md | Règles communes courtes, sources de vérité et reprise par tâche ; synchronisation vérifiée |
| Primer Primitives / Octicons / Primer CSS | Premier choix pour les repères et styles GitHub compatibles avec le socle existant ; n'embarquer que les ressources utiles |
| Primer React | À retenir uniquement si un essai comparatif justifie React ; aucune réécriture du moteur Git pour un changement d'interface |
| isomorphic-git / Git CLI | Conserver le moteur réel et vérifier indépendamment objets, références et états avec Git natif |
| LightningFS | Tester comme solution de persistance ; maintenir un export JSON sûr et un repli vérifiable si le navigateur bloque le stockage |
| Monaco Editor | Option non imposée ; éditeur local léger obligatoire si autonomie ou mobile sont compromis |
| xterm.js | Interface du terminal ; chaque commande doit être reliée à un moteur ou explicitement indisponible, jamais exécutée fictivement |
| Driver.js | Guidage progressif, synchronisé sur des effets réels, retirable en mission autonome |
| rrweb | Démonstrations enregistrées/rejouables ; enregistrement apprenant seulement sur consentement et sans données sensibles |
| Learn Git Branching / GitHub Skills / GitHub Docs | Références pédagogiques et techniques, pas import complet sans justification |
| Playwright / axe-core / GitHub Actions | Scénarios E2E, traces, captures, accessibilité automatisée, tests de régression et artefacts versionnés ; contrôle manuel complémentaire |
| Aider, Context7, Gitingest, Code2Prompt, ast-grep | Réserve à mobiliser uniquement sur un besoin identifié ; ne pas prétendre disposer d'une connexion non vérifiée |

La vitesse sera recherchée par une architecture partagée, des tâches indépendantes, des contextes ciblés, une CI parallèle raisonnable et l'analyse des traces d'échec. Aucun coefficient de vitesse ou d'économie de tokens n'est promis sans mesure.

## 7. Architecture technique cible

Séparer catalogue et prérequis ; contenus de leçon ; lexique ; moteur Git ; modèle des services simulés ; contrôleurs des exercices ; évaluateurs ; démonstrations ; interface ; stockage et export ; preuves qualité. Les noms de ces modules sont des responsabilités, pas une obligation d'imposer un nouveau framework.

Une seule construction produit ATLAS.html. Le cours et le laboratoire partagent le même état explicite, avec espaces isolés par exercice et migration des sauvegardes. Le catalogue pilote navigation et comptages. Une leçon prévue ne peut être comptée comme livrée. Les événements servent au diagnostic, mais la validation porte sur les résultats et mécanismes : des chemins corrects différents doivent être acceptés.

## 8. Tableau de fabrication — version initiale

Une case cochée signifie la tâche indiquée réellement terminée. Le champ Preuve reste obligatoire pour une tâche d'implémentation. Dans cette première version, seules les préparations documentaires sont cochées.

- [x] A01 — Lire les 34 pages et distinguer mandat, recommandations, décisions et récit historique. Preuve : synthèse de la section 1 ; source fournie dans la conversation.
- [x] A02 — Confronter le mandat au code et aux documents du dépôt. Preuve : section 3, fichiers lus à la base Git indiquée.
- [x] A03 — Définir les six niveaux, le contrat lexical et les arbitrages. Preuve : sections 2, 4, 5, 6 ; conception seulement.
- [x] A04 — Écrire un plan maître et une liste de contrôle dans une branche distincte. Preuve : ce fichier versionné ; aucune nouvelle interface livrée.
- [ ] B01 — Synchroniser SPEC/CURRICULUM/STATE/AGENTS/CLAUDE et relier chaque exigence à une preuve attendue.
- [ ] B02 — Vérifier versions, licences, installation et compatibilité des outils retenus ; mesurer le budget de contexte et de ressources.
- [ ] C01 — Implémenter le catalogue niveaux > modules > chapitres > leçons > exercices et la navigation responsive.
- [ ] C02 — Implémenter les prérequis, états disponibles/prévus/validés et compteurs fondés sur les contenus réellement livrés.
- [ ] D01 — Créer le lexique des niveaux 0 et 1 avec définitions sans prérequis implicites, exemples et contre-exemples.
- [ ] D02 — Implémenter et tester les fenêtres lexicales, le clavier, le tactile, les liens contextuels et le retour au cours.
- [ ] E01 — Construire les écrans GitHub pertinents avec les bons repères, sans commandes fictives, et les ouvertures préconfigurées depuis les leçons.
- [ ] E02 — Isoler les laboratoires et démonstrations ; préserver et migrer les sauvegardes existantes.
- [ ] F01 — Livrer une séquence complète du niveau zéro puis « Mon premier commit » avec le cycle en six étapes.
- [ ] F02 — Ajouter la démonstration rejouable, une erreur provoquée, une correction causale, la sauvegarde et le rapport IA.
- [ ] G01 — Construire les évaluations de prédiction, diagnostic, correction et transfert ; accepter plusieurs démarches valides.
- [ ] G02 — Construire de vraies variantes de situations, pas seulement renommer les fichiers ; tester les faux positifs et remédiations.
- [ ] G03 — Implémenter révisions différées et progression de compétences ; pas de badge expert automatique pour une explication libre non évaluée.
- [ ] H00 — Achever toutes les compétences et le checkpoint autonome du niveau 0.
- [ ] H01 — Achever toutes les compétences et le checkpoint autonome du niveau 1.
- [ ] H02 — Achever toutes les compétences et le checkpoint autonome du niveau 2.
- [ ] H03 — Achever toutes les compétences et le checkpoint autonome du niveau 3.
- [ ] H04 — Achever toutes les compétences et le checkpoint autonome du niveau 4.
- [ ] H05 — Achever toutes les compétences et le projet de sortie du niveau 5, dont Codex et Claude Code.
- [ ] I01 — Vérifier les comportements Git enseignés avec Git natif et les tests positifs/négatifs/limites.
- [ ] I02 — Contrôler chaque leçon, terme, guidage, bouton et checkpoint ; relecture pédagogique distincte.
- [ ] I03 — Tester file:// hors ligne sur Chromium et Firefox, sauvegardes/restaurations, interruption et reprise ; couvrir les largeurs 360/390/768/1024/1440 et le zoom.
- [ ] I04 — Vérifier clavier et tactile, contrastes, absence de chevauchements, sécurité des imports et absence d'envoi silencieux.
- [ ] J01 — Valider les exercices GitHub réel dans un dépôt de test autorisé, sans secrets dans le HTML ; ne pas les confondre avec les simulations.
- [ ] J02 — Assembler et tester le fichier final ; enregistrer empreinte, versions, résultats et anomalies dans un manifeste unique.
- [ ] J03 — Vérifier le téléchargement local et le lien d'ouverture réel ; confirmer identité de la version servie ; annoncer correctement prototype ou cursus complet.

## 9. Critères proposés d'acceptation

Ces seuils sont des critères de fabrication proposés, pas des résultats obtenus ni une certification externe.

- 100 % des leçons livrées ont prérequis, objectif, six étapes et critère de sortie ; aucun niveau livré vide.
- 100 % des termes techniques inventoriés dans les surfaces pédagogiques ont une définition accessible ; aucune référence lexicale orpheline.
- Pour chaque checkpoint majeur : réussite par l'état attendu, au moins une démarche alternative correcte lorsque pertinente, au moins cinq cas négatifs distincts et une variante inédite ; aucune réussite avec évaluateur vide.
- Une mission de transfert doit varier la structure du problème ou l'erreur, pas uniquement des chaînes aléatoires.
- Tous les tests critiques prévus doivent réussir ; BLOCKED et NOT RUN ne sont jamais des réussites. Dénominateurs et périmètres affichés.
- Les tests automatisés ne suffisent pas à certifier la pédagogie, l'accessibilité totale ou une expertise réelle ; relecture et essai novice supervisé restent distincts.
- Aucun script distant indispensable à l'exécution locale ; persistance déclarée seulement pour les environnements testés ; aucune perte silencieuse sur les scénarios testés.
- Aucune opération GitHub réelle, aucun enregistrement de session et aucun appel IA sans action volontaire et autorisation.
- Le statut « cursus complet » exige la couverture et les preuves de tous les niveaux. Le statut « prototype » reste explicite tant qu'un niveau n'est qu'un plan.

## 10. Mise à jour visible et preuves

Les identifiants de tâches sont stables. À chaque lot exécuté : annoncer les tâches concernées, lire les sources nécessaires, produire, tester, puis actualiser les cases avec commit, version du HTML, commande, environnement, résultat et anomalies. Une modification ultérieure invalidant une preuve rouvre la tâche.

Le prochain registre structuré alimentera un tableau de suivi. Ce fichier Markdown constitue pour l'instant le suivi visible ; il ne se met pas à jour tout seul. Les messages de conversation restent des instantanés. Ni un plan ni une case ne signifie qu'un agent fonctionne en arrière-plan. Les preuves de fonctionnement des quatre anciennes missions ne sont pas transférées automatiquement aux futurs niveaux.

## Références techniques consultées pour ces arbitrages

- Spec Kit : https://github.github.com/spec-kit/index.html
- Repomix : https://repomix.com/guide/usage et https://repomix.com/guide/command-line-options
- Primer : https://primer.style/product/getting-started/react/ et https://primer.style/octicons/code/
- isomorphic-git : https://isomorphic-git.org/docs/en/fs
- Driver.js : https://driverjs.com/docs/installation
- Monaco : https://github.com/microsoft/monaco-editor (FAQ)
- Playwright : https://playwright.dev/docs/trace-viewer

La consultation de ces références n'est pas une preuve d'installation ou d'exécution de chaque outil. Les licences et versions exactes seront archivées avec les dépendances réellement retenues.
