// Isolated renderer QA. External analytics/ad requests are intentionally blocked.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/HONOR/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
const output=path.join(root,'work/endacopia-guide-hub/content-ops/verification-2026-09-19');
const urls=[...fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.xml':'application/xml','.txt':'text/plain','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
 const file=path.join(dist,pathname,pathname.endsWith('/')?'index.html':'');
 if(!path.resolve(file).startsWith(dist+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end('Not found');}
 res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const context=await browser.newContext();
 await context.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
 const page=await context.newPage();let checks=0;const issues=[],runtimeErrors=[];
 page.on('pageerror',e=>runtimeErrors.push(e.message));
 fs.mkdirSync(output,{recursive:true});
 try{
  for(const width of [1365,390]){
   await page.setViewportSize({width,height:900});
   for(const route of urls){
    const response=await page.goto(origin+route,{waitUntil:'load',timeout:15000});assert.equal(response.status(),200);
    const state=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,words:document.body.innerText.length,overflow:document.documentElement.scrollWidth-innerWidth,articleHasSidebar:!!document.querySelector('article aside, article footer'),sidebarParent:document.querySelector('aside')?.parentElement.className||null,brokenImages:[...document.images].filter(i=>i.loading!=='lazy'&&(!i.complete||i.naturalWidth===0)).length,overlay:!!document.querySelector('[data-nextjs-dialog],.vite-error-overlay')}));
    if(state.h1!==1||state.words<200||state.overflow>1||state.articleHasSidebar||state.brokenImages||state.overlay)issues.push({route,width,...state});
    if(['/endacopia-office-secret/','/endacopia-meaning-lore/','/endacopia-name-puzzle-flashlight/'].includes(route))await page.screenshot({path:path.join(output,route.split('/')[1]+'-'+width+'.png'),fullPage:false});
    checks++;
   }
  }
  const summary={checks,pages:urls.length,widths:[1365,390],issues,runtimeErrors:[...new Set(runtimeErrors)],externalRequests:'blocked for non-polluting QA',screenshots:6};
  fs.writeFileSync(path.join(output,'layout-results.json'),JSON.stringify(summary,null,2));
  console.log(JSON.stringify(summary));assert.equal(issues.length,0);assert.equal(runtimeErrors.length,0);
 }finally{await context.close();await browser.close();server.close();}
})().catch(e=>{console.error(e.message);server.close();process.exitCode=1;});
