# ATLAS — MATRICE DE VALIDATION QUANTITATIVE

Une phase n’est validée que si tous ses critères obligatoires sont satisfaits par des tests reproductibles. Une fonctionnalité non testée ne peut être déclarée réussie.

## Périmètre actuel
Le prototype perdu a été reconstruit sur autorisation explicite. Périmètre livré : quatre leçons, Git réel local, simulation Issues/PR, sauvegarde et rapport IA. Le curriculum avancé reste un plan d’extension. Les protocoles par exigence ci-dessous sont conservés ; leurs réalisations et limites sont reliées dans TRACEABILITY.md. Un protocole peut couvrir plusieurs essais. Les comptes du rapport final portent sur les essais identifiés du registre courant, pas sur les 60 protocoles initiaux. Aucun test bloqué ou non exécuté n’est retiré du dénominateur.

## Protocole de preuve
Chaque essai doit consigner identifiant unique, phase, fonctionnalité, conditions initiales, actions, attendu, observé, statut PASS/FAIL/BLOCKED/NOT RUN, référence de preuve, environnement, navigateur/version et version/hash HTML. Aucun test bloqué, non exécuté ou sans preuve ne compte comme réussi. Les seuils de 100 % concernent l’inventaire et les scénarios définis, sans prouver l’absence absolue de défauts.

Taux = PASS / total prévu × 100, sans retirer BLOCKED et NOT RUN. VALIDÉE : tous les critères satisfaits. NON VALIDÉE : au moins un critère obligatoire échoué. INCOMPLÈTE : tests ou preuves obligatoires manquants.

## Phase 1

| Exigence / test | Indicateur | Seuil | Protocole reproductible prévu |
|---|---|---|---|
| P1-01 | Inventaire des dépendances | 100 % identifiées | Inventorier sources, bibliothèques intégrées, dépendances transitives et de construction ; relever versions, licences, maintenance et ressources. |
| P1-02 | Réseau obligatoire | 0 dépendance réseau obligatoire à l’exécution | Désactiver le réseau du contexte navigateur et tracer toutes les requêtes pendant les fonctions locales essentielles. |
| P1-03 | Erreurs JavaScript | 0 erreur non gérée | Collecter pageerror, console et promesses rejetées sur chaque scénario de référence. |
| P1-04 | Ressources manquantes | 0 | Inspecter HTML/CSS/JS et les échecs de chargement des deux navigateurs. |
| P1-05 | Authenticité Git | 0 simulation présentée comme authentique | Identifier le moteur ; exporter ses objets et comparer les états avec Git CLI indépendant ; vérifier les mentions A réel, B simulation GitHub, C GitHub réel. |
| P1-06 | Sécurité | 0 vulnérabilité critique connue non corrigée | Contrôler versions contre les avis de sécurité datés, injections et usages dangereux ; conserver rapport et couverture. |
| P1-07 | Ouverture directe | Réussite Chromium et Firefox | Ouvrir le chemin absolu de ATLAS.html via file:// dans chaque navigateur ; consigner versions et journaux. |
| P1-08 | Hors ligne | 100 % des fonctions locales essentielles | Exécuter l’inventaire des fonctions essentielles sous file:// avec réseau désactivé. |

## Phase 2

| Exigence / test | Indicateur | Seuil | Protocole reproductible prévu |
|---|---|---|---|
| P2-01 | Inventaire interactif | 100 % | Recenser boutons, onglets, liens, formulaires et commandes, y compris états conditionnels. |
| P2-02 | Couverture interactive | 100 % testés | Associer chaque contrôle à action attendue, étapes, résultat et preuve. |
| P2-03 | Interactions essentielles | 100 % réussies | Exécuter les parcours essentiels par l’interface. |
| P2-04 | État Git | 100 % des scénarios de référence | Comparer fichiers, index, commits, branches, fusion et historique avec Git CLI. |
| P2-05 | Scénarios Git indépendants | Au moins 10 | Définir au minimum création, ajout, commit, modification non indexée, index distinct, historique, branche, changement de branche, fusion et erreur ; vérifier indépendamment les états. |
| P2-06 | Export et réimport | 100 % des scénarios | Exporter exercices et résultats, réimporter dans un contexte neuf et comparer les états. |
| P2-07 | Boutons inopérants non signalés | 0 | Activer tous les boutons dans leurs préconditions documentées, y compris soumission IA, copie et téléchargement. |
| P2-08 | Erreurs critiques ou bloquantes | 0 | Consolider incidents des parcours et vérifier les corrections par régression. |

