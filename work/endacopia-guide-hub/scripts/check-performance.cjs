const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const js = fs.readFileSync(path.join(root, 'assets/main.js'), 'utf8');
const urls = [...fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)];
let panels = 0, images = 0;
for (const [,url] of urls) {
  const h = fs.readFileSync(path.join(root,new URL(url).pathname,'index.html'),'utf8');
  const panelCount = (h.match(/\bdata-next-guide(?:\s|=|>)/g)||[]).length;
  assert(panelCount <= 1, url + ' duplicate next guide');
  if (h.includes('data-helpful')) assert.equal(panelCount,1,url+' missing static guide');
  panels += panelCount;
  const ids = [...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,url+' duplicate ID');
  for (const [,tag] of h.matchAll(/(<img\b[^>]*>)/g)) {
    assert(/width="\d+"/.test(tag)&&/height="\d+"/.test(tag),url+' image dimensions');
    assert(!(/loading="lazy"/.test(tag)&&/fetchpriority="high"/.test(tag)),url+' conflicting priority');
    images++;
  }
  for(const [,srcset] of h.matchAll(/srcset="([^"]+)"/g))for(const candidate of srcset.split(','))assert(fs.existsSync(path.join(root,candidate.trim().split(' ')[0])),url+' srcset');
  const sidebar=h.slice(h.indexOf('<aside'));
  if(h.includes('<aside'))for(const [tag] of sidebar.matchAll(/<img\b[^>]+>/g))assert(tag.includes('loading="lazy"'),url+' eager sidebar');
  for(const [preload] of h.matchAll(/<link rel="preload" as="image"[^>]*>/g))assert(preload.includes('media="(min-width: 921px)"'),url+' mobile key-art preload');
  assert(h.includes('main.js?v=20260918-performance'),url+' stale JS reference');
}
// Isolated interaction tests: no browser, network, ads or analytics requests.
const frames=[]; const events=[]; const listeners={}; let reads=0;
const cards=['Telescope guide','Clocky guide'].map(text=>({get textContent(){reads++;return text;},hidden:false,classList:{toggle(name,value){this.hidden=value;}}}));
const input={value:'',addEventListener(name,fn){listeners[name]=fn;}};
const empty={hidden:true};
const window={requestAnimationFrame(fn){frames.push(fn);return frames.length;},innerHeight:100,scrollY:0,addEventListener(name,fn){listeners[name]=fn;},removeEventListener(name){delete listeners[name];},location:{pathname:'/test/'}};
const flush=()=>{const queue=frames.splice(0);queue.forEach(fn=>fn());};
const ctx={window,searchInput:input,cards,searchEmpty:empty,track:(name,params)=>events.push({name,params})};
vm.runInNewContext(js.slice(js.indexOf('if (searchInput && cards.length > 0)'),js.indexOf('const homeTabs =')),ctx);
input.value='te';listeners.input();input.value='clocky';listeners.input();assert.equal(frames.length,1);flush();
assert.equal(cards[0].classList.hidden,true);assert.equal(cards[1].classList.hidden,false);assert.equal(empty.hidden,true);assert.equal(reads,2);
input.value='missing';listeners.input();flush();assert.equal(empty.hidden,false);
input.value='';listeners.input();flush();assert(cards.every(c=>!c.classList.hidden));assert.equal(events.filter(e=>e.name==='guide_search_used').length,1);
vm.runInNewContext(js.slice(js.indexOf('let scrolledHalf ='),js.indexOf('const checklist =')),{window,document:{documentElement:{scrollHeight:1100}},track:ctx.track});
window.scrollY=600;listeners.scroll();listeners.scroll();assert.equal(frames.length,1);flush();
window.scrollY=950;listeners.scroll();flush();assert.equal(listeners.scroll,undefined);
assert.equal(events.filter(e=>e.name==='guide_scroll_50').length,1);assert.equal(events.filter(e=>e.name==='guide_scroll_90').length,1);
console.log(JSON.stringify({pages:urls.length,staticPanels:panels,images,searchAndScroll:'PASS',note:'Not a Lighthouse or field CWV score'}));
