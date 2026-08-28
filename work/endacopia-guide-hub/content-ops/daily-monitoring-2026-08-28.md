# Endacopia daily search and content monitoring — 2026-08-28

## Run summary

- Run date: 2026-08-28, Asia/Shanghai. This is a live manual execution of the daily monitoring task; no old snapshot was substituted for today's reads.
- Scope: Endacopia and Endacopia Guide Hub; Google Trends, Google Suggest, Similarweb keyword discovery, GA4, GSC, Google US/English SERP, Steam Community, Reddit, and existing-page ownership.
- Decision: keep the current URL architecture and confirmed page facts. No new page, public body-fact backfill, or title/description rewrite was made. After the monitoring pass, the user explicitly authorized deployment and GSC submission; the validated repository state was deployed, while the GSC inspection flow timed out before a request receipt was obtained.
- Evidence boundary: Trends indices, Similarweb estimates, personalized SERP modules, and single-player/community reports are discovery evidence. They are not absolute search volume, ranking proof, or canon. Clocky/Ending C prerequisites, save behavior, Broken Phone, fishing input behavior, and combat-input reports remain needs-verification unless supported by official documentation or a reproduced test.

## Query and source parameters

### Google Trends

- Comparison: `Endacopia` versus `GPTs`.
- Region/language/search type: United States, English UI, Web Search.
- Read date: 2026-08-28.
- Main windows: Past 7 days and Past 30 days, used as the near-one-month window. A first attempt using `date=now 28-d` returned the UI error `Oops! There was a problem displaying this page.` and did not produce a time period; it was not treated as data. The valid retry used `date=today 1-m`.
- URLs:
  - https://trends.google.com/trends/explore?date=now%207-d&geo=US&q=Endacopia,GPTs&hl=en-US
  - https://trends.google.com/trends/explore?date=today%201-m&geo=US&q=Endacopia,GPTs&hl=en-US
- 12-month background window: not read in this run and not used for today's decision.

#### Past 7 days

- Average relative interest: Endacopia `38`; GPTs `1`.
- Endacopia showed repeated hourly variation with a visible peak around `91` in the captured table. These are normalized relative indices, not query counts or traffic.
- Rising related queries: `the witch's house` (+4,650%), `andy land` (+650%), `markiplier` (+120%), `how long is endocopia` (+90%). Rising percentages are low-base/relative signals and were not used alone for page creation.
- Top subregions were Utah, Idaho, Nebraska, New Hampshire, and Alaska. Subregion concentration is not an SEO recommendation by itself.

#### Past 30 days / near-one-month view

- Average relative interest: Endacopia `51`; GPTs `6`.
- Endacopia values rose from the high-30s/40s in late July to `54` on Aug 19, `75` on Aug 20, `80` on Aug 22, `100` on Aug 23, `66` on Aug 24–25, `64` on Aug 26, `69` on Aug 27, and `85` on Aug 28 in the captured normalized series.
- Rising related queries were displayed as `Breakout`: `mellow`, `endacopia surgeon`, `trapezist`, `endacopia trapezist`, and `endacopia guide`.
- GPTs related/rising terms were unrelated to Endacopia intent and were retained only as the comparison baseline.

Interpretation: the near-month trend supports continued ownership of existing Mellow, Surgeon, Trapezist, guide-index, and ending/lore routes. It does not independently justify a new page or a factual lore rewrite. `Breakout` on a low base remains a needs-verification opportunity signal.

### Google Suggest

- Endpoint: `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=...`
- Read date: 2026-08-28.
- Locale: `en`, `gl=us`, English; all seven seeds returned HTTP 200.
- Suggestions are demand-discovery signals only; they are not search volume or trend direction.

