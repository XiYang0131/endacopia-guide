const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, 'dist', p), 'utf8').replace(/\r/g, '');
const before = p => execFileSync('git', ['show', `dd99ca8:work/endacopia-guide-hub/${p}`], {cwd:root,encoding:'utf8'}).replace(/\r/g, '');
for(const slug of ['endacopia-items-guide','endacopia-soccer-ball']) {
  const html=read(slug+'/index.html'), old=before(slug+'/index.html');
  for(const re of [/<title>(.*?)<\/title>/, /<meta name="description" content="([^"]+)"/, /<link rel="canonical" href="([^"]+)"/]) assert.equal(html.match(re)[1],old.match(re)[1]);
  for(const m of old.matchAll(/\bid="([^"]+)"/g)) assert(html.includes(`id="${m[1]}"`),'lost anchor '+m[1]);
  for(const m of old.matchAll(/href="(https:\/\/[^"#]+)"/g)) assert(html.includes(m[0]),'lost evidence link '+m[1]);
  assert(html.includes('"dateModified": "2026-10-04"'));
  assert(read('sitemap.xml').includes(`<loc>https://www.endacopiaguide.com/${slug}/</loc><lastmod>2026-10-04</lastmod>`));
}
const items=read('endacopia-items-guide/index.html');
assert(items.indexOf('id="metal-detector-route"') < items.indexOf('id="body-parts-answer-title"'));
assert(items.indexOf('id="wrench-core-key"') < items.indexOf('id="body-parts-answer-title"'));
assert(items.includes('href="#wrench-core-key"'));
const soccer=read('endacopia-soccer-ball/index.html');
assert(soccer.indexOf('id="soccer-troubleshooting"') < soccer.indexOf('<h2>Official Steam Media Reference'));
assert(soccer.includes('aria-label="Soccer goal shortcuts"'));
for(const p of ['endacopia-meaning-lore/index.html','endacopia-mellow/index.html','endacopia-telescope-puzzle/index.html','endacopia-puzzle-solutions/index.html','assets/main.js','assets/styles.css','robots.txt']) assert.equal(read(p),before(p),p+' must stay unchanged');
const js=read('assets/main.js');
const start=js.indexOf('document.querySelectorAll("[data-next-guide-link]")');
const end=js.indexOf('\ndocument.querySelectorAll',start+1);
const events=[];
const links=[...soccer.matchAll(/<a\b[^>]*data-next-guide-link[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(m=>({getAttribute:()=>m[1],textContent:m[2].replace(/<[^>]+>/g,''),addEventListener:(_,fn)=>fn()}));
vm.runInNewContext(js.slice(start,end),{document:{querySelectorAll:()=>links},window:{location:{pathname:'/endacopia-soccer-ball/'}},track:(name,params)=>events.push({name,...params})});
assert.equal(events.length,links.length); assert(links.length>=4);
for(const e of events){assert.equal(e.name,'next_guide_click');assert.equal(e.page_path,'/endacopia-soccer-ball/');assert(e.target_path.startsWith('/'));}
console.log('PASS: answer order, metadata, anchors, source links, unchanged observation pages/ads and next_guide_click payloads (static + isolated handler test; not browser/GA delivery)');
