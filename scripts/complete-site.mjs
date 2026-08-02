import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.join(process.cwd(), "work", "endacopia-guide-hub");
const site = "https://www.endacopiaguide.com";
const lastmod = "2026-08-02";
const version = "20260802-engagement";
const ogImage = `${site}/assets/og/endacopia-guide-og.jpg`;
const headerImage = "/assets/endacopia-header-20260730.jpg";

const footerLinks = '<span><a href="/">Home</a> | <a href="/about/">About</a> | <a href="/contact/">Contact</a> | <a href="/editorial-policy/">Editorial Policy</a> | <a href="/changelog/">Changelog</a> | <a href="/sitemap.xml">Sitemap</a></span>';

const basePages = [
  "",
  "endacopia-walkthrough",
  "endacopia-all-endings",
  "endacopia-secret-ending",
  "endacopia-ending-c-not-triggering",
  "endacopia-achievements-guide",
  "endacopia-100-percent-achievement-checklist",
  "endacopia-the-yeti-ending",
  "endacopia-characters",
  "endacopia-clocky",
  "endacopia-mellow",
  "endacopia-wiki",
  "endacopia-play",
  "endacopia-release-date",
  "endacopia-full-game",
  "endacopia-saw-box-code",
  "endacopia-stay-achievement"
];

const newGuides = [
  "endacopia-office-secret",
  "endacopia-277-5944",
  "endacopia-timesville-fishing-guide",
  "endacopia-all-fish-guide",
  "endacopia-misery-town-secret",
  "endacopia-chameleon-battle",
  "endacopia-save-file-location",
  "endacopia-water-break-achievement",
  "endacopia-screenshot-checklist",
  "endacopia-beginner-guide",
  "endacopia-prologue-walkthrough",
  "endacopia-demo-vs-full-game",
  "endacopia-puzzle-solutions",
  "endacopia-cheshire-password",
  "endacopia-let-me-go-let-me-talk",
  "endacopia-boss-fights-guide",
  "endacopia-map",
  "endacopia-scribbly",
  "endacopia-steam-deck",
  "endacopia-underground",
  "endacopia-trapezist",
  "about",
  "contact",
  "editorial-policy",
  "changelog"
];

function canonical(slug) {
  return slug ? `${site}/${slug}/` : `${site}/`;
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function metaBlock({ title, description, url, type = "article" }) {
  return [
    `    <meta property="og:type" content="${type}">`,
    '    <meta property="og:site_name" content="Endacopia Guide Hub">',
    `    <meta property="og:title" content="${esc(title)}">`,
    `    <meta property="og:description" content="${esc(description)}">`,
    `    <meta property="og:url" content="${esc(url)}">`,
    `    <meta property="og:image" content="${ogImage}">`,
    '    <meta property="og:image:width" content="1200">',
    '    <meta property="og:image:height" content="630">',
    '    <meta name="twitter:card" content="summary_large_image">',
    `    <meta name="twitter:title" content="${esc(title)}">`,
    `    <meta name="twitter:description" content="${esc(description)}">`,
    `    <meta name="twitter:image" content="${ogImage}">`
  ].join("\n");
}

function gaBlock() {
  return `    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-NEY4H1D17M"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-NEY4H1D17M');
    </script>`;
}

function nav() {
  return `    <header class="site-header">
      <nav class="nav" aria-label="Primary navigation">
        <a class="brand" href="/"><span class="brand-mark">E</span><span>Endacopia Guide Hub</span></a>
        <div class="nav-links">
          <a href="/endacopia-walkthrough/">Walkthrough</a>
          <a href="/endacopia-puzzle-solutions/">Puzzles</a>
          <a href="/endacopia-all-endings/">All Endings</a>
          <a href="/endacopia-achievements-guide/">Achievements</a>
          <a href="/endacopia-wiki/">Wiki</a>
        </div>
      </nav>
    </header>`;
}

function footer() {
  return `    <footer class="site-footer">
      <div class="container footer-grid">
        <span>Endacopia Guide Hub is an unofficial fan-made guide project.</span>
        ${footerLinks}
      </div>
    </footer>`;
}

function sidebar({ summary, badges = [], related = [], checks = [] }) {
  const badgeHtml = badges.map((badge, index) => `<span class="badge${index === 0 ? " hot" : index === 1 ? " safe" : ""}">${esc(badge)}</span>`).join("\n                ");
  const relatedHtml = related.map((item) => `<a href="${item.href}">${esc(item.label)}</a>`).join("\n            ");
  const checksHtml = checks.map((item) => `<li><span>${esc(item.label)}</span><strong>${esc(item.value)}</strong></li>`).join("\n              ");

  return `        <aside class="sidebar">
          <section class="side-panel game-card">
            <img src="${headerImage}" width="460" height="215" alt="Endacopia game key art" decoding="async" fetchpriority="high">
            <div class="game-card-body">
              <strong>Endacopia</strong>
              <span>${esc(summary)}</span>
              <div class="game-facts">
                ${badgeHtml}
              </div>
            </div>
          </section>
          <section class="side-panel">
            <h2>Related Guides</h2>
            ${relatedHtml}
          </section>
          <section class="side-panel">
            <h2>Fast Checks</h2>
            <ul class="status-list">
              ${checksHtml}
            </ul>
          </section>
        </aside>`;
}

function renderPage(page) {
  const url = canonical(page.slug);
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": page.schemaType || "Article",
    headline: page.title,
    description: page.description,
    url,
    image: ogImage,
    dateModified: lastmod,
    author: {
      "@type": "Organization",
      name: "Endacopia Guide Hub"
    },
    publisher: {
      "@type": "Organization",
      name: "Endacopia Guide Hub"
    }
  }, null, 8);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.description)}">
    <link rel="canonical" href="${url}">
${metaBlock({ title: page.title, description: page.description, url })}
    <link rel="preload" as="image" href="${headerImage}">
    <link rel="stylesheet" href="/assets/styles.css?v=${version}">
    <script type="application/ld+json">
${json}
    </script>
${gaBlock()}
  </head>
  <body>
${nav()}

    <main class="main">
      <div class="container content-layout">
        <article class="article">
          <span class="eyebrow">${esc(page.eyebrow)}</span>
          <h1>${esc(page.h1 || page.title)}</h1>
          <div class="meta-line">
            <span class="badge hot">Updated August 2, 2026</span>
            ${(page.badges || []).map((badge, index) => `<span class="badge${index === 0 ? " safe" : ""}">${esc(badge)}</span>`).join("\n            ")}
          </div>

          <div class="answer-box">
            <h2>Quick Answer</h2>
            <p>${page.quick}</p>
          </div>

${page.body}
        </article>

${sidebar(page.sidebar)}
      </div>
    </main>

${footer()}
    <script src="/assets/main.js?v=${version}"></script>
  </body>
</html>
`;
}

function mediaGrid(items) {
  const klass = items.length === 1 ? "media-grid media-single" : "media-grid";
  const figures = items.map((item) => `            <figure class="guide-media">
              <img src="/assets/steam-media/${item.file}" width="${item.width}" height="${item.height}" alt="${esc(item.alt)}" loading="lazy" decoding="async">
              <figcaption>${esc(item.caption)}</figcaption>
            </figure>`).join("\n");

  return `          <h2>Official Steam Media Reference</h2>
          <div class="${klass}">
${figures}
          </div>
          <div class="source-box">
            <p>These are official Steam store screenshots used as temporary visual references. Replace them with your own route-specific screenshots after capture.</p>
          </div>
`;
}

const pages = [
  {
    slug: "endacopia-office-secret",
    title: "Endacopia Office Secret Guide - 277-5944, Telescope, and Stairs",
    description: "Office secret route for Endacopia Ending C: reveal 277-5944 with the Telescope, call from Jobs, wait under the stairs, and finish the symbol puzzle.",
    eyebrow: "Office secret",
    badges: ["Ending C", "277-5944"],
    quick: 'For the Endacopia Office secret, bring the Telescope to the Office entrance area near the sleeping figure, reveal <code>277-5944</code>, call it from the Jobs app, then stand under the stairs near the vending machine for about one minute. Finish the hidden symbol sequence before leaving the Office route.',
    body: `
          <div class="spoiler-box">
            <h2>Spoiler Scope</h2>
            <p>This page covers the Office secret required for Stay / Ending C. It assumes you already have a near-complete Chapter I save and are deliberately chasing the hidden route.</p>
          </div>

${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-10.jpg",
    width: 1537,
    height: 868,
    alt: "Official Endacopia Steam screenshot showing Mellow using a telescope at night",
    caption: "Official Steam store screenshot showing the telescope mood used as a temporary reference for the Office phone-number route."
  },
  {
    file: "endacopia-official-steam-screenshot-08.jpg",
    width: 1533,
    height: 864,
    alt: "Official Endacopia Steam screenshot showing Mellow in an interior conversation scene with stairs",
    caption: "Official Steam store screenshot showing an interior route scene. Replace with the exact 277-5944 and stair-wait proof when captured."
  }
])}

          <h2>Office Route Steps</h2>
          <ol class="step-list">
            <li><strong>Bring the Telescope.</strong> Do not enter the Office route without the Telescope from Timesville; this secret depends on it.</li>
            <li><strong>Use it at the entrance area.</strong> Place or use the Telescope near the sleeping figure by the train/Office entrance to reveal the hidden phone number.</li>
            <li><strong>Call <code>277-5944</code>.</strong> Sit at the Office computer, open the Jobs app, and call the number from there.</li>
            <li><strong>Follow the message.</strong> The call points you to the stairs near the vending machine. Stand under that stair area for about one minute without leaving too early.</li>
            <li><strong>Finish the symbol room.</strong> After the hidden route opens, complete the symbol/decryption sequence before treating the Office flag as done.</li>
          </ol>

          <h2>Common Failure Points</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Problem</th><th>What To Check</th><th>Fix</th></tr></thead>
              <tbody>
                <tr><td>No number appears</td><td>Telescope position</td><td>Return to the entrance/sleeping figure area and make sure the Telescope is the active clue.</td></tr>
                <tr><td>The call seems useless</td><td>Wrong app or skipped audio/message</td><td>Use the Jobs computer route and stay long enough to receive the instruction.</td></tr>
                <tr><td>The secret still does not count</td><td>Stair wait or symbol sequence incomplete</td><td>Repeat the under-stairs wait, then finish every hidden puzzle screen that follows.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>What To Screenshot</h2>
          <ul class="shot-list">
            <li><strong>Telescope clue</strong><span>Phone number visible or the scene immediately after it appears.</span></li>
            <li><strong>Jobs call</strong><span>The phone/call interface with <code>277-5944</code>.</span></li>
            <li><strong>Stair wait</strong><span>Mellow standing under the vending-machine stairs.</span></li>
            <li><strong>Symbol chain</strong><span>Each puzzle page after the secret passage opens.</span></li>
          </ul>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p>Current public guides agree on the Telescope -> phone -> stairs chain, while exact puzzle-screen documentation is still being refined by the community.</p>
            <p><a href="https://www.neoseeker.com/endacopia/Chapter_3">Neoseeker Chapter 3</a> | <a href="https://ninewiki.com/endings/endacopia-all-endings/">ninewiki all endings</a> | <a href="https://tposegaming.com/endacopia-endings/">Tpose endings guide</a></p>
          </div>
`,
    sidebar: {
      summary: "Office Ending C route: Telescope clue, 277-5944 call, stair wait, and symbol checks.",
      badges: ["Office", "Ending C", "Secret"],
      related: [
        { href: "/endacopia-277-5944/", label: "277-5944 phone number" },
        { href: "/endacopia-ending-c-not-triggering/", label: "Ending C troubleshooting" },
        { href: "/endacopia-secret-ending/", label: "Secret ending guide" },
        { href: "/endacopia-save-file-location/", label: "Save backup location" }
      ],
      checks: [
        { label: "Number", value: "277-5944" },
        { label: "Tool", value: "Telescope" },
        { label: "Wait", value: "1 minute" },
        { label: "Route", value: "Stay" }
      ]
    }
  },
  {
    slug: "endacopia-277-5944",
    title: "Endacopia 277-5944 Phone Number - What It Does",
    description: "Fast answer for the Endacopia 277-5944 phone number, where to call it, and why it matters for the Office secret and Ending C.",
    eyebrow: "Phone clue",
    badges: ["Office", "Fast answer"],
    quick: '<code>277-5944</code> is the Office secret phone number in Endacopia. Reveal it with the Telescope, call it from the Jobs app on the Office computer, then follow the clue by waiting under the stairs near the vending machine.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-10.jpg",
    width: 1537,
    height: 868,
    alt: "Official Endacopia Steam screenshot showing Mellow looking through a telescope at night",
    caption: "Official Steam store screenshot used as a temporary visual reference for the Telescope step that leads to 277-5944."
  }
])}

          <h2>Where To Use 277-5944</h2>
          <p>The number belongs to an in-game Office route, not to a normal menu option. The useful sequence is Telescope clue first, Jobs app call second, stair wait third.</p>
          <ol class="step-list">
            <li><strong>Reveal the number in-game.</strong> Use the Telescope at the Office entrance area instead of trying random phone inputs early.</li>
            <li><strong>Open Jobs.</strong> The call is made from the Office computer/Jobs flow.</li>
            <li><strong>Wait under the stairs.</strong> After the call, stand below the stairs near the vending machine for roughly one minute.</li>
          </ol>

          <h2>Why The Number Matters</h2>
          <p>The phone number is one of the checks for the Office secret, and the Office secret is one of three area secrets used by the Stay / Ending C route. It does not replace the Misery Town or Timesville secrets.</p>

          <h2>Fast Troubleshooting</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Search Query</th><th>Answer</th><th>Next Page</th></tr></thead>
              <tbody>
                <tr><td>Endacopia 277-5944</td><td>Use it in the Jobs app after revealing it with the Telescope.</td><td><a href="/endacopia-office-secret/">Office secret guide</a></td></tr>
                <tr><td>Endacopia phone number not working</td><td>Check that the Telescope clue was seen and the call is made from the Office flow.</td><td><a href="/endacopia-ending-c-not-triggering/">Ending C troubleshooting</a></td></tr>
                <tr><td>Endacopia stairs clue</td><td>Stand under the stairs near the vending machine for about one minute.</td><td><a href="/endacopia-secret-ending/">Secret ending guide</a></td></tr>
              </tbody>
            </table>
          </div>

          <div class="spoiler-box">
            <h2>Do Not Treat This As A Real Phone Number</h2>
            <p>This page documents an Endacopia puzzle clue. Do not call, text, or reuse the number outside the game context.</p>
          </div>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://www.neoseeker.com/endacopia/Chapter_3">Neoseeker Chapter 3</a> | <a href="https://tposegaming.com/endacopia-endings/">Tpose endings guide</a></p>
          </div>
`,
    sidebar: {
      summary: "Fast reference for the Office phone clue and the next required action.",
      badges: ["277-5944", "Office", "Phone"],
      related: [
        { href: "/endacopia-office-secret/", label: "Office secret guide" },
        { href: "/endacopia-secret-ending/", label: "Secret ending guide" },
        { href: "/endacopia-ending-c-not-triggering/", label: "Ending C not triggering" }
      ],
      checks: [
        { label: "Use from", value: "Jobs app" },
        { label: "Before call", value: "Telescope" },
        { label: "After call", value: "Stairs" }
      ]
    }
  },
  {
    slug: "endacopia-timesville-fishing-guide",
    title: "Endacopia Timesville Fishing Secret Guide - Fish Paper and Lost Key",
    description: "Timesville secret guide for Endacopia Ending C: find the Fish Paper, catch all 18 fish, claim the key, and finish the windowed-mode shack step.",
    eyebrow: "Timesville secret",
    badges: ["18 fish", "Ending C"],
    quick: 'For the Timesville secret, use the Metal Detector to find the Fish Paper, catch all 18 unique fish across the six clock periods, inspect the paper to receive the key, return to the small monochrome shack, switch to windowed mode with <code>Alt+Enter</code>, and use the key on the revealed lock.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-05.jpg",
    width: 1536,
    height: 864,
    alt: "Official Endacopia Steam screenshot showing the fishing minigame",
    caption: "Official Steam store screenshot showing fishing gameplay. Replace with the completed Fish Paper and Lost Key proof when captured."
  },
  {
    file: "endacopia-official-steam-screenshot-06.jpg",
    width: 1534,
    height: 865,
    alt: "Official Endacopia Steam screenshot showing Mellow inside a Timesville room",
    caption: "Official Steam store screenshot used as a Timesville room reference for the hidden shack route."
  }
])}

          <h2>Timesville Secret Route</h2>
          <ol class="step-list">
            <li><strong>Get the Fishing Paper.</strong> Use the Metal Detector on the sand after the Timesville route gives you access to the beach search.</li>
            <li><strong>Catch every fish.</strong> The secret uses the full 18-fish requirement, not only the six fish needed for the aquarium.</li>
            <li><strong>Inspect the paper again.</strong> After the fish list is complete, the paper should produce the key for the hidden shack step.</li>
            <li><strong>Return to the small shack.</strong> Use the smaller of the two lookalike rooms from the shared-room puzzle area.</li>
            <li><strong>Switch to windowed mode.</strong> Use <code>Alt+Enter</code> when the hidden clue points you toward windowed mode.</li>
            <li><strong>Use the key.</strong> Re-enter the room after switching modes and use the key on the revealed lock.</li>
          </ol>

          <h2>Fishing vs Secret Requirements</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Goal</th><th>Required Fish</th><th>Why</th></tr></thead>
              <tbody>
                <tr><td>Aquarium progression</td><td>6 fish</td><td>Enough to move the normal Timesville route forward.</td></tr>
                <tr><td>I Want To Be A Fisherman</td><td>18 fish</td><td>Steam achievement for catching every fish.</td></tr>
                <tr><td>Timesville Ending C secret</td><td>18 fish plus key</td><td>The hidden route uses the completed Fish Paper and the windowed-mode lock.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Proof Shots To Capture</h2>
          <ul class="shot-list">
            <li><strong>Fish Paper</strong><span>Metal Detector find and the completed paper state.</span></li>
            <li><strong>18 fish</strong><span>The full catch list or achievement unlock screen.</span></li>
            <li><strong>Lost Key</strong><span>The moment the paper rewards the key.</span></li>
            <li><strong>Windowed lock</strong><span>The shack window/lock before using the key.</span></li>
          </ul>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3773067527">Steam Community Timesville secret</a> | <a href="https://ninewiki.com/endings/endacopia-all-endings/">ninewiki all endings</a> | <a href="https://endacopiaarchive.wiki/how-to-fish/">Endacopia Archive fish guide</a></p>
          </div>
