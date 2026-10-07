const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '../work/endacopia-guide-hub');
const read = slug => fs.readFileSync(path.join(root, slug, 'index.html'), 'utf8');
for(const slug of ['endacopia-puzzle-solutions','endacopia-telescope-puzzle']) {
  const current=read(slug);
  const old=execFileSync('git',['show',`72d3538:work/endacopia-guide-hub/${slug}/index.html`],{cwd:path.resolve(root,'../..'),encoding:'utf8'});
  for(const re of [/<title>(.*?)<\/title>/, /<meta name="description" content="([^"]+)"/, /<link rel="canonical" href="([^"]+)"/]) assert.equal(current.match(re)[1],old.match(re)[1]);
  for(const m of old.matchAll(/\bid="([^"]+)"/g)) assert(current.includes(`id="${m[1]}"`),'lost anchor '+m[1]);
  for(const m of old.matchAll(/href="(https:\/\/[^"#]+)"/g)) assert(current.includes(m[0]),'lost source '+m[1]);
  assert.equal(fs.readFileSync(path.resolve(root,'../../dist',slug,'index.html'),'utf8').replace(/\r/g,''),current.replace(/\r/g,''));
}
const h = read('endacopia-puzzle-solutions');
const data = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => {const d=JSON.parse(m[1]);return d['@graph']||[d];});
const question = data.find(d=>d['@type']==='FAQPage').mainEntity.find(q=>q.name==='Where are the Endacopia switch puzzle answers?');
const visible = h.match(/<h3>Where are the Endacopia switch puzzle answers\?<\/h3>\s*<p>([\s\S]*?)<\/p>/)[1].replace(/<[^>]+>/g,'');
assert.equal(question.acceptedAnswer.text,visible);
assert(visible.includes('only Yellow on'));
assert(visible.includes('current-build replay is pending'));
assert(!h.includes('Opening House Softlocks section'));
const telescope=read('endacopia-telescope-puzzle');
assert(!telescope.includes('save, restart, and retry'));
assert(telescope.includes('Do not overwrite your only save'));
assert(telescope.includes('Possible check, not a confirmed diagnosis'));
console.log('PASS: switch FAQ matches visible answer; Telescope troubleshooting preserves evidence boundaries and saves');