| Seed | Relevant returned suggestions |
| --- | --- |
| `Endacopia` | wiki, game, meaning, trapezist, endings, walkthrough, characters, guide, release date |
| `Endacopia ending` | endings, ending c, ending b, ending c guide, ending guide, ending c questions, ending explained, ending c walkthrough, ending c reddit |
| `Endacopia fishing` | fishing, fishing guide, fishing key, fishing paper, fishing game, fishing head, fishing license |
| `Endacopia surgeon` | surgeon, surgeon questions, surgeon song, surgeon wife, surgeon all questions, surgeon answers, surgeon reddit |
| `Endacopia Clocky` | Clocky, Clocky fight, Clocky 2, Clocky fight 2, Clocky rematch, second Clocky fight |
| `Endacopia broken phone` | broken phone, plus generic phone-repair/near-me/worth suggestions |
| `Endacopia combat` | `endacopia combat` only; no useful expansion |

Interpretation: meaning, endings, fishing, Surgeon, and Clocky have query expansion, while Broken Phone is polluted by generic repair intent and combat has no expansion. Existing pages already own the actionable clusters; no duplicate page was proposed.

### Similarweb keyword discovery

- Tool/source: Similarweb free keyword generator, seed `Endacopia`.
- Read date: 2026-08-28.
- Displayed engine: Google/default; displayed window: searches over the last 28 days.
- Scope limitation: the free result dialog exposed no US country selector and its upgrade URL used `country=worldwide`. Therefore this is **not** the required Google US/English slice. It is recorded only as limited worldwide discovery evidence.
- The popular view showed approximately 1,360 keywords. The related-keyword view displayed a much larger count (93,663), but the free UI did not expose a reliable trend-direction field.

| Keyword | Displayed 28-day estimate | Intent | CPC | KD | Existing ownership |
| --- | ---: | --- | ---: | ---: | --- |
| `endacopia` | 792.7K | navigational / informational | $0.26 | 8 | homepage / guide index |
| `endacopia game` | 21.7K | navigational / informational | $0.23 | 9 | homepage / game guide |
| `mellow endacopia` | 21.5K | not shown | not shown | not shown | Mellow/characters coverage |
| `trapezist endacopia` | 15.5K | not shown | not shown | not shown | Trapezist/boss coverage |
| `endacopia meaning` | 14.5K | informational | not shown | not shown | `/endacopia-meaning-lore/` |
| `endacopia mellow` | 11K | not shown | not shown | not shown | Mellow/characters coverage |
| `endacopia wiki` | 10.5K | not shown | not shown | not shown | `/endacopia-wiki/` |
| `endacopia walkthrough` | 9.4K | not shown | not shown | not shown | walkthrough routes |
| `endacopia surgeon` | 9.1K | not shown | not shown | not shown | `/endacopia-surgeon-answers/` |
| `endacopia trapezist` | 9.1K | not shown | not shown | not shown | Trapezist/boss coverage |

Related-keyword rows additionally showed `endacopia steam` (5.7K), `endacopia full game` (3.7K, KD 18), `endacopia demo` (6.6K, KD 13), and `endocopia game` (6.7K, KD 13). These values are tool estimates and worldwide scope, not GSC or US search volume.

Questions and current rising terms were not readable: selecting the Questions view displayed `创建账号以继续使用 Similarweb` / an account upsell instead of data. No old Similarweb questions snapshot was substituted and no further retry was made.

### GA4 live read

- Property: `Endacopia`; property context `a350103355p483141489`.
- Report scope: selected dedicated Endacopia property; no mixed-property total was attributed to the site. A separate hostname filter was not visible in the UI.
- Read date: 2026-08-28; report UI stated 100% available data for the same-day acquisition view.
- Same-day acquisition view, date 2026-08-28: `58` users, `49` new users, `8` returning users, `32 sec` average engagement time, `0.78` engaged sessions per user, `337` events, `17` key events, and `9.26%` key-event rate.
- Source/medium grouping visible in that view: Organic Search `55` users, Unassigned `4`, Direct `2`. Organic Search showed `316` events and `14` key events. These are GA4 property totals for the selected date, not GSC metrics.
- Realtime snapshot: `10` active users in the last 30 minutes and `3` in the last 5 minutes; first-interaction source showed Google with `2` active users.
- Visible realtime page titles included Ending C (`4` views), All Endings (`2`), Save File (`2`), Telescope (`2`), Trapezist (`2`), and Guide Index (`1`). Pagination was only partially read; no claim is made about all page-title rows.
- Visible realtime events: `page_view` `17`, `user_engagement` `12`, `sponsor_ads_loaded` `9`, `session_start` `8`, `first_visit` `6`, `guide_scroll_50` `6`, `guide_scroll_90` `5`, `scroll` `5`, and `search_intent_click` `1`. `next_guide_click` and `related_guide_click` were not visible in this current snapshot.
- One attempted realtime pagination action ended with the exact runtime error `js execution timed out; kernel reset, rerun your request`. The GA4 read is therefore partial for page-title pagination, not a failed property read.