## Phase 3

| Exigence / test | Indicateur | Seuil | Protocole reproductible prévu |
|---|---|---|---|
| P3-01 | Objectifs mesurables | 100 % des leçons | Relever pour chaque leçon objectif et preuve observable de réussite. |
| P3-02 | Définitions préalables | 100 % du périmètre | Suivre l’ordre de lecture et relever la définition avant première utilisation de chaque notion nouvelle. |
| P3-03 | Démonstrations | 100 % des leçons | Rejouer chaque démonstration et comparer son résultat à son explication. |
| P3-04 | Manipulations | 100 % des leçons | Exécuter chaque exercice dans le laboratoire. |
| P3-05 | Exactitude technique | 100 % des affirmations importantes | Confronter chaque affirmation importante à documentation de référence ou expérience Git reproductible. |
| P3-06 | Corrections explicatives | 100 % des exercices | Provoquer une erreur et vérifier explication causale et correction. |
| P3-07 | Prérequis | 100 % explicités | Vérifier prérequis de chaque leçon et critères d’entrée/sortie de chaque niveau. |
| P3-08 | Erreurs conceptuelles critiques | 0 | Relire les distinctions Git/GitHub, index/commit, branche/fusion et simulation/réel. |
| P3-09 | Grille éditoriale interne | ≥17/20 et chaque dimension ≥3/4 | Noter chaque leçon sur clarté, exactitude, progressivité, utilité pratique et remédiation ; justifier chaque note. Ce contrôle interne ne mesure pas scientifiquement l’apprentissage réel. |

## Phase 4

| Exigence / test | Indicateur | Seuil | Protocole reproductible prévu |
|---|---|---|---|
| P4-01 | Réponses et justifications | 100 % correctes | Examiner toutes les questions, réponses et justifications. |
| P4-02 | Bonnes réponses | 100 % acceptées | Exécuter chaque bonne réponse avec état Git conforme. |
| P4-03 | Mauvaises réponses | 100 % rejetées | Exécuter toutes les mauvaises réponses définies, vérifier refus et explication. |
| P4-04 | État Git obligatoire | 0 validation sans état conforme | Tenter validation avec dépôt vide, index seul, mauvais contenu, mauvaise branche et état périmé ; vérifier objets Git réels. |
| P4-05 | Remédiation ciblée | 100 % des exercices | Vérifier que chaque erreur indique la cause et une action corrective pertinente. |
| P4-06 | Transfert | 100 % des checkpoints majeurs | Exécuter une mission nouvelle combinant état Git, anticipation et explication ; un QCM seul ne prouve pas la maîtrise Git. |
| P4-07 | Cas limites | Au moins 5 par exercice | Définir et exécuter cinq cas limites distincts pour chaque exercice inventorié. |
| P4-08 | Contournements | 0 connu non corrigé | Tenter manipulation de progression, réponses et import ; confirmer absence de validation indue. |

## Phase 5

