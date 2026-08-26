# Endacopia daily search and content monitoring — 2026-08-26

## Run summary

- Collection time: 2026-08-26 18:33 Asia/Shanghai. This is a manual backfill after the scheduled run was missed.
- Scope: Endacopia and Endacopia Guide Hub; Google Suggest, Google Trends, GA4, GSC, Similarweb availability, public SERP discovery, Steam, Reddit, and existing-page ownership.
- Decision: reuse existing pages. No new page was created. After the data-only run, a user-authorized official 1.08 patch-fact update was added to the existing Patch Notes page; no unverified route conclusions were changed. The strongest signals map to Meaning/Lore, All Endings, Puzzle Solutions, Clown/Red Ball, All Fish, Timesville Fishing, Items, Telescope, Soccer Ball, and Surgeon Answers.
- Evidence boundary: the fishing input report, save-file report, Clocky/Ending C discussion, softlock reports, and combat-input questions remain community reports or needs-verification. They were not promoted to confirmed answers.
- Release boundary at data-collection time: monitoring record only; no GSC URL inspection request, sitemap submission, post, or external form submission was made. A later user-authorized production deploy is recorded below.

## Query and source parameters

### Google Suggest

- Endpoint: `https://suggestqueries.google.com/complete/search?client=firefox&hl=en-US&gl=us&q=...`
- Locale: `en-US`, `gl=us`, English; queried 2026-08-26.
- All eight requests returned HTTP 200. Suggestions are discovery signals, not search volume or trend direction.

| Seed | Visible suggestions relevant to the site |
| --- | --- |
| `Endacopia` | game, wiki, meaning, endings, Trapezist, walkthrough, release date, characters, guide |
| `Endacopia ending` | endings, ending c, ending b, ending guide, ending c guide, ending c questions, ending explained, ending c explained, ending c walkthrough, ending c reddit |
| `Endacopia clown` | clown puzzle, clown, clown girl, clown couple, clown boss, clown fight, clown songs, clown surgery, clown game, clown puzzle solution |
| `Endacopia fish` | fish, fishing guide, fish key, fish paper, fishing game, fishing head, fish list, fishing license |
| `Endacopia surgeon` | surgeon, surgeon song, surgeon questions, surgeon wife, surgeon all questions, surgeon fanart |
| `Endacopia Clocky` | Clocky, Clocky fight, Clocky 2, Clocky fanart, Clocky fight 2 |
| `Endacopia broken phone` | broken phone; unrelated repair queries also appeared |
| `Endacopia missing eyes hands mouth` | no suggestions |

Interpretation: endings, clown, fishing, and surgeon have clear query expansion and existing URL ownership. No suggestion for the exact missing-senses seed is not evidence of zero demand.

### Google Trends

- URL: https://trends.google.com/trends/explore?geo=US&hl=en-US&date=today%2012-m&q=Endacopia,GPTs
- Query date: 2026-08-26.
- Region/language/search type: United States, English UI, Web Search.
- Time window: past 12 months, displayed from 2025-08-24 through 2026-08-23.
- Comparison baseline: `Endacopia` versus `GPTs`.
- Average relative interest: Endacopia `6`; GPTs `17`.
- Endacopia weekly relative values rose from `71` on 2026-08-16 to `100` on 2026-08-23; GPTs was `7` on both displayed weeks.
- Rising related queries for Endacopia: `endacopia ending`, `endacopia clown`, `endacopia guide`, `endacopia endings`, and `endacopia fish`, all displayed as `Breakout`.

These are relative index values. They are not absolute searches, traffic, or a page recommendation by themselves.

### Similarweb

- Intended scope: seed `Endacopia`; Google US/English; 28 days; Related Keywords, Questions, and Keyword Generator/rising terms.
- Attempted URL: https://pro.similarweb.com/#/digitalsuite/acquisition/findkeywords/keyword-generator-tool/999/28d?searchEngine=google&keyword=endacopia&webSource=Total&isWWW=*&tab=relatedKeywords
- Result: the in-app navigation did not return a readable report within the 30-second runtime. Exact runtime message: `js execution timed out; kernel reset, rerun your request`.
- Status: unavailable. No current Similarweb estimate, traffic/search value, KD, Related Keywords, Questions, or rising-term data was used. No old snapshot was reused.
- Weekly full review: incomplete until Similarweb is readable; no keyword is promoted from Similarweb.

## GA4 live read