Interpretation: organic search is the dominant visible acquisition source and the existing ending, telescope, save-file, Trapezist, and index pages are receiving current realtime views. The short sample does not justify copy changes or a new page. Continue measuring internal navigation and scroll events after the prior route-handoff deployment.

### GSC live read

- Property: `sc-domain:endacopiaguide.com`.
- Search type: Web; no additional query/page filter.
- Read date: 2026-08-28.
- UI freshness: `上次更新日期：6.5小时前` on the 7-day/28-day comparison view; the 24-hour surface showed `11小时前` when first opened. These timestamps are the Search Console data freshness indicators, not the run time.

#### Last 24 hours

- Visible chart dates: 2026-08-26 to 2026-08-27.
- Clicks `188`; impressions `6,723`; CTR `2.8%`; average position `6.3`.
- Top visible queries included `endacopia telescope` (3 clicks/33 impressions), `endacopia steam deck` (3/9), `endacopia fishing guide` (2/41), `how to kick soccer ball endacopia` (2/17), `endacopia scalpel` (2/15), `endacopia save file` (2/3), `endacopia water` (2/3), `what does endacopia mean` (1/73), `endacopia all fish` (1/45), and `endacopia metal detector` (1/20).

#### Last 7 days

- Visible period: 2026-08-19 through 2026-08-25.
- Clicks `1,975`; impressions `59,211`; CTR `3.3%`; average position `6.2`.
- Top queries: `endacopia meaning` (35/4,939), `endacopia telescope` (33/330), `endacopia telescope puzzle` (25/289), `endacopia soccer ball timing` (22/244), `endacopia metal detector` (20/223), `telescope endacopia` (17/109), `endacopia steam deck` (16/98), `endacopia scalpel` (15/66), `endocopia telescope` (15/38), and `endacopia fishing guide` (11/199), where each pair is clicks/impressions.

#### 7-day comparison

- Current 7 days: `1,975` clicks, `59,211` impressions, `3.3%` CTR, average position `6.2`.
- Previous 7 days: `788` clicks, `18,968` impressions, `4.2%` CTR, average position `6.6`.
- Relative change: clicks approximately `+151%`; impressions approximately `+212%`; CTR down `0.9` percentage points; average position improved by `0.4`.
- Query examples: `endacopia meaning` 35 vs 8 clicks; `endacopia telescope` 33 vs 1; `endacopia telescope puzzle` 25 vs 1; `endacopia soccer ball timing` 22 vs 11; `endacopia metal detector` 20 vs 4; `endacopia steam deck` 16 vs 7; `endacopia scalpel` 15 vs 2; `endacopia fishing guide` 11 vs 11 with impressions 199 vs 126.
- The chart included malformed `Invalid Date`/1970 labels in one UI rendering; the table metrics above are retained as the authoritative visible values.

#### Last 28 days and comparison

- Current period: 2026-07-29 through 2026-08-25.
- Current clicks approximately `3,260` (one UI surface displayed `3,263`), impressions `93,219`, CTR `3.5%`, average position `6.5`.
- Top queries: `endacopia meaning` (43/5,732), `endacopia steam deck` (37/189), `endacopia telescope` (34/371), `endacopia soccer ball timing` (33/302), `endacopia telescope puzzle` (26/384), `endacopia office secret` (26/137), `endacopia metal detector` (25/339), `endacopia let me work` (23/192), `endacopia save file` (23/166), and `endacopia fishing guide` (22/334).
- Previous 28-day comparison returned `0` clicks and `0` impressions, CTR `0%`, average position `0`; this is an unusable prior-period baseline. No 28-day growth inference is made.

