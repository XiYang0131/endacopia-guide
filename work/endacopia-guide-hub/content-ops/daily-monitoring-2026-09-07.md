# Endacopia daily monitoring - 2026-09-07

Run time: 2026-09-07 17:02 Asia/Shanghai. Site: `https://www.endacopiaguide.com/`. This was a fresh read of the signed-in in-app GA4/GSC pages and Google Trends. The main finding is a real Meaning/Lore click-through weakness, but the existing page already contains the direct answer and should not receive an unsupported lore rewrite.

## Scope and data freshness

- Google Trends: `Endacopia` compared with `GPTs`, United States, Web Search. Main windows: Past 7 days and the UI's Past 30 days view as the near-28-day proxy. Twelve-month context was not used.
- Google autocomplete: not read in this pass; no fresh Google Search dropdown session was open, and no old dropdown snapshot was reused.
- Similarweb: not read. No signed-in Endacopia Google US/English 28-day table was available in the current browser session; previous Worldwide estimates were not reused.
- GA4: property selector visibly showed `Endacopia`; custom date 2026-09-07; the acquisition and landing-page reports stated they used 100% of available data.
- GSC: property `sc-domain:endacopiaguide.com`, Web search; UI reported `Last updated: 4-4.5 hours ago`. The current 7-day window is 2026-08-30 through 2026-09-05 and the current 28-day window is 2026-08-09 through 2026-09-05. The freshness lag means these are not same-day GSC totals.
- Complete US/English Top 10 SERP, PAA, image/video modules, and fresh Steam/Reddit evidence were not captured in this pass. No community report was promoted to a confirmed fact.

## Google Trends

### Past 7 days

- Scope: United States, Past 7 days, Web Search, `Endacopia` vs `GPTs`.
- Average relative interest: `Endacopia 44`, `GPTs 3`. This is a relative index, not search volume.
- Visible rising related queries included `endacopia timesville guide` `+50%`; other leading rows were unrelated (`makeship`, `morse code translator`, `andy land`, `metronome`) and were excluded from site decisions.

### Past 30 days as the near-28-day proxy

- Scope: United States, Past 30 days, Web Search, `Endacopia` vs `GPTs`.
- Average relative interest: `Endacopia 57`, `GPTs 5`. Endacopia remained above the comparison baseline throughout the visible series, with `100` on Aug 23 and `88` on Aug 29; the series is directional only.
- Breakout related queries included `ticketa`, `the bride endacopia`, `endacopia soccer ball timing`, and `endacopia explained`. These support existing Characters/Surgeon, Soccer Ball, and Meaning/Lore owners, but do not prove any disputed route or character fact.

