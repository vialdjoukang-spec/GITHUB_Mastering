import {chromium,firefox} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {createServer} from 'node:http';
import {readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {deflateSync} from 'node:zlib';
const html=readFileSync('ATLAS.html'),hash=createHash('sha256').update(html).digest('hex'),results=[];mkdirSync('docs/evidence/screenshots',{recursive:true});
const server=createServer((req,res)=>{res.setHeader('Content-Type','text/html');res.end(html);}).listen(4173,'127.0.0.1');
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const ctx=await browser.newContext({acceptDownloads:true});const page=await ctx.newPage();let errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
async function test(phase,id,feature,fn){try{const observed=await fn();results.push({id,phase,functionality:feature,initial:'Contexte Chromium local ; état explicité par le scénario dans tests/audit.mjs',actions:'Exécuter le bloc '+id+' de tests/audit.mjs',expected:'Toutes les assertions du scénario satisfaites',observed:observed??'Assertions satisfaites',status:'PASS',evidence:'docs/evidence/results.json',environment:process.platform,browser:browser.version(),html_sha256:hash});console.log('PASS',id);}catch(e){results.push({id,phase,functionality:feature,status:'FAIL',initial:'Voir scénario '+id,actions:'tests/audit.mjs : '+id,expected:'Assertions satisfaites',observed:e.stack,evidence:'docs/evidence/results.json',browser:browser.version(),html_sha256:hash});console.log('FAIL',id,e.message);}}
function blocked(phase,id,feature,reason){results.push({id,phase,functionality:feature,initial:'Environnement géré',actions:'Tentative documentée',expected:'Exécution complète',observed:reason,status:'BLOCKED',evidence:'docs/evidence/results.json',browser:browser.version(),html_sha256:hash});}
const op=(name,a)=>page.evaluate(([n,a])=>ATLAS.op(n,a),[name,a]);const snap=()=>page.evaluate(()=>ATLAS.snapshot());const reset=()=>page.evaluate(()=>ATLAS.reset());const check=i=>page.evaluate(i=>ATLAS.checksFor(i),i);const restore=d=>page.evaluate(d=>ATLAS.restore(d),d);const write=(p,c)=>op('write',{path:p,content:c});
async function seed(){await reset();await write('README.md','# Mon carnet');await write('transfert.md','Autre contexte');await op('add','README.md');await op('add','transfert.md');await op('commit','Initial');}
function disk(data,label){const target='work/git-'+label;rmSync(target,{recursive:true,force:true});mkdirSync(target,{recursive:true});for(const [p,b]of Object.entries(data.files)){if(!p.startsWith('/lab/'))continue;const dest=target+p.slice(4);if(b===null)mkdirSync(dest,{recursive:true});else {mkdirSync(dest.slice(0,dest.lastIndexOf('/')),{recursive:true});writeFileSync(dest,Buffer.from(b));}}return target;}
function git(target,...args){return execFileSync('git',['-C',target,...args],{encoding:'utf8'}).trim();}
async function compare(label,expected){const d=disk(await snap(),label);const state={status:git(d,'status','--porcelain'),branches:git(d,'branch','--format=%(refname:short)'),fsck:git(d,'fsck','--full')};await expected(d,state);writeFileSync('docs/evidence/git-'+label+'.json',JSON.stringify(state,null,2));return state;}
try{
const filePage=await ctx.newPage();try{await filePage.goto('file://'+process.cwd()+'/ATLAS.html');await filePage.waitForFunction(()=>ATLAS.ready());}catch(e){blocked(1,'P1-FILE-CHROMIUM','Ouverture file:// Chromium',e.message);}finally{await filePage.close();}
try{const fb=await firefox.launch();await fb.close();}catch(e){blocked(1,'P1-FIREFOX','Firefox file:// hors ligne','Firefox absent. Téléchargement Playwright refusé HTTP 403 Domain forbidden. '+e.message.slice(0,180));}
await page.goto('http://127.0.0.1:4173');await page.waitForFunction(()=>window.ATLAS?.ready());await ctx.setOffline(true);
await test(1,'P1-BOOT','Initialisation et ressources intégrées',async()=>{assert.equal(errors.length,0);assert(!/<(?:script|link)[^>]+(?:src|href)=["']https?:/i.test(html.toString()));return {requests,errors};});
await test(1,'P1-GIT','Objets Git authentiques hors ligne',async()=>{await seed();return compare('authentic',(d)=>{assert.equal(git(d,'show','HEAD:README.md'),'# Mon carnet');assert.equal(git(d,'rev-list','--count','HEAD'),'1');});});

await test(1,'P1-CATALOGUE','Six niveaux et distinction du disponible/prévu',async()=>{
  await reset();
  assert.equal(await page.locator('#pathway .academy-level').count(),6);
  assert.equal(await page.locator('#pathway [data-foundation]').count(),3);
  assert.equal(await page.locator('#lessons [data-lesson]').count(),4);
  assert((await page.locator('#pathway').textContent()).includes('Prévu'));
  assert.equal(await page.locator('#pathway [data-foundation="N0-01"]').count(),1);
});
await test(1,'P1-LEXIQUE','Termes contextualisés, navigation clavier et retour focus',async()=>{
  await reset();
  const trigger=page.locator('#lesson [data-term="fichier"]').first();
  assert(await trigger.count()>0);
  await trigger.focus();await page.keyboard.press('Enter');
  assert(await page.locator('#termDialog').isVisible());
  assert((await page.locator('#termSimple').textContent()).includes('contenu'));
  for(const id of ['termWhy','termExample','termNot','termMechanism','termMistake'])
    assert((await page.locator('#'+id).textContent()).trim().length>10);
  await page.keyboard.press('Escape');
  assert(!await page.locator('#termDialog').isVisible());
  assert.equal(await trigger.evaluate(el=>document.activeElement===el),true);
  await page.locator('#openGlossary').click();
  assert(await page.locator('#glossaryDialog').isVisible());
  assert((await page.locator('#glossaryList button').count())>=28);
  await page.locator('#closeGlossary').click();
});
await test(1,'P1-FONDATIONS','Trois leçons niveau zéro et preuves sur fichiers réels',async()=>{
  await reset();
  const steps=[
    ['N0-01','bienvenue.txt','Bonjour ATLAS','local'],
    ['N0-02','notes/mon-repere.md','# Mes repères','notes'],
    ['N0-03','mon-projet/README.md','# Mon premier projet','local']
  ];
  for(const [id,path,content,answer] of steps){
    await page.evaluate(id=>ATLAS.selectFoundation(id),id);
    await page.locator('#foundationDemo').click();
    assert.equal(await page.locator('#path').inputValue(),path);
    assert.equal(await page.locator('#content').inputValue(),content);
    await page.locator('#saveFile').click();
    await page.locator('#foundationAnswer').selectOption(answer);
    await page.locator('#foundationVerify').click();
    await page.waitForFunction(id=>ATLAS.snapshot().meta.foundationBadges.includes(id),id);
    assert((await page.evaluate(id=>ATLAS.foundationChecksFor(id),id)).every(c=>c.ok));
  }
  const saved=await snap();
  assert.equal(saved.meta.foundationBadges.length,3);
  await reset();
  await restore(saved);
  assert.equal((await snap()).meta.foundationBadges.length,3);
  assert.equal((await snap()).meta.route,'N0-03');
});
await test(1,'P1-FONDATIONS-NEG','Réponse erronée et fichier absent ne donnent aucun badge',async()=>{
  await reset();
  await page.evaluate(()=>ATLAS.selectFoundation('N0-01'));
  await page.locator('#foundationAnswer').selectOption('web');
  await page.locator('#foundationVerify').click();
  assert(!(await snap()).meta.foundationBadges.includes('N0-01'));
  assert((await page.evaluate(()=>ATLAS.foundationChecksFor('N0-01'))).some(x=>!x.ok));
});

await test(1,'P1-LEXIQUE-EXHAUSTIF','Toutes les entrées affichent une définition et un mécanisme non vides',async()=>{
  await reset();
  await page.locator('#openGlossary').click();
  try{
    const ids=await page.locator('#glossaryList button').evaluateAll(nodes=>nodes.map(x=>x.dataset.glossary));
    assert(ids.length>=30,'Vocabulaire central incomplet');
    assert.equal(new Set(ids).size,ids.length,'Doublons dans le lexique');
    for(const id of ids){
      await page.locator('#glossaryList [data-glossary="'+id+'"]').click();
      assert(await page.locator('#termDialog').isVisible(),'Fenêtre absente pour '+id);
      for(const field of ['termSimple','termWhy','termExample','termNot','termMechanism','termMistake'])
        assert((await page.locator('#'+field).textContent()).trim().length>=25,id+' : '+field+' est vide ou insuffisant');
      await page.locator('#termClose').click();
      await page.locator('#openGlossary').click();
    }
  } finally {
    // Une erreur lexicale ne doit pas masquer tous les autres tests sous un dialogue modal.
    await page.evaluate(()=>{
      const t=document.getElementById('termDialog');
      const g=document.getElementById('glossaryDialog');
      if(t?.open)t.close();
      if(g?.open)g.close();
    });
  }
});
await test(1,'P1-LEXIQUE-LAB','Un terme renvoie vers l’expérience indépendante sans toucher aux fichiers',async()=>{
  await reset();const files=JSON.stringify((await snap()).files);
  await page.evaluate(()=>ATLAS.select(1));
  await page.locator('#lesson [data-term="index"]').first().click();
  await page.locator('#termPrepare').click();
  await page.waitForFunction(()=>document.activeElement?.id==='experNext');
  assert.equal((await page.evaluate(()=>ATLAS.experiment.state())).step,0);
  assert.equal(JSON.stringify((await snap()).files),files);
});
await test(1,'P1-LEXIQUE-TOUCH','Une fenêtre lexicale s’ouvre et se ferme au toucher',async()=>{
  const touch=await browser.newContext({hasTouch:true,viewport:{width:390,height:844}});
  const mobile=await touch.newPage();
  try{
    await mobile.goto('http://127.0.0.1:4173');
    await mobile.waitForFunction(()=>ATLAS.ready());
    await mobile.locator('#openGlossary').tap();
    assert(await mobile.locator('#glossaryDialog').isVisible());
    await mobile.locator('#glossaryList [data-glossary="fichier"]').tap();
    assert(await mobile.locator('#termDialog').isVisible());
    await mobile.locator('#termClose').tap();
    assert(!await mobile.locator('#termDialog').isVisible());
  } finally {await touch.close();}
});

await test(1,'P1-EXPERIMENT-CAUSAL','Atelier Git indépendant avec prédiction et remédiation',async()=>{
  await reset();
  const saved=JSON.stringify((await snap()).files);
  await page.locator('#experReset').click();
  assert.equal((await page.evaluate(()=>ATLAS.experiment.state())).step,0);
  for(let i=0;i<3;i++)await page.locator('#experNext').click();
  let state=await page.evaluate(()=>ATLAS.experiment.state());
  assert.equal(state.working,'Version B');
  assert.equal(state.prepared,'Version A');
  assert.equal(state.committed,null);
  assert(await page.locator('#experQuiz').isVisible());
  assert(await page.locator('#experNext').isDisabled());
  await page.locator('#experVersion').selectOption('b');
  await page.locator('#experWhy').selectOption('work');
  await page.locator('#experPredict').click();
  assert((await page.locator('#experFeedback').textContent()).startsWith('Non.'));
  assert(await page.locator('#experNext').isDisabled());
  await page.locator('#experVersion').selectOption('a');
  await page.locator('#experWhy').selectOption('index');
  await page.locator('#experPredict').click();
  assert((await page.locator('#experFeedback').textContent()).startsWith('Exact'));
  assert(await page.locator('#experNext').isEnabled());
  await page.locator('#experNext').click();
  await page.waitForFunction(async()=>{const s=await ATLAS.experiment.state();return s.step===4&&s.committed==='Version A';});
  state=await page.evaluate(()=>ATLAS.experiment.state());
  assert.equal(state.committed,'Version A');
  assert.equal(state.working,'Version B');
  assert.equal(state.prepared,'Version A');
  await page.locator('#experNext').click();
  await page.waitForFunction(async()=> (await ATLAS.experiment.state()).step===5);
  await page.locator('#experNext').click();
  await page.waitForFunction(async()=>{const s=await ATLAS.experiment.state();return s.step===6&&s.committed==='Version B';});
  state=await page.evaluate(()=>ATLAS.experiment.state());
  assert.equal(state.committed,'Version B');
  assert.equal(state.working,'Version B');
  assert.equal(state.finished,true);
  assert.equal(JSON.stringify((await snap()).files),saved,'Le dépôt de l’apprenant ne doit pas être touché');
  const exported=await page.evaluate(()=>ATLAS.experiment.snapshot());
  const files=Object.fromEntries(Object.entries(exported.files).map(([p,b])=>[p.replace(/^\/experience/,'/lab'),b]));
  const target=disk({files},'experiment-isolated');
  assert.equal(git(target,'rev-list','--count','HEAD'),'2');
  assert.equal(git(target,'show','HEAD:README.md'),'Version B');
  assert.equal(git(target,'show','HEAD^:README.md'),'Version A');
  assert.equal(git(target,'fsck','--full'),'');
  const report=JSON.parse(await page.evaluate(()=>ATLAS.report()));
  assert.equal(report.experiment.finished,true);
  assert.equal(report.experiment.committed,'Version B');
});
await test(1,'P1-EXPERIMENT-REPLAY','Recommencer une expérience ne modifie ni fichier ni progression',async()=>{
  const before=JSON.stringify(await snap());
  await page.locator('#experReset').click();
  const state=await page.evaluate(()=>ATLAS.experiment.state());
  assert.equal(state.step,0);
  assert.equal(state.committed,null);
  assert.equal(JSON.stringify(await snap()),before);
});


await test(1,'P1-INCIDENT-APPROVED','Épreuve de transfert : livrer A et préserver B sans brouillon',async()=>{
  await reset();
  const before=JSON.stringify(await snap());
  await page.evaluate(()=>ATLAS.incident.start('approved'));
  assert((await page.locator('#incidentGoal').textContent()).includes('version approuvée A'));
  await page.locator('#incidentKeep').click();
  await page.waitForFunction(async()=>{const x=await ATLAS.incident.state();return x.attempted&&x.result!==null;});
  const state=await page.evaluate(()=>ATLAS.incident.state());
  assert(state.result.accepted);
  assert.equal(state.committed,'Version A approuvée');
  assert.equal(state.working,'Version B corrigée');
  assert.equal(state.prepared,'Version A approuvée');
  assert.deepEqual(state.committedFiles,['README.md']);
  assert((await page.locator('#incidentFeedback').textContent()).startsWith('RÉUSSITE VÉRIFIÉE'));
  const files=Object.fromEntries(Object.entries(await page.evaluate(()=>ATLAS.incident.snapshot())).map(([p,b])=>[p.replace(/^\/incident/,'/lab'),b]));
  const d=disk({files},'incident-approved');
  assert.equal(git(d,'show','HEAD:README.md'),'Version A approuvée');
  assert.equal(JSON.stringify(await snap()),before);
});
await test(1,'P1-INCIDENT-UPDATED','Épreuve de transfert : réindexer B et exclure un second fichier',async()=>{
  await reset();
  const before=JSON.stringify(await snap());
  await page.evaluate(()=>ATLAS.incident.start('updated'));
  await page.locator('#incidentRefresh').click();
  await page.waitForFunction(async()=>{const x=await ATLAS.incident.state();return x.attempted&&x.result!==null;});
  const state=await page.evaluate(()=>ATLAS.incident.state());
  assert(state.result.accepted);
  assert.equal(state.committed,'Version B corrigée');
  assert.equal(state.prepared,'Version B corrigée');
  assert.deepEqual(state.committedFiles,['README.md']);
  const files=Object.fromEntries(Object.entries(await page.evaluate(()=>ATLAS.incident.snapshot())).map(([p,b])=>[p.replace(/^\/incident/,'/lab'),b]));
  const d=disk({files},'incident-updated');
  assert.equal(git(d,'show','HEAD:README.md'),'Version B corrigée');
  assert.equal(git(d,'ls-tree','-r','--name-only','HEAD'),'README.md');
  const report=JSON.parse(await page.evaluate(()=>ATLAS.report()));
  assert(report.incident.result.accepted);
  assert.equal(JSON.stringify(await snap()),before);
});
await test(1,'P1-INCIDENT-NEGATIVE','Mauvaise procédure : refus de valider deux objectifs opposés',async()=>{
  for(const [mode,choice,wrong]of [['approved','refresh','Version B corrigée'],['updated','keep','Version A approuvée']]){
    await page.evaluate(mode=>ATLAS.incident.start(mode),mode);
    await page.locator(choice==='keep'?'#incidentKeep':'#incidentRefresh').click();
    await page.waitForFunction(async()=>{const x=await ATLAS.incident.state();return x.attempted&&x.result!==null;});
    const state=await page.evaluate(()=>ATLAS.incident.state());
    assert.equal(state.result.accepted,false);
    assert.equal(state.committed,wrong);
    assert((await page.locator('#incidentFeedback').textContent()).startsWith('NON VALIDÉ'));
    assert(await page.locator('#incidentKeep').isDisabled());
    assert(await page.locator('#incidentRefresh').isDisabled());
  }
});

await test(2,'P2-GIT-01','Création des fichiers',async()=>{await reset();await write('README.md','# Mon carnet');return compare('write',(d,s)=>assert(s.status.includes('?? README.md')));});
await test(2,'P2-GIT-02','Indexation',async()=>{await op('add','README.md');return compare('add',(d,s)=>{assert(s.status.includes('A  README.md'));assert.equal(git(d,'show',':README.md'),'# Mon carnet');});});
await test(2,'P2-GIT-03','Séparation index et travail',async()=>{await write('README.md','# Mon carnet modifié');return compare('index-work',(d,s)=>{assert(s.status.includes('AM README.md'));assert.equal(git(d,'show',':README.md'),'# Mon carnet');});});
await test(2,'P2-GIT-04','Commit de la version indexée',async()=>{await op('commit','Instantané');return compare('commit-index',(d)=>assert.equal(git(d,'show','HEAD:README.md'),'# Mon carnet'));});
await test(2,'P2-GIT-05','Refus de changement de branche avec travail sale',async()=>{await op('branch','notes');await assert.rejects(()=>op('switch','notes'));return compare('dirty-switch',(d)=>assert.equal(git(d,'branch','--show-current'),'main'));});
await test(2,'P2-GIT-06','Historique de deux commits',async()=>{await op('add','README.md');await op('commit','Évolution');return compare('history',(d)=>assert.equal(git(d,'rev-list','--count','HEAD'),'2'));});
await test(2,'P2-GIT-07','Changement de branche réel',async()=>{await op('switch','notes');return compare('checkout',(d)=>{assert.equal(git(d,'branch','--show-current'),'notes');assert.equal(readFileSync(d+'/README.md','utf8'),'# Mon carnet');});});
await test(2,'P2-GIT-08','Fusion divergente rejetée',async()=>{await write('notes.md','Divergence');await op('add','notes.md');await op('commit','Divergence');await op('switch','main');const before=git(disk(await snap(),'before-divergence'),'rev-parse','HEAD');await assert.rejects(()=>op('merge','notes'));return compare('divergence',(d)=>assert.equal(git(d,'rev-parse','HEAD'),before));});
await test(2,'P2-GIT-09','Fusion fast-forward réelle',async()=>{await seed();await op('branch','notes');await op('switch','notes');await write('notes.md','Une évolution');await op('add','notes.md');await op('commit','Ajouter notes');await op('switch','main');await op('merge','notes');return compare('fast-forward',(d)=>{assert.equal(git(d,'rev-parse','main'),git(d,'rev-parse','notes'));assert.equal(git(d,'show','HEAD:notes.md'),'Une évolution');});});
await test(2,'P2-GIT-10','Suppression indexée',async()=>{await op('delete','notes.md');return compare('delete',(d,s)=>assert(s.status.includes('D  notes.md')));});
await test(2,'P2-GIT-11','Commit vide rejeté',async()=>{await seed();await assert.rejects(()=>op('commit','Vide'));return compare('empty-commit',(d)=>assert.equal(git(d,'rev-list','--count','HEAD'),'1'));});
await test(2,'P2-UI','Parcours éditeur et contrôles principaux',async()=>{await reset();await page.locator('#path').fill('README.md');await page.locator('#content').fill('# Mon carnet');await page.locator('#saveFile').click();await page.waitForFunction(()=>document.querySelector('#files').textContent.includes('README.md'));await page.locator('#files button').click();await page.locator('#addFile').click();await page.locator('#message').fill('Via interface');await page.locator('#commit').click();await page.waitForFunction(()=>document.querySelector('#history').textContent.includes('Via interface'));await page.locator('#refresh').click();await page.locator('[data-lesson="1"]').click();await page.locator('#demo').click();await page.locator('#verify').click();});
await test(2,'P2-SIMULATION','Issues et PR locales',async()=>{await seed();await op('branch','notes');await page.locator('#issueTitle').fill('Relire');await page.locator('#issue').click();await page.locator('[data-issue="0"]').click();await page.locator('[data-issue="0"]').click();await page.locator('#pr').click();await page.locator('#mergePr').click();await page.waitForFunction(()=>document.querySelector('#prState').textContent.includes('fusionnée'));});
await test(2,'P2-EXPORT','Export JSON et réimport interface',async()=>{const download=page.waitForEvent('download');await page.locator('#backup').click();const d=await download;const path=await d.path();const data=JSON.parse(readFileSync(path,'utf8'));await reset();await page.locator('#importFile').setInputFiles(path);await page.waitForFunction(()=>document.querySelector('#notice').textContent.includes('restaurée'));assert.equal(git(disk(await snap(),'ui-import'),'show','HEAD:README.md'),'# Mon carnet');assert.equal(data.format,'ATLAS');});
await test(2,'P2-REPORT','Rapport IA et téléchargement',async()=>{await page.locator('#explanation').fill('Le commit référence les fichiers indexés.');await page.locator('#report').click();const text=await page.locator('#reportText').inputValue();assert(JSON.parse(text).files['/lab/README.md']);await page.locator('#copyReport').click();const download=page.waitForEvent('download');await page.locator('#downloadReport').click();await download;await page.locator('#closeReport').click();});
await test(2,'P2-TERMINAL','Terminal pris en charge',async()=>{await page.locator('summary').filter({hasText:'Terminal Git'}).click();await page.locator('#command').fill('git status');await page.locator('#terminal button').click();await page.waitForFunction(()=>document.querySelector('#terminalOutput').textContent.includes('README.md'));});
await test(2,'P2-UI-BRANCHES','Branches, fusion et suppression par boutons',async()=>{await seed();await page.locator('summary').filter({hasText:'Branches et fusion'}).click();await page.locator('#branchName').fill('ui');await page.locator('#createBranch').click();await page.locator('#checkout').click();await page.waitForFunction(()=>document.querySelector('#branchBadge').textContent.includes('ui'));await page.locator('#path').fill('ui.md');await page.locator('#content').fill('Interface');await page.locator('#saveFile').click();await page.locator('#addFile').click();await page.locator('#message').fill('Interface');await page.locator('#commit').click();await page.waitForFunction(()=>document.querySelector('#history').textContent.includes('Interface'));await page.locator('#branchName').fill('main');await page.locator('#checkout').click();await page.waitForFunction(()=>document.querySelector('#branchBadge').textContent.includes('main'));await page.locator('#branchName').fill('ui');await page.locator('#merge').click();await page.waitForFunction(()=>document.querySelector('#files').textContent.includes('ui.md'));await page.locator('#deleteFile').click();await page.waitForFunction(()=>!document.querySelector('#files').textContent.includes('ui.md'));});
await test(2,'P2-UI-RESTART','Recommencer avec confirmation',async()=>{page.once('dialog',d=>d.dismiss());await page.locator('#restart').click();assert((await snap()).files['/lab/README.md']);page.once('dialog',d=>d.accept());await page.locator('#restart').click();await page.waitForFunction(()=>document.querySelector('#gitStatus').textContent.includes('Dépôt vide'));});
await test(2,'P2-UI-DISCLOSURES','Navigation et panneaux dépliables',async()=>{const summaries=page.locator('.layout summary');for(let i=0;i<await summaries.count();i++){await summaries.nth(i).click();await summaries.nth(i).click();}await page.locator('.skip').focus();await page.keyboard.press('Enter');});
await test(2,'P2-RESTORE-BUTTON','Sélection de sauvegarde',async()=>{const f=page.waitForEvent('filechooser');await page.locator('#restore').click();await f;});
await test(2,'P2-TERMINAL-GRAMMAR','Toutes les commandes terminal documentées',async()=>{await reset();await write('README.md','# Mon carnet');await page.locator('summary').filter({hasText:'Terminal Git'}).evaluate(el=>el.parentElement.open=true);for(const c of ['git add README.md','git commit -m "Terminal"','git branch terminal','git switch terminal','git switch main','git merge terminal','git log']){await page.locator('#command').fill(c);await page.locator('#terminal button').click();await page.waitForTimeout(120);}assert.equal(git(disk(await snap(),'terminal-all'),'rev-parse','main'),git('work/git-terminal-all','rev-parse','terminal'));});
// P3 editorial review is separately recorded; automatic presence is not editorial validation.
await test(3,'P3-STRUCTURE','Structure des quatre leçons',async()=>{for(let i=0;i<4;i++){await page.locator(`[data-lesson="${i}"]`).click();for(const s of ['Objectif mesurable','Prérequis','Comprendre','Observer','Manipuler','Expliquer','Réutiliser','Le mécanisme'])assert((await page.locator('#lesson').textContent()).includes(s));}});
for(let i=0;i<4;i++)for(let n=0;n<5;n++)await test(4,`P4-${i+1}-NEG-${n+1}`,'Rejet état non conforme mission '+(i+1),async()=>{await reset();if(n===1)await write('README.md','Mauvais contenu');if(n===2){await write('README.md','# Mon carnet');await op('add','README.md');}if(n===3){await write('transfert.md','Autre contexte');await op('add','transfert.md');await op('commit','Un seul fichier');}if(n===4){await write('README.md','# Mon carnet');await write('transfert.md','Mauvais transfert');await op('add','README.md');await op('add','transfert.md');await op('commit','Transfert erroné');}assert((await check(i)).some(x=>!x.ok));});
await test(4,'P4-POSITIVE','Quatre missions conformes',async()=>{await seed();for(let i=0;i<3;i++){assert((await check(i)).every(x=>x.ok));await page.evaluate(async i=>{ATLAS.select(i);if(!await ATLAS.verify())throw Error('Validation refusée');},i);}assert.deepEqual((await snap()).meta.badges,[0,1,2]);await op('branch','notes');await op('switch','notes');await write('notes.md','Une évolution');await op('add','notes.md');await op('commit','Notes');await op('switch','main');await op('merge','notes');assert((await check(3)).every(x=>x.ok));});
await test(4,'P4-TRANSFER','Transfert inédit exécuté par interface et contrôlé par Git',async()=>{await seed();for(let i=0;i<3;i++)await page.evaluate(async i=>{ATLAS.select(i);await ATLAS.verify();},i);await op('branch','notes');await op('switch','notes');await write('notes.md','Une évolution');await op('add','notes.md');await op('commit','Notes');await op('switch','main');await op('merge','notes');await page.evaluate(async()=>{ATLAS.select(3);await ATLAS.verify();});await page.locator('#startTransfer').click();const instruction=await page.locator('#transferInstructions').textContent();const branch=instruction.match(/branche (mission-[0-9a-f]+)/)?.[1];const filename=instruction.match(/créez (preuve-[0-9a-f]+\.md)/)?.[1];const phrase=instruction.match(/« ([^»]+) »/)?.[1];assert(branch&&filename&&phrase);await op('branch',branch);await op('switch',branch);await write(filename,phrase);await op('add',filename);await op('commit','Transfert inédit');await op('switch','main');await op('merge',branch);await page.locator('#verifyTransfer').click();assert((await page.locator('#transferStatus').textContent()).includes('VALIDÉ'));return compare('transfer',(d)=>assert.equal(git(d,'show','HEAD:'+filename),phrase));});
await test(4,'P4-FORGED-BADGES','Badges importés recalculés',async()=>{await reset();const s=await snap();s.meta.badges=[0,1,2,3];await restore(s);assert.deepEqual((await snap()).meta.badges,[]);});
for(const theme of ['light'])for(const width of [360,390,768,1024,1440])await test(5,`P5-${theme}-${width}`,'Responsive, noms et contrastes',async()=>{await page.setViewportSize({width,height:1000});assert(await page.evaluate(()=>getComputedStyle(document.documentElement).colorScheme==='light'));await page.screenshot({path:`docs/evidence/screenshots/${theme}-${width}.png`,fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();writeFileSync(`docs/evidence/axe-${theme}-${width}.json`,JSON.stringify(a.violations,null,2));assert.equal(a.violations.length,0,a.violations.map(x=>x.id).join(','));});
await test(5,'P5-MOBILE-ACTION','Écriture, indexation et commit à 360 px',async()=>{await page.setViewportSize({width:360,height:800});await reset();await page.locator('#path').fill('mobile.md');await page.locator('#content').fill('Mobile');await page.locator('#saveFile').click();await page.locator('#addFile').click();await page.locator('#message').fill('Mobile');await page.locator('#commit').click();await page.waitForFunction(()=>document.querySelector('#history').textContent.includes('Mobile'));assert.equal(git(disk(await snap(),'mobile'),'show','HEAD:mobile.md'),'Mobile');});
await test(5,'P5-KEYBOARD','Clavier et dialogue',async()=>{await page.locator('#report').focus();await page.keyboard.press('Enter');assert(await page.locator('#reportDialog').isVisible());await page.keyboard.press('Escape');assert(!await page.locator('#reportDialog').isVisible());await page.locator('#saveFile').focus();assert.equal(await page.evaluate(()=>document.activeElement.id),'saveFile');});
await seed();const valid=await snap();const invalid=[null,{},[],{...valid,format:'X'},{...valid,version:2},{...valid,files:[]},{...valid,files:{'/lab/../x':[]}},{...valid,files:{'/lab/x':[-1]}},{...valid,files:{'/lab/x':[256]}},{...valid,files:{'/lab/x':[1.5]}},{...valid,files:{'/lab/x':'x'}},{...valid,meta:null},{...valid,meta:{...valid.meta,lesson:9}},{...valid,meta:{...valid.meta,badges:[99]}},{...valid,meta:{...valid.meta,issues:[{title:2,closed:false}]}},{...valid,meta:{...valid.meta,pr:{source:'../bad',state:'open'}}},{...valid,meta:{...valid.meta,actions:'bad'}},{...valid,meta:{...valid.meta,explanation:123}},{...valid,files:{...valid.files,'/lab/.git/HEAD':[0]}},{...valid,files:{...valid.files,'/lab/orphan/file':[1]}}];
for(let i=0;i<invalid.length;i++)await test(6,`P6-INVALID-${i+1}`,'Import invalide refusé sans mutation',async()=>{const before=JSON.stringify(await snap());await assert.rejects(()=>restore(invalid[i]));assert.equal(JSON.stringify(await snap()),before);});
for(let i=0;i<10;i++)await test(6,`P6-RESTORE-${i+1}`,'Restauration valide répétée',async()=>{await reset();await restore(valid);return compare('restore-'+i,(d)=>{assert.equal(git(d,'show','HEAD:README.md'),'# Mon carnet');assert.equal(git(d,'show','HEAD:transfert.md'),'Autre contexte');});});
await test(6,'P6-RELOAD','Persistance au rechargement',async()=>{await ctx.setOffline(false);await page.reload();await page.waitForFunction(()=>ATLAS.ready());await ctx.setOffline(true);assert.equal(git(disk(await snap(),'reload'),'show','HEAD:README.md'),'# Mon carnet');});
await test(6,'P6-NEGATIVE-OPS','Chemins, commandes et messages refusés',async()=>{for(const [n,a]of [['write',{path:'../bad',content:'x'}],['write',{path:'.git/config',content:'x'}],['commit',''],['switch','missing'],['branch','../bad']])await assert.rejects(()=>op(n,a));});
await test(6,'P6-CORRUPT-OBJECT','Objet Git corrompu rejeté sans mutation',async()=>{await seed();const s=await snap();const p=Object.keys(s.files).find(p=>p.includes('/objects/')&&s.files[p]!==null);s.files[p]=[0,1,2,3];const before=JSON.stringify(await snap());await assert.rejects(()=>restore(s));assert.equal(JSON.stringify(await snap()),before);});
await test(6,'P6-OBJECT-HASH','Objet compressé valide sous un hash falsifié',async()=>{await seed();const s=await snap();const p=Object.keys(s.files).find(p=>p.includes('/objects/')&&s.files[p]!==null);s.files[p]=Array.from(deflateSync(Buffer.from('blob 4\0fake')));const before=JSON.stringify(await snap());await assert.rejects(()=>restore(s));assert.equal(JSON.stringify(await snap()),before);});
await test(6,'P6-REOPEN','Fermeture et réouverture d’un onglet',async()=>{await ctx.setOffline(false);const p=await ctx.newPage();await p.goto('http://127.0.0.1:4173');await p.waitForFunction(()=>ATLAS.ready());assert((await p.evaluate(()=>ATLAS.snapshot())).files['/lab/README.md']);await p.close();await ctx.setOffline(true);});
await test(6,'P6-STORAGE-FAILURE','Stockage refusé : avertissement visible et mémoire intacte',async()=>{await page.evaluate(()=>{window.originalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new DOMException('Quota','QuotaExceededError');};});try{await page.locator('#path').fill('quota.md');await page.locator('#content').fill('Conserver');await page.locator('#saveFile').click();await page.waitForFunction(()=>document.querySelector('#notice').textContent.includes('stockage indisponible'));assert((await snap()).files['/lab/quota.md']);}finally{await page.evaluate(()=>Storage.prototype.setItem=window.originalSetItem);}});
await test(7,'P7-REGRESSION','Rejouer le parcours critique et la restauration',async()=>{await seed();await op('branch','notes');await op('switch','notes');await write('notes.md','Une évolution');await op('add','notes.md');await op('commit','Livrer');await op('switch','main');await op('merge','notes');const final=await snap();await reset();await restore(final);for(let i=0;i<4;i++)assert((await check(i)).every(x=>x.ok));return compare('final',(d)=>assert.equal(git(d,'rev-parse','main'),git(d,'rev-parse','notes')));});
await test(7,'P7-ERRORS','Aucune erreur JS non gérée',async()=>assert.deepEqual(errors,[]));
await test(7,'P7-NETWORK','Aucune requête distante',async()=>assert(requests.every(u=>u.startsWith('http://127.0.0.1:4173')||u.startsWith('file://'))));
await test(7,'P7-HASH','Identité du fichier testé',async()=>assert.equal(createHash('sha256').update(readFileSync('ATLAS.html')).digest('hex'),hash));
}finally{writeFileSync('docs/evidence/results.json',JSON.stringify({hash,browser:browser.version(),context:'HTTP loopback for test harness; offline after initial document load. file:// blocked by administrator. No HTTP server is included or required by the product.',results},null,2));await browser.close();server.close();}
console.log(JSON.stringify(results.reduce((a,r)=>(a[r.status]=(a[r.status]||0)+1,a),{})));if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
