import git from 'isomorphic-git';
import {MemoryFS} from './fs.js';

// Atelier d'exploration indépendant : jamais le dépôt réel de l'apprenant.
// La source du commit est l'index Git : le moteur reste isomorphic-git.
export class CommitExperiment {
  constructor(){this.fs=null;this.step=0;this.prepared=null;this.prediction=null;this.explanation=null;this.events=[];}
  get opts(){return {fs:this.fs,dir:'/experience'};}
  async reset(){
    this.fs=new MemoryFS();
    await this.fs.mkdir('/experience');
    await git.init({...this.opts,defaultBranch:'main'});
    this.step=0;this.prepared=null;this.prediction=null;this.explanation=null;this.events=[];
    return this.state();
  }
  async next(){
    if(!this.fs)await this.reset();
    if(this.step===3&&(!this.prediction||!this.explanation))throw Error('Choisissez la version enregistrée ET la raison avant de créer ce commit.');
    const n=this.step;
    if(n===0)await this.fs.writeFile('/experience/README.md','Version A');
    else if(n===1){this.prepared=await this.fs.readFile('/experience/README.md','utf8');await git.add({...this.opts,filepath:'README.md'});}
    else if(n===2)await this.fs.writeFile('/experience/README.md','Version B');
    else if(n===3){await git.commit({...this.opts,message:'Version préparée A',author:{name:'Atelier ATLAS',email:'atelier@atlas.invalid'}});}
    else if(n===4){this.prepared=await this.fs.readFile('/experience/README.md','utf8');await git.add({...this.opts,filepath:'README.md'});}
    else if(n===5){await git.commit({...this.opts,message:'Version préparée B',author:{name:'Atelier ATLAS',email:'atelier@atlas.invalid'}});}
    else throw Error('Expérience terminée. Réinitialisez-la pour recommencer.');
    this.step++;
    this.events.push({step:this.step,action:['Écrire A','Préparer A','Modifier en B sans préparer','Enregistrer A','Préparer B','Enregistrer B'][n]});
    return this.state();
  }
  predict(version,why){
    if(this.step!==3)throw Error('Observez d’abord les deux versions : saisie B et index A.');
    this.prediction=version==='a'&&why==='index'?version:null;
    this.explanation=this.prediction?why:null;
    if(!this.prediction)return {ok:false,message:'Non. Le commit ne lit pas automatiquement la dernière édition du fichier. Il utilise la version placée dans l’index. Ici, c’est A.'};
    return {ok:true,message:'Exact : A est dans l’index ; B existe seulement dans le dossier de travail. Le commit enregistrera A.'};
  }
  async state(){
    if(!this.fs)await this.reset();
    let working=null,committed=null,sha=null;
    try{working=await this.fs.readFile('/experience/README.md','utf8');}catch{}
    try{
      sha=await git.resolveRef({...this.opts,ref:'HEAD'});
      const result=await git.readBlob({...this.opts,oid:sha,filepath:'README.md'});
      committed=new TextDecoder().decode(result.blob);
    }catch{}
    return {
      step:this.step,working,prepared:this.prepared,committed,sha,
      currentQuestion:this.step===3,canAdvance:this.step!==3||!!(this.prediction&&this.explanation),
      finished:this.step===6,
      status:await git.statusMatrix(this.opts),events:this.events.slice()
    };
  }
  snapshot(){return {files:this.fs?.snapshot()||null,step:this.step,events:this.events.slice()};}
}

export const experimentExplanations=[
  'Commencez avec un dépôt vide. Il est indépendant de votre laboratoire habituel.',
  'Le fichier README.md contient A, mais aucun changement n’a encore été préparé pour Git.',
  'A est maintenant dans l’index. Le prochain commit pourra enregistrer cet état préparé.',
  'Le fichier de travail contient B. L’index contient toujours A. Prédisez ce que prendra le commit.',
  'Premier commit créé. Il contient A, même si le fichier de travail montre B.',
  'Vous avez actualisé l’index : il contient maintenant B, comme le fichier de travail.',
  'Deuxième commit créé. L’historique contient deux versions successives ; le dépôt est à jour.'
];
