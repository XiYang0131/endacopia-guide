const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const base = '9e26981dd6881ed72dd23076abdb5182bc14b9fb';
const read = p => fs.readFileSync(path.join(root, 'dist', p), 'utf8');
const before = p => execFileSync('git', ['show', `${base}:work/endacopia-guide-hub/${p}`], {cwd:root,encoding:'utf8'});
const sitemap = read('sitemap.xml');
for (const slug of ['endacopia-meaning-lore','how-long-to-beat-endacopia','endacopia-trapezist','changelog']) {
  const html = read(slug+'/index.html');
  for (const re of [/<title>(.*?)<\/title>/, /<meta name="description" content="([^"]+)"/, /<link rel="canonical" href="([^"]+)"/]) assert.equal(html.match(re)[1], before(slug+'/index.html').match(re)[1]);
  const date = slug === 'changelog' ? '2026-09-25' : '2026-09-24';
  assert.equal(html.match(/"dateModified"\s*:\s*"([^"]+)"/)[1], date);
  assert(sitemap.includes(`<loc>https://www.endacopiaguide.com/${slug}/</loc><lastmod>${date}</lastmod>`));
}
for (const p of ['endacopia-clocky/index.html','assets/main.js','assets/styles.css','robots.txt']) assert.equal(read(p).replace(/\r/g,''),before(p).replace(/\r/g,''),p+' preserved');
const meaning = read('endacopia-meaning-lore/index.html');
for (const s of ['to look within','3773653390','not a verified dictionary definition','id="does-endacopia-mean-anything"','id="ending-c-meaning"']) assert(meaning.includes(s),s);
const time = read('how-long-to-beat-endacopia/index.html');
for (const s of ['not an average','not 23 extra hours','id="time-estimates"','id="plan-your-sessions"','1vt2szm']) assert(time.includes(s),s);
const trapezist = read('endacopia-trapezist/index.html');
for (const s of ['punch the incoming juggling balls','id="tent-entry-eyes"','1.01 patch notes','1839041357037913','No current-build bypass','id="avoid-route"']) assert(trapezist.includes(s),s);
assert.equal((sitemap.match(/<loc>/g)||[]).length,56);
assert(!fs.existsSync(path.join(root,'dist/content-ops')));
console.log(JSON.stringify({result:'PASS',editedPages:4,clockyPreserved:true,metadataPreserved:true,datesMatch:true,adsUnchanged:true,scope:'Content regression checks, not gameplay tests'}));
