// One-off, idempotent editorial cleanup. Never changes routes, ads or published dates.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const site = path.join(root, 'work/endacopia-guide-hub');
const sitemapPath = path.join(site, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const edited = [];
const manual = new Set(['endacopia-mellow','endacopia-characters','endacopia-name-puzzle-flashlight','endacopia-office-secret','endacopia-telescope-puzzle','endacopia-meaning-lore','endacopia-ending-c-not-triggering','endacopia-ending-c-complete-route','endacopia-full-game','endacopia-timesville-fishing-guide','endacopia-screenshot-checklist','about','games-like-endacopia','changelog']);
const reviewed = new Set(['endacopia-mellow','endacopia-characters','endacopia-name-puzzle-flashlight','endacopia-office-secret','endacopia-telescope-puzzle','endacopia-meaning-lore']);
const plain = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
for (const [, url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
  const slug = new URL(url).pathname.replace(/^\/|\/$/g, '');
  const file = path.join(site, slug, 'index.html');
  const before = fs.readFileSync(file, 'utf8');
  let h = before;
  h = h.replace(/<div>\s*<span>Next proof target<\/span>\s*<strong>[\s\S]*?<\/strong>\s*<\/div>/g, '');
  h = h.replace(/<h2>(?:Screenshot Checklist|Screenshot Proof Plan|Proof Shots To Capture|Proof Checklist|Search Keywords Covered|Related Searches Covered)<\/h2>\s*<ul class="shot-list">[\s\S]*?<\/ul>/g, '');
  h = h.replace(/<h2>Proof Targets For This Page<\/h2>\s*<div class="table-wrap">[\s\S]*?<\/div>/g, '');
  h = h.replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/g, figure => {
    if (!/\/assets\/(?:steam-media\/|endacopia-header)/.test(figure)) return figure;
    return figure.replace(/<figcaption>([\s\S]*?)<\/figcaption>/g, (whole, text) => /temporary|scaffold|Replace this|until (?:our|each|unlock)|should (?:be|land)|pages need|needs? (?:our|direct|route-specific|a (?:direct|self-captured))|still (?:needs|being replaced)|after capture|before publishing|searches should/.test(text) ? '<figcaption>Official promotional artwork; illustrative, not a recorded solution or achievement unlock for this step.</figcaption>' : whole);
  });
  h = h.replaceAll('<span class="badge">SEO</span>', '<span class="badge">Reference</span>')
    .replaceAll('High-Intent Questions Still Needing Proof', 'Unresolved Item Questions')
    .replaceAll('Open Search Questions Still Needing Proof', 'Questions with Unconfirmed Answers')
    .replaceAll('Question Keywords Covered', 'Common Item Questions')
    .replaceAll('Use the hydration tracker and the current proof target for this unlock.', 'Check the hydration route and its remaining uncertainty before replaying.')
    .replaceAll('Cautious three-hydration tracker with proof targets for the last unknown detail.', 'Three-hydration tracker with the unconfirmed step clearly marked.')
    .replaceAll('Real proof plan for route pages, assets, and future trust improvements.', 'Record the clue, clock and save state needed to diagnose a blocked route.')
    .replaceAll('Tracked as proof-needed until exact full-release steps are captured.', 'The exact full-release steps have not been confirmed by this site.')
    .replaceAll('Tracked as proof-needed; do not treat the room-picture route as fully verified yet.', 'The room-picture route is not yet independently verified.')
    .replaceAll('Tracked as proof-needed until the inventory and route-state conditions are captured.', 'The required inventory and route-state conditions remain unconfirmed.')
    .replaceAll('Not yet. This page explains the source-backed method and marks the exact answer table as a screenshot proof target.', 'Not yet. The method is source-backed, but this site has not captured a complete current-build answer sequence.')
    .replaceAll('a complete current-build theater-to-reward capture is still the proof target.', 'this site has not recorded the complete sequence through to the reward.');
  if (reviewed.has(slug)) h = h.replace(/(<span>Last checked<\/span>\s*<strong>)[^<]+(<\/strong>)/g, '$1September 19, 2026$2');
  // On edited answer pages, FAQ answers must be the visible answers, not old editorial notes.
  if (manual.has(slug)) {
    const article = h.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] || '';
    const questions = [...article.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].filter(m => plain(m[1]).endsWith('?')).map(m => ({'@type':'Question',name:plain(m[1]),acceptedAnswer:{'@type':'Answer',text:plain(m[2])}}));
    h = h.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (whole, open, json, close) => {
      const data = JSON.parse(json);
      const nodes = data['@graph'] || [data];
      for (const node of nodes) {
        if (node['@type'] === 'FAQPage' && questions.length) node.mainEntity = questions;
        if (node['@type'] === 'HowTo' && ['endacopia-name-puzzle-flashlight','endacopia-ending-c-complete-route'].includes(slug)) {
          const section = slug === 'endacopia-name-puzzle-flashlight' ? 'name-puzzle-steps' : 'ending-c-route-order';
          const list = article.match(new RegExp('<h2 id="'+section+'">[\\s\\S]*?<ol[^>]*>([\\s\\S]*?)<\\/ol>'))?.[1];
          if (!list) throw new Error('Missing visible steps '+slug);
          node.step = [...list.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m,i) => ({'@type':'HowToStep',position:i+1,name:plain(m[1].match(/<strong>([\s\S]*?)<\/strong>/)?.[1] || 'Step '+(i+1)),text:plain(m[1])}));
        }
      }
      return open+'\n'+JSON.stringify(data,null,2)+'\n'+close;
    });
  }
  // Include hand-edited articles and genuine cleanup only; never refresh every URL blindly.
  if (h !== before || manual.has(slug)) {
    h = h.replace(/("dateModified":\s*")[^"]+("\s*)/g, '$12026-09-19$2');
    h = h.replace(/Updated (?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, 2026/g, 'Updated September 19, 2026');
    sitemap = sitemap.replace('<loc>'+url+'</loc><lastmod>'+sitemap.match(new RegExp('<loc>'+url.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'</loc><lastmod>([^<]+)'))[1]+'</lastmod>', '<loc>'+url+'</loc><lastmod>2026-09-19</lastmod>');
    h = h.replace(/[ \t]+(?=\r?$)/gm, '');
    if (h !== before) fs.writeFileSync(file,h);
    edited.push(slug || '/');
  }
}
if (fs.readFileSync(sitemapPath,'utf8') !== sitemap) fs.writeFileSync(sitemapPath,sitemap);
console.log(JSON.stringify({editedPages:edited.length,slugs:edited,routeChanges:0,adChanges:0}));