| Exigence / test | Indicateur | Seuil | Protocole reproductible prévu |
|---|---|---|---|
| P5-01 | Largeurs | 360, 390, 768, 1024, 1440 px | Capturer chaque vue essentielle aux cinq largeurs et dans chaque thème. |
| P5-02 | Débordements | 0 involontaire | Comparer scrollWidth/clientWidth et inspecter les vues après interactions. |
| P5-03 | Chevauchements | 0 masquant une information | Inspecter captures des états ouverts, menus, dialogues et résultats longs. |
| P5-04 | Lisibilité | 0 texte essentiel illisible | Inspecter vues mobiles, zoom et thèmes. |
| P5-05 | Clavier | 100 % des contrôles essentiels | Parcourir Tab/Shift+Tab, Entrée, Espace et Échap ; vérifier focus visible, ordre et retour du focus. |
| P5-06 | Contraste normal | ≥4,5:1 | Mesurer les paires de couleurs effectives de tous les textes normaux, dans tous les thèmes. |
| P5-07 | Contraste grand texte | ≥3:1 | Mesurer chaque grand texte selon sa taille et graisse. |
| P5-08 | Noms accessibles | 0 contrôle interactif sans nom | Inspecter arbre d’accessibilité de tous les états interactifs. |
| P5-09 | Mobile | 100 % des fonctions essentielles | Exécuter les parcours tactiles aux largeurs mobiles. |
| P5-10 | Navigation | 0 blocage | Tester navigation aller/retour, dialogues et changements de leçon ; comparer les vues pertinentes à GitHub sans prétendre à une identité parfaite. Conserver captures avant/après correction. |

## Phase 6

| Exigence / test | Indicateur | Seuil | Protocole reproductible prévu |
|---|---|---|---|
| P6-01 | Scénarios négatifs | Au moins 20 exécutés | Définir vingt cas indépendants couvrant JSON invalide, interruption, Git inattendu, stockage, rechargement et fermeture/réouverture. |
| P6-02 | JSON invalide | 100 % des cas testés rejetés | Importer syntaxe invalide, mauvais schéma/types/versions/références et contenu malveillant ; comparer l’état avant/après. |
| P6-03 | Intégrité restauration | 0 corruption | Comparer fichiers, index, objets Git et progression avant export et après restauration valide. |
| P6-04 | Perte silencieuse | 0 cas observé | Simuler erreurs stockage/import et interruptions ; vérifier conservation de données et avertissement explicite. |
| P6-05 | Restauration répétée | 10 réussites sur 10 | Restaurer dix sauvegardes valides dans des contextes propres ; comparer les états. |
| P6-06 | Blocage définitif | 0 | Après chaque erreur imprévue, reprendre une opération valide. |
| P6-07 | Régression | 0 sur scénarios validés | Relancer tous les scénarios précédemment validés après corrections. |
| P6-08 | Tests critiques | 0 échec | Relancer la suite critique et conserver son journal intégral. |

## Phase 7

| Exigence / test | Indicateur | Seuil | Protocole reproductible prévu |
|---|---|---|---|
| P7-01 | Phases précédentes | 6/6 validées | Vérifier tous les critères et preuves des six rapports. |
| P7-02 | Tests essentiels | 100 % PASS | Relancer la suite essentielle complète sur le fichier final. |
| P7-03 | Anomalies ouvertes | 0 critique ou majeure | Consolider le registre, les corrections et leurs tests de confirmation. |
| P7-04 | Régressions connues | 0 | Relancer la régression complète. |
| P7-05 | Documentation | 100 % des fonctions livrées | Comparer SPEC.md, CURRICULUM.md et STATE.md à l’inventaire final et préparer un plan d’extension sans production massive. |
| P7-06 | file:// final | Réussite | Ouvrir directement le fichier livré sur Chromium et Firefox. |
| P7-07 | Hors ligne final | Réussite | Répéter tous les parcours essentiels réseau désactivé. |
| P7-08 | Exports/restauration finaux | Réussite | Exporter et restaurer depuis le fichier final ; comparer les états. |
| P7-09 | Rapport et preuves | Complets | Vérifier les champs obligatoires de chaque preuve et l’identité SHA-256 entre fichier testé et fichier livré. |

## Conditions de rejet automatique
1. Un bouton indispensable à l’exercice ne fonctionne pas.
2. Une opération Git simulée est présentée comme authentique.
3. Un checkpoint valide une compétence sans résultat conforme.
4. Une sauvegarde valide ne peut pas être restaurée.
5. Internet est nécessaire à des opérations annoncées locales.
6. Une modification introduit une régression critique.
7. Un échec technique est masqué par une réussite visuelle.
8. Le fichier livré diffère de celui effectivement testé.
9. Une preuve de réussite annoncée n’est pas reproductible.

Ces conditions doivent être testées ; l’absence du produit ne permet pas de conclure à leur satisfaction.