`,
    sidebar: {
      summary: "Timesville Ending C route: Fish Paper, 18 fish, Lost Key, windowed-mode shack.",
      badges: ["Timesville", "18 fish", "Key"],
      related: [
        { href: "/endacopia-all-fish-guide/", label: "All fish guide" },
        { href: "/endacopia-secret-ending/", label: "Secret ending guide" },
        { href: "/endacopia-ending-c-not-triggering/", label: "Ending C troubleshooting" },
        { href: "/endacopia-save-file-location/", label: "Save backup location" }
      ],
      checks: [
        { label: "Fish", value: "18" },
        { label: "Tool", value: "Metal Detector" },
        { label: "Mode", value: "Windowed" }
      ]
    }
  },
  {
    slug: "endacopia-all-fish-guide",
    title: "Endacopia All Fish Guide - 18 Fish Checklist by Time Slot",
    description: "All 18 Endacopia fish for Timesville, grouped by day and night clock slots for the Fisherman achievement and the secret route key.",
    eyebrow: "Fish checklist",
    badges: ["18 fish", "Achievement"],
    quick: 'Endacopia has 18 required Timesville fish for the full fishing checklist: three catches in each of six clock slots. Catch all 18, then exit or recheck the fishing paper to confirm the Fisherman achievement and the secret-route key.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-05.jpg",
    width: 1536,
    height: 864,
    alt: "Official Endacopia Steam screenshot showing the fishing minigame at sea",
    caption: "Official Steam store screenshot showing the fishing minigame. Use this until each time-slot catch list is captured in-game."
  }
])}

          <h2>All 18 Fish</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Time Slot</th><th>Fish 1</th><th>Fish 2</th><th>Fish 3</th></tr></thead>
              <tbody>
                <tr><td>Day 1</td><td>Nautilus</td><td>Colisa Lalia</td><td>Jantic Fish</td></tr>
                <tr><td>Day 2</td><td>Peter Panini</td><td>Seahorse</td><td>Singin' Fish</td></tr>
                <tr><td>Day 3</td><td>Eel</td><td>Reddest Fish Ever</td><td>Sea Man</td></tr>
                <tr><td>Night 1</td><td>Pirate</td><td>Skele-Fish</td><td>RC Ship</td></tr>
                <tr><td>Night 2</td><td>Crab</td><td>Starfish</td><td>Big Worm</td></tr>
                <tr><td>Night 3</td><td>Drawing of a Fish</td><td>Jelly</td><td>Crate</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Fishing Method</h2>
          <ol class="step-list">
            <li><strong>Use the correct time slot.</strong> Each clock position has its own three catches; do not keep grinding the same slot after it is exhausted.</li>
            <li><strong>Cast when ready.</strong> Interact with the rod at the beach, cast, and wait for the bite/sparkle cue.</li>
            <li><strong>Control the pull indicator.</strong> Keep the indicator inside the target zone instead of watching only the fish art.</li>
            <li><strong>Exit and confirm.</strong> If the achievement does not pop while holding the pole, exit the fishing interaction and recheck the paper.</li>
          </ol>

          <h2>Use This For Two Goals</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Goal</th><th>Requirement</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td>I Want To Be A Fisherman</td><td>Every fish in the table</td><td>Steam achievement cleanup.</td></tr>
                <tr><td>Timesville secret</td><td>Every fish plus Fish Paper check</td><td>Key for the hidden shack/lock route.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://endacopiaarchive.wiki/how-to-fish/">Endacopia Archive fish guide</a> | <a href="https://showgamer.com/en/prohozhdeniya-igr/4923-prohozhdenie-endacopia">ShowGamer walkthrough</a> | <a href="https://steamcommunity.com/stats/2684630/achievements">Steam achievements</a></p>
          </div>
`,
    sidebar: {
      summary: "All-fish checklist for the Timesville achievement and hidden key.",
      badges: ["Fish", "Checklist", "Timesville"],
      related: [
        { href: "/endacopia-timesville-fishing-guide/", label: "Timesville fishing secret" },
        { href: "/endacopia-achievements-guide/", label: "Achievements guide" },
        { href: "/endacopia-100-percent-achievement-checklist/", label: "100% checklist" }
      ],
      checks: [
        { label: "Total", value: "18" },
        { label: "Slots", value: "6" },
        { label: "Per slot", value: "3" }
      ]
    }
  },
  {
    slug: "endacopia-misery-town-secret",
    title: "Endacopia Misery Town Secret Guide - Remote, Map, and Checkerboard Route",
    description: "Misery Town secret route for Endacopia Ending C: use the Metal Detector in the cinema sand, reveal the map, and follow the checkerboard path.",
    eyebrow: "Misery Town secret",
    badges: ["Ending C", "Map route"],
    quick: 'For the Misery Town secret, bring the Metal Detector to the cinema, scan the sandy floor to find the remote, use it on the screen to reveal the route map, record the map, then follow it in the checkerboard room until the hidden encounter resolves.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-03.jpg",
    width: 1362,
    height: 766,
    alt: "Official Endacopia Steam screenshot showing a circus battle scene",
    caption: "Official Steam store screenshot used as a Misery Town / circus-area mood reference, not the exact remote-map proof."
  },
  {
    file: "endacopia-official-steam-screenshot-09.jpg",
    width: 1532,
    height: 857,
    alt: "Official Endacopia Steam screenshot showing a stage performer scene",
    caption: "Official Steam store screenshot showing a stage/performance scene. Replace with cinema remote and checkerboard-map screenshots when available."
  }
])}

          <h2>Misery Town Route Steps</h2>
          <ol class="step-list">
            <li><strong>Enter the cinema with the Metal Detector.</strong> The sand floor is the clue; use the detector before leaving the area behind.</li>
            <li><strong>Dig up the remote.</strong> Search until the beeping points to the buried item.</li>
            <li><strong>Use the remote on the screen.</strong> The screen reveals the route map for the next room.</li>
            <li><strong>Record the map.</strong> Photograph it or write the path before moving on.</li>
            <li><strong>Follow the checkerboard route.</strong> Go to the checkerboard area and move according to the map, then continue through the hidden sequence.</li>
          </ol>

          <h2>What Counts As Complete?</h2>
          <p>The secret should not be counted after only finding the remote. Treat it as complete only after the map route leads to the hidden encounter and the game returns you from that sequence.</p>

          <h2>Common Mistakes</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Mistake</th><th>Why It Fails</th><th>Fix</th></tr></thead>
              <tbody>
                <tr><td>Leaving after finding the remote</td><td>The remote is only the start of the secret.</td><td>Use it on the cinema screen and follow the map.</td></tr>
                <tr><td>Guessing the checkerboard route</td><td>The path is map-based.</td><td>Take a screenshot before exiting the screen.</td></tr>
                <tr><td>Assuming windowed mode solves everything</td><td>Windowed mode helps some secret puzzles, but the remote/map route still has to be done.</td><td>Complete the detector, map, and hidden encounter chain.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://ninewiki.com/endings/endacopia-all-endings/">ninewiki all endings</a> | <a href="https://tposegaming.com/endacopia-endings/">Tpose endings guide</a> | <a href="https://www.neoseeker.com/endacopia/Chapter_2">Neoseeker Chapter 2</a></p>
          </div>
