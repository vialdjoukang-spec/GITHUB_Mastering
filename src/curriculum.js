// Catalogue unique : seul "active" signale une leçon réellement manipulable.
export const foundationLessons = [
  {
    id:'N0-01',title:'01 · Comprendre un fichier',module:'Repères numériques',chapter:'Fichiers et gestes',
    goal:'Créer bienvenue.txt contenant exactement Bonjour ATLAS.',prereq:'Aucun. Savoir cliquer ou toucher un bouton suffit.',
    definition:'Un fichier est une information enregistrée sous un nom. Par exemple, bienvenue.txt contient une ligne de texte.',
    explain:'Un nom de fichier permet de retrouver son contenu. Écrire du texte dans une zone de saisie ne crée pas encore le fichier : il faut déclencher son enregistrement.',
    demo:['Regardez le laboratoire à droite ou plus bas sur téléphone.','Dans « Chemin du fichier », écrivez bienvenue.txt.','Dans « Contenu du fichier », écrivez Bonjour ATLAS, puis utilisez « Écrire le fichier ».','Observez bienvenue.txt dans la liste des fichiers.'],
    task:'Sans aide automatique, créez bienvenue.txt avec le texte exactement Bonjour ATLAS. Vérifiez ensuite votre résultat.',
    why:'Le laboratoire conserve des octets associés au nom bienvenue.txt. Aucun commit Git ni envoi vers GitHub ne se produit lorsque vous écrivez ce fichier.',
    error:'Si le fichier est absent, vérifiez son nom, le texte et le bouton « Écrire le fichier ». La saisie seule ne modifie pas le dépôt.',
    question:'Le texte placé dans l’éditeur sans cliquer sur « Écrire le fichier » est-il déjà enregistré dans le dépôt ?',
    answer:'Non. La zone de saisie et les fichiers enregistrés sont deux états distincts.',
    transfer:'Changez ensuite une lettre dans la zone de saisie et observez que le fichier enregistré ne change pas tant que vous ne cliquez pas sur le bouton.',
    path:'bienvenue.txt',expected:'Bonjour ATLAS',
    quiz:{prompt:'Que vient de faire le bouton « Écrire le fichier » ?',options:[{value:'local',label:'Il a enregistré un fichier dans le laboratoire local.'},{value:'web',label:'Il a envoyé le fichier sur GitHub.'},{value:'commit',label:'Il a créé automatiquement un commit Git.'}],correct:'local'}
  },
  {
    id:'N0-02',title:'02 · Comprendre un dossier et un chemin',module:'Repères numériques',chapter:'Fichiers et gestes',
    goal:'Créer notes/mon-repere.md avec le texte exact # Mes repères.',prereq:'Avoir découvert comment écrire un fichier.',
    definition:'Un dossier sert à ranger des fichiers. Un chemin indique où chercher un fichier, en commençant par son dossier.',
    explain:'Dans notes/mon-repere.md, notes est le dossier, / indique que l’on entre dans ce dossier, et mon-repere.md est le nom du fichier.',
    demo:['Tapez notes/mon-repere.md dans « Chemin du fichier ».','Tapez # Mes repères dans « Contenu du fichier ».','Cliquez sur « Écrire le fichier », puis retrouvez le chemin dans la liste.'],
    task:'Reproduisez ce classement dans le véritable système de fichiers du laboratoire.',
    why:'Lorsque vous créez un fichier dans un dossier qui n’existe pas, le laboratoire crée d’abord le dossier, puis y enregistre le fichier.',
    error:'Écrire notes.mon-repere.md sans barre oblique produit un nom de fichier simple, pas un fichier placé dans notes.',
    question:'Dans notes/mon-repere.md, quelle partie indique le dossier ?',
    answer:'notes, situé avant la barre oblique /.',
    transfer:'Créez ensuite sans modifier le premier fichier un autre fichier dans un sous-dossier différent.',
    path:'notes/mon-repere.md',expected:'# Mes repères',
    quiz:{prompt:'Dans notes/mon-repere.md, quelle partie désigne le dossier ?',options:[{value:'notes',label:'notes'},{value:'md',label:'md'},{value:'mon-repere',label:'mon-repere'}],correct:'notes'}
  },
  {
    id:'N0-03',title:'03 · Local, Git et GitHub',module:'Repères numériques',chapter:'Où se trouve mon projet ?',
    goal:'Créer mon-projet/README.md contenant # Mon premier projet et distinguer une écriture locale d’une publication distante.',
    prereq:'Savoir créer un fichier dans un dossier.',
    definition:'Local signifie ici : dans le laboratoire ouvert dans votre navigateur. Git sert à enregistrer des versions. GitHub est un service en ligne qui héberge des dépôts et des outils de collaboration.',
    explain:'Créer un fichier, créer une version avec Git et publier sur GitHub sont trois actions différentes. La première ne provoque pas automatiquement les deux autres.',
    demo:['Créez mon-projet/README.md avec # Mon premier projet.','Observez que le fichier apparaît dans le laboratoire.','Vérifiez que vous n’avez créé ni commit ni publication sur GitHub.'],
    task:'Créez le fichier demandé, puis répondez à la question sur l’endroit où il se trouve.',
    why:'Ce laboratoire possède son propre espace local. Les fichiers créés n’apparaissent pas sur votre compte GitHub : il faudrait une connexion et des opérations distinctes.',
    error:'Ne confondez pas le bouton « Écrire le fichier » avec un bouton de publication vers un service distant.',
    question:'Un fichier nouvellement créé ici apparaît-il automatiquement sur github.com ?',
    answer:'Non. Le laboratoire est local. GitHub distant n’a reçu aucune donnée.',
    transfer:'Décrivez la différence entre sauvegarder un fichier, créer un commit Git et publier un dépôt distant.',
    path:'mon-projet/README.md',expected:'# Mon premier projet',
    quiz:{prompt:'Après « Écrire le fichier », où se trouve votre nouveau README ?',options:[{value:'local',label:'Dans le laboratoire local du navigateur.'},{value:'public',label:'Déjà accessible à tout le monde sur GitHub.'},{value:'cloud',label:'Automatiquement dans une Pull Request.'}],correct:'local'}
  }
];

