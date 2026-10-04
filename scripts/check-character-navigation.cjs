const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const base = '64d0cf41f4a75a4d8421cbde23fda764f125d840';
const read = p => fs.readFileSync(path.join(root,'dist',p),'utf8');
const before = p => execFileSync('git',['show',`${base}:work/endacopia-guide-hub/${p}`],{cwd:root,encoding:'utf8'}).replace(/\r\n/g,'\n');
for (const slug of ['endacopia-mellow','endacopia-puzzle-solutions','endacopia-telescope-puzzle','changelog']) {
  const html=read(slug+'/index.html');
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  assert(html.includes(`href="https://www.endacopiaguide.com/${slug}/"`));
  const date = slug === 'changelog' ? '2026-10-04' : '2026-09-30';
  assert(html.includes(`"dateModified": "${date}"`));
  assert(read('sitemap.xml').includes(`<loc>https://www.endacopiaguide.com/${slug}/</loc><lastmod>${date}</lastmod>`));
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
  for (const m of before(slug+'/index.html').matchAll(/\bid="([^"]+)"/g)) assert(html.includes(`id="${m[1]}"`),'lost anchor '+m[1]);
}
const mellow=read('endacopia-mellow/index.html');
assert(mellow.includes('<h1>Who Is Mellow in Endacopia?</h1>'));
assert(mellow.includes('https://andyl4nd.itch.io/endacopiademo'));
assert(mellow.indexOf('id="mellow-story"')<mellow.indexOf('Which Mellow Question'));
const telescope=read('endacopia-telescope-puzzle/index.html');
for(const id of ['telescope-route','telescope-not-working','star-wishes','other-constellations']) {
  assert(telescope.includes(`href="#${id}"`)); assert(telescope.includes(`id="${id}"`));
}
for(const slug of ['endacopia-puzzle-solutions','endacopia-telescope-puzzle']) {
  for(const re of [/<title>(.*?)<\/title>/, /<meta name="description" content="([^"]+)"/]) assert.equal(read(slug+'/index.html').match(re)[1],before(slug+'/index.html').match(re)[1]);
}
assert.equal(read('endacopia-meaning-lore/index.html').replace(/\r\n/g,'\n'),before('endacopia-meaning-lore/index.html'));
console.log('PASS: character intent, preserved metadata/anchors/Meaning and synchronized dates');