`,
    sidebar: {
      summary: "Misery Town Ending C route: detector, remote, screen map, checkerboard path.",
      badges: ["Misery Town", "Remote", "Map"],
      related: [
        { href: "/endacopia-secret-ending/", label: "Secret ending guide" },
        { href: "/endacopia-ending-c-not-triggering/", label: "Ending C not triggering" },
        { href: "/endacopia-screenshot-checklist/", label: "Screenshot checklist" }
      ],
      checks: [
        { label: "Tool", value: "Detector" },
        { label: "Item", value: "Remote" },
        { label: "Proof", value: "Map" }
      ]
    }
  },
  {
    slug: "endacopia-chameleon-battle",
    title: "Endacopia Chameleon Battle Guide - No Strings Attached and Case Closed",
    description: "Chameleon battle and avoidance guide for Endacopia: how No Strings Attached differs from Case Closed, when to save, and what to verify.",
    eyebrow: "Boss branch",
    badges: ["Chameleon", "Achievements"],
    quick: 'No Strings Attached is the Chameleon combat achievement; Case Closed is the paired avoidance achievement. Make a save before the Chameleon conversation, run one branch for the fight, reload, then run the correct identity/avoidance branch for Case Closed.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-04.jpg",
    width: 1536,
    height: 864,
    alt: "Official Endacopia Steam screenshot showing a red character conversation scene",
    caption: "Official Steam store screenshot used as a Chameleon route reference. Replace with the exact pre-conversation and achievement screenshots when captured."
  },
  {
    file: "endacopia-official-steam-screenshot-03.jpg",
    width: 1362,
    height: 766,
    alt: "Official Endacopia Steam screenshot showing combat UI",
    caption: "Official Steam store screenshot showing combat UI, useful as temporary achievement-branch media."
  }
])}

          <h2>Branch Before The Conversation</h2>
          <p>The Chameleon route is a classic achievement split. If you overwrite the save after one outcome, you may need to replay too much of Timesville. Save before the identity conversation, then keep that save until both achievements are confirmed.</p>

          <h2>Achievement Split</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Achievement</th><th>Route</th><th>Verification</th></tr></thead>
              <tbody>
                <tr><td>No Strings Attached</td><td>Trigger and win the Chameleon battle.</td><td>Steam achievement after defeating the puppet attackers.</td></tr>
                <tr><td>Case Closed</td><td>Resolve the identity path without combat.</td><td>Steam achievement after avoiding the battle.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Battle Notes</h2>
          <ol class="step-list">
            <li><strong>Watch the arms.</strong> The puppets telegraph attacks with movement from either side.</li>
            <li><strong>Block shortly before impact.</strong> Holding block constantly can leave you without enough stamina to punish safely.</li>
            <li><strong>Counter once or twice.</strong> Do not spend the whole stamina bar after one block.</li>
            <li><strong>Re-center after each exchange.</strong> The second puppet can punish you while you are focused on the first target.</li>
          </ol>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://steamcommunity.com/stats/2684630/achievements">Steam achievements</a> | <a href="https://dq7reimagined.com/endacopia/boss-fights-guide/">DQ7 boss guide</a> | <a href="https://www.neoseeker.com/endacopia/Chapter_1">Neoseeker Chapter 1</a></p>
          </div>
`,
    sidebar: {
      summary: "Chameleon achievement branch for combat and non-combat cleanup.",
      badges: ["Chameleon", "Boss", "Branch"],
      related: [
        { href: "/endacopia-achievements-guide/", label: "Achievements guide" },
        { href: "/endacopia-100-percent-achievement-checklist/", label: "100% checklist" },
        { href: "/endacopia-save-file-location/", label: "Save backup location" }
      ],
      checks: [
        { label: "Fight", value: "No Strings" },
        { label: "Avoid", value: "Case Closed" },
        { label: "Save", value: "Before talk" }
      ]
    }
  },
  {
    slug: "endacopia-save-file-location",
    title: "Endacopia Save File Location - Backup and Restore Guide",
    description: "Endacopia save file locations for Windows and SteamOS/Proton, plus backup steps for endings, achievements, and secret-route testing.",
    eyebrow: "Save backup",
    badges: ["Windows", "SteamOS"],
    quick: 'On Windows, Endacopia saves are stored in <code>C:\\Users\\&lt;your name&gt;\\Saved Games\\Endacopia\\</code>. On SteamOS/Proton, check <code>~/.local/share/Steam/steamapps/compatdata/2684630/pfx/drive_c/users/steamuser/Saved Games/Endacopia/</code>. Always close the game before copying or restoring saves.',
    body: `
          <h2>Save Locations</h2>
          <div class="source-box">
            <p><strong>Windows:</strong> <code>C:\\Users\\&lt;your name&gt;\\Saved Games\\Endacopia\\</code></p>
            <p><strong>SteamOS / Proton:</strong> <code>~/.local/share/Steam/steamapps/compatdata/2684630/pfx/drive_c/users/steamuser/Saved Games/Endacopia/</code></p>
          </div>

          <h2>Safe Backup Steps</h2>
          <ol class="step-list">
            <li><strong>Close Endacopia.</strong> Do not copy files while the game is writing saves.</li>
            <li><strong>Copy the whole folder.</strong> Put the backup somewhere outside the active save directory.</li>
            <li><strong>Name the backup clearly.</strong> Include route state, such as <code>chapter-1-before-office-secret</code>.</li>
            <li><strong>Restore only while closed.</strong> Copy your backup files back into the original save folder after quitting the game.</li>
          </ol>

          <h2>Best Save Points</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Save Point</th><th>Why It Matters</th><th>Related Goal</th></tr></thead>
              <tbody>
                <tr><td>Near-complete Chapter I</td><td>Lets you replay Ending A/B/C routes faster.</td><td>All endings</td></tr>
                <tr><td>Before boss conversations</td><td>Lets you split fight and avoidance achievements.</td><td>100%</td></tr>
                <tr><td>Before final door</td><td>Lets you test Stay trigger behavior.</td><td>Ending C</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://ninewiki.com/endings/endacopia-all-endings/">ninewiki all endings</a> | <a href="https://tposegaming.com/endacopia-endings/">Tpose endings guide</a></p>
          </div>
`,
    sidebar: {
      summary: "Backup-first save handling for endings, secrets, and achievement branches.",
      badges: ["Save", "Backup", "Restore"],
      related: [
        { href: "/endacopia-all-endings/", label: "All endings guide" },
        { href: "/endacopia-ending-c-not-triggering/", label: "Ending C troubleshooting" },
        { href: "/endacopia-100-percent-achievement-checklist/", label: "100% checklist" }
      ],
      checks: [
        { label: "Close game", value: "Required" },
        { label: "Copy folder", value: "All files" },
        { label: "Restore", value: "Closed" }
      ]
    }
  },
  {
    slug: "endacopia-water-break-achievement",
    title: "Endacopia Water Break Achievement Guide - Hydrate 3 Times",
    description: "Water Break achievement guide for Endacopia with the confirmed objective, route notes, and a cautious checklist for finding three hydration occasions.",
    eyebrow: "Achievement note",
    badges: ["Water Break", "Cautious"],
    quick: 'Water Break requires hydrating yourself on three separate occasions. Current public notes point to the Office water cooler, the Mouse/Rat apartment dispenser, and the Timesville aquarium waterfall; keep this as a screenshot checklist until all three are captured in your own run.',
    body: `
          <div class="spoiler-box">
            <h2>Verification Note</h2>
            <p>I am keeping this page cautious until all three hydration spots are personally captured. Current public notes identify the likely full set, but a clean three-shot proof set is still the next editorial task.</p>
          </div>

${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-08.jpg",
    width: 1533,
    height: 864,
    alt: "Official Endacopia Steam screenshot showing an interior scene with Mellow",
    caption: "Official Steam store screenshot used as a temporary interior reference for hydration-route capture planning."
  },
  {
    file: "endacopia-official-steam-screenshot-06.jpg",
    width: 1534,
    height: 865,
    alt: "Official Endacopia Steam screenshot showing a Timesville room",
    caption: "Official Steam store screenshot used as Timesville reference. Replace with the aquarium waterfall proof as soon as it is captured."
  }
])}

          <h2>Known Requirement</h2>
          <p>Steam lists Water Break as an achievement for hydrating yourself on three separate occasions. Treat "separate occasions" as three distinct interactions, not three clicks on the same source unless your run proves otherwise.</p>

          <h2>Route Tracker</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Hydration Slot</th><th>Status</th><th>What To Capture</th></tr></thead>
              <tbody>
                <tr><td>Office water cooler</td><td>Public walkthrough note</td><td>Interaction before leaving the Office route.</td></tr>
                <tr><td>Mouse / Rat apartment dispenser</td><td>Public walkthrough note</td><td>Interaction inside the apartment room during Timesville.</td></tr>
                <tr><td>Timesville aquarium waterfall</td><td>Public-source note; needs own screenshot</td><td>Capture the waterfall interaction and the achievement unlock moment.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>How To Avoid Wasting A Run</h2>
          <ol class="step-list">
            <li><strong>Drink when you first see a source.</strong> Do not postpone optional hydration until after area completion.</li>
            <li><strong>Screenshot before and after.</strong> Capture the interaction prompt and the result or achievement pop.</li>
            <li><strong>Keep a simple note.</strong> Write down the chapter, room, and whether the source still works after revisiting.</li>
          </ol>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://steamcommunity.com/stats/2684630/achievements">Steam achievements</a> | <a href="https://showgamer.com/en/prohozhdeniya-igr/4923-prohozhdenie-endacopia">ShowGamer walkthrough</a> | <a href="https://endacopiaguide.wiki/guides/water-break">Water Break location notes</a> | <a href="https://www.reddit.com/r/Endacopia/comments/1v9msac/i_have_now_100_endacopias_achievements/">Reddit 100% thread</a></p>
          </div>
`,
    sidebar: {
      summary: "Cautious Water Break tracker until all three hydration proofs are captured.",
      badges: ["Water Break", "3 times", "Verify"],
      related: [
        { href: "/endacopia-achievements-guide/", label: "Achievements guide" },
        { href: "/endacopia-100-percent-achievement-checklist/", label: "100% checklist" },
        { href: "/endacopia-screenshot-checklist/", label: "Screenshot checklist" }
      ],
      checks: [
        { label: "Needed", value: "3 drinks" },
        { label: "Confirmed", value: "Requirement" },
        { label: "Next", value: "Screenshots" }
      ]
    }
  },
  {
    slug: "endacopia-screenshot-checklist",
    title: "Endacopia Screenshot Checklist - Real Proof Needed for Guide Updates",
    description: "Editorial screenshot checklist for improving Endacopia Guide Hub with real in-game proof for endings, fish, achievements, secrets, and media replacements.",
    eyebrow: "Evidence plan",
    badges: ["Editorial", "Screenshots"],
    quick: 'The next biggest ranking upgrade is not more generic text; it is real, route-specific screenshots. Prioritize Ending C proof, Timesville fish, Office phone/stairs, boss achievement branches, and replacement media for the current official Steam reference images.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-10.jpg",
    width: 1537,
    height: 868,
    alt: "Official Endacopia Steam screenshot showing the telescope scene",
    caption: "Use official Steam media only as temporary visual scaffolding. The final screenshot set should be self-captured proof."
  },
  {
    file: "endacopia-official-steam-screenshot-05.jpg",
    width: 1536,
    height: 864,
    alt: "Official Endacopia Steam screenshot showing fishing gameplay",
    caption: "Fishing is one of the best first targets for real screenshots because it supports both achievements and Ending C."
  }
])}

          <h2>Priority Screenshot List</h2>
          <ul class="shot-list">
            <li><strong>Header art replacement</strong><span>Create or license a local hero/OG asset so the site is not relying only on Steam reference media.</span></li>
            <li><strong>Ending C chain</strong><span>Misery Town remote/map, Timesville Fish Paper/key, Office phone/stairs, final room trigger.</span></li>
            <li><strong>All fish</strong><span>One screenshot per time slot and the final achievement/key confirmation.</span></li>
            <li><strong>Chameleon branch</strong><span>Pre-conversation save, fight outcome, Case Closed outcome.</span></li>
            <li><strong>Water Break</strong><span>All three hydration spots plus the unlock moment.</span></li>
            <li><strong>Save folder</strong><span>Windows and SteamOS folder examples with personal usernames hidden.</span></li>
          </ul>

          <h2>Capture Rules</h2>
          <ol class="step-list">
            <li><strong>Hide personal data.</strong> Crop usernames, Steam overlay names, and file paths before publishing.</li>
            <li><strong>Use consistent dimensions.</strong> Prefer 16:9 or original game window screenshots; avoid tall crops that distort in cards.</li>
            <li><strong>Record route state.</strong> Name each file with chapter, area, and step number.</li>
            <li><strong>Replace cautiously.</strong> Do not publish a screenshot on a route page unless the text next to it matches the exact moment shown.</li>
          </ol>

          <h2>Suggested File Names</h2>
          <div class="source-box">
            <p><code>endacopia-office-277-5944.jpg</code></p>
            <p><code>endacopia-timesville-fish-paper-complete.jpg</code></p>
            <p><code>endacopia-misery-town-map.jpg</code></p>
            <p><code>endacopia-water-break-third-source.jpg</code></p>
          </div>
`,
    sidebar: {
      summary: "Proof checklist for replacing weak images and making the guides harder to copy.",
      badges: ["Proof", "Assets", "SEO"],
      related: [
        { href: "/editorial-policy/", label: "Editorial policy" },
        { href: "/changelog/", label: "Changelog" },
        { href: "/endacopia-office-secret/", label: "Office secret guide" },
        { href: "/endacopia-all-fish-guide/", label: "All fish guide" }
      ],
      checks: [
        { label: "Top priority", value: "Ending C" },
        { label: "Image rule", value: "No crop" },
        { label: "Publish", value: "Verify" }
      ]
    }
  },
  {
    slug: "endacopia-beginner-guide",
    title: "Endacopia Beginner Guide - First 3 Puzzles, CHESHIRE and Clocky",
    description: "Endacopia beginner guide for the first three puzzle blockers: Doors.exe, vent and fridge route, cheese and coins, CHESHIRE password, and Clocky boss.",
    eyebrow: "Beginner guide",
    badges: ["First puzzles", "CHESHIRE"],
    quick: 'For a first Endacopia run, solve these blockers in order: power the computer and run Doors.exe, use the spinning chair/vent route to reach the kitchen, solve the fridge for cheese, use cheese to lure the cockroach and get two coins, feed the Wall Bank to reveal <code>CHESHIRE</code>, then beat Clocky with timed blocks and short counters before entering the bathroom/toilet route.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-02.jpg",
    width: 1783,
    height: 999,
    alt: "Official Endacopia Steam screenshot showing Mellow's room with the computer and clock",
    caption: "The first blockers start in Mellow's room: computer, framed wall creature, chair, vent, and the hallway route."
  },
  {
    file: "endacopia-official-steam-screenshot-03.jpg",
    width: 1362,
    height: 766,
    alt: "Official Endacopia Steam screenshot showing a combat encounter",
    caption: "Clocky is the first real combat check; block first, counter in short bursts, and protect stamina."
  }
])}

          <div class="spoiler-box">
            <h2>Spoiler Scope</h2>
            <p>This beginner guide covers the opening house / demo-style route only. It is written for players stuck in the first 30 to 40 minutes before Chapter I opens up. For the later full-game route, use the <a href="/endacopia-walkthrough/">full walkthrough</a>.</p>
          </div>

          <h2>First 3 Puzzle Blockers</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Blocker</th><th>Fast Solution</th><th>Common Mistake</th></tr></thead>
              <tbody>
                <tr><td>1. Computer / Doors.exe</td><td>Plug the cable under the desk, boot the computer, choose Mellow's profile, and run Doors.exe to open the first route.</td><td>Only inspecting the computer once. Try the usable cable/boot sequence before leaving the room.</td></tr>
                <tr><td>2. Vent / Kitchen / Fridge</td><td>Spin the chair three times, crawl through the vent, hide from Henry, solve the fridge chain, and take the cheese.</td><td>Trying to force the hallway first, or missing the chair/vent route in Mellow's room.</td></tr>
                <tr><td>3. Cheese / Coins / Wall Bank</td><td>Use cheese in Mellow's room, step on the cockroach, collect both coins, then feed the Wall Bank to reveal <code>CHESHIRE</code>.</td><td>Trying to pick up the cockroach by hand, or feeding the Wall Bank before collecting both coins.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Puzzle 1: Computer And Doors.exe</h2>
          <ol class="step-list">
            <li><strong>Start in Mellow's room.</strong> Inspect the computer area and the cable under the desk.</li>
            <li><strong>Power the computer.</strong> Plug in the cable, boot the computer, and select Mellow's profile.</li>
            <li><strong>Run Doors.exe.</strong> Use the program to open the door route. This sets up the hallway and bathroom visit.</li>
            <li><strong>Do not skip the room.</strong> The same room also contains the chair/vent path and the Wall Bank coin puzzle, so you will return here several times.</li>
          </ol>

          <h2>Puzzle 2: Vent, Henry, And Fridge Cheese</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Step</th><th>Action</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td>Open vent</td><td>Spin the chair in Mellow's room three times.</td><td>The vent route opens.</td></tr>
                <tr><td>Kitchen entry</td><td>Crawl through the vent and follow the path into the kitchen.</td><td>You reach the kitchen puzzle area.</td></tr>
                <tr><td>Henry stealth</td><td>Hide in the right cabinet when Henry approaches and spam-click the left cabinet to misdirect him.</td><td>Henry leaves and the fridge puzzle can continue.</td></tr>
                <tr><td>Fridge chain</td><td>Use hammer on dice box; press 1, 2, 3; place yellow triangle, blue rectangle, red circle; confirm; click ghost; use key; flip both switches; pull fridge handle.</td><td>You obtain cheese.</td></tr>
                <tr><td>Return</td><td>Go back through the vent and mash A during the tentacle grab.</td><td>You return to Mellow's room with cheese.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Puzzle 3: Cheese, Coins, And CHESHIRE</h2>
          <ol class="step-list">
            <li><strong>Use the cheese in Mellow's room.</strong> This lures out the cockroach connected to the framed creature / Wall Bank puzzle chain.</li>
            <li><strong>Step on the cockroach.</strong> Mellow will not simply pick it up. Stomping it drops two coins.</li>
            <li><strong>Collect both coins.</strong> Missing one coin blocks the Wall Bank exchange.</li>
            <li><strong>Feed the Wall Bank.</strong> After both coins are given, the password is revealed: <code>CHESHIRE</code>.</li>
            <li><strong>Use the password later.</strong> Return to the bathroom/toilet sequence after Clocky and enter <code>CHESHIRE</code> when prompted.</li>
          </ol>

          <h2>Clocky Boss Tips</h2>
          <p>Clocky is less about attacking fast and more about rhythm. Watch the clock hands, block the strike, then counter with two hits. A third hit is only safe when stamina is still healthy. If stamina drops too low, skip the counter and wait for the next block cycle.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Problem</th><th>Fix</th></tr></thead>
              <tbody>
                <tr><td>I keep getting hit.</td><td>Block when the clock hands begin the attack animation. Blocking early or late can fail.</td></tr>
                <tr><td>I run out of stamina.</td><td>Use two-hit counters instead of spamming attacks. Keep enough stamina to block the next charge.</td></tr>
                <tr><td>Clocky will not die.</td><td>Repeat the block/counter cycle. Community guides describe roughly six successful rounds.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Beginner Route Checklist</h2>
          <ul class="shot-list">
            <li><strong>Computer started</strong><span>Power cable plugged, Mellow profile selected, Doors.exe opened.</span></li>
            <li><strong>Vent route cleared</strong><span>Chair spun three times, kitchen reached, Henry stealth completed.</span></li>
            <li><strong>Cheese obtained</strong><span>Fridge puzzle chain completed and cheese added to inventory.</span></li>
            <li><strong>CHESHIRE unlocked</strong><span>Cockroach lured, two coins collected, Wall Bank fed.</span></li>
            <li><strong>Clocky defeated</strong><span>Timed block/counter pattern completed without draining stamina.</span></li>
            <li><strong>Bathroom route open</strong><span>Use plunger/toilet route and enter CHESHIRE to leave the demo-style opening.</span></li>
          </ul>

          <h2>Where To Go After The Opening</h2>
          <p>If you are playing the full Steam release, the toilet route moves into Chapter I. Continue with the <a href="/endacopia-prologue-walkthrough/">Prologue Walkthrough</a> for the complete opening route, then use <a href="/endacopia-full-game/">Full Game Guide</a>, <a href="/endacopia-walkthrough/">Walkthrough</a>, and <a href="/endacopia-all-endings/">All Endings</a> for later chapters and completion routes.</p>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://store.steampowered.com/app/2684630/Endacopia/">Steam Store</a> | <a href="https://endacopia.wiki/guides/getting-started/">Endacopia Wiki Getting Started</a> | <a href="https://endacopia.wiki/guides/walkthrough/">Endacopia Wiki Walkthrough</a> | <a href="https://endacopia.wiki/puzzles/vent-kitchen/">Vent & Kitchen Route</a> | <a href="https://endacopia.wiki/puzzles/fridge-puzzle/">Fridge Puzzle</a> | <a href="https://endacopia.wiki/puzzles/kitchen-coins/">Kitchen & Coins Puzzle</a> | <a href="https://endacopia.wiki/characters/clocky/">Clocky</a> | <a href="https://endacopia.wiki/guides/mini-games/">Mini-Games Guide</a></p>
          </div>
`,
    sidebar: {
      summary: "Fast beginner route for the first three puzzle blockers before Chapter I.",
      badges: ["Beginner", "CHESHIRE", "Clocky"],
      related: [
        { href: "/endacopia-prologue-walkthrough/", label: "Prologue walkthrough" },
        { href: "/endacopia-demo-vs-full-game/", label: "Demo vs full game" },
        { href: "/endacopia-clocky/", label: "Clocky guide" },
        { href: "/endacopia-walkthrough/", label: "Full walkthrough" }
      ],
      checks: [
        { label: "Password", value: "CHESHIRE" },
        { label: "Boss", value: "Clocky" },
        { label: "Scope", value: "Opening" }
      ]
    }
  },
  {
    slug: "endacopia-prologue-walkthrough",
    title: "Endacopia Prologue Walkthrough - Demo Opening House Guide",
    description: "Endacopia Prologue walkthrough for the opening house and old demo route: Mellow's room, Doors.exe, kitchen, coins, CHESHIRE, Clocky, and the toilet portal.",
    eyebrow: "Prologue walkthrough",
    badges: ["Demo opening", "House route"],
    quick: 'The Endacopia Prologue is the opening house route that most older demo guides cover. Work through Mellow\'s room, boot the computer, enter Doors.exe, use the vent/kitchen route, get cheese and coins, enter <code>CHESHIRE</code>, beat Clocky, then use the plunger/toilet route to move into Chapter I in the full game.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-02.jpg",
    width: 1783,
    height: 999,
    alt: "Official Endacopia Steam screenshot showing Mellow's room with computer and clock",
    caption: "Official Steam store screenshot showing the bedroom/computer setup that matches the early Prologue route."
  },
  {
    file: "endacopia-official-steam-screenshot-01.jpg",
    width: 1537,
    height: 865,
    alt: "Official Endacopia Steam screenshot showing the outside of Mellow's house",
    caption: "Official Steam store screenshot used as a temporary house-route reference for the demo-style opening."
  }
])}

          <div class="spoiler-box">
            <h2>Demo Context</h2>
            <p>If you found an older Chinese or short-video walkthrough, it is probably covering this Prologue/demo route. That is useful for the opening, but it does not replace full-game pages for Chapter I, endings, achievements, Water Break, The Yeti, or Ending C.</p>
          </div>

          <h2>Prologue Route Order</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Route Beat</th><th>What To Do</th><th>Why It Matters</th></tr></thead>
              <tbody>
                <tr><td>Mellow's room</td><td>Inspect the room, framed drawing, computer area, and soccer mini-game if you want Footwork Master later.</td><td>Introduces the interaction style and optional achievement tracking.</td></tr>
                <tr><td>Computer / Doors.exe</td><td>Plug in the computer, boot it, pick Mellow's profile, and open Doors.exe.</td><td>Starts the house-route loop.</td></tr>
                <tr><td>Hallway and bathroom</td><td>Visit the bathroom, pick up the plunger, and note that the password is not ready yet.</td><td>Sets up the toilet portal return.</td></tr>
                <tr><td>Kitchen route</td><td>Use the vent path, handle the Henry stealth moment, solve the fridge/cheese step, and escape the vent QTE.</td><td>Gets the cheese needed for the coin route.</td></tr>
                <tr><td>Coins and wall bank</td><td>Use the cheese and collect coins, then feed the wall bank to reveal <code>CHESHIRE</code>.</td><td>Unlocks the bathroom password.</td></tr>
                <tr><td>Clocky fight</td><td>Block, counter, and repeat until Clocky is defeated.</td><td>Ends the Prologue combat check.</td></tr>
                <tr><td>Toilet portal</td><td>Return to the bathroom, use the plunger/toilet route, and enter <code>CHESHIRE</code>.</td><td>The full game continues into Chapter I after this point.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>What Old Demo Guides Still Help With</h2>
          <ol class="step-list">
            <li><strong>Opening controls.</strong> Mouse interaction, right-click cursor cycling, and movement basics carry forward.</li>
            <li><strong>House puzzles.</strong> Computer, vent, cheese, coins, Clocky, and CHESHIRE are still useful Prologue search terms.</li>
            <li><strong>Game tone.</strong> Older demo videos help players decide if they want the full Steam game.</li>
          </ol>

          <h2>Where Old Demo Guides Stop Helping</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Search Intent</th><th>Use Demo Guide?</th><th>Use This Instead</th></tr></thead>
              <tbody>
                <tr><td>Ending A / B / C</td><td>No</td><td><a href="/endacopia-all-endings/">All endings guide</a></td></tr>
                <tr><td>Misery Town, Timesville, Office</td><td>No</td><td><a href="/endacopia-walkthrough/">Full walkthrough</a></td></tr>
                <tr><td>Water Break / all fish / The Yeti</td><td>No</td><td><a href="/endacopia-achievements-guide/">Achievements guide</a></td></tr>
                <tr><td>Demo opening house</td><td>Yes</td><td>This Prologue page</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://endacopia.wiki/guides/walkthrough/">Endacopia Wiki walkthrough</a> | <a href="https://www.neoseeker.com/endacopia/Prologue">Neoseeker Prologue</a> | <a href="https://andyl4nd.itch.io/endacopiademo">Itch.io demo page</a> | <a href="https://www.newgrounds.com/portal/view/861144">Newgrounds demo page</a></p>
          </div>