- Property: `Endacopia`; property/context ID `a350103355p483141489`.
- Read date: 2026-08-26.
- Period: 2026-08-26 only; the report stated 100% of available data.
- Scope: the header showed Endacopia, but no hostname filter was visible. Treat these as property-level observations; hostname purity was not independently proved.
- Browser/runtime note: GA4 reports were readable, but several menu interactions emitted Statsig telemetry errors with `Timeout of 10000ms expired`. This did not prevent the visible report data from loading.

### Acquisition by default channel group

- Users: `154`
- New users: `130`
- Returning users: `22`
- Average engagement time per active user: `29 seconds`
- Engaged sessions per active user: `0.89`
- Events: `917`
- Key events: `14`
- User key-event rate: `4.9%`
- Organic Search: `143 users`, `123 new users`, `20 returning users`, `31 seconds` average engagement, `864 events`, `14 key events`, `5.26%` user key-event rate.

### Pages and screens

- Total: `225` views, `143` active users, `1.57` views per active user, `29 seconds` average engagement, `917` events, `14` key events, `¥0.00` revenue.

Top visible rows:

| Page path | Views | Active users | Views/user | Avg engagement | Events | Key events |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/endacopia-puzzle-solutions/` | 30 | 26 | 1.15 | 22s | 121 | 1 |
| `/` | 25 | 21 | 1.19 | 12s | 88 | 1 |
| `/endacopia-all-fish-guide/` | 21 | 9 | 2.33 | 15s | 73 | 0 |
| `/endacopia-red-ball-guide/` | 16 | 11 | 1.45 | 25s | 58 | 1 |
| `/endacopia-saw-box-code/` | 15 | 6 | 2.50 | 39s | 55 | 1 |
| `/endacopia-telescope-puzzle/` | 14 | 10 | 1.40 | 59s | 63 | 0 |
| `/endacopia-soccer-ball/` | 10 | 10 | 1.00 | 53s | 49 | 0 |
| `/endacopia-items-guide/` | 9 | 9 | 1.00 | 13s | 37 | 0 |
| `/endacopia-water-break-achievement/` | 9 | 9 | 1.00 | 19s | 48 | 0 |
| `/endacopia-office-secret/` | 8 | 6 | 1.33 | 22s | 41 | 0 |

### Landing pages

- Total: `177` sessions, `143` active users, `130` new users, `23 seconds` average engagement per session, `14` key events, `4.52%` session key-event rate, `¥0.00` revenue.

Top visible landing-page rows:

| Landing path | Sessions | Active users | New users | Avg engagement | Key events | Session key-event rate |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/endacopia-puzzle-solutions` | 24 | 22 | 18 | 23s | 1 | 4.17% |
| `/` | 19 | 19 | 14 | 28s | 2 | 10.53% |
| `/endacopia-red-ball-guide` | 13 | 11 | 10 | 29s | 3 | 7.69% |
| `/endacopia-saw-box-code` | 13 | 6 | 6 | 23s | 1 | 7.69% |
| `/endacopia-telescope-puzzle` | 12 | 9 | 9 | 49s | 0 | 0% |
| `/endacopia-all-fish-guide` | 11 | 9 | 8 | 11s | 0 | 0% |
| `/endacopia-soccer-ball` | 10 | 10 | 10 | 53s | 0 | 0% |
| `/endacopia-items-guide` | 8 | 8 | 7 | 10s | 0 | 0% |
| `/endacopia-water-break-achievement` | 8 | 8 | 8 | 19s | 0 | 0% |

### Events

| Event | Event count | Users |
| --- | ---: | ---: |
| `page_view` | 225 | 151 |
| `session_start` | 174 | 152 |
| `sponsor_ads_loaded` | 153 | 116 |
| `first_visit` | 130 | 130 |
| `user_engagement` | 96 | 78 |
| `guide_scroll_50` | 68 | 57 |
| `scroll` | 29 | 22 |
| `guide_scroll_90` | 21 | 18 |
| `next_guide_click` | 11 | 5 |
| `related_guide_click` | 3 | 3 |

Interpretation: Puzzle Solutions is the strongest entry page; Telescope has the longest visible engagement; All Fish has repeat views per user but no visible key event in this day. The existing next-guide routing is firing, so no duplicate navigation change is justified from this sample.

## GSC live read

- Property: `sc-domain:endacopiaguide.com`.
- Search type: Web; no extra filter.
- Read date: 2026-08-26.
- Freshness shown in the UI: last updated approximately `6.5 hours ago`.
- The latest complete data visible in the UI ends on 2026-08-23. These are not same-day 2026-08-26 search metrics.

### Latest visible 7-day window

- UI window: 2026-08-17 through 2026-08-23.
- Clicks: `1,770`
- Impressions: `50,192`
- CTR: `3.5%`
- Average position: `6.2`

