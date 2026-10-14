import { chromium, firefox } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const html = readFileSync('ATLAS.html');
const sha256 = createHash('sha256').update(html).digest('hex');
const url = pathToFileURL(resolve('ATLAS.html')).href;
const results = [];
mkdirSync('docs/evidence', {recursive:true});

async function run(type, name) {
  const launch = name === 'chromium' ? {executablePath:'/usr/bin/chromium', args:['--no-sandbox']} : {};
  const browser = await type.launch(launch);
  const ctx = await browser.newContext({acceptDownloads:true, viewport:{width:390,height:844}});
  const page = await ctx.newPage();
  const exceptions = [], requests = [];
  page.on('pageerror',e => exceptions.push(e.message));
  page.on('request',r => requests.push(r.url()));
  try {
    const response = await page.goto(url);
    await page.waitForFunction(()=>window.ATLAS?.ready(), {timeout:15000});
    const theme = await page.evaluate(()=>getComputedStyle(document.documentElement).colorScheme);
    assert.equal(theme,'light', 'L’interface doit être exclusivement claire');
    assert.equal(await page.locator('#theme').count(),0);
    assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth), 'Débordement mobile');

    const op=(n,a)=>page.evaluate(([n,a])=>ATLAS.op(n,a),[n,a]);
    assert.equal(await page.locator('#pathway .academy-level').count(),6);
    assert.equal(await page.locator('#pathway [data-foundation]').count(),3);
    await page.locator('#openGlossary').click();
    assert(await page.locator('#glossaryDialog').isVisible());
    await page.locator('#closeGlossary').click();
    await page.evaluate(()=>ATLAS.selectFoundation('N0-01'));
    await page.locator('#foundationDemo').click();
    await page.locator('#saveFile').click();
    await page.locator('#foundationAnswer').selectOption('local');
    await page.locator('#foundationVerify').click();
    await page.waitForFunction(()=>ATLAS.snapshot().meta.foundationBadges.includes('N0-01'));
    assert((await page.evaluate(()=>ATLAS.foundationChecksFor('N0-01'))).every(x=>x.ok));
    await page.locator('#experReset').click();
    for(let i=0;i<3;i++)await page.locator('#experNext').click();
    let experiment=await page.evaluate(()=>ATLAS.experiment.state());
    assert.equal(experiment.working,'Version B');
    assert.equal(experiment.prepared,'Version A');
    await page.locator('#experVersion').selectOption('a');
    await page.locator('#experWhy').selectOption('index');
    await page.locator('#experPredict').click();
    await page.locator('#experNext').click();
    await page.waitForFunction(async()=> (await ATLAS.experiment.state()).committed==='Version A');
    experiment=await page.evaluate(()=>ATLAS.experiment.state());
    assert.equal(experiment.committed,'Version A');
    assert.equal(experiment.working,'Version B');
    // Aucun des gestes de l'expérience n'altère les fichiers du laboratoire principal.
    assert(!(await page.evaluate(()=>ATLAS.snapshot())).files['/lab/README.md']);
    await page.evaluate(()=>ATLAS.reset());
    await op('write',{path:'README.md',content:'# Mon carnet'});
    await op('write',{path:'transfert.md',content:'Autre contexte'});
    await op('add','README.md');
    await op('add','transfert.md');
    await op('commit','Initial');
    for (let i=0;i<3;i++) {
      assert((await page.evaluate(i=>ATLAS.checksFor(i),i)).every(x=>x.ok));
      await page.evaluate(async i=>{ATLAS.select(i);await ATLAS.verify();},i);
    }
    await op('branch','notes');
    await op('switch','notes');
    await op('write',{path:'notes.md',content:'Une évolution'});
    await op('add','notes.md');
    await op('commit','Ajouter notes');
    await op('switch','main');
    await op('merge','notes');
    assert((await page.evaluate(()=>ATLAS.checksFor(3))).every(x=>x.ok));
    await page.evaluate(async()=>{ATLAS.select(3);await ATLAS.verify();});
    await page.locator('#startTransfer').click();
    await page.waitForFunction(()=>{const t=ATLAS.snapshot().meta.transfer;const n=document.querySelector('#transferInstructions')?.textContent||'';return t&&n.includes(t.branch)&&n.includes(t.file)&&n.includes(t.phrase);});
    const instruction = await page.locator('#transferInstructions').textContent();
    const transfer = await page.evaluate(()=>ATLAS.snapshot().meta.transfer);
    assert(transfer?.branch&&transfer?.file&&transfer?.phrase, 'Défi non initialisé : '+instruction);
    const {branch,phrase,file:path} = transfer;
    assert(instruction.includes(branch)&&instruction.includes(path)&&instruction.includes(phrase),'Instructions du défi incomplet');
    await op('branch',branch);
    await op('switch',branch);
    await op('write',{path,content:phrase});
    await op('add',path);
    await op('commit','Défi inédit');
    await op('switch','main');
    await op('merge',branch);
    await page.locator('#verifyTransfer').click();
    await page.waitForFunction(()=>document.querySelector('#transferStatus')?.textContent.includes('VALIDÉ'));

    const before=await page.evaluate(()=>ATLAS.snapshot());
    const downloadPromise=page.waitForEvent('download', {timeout:15000});
    await page.locator('#backup').click();
    const dl=await downloadPromise;
    assert.equal(dl.suggestedFilename(),'ATLAS-sauvegarde.json');
    const after=await page.evaluate(()=>ATLAS.snapshot());
    assert.deepEqual(after.files,before.files);
    await page.evaluate(s=>ATLAS.restore(s),before);
    assert.deepEqual((await page.evaluate(()=>ATLAS.snapshot())).files,before.files);
    const report=JSON.parse(await page.evaluate(()=>ATLAS.report()));
    assert(report.history.length>=3, 'L’historique Git doit contenir trois commits');
    assert(Array.isArray(report.checks), 'Le rapport doit contenir les vérifications');

    await page.reload();
    await page.waitForFunction(()=>window.ATLAS?.ready(), {timeout:15000});
    const width=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);
    assert(width);
    assert.deepEqual(exceptions,[],'Exceptions JavaScript');
    assert(requests.every(u=>u.startsWith('file://')),'Aucune requête réseau');
    const status={name,version:browser.version(),file_url:url,sha256,theme,levels:true,glossary:true,foundation:true,git:true,transfer:true,restore:true,report:true,no_network:true,errors:exceptions,passed:true};
    results.push(status);
    console.log('PASS file://',name,browser.version());
  } catch(e) {
    results.push({name,version:browser.version(),file_url:url,sha256,passed:false,error:String(e.stack||e)});
    console.error('FAIL file://',name,e);
    process.exitCode=1;
  } finally {
    await ctx.close();
    await browser.close();
  }
}
try {
  await run(chromium,'chromium');
  await run(firefox,'firefox');
} finally {
  writeFileSync('docs/evidence/file-local.json',JSON.stringify({sha256,results},null,2));
}