`,
    sidebar: {
      summary: "Opening house route for demo-style searches before the full game branches into Chapter I.",
      badges: ["Prologue", "Demo", "CHESHIRE"],
      related: [
        { href: "/endacopia-beginner-guide/", label: "Beginner guide" },
        { href: "/endacopia-demo-vs-full-game/", label: "Demo vs full game" },
        { href: "/endacopia-full-game/", label: "Full game guide" },
        { href: "/endacopia-walkthrough/", label: "Full walkthrough" },
        { href: "/endacopia-release-date/", label: "Release date timeline" }
      ],
      checks: [
        { label: "Password", value: "CHESHIRE" },
        { label: "Boss", value: "Clocky" },
        { label: "Next", value: "Chapter I" }
      ]
    }
  },
  {
    slug: "endacopia-demo-vs-full-game",
    title: "Endacopia Demo vs Full Game - What Changed After Release",
    description: "Compare the old Endacopia demo and the 2026 Steam full game: Prologue coverage, Chapter I hubs, endings, achievements, saves, and outdated guide warnings.",
    eyebrow: "Demo vs full game",
    badges: ["2022 demo", "2026 full game"],
    quick: 'Older Endacopia demo guides mostly cover the Prologue/opening house route. The Steam full game released on July 27, 2026 and continues into Chapter I hubs, saw-choice endings, Steam achievements, Ending C secrets, The Yeti, and save-file routing.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-02.jpg",
    width: 1783,
    height: 999,
    alt: "Official Endacopia Steam screenshot showing Mellow's room",
    caption: "The bedroom/computer setup is the kind of scene older demo guides usually cover."
  },
  {
    file: "endacopia-official-steam-screenshot-07.jpg",
    width: 1534,
    height: 864,
    alt: "Official Endacopia Steam screenshot showing the Saw Box choice interface",
    caption: "The Saw Box and later ending routes belong to full-game completion, not demo-only routing."
  }
])}

          <h2>Fast Comparison</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Topic</th><th>Old Demo / Prologue</th><th>Steam Full Game</th></tr></thead>
              <tbody>
                <tr><td>Core coverage</td><td>Opening house, computer, kitchen, coins, CHESHIRE, Clocky.</td><td>Prologue plus Chapter I hubs, later chapters, saw choice, endings, and achievements.</td></tr>
                <tr><td>Release timing</td><td>Demo existed years before launch, including Newgrounds/itch-era uploads.</td><td>Steam release date: July 27, 2026.</td></tr>
                <tr><td>Guide usefulness</td><td>Good for learning controls and the house route.</td><td>Required for all serious completion guides.</td></tr>
                <tr><td>Achievements</td><td>No complete Steam achievement route.</td><td>16 Steam achievements, including Water Break, The Yeti, Stay, Escape, and Return.</td></tr>
                <tr><td>Saves</td><td>Not useful for full completion planning.</td><td>Local save backups matter for Ending A/B/C and boss branches.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Full Game Module Map</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Module</th><th>Main Content</th><th>Best Page</th></tr></thead>
              <tbody>
                <tr><td>Prologue</td><td>Mellow's house, Doors.exe, kitchen, coins, CHESHIRE, Clocky, toilet portal.</td><td><a href="/endacopia-prologue-walkthrough/">Prologue walkthrough</a></td></tr>
                <tr><td>Chapter I hubs</td><td>Misery Town, Timesville, The Office, body-part recovery, hidden area secrets.</td><td><a href="/endacopia-walkthrough/">Full walkthrough</a></td></tr>
                <tr><td>Timesville</td><td>Fishing, Fish Paper, 18 fish, Lost Key, windowed-mode shack.</td><td><a href="/endacopia-timesville-fishing-guide/">Timesville fishing secret</a></td></tr>
                <tr><td>The Office</td><td>Call center, Telescope, 277-5944, stair wait, symbol chain.</td><td><a href="/endacopia-office-secret/">Office secret guide</a></td></tr>
                <tr><td>Ending branch</td><td>Saw Box 471, Toy Saw, real Saw, Ending A, Ending B.</td><td><a href="/endacopia-all-endings/">All endings</a></td></tr>
                <tr><td>Secret cleanup</td><td>Ending C / Stay, The Yeti, Water Break, 100% achievements.</td><td><a href="/endacopia-achievements-guide/">Achievements guide</a></td></tr>
              </tbody>
            </table>
          </div>

          <h2>When An Old Guide Is Probably Outdated</h2>
          <ol class="step-list">
            <li><strong>It only shows the house.</strong> Useful for Prologue, incomplete for the full game.</li>
            <li><strong>It never mentions Steam achievements.</strong> It probably cannot help with 100% completion.</li>
            <li><strong>It has no Saw Box or Ending C route.</strong> It is missing full-release ending content.</li>
            <li><strong>It predates July 27, 2026.</strong> Treat it as demo-era unless it was updated after Steam launch.</li>
          </ol>

          <h2>Best Search Path</h2>
          <p>If you came from a short video or old demo walkthrough, use <a href="/endacopia-prologue-walkthrough/">Prologue Walkthrough</a> first, then move to <a href="/endacopia-full-game/">Full Game Guide</a>, <a href="/endacopia-walkthrough/">Walkthrough</a>, and <a href="/endacopia-all-endings/">All Endings</a>.</p>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://store.steampowered.com/app/2684630/Endacopia/">Steam Store</a> | <a href="https://steamdb.info/app/2684630/">SteamDB</a> | <a href="https://andyl4nd.itch.io/endacopiademo">Itch.io demo page</a> | <a href="https://www.newgrounds.com/portal/view/861144">Newgrounds demo page</a> | <a href="https://endacopia.wiki/guides/walkthrough/">Endacopia Wiki walkthrough</a></p>
          </div>
`,
    sidebar: {
      summary: "Explains why old Prologue/demo guides do not replace the 2026 Steam full-game route.",
      badges: ["Demo", "Full game", "Timeline"],
      related: [
        { href: "/endacopia-beginner-guide/", label: "Beginner guide" },
        { href: "/endacopia-prologue-walkthrough/", label: "Prologue walkthrough" },
        { href: "/endacopia-release-date/", label: "Release date" },
        { href: "/endacopia-full-game/", label: "Full game guide" },
        { href: "/endacopia-all-endings/", label: "All endings" }
      ],
      checks: [
        { label: "Demo", value: "Prologue" },
        { label: "Full release", value: "Jul 27" },
        { label: "Pages", value: "42" }
      ]
    }
  },
  {
    slug: "endacopia-puzzle-solutions",
    title: "Endacopia Puzzle Solutions - Passwords, Codes and Item Routes",
    description: "Answer-first Endacopia puzzle solutions for CHESHIRE, LET ME GO, LET ME TALK, Saw Box 471, Core colors, Scribbly, clown colors, and common softlocks.",
    eyebrow: "Puzzle answers",
    badges: ["Passwords", "Codes"],
    quick: 'The highest-intent Endacopia puzzle answers are: toilet password <code>CHESHIRE</code>, first Office phrase <code>LET ME GO</code>, second phrase <code>LET ME TALK</code>, Saw Box code <code>471</code>, Scribbly name <code>SCRIBBLY</code>, dead-clown colors Yellow / Pink / Purple / Red, and Core color order Green / Yellow / Black / Red.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-02.jpg",
    width: 1783,
    height: 999,
    alt: "Official Endacopia Steam screenshot showing Mellow's room with the computer and wall puzzle",
    caption: "Opening puzzles start in Mellow's room: computer, wall bank, vent route, CHESHIRE, and Clocky."
  },
  {
    file: "endacopia-official-steam-screenshot-07.jpg",
    width: 1920,
    height: 1080,
    alt: "Official Endacopia Steam screenshot showing the Saw Box choice interface",
    caption: "The Saw Box branch is a late-game answer query. Save before choosing one saw."
  }
])}

          <div class="spoiler-box">
            <h2>Spoiler Scope</h2>
            <p>This is an answer-first page for players who already searched a password, code, phrase, item route, or softlock. It intentionally gives exact answers before the longer route context.</p>
          </div>

          <h2>Endacopia Puzzle Answers At A Glance</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Blocker</th><th>Exact Answer</th><th>What It Unlocks</th></tr></thead>
              <tbody>
                <tr><td>Toilet password</td><td><code>CHESHIRE</code></td><td>Starts the post-Prologue route after the bathroom/toilet sequence.</td></tr>
                <tr><td>First Office button phrase</td><td><code>LET ME GO</code></td><td>Opens the first corporate route restriction.</td></tr>
                <tr><td>Second Office button phrase</td><td><code>LET ME TALK</code></td><td>Restores Mellow's mouth after the later prompt.</td></tr>
                <tr><td>Dead-clown puzzle</td><td>Yellow, Pink, Purple, Red</td><td>Awards the Scalpel for the body-part route.</td></tr>
                <tr><td>Missing Bingo Ball</td><td>Use the Scalpel on the patient</td><td>Recovers the red Bingo Ball.</td></tr>
                <tr><td>Scribbly route</td><td>Find 8 paper pieces, draw the face, enter <code>SCRIBBLY</code></td><td>Awards the map.</td></tr>
                <tr><td>Core color order</td><td>Green, Yellow, Black, Red</td><td>Opens the AI route after the Core check.</td></tr>
                <tr><td>Saw Box</td><td><code>471</code></td><td>Opens the saw choice for Ending A / Ending B.</td></tr>
                <tr><td>Office phone secret</td><td><code>277-5944</code></td><td>Starts the hidden Office secret for Stay / Ending C.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Opening House Softlocks</h2>
          <ol class="step-list">
            <li><strong>Doors.exe does not create a real route.</strong> Plug the cable under the desk, boot the computer, select Mellow's profile, and launch Doors.exe before rechecking the physical door.</li>
            <li><strong>The kitchen seems unreachable.</strong> Spin the chair in Mellow's room three times to open the vent, then use the vent route.</li>
            <li><strong>The fridge puzzle gives no cheese.</strong> Follow the short chain: hammer, 1-2-3, colored shapes, ghost/key, switches, then handle.</li>
            <li><strong>The toilet password is missing.</strong> Get cheese, lure the cockroach, step on it, collect both coins, and feed the Wall Bank first.</li>
          </ol>

          <h2>CHESHIRE Route</h2>
          <p>The toilet answer is not a random word to brute force. The intended route is fridge cheese -> cockroach -> two coins -> Wall Bank -> <code>CHESHIRE</code>. For the full opening sequence, use the <a href="/endacopia-cheshire-password/">CHESHIRE password guide</a> or the <a href="/endacopia-beginner-guide/">beginner guide</a>.</p>

          <h2>Office Phrase Route</h2>
          <p><code>LET ME GO</code> and <code>LET ME TALK</code> are sequential answers, not interchangeable guesses. Use <code>LET ME GO</code> first to remove the route restriction, then return later for <code>LET ME TALK</code> when the game points you back to the button-room interface.</p>

          <h2>Late-Game Codes And Branch Saves</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Code</th><th>Use</th><th>Save Advice</th></tr></thead>
              <tbody>
                <tr><td><code>471</code></td><td>Henry's Saw Box.</td><td>Save before taking either saw, because the choice controls Ending A vs Ending B.</td></tr>
                <tr><td><code>277-5944</code></td><td>Office phone clue.</td><td>Use it from the Jobs app only after revealing the clue with the Telescope.</td></tr>
                <tr><td>Green / Yellow / Black / Red</td><td>Core color sequence.</td><td>Screenshot the Core state before moving into the AI route.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Screenshot Proof Still Needed</h2>
          <ul class="shot-list">
            <li><strong>Core colors</strong><span>Capture the complete Green / Yellow / Black / Red sequence in the 2026 Steam build.</span></li>
            <li><strong>Button phrases</strong><span>Capture LET ME GO accepted first and LET ME TALK accepted later.</span></li>
            <li><strong>Henry file</strong><span>Capture PASSWORDS.TXT showing the Saw Box / SOW Box entry for 471.</span></li>
            <li><strong>277-5944</strong><span>Capture the Telescope clue and the Jobs app call.</span></li>
          </ul>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://store.steampowered.com/app/2684630/Endacopia/">Steam Store</a> | <a href="https://steamcommunity.com/stats/2684630/achievements">Steam Achievements</a> | <a href="https://endacopia.wiki/guides/walkthrough/">Endacopia Wiki Walkthrough</a> | <a href="https://dq7reimagined.com/endacopia/puzzle-solutions/">Public puzzle cross-check</a></p>
          </div>