Top visible query rows:

| Query | Clicks | Impressions |
| --- | ---: | ---: |
| `endacopia meaning` | 32 | 3,888 |
| `endacopia telescope` | 28 | 257 |
| `endacopia telescope puzzle` | 26 | 250 |
| `endacopia soccer ball timing` | 23 | 199 |
| `endacopia metal detector` | 17 | 191 |
| `endacopia fishing guide` | 16 | 179 |
| `endacopia scalpel` | 14 | 56 |
| `telescope endacopia` | 12 | 70 |
| `endacopia steam deck` | 11 | 79 |
| `endacopia let me work` | 10 | 107 |

### Latest visible 28-day window

- UI chart window: 2026-07-29 through 2026-08-23.
- Clicks: `2,737`
- Impressions: `76,741`
- CTR: `3.6%`
- Average position: `6.5`

Top visible query rows:

| Query | Clicks | Impressions |
| --- | ---: | ---: |
| `endacopia meaning` | 37 | 4,354 |
| `endacopia steam deck` | 32 | 170 |
| `endacopia telescope` | 28 | 288 |
| `endacopia soccer ball timing` | 27 | 232 |
| `endacopia telescope puzzle` | 26 | 316 |
| `endacopia office secret` | 25 | 123 |
| `endacopia metal detector` | 20 | 273 |
| `endacopia let me work` | 20 | 168 |
| `endacopia fishing guide` | 19 | 260 |
| `water break endacopia` | 19 | 56 |

GSC pages dimension was not read in this backfill; the query and aggregate cards above are the visible GSC evidence. Do not substitute the older page snapshot as today's page dimension.

## SERP and public web observations

- Sources used for discovery: Google web search results for `Endacopia ending guide`, `Endacopia clown puzzle guide`, `Endacopia fishing guide`, and `Endacopia missing eyes hands mouth cemetery holes broken phone`.
- This was not a complete authenticated Google US/English top-10 capture. Full PAA inventories, exact ranking positions, image packs, and video packs were not captured and remain missing.
- Search results show a crowded set of third-party guide pages for endings and clown puzzles, while the official Steam page remains the first-party product reference: https://store.steampowered.com/app/2684630/Endacopia/
- A public clown-puzzle result describes the four-color board and Scalpel handoff: https://endacopiaguide.wiki/puzzles/whack-a-clown . It is a public guide, not official developer documentation.
- A public all-endings result conflicts with other ending counts and labels: https://roguewiki.com/endacopia/guides/endacopia-endings . Treat its extra ending claims as secondary material, not a reason to rewrite the site's canon FAQ.

## Player-community observations and evidence labels

- Steam General Discussions latest visible topics included `ball autoclick help`, `Surgeon misery town`, `ENDING C a question nobody asked`, `SoftLocked?`, `MAKE THE ENDCING C CLOCKY FIGHT EASIER`, `Is my save broken?`, `Office productivity softlock`, and `the train minigame`: https://steamcommunity.com/app/2684630/discussions/ . These titles are `community report`, not confirmed fixes.
- A Reddit Timesville thread reports inconsistent fishing interaction behavior: clicking versus holding may produce different results, followed by a correction that the player got it working. Evidence: `community report / conflicting input report`, not reproduced: https://www.reddit.com/r/Endacopia/comments/1vx3m1o/need_help_in_timesville/
- A Reddit save-file post dated 2026-08-26 offers a progressed save but says fish and metal-detector spots are missing and warns that copying it overwrites files. Evidence: `community report / unverified`; do not recommend it as a universal fix: https://www.reddit.com/r/Endacopia/comments/1vymxru/save_file_for_getting_different_endings/
- The official Steam community surface exposes a current 1.07 patch/fix list including camera, vent, TV, and softlock-related fixes, but route-specific reports still require current-build replay: https://steamcommunity.com/app/2684630

## Cross-signal mapping and decisions

