const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const base='4453accab2f44d9eee8369d22c6393136f29162b';
const read=s=>fs.readFileSync(path.join(root,'dist',s,'index.html'),'utf8');
const sitemap=fs.readFileSync(path.join(root,'dist/sitemap.xml'),'utf8');
for(const slug of ['endacopia-clocky','endacopia-items-guide','changelog']){
 const html=read(slug);
 const before=execFileSync('git',['show',`${base}:work/endacopia-guide-hub/${slug}/index.html`],{cwd:root,encoding:'utf8'});
 for(const re of [/<title>(.*?)<\/title>/,/<meta name="description" content="([^"]+)"/,/<link rel="canonical" href="([^"]+)"/])assert.equal(html.match(re)[1],before.match(re)[1],slug+' metadata');
 assert(/"dateModified"\s*:\s*"2026-09-21"/.test(html),slug+' modified date');
 assert(sitemap.includes(`<loc>https://www.endacopiaguide.com/${slug}/</loc><lastmod>2026-09-21</lastmod>`));
}
const items=read('endacopia-items-guide');
for(const s of ['id="wrench-core-key"','Transparent Mug','1vtzhrz','1v8fnne','1v8oo38','office-call-center-guide','cooler casing is open','not a universal fix','no general recovery method is confirmed'])assert(items.includes(s),s);
assert(!items.includes('not the exact key trigger'));
const clocky=read('endacopia-clocky');
for(const s of ['id="clocky-blocking-checks"','525387344813205437','1w26mn9','1vjwt7v','source accounts disagree','No fixed pixel target','not required'])assert(clocky.includes(s),s);
assert(!clocky.includes('<td>Do not hold guard continuously.'));
for(const f of ['assets/main.js','assets/styles.css','robots.txt'])assert.equal(fs.readFileSync(path.join(root,'dist',f),'utf8').replace(/\r/g,''),execFileSync('git',['show',`${base}:work/endacopia-guide-hub/${f}`],{cwd:root,encoding:'utf8'}).replace(/\r/g,''),f+' unchanged');
assert(!fs.existsSync(path.join(root,'dist/content-ops')));
console.log(JSON.stringify({result:'PASS',updatedPages:3,routeSources:true,conflictingAdviceQualified:true,datesMatch:true,trafficMetadataAndAdsUnchanged:true,scope:'Static checks, not gameplay reproduction'}));