`,
    sidebar: {
      summary: "Answer-first page for passwords, codes, phrases, item routes, and common softlocks.",
      badges: ["Answers", "CHESHIRE", "471"],
      related: [
        { href: "/endacopia-cheshire-password/", label: "CHESHIRE password" },
        { href: "/endacopia-let-me-go-let-me-talk/", label: "LET ME GO / TALK" },
        { href: "/endacopia-saw-box-code/", label: "Saw Box code" },
        { href: "/endacopia-277-5944/", label: "277-5944 phone number" },
        { href: "/endacopia-boss-fights-guide/", label: "Boss fights guide" }
      ],
      checks: [
        { label: "Toilet", value: "CHESHIRE" },
        { label: "Saw Box", value: "471" },
        { label: "Office", value: "LET ME TALK" },
        { label: "Phone", value: "277-5944" }
      ]
    }
  },
  {
    slug: "endacopia-cheshire-password",
    title: "Endacopia CHESHIRE Password - Toilet Code and Wall Bank Route",
    description: "Fast answer for the Endacopia CHESHIRE toilet password, how to earn it from the Wall Bank, and what to check if the bathroom route will not start.",
    eyebrow: "Password answer",
    badges: ["CHESHIRE", "Toilet code"],
    quick: 'The Endacopia toilet password is <code>CHESHIRE</code>. The intended route is to solve the fridge for cheese, lure the cockroach in Mellow\'s room, step on it for two coins, feed the Wall Bank, then return to the bathroom/toilet prompt and enter <code>CHESHIRE</code>.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-02.jpg",
    width: 1783,
    height: 999,
    alt: "Official Endacopia Steam screenshot showing Mellow's room with the computer and wall puzzle",
    caption: "The password route loops through Mellow's room: vent, cheese, cockroach, coins, Wall Bank, then bathroom."
  }
])}

          <h2>How To Get CHESHIRE Normally</h2>
          <ol class="step-list">
            <li><strong>Open the vent route.</strong> Spin the chair in Mellow's room until the vent opens.</li>
            <li><strong>Reach the kitchen.</strong> Crawl through the vent and hide from Henry when he checks the cabinets.</li>
            <li><strong>Solve the fridge.</strong> Complete the fridge chain and take the cheese.</li>
            <li><strong>Return with cheese.</strong> Use the cheese in Mellow's room to lure out the cockroach.</li>
            <li><strong>Get both coins.</strong> Step on the cockroach, then collect the two coins it drops.</li>
            <li><strong>Feed the Wall Bank.</strong> Give both coins to the Wall Bank to reveal <code>CHESHIRE</code>.</li>
            <li><strong>Use the bathroom route.</strong> Return to the toilet creature and enter the full word.</li>
          </ol>

          <h2>Do Not Enter These</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Wrong Guess</th><th>Why It Fails</th></tr></thead>
              <tbody>
                <tr><td><code>SHINE</code></td><td>It sounds like part of the clue during fast dialogue, but it is not the full password.</td></tr>
                <tr><td><code>SHIRE</code></td><td>Only the ending of the word.</td></tr>
                <tr><td><code>TO SHINE</code></td><td>Not the Wall Bank answer.</td></tr>
                <tr><td>Any fridge letters</td><td>The fridge is an item route for cheese, not a letter cipher for the toilet.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>If The Toilet Route Will Not Start</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Symptom</th><th>Likely Cause</th><th>Fix</th></tr></thead>
              <tbody>
                <tr><td>No password prompt</td><td>Bathroom interaction is incomplete.</td><td>Use the plunger/toilet interaction first, then talk to the creature.</td></tr>
                <tr><td>Password rejected</td><td>Wrong spelling or partial word.</td><td>Enter the full eight-letter word: <code>CHESHIRE</code>.</td></tr>
                <tr><td>Wall Bank gives no clue</td><td>Missing one coin.</td><td>Recheck the floor after stepping on the cockroach.</td></tr>
                <tr><td>Still no cheese</td><td>Fridge route not completed.</td><td>Return to the kitchen and finish every fridge mechanism before leaving.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Where This Fits In The Route</h2>
          <p><code>CHESHIRE</code> is an opening-house blocker. If you are playing the 2026 Steam full release, the route continues after the toilet sequence into the full game. If you are using old demo videos, remember that many of them stop at this point.</p>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://endacopia.wiki/puzzles/kitchen-coins/">Kitchen and Coins Puzzle</a> | <a href="https://endacopia.wiki/puzzles/fridge-puzzle/">Fridge Puzzle</a> | <a href="https://endacopia.wiki/guides/walkthrough/">Endacopia Wiki Walkthrough</a></p>
          </div>
`,
    sidebar: {
      summary: "Exact route for the toilet password, Wall Bank coins, and bathroom softlock checks.",
      badges: ["CHESHIRE", "Wall Bank", "Opening"],
      related: [
        { href: "/endacopia-puzzle-solutions/", label: "All puzzle solutions" },
        { href: "/endacopia-beginner-guide/", label: "Beginner guide" },
        { href: "/endacopia-prologue-walkthrough/", label: "Prologue walkthrough" },
        { href: "/endacopia-clocky/", label: "Clocky guide" }
      ],
      checks: [
        { label: "Password", value: "CHESHIRE" },
        { label: "Need", value: "2 coins" },
        { label: "Item", value: "Cheese" }
      ]
    }
  },
  {
    slug: "endacopia-let-me-go-let-me-talk",
    title: "Endacopia LET ME GO and LET ME TALK - Office Button Room Phrases",
    description: "Fast answer for the Endacopia LET ME GO and LET ME TALK button-room phrases, when to enter each one, and why the order matters.",
    eyebrow: "Office phrase answers",
    badges: ["LET ME GO", "LET ME TALK"],
    quick: 'Use <code>LET ME GO</code> first in the Office button-room route. Later, when the game points you back to the same word interface, enter <code>LET ME TALK</code> to restore Mellow\'s mouth. The two phrases are sequential, not interchangeable.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-08.jpg",
    width: 1533,
    height: 864,
    alt: "Official Endacopia Steam screenshot showing an interior conversation route",
    caption: "Office route screenshots are still being replaced with self-captured button-room proof."
  }
])}

          <h2>Phrase Order</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>When</th><th>Enter</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td>First button-room restriction</td><td><code>LET ME GO</code></td><td>Opens the next corporate route section.</td></tr>
                <tr><td>Later mouth-restoration prompt</td><td><code>LET ME TALK</code></td><td>Restores Mellow's mouth and normal speech route.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Common Mistakes</h2>
          <ol class="step-list">
            <li><strong>Entering LET ME TALK too early.</strong> It is a later phrase. Use <code>LET ME GO</code> first.</li>
            <li><strong>Repeating LET ME GO after the route opens.</strong> The second prompt needs <code>LET ME TALK</code>, not the first phrase again.</li>
            <li><strong>Leaving extra words selected.</strong> Clear the word interface before building the phrase again.</li>
            <li><strong>Using this page out of route order.</strong> If the Office path is not open yet, return to the main walkthrough or body-part route first.</li>
          </ol>

          <h2>Quick Diagnostic</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Search Query</th><th>Likely Need</th><th>Next Step</th></tr></thead>
              <tbody>
                <tr><td>Endacopia LET ME GO</td><td>First access restriction.</td><td>Enter <code>LET ME GO</code> and continue right.</td></tr>
                <tr><td>Endacopia LET ME TALK</td><td>Mellow cannot speak.</td><td>Return to the same word interface later and enter <code>LET ME TALK</code>.</td></tr>
                <tr><td>Endacopia Office button room</td><td>Phrase order confusion.</td><td>Use GO first, TALK second.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Proof Still Needed</h2>
          <ul class="shot-list">
            <li><strong>LET ME GO accepted</strong><span>Button-room screenshot immediately after the first phrase succeeds.</span></li>
            <li><strong>LET ME TALK accepted</strong><span>Later screenshot showing the phrase and mouth restoration result.</span></li>
            <li><strong>Route state</strong><span>Screenshot of the prompt that sends the player back to the word room.</span></li>
          </ul>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://dq7reimagined.com/endacopia/puzzle-solutions/">Public puzzle cross-check</a> | <a href="https://endacopia.wiki/guides/walkthrough/">Endacopia Wiki Walkthrough</a></p>
          </div>
