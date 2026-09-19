const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.resolve(__dirname,'..');
const root=process.argv[2]?path.resolve(process.argv[2]):path.join(repo,'work/endacopia-guide-hub');
const retired=['endacopia-prologue-walkthrough','endacopia-secret-ending','endacopia-stay-achievement'];
const destinations=['endacopia-beginner-guide','endacopia-ending-c-complete-route','endacopia-ending-c-complete-route'];
const config=JSON.parse(fs.readFileSync(path.join(repo,'vercel.json'),'utf8'));
const sourceConfig=JSON.parse(fs.readFileSync(path.join(repo,'work/endacopia-guide-hub/vercel.json'),'utf8'));
assert.deepEqual(config.redirects,sourceConfig.redirects,'Deployment configs must agree');
retired.forEach((s,i)=>{
 assert(!fs.existsSync(path.join(root,s,'index.html')),'Retired article still served: '+s);
 const rules=config.redirects.filter(r=>r.source==='/'+s+'/');assert.equal(rules.length,1);
 assert.equal(rules[0].permanent,true);assert.equal(rules[0].destination,'https://www.endacopiaguide.com/'+destinations[i]+'/');
 assert(!retired.includes(new URL(rules[0].destination).pathname.split('/')[1]),'Redirect chain');
});
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const entries=[...sitemap.matchAll(/<loc>(.*?)<\/loc><lastmod>(.*?)<\/lastmod>/g)];assert.equal(entries.length,56);assert.equal(new Set(entries.map(m=>m[1])).size,56);
let links=0;
for(const [,url,date] of entries){
 const file=path.join(root,new URL(url).pathname,'index.html'),h=fs.readFileSync(file,'utf8');
 assert.equal((h.match(/<h1[ >]/g)||[]).length,1,url+' H1');
 assert(h.includes('rel="canonical" href="'+url+'"'),url+' canonical');
 assert(h.includes('G-NEY4H1D17M'),url+' tracking');
 assert(!/<meta[^>]+name="robots"[^>]+noindex/i.test(h),url+' noindex');
 const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,url+' duplicate ID');
 for(const old of retired)assert(!h.includes('/'+old+'/'),url+' retired internal reference');
 for(const [img]of h.matchAll(/<img\b[^>]*>/g))assert(/\balt="[^"]*"/.test(img),url+' alt');
 for(const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
 const dates=[...h.matchAll(/"dateModified":\s*"([^"]+)"/g)].map(m=>m[1]);assert(dates.length&&dates.every(d=>d===date),url+' date mismatch');
 for(const [,href]of h.matchAll(/href="([^"\s]+)"/g)){
  if(!href.startsWith('/')&&!href.startsWith('#')&&!href.startsWith('https://www.endacopiaguide.com/'))continue;
  const target=new URL(href,url);let p=path.join(root,decodeURIComponent(target.pathname));if(target.pathname.endsWith('/'))p=path.join(p,'index.html');
  assert(fs.existsSync(p),url+' broken link '+href);links++;
  if(target.hash&&p.endsWith('.html'))assert(fs.readFileSync(p,'utf8').includes('id="'+decodeURIComponent(target.hash.slice(1))+'"'),url+' broken anchor '+href);
 }
}
const beginner=fs.readFileSync(path.join(root,'endacopia-beginner-guide/index.html'),'utf8');assert(beginner.includes('id="house-puzzle"'),'Legacy fragment lost');
const ending=fs.readFileSync(path.join(root,'endacopia-ending-c-complete-route/index.html'),'utf8');assert(ending.includes('id="stay-achievement"'));
const data=JSON.parse(ending.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const faq=data['@graph'].find(n=>n['@type']==='FAQPage');assert.equal(faq.mainEntity.length,5);
for(const q of faq.mainEntity){assert(ending.includes('<h3>'+q.name+'</h3>'));assert(ending.includes('<p>'+q.acceptedAnswer.text+'</p>'));}
assert(data['@graph'].find(n=>n['@type']==='HowTo').step[1].text.includes('replay pending'));
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');for(const dest of new Set(destinations))assert.equal([...home.matchAll(/<a class="guide-card" data-guide-card href="([^"]+)"/g)].filter(m=>m[1]==='/'+dest+'/').length,1,'Duplicate card '+dest);
assert(fs.readFileSync(path.join(root,'robots.txt'),'utf8').includes('https://www.endacopiaguide.com/sitemap.xml'));
console.log(JSON.stringify({result:'PASS',pages:56,retiredRoutes:3,internalLinksAndAnchors:links,faqMatchesVisible:5,legacyHouseAnchor:'preserved',scope:'Static checks; production HTTP redirects must be verified separately'}));