Interpretation: GSC gives independent support for existing Meaning/Lore, Telescope, Soccer Ball, Metal Detector, Save File, Fishing, and Surgeon-related ownership. The current strongest action is to improve/measure existing route handoffs and verify disputed answers; it is not to open a new page from Similarweb-only estimates.

## SERP and public web observations

- Query: `Endacopia meaning`; engine: Google; `hl=en`, `gl=us`; capture date 2026-08-28.
- The result page was personalized to Salt Lake City/Salt Lake County based on past activity. Exact neutral top-10 order was not normalized, so this is not a clean depersonalized rank-tracking capture.
- Visible modules: web results, AI Overview, People Also Ask, video cards, images navigation, and People-also-search terms. The dedicated Videos tab was not separately captured; the run does not claim a complete video SERP.
- PAA questions included `What is the story of Endacopia?`, `Who is Henry in Endacopia?`, `When is Endacopia expected to be released?`, and `What is Endacopia rated?`.
- Existing owned result was visible: https://www.endacopiaguide.com/endacopia-meaning-lore/ with the snippet that Endacopia is a game-specific title without a confirmed official dictionary translation.
- Other visible sources included Steam, Fandom, Reddit, TV Tropes, X, and YouTube story/all-endings videos. The AI Overview and community interpretations were not used as canon.
- People-also-search terms included `Endacopia meaning in english`, `Endacopia game meaning`, `Endacopia god`, `Endacopia surgeon`, `Endacopia the bride`, `Endacopia characters`, `Endacopia Wiki`, and `Endacopia endings`.
- Images results exposed public guide overlap for Ending C, Puzzle Solutions, Eyes/Hands/Mouth, Walkthrough, and Bosses, plus related searches for characters, circus girl, Henry, Surgeon, and fan art. This is competitive/intent evidence, not proof of game facts.
- Full neutral top-10 ranks, complete PAA inventory, image metadata, and dedicated video-tab results were not captured. The run therefore records an incomplete SERP review.

## Player-community and official observations

- Steam community hub: https://steamcommunity.com/app/2684630. The current visible official update is `Endacopia 1.08`, posted Aug 7. It lists fixes for typos, the camera item on the green mug, Genesis 01 while equipping the skateboard while pressing a button, and clown-corpse jitter. This supports checking camera/skateboard/button regression if relevant; it does not validate every combat or fishing-input report.
- Official update surface: https://steamcommunity.com/app/2684630/eventcomments/580553131768676925/. Evidence class: official developer update surface.
- Reddit Timesville thread: https://www.reddit.com/r/Endacopia/comments/1vx3m1o/need_help_in_timesville/. A player reported fishing not working, then alternated between click/hold explanations and reported that clicking later worked. Evidence class: community report; contradictory and not reproduced. No body answer was changed.
- Reddit unresolved lore thread: https://www.reddit.com/r/Endacopia/comments/1vft8rf/unresolved_gameplaystory_details_all_endings/. Evidence class: community report/unverified interpretation; not used for canon.
- Steam discussions surfaced recent threads for Broken Phone and Eyes/Hands, but a single discussion result is not enough to confirm a general solution. Keep both needs-verification.
- A Steam discussion also surfaced a keyboard movement report (`awsd can't control character to move`), but this is a user report, not a confirmed global input defect.

## Cross-signal mapping and decisions