`,
    sidebar: {
      summary: "Fast order check for the two Office button-room phrases.",
      badges: ["Office", "Phrase", "Softlock"],
      related: [
        { href: "/endacopia-puzzle-solutions/", label: "All puzzle solutions" },
        { href: "/endacopia-office-secret/", label: "Office secret guide" },
        { href: "/endacopia-walkthrough/", label: "Full walkthrough" },
        { href: "/endacopia-achievements-guide/", label: "Achievements guide" }
      ],
      checks: [
        { label: "First", value: "LET ME GO" },
        { label: "Second", value: "LET ME TALK" },
        { label: "Scope", value: "Office" }
      ]
    }
  },
  {
    slug: "endacopia-boss-fights-guide",
    title: "Endacopia Boss Fights Guide - Clocky, AI, Trapezist and Chameleon",
    description: "Endacopia boss fights guide for Clocky, AI, Trapezist, and Chameleon, with achievement branches, avoid routes, stamina tips, and screenshot targets.",
    eyebrow: "Boss fights",
    badges: ["Combat", "Achievements"],
    quick: 'Endacopia boss searches usually split into two needs: how to survive the fight, or how to avoid the fight for the paired achievement. Steam achievement names confirm the pairs: Fatal Performance / Cut The Act, No Strings Attached / Case Closed, System Override / Short Circuit, plus Clocky as the first combat skill check.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-03.jpg",
    width: 1362,
    height: 766,
    alt: "Official Endacopia Steam screenshot showing a combat encounter",
    caption: "Combat pages should be upgraded with self-captured tells, block timing, and achievement unlock proof."
  },
  {
    file: "endacopia-official-steam-screenshot-09.jpg",
    width: 1535,
    height: 865,
    alt: "Official Endacopia Steam screenshot showing a boss-like character scene",
    caption: "Late-route boss pages need separate defeat and avoid-route screenshots."
  }
])}

          <h2>Boss And Achievement Map</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Encounter</th><th>Fight Achievement</th><th>Avoid Achievement</th><th>Page</th></tr></thead>
              <tbody>
                <tr><td>Clocky</td><td>Opening combat check</td><td>Ending C route implication</td><td><a href="/endacopia-clocky/">Clocky guide</a></td></tr>
                <tr><td>AI</td><td>System Override</td><td>Short Circuit</td><td>Screenshot pending</td></tr>
                <tr><td>Trapezist</td><td>Fatal Performance</td><td>Cut The Act</td><td>Screenshot pending</td></tr>
                <tr><td>Chameleon</td><td>No Strings Attached</td><td>Case Closed</td><td><a href="/endacopia-chameleon-battle/">Chameleon battle</a></td></tr>
              </tbody>
            </table>
          </div>

          <h2>Universal Combat Tips</h2>
          <ol class="step-list">
            <li><strong>Block before chasing damage.</strong> The first failure pattern is attacking until stamina is gone, then eating the next strike.</li>
            <li><strong>Counter in short bursts.</strong> Two clean hits after a block are usually safer than a greedy third hit.</li>
            <li><strong>Watch the tell, not the health bar.</strong> Bosses often telegraph from hand, body, or head movement before the hit lands.</li>
            <li><strong>Keep branch saves.</strong> The fight and avoid achievements are separate, so save before the route decision when possible.</li>
          </ol>

          <h2>Clocky Quick Fix</h2>
          <p>Clocky is the first practical check for the combat system. Watch the clock hands, block the incoming strike, then counter briefly. If stamina is low, skip the counter and preserve the next block.</p>

          <h2>Completion Route Advice</h2>
          <p>If you are going for 100%, treat each boss as two routes: one save for the fight achievement and one save for the avoid achievement. This is especially important for AI, Trapezist, and Chameleon because Steam lists paired defeat/avoid achievements for those encounters.</p>

          <h2>Proof Still Needed</h2>
          <ul class="shot-list">
            <li><strong>AI</strong><span>Entry state, defeat route, Short Circuit avoid route, and System Override unlock.</span></li>
            <li><strong>Trapezist</strong><span>Entry state, Fatal Performance route, Cut The Act avoid route, and branch save proof.</span></li>
            <li><strong>Chameleon</strong><span>No Strings Attached and Case Closed unlock states from the same branch save.</span></li>
            <li><strong>A Natural Brawler</strong><span>Running count or unlock moment for defeating 15 enemies.</span></li>
          </ul>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://steamcommunity.com/stats/2684630/achievements">Steam Achievements</a> | <a href="https://endacopia.wiki/guides/mini-games/">Endacopia Wiki Mini-Games</a> | <a href="https://endacopia.wiki/characters/clocky/">Clocky</a></p>
          </div>
`,
    sidebar: {
      summary: "Boss and achievement map for fight routes, avoid routes, and combat timing.",
      badges: ["Bosses", "Steam", "100%"],
      related: [
        { href: "/endacopia-clocky/", label: "Clocky guide" },
        { href: "/endacopia-chameleon-battle/", label: "Chameleon battle" },
        { href: "/endacopia-achievements-guide/", label: "Achievements guide" },
        { href: "/endacopia-100-percent-achievement-checklist/", label: "100% checklist" }
      ],
      checks: [
        { label: "Fight pairs", value: "3" },
        { label: "First boss", value: "Clocky" },
        { label: "Need saves", value: "Yes" }
      ]
    }
  },
  {
    slug: "endacopia-map",
    title: "Endacopia Map Guide - Scribbly Map, Misery Town Map and Underground Routes",
    description: "Endacopia map guide for players searching where the map comes from, how the Scribbly paper route works, and how the Misery Town checkerboard map is used.",
    eyebrow: "Map answer",
    badges: ["Map", "Scribbly"],
    quick: 'There are two common Endacopia map searches. The <strong>Scribbly map</strong> comes from finding 8 paper pieces, drawing the face, and entering <code>SCRIBBLY</code>. The <strong>Misery Town map</strong> is revealed by using the remote on the cinema screen, then following the checkerboard route it shows.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-03.jpg",
    width: 1362,
    height: 766,
    alt: "Official Endacopia Steam screenshot showing a circus-area scene used for Misery Town map context",
    caption: "Map searches usually point to either the Scribbly paper route or the Misery Town cinema/checkerboard route."
  },
  {
    file: "endacopia-official-steam-screenshot-09.jpg",
    width: 1532,
    height: 857,
    alt: "Official Endacopia Steam screenshot showing a stage route scene",
    caption: "Replace this store-reference shot with a self-captured cinema map screenshot once available."
  }
])}

          <h2>Which Map Do You Need?</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Search Intent</th><th>Answer</th><th>Open This Page</th></tr></thead>
              <tbody>
                <tr><td>Endacopia map</td><td>Usually Scribbly's map or the Misery Town checkerboard map.</td><td><a href="/endacopia-scribbly/">Scribbly route</a></td></tr>
                <tr><td>How to get the map</td><td>Find 8 paper pieces, draw the face, then enter <code>SCRIBBLY</code>.</td><td><a href="/endacopia-scribbly/">Scribbly guide</a></td></tr>
                <tr><td>Misery Town map</td><td>Use the buried remote on the cinema screen, then copy the route.</td><td><a href="/endacopia-misery-town-secret/">Misery Town secret</a></td></tr>
                <tr><td>Underground / hidden route</td><td>Often a secret-boss or hidden-area query; start with the route checklist.</td><td><a href="/endacopia-underground/">Underground guide</a></td></tr>
              </tbody>
            </table>
          </div>

          <h2>Scribbly Map Route</h2>
          <ol class="step-list">
            <li><strong>Collect the paper pieces.</strong> The public route notes call for 8 pieces before the face/name step works.</li>
            <li><strong>Draw the face.</strong> Complete the paper/face prompt instead of skipping straight to the name.</li>
            <li><strong>Enter <code>SCRIBBLY</code>.</strong> This is the answer-first blocker for the map reward.</li>
            <li><strong>Use the map as a route tool.</strong> Move from the answer page into the full walkthrough if you are missing later context.</li>
          </ol>

          <h2>Misery Town Map Route</h2>
          <ol class="step-list">
            <li><strong>Bring the Metal Detector.</strong> Search the cinema sand for the remote.</li>
            <li><strong>Use the remote on the screen.</strong> The cinema screen reveals the path map.</li>
            <li><strong>Screenshot the map.</strong> The checkerboard room is much easier if you copy the route before leaving.</li>
            <li><strong>Follow the checkerboard path.</strong> Complete the hidden sequence before counting the secret as done.</li>
          </ol>

          <h2>Proof Still Needed</h2>
          <ul class="shot-list">
            <li><strong>Scribbly map reward</strong><span>Paper pieces, drawn face, SCRIBBLY prompt, and map reward.</span></li>
            <li><strong>Cinema map</strong><span>Remote use and full checkerboard route image.</span></li>
            <li><strong>Checkerboard completion</strong><span>Final step or hidden encounter after following the map.</span></li>
          </ul>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://endacopia.fandom.com/wiki/Guide_for_Full_Game">Fandom full-game guide</a> | <a href="https://www.neoseeker.com/endacopia/Chapter_2">Neoseeker Chapter 2</a> | <a href="https://dq7reimagined.com/endacopia/puzzle-solutions/">DQ7 puzzle solutions</a></p>
          </div>
`,
    sidebar: {
      summary: "Map hub for Scribbly, Misery Town, checkerboard, and hidden-route searches.",
      badges: ["Map", "Scribbly", "Misery Town"],
      related: [
        { href: "/endacopia-scribbly/", label: "Scribbly map guide" },
        { href: "/endacopia-misery-town-secret/", label: "Misery Town secret" },
        { href: "/endacopia-underground/", label: "Underground route" },
        { href: "/endacopia-puzzle-solutions/", label: "Puzzle solutions" }
      ],
      checks: [
        { label: "Scribbly", value: "8 pieces" },
        { label: "Name", value: "SCRIBBLY" },
        { label: "Cinema", value: "Remote" }
      ]
    }
  },
  {
    slug: "endacopia-scribbly",
    title: "Endacopia Scribbly Guide - 8 Paper Pieces, Face Drawing and Map Reward",
    description: "Fast answer for Endacopia Scribbly: collect 8 paper pieces, draw the face, enter SCRIBBLY, and use the reward map without confusing it with Misery Town.",
    eyebrow: "Scribbly answer",
    badges: ["SCRIBBLY", "Map"],
    quick: 'For the Endacopia Scribbly route, collect all <strong>8 paper pieces</strong>, complete the face drawing prompt, then enter <code>SCRIBBLY</code>. This awards the map and feeds into later route navigation, but it is separate from the Misery Town cinema/checkerboard map.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-02.jpg",
    width: 1783,
    height: 999,
    alt: "Official Endacopia Steam screenshot showing Mellow's room and paper-route context",
    caption: "Scribbly is an exact-answer search. Replace this with paper-piece and face-drawing screenshots after capture."
  }
])}

          <h2>Scribbly Route Checklist</h2>
          <ol class="step-list">
            <li><strong>Find 8 paper pieces.</strong> Do not try to solve the name prompt with only part of the paper route finished.</li>
            <li><strong>Draw the face.</strong> The drawing step is part of the intended route, not flavor text.</li>
            <li><strong>Enter <code>SCRIBBLY</code>.</strong> Use the full uppercase answer if you are copying it from a guide.</li>
            <li><strong>Claim the map.</strong> After the prompt resolves, move to the map page or main walkthrough for the next route step.</li>
          </ol>

          <h2>Fast Troubleshooting</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Problem</th><th>Likely Cause</th><th>Fix</th></tr></thead>
              <tbody>
                <tr><td><code>SCRIBBLY</code> does nothing</td><td>Paper pieces or face drawing incomplete.</td><td>Return to the collectible route and confirm all 8 pieces.</td></tr>
                <tr><td>No map appears</td><td>The prompt was not fully completed.</td><td>Finish the face/name sequence before leaving the area.</td></tr>
                <tr><td>Checkerboard route still confusing</td><td>You are mixing Scribbly map with Misery Town cinema map.</td><td>Use the <a href="/endacopia-map/">map guide</a> to separate the two.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Scribbly vs Misery Town Map</h2>
          <p>The Scribbly answer is a name/password-style blocker. The Misery Town map is a separate cinema route that uses the Metal Detector, buried remote, screen reveal, and checkerboard path. If your query is about the cinema floor or remote, open <a href="/endacopia-misery-town-secret/">Misery Town Secret</a> instead.</p>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://endacopia.fandom.com/wiki/Guide_for_Full_Game">Fandom full-game guide</a> | <a href="https://dq7reimagined.com/endacopia/puzzle-solutions/">DQ7 puzzle solutions</a> | <a href="https://www.neoseeker.com/endacopia/walkthrough">Neoseeker walkthrough</a></p>
          </div>
`,
    sidebar: {
      summary: "Exact Scribbly answer page for paper pieces, face drawing, and the map reward.",
      badges: ["SCRIBBLY", "8 pieces", "Map"],
      related: [
        { href: "/endacopia-map/", label: "Map guide" },
        { href: "/endacopia-puzzle-solutions/", label: "Puzzle solutions" },
        { href: "/endacopia-walkthrough/", label: "Walkthrough" }
      ],
      checks: [
        { label: "Pieces", value: "8" },
        { label: "Answer", value: "SCRIBBLY" },
        { label: "Reward", value: "Map" }
      ]
    }
  },
  {
    slug: "endacopia-steam-deck",
    title: "Endacopia Steam Deck Guide - Proton Save Path, Controls and Quick Fixes",
    description: "Endacopia Steam Deck guide covering Proton save location, point-and-click controls, windowed-mode route checks, and what to verify before moving saves.",
    eyebrow: "Steam Deck",
    badges: ["Steam Deck", "Proton"],
    quick: 'For Steam Deck, install Endacopia through Steam and expect Proton to create a Windows-style prefix under <code>steamapps/compatdata/2684630/</code>. The likely save path mirrors Windows inside the prefix: <code>pfx/drive_c/users/steamuser/Saved Games/Endacopia/</code>. Back up before copying or editing saves.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-01.jpg",
    width: 1920,
    height: 1080,
    alt: "Official Endacopia Steam screenshot used for Steam Deck guide context",
    caption: "Endacopia is a point-and-click game with Steam achievements, which makes it a natural Steam Deck search even before a large Deck-specific guide exists."
  }
])}

          <h2>Steam Deck Quick Setup</h2>
          <ol class="step-list">
            <li><strong>Install from Steam.</strong> Use the Steam store app ID <code>2684630</code> so Proton and achievements are tied to the right prefix.</li>
            <li><strong>Use mouse-style controls.</strong> Trackpad or touchscreen is usually more comfortable than trying to map every click to buttons.</li>
            <li><strong>Keep a branch save.</strong> Ending and boss routes benefit from save backups before Saw Box, Chameleon, Trapezist, and Ending C checks.</li>
            <li><strong>Use Desktop Mode for files.</strong> If you need save backups, switch to Desktop Mode and browse the Proton prefix carefully.</li>
          </ol>

          <h2>Likely Steam Deck Save Path</h2>
          <div class="source-box">
            <p><code>~/.local/share/Steam/steamapps/compatdata/2684630/pfx/drive_c/users/steamuser/Saved Games/Endacopia/</code></p>
          </div>
          <p>This path follows the normal Proton pattern for Windows save folders. If your Steam library is on a microSD card or custom library, start from that library's <code>steamapps/compatdata/2684630/</code> folder instead.</p>

          <h2>Steam Deck Route Notes</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Task</th><th>Deck Advice</th><th>Related Guide</th></tr></thead>
              <tbody>
                <tr><td>Ending A / B branch</td><td>Back up before choosing a Saw from the Saw Box.</td><td><a href="/endacopia-saw-box-code/">Saw Box 471</a></td></tr>
                <tr><td>Ending C secrets</td><td>Copy a near-complete save before Misery Town, Timesville, and Office cleanup.</td><td><a href="/endacopia-secret-ending/">Secret ending</a></td></tr>
                <tr><td>Timesville shack</td><td>Windowed-mode instructions may be awkward in Game Mode; keep Desktop Mode as a fallback.</td><td><a href="/endacopia-timesville-fishing-guide/">Timesville secret</a></td></tr>
                <tr><td>Steam achievements</td><td>Stay online while testing unlocks if possible.</td><td><a href="/endacopia-achievements-guide/">Achievements</a></td></tr>
              </tbody>
            </table>
          </div>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://store.steampowered.com/app/2684630/Endacopia/">Steam Store</a> | <a href="https://steamcommunity.com/stats/2684630/achievements">Steam achievements</a> | <a href="https://www.reddit.com/r/Steam/comments/zfeqc6/proton_where_is_it_saving_nonesteam_game_save/">Proton prefix discussion</a> | <a href="https://discuss.cachyos.org/t/savegame-directory/23427">Proton save path example</a></p>
          </div>
