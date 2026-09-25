const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const base = 'ea2981c4e1e6f81450355ac9efb2fce314f9bb1f';
const read = p => fs.readFileSync(path.join(root, 'dist', p), 'utf8');
const before = p => execFileSync('git', ['show', `${base}:work/endacopia-guide-hub/${p}`], {cwd:root,encoding:'utf8'});
const sitemap = read('sitemap.xml');
for (const slug of ['endacopia-puzzle-solutions','endacopia-all-fish-guide','endacopia-walkthrough','changelog']) {
  const html = read(slug+'/index.html');
  const old = before(slug+'/index.html');
  for (const re of [/<title>(.*?)<\/title>/, /<meta name="description" content="([^"]+)"/, /<link rel="canonical" href="([^"]+)"/]) assert.equal(html.match(re)[1], old.match(re)[1]);
  assert.equal(html.match(/"dateModified"\s*:\s*"([^"]+)"/)[1], '2026-09-25');
  assert(sitemap.includes(`<loc>https://www.endacopiaguide.com/${slug}/</loc><lastmod>2026-09-25</lastmod>`));
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  assert(html.includes('G-NEY4H1D17M'));
  for (const id of old.matchAll(/\bid="([^"]+)"/g)) {
    if (id[1] !== 'next-guide-title') assert(html.includes(`id="${id[1]}"`),slug+' lost anchor '+id[1]);
  }
}
const puzzles=read('endacopia-puzzle-solutions/index.html');
for(const s of ['id="office-switch-puzzle"','Yellow on and every other switch off','Yellow off → Dark Blue on → Light Blue on → Purple on → Red on','No universal reset-button','current-build replay pending']) assert(puzzles.includes(s),s);
const fish=read('endacopia-all-fish-guide/index.html');
assert(fish.indexOf('id="all-fish-time-slots"') < fish.indexOf('data-next-guide="true"'));
assert.equal((fish.match(/data-next-guide="true"/g)||[]).length,1);
assert(!fish.includes("row\\'s"));
for(const s of ['id="fisherman-license"','id="fishing-method"','Jantic Fish and Colisa Lalia','id="lost-key-first"']) assert(fish.includes(s),s);
const walk=read('endacopia-walkthrough/index.html');
for(const s of ['id="chapter-1-route"','id="chapter-2-walkthrough"','id="chapter-3-route"','No knife for the Circus patient','Missing the red Bingo Ball','1woad6u']) assert(walk.includes(s),s);
for(const p of ['endacopia-meaning-lore/index.html','endacopia-clocky/index.html','how-long-to-beat-endacopia/index.html','endacopia-trapezist/index.html','assets/main.js','assets/styles.css','robots.txt']) assert.equal(read(p).replace(/\r/g,''),before(p).replace(/\r/g,''),p+' preserved');
assert.equal((sitemap.match(/<loc>/g)||[]).length,56);
assert(!fs.existsSync(path.join(root,'dist/content-ops')));
console.log(JSON.stringify({result:'PASS',pages:4,metadataPreserved:true,oldAnswersAndAnchorsPreserved:true,fishTableBeforeNavigation:true,adsUnchanged:true,scope:'Static regression, not gameplay or ranking proof'}));