| Signal cluster | Existing owner | Cross-signal judgment | Decision |
| --- | --- | --- | --- |
| Meaning / lore / Mellow | `/endacopia-meaning-lore/`, characters, wiki | GSC query/impressions + 30-day Trends rise + Suggest/SERP ownership; lore interpretations conflict | Reuse existing URLs; no canon rewrite |
| Ending / Ending C | `/endacopia-all-endings/`, `/endacopia-ending-c-complete-route/`, `/endacopia-ending-c-not-triggering/` | GSC + Suggest + SERP/community activity; exact prerequisites remain uneven | Reuse existing URLs; keep Clocky/route conditions needs-verification |
| Telescope / fishing | `/endacopia-telescope-puzzle/`, `/endacopia-all-fish-guide/`, `/endacopia-timesville-fishing-guide/`, items | GSC + Suggest + Similarweb discovery + SERP/community report | Reuse URLs; queue controlled input replay; no universal click/hold statement |
| Surgeon / Trapezist | `/endacopia-surgeon-answers/`, `/endacopia-trapezist/`, boss coverage | GSC scalpel/surgeon demand + 30-day Trends Breakout + Similarweb worldwide estimate | Monitor and improve navigation only; no new page or unsupported answer |
| Broken Phone | `/endacopia-phone-puzzle-answers/` | Suggest is polluted; a fresh community thread is a single report | No body update; keep needs-verification |
| Combat / keyboard input | existing troubleshooting and boss pages | Suggest has no expansion; community reports are isolated | No content change; reproduce on a controlled build before editing |
| `how long is Endacopia` / playtime | no dedicated page | Trends/SERP discovery but no validated GSC/Site gap or official timing source | Defer; no new page |

No candidate met the two-independent-signal threshold for a new page or an unverified factual body rewrite. The strongest actionable conclusion is to keep existing pages crawlable, route users between owned pages, and validate disputed gameplay controls.

## Local backfill, tests, and release status

- Added this report: `content-ops/daily-monitoring-2026-08-28.md`.
- No public page body, title, description, JSON-LD, sitemap, or navigation file was changed in this run.
- User-authorized production deployment: pushed commit `5f83a48` (`Record Endacopia daily monitoring 2026-08-28`) to `origin/main`. Vercel project `weijiaxis-projects/endacopia-guide` produced deployment `https://endacopia-guide-clv3gzdfb-weijiaxis-projects.vercel.app` with status `Ready`, target `production`, and Vercel deployment id `dpl_AMvKKZTvZPjAnQsQ3nKww64JaUHX`.
- Direct public verification passed: homepage, Meaning/Lore, Puzzle Solutions, All Fish, Items Guide, `robots.txt`, and `sitemap.xml` returned HTTP 200; the apex domain returned HTTP 308 to `https://www.endacopiaguide.com/`. HTML routes served the existing `main.js?v=20260827-route-handoffs` marker.
- GSC sitemap was not resubmitted because the existing sitemap was already recorded as successful. One URL Inspection navigation was attempted for `/endacopia-meaning-lore/`, but the browser operation failed with `js execution timed out; kernel reset, rerun your request` before a request receipt was visible. Per the no-retry rule, no further inspection or indexing request was made; the five priority URLs remain unconfirmed in this run.
- Existing unrelated untracked files were preserved.
- Validation to run after this report is written: `npm run build`, `git diff --check`, and status inspection. No claim of a new public release is made from local validation.

## Verification queue and next review metrics

1. Reproduce fishing input with click, held mouse, and controller on the current build; record build/device/failure state before changing `/endacopia-timesville-fishing-guide/` or `/endacopia-all-fish-guide/`.
2. Reconcile Ending C and Clocky prerequisites against official material or a controlled replay; retain the current evidence boundary until confirmed.
3. Inspect GSC page/query splits for Meaning/Lore, Telescope, Puzzle Solutions, All Fish, Items, Surgeon, and Ending C on the next readable run; do not use the zero 28-day prior period as a growth baseline.
4. Track GA4 `next_guide_click`, `related_guide_click`, and `guide_scroll_90` by landing page over the next 7–14 days; today's realtime snapshot did not expose the first two events.
5. Retry Similarweb only when Google US/English scope and current 28-day Questions/trend fields are visible; otherwise continue labeling the free worldwide output as limited discovery evidence.
6. Watch official Steam updates for changes after 1.08, especially camera/skateboard/button fixes, before changing input-related copy.
