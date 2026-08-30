# Endacopia daily search and content monitoring — 2026-08-30

## Run summary

- Run date: 2026-08-30, Asia/Shanghai. The live browser read was observed at approximately 14:50 local time; the automation heartbeat timestamp was `2026-08-30T06:50:36.261Z` UTC.
- Scope: Endacopia and Endacopia Guide Hub; Google Trends, Google US/English search, Similarweb, GA4, GSC, Steam, Steam Community, Reddit, and existing-page ownership.
- Decision: keep the existing URL architecture. No new page and no unsupported game-fact rewrite were justified today. Existing Surgeon, Ending, Meaning, Chapter 2, Fish, and Puzzle routes already contain the relevant query entry points or handoffs.
- Evidence boundary: Trends indices and Similarweb figures are directional/estimated only. Community posts are reports, not confirmed facts. A page being visible in Google, GA4, or GSC does not by itself prove ranking, indexing, or a universal gameplay solution.

## Follow-up optimization (2026-08-30)

- Updated the existing `how-long-to-beat-endacopia/index.html` page after the live US SERP showed `how long is endacopia` demand and a visible Search Console card with 531 impressions, 0 clicks, and average position 6.7 for the latest displayed 7-day comparison.
- Added a visible `How long is Endacopia?` answer block that compares the HowLongToBeat SERP snapshot with the Adventure Game Hotspot estimate. The figures are explicitly labeled third-party estimates; the page status is `Conflicting estimates / replay pending`.
- Added a playtime-specific `nextGuideMap` route to Puzzle Solutions, All Endings, and the 100% checklist. No recent title/description rewrite, new page, or unsupported gameplay fact was added.

## Query and source parameters

### Google Trends

- Comparison: `Endacopia` versus `GPTs`.
- Region/language/search type: United States, English UI (`hl=en-US`), Web Search.
- Read date: 2026-08-30.
- Primary windows: Past 7 days and a custom Past 28 days window from 2026-08-03 through 2026-08-30. No 12-month view was used for the daily decision.
- URLs:
  - https://trends.google.com/trends/explore?date=now%207-d&geo=US&q=Endacopia,GPTs&hl=en-US
  - https://trends.google.com/trends/explore?date=2026-08-03%202026-08-30&geo=US&q=Endacopia,GPTs&hl=en-US

#### Past 7 days — read successfully

- UI average relative interest: Endacopia `38`; GPTs `1`.
- Visible Endacopia hourly observations moved from a peak of `100` around Aug 24 to a lower period and recovered to about `70` at the latest visible Aug 30 partial-day point. These are normalized indices, not searches, users, or traffic.
- Visible Rising related queries: `endacopia god` `+120%`; `endacopia endings` `+110%`; `endacopia full game` `+100%`; `andy land` `+100%`; `endacopia all endings` `+100%`. The panel indicated 8 queries in total; only the visible first five were recorded here.

#### Past 28 days — read successfully

- UI average relative interest: Endacopia `51`; GPTs `5`.
- Visible Endacopia daily index values from Aug 3–30: `30, 37, 35, 36, 45, 45, 40, 39, 37, 37, 36, 38, 39, 43, 32, 33, 48, 65, 58, 72, 83, 62, 60, 58, 64, 67, 80, 100`. GPTs remained a lower comparison baseline (`8, 4, 7, 5, 8, 0, 4, 7, 7, 7, 8, 8, 5, 4, 5, 6, 6, 5, 5, 3, 3, 5, 5, 5, 6, 4, 4, 4`).
- Visible Rising related queries: `the surgeon endacopia` Breakout; `endacopia ticketa` Breakout; `ticketa` Breakout; `how long is endacopia` Breakout; `endacopia fanart` Breakout. The panel indicated 25 queries in total; only the visible first five were recorded.
- Interpretation: Endacopia had stronger relative interest than the GPTs baseline in both windows and rose toward the end of the 28-day slice. This identifies current attention, not absolute search volume or a reason to publish an unverified answer.

### Google Suggest, People Also Ask, and related searches