Trend URLs: [Past 7 days](https://trends.google.com/trends/explore?date=now%207-d&geo=US&q=Endacopia,GPTs&hl=en-US), [Past 30 days](https://trends.google.com/trends/explore?date=today%201-m&geo=US&q=Endacopia,GPTs&hl=en-US).

## GSC live read

### Current 7 days: 2026-08-30 through 2026-09-05

- Totals: `2,007` clicks, `47,849` impressions, `4.2%` CTR, average position `6.1`.
- Top queries, shown as clicks / impressions: `endacopia telescope` `48 / 369`; `endacopia meaning` `30 / 2,603`; `endacopia water break` `25 / 66`; `endacopia metal detector` `24 / 271`; `endacopia office secret` `21 / 61`; `endacopia soccer ball timing` `19 / 193`; `metal detector endacopia` `16 / 136`; `endacopia office secret puzzle` `16 / 57`; `telescope endacopia` `14 / 121`; `endacopia steam deck` `13 / 55`.
- No valid non-overlapping 7-day comparison was calculated in this run; the prior report used a different, overlapping window. This avoids presenting a stale or overlapping delta as a trend.

### Current 28 days: 2026-08-09 through 2026-09-05

- Totals: `5,930` clicks, `163,064` impressions, `3.6%` CTR, average position `6.3`.
- Top queries, shown as clicks / impressions: `endacopia telescope` `111 / 907`; `endacopia meaning` `99 / 11,375`; `endacopia water break` `63 / 208`; `endacopia soccer ball timing` `59 / 615`; `endacopia metal detector` `51 / 686`; `endacopia office secret` `46 / 185`; `endacopia scalpel` `45 / 167`; `endacopia steam deck` `42 / 260`; `telescope endacopia` `38 / 311`; `water break endacopia` `36 / 122`.
- Top pages, shown as clicks / impressions: Telescope `595 / 7,527`; Puzzle Solutions `585 / 18,240`; Water Break `417 / 2,609`; Soccer Ball `343 / 10,810`; All Fish `331 / 9,818`; Save File `316 / 2,962`; Red Ball `313 / 3,205`; Office Secret `312 / 3,583`; Items `304 / 7,485`; Meaning/Lore `286 / 22,234`.

GSC URL: [Endacopia Search Console performance](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aendacopiaguide.com&num_of_days=28).

## High-impression / weak-ownership audit

The audit used exact page filters in GSC, not only the site-wide query table.

| Priority | Query or page | Current GSC signal | Diagnosis | Action |
| --- | --- | --- | --- | --- |
| P0 | `/endacopia-meaning-lore/` and `endacopia meaning` | Page `286 / 22,234` = `1.3%` CTR; exact query `99 / 11,362` = `0.87%` CTR | Clear outlier. Broad meaning/definition searches generate impressions but few clicks. The page already has a Quick Answer, `Does Endacopia Mean Anything?`, official Steam/demo boundaries, FAQ, and onward links; this is more likely snippet/intent packaging than an absent answer. | Keep one canonical owner. Do not add lore claims today. After the Sep 2 copy's 7-14 day observation window, test a more direct title/meta phrasing around `What does Endacopia mean?`, only if CTR remains below the site answer-page baseline. |
| P1 | Meaning long-tail variants | `what does endacopia mean` `6 / 1,278` = `0.47%`; `endacopia definition` `3 / 1,241` = `0.24%`; `endacopia word meaning` `7 / 510` = `1.37%`; `endacopia name meaning` `3 / 179` = `1.68%` | The page is getting shown for dictionary-style intent, while its title/meta also mention lore and a true ending. That mixed promise may weaken the click decision. | Add no second page. Prepare a concise first-screen answer/heading test for the next maintenance window; keep the evidence boundary that no official dictionary translation is confirmed. |
| P1 | `/endacopia-puzzle-solutions/` | Page `585 / 18,240` = `3.2%` CTR; `endacopia switch puzzle` `10 / 402` = `2.49%`; `endacopia house puzzle` `4 / 141` = `2.84%` | Existing page owns the cluster, but switch/house terms are less efficient than its lock-code and VHS terms. | Add or expose clearer existing anchors for Switch Puzzle and House Puzzle. Do not create duplicate puzzle pages or insert new unverified codes. |
| P2 | `/endacopia-items-guide/` | Page `304 / 7,485` = `4.1%` CTR; `endacopia lost key` `2 / 115` = `1.74%`; `endacopia core key` `2 / 105` = `1.90%` | Smaller but actionable key-intent leakage. Existing content has Lost Key/Core Key coverage, but the route is split across Items, Fish, and Puzzle pages. | Make the handoff more explicit and keep Lost Key ↔ Fish Paper separate from Core Key/Wrench. No new pickup fact without replay or independent confirmation. |
| Monitor only | Soccer Ball / Metal Detector / Telescope query leaders | `endacopia soccer ball timing` `59 / 615` = `9.59%`; `endacopia metal detector` `51 / 686` = `7.43%`; `endacopia telescope` `111 / 907` = `12.24%` | Their page-level CTR is lower because each page receives broad variants, but the named query owners are already earning clicks efficiently. | Do not rewrite these pages based on impressions alone. Maintain current canonical routes and verify answer text only when evidence is available. |

## Meaning page content check

The current local page already includes the essential handoff at [endacopia-meaning-lore/index.html](../endacopia-meaning-lore/index.html):

- direct answer: the title is treated as game-specific and no confirmed official dictionary translation is claimed;
- story context: Mellow, missing senses, surreal point-and-click premise, and horror framing;
- source boundary: official Steam/demo premise separated from player interpretation;
- onward links to Characters, All Endings, Surgeon Questions, and Puzzle Solutions.

Therefore the evidence does not support adding more lore facts. The next controlled change should target search-result packaging or a clearer first-screen exact-question heading, after the existing 7-14 day observation window.

## GA4 live read: 2026-09-07

The GA4 property selector showed `Endacopia` and both reports stated 100% available data.

- User acquisition: `224` users, `192` new users, `37` returning users, `32 sec` average engagement, `1,484` events, `25` key events, `5.63%` user key-event rate.
- `Organic Search`: `209` users, `179` new, `36` returning, `34 sec`, `0.91` engaged sessions per active user, `1,427` events, `25` key events, `6.03%` user key-event rate. This is the dominant acquisition channel.
- Landing pages: `255` sessions, `213` active users, `192` new users, `27 sec` average session engagement, `25` key events, `5.1%` session key-event rate.
- Leading landing rows: `/` `30` sessions; `/endacopia-puzzle-solutions` `28`; `/endacopia-telescope-puzzle` `26`; `/endacopia-items-guide` `24`; `/endacopia-soccer-ball` `21`. The current top-10 landing table did not show Meaning/Lore, so no claim is made about its same-day GA4 volume.
- This read did not expose separate `next_guide_click`, `related_guide_click`, or `guide_scroll_90` event rows; those remain unverified today.

GA4 URL: [Endacopia user acquisition report](https://analytics.google.com/analytics/web/?hl=zh-cn#/a350103355p483141489/reports/explorer?params=_u..nav%3Dmaui%26_u.comparisonOption%3Ddisabled%26_u.date00%3D20260907%26_u.date01%3D20260907&collectionId=11075318713&ruid=6d7c5506-7fd3-4fb9-9dbd-d310879c8320&r=lifecycle-user-acquisition-v2).

## Cross-signal decisions

- Meaning/Lore is a validated demand cluster and the largest impression opportunity, but the page's answer body is already present. The immediate problem is click-through packaging and broad dictionary-style intent, not a missing lore article.
- Puzzle Solutions has a secondary switch/house-puzzle efficiency gap; use existing anchors and route links rather than new URLs.
- Items has a smaller Lost Key/Core Key handoff gap; clarify ownership between Items, Fish, and Puzzle pages without asserting an unverified trigger.
- Telescope, Metal Detector, Soccer Ball, Water Break, Office Secret, and Scalpel have stronger query-level CTR signals. Their page totals should not be judged from impressions alone.

## Local backfill, validation, and deployment

- Added this monitoring record: `content-ops/daily-monitoring-2026-09-07.md`.
- Updated the existing Meaning/Lore owner with the exact-query title/meta/H1 package `What Does Endacopia Mean? Story, Lore & Horror Explained`; the answer remains evidence-bounded and no new lore fact was added.
- Updated Puzzle Solutions with existing-route House/Switch and late-game-code anchors, and updated Items with the existing Lost Key/Fish/Puzzle handoff. No new page and no unverified pickup, route, or ending condition was added.
- Updated `changelog/index.html` and synchronized the four changed sitemap `lastmod` values with their JSON-LD `dateModified` values.
- Root build passed with `npm run build`; `git diff --check` passed. Static audit passed for 59 pages and 59 sitemap URLs, with 0 page assertion issues, 0 internal-link issues, and 0 sitemap/JSON-LD date mismatches.
- Commit `c7632b0` was pushed to GitHub. Vercel CLI inspection was blocked by `The specified token is not valid`, but the public production deployment was verified directly: `/`, Meaning/Lore, Puzzle Solutions, Items Guide, `/sitemap.xml`, and `/robots.txt` returned HTTP 200; the apex returned 308 to `https://www.endacopiaguide.com/`.
- GSC sitemap: the existing `https://www.endacopiaguide.com/sitemap.xml` remains `成功`, with 59 discovered pages and last read 2026-09-05; it was not redundantly resubmitted.
- GSC URL Inspection: the signed-in inspection control accepted the exact Meaning URL into the input, but the UI navigation timed out before an inspection result or `已请求编入索引` receipt appeared. Puzzle Solutions and Items were not retried after the same front-end timeout. These three URL requests are therefore `未确认`, not “已提交”.

## Verification queue and next review indicators

1. Recheck Meaning/Lore after Sep 9-16 using the same page filter and compare exact `endacopia meaning`, `what does endacopia mean`, `endacopia definition`, and lore variants.
2. If the Meaning page remains below 2% CTR with average position near 6, run one controlled title/meta or first-screen heading test, not a new page.
3. Add visible existing anchors for Switch Puzzle, House Puzzle, Lost Key, and Core Key only after confirming the current sections do not already satisfy those labels.
4. Re-read Similarweb with Endacopia seed, Google US/English, Last 28 days; if blocked, record the exact package/login/runtime error and keep it out of the decision.
5. Capture complete US/English SERP, PAA, image/video modules, autocomplete, and fresh community evidence before making any disputed game-fact change.
6. Keep Missing Eyes/Hands/Mouth, Broken Phone, Ending C, Fishing, Surgeon, Henry, Clocky, and combat-input claims at `needs-verification` / `replay-pending` until official or reproduced evidence is available.

## Validation result

- Data read: GA4 today, GSC current 7-day and 28-day windows, Google Trends current 7-day and 30-day proxy; production route checks after deployment.
- Not read: Similarweb, Google autocomplete, complete SERP modules, and fresh player-community evidence.
- Source changes were built and statically validated. Deployment is proven by public HTTP responses; Vercel CLI READY status is not claimed because the local token was invalid.
- GSC sitemap success is confirmed; changed-page URL indexing requests remain unconfirmed because the signed-in URL Inspection navigation timed out.
- This report separates GSC performance from GA4 acquisition, Trends relative interest from search volume, and query-level weakness from page-level ownership.
