const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'work/endacopia-guide-hub');
const dist = path.join(root, 'dist');
const base = '93d1110e92437535d06a2fc07dd4b2e1ef84467a';
const read = p => fs.readFileSync(p,'utf8').replace(/\r/g,'');
const manifest = [...read(path.join(source,'sitemap.xml')).matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
const get = slug => read(path.join(dist,slug,'index.html'));
const text = s => s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();
let faqChecks=0;
for(const url of manifest){
  const slug = new URL(url).pathname.replace(/^\/|\/$/g,'');
  const relative = path.join(slug,'index.html');
  const h = get(slug);
  assert.equal(h,read(path.join(source,relative)),url+' stale build');
  const article = h.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1]||h;
  assert(!/Next proof target|<h2>(?:Screenshot Checklist|Search Keywords Covered|Question Keywords Covered|Proof Targets For This Page)<\/h2>|Only create if GSC|Future page/.test(article),url+' internal work order');
  const before = execFileSync('git',['show',base+':work/endacopia-guide-hub/'+relative.replaceAll('\\','/')],{cwd:root,encoding:'utf8'});
  if(slug!=='endacopia-screenshot-checklist'){
    assert.equal(h.match(/<title>(.*?)<\/title>/)[1],before.match(/<title>(.*?)<\/title>/)[1],url+' title changed');
    assert.equal(h.match(/<meta name="description" content="([^"]*)"/)[1],before.match(/<meta name="description" content="([^"]*)"/)[1],url+' description changed');
  }
  if(['endacopia-mellow','endacopia-characters','endacopia-name-puzzle-flashlight','endacopia-meaning-lore','endacopia-ending-c-not-triggering','endacopia-ending-c-complete-route','endacopia-telescope-puzzle'].includes(slug)){
    const visible=new Map([...article.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].map(m=>[text(m[1]),text(m[2])]));
    for(const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
      const data=JSON.parse(m[1]);
      for(const n of data['@graph']||[data])if(n['@type']==='FAQPage')for(const q of n.mainEntity){assert.equal(q.acceptedAnswer.text,visible.get(q.name),url+' FAQ mismatch: '+q.name);faqChecks++;}
    }
  }
}
for(const file of fs.readdirSync(dist,{recursive:true})){
  assert(!/(?:^|[\\/])(?:content-ops|scripts|\.git|node_modules)(?:[\\/]|$)|\.(?:md|jsonl?)$/i.test(file),'Internal file published: '+file);
}
assert.equal(manifest.length,56);
assert(get('endacopia-name-puzzle-flashlight').includes('SCRIBBLY'));
assert(get('endacopia-telescope-puzzle').includes('04:00'));
const office=get('endacopia-office-secret');
const rules=office.slice(office.indexOf('id="office-symbol-solutions"')).match(/<tbody>([\s\S]*?)<\/tbody>/)[1];
assert.equal((rules.match(/<tr>/g)||[]).length,7);
assert(!get('endacopia-ending-c-complete-route').includes("Melo's eyes"));
assert(!get('endacopia-ending-c-not-triggering').includes('Escape and Return unlocked before starting'));
assert(!get('endacopia-timesville-fishing-guide').includes('Nautilus, Colisa'));
assert(get('endacopia-timesville-fishing-guide').includes('/endacopia-all-fish-guide/#all-fish-time-slots'));
for(const f of ['assets/main.js','assets/styles.css'])assert.equal(read(path.join(source,f)),execFileSync('git',['show',base+':work/endacopia-guide-hub/'+f],{cwd:root,encoding:'utf8'}).replace(/\r/g,''),'Shared navigation/ads asset changed');
console.log(JSON.stringify({result:'PASS',pages:56,officeRules:7,faqAnswersMatchVisible:faqChecks,publicInternalFiles:0,unchangedTrafficURLs:true,sharedAdsAndNavigationUnchanged:true}));