- Google Suggest was not re-read as a standalone endpoint in this run; no suggestion list is claimed for 2026-08-30.
- The live Google US/English seed result at https://www.google.com/search?q=Endacopia&hl=en&gl=us showed PAA/answer questions including `Has Endacopia been released?`, `What does endacopia mean?`, `Is Endacopia a horror game?`, and `Is endacopia scary?`.
- The same result showed question-style prompts about the story, system requirements, characters, endings, and platforms. People also search for included `Endacopia guide`, `Endacopia Wiki`, `Endacopia Mobile`, `Endacopia release date`, `Endacopia 2`, `Is Endacopia finished`, `Endacopia game`, and `Endacopia demo`.
- These observations support existing Meaning/Lore, Characters, All Endings, Download, and Guide Index routing. They do not establish new canon.

## Similarweb keyword discovery

- Read date: 2026-08-30; freshness shown by Similarweb: `Last 28 days (As of Aug 27)`.
- Seed: `Endacopia`; search engine shown: Google; traffic scope shown: All traffic; location shown: Worldwide. A Google US/English location/language filter was not confirmed in the UI, so this is not reported as US/English data.
- URL: https://pro.similarweb.com/#/digitalsuite/acquisition/findkeywords/keyword-generator-tool/999/28d?searchEngine=google&keyword=endacopia&webSource=Total&isWWW=*&tab=phraseMatch
- Keyword Generator totals shown: Phrase match `1,599` keywords / `2.015M` total volume; Related keywords `109,564` / `16.69B`; Questions `173` / `86,530`; Trending keywords `1` / `857,550`.
- Questions visible included `how long is endacopia`, `what is endacopia about`, `where is the beach endacopia`, `what happened to arthur endacopia`, `why is ozzie disfigured endacopia`, `how to get your eyes and hands back in endacopia`, `what does the bride look like endacopia`, `how does the phone in endacopia`, `how many endings are in endacopia`, `how to get ending c endacopia`, `what to ask to the surgeon`, and `how to touch the hole in endacopia room`.
- Related keyword rows visibly included `endacopia guide`, `ticketa endacopia`, `endacopia demo`, `endacopia release date`, `endacopia meaning`, `endacopia surgeon`, `endacopia ending c`, `endacopia henry`, `endacopia walkthrough`, `endacopia characters`, `endacopia endings`, `endacopia chapter 2`, `endacopia house puzzle`, and `endacopia how long to beat`.
- Trending keywords showed `endacopia`, 28-day volume `857.6K`, average volume `26.4K`, zero-click `55%`, KD `8`, intent `NAV`, CPC `$0.26`, and Steam as leader. These are Similarweb estimates and are not treated as GSC volume or proof of demand.
- Cross-check judgment: Similarweb Questions overlap with Trends and Google PAA around meaning, endings, Surgeon, characters, Chapter 2, and game length. The current site already owns these routes. US/English Similarweb evidence is incomplete, so no new page or volume-led rewrite is approved.

## GA4 live read

- Property: `Endacopia`; property context `a350103355p483141489`; a dedicated property was selected and no mixed-property total was attributed to the site.
- Realtime read date: 2026-08-30. Visible snapshot: `3` active users in the past 30 minutes and `0` in the past 5 minutes. Visible pages included the Guide Index (`2` views) and Misery Town Secret Guide (`1` view). Visible events included `page_view` `3`, `session_start` `3`, `user_engagement` `2`, and `first_visit` `1`.
- Report window: 2026-08-02 through 2026-08-29, displayed as Past 28 days.
- Acquisition totals: users `3,820`; new users `3,814`; returning users `591`; average engagement time per user `38 sec`; engaged sessions per user `0.94`; events `28,254`; key events `474`; user key-event rate `6.99%`.
- Organic Search: users `3,431`; returning users `560`; average engagement `40 sec`; engaged sessions per user `0.99`; events `25,703`; key events `436`; user key-event rate `7.29%`.
- Custom events: `guide_scroll_90` `854` events / `696` users; `next_guide_click` `230` / `165`; `related_guide_click` `197` / `137`.
- Top landing-page observations in the same 28-day report: `/endacopia-puzzle-solutions` `321` sessions; `/endacopia-telescope-puzzle` `311`; `/endacopia-save-file-location` `270`; `/endacopia-all-fish-guide` `205`; `/endacopia-items-guide` `195`. Save File Location showed a higher visible session key-event rate (`12.22%`) than Puzzle Solutions (`4.98%`) and All Fish (`4.39%`), so no change was made to its already effective route.
- Interpretation: navigation and scroll instrumentation is firing. Puzzle Solutions and All Fish have enough entry traffic to justify monitoring handoffs, but this read alone does not prove a missing answer or a factual correction.