| Signal cluster | Existing owner | Evidence state | Decision |
| --- | --- | --- | --- |
| meaning / lore | `/endacopia-meaning-lore/` | GSC high impressions + Trends term context + existing lore page | Reuse URL; keep current title/description in the observation window; no canon rewrite |
| ending / Ending C | `/endacopia-all-endings/`, `/endacopia-ending-c-complete-route/`, `/endacopia-ending-c-not-triggering/` | Trends breakout + Suggest expansion + Steam discussion; public guides disagree on exact ending model | Reuse URLs; retain needs-verification around canon, Clocky prerequisite, and ending count |
| clown / Scalpel | `/endacopia-puzzle-solutions/`, `/endacopia-clown-theater-puzzle/`, `/endacopia-red-ball-guide/` | Trends breakout + Suggest expansion + public guide result + existing page ownership | Existing coverage is sufficient; no duplicate page or new fixed answer |
| fish / fishing | `/endacopia-all-fish-guide/`, `/endacopia-timesville-fishing-guide/`, `/endacopia-items-guide/` | Trends breakout + GSC queries + GA4 page activity + Steam/Reddit reports | Prioritize replay of input behavior; keep current fishing answer and report conflict as unverified |
| surgeon / let me work | Surgeon Answers, Office Secret, Red Ball | Suggest + GSC queries + GA4 page activity | Reuse existing pages; no new page |
| Clocky / save / softlock / fighting input | Clocky, Ending C troubleshooting, Items, Patch Notes | Steam/Reddit community reports; no reproduced test or official route clarification | Keep needs-verification; define reproduction tasks only |
| Broken Phone / missing senses | Phone and walkthrough coverage | Suggest weak or absent; public discovery sources are secondary | No page or factual answer change |

No keyword meets the new-page threshold. Existing URLs already cover every actionable cluster found in today's signals.

## Local backfill, tests, and release status

- Added this report: `content-ops/daily-monitoring-2026-08-26.md`.
- Updated the existing Patch Notes page with the official 1.08 fix list and synchronized its JSON-LD `dateModified` and sitemap `lastmod` to 2026-08-26. No title or description change was made. Existing `next_guide_click` routing remains the current implementation.
- `npm run build`: passed; output `Static site: no build step required`.
- `git diff --check`: passed with no output.
- Daily-run deployment: user-authorized Git push triggered Vercel production deployment `dpl_3F7qux2xoAsQfzBvcBohF3Bm8v7f`; status `READY`; deployment URL `https://endacopia-guide-4r3vpya06-weijiaxis-projects.vercel.app`; source commit `20fd84d8134ccc9bf79a43f618fce8f91c679ab3`.
- Official 1.08 fact update deployment: Vercel production deployment `dpl_7LhFQ2MvrrbF5Zzxd44g9XdQeZtZ`; status `READY`; deployment URL `https://endacopia-guide-js6bo804a-weijiaxis-projects.vercel.app`; source commit `799913092f3708653b3cbad8eb66cb821cb5633c`.
- Production verification after the fact update: `www.endacopiaguide.com` Patch Notes, Changelog, `robots.txt`, and `sitemap.xml` returned HTTP 200; sitemap contained 59 URLs; all 59 sitemap pages passed production H1, canonical, GA4, image-alt, and date consistency checks; the new 1.08 markers were present; apex returned HTTP 308 to `https://www.endacopiaguide.com/`.
- GSC URL inspection/indexing: not performed by this daily run.
- Existing unrelated untracked reports and parent-directory files were preserved.

## Verification queue

1. Reproduce fishing click/hold behavior on the current Steam build; record platform, build, exact input, and whether the green bar or catch state appears.
2. Reproduce `Is my save broken?`, `SoftLocked?`, office productivity, and missing-item reports; capture the room, trigger, save state, and recovery path.
3. Test both the opening Clocky encounter and the Ending C route after all three secrets; do not treat a single completed run as proof of the prerequisite.
4. Verify the Broken Phone/telescope/metal-detector relationship with a current-build replay.
5. Re-run Similarweb after the redirect/runtime problem clears and complete the overdue current-vs-previous 28-day review.
6. Capture authenticated Google US/English SERP top 10, PAA, image, and video results for `Endacopia meaning`, `Endacopia ending C`, `Endacopia clown puzzle`, and `Endacopia fishing guide`.

## Next review indicators

- GSC: `endacopia meaning`, `telescope puzzle`, `soccer ball timing`, `metal detector`, `fishing guide`, `scalpel`, `office secret`, and `let me work`; compare clicks, impressions, CTR, and position after the next fresh data window.
- GA4: landing-page engagement and `next_guide_click`, `related_guide_click`, and `guide_scroll_90` for Puzzle Solutions, Meaning/Lore, Telescope, All Fish, Items, and Red Ball.
- Trends: repeat the US/English `Endacopia` versus `GPTs` comparison and record the next weekly values; do not interpret Breakout as search volume.
- Similarweb: Related Keywords, Questions, rising terms, estimates, KD, and current-vs-previous 28-day changes once readable.
- Evidence: official patch notes or a reproducible current-build test resolving fishing input, Clocky, saves, softlocks, Broken Phone, or fighting input before any factual page backfill.