`,
    sidebar: {
      summary: "Steam Deck and Proton reference for save backups, controls, and route checks.",
      badges: ["Deck", "Proton", "Saves"],
      related: [
        { href: "/endacopia-save-file-location/", label: "Save file location" },
        { href: "/endacopia-achievements-guide/", label: "Achievements guide" },
        { href: "/endacopia-saw-box-code/", label: "Saw Box code" },
        { href: "/endacopia-secret-ending/", label: "Secret ending" }
      ],
      checks: [
        { label: "App ID", value: "2684630" },
        { label: "Prefix", value: "compatdata" },
        { label: "Backups", value: "Yes" }
      ]
    }
  },
  {
    slug: "endacopia-underground",
    title: "Endacopia Underground Guide - Hidden Route, Secret Bosses and Fight Club Searches",
    description: "Endacopia underground guide for players searching how to go underground, secret boss routes, hidden fighters, and what to verify before chasing the old demo-era content.",
    eyebrow: "Underground route",
    badges: ["Underground", "Secret bosses"],
    quick: 'Endacopia underground searches usually refer to hidden combat or secret-route content rather than a normal main-menu destination. Start by checking whether you mean <strong>Fight Club / hidden fighters</strong>, the <strong>Misery Town hidden map route</strong>, or older demo-era underground videos.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-03.jpg",
    width: 1362,
    height: 766,
    alt: "Official Endacopia Steam screenshot showing a combat route scene",
    caption: "Underground searches overlap with secret bosses, hidden fighters, and Misery Town route cleanup."
  }
])}

          <h2>What Does Underground Mean?</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Query</th><th>Likely Meaning</th><th>Best Next Page</th></tr></thead>
              <tbody>
                <tr><td>how to go underground in Endacopia</td><td>Hidden combat/fighter route or old secret-boss video context.</td><td><a href="/endacopia-boss-fights-guide/">Boss fights guide</a></td></tr>
                <tr><td>Endacopia underground fighters</td><td>Secret boss / Fight Club style cleanup.</td><td><a href="/endacopia-achievements-guide/">Achievements guide</a></td></tr>
                <tr><td>Endacopia map underground</td><td>Misery Town remote/checkerboard route.</td><td><a href="/endacopia-map/">Map guide</a></td></tr>
                <tr><td>old underground secret endings</td><td>Demo-era videos, not necessarily the 2026 full-game route.</td><td><a href="/endacopia-demo-vs-full-game/">Demo vs full game</a></td></tr>
              </tbody>
            </table>
          </div>

          <h2>Safe Search Path</h2>
          <ol class="step-list">
            <li><strong>Confirm your version.</strong> If the video is from years before July 27, 2026, treat it as demo-era route material.</li>
            <li><strong>Check achievements first.</strong> If the search is about hidden fighters, match it against Steam achievement names before replaying a whole chapter.</li>
            <li><strong>Open the map route if you are in Misery Town.</strong> The remote/checkerboard path is the stronger current map-related lead.</li>
            <li><strong>Keep screenshots.</strong> Underground/secret-boss pages still need exact full-release proof, so capture the entrance and unlock screens.</li>
          </ol>

          <h2>Proof Still Needed</h2>
          <ul class="shot-list">
            <li><strong>Entrance state</strong><span>Where the full-release route begins.</span></li>
            <li><strong>Secret fighter list</strong><span>Names, unlock requirements, and achievement relation.</span></li>
            <li><strong>Demo comparison</strong><span>Which older underground videos still apply to the Steam build.</span></li>
          </ul>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://store.steampowered.com/app/2684630/Endacopia/">Steam Store</a> | <a href="https://steamcommunity.com/stats/2684630/achievements">Steam achievements</a> | <a href="https://www.youtube.com/watch?v=K-gHUV1GvKQ">Secret bosses video reference</a> | <a href="https://www.youtube.com/watch?v=LcPkmL7AY0E">Older underground video reference</a></p>
          </div>
`,
    sidebar: {
      summary: "Routing page for underground, hidden fighters, secret bosses, and old-video searches.",
      badges: ["Underground", "Secret", "Verify"],
      related: [
        { href: "/endacopia-boss-fights-guide/", label: "Boss fights guide" },
        { href: "/endacopia-map/", label: "Map guide" },
        { href: "/endacopia-demo-vs-full-game/", label: "Demo vs full game" },
        { href: "/endacopia-achievements-guide/", label: "Achievements guide" }
      ],
      checks: [
        { label: "Version", value: "Full game" },
        { label: "Proof", value: "Needed" },
        { label: "Intent", value: "Hidden" }
      ]
    }
  },
  {
    slug: "endacopia-trapezist",
    title: "Endacopia Trapezist Guide - Fatal Performance and Cut The Act",
    description: "Endacopia Trapezist guide explaining the fight route for Fatal Performance, the scalpel rope route for Cut The Act, and where to save before the branch.",
    eyebrow: "Boss route",
    badges: ["Trapezist", "Achievements"],
    quick: 'For Trapezist, keep a save before the final branch. Fight the boss to unlock <strong>Fatal Performance</strong>. To avoid the battle, bring/use the <strong>Scalpel</strong> on the support rope before combat to unlock <strong>Cut The Act</strong>.',
    body: `
${mediaGrid([
  {
    file: "endacopia-official-steam-screenshot-09.jpg",
    width: 1532,
    height: 857,
    alt: "Official Endacopia Steam screenshot showing a stage performer scene",
    caption: "Trapezist searches are achievement-intent searches: defeat route vs avoid route."
  },
  {
    file: "endacopia-official-steam-screenshot-03.jpg",
    width: 1362,
    height: 766,
    alt: "Official Endacopia Steam screenshot showing a combat encounter",
    caption: "Replace with self-captured Trapezist fight and rope-cut proof after capture."
  }
])}

          <h2>Fatal Performance vs Cut The Act</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Achievement</th><th>Route</th><th>Save Advice</th></tr></thead>
              <tbody>
                <tr><td>Fatal Performance</td><td>Commit to the Trapezist battle and finish the fight.</td><td>Use a pre-branch save so you can reload for Cut The Act.</td></tr>
                <tr><td>Cut The Act</td><td>Use the Scalpel on the support rope before the battle starts.</td><td>Confirm you have the Scalpel before entering the final encounter state.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Fight Route</h2>
          <ol class="step-list">
            <li><strong>Enter with a backup save.</strong> The boss branch affects 100% cleanup.</li>
            <li><strong>Watch thrown projectiles.</strong> Public route notes describe returning or countering the thrown balls during the fight.</li>
            <li><strong>Do not spend all stamina at once.</strong> Block or reset between safe counter windows.</li>
            <li><strong>Confirm the unlock.</strong> Fatal Performance should be tied to finishing the direct battle route.</li>
          </ol>

          <h2>Avoid Route</h2>
          <ol class="step-list">
            <li><strong>Bring the Scalpel.</strong> If you missed the body-part route item, do not push into the encounter yet.</li>
            <li><strong>Cut the support rope.</strong> Use the Scalpel before combat commits.</li>
            <li><strong>Check for Cut The Act.</strong> This is the avoid-battle achievement, separate from the fight achievement.</li>
          </ol>

          <h2>Related Route Notes</h2>
          <p>Trapezist sits in the same 100% cleanup family as AI and Chameleon: each has a fight outcome and an avoid outcome. Use <a href="/endacopia-boss-fights-guide/">Boss Fights Guide</a> for the full pair table.</p>

          <h2>Sources Used</h2>
          <div class="source-box">
            <p><a href="https://www.neoseeker.com/endacopia/Chapter_2">Neoseeker Chapter 2</a> | <a href="https://dq7reimagined.com/endacopia/boss-fights-guide/">DQ7 boss guide</a> | <a href="https://endacopia.fandom.com/wiki/Trapezist">Fandom Trapezist</a> | <a href="https://endacopiaguide.wiki/bosses/trapezist">Trapezist route reference</a></p>
          </div>
`,
    sidebar: {
      summary: "Focused Trapezist route page for fight and avoid achievements.",
      badges: ["Trapezist", "Fatal Performance", "Cut The Act"],
      related: [
        { href: "/endacopia-boss-fights-guide/", label: "Boss fights guide" },
        { href: "/endacopia-achievements-guide/", label: "Achievements guide" },
        { href: "/endacopia-100-percent-achievement-checklist/", label: "100% checklist" },
        { href: "/endacopia-chameleon-battle/", label: "Chameleon battle" }
      ],
      checks: [
        { label: "Fight", value: "Fatal Performance" },
        { label: "Avoid", value: "Cut The Act" },
        { label: "Item", value: "Scalpel" }
      ]
    }
  },
  {
    slug: "about",
    title: "About Endacopia Guide Hub",
    description: "About this unofficial Endacopia guide project, its coverage goals, source policy, and current update priorities.",
    eyebrow: "About",
    badges: ["Unofficial", "Fan guide"],
    quick: 'Endacopia Guide Hub is an unofficial fan-made guide site focused on quick answers, spoiler-controlled routes, and source-backed walkthrough notes for Endacopia players.',
    body: `
          <h2>What This Site Is</h2>
          <p>This site is built for players who search one exact Endacopia blocker at a time: an ending trigger, an achievement name, a phone number, a fish list, or a puzzle code. The goal is to answer that query quickly, then link into the wider route.</p>

          <h2>What This Site Is Not</h2>
          <p>This project is not affiliated with Andyland, Steam, or any official Endacopia channel. Official store pages, community posts, and achievement pages are linked as sources where useful.</p>

          <h2>Coverage Priorities</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Priority</th><th>Why It Matters</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>Ending C / Stay</td><td>High search intent and many failed-route questions.</td><td>Core pages live; proof screenshots next.</td></tr>
                <tr><td>Achievements</td><td>Steam confirms 16 achievements and many are branch-sensitive.</td><td>Checklist live; Water Break needs final proof.</td></tr>
                <tr><td>Timesville fish</td><td>Supports both achievement cleanup and the secret route.</td><td>18-fish table live.</td></tr>
              </tbody>
            </table>
          </div>
`,
    sidebar: {
      summary: "Project background and coverage priorities for the guide hub.",
      badges: ["About", "Trust", "Sources"],
      related: [
        { href: "/editorial-policy/", label: "Editorial policy" },
        { href: "/contact/", label: "Contact" },
        { href: "/changelog/", label: "Changelog" }
      ],
      checks: [
        { label: "Official?", value: "No" },
        { label: "Focus", value: "Guides" },
        { label: "Updated", value: "Jul 31" }
      ]
    }
  },
  {
    slug: "contact",
    title: "Contact Endacopia Guide Hub",
    description: "How to send corrections, route proof, screenshots, and update requests for Endacopia Guide Hub.",
    eyebrow: "Contact",
    badges: ["Corrections", "Proof"],
    quick: 'Use this contact page as the correction brief: include the guide URL, the exact step that is wrong or incomplete, your platform, and a screenshot or save-state note if possible.',
    body: `
          <h2>Correction Format</h2>
          <ol class="step-list">
            <li><strong>Page URL.</strong> Paste the exact guide page that needs an update.</li>
            <li><strong>Route state.</strong> Mention chapter, area, save state, and whether you are on Steam/Windows or Steam Deck/Proton.</li>
            <li><strong>Evidence.</strong> Add a screenshot, achievement pop, or short clip if you have one.</li>
            <li><strong>Expected fix.</strong> Say whether the problem is wording, missing step, wrong route, or image proof.</li>
          </ol>

          <h2>Best Submissions Right Now</h2>
          <ul class="shot-list">
            <li><strong>Water Break</strong><span>All three hydration sources with the unlock moment.</span></li>
            <li><strong>The Yeti</strong><span>Exact Find Andy route screenshots.</span></li>
            <li><strong>Office symbol chain</strong><span>Each post-stair puzzle screen in order.</span></li>
            <li><strong>Licensed art</strong><span>Hero or route images that can replace store-reference media.</span></li>
          </ul>

          <div class="source-box">
            <p>Temporary contact method: publish corrections through the project owner until a dedicated email inbox is attached to this domain.</p>
          </div>
`,
    sidebar: {
      summary: "Correction and screenshot submission brief.",
      badges: ["Contact", "Updates", "Proof"],
      related: [
        { href: "/endacopia-screenshot-checklist/", label: "Screenshot checklist" },
        { href: "/editorial-policy/", label: "Editorial policy" },
        { href: "/changelog/", label: "Changelog" }
      ],
      checks: [
        { label: "Need URL", value: "Yes" },
        { label: "Need proof", value: "Helpful" },
        { label: "Email", value: "Pending" }
      ]
    }
  },
  {
    slug: "editorial-policy",
    title: "Editorial Policy - Endacopia Guide Hub",
    description: "Editorial policy for Endacopia Guide Hub, including source use, spoiler handling, screenshot rules, and correction standards.",
    eyebrow: "Editorial policy",
    badges: ["Sources", "Corrections"],
    quick: 'The site favors verified route steps over filler. When a detail is not personally captured or cross-checked, the page should label it as a public-source note or a verification task instead of presenting it as final.',
    body: `
          <h2>Source Rules</h2>
          <ol class="step-list">
            <li><strong>Official first.</strong> Steam store and Steam achievement pages are used for release, tags, and achievement facts.</li>
            <li><strong>Route guides second.</strong> Community walkthroughs are used to cross-check puzzle and route details.</li>
            <li><strong>Own screenshots preferred.</strong> Public media can guide layout, but final pages should use licensed or self-captured assets.</li>
            <li><strong>No fake certainty.</strong> If a step is not verified, the page should say so directly.</li>
          </ol>

          <h2>Spoiler Handling</h2>
          <p>Pages that target exact queries such as "Ending C not triggering" or "Saw Box code" give the answer immediately because the searcher is already asking for a spoiler. Broader pages use spoiler boxes and route warnings before late-game details.</p>

          <h2>Update Standard</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Change Type</th><th>Required Check</th><th>Where It Appears</th></tr></thead>
              <tbody>
                <tr><td>New route step</td><td>At least one route source plus own screenshot when possible.</td><td>Guide page and changelog.</td></tr>
                <tr><td>Achievement detail</td><td>Steam or Exophase achievement page plus route evidence.</td><td>Achievement guide and related page.</td></tr>
                <tr><td>Image replacement</td><td>Licensed or self-captured file, no distortion in desktop/mobile checks.</td><td>Assets and affected page.</td></tr>
              </tbody>
            </table>
          </div>
`,
    sidebar: {
      summary: "How the site handles sources, spoilers, corrections, and screenshots.",
      badges: ["Policy", "Trust", "SEO"],
      related: [
        { href: "/about/", label: "About" },
        { href: "/contact/", label: "Contact" },
        { href: "/changelog/", label: "Changelog" },
        { href: "/endacopia-screenshot-checklist/", label: "Screenshot checklist" }
      ],
      checks: [
        { label: "Official data", value: "Steam" },
        { label: "Corrections", value: "Logged" },
        { label: "Images", value: "Verified" }
      ]
    }
  },
  {
    slug: "changelog",
    title: "Endacopia Guide Hub Changelog",
    description: "Changelog for Endacopia Guide Hub, including guide coverage, image fixes, SEO metadata, and source-backed route updates.",
    eyebrow: "Changelog",
    badges: ["Updated", "Site notes"],
    quick: 'This changelog records meaningful guide updates, especially source-backed route additions, image fixes, sitemap changes, and pages that still need in-game proof.',
    body: `
          <h2>August 2, 2026</h2>
          <ul class="shot-list">
            <li><strong>Engagement optimization</strong><span>Rebuilt the homepage as an answer-first router and added Quick Answers above the fold.</span></li>
            <li><strong>Search Console opportunity pages</strong><span>Added Map, Scribbly, Steam Deck, Underground, and Trapezist pages for queries already showing impressions.</span></li>
            <li><strong>Analytics events</strong><span>Added GA events for guide-card clicks, search use, copyable code snippets, and 50% scroll depth.</span></li>
          </ul>

          <h2>August 1, 2026</h2>
          <ul class="shot-list">
            <li><strong>Puzzle answer cluster</strong><span>Added Puzzle Solutions, CHESHIRE Password, LET ME GO / LET ME TALK, and Boss Fights pages to target answer-first long-tail searches.</span></li>
            <li><strong>Beginner guide</strong><span>Added a first-30-minutes beginner route for Doors.exe, vent/kitchen, fridge cheese, Wall Bank coins, CHESHIRE, and Clocky boss searches.</span></li>
            <li><strong>Demo bridge pages</strong><span>Added Prologue Walkthrough and Demo vs Full Game pages to capture old demo-guide searches and route users into the 2026 full-game walkthrough.</span></li>
            <li><strong>Module structure</strong><span>Clarified that older demo content mostly covers the Prologue, while the Steam full game continues into Chapter I hubs, saw-choice endings, achievements, and secret routes.</span></li>
          </ul>

          <h2>July 31, 2026</h2>
          <ul class="shot-list">
            <li><strong>Long-tail guides</strong><span>Added Office secret, 277-5944, Timesville secret, all fish, Misery Town secret, Chameleon branch, save location, Water Break, and screenshot checklist pages.</span></li>
            <li><strong>Trust pages</strong><span>Added About, Contact, Editorial Policy, and Changelog.</span></li>
            <li><strong>Sharing metadata</strong><span>Added Open Graph and Twitter card metadata with a dedicated share image.</span></li>
            <li><strong>Image layout</strong><span>Kept full-image rendering for guide media and sidebar thumbnails to avoid cropped screenshots.</span></li>
          </ul>

          <h2>Next Verification Targets</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Target</th><th>Needed Evidence</th><th>Priority</th></tr></thead>
              <tbody>
                <tr><td>The Yeti</td><td>Exact Find Andy route screenshots.</td><td>High</td></tr>
                <tr><td>Water Break</td><td>All three hydration sources.</td><td>High</td></tr>
                <tr><td>Office symbol chain</td><td>Ordered screenshots after the stair wait.</td><td>Medium</td></tr>
              </tbody>
            </table>
          </div>
`,
    sidebar: {
      summary: "Version notes and next proof targets for the guide hub.",
      badges: ["Changelog", "Updates", "Proof"],
      related: [
        { href: "/about/", label: "About" },
        { href: "/editorial-policy/", label: "Editorial policy" },
        { href: "/endacopia-screenshot-checklist/", label: "Screenshot checklist" }
      ],
      checks: [
        { label: "Latest", value: "Aug 1" },
        { label: "Pages", value: "42" },
        { label: "Next", value: "Proof" }
      ]
    }
  }
];