const future = (id,title)=>({id,title,status:'planned'});
export const curriculum = [
  {id:'N0',number:0,title:'Repères numériques',description:'Comprendre les gestes les plus simples avant tout jargon.',modules:[
    {id:'N0-M01',title:'Se repérer',chapters:[{id:'N0-C01',title:'Fichiers et gestes',items:foundationLessons.slice(0,2).map(x=>({id:x.id,title:x.title,status:'active'}))}]},
    {id:'N0-M02',title:'Local et distant',chapters:[{id:'N0-C02',title:'Où se trouve mon projet ?',items:[{id:'N0-03',title:'03 · Local, Git et GitHub',status:'active'}]}]}
  ]},
  {id:'N1',number:1,title:'Enregistrer des versions',description:'Préparer et contrôler de véritables versions Git.',modules:[
    {id:'N1-M01',title:'Premiers changements',chapters:[{id:'N1-C01',title:'Fichiers, index, commits et branches',items:[0,1,2,3].map(i=>({id:'N1-'+String(i+1).padStart(2,'0'),legacyIndex:i,status:'active'}))}]}
  ]},
  {id:'N2',number:2,title:'Branches et collaboration',description:'Contribuer, demander une revue et intégrer des modifications.',modules:[
    {id:'N2-M01',title:'Collaborer',chapters:[{id:'N2-C01',title:'Dépôts distants et contributions',items:[future('N2-01','Clone, fork et dépôts distants'),future('N2-02','Issues et discussions'),future('N2-03','Pull Requests et revues')]}]}
  ]},
  {id:'N3',number:3,title:'Terminal et récupération',description:'Comprendre les commandes et résoudre des incidents Git.',modules:[
    {id:'N3-M01',title:'Diagnostiquer et réparer',chapters:[{id:'N3-C01',title:'Historique et conflits',items:[future('N3-01','Terminal, Git CLI et GitHub CLI'),future('N3-02','Divergences et conflits'),future('N3-03','Rebase, reflog et récupération')]}]}
  ]},
  {id:'N4',number:4,title:'Automatisation et sécurité',description:'Tester, publier et sécuriser un projet réel.',modules:[
    {id:'N4-M01',title:'Livrer en confiance',chapters:[{id:'N4-C01',title:'Actions et publication',items:[future('N4-01','Tests et intégration continue'),future('N4-02','GitHub Actions, artefacts et releases'),future('N4-03','Permissions, secrets et dépendances')]}]}
  ]},
  {id:'N5',number:5,title:'Projets complexes et agents',description:'Utiliser Codex et Claude Code avec contrôle des résultats.',modules:[
    {id:'N5-M01',title:'Diriger un projet',chapters:[{id:'N5-C01',title:'Architecture et agents',items:[future('N5-01','Architecture et gestion du contexte'),future('N5-02','Codex, branches et revues'),future('N5-03','Claude Code et règles persistantes'),future('N5-04','Orchestration, sécurité et publication')]}]}
  ]}
];
export function getFoundation(id){return foundationLessons.find(x=>x.id===id)||null;}
