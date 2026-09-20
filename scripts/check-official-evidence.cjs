const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const dir=path.join(root,'dist');
const base='a5fed8253c6868b7de9af7a9ef763a89d6475966';
const slugs=['endacopia-save-file-location','endacopia-items-guide','endacopia-achievements-guide','endacopia-water-break-achievement','endacopia-puzzle-solutions','endacopia-patch-notes','changelog'];
const get=s=>fs.readFileSync(path.join(dir,s,'index.html'),'utf8');
const sitemap=fs.readFileSync(path.join(dir,'sitemap.xml'),'utf8');
for(const slug of slugs){
 const html=get(slug);
 const before=execFileSync('git',['show',`${base}:work/endacopia-guide-hub/${slug}/index.html`],{cwd:root,encoding:'utf8'});
 for(const re of [/<title>(.*?)<\/title>/,/<meta name="description" content="([^"]+)"/,/<link rel="canonical" href="([^"]+)"/])assert.equal(html.match(re)[1],before.match(re)[1],slug+' changed traffic metadata');
 assert(html.match(/"dateModified"\s*:\s*"2026-09-20"/),slug+' date');
 assert(sitemap.includes(`<loc>https://www.endacopiaguide.com/${slug}/</loc><lastmod>2026-09-20</lastmod>`),slug+' sitemap');
 assert(!/Next proof task|Next evidence task|Query signal|before publishing a workaround|competitor's useful patch-note structure/.test(html),slug+' internal tasks');
}
const expected={
 'endacopia-save-file-location':['agssave.*','steamdb.info/app/2684630/ufs/','3773635669','689764519146161653','No backup, corrupt file'],
 'endacopia-items-guide':['id="sunflower-not-spawning"','689764519146161653','not proof of a universal Wrench or Core Key'],
 'endacopia-achievements-guide':['id="achievement-not-unlocking"','689764519146162333','gold soccer-ball ribbon'],
 'endacopia-water-break-achievement':['id="bottle-not-counting"','689764519146160697','does not promise retroactive credit'],
 'endacopia-puzzle-solutions':['Toy / marble puzzle','689764519146160469','not a new puzzle arrangement'],
 'endacopia-patch-notes':['id="official-recovery-notes"','historical fixes newly checked','not new September patches']
};
for(const [slug,needles]of Object.entries(expected))for(const x of needles)assert(get(slug).includes(x),slug+': '+x);
assert(!get('endacopia-water-break-achievement').includes('test the Mouse apartment variant'));
for(const f of ['assets/main.js','assets/styles.css','robots.txt'])assert.equal(fs.readFileSync(path.join(dir,f),'utf8').replace(/\r/g,''),execFileSync('git',['show',`${base}:work/endacopia-guide-hub/${f}`],{cwd:root,encoding:'utf8'}).replace(/\r/g,''),f+' changed');
assert(!fs.existsSync(path.join(dir,'content-ops')),'private operations exposed');
console.log(JSON.stringify({result:'PASS',updatedPages:7,canonicalUrlsUnchanged:true,titlesDescriptionsUnchanged:true,officialClaimSources:true,datesMatch:true,adsUnchanged:true,scope:'Static content regression, not gameplay reproduction or rich-result eligibility'}));