async function writeNewPages() {
  for (const page of pages) {
    const dir = path.join(root, page.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), renderPage(page), "utf8");
  }
}

async function walkHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkHtml(full));
    } else if (entry.isFile() && entry.name === "index.html") {
      files.push(full);
    }
  }
  return files;
}

function updateSharedHtml(html, filePath) {
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim() || "Endacopia Guide Hub";
  const description = html.match(/<meta name="description" content="([^"]*)">/)?.[1]?.trim() || "Endacopia Guide Hub.";
  const url = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1]?.trim() || site;
  const type = path.basename(path.dirname(filePath)) === "endacopia-guide-hub" ? "website" : "article";

  html = html
    .split(/\r?\n/)
    .filter((line) => !line.includes('property="og:') && !line.includes('name="twitter:'))
    .join("\n");

  html = html.replace(
    /(    <link rel="canonical" href="[^"]+">\n)/,
    `$1${metaBlock({ title, description, url, type })}\n`
  );

  html = html
    .replace(/\/assets\/styles\.css(?:\?v=[^"]+)?/g, `/assets/styles.css?v=${version}`)
    .replace(/\/assets\/main\.js(?:\?v=[^"]+)?/g, `/assets/main.js?v=${version}`)
    .replace(/<a href="\/endacopia-walkthrough\/">Walkthrough<\/a>(?!\s*<a href="\/endacopia-puzzle-solutions\/">Puzzles<\/a>)/g, '<a href="/endacopia-walkthrough/">Walkthrough</a><a href="/endacopia-puzzle-solutions/">Puzzles</a>')
    .replace(/<span><a href="\/">Home<\/a> \| <a href="\/sitemap\.xml">Sitemap<\/a><\/span>/g, footerLinks)
    .replace(/<span><a href="\/sitemap\.xml">Sitemap<\/a> \| <a href="\/endacopia-wiki\/">Source checklist<\/a><\/span>/g, footerLinks);

  if (!/<div class="nav-links">[\s\S]*?href="\/endacopia-puzzle-solutions\/"[\s\S]*?<\/div>/.test(html)) {
    html = html.replace(/<div class="nav-links">/, '<div class="nav-links"><a href="/endacopia-puzzle-solutions/">Puzzles</a>');
  }

  return html;
}

function card({ href, title, text, badges }) {
  return `            <a class="guide-card" data-guide-card href="${href}">
              <strong>${esc(title)}</strong>
              <p>${esc(text)}</p>
              <span class="badge-row">${badges.map((badge, index) => `<span class="badge${index === 0 ? " hot" : index === 1 ? " safe" : ""}">${esc(badge)}</span>`).join("")}</span>
            </a>`;
}

function homepageInsert() {
  const routeCards = [
    { href: "/endacopia-map/", title: "Map Guide", text: "Scribbly map, Misery Town cinema map, checkerboard path, and where each map search should go.", badges: ["Map", "Scribbly"] },
    { href: "/endacopia-scribbly/", title: "Scribbly Guide", text: "Collect 8 paper pieces, draw the face, enter SCRIBBLY, and claim the map reward.", badges: ["SCRIBBLY", "Map"] },
    { href: "/endacopia-trapezist/", title: "Trapezist Guide", text: "Fatal Performance fight route, Cut The Act scalpel-rope route, and branch-save advice.", badges: ["Trapezist", "Boss"] },
    { href: "/endacopia-steam-deck/", title: "Steam Deck Guide", text: "Proton save path, Deck controls, Desktop Mode backup notes, and route-specific caveats.", badges: ["Steam Deck", "Proton"] },
    { href: "/endacopia-underground/", title: "Underground Guide", text: "Hidden route intent splitter for underground fighters, old videos, map routes, and secret bosses.", badges: ["Underground", "Hidden"] },
    { href: "/endacopia-puzzle-solutions/", title: "Puzzle Solutions", text: "Answer-first table for CHESHIRE, LET ME GO, LET ME TALK, 471, Core colors, Scribbly, and softlocks.", badges: ["Answers", "Codes"] },
    { href: "/endacopia-cheshire-password/", title: "CHESHIRE Password", text: "Toilet password route from fridge cheese, cockroach coins, and Wall Bank to the bathroom prompt.", badges: ["CHESHIRE", "Toilet"] },
    { href: "/endacopia-let-me-go-let-me-talk/", title: "LET ME GO / TALK", text: "Office button-room phrase order: use LET ME GO first, then LET ME TALK later.", badges: ["Office", "Phrases"] },
    { href: "/endacopia-boss-fights-guide/", title: "Boss Fights Guide", text: "Clocky, AI, Trapezist, and Chameleon route map with Steam fight/avoid achievement pairs.", badges: ["Bosses", "100%"] },
    { href: "/endacopia-beginner-guide/", title: "Beginner Guide", text: "First 3 opening blockers: Doors.exe, vent and fridge route, CHESHIRE password, and Clocky boss.", badges: ["Beginner", "Clocky"] },
    { href: "/endacopia-demo-vs-full-game/", title: "Demo vs Full Game", text: "Why old demo/prologue guides stop before Chapter I, endings, achievements, and 2026 full-game routes.", badges: ["Demo", "Full game"] },
    { href: "/endacopia-prologue-walkthrough/", title: "Prologue Walkthrough", text: "Opening house route for Mellow's room, Doors.exe, kitchen, coins, CHESHIRE, Clocky, and the toilet portal.", badges: ["Prologue", "CHESHIRE"] },
    { href: "/endacopia-office-secret/", title: "Endacopia Office Secret", text: "Telescope clue, 277-5944, Jobs call, stair wait, and symbol route for Ending C.", badges: ["Office", "277-5944"] },
    { href: "/endacopia-277-5944/", title: "277-5944 Phone Number", text: "Fast answer page for the Office phone number and the under-stairs follow-up.", badges: ["Fast answer", "Phone"] },
    { href: "/endacopia-timesville-fishing-guide/", title: "Timesville Fishing Secret", text: "Fish Paper, 18 fish, Lost Key, windowed-mode shack, and Ending C checks.", badges: ["Timesville", "Secret"] },
    { href: "/endacopia-all-fish-guide/", title: "All 18 Fish Guide", text: "Fish checklist grouped by day/night slots for Fisherman and the Timesville secret.", badges: ["Checklist", "18 fish"] },
    { href: "/endacopia-misery-town-secret/", title: "Misery Town Secret", text: "Cinema sand, remote, map screenshot, checkerboard path, and hidden encounter.", badges: ["Misery Town", "Map"] },
    { href: "/endacopia-chameleon-battle/", title: "Chameleon Battle", text: "No Strings Attached vs Case Closed, branch save timing, and combat notes.", badges: ["Boss", "Achievements"] },
    { href: "/endacopia-save-file-location/", title: "Save File Location", text: "Windows and SteamOS save folders for ending routes and achievement branches.", badges: ["Saves", "Backup"] },
    { href: "/endacopia-water-break-achievement/", title: "Water Break Achievement", text: "Cautious three-hydration tracker with proof targets for the last unknown detail.", badges: ["Water Break", "Verify"] },
    { href: "/endacopia-screenshot-checklist/", title: "Screenshot Checklist", text: "Real proof plan for route pages, assets, and future trust improvements.", badges: ["Proof", "Images"] }
  ];

  const trustCards = [
    { href: "/about/", title: "About", text: "What the guide hub covers, what it is not, and which pages are highest priority.", badges: ["Trust", "Unofficial"] },
    { href: "/contact/", title: "Contact", text: "Correction and screenshot submission format for route fixes.", badges: ["Corrections", "Proof"] },
    { href: "/editorial-policy/", title: "Editorial Policy", text: "Source rules, spoiler rules, and screenshot standards.", badges: ["Policy", "Sources"] },
    { href: "/changelog/", title: "Changelog", text: "Update log for new guides, metadata, images, and verification targets.", badges: ["Updates", "Log"] }
  ];

  return `
      <!-- COMPLETE_SITE_DEEP_DIVES_START -->
      <section class="band">
        <div class="container">
          <div class="section-head">
            <div>
              <h2>Answer Hubs And Long-Tail Fixes</h2>
              <p>Pages built from current Search Console opportunities and exact blockers: map, Scribbly, Steam Deck, underground routes, Trapezist, puzzle answers, passwords, phrase order, boss fights, Prologue, full-game differences, Office, 277-5944, Timesville fish, Misery Town, saves, and Water Break.</p>
            </div>
          </div>
          <div class="guide-grid">
${routeCards.map(card).join("\n")}
          </div>
        </div>
      </section>
      <!-- COMPLETE_SITE_DEEP_DIVES_END -->

      <!-- COMPLETE_SITE_TRUST_START -->
      <section class="band">
        <div class="container">
          <div class="section-head">
            <div>
              <h2>Trust And Updates</h2>
              <p>These pages make the site easier to evaluate, correct, and expand as more Endacopia route proof is captured.</p>
            </div>
          </div>
          <div class="guide-grid">
${trustCards.map(card).join("\n")}
          </div>
        </div>
      </section>
      <!-- COMPLETE_SITE_TRUST_END -->
`;
}

function homepageHeroAnswers() {
  return `          <!-- COMPLETE_SITE_HERO_ANSWERS_START -->
          <div class="hero-answer-grid" aria-label="Fast Endacopia answers">
            <a href="/endacopia-cheshire-password/"><span>Toilet password</span><strong>CHESHIRE</strong></a>
            <a href="/endacopia-saw-box-code/"><span>Saw Box code</span><strong>471</strong></a>
            <a href="/endacopia-let-me-go-let-me-talk/"><span>Office phrases</span><strong>LET ME GO / TALK</strong></a>
            <a href="/endacopia-scribbly/"><span>Scribbly map</span><strong>8 pieces + SCRIBBLY</strong></a>
          </div>
          <!-- COMPLETE_SITE_HERO_ANSWERS_END -->`;
}

async function updateHomepage() {
  const file = path.join(root, "index.html");
  let html = await readFile(file, "utf8");
  html = html.replace(/\s*<!-- COMPLETE_SITE_DEEP_DIVES_START -->[\s\S]*?<!-- COMPLETE_SITE_DEEP_DIVES_END -->\n*/g, "\n");
  html = html.replace(/\s*<!-- COMPLETE_SITE_TRUST_START -->[\s\S]*?<!-- COMPLETE_SITE_TRUST_END -->\n*/g, "\n");
  html = html.replace(/\s*<!-- COMPLETE_SITE_HERO_ANSWERS_START -->[\s\S]*?<!-- COMPLETE_SITE_HERO_ANSWERS_END -->\n*/g, "\n");

  const needle = '      <section class="band">\n        <div class="container content-layout">\n          <article class="article">\n            <h2>How to Use This Hub</h2>';
  if (!html.includes(needle)) {
    throw new Error("Homepage insertion point not found");
  }
  html = html.replace(needle, `${homepageInsert()}\n${needle}`);
  html = html
    .replace(/<title>[^<]*<\/title>/, '<title>Endacopia Guide - Walkthrough, Map, Achievements, Endings & Puzzle Answers</title>')
    .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Endacopia guide hub for walkthroughs, map routes, achievements, all endings, puzzle answers, CHESHIRE, Scribbly, Steam Deck, and boss fight routes.">')
    .replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="Endacopia Guide - Walkthrough, Map, Achievements, Endings & Puzzle Answers">')
    .replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="Endacopia guide hub for walkthroughs, map routes, achievements, all endings, puzzle answers, CHESHIRE, Scribbly, Steam Deck, and boss fight routes.">')
    .replace(/<meta name="twitter:title" content="[^"]*">/, '<meta name="twitter:title" content="Endacopia Guide - Walkthrough, Map, Achievements, Endings & Puzzle Answers">')
    .replace(/<meta name="twitter:description" content="[^"]*">/, '<meta name="twitter:description" content="Endacopia guide hub for walkthroughs, map routes, achievements, all endings, puzzle answers, CHESHIRE, Scribbly, Steam Deck, and boss fight routes.">')
    .replace(/"description": "Fast, spoiler-controlled Endacopia walkthroughs and ending guides\."/g, '"description": "Fast Endacopia walkthroughs, map routes, achievements, endings, puzzle answers, and route checks."')
    .replace(/<span class="eyebrow">Updated [^<]+<\/span>/, '<span class="eyebrow">Updated August 2, 2026</span>')
    .replace(/<h1>Endacopia guides built for quick answers first\.<\/h1>/, '<h1>Endacopia Guide: maps, endings, achievements, and puzzle answers.</h1>')
    .replace(/<p class="lede">Use this hub to jump straight into Endacopia walkthroughs, ending routes, Steam achievements, character pages, and puzzle notes without digging through long videos\.<\/p>/, '<p class="lede">Choose the exact blocker you are stuck on: CHESHIRE, Scribbly map, Saw Box 471, Trapezist, Steam Deck saves, secret Ending C, or the full walkthrough.</p>')
    .replace(/placeholder="Try (?:endings, Clocky, achievements, secret|map, Scribbly, CHESHIRE, Steam Deck, Trapezist|map, Scribbly, CHESHIRE)\.\.\."/g, 'placeholder="Try map, Scribbly, CHESHIRE..."')
    .replace(/<a class="button" href="\/endacopia-all-endings\/">Start with endings<\/a>/, '<a class="button" href="/endacopia-puzzle-solutions/">Open puzzle answers</a>')
    .replace(/<li><span>Pages<\/span><strong>\d+<\/strong><\/li>/, '<li><span>Pages</span><strong>42</strong></li>');
  html = html.replace(/(<p class="lede">[\s\S]*?<\/p>\n)/, `$1${homepageHeroAnswers()}\n`);
  await writeFile(file, html, "utf8");
}

async function updateSitemap() {
  const all = [...basePages, ...newGuides];
  const urls = all.map((slug) => `  <url><loc>${canonical(slug)}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  await writeFile(path.join(root, "sitemap.xml"), xml, "utf8");
}

async function updateVercelConfig(file) {
  const config = JSON.parse(await readFile(file, "utf8"));
  config.headers ||= [];
  if (!config.headers.some((entry) => entry.source === "/assets/og/(.*)")) {
    config.headers.unshift({
      source: "/assets/og/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable"
        }
      ]
    });
  }
  await writeFile(file, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}

async function updateAllHtml() {
  const files = await walkHtml(root);
  for (const file of files) {
    const html = await readFile(file, "utf8");
    await writeFile(file, updateSharedHtml(html, file), "utf8");
  }
}

await writeNewPages();
await updateHomepage();
await updateSitemap();
await updateVercelConfig(path.join(process.cwd(), "vercel.json"));
await updateVercelConfig(path.join(root, "vercel.json"));
await updateAllHtml();

console.log("Completed Endacopia guide hub pages, metadata, sitemap, and cache headers.");