## GSC live read

- Property: `sc-domain:endacopiaguide.com`.
- Intended scope: Web search performance, latest available page/query metrics.
- Read date: 2026-08-30.
- Result: **本次未读取实时数据。** The direct Search Console performance page failed with the exact browser error `search.google.com 意外终止了连接` / `ERR_CONNECTION_CLOSED`. Per the automation rule, no repeated retry and no local historical snapshot was used as today's GSC data.
- A Google-rendered partial performance card on the public Endacopia search page showed Past 28 days, clicks `1`, impressions `138`, average position `24.4`, and `No prior data`. This is a partial search-result card, not a full GSC query/page export, and is not used as the site's complete GSC metric set.
- Existing sitemap/submission state is unchanged from prior confirmed work: sitemap was already successful with 59 discovered URLs; Guide Index had a prior request-queue receipt; Puzzle Solutions was manually submitted by the user. No new GSC request was attempted because the UI connection was closed.

## SERP and public source observations

### Google US/English

- Seed SERP: https://www.google.com/search?q=Endacopia&hl=en&gl=us. Visible composition included a knowledge-style game overview, Steam official, Fandom, YouTube, Adventure Game Hotspot, itch.io, Steam Community, Instagram, and CrazyGames. Visible release information showed July 27, 2026; the official Steam result is the source for stable release/platform facts.
- Surgeon SERP: https://www.google.com/search?q=endacopia+surgeon&hl=en&gl=us. Visible results were dominated by Fandom, YouTube, Steam Community, Guidexon, Reddit, and other guides. A visible Steam Community topic was `Surgeon Ending C Q&A` dated July 28, 2026; a visible Guidexon result exposed sections for General Questions, Questions About the Surgeon, and Questions About Timesville.
- The Surgeon query also showed image and video blocks and related searches including `Endacopia surgeon questions`, `Endacopia Surgeon bride`, `Endacopia surgeon reddit`, and `Endacopia surgeon songs`.
- Completeness boundary: this was a live inspection of the seed and Surgeon result compositions, visible PAA/related-search elements, images, and videos. It was not a full top-10/PAA/image/video capture for every candidate query; no complete SERP claim is made.

### Official and community sources

- Official Steam page: https://store.steampowered.com/app/2684630/Endacopia/. Read 2026-08-30. Stable visible facts: point-and-click puzzle adventure with psychological/body horror, release July 27, 2026, developer/publisher Andyland, 16 achievements, English support, keyboard and mouse requirement, and content warnings. Evidence class: `official`.
- Steam Community: https://steamcommunity.com/app/2684630/discussions/. Active topics included `Trapezist fight softlock`, `No control changing?`, `Green room puzzles`, `I GOT ENDING C`, `MAKE THE ENDCING C CLOCKY FIGHT EASIER`, and `Mac OS Support When?`. Evidence class: `community report`; these are not universal facts and were not added to body copy.
- Reddit: https://www.reddit.com/r/Endacopia/new/. Fresh posts included an Ending C completion question, a Mellow character discussion, and a character-name question. Evidence class: `community report`; no new canon or route condition was inferred. The subreddit also states a no-AI-slop rule; no post was made.

## Cross-signal mapping and decisions

