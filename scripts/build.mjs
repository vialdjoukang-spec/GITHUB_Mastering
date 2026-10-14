import {build} from 'esbuild';
import {readFileSync,writeFileSync} from 'node:fs';
const result=await build({entryPoints:['src/app.js'],bundle:true,inject:['src/shim.js'],write:false,platform:'browser',format:'iife',minify:true,legalComments:'inline',metafile:true});
let html=readFileSync('src/index.html','utf8').replace('/*STYLE*/',readFileSync('src/style.css','utf8')).replace('/*SCRIPT*/',()=>result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script'));
html=html.replace('</body>',()=>'<script type="application/json" id="third-party-notices">'+JSON.stringify(readFileSync('src/THIRD_PARTY_NOTICES.txt','utf8')).replace(/</g,'\\u003c')+'</script></body>');
writeFileSync('ATLAS.html',html);writeFileSync('docs/evidence/bundle-inputs.json',JSON.stringify(result.metafile,null,2));console.log('ATLAS.html',Buffer.byteLength(html),'bytes');