| Signal cluster | Existing owner | Cross-signal judgment | Decision |
| --- | --- | --- | --- |
| Surgeon / Ticketa / Ticketo | `/endacopia-surgeon-answers/`, `/endacopia-characters/` | Trends Breakout plus Similarweb Questions/related terms plus Surgeon SERP; answer details still need replay or independent confirmation | Reuse existing pages and `#surgeon-questions`; keep answer cells bounded/replay-pending |
| Endings / Ending C | `/endacopia-all-endings/`, Ending C route pages, Puzzle Solutions | Trends and Similarweb/PAA all show endings intent; current selector and troubleshooting handoff already exist | No new page; monitor existing routes |
| Meaning / horror / about | `/endacopia-meaning-lore/`, `/endacopia-characters/` | Google PAA and Similarweb Questions match existing FAQ and official Steam description | No lore speculation or duplicate page |
| Chapter 2 / house puzzle | `/endacopia-walkthrough/`, `/endacopia-puzzle-solutions/`, `/endacopia-prologue-walkthrough/` | Similarweb related questions align with existing Chapter 2 and House Puzzle anchors | Keep current anchors; no new route |
| Fish / Lost Key / beach | `/endacopia-all-fish-guide/`, fishing route, `/endacopia-items-guide/` | Similarweb Questions and existing GA4 entries support current ownership; no fresh reproducible fishing fact | Keep current copy; queue controlled replay if input behavior recurs |
| Clocky / combat / softlock | Clocky and combat sections in existing routes | Steam Community has several recent reports, but no official confirmation or reproduced test in this run | Maintain `needs-verification`; do not add a definite fix or prerequisite |
| Broken Phone / eyes and hands | Phone, Items, and Puzzle routes | Similarweb questions indicate interest, but current evidence remains community or replay-pending | No factual body update |

No candidate met the evidence threshold for a new page or unsupported body-fact change. Existing navigation and FAQ additions from the prior maintenance pass already cover the strongest current demand clusters.

## Local backfill, validation, and release

- Added this monitoring record: `content-ops/daily-monitoring-2026-08-30.md`.
- The follow-up optimization updated `how-long-to-beat-endacopia/index.html` and `endacopia-meaning-lore/index.html`, their sitemap dates, the changelog, and the playtime/meaning route handoffs. No title/description rewrite or unverified Clocky, Broken Phone, combat, fishing, or Ending C prerequisite was promoted to fact.
- Build: `npm run build` passed; static output regenerated in `dist`.
- Diff hygiene: `git diff --check` passed; only existing LF-to-CRLF normalization warnings were emitted.
- Structural checks: passed for 59 sitemap URLs and 59 unique local pages; every URL mapped locally; every page had one H1, one canonical, a GA4 marker, and image alt coverage; every sitemap `lastmod` matched a JSON-LD `dateModified`.
- Deployment: Vercel production deployment `dpl_9dLvVBj9yKpX3FLGt4gPsZs3Vi1T` reached `READY` and was aliased to `https://www.endacopiaguide.com`. Inspect URL: https://vercel.com/weijiaxis-projects/endacopia-guide/9dLvVBj9yKpX3FLGt4gPsZs3Vi1T.
- Public verification: `/`, `/endacopia-meaning-lore/`, `/endacopia-puzzle-solutions/`, `/endacopia-all-fish-guide/`, `/endacopia-items-guide/`, `/robots.txt`, `/sitemap.xml`, and `/content-ops/daily-monitoring-2026-08-30.md` returned HTTP `200`. The public sitemap contained `59` `<loc>` entries. Apex `https://endacopiaguide.com/` returned HTTP `308` with `Location: https://www.endacopiaguide.com/`.
- GSC: no new automated sitemap or URL request was made because the live UI failed with `ERR_CONNECTION_CLOSED`. This is a blocked GSC action, not a successful submission.

## Verification queue and next review metrics

1. Recover GSC access and read 7-day/28-day query and page splits for Surgeon, Endings, Meaning, Chapter 2, Fish, Puzzle Solutions, and Items; compare with a valid previous period.
2. In GA4, continue page-scoped monitoring of `next_guide_click`, `related_guide_click`, and `guide_scroll_90` for Puzzle Solutions, All Fish, Meaning/Lore, and Surgeon; do not infer a page-level change from property totals.
3. Confirm a logged-in Similarweb Google US/English filter and record the next 28-day Related Keywords, Questions, trend direction, estimate, and KD; the current Worldwide slice is only a discovery clue.
4. Reproduce the Steam Community Clocky, Trapezist, control, and green-room reports on the current build before changing factual copy.
5. Recheck the Surgeon question set, Broken Phone, eyes/hands, Fishing input, and Ending C prerequisites with official material or a reproducible test; preserve `needs-verification` where evidence conflicts.

## Release results

- Completed: Vercel production status `READY`; public route verification passed as recorded above.
- GSC handoff: not completed today because the Search Console UI returned `ERR_CONNECTION_CLOSED`; no sitemap or priority-URL request is claimed for this run.
