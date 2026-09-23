# Endacopia daily monitoring and evidence maintenance — 2026-09-23

## Identity, scope and freshness

- Read-only API capture began 2026-09-23 05:33:21 UTC / 13:33:21 Asia/Shanghai; 46/46 calls returned successfully. These are freshly retrieved reporting data, not live concurrent-user counts.
- GSC: `sc-domain:endacopiaguide.com`, siteOwner, Web search, no country/device/query filter. GA4: `properties/483141489`, Admin name `Endacopia`, timezone Asia/Shanghai; exact hostname filter includes only `www.endacopiaguide.com` and `endacopiaguide.com`.
- GSC first incomplete date: September 21. Final 7-day window September 14–20 versus September 7–13; 28 days August 24–September 20 versus July 27–August 23.
- GA4: September 16–22 versus September 9–15; 28 days August 26–September 22 versus July 29–August 25. Yesterday may still receive processing adjustments.
- September 22 content release was verified around 20:21 Shanghai. The GSC window predates that release; GA4 contains less than four hours after it. Neither comparison measures the effect of that release or today's changes.
- SEO-audit guided claim-level evidence, crawl/index distinctions and player-facing answers. Project-locked reporting keeps raw data local and separates metrics from hypotheses. Vercel deployment checks use the existing project and exact commit.

## Results

| Metric | Current 7 days | Previous 7 days | Current 28 days | Previous 28 days |
| --- | ---: | ---: | ---: | ---: |
| GSC clicks | 1,403 | 1,788 | 7,043 | 2,737 |
| GSC impressions | 31,570 | 39,143 | 173,453 | 76,741 |
| GSC CTR | 4.44% | 4.57% | 4.06% | 3.57% |
| GSC average position | 6.45 | 6.19 | 6.21 | 6.53 |
| GA4 total users | 1,137 | 1,480 | 5,972 | 2,952 |
| GA4 active users | 1,118 | 1,454 | 5,941 | 2,951 |
| GA4 sessions | 1,389 | 1,823 | 7,742 | 3,804 |
| GA4 page views | 1,999 | 2,609 | 10,411 | 5,059 |
| GA4 engagement rate | 58.75% | 59.02% | 67.46% | 72.29% |
| Engagement seconds per session, derived | 16.40 | 17.91 | 24.29 | 29.69 |

Seven-day clicks fell 21.5%, impressions 19.3%, sessions 23.8%. Google / organic sessions: 1,276 versus 1,601 (about -20.3%); engagement rate 62.15% versus 62.27%. Twenty-eight-day comparisons remain positive but include a lower earlier site baseline; they do not negate the recent decline.

Guide events: next_guide_click 29 versus 54; related_guide_click 21 versus 34; guide_scroll_90 110 versus 202. The September 18 navigation/tracking change intersects these windows, so event differences cannot be attributed only to content quality. Mobile/desktop current sessions: 835/553. Tablet 7 is smallSample. Characters has only four page views and is also smallSample.

### Five high-impression, low-CTR queries

| Query | Clicks / impressions | CTR | Position (previous) | Existing owner |
| --- | --- | --- | --- | --- |
| endacopia meaning | 5 / 1,204 | 0.42% | 6.79 (5.88) | /endacopia-meaning-lore/ |
| clocky endacopia | 1 / 390 | 0.26% | 7.93 (9.36) | /endacopia-clocky/ |
| endacopia trapezist | 0 / 281 | 0% | 8.48 (8.29) | /endacopia-trapezist/ |
| how long is endacopia | 0 / 274 | 0% | 6.71 (8.39) | /how-long-to-beat-endacopia/ |
| endacopia clocky | 0 / 174 | 0% | 6.52 (6.88) | /endacopia-clocky/ |

Query-page results map each of these returned queries to its intended page. This is not evidence that they need new URLs or that internal cannibalization explains the decline. Meaning has weaker position and CTR; Clocky exposure is growing with improving position but still few clicks. Bare character names can include art/character intent as well as guide intent; native SERP evidence is needed before a rewrite.

The largest page click losses: Soccer -67, Puzzle Solutions -62, Items -35, All Fish -30, Water Break -28. Combined loss 222 is about 58% of the site's net 385-click decline. This is a concentration measure, not a causal decomposition. Soccer position is nearly unchanged (5.56 versus 5.48), while impressions declined by 1,127; lost demand/query mix remains a hypothesis, not proof of stable game-wide interest.

### Five leading landing pages

| Landing page | Sessions current / previous | Engagement rate current / previous | Engagement seconds/session current / previous |
| --- | ---: | ---: | ---: |
| Telescope | 212 / 181 | 69.34% / 71.27% | 19.93 / 25.17 |
| Puzzle Solutions | 135 / 199 | 62.22% / 54.77% | 19.97 / 15.11 |
| Items | 117 / 126 | 69.23% / 67.46% | 21.88 / 14.37 |
| Soccer Ball | 105 / 158 | 61.90% / 65.19% | 12.01 / 15.36 |
| Water Break | 98 / 91 | 57.14% / 63.74% | 13.56 / 13.64 |

Not every landing page has weaker engagement. Puzzle and Items improved on these reported ratios even though traffic is lower. No ad causality or field CWV conclusion is supported by these aggregates.

## Search signals and access limits

- Google autocomplete: six seed requests returned HTTP 200, US/English (`gl=us`, `hl=en`). An instantaneous suggestion list has no 7/28-day volume or KD. Root list includes meaning, endings, Mellow, wiki, characters, Ending C, surgeon, trapezist, walkthrough. Ending C and walkthrough entered this capture relative to September 22; game and bride left. Short-term suggestion changes are not confirmed new demand.
- Meaning suggestions: meaning in English, name meaning, ending meaning, story meaning, Ending C meaning. These map to existing Meaning/Endings/Surgeon sections, not a new page.
- Clocky suggestions include fight 2, second fight and voice lines. Surgeon includes questions/all questions/locations alongside fanart/music. Fishing includes key/paper/license/head. Broken Phone includes irrelevant generic repair suggestions, excluded.
- Trends: Endacopia versus GPTs, US, Web, 7 days returned HTTP 429. The 28-day request was not continued after rate limiting. Both required trend windows remain unread; no claim that overall game interest is stable, rising or falling.
- Similarweb: external Chrome creation for `https://pro.similarweb.com/#/digitalsuite/home` timed out after 30 seconds with `js execution timed out; kernel reset, rerun your request`. Related Keywords, Questions, Generator, volume, KD, and 28-vs-previous-28 review remain unread. No historical snapshot substituted.
- Native Google US/English requests for meaning, Clocky and Trapezist returned HTTP 200 but only a JavaScript redirect shell (zero result headings). Top ten order, PAA, related searches, image and video blocks were not captured. The web search below is supplementary discovery, not a complete native SERP.
- Supplementary public searches found existing Clocky/Surgeon/graveyard guides and Trapezist fan-art discussions. Competitor statements about camera confirmation, parser case-insensitivity and fixed combat rhythm are not adopted without independent original evidence.

## Official/community research and evidence decisions

- Steam News API App 2684630 returned eight entries, unchanged against September 22; latest is Endacopia 1.08, posted 2026-08-07 21:35 UTC. This is coverage of those eight entries, not proof no announcement exists elsewhere. [Official announcement](https://steamcommunity.com/games/2684630/announcements/detail/677380254423056972).
- Fresh Steam discussion listing plus selected Clocky, Telescope and shed-softlock topics: the single shed report still has no reply or verified recovery. [Original report](https://steamcommunity.com/app/2684630/discussions/0/572675438578516414/). No forced restart or save repair is asserted.
- **Soccer, community-crosschecked:** [original Creep guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3773453885) explicitly describes an approximate beat; [separate achievement discussion](https://steamcommunity.com/app/2684630/discussions/0/525387040750270062/) includes conflicting estimates and success without a metronome. Its latest useful reply displayed “22 hours ago” at retrieval; no invented absolute posting timestamp. Cringe Shaymin appears in both, so is counted once. [Original keybind reply](https://steamcommunity.com/app/2684630/discussions/0/589559427438286450/) corroborates the click/white-line cue. The guide reader also displays removed/incompatible notices; it is an attributed community reference, not an official recommendation.
- **Trapezist / Missing Eyes, unverified:** [September 18 original post](https://www.reddit.com/r/Endacopia/comments/1wk12tp/ts_happens_when_you_beat_the_trapezist_without/) raises a no-eyes route and comments discuss a Boon code. No current-build reproduction or second independent route confirmation was obtained. No bypass or code added.
- **Surgeon parser, conflicting:** reread [original keyword thread](https://steamcommunity.com/app/2684630/discussions/0/589559342036981989/); its Reflection failure and datamined-list provenance remain unchanged. A competitor's blanket parser claims do not resolve them.
- **Clocky, community reports:** [September 7 original discussion](https://www.reddit.com/r/Endacopia/comments/1w9raef/ending_c_spoilers_boss_fight_help/) describes arm cues but conflicting hold-block/timing strategies; no new measured frame window. Yesterday's two-account guard-reactivation addition is retained.
- **Graveyard, already covered:** [original glitch discussion](https://www.reddit.com/r/Endacopia/comments/1vj75vt/glitch/) supports thematic pairs plus Exit confirmation/disappearance. It does not supply a reproducibly labelled hole map. No competitor camera-per-pair instruction adopted.
- Broken Phone, Ending C prerequisite combinations, Missing Hands/Mouth, numbered graveyard mapping, Henry exact timing and overwritten-save recovery remain incomplete evidence work. No new complete verification claimed for these topics today; September 22 findings are historical background, not a fresh full replay.

## Actual maintenance

Only Soccer Ball, changelog and their two sitemap lastmod values change publicly. Existing 56 URLs, redirects, titles, descriptions, ads and GA code are preserved.

1. Replace the narrow 92–98 BPM suggestion with source-labelled, optional rhythm aids and an animation-first drift check; explicitly deduplicate the repeated commenter.
2. Remove the unsupported explanation for a disappearing cue and the instruction to skip a cycle as if that preserves an attempt. Retain normal manual input and score feedback.
3. Remove the fifth-red-ball FAQ placeholder about Similarweb from public prose. Its unresolved lead remains internal; no answer or new route has been invented.
4. Update Soccer timing evidence/date and changelog; extend the existing regression check. No original gameplay screenshots or successful replay claimed.

## Verification / release state

- `npm run build`: PASS, 56 canonical pages, operational files excluded.
- `check-consolidation.cjs dist`: PASS, 2,146 links/anchors, three retired-route rules and metadata/GA/alt/date checks.
- `check-answer-maintenance.cjs`, `check-evidence-completion.cjs`, `check-official-evidence.cjs`, `check-researched-answers.cjs`: PASS. Research regression now covers seven pages; 21 visible/structured FAQ matches preserved.
- `npm run test:performance --prefix work/endacopia-guide-hub`: PASS, 36 static panels and 116 images. This is not a field CWV or Lighthouse result.
- `git diff --check`: PASS. Unrelated historical dirty reports/untracked files preserved and excluded from the release.
- Pre-change live check at 11:22 UTC: all 58 pages/files matched the prior September 22 build and returned 200; canonical XML had 56 URLs and application/xml; apex/three retired routes 308; private reports/scripts 404.
- Today's exact commit, production READY and post-release response checks are pending at preparation and must be appended only after success.

## GSC state and blocker

- Read-only URL Inspection succeeded today. Meaning: Submitted and indexed, allowed, successful fetch, matching Google/user canonical; last crawl September 21 02:52 UTC. Clocky: same successful index/canonical status, last crawl September 19 21:25 UTC. These crawls predate yesterday's change and do not prove the latest body was processed.
- Correct `https://www.endacopiaguide.com/sitemap.xml`: API errors=0, warnings=0, lastDownloaded September 19 11:10 UTC. The cached submitted=59/indexed=0 fields are not evidence the live 56-page sitemap is malformed or the whole site is unindexed.
- Two HTML URLs (Meaning and Surgeon) remain erroneously listed as sitemaps with errors=1. They are not the canonical XML file. No deletion performed.
- Attempted to open the correct GSC sitemap property in the in-app browser: 30-second `js execution timed out; kernel reset, rerun your request`. Stopped UI retries. **No sitemap resubmission or index request was submitted today.** Read-only OAuth is not used for writes.
- Pending: canonical XML sitemap; today's Soccer URL; September 22 Clocky/Boss/Puzzle/Surgeon URLs. Individual guides belong in URL Inspection, never in the sitemap URL field. Existing indexed status is separate from a new queue request.

## Next three priorities and acceptance

1. Meaning and character queries: obtain a native US/English SERP with visible answer types before changing a traffic URL or title. Separate dictionary/name, story/Ending C and character/art intent; verify by query-page CTR/position after complete post-change periods. Today's evidence does not support a new page or merge.
2. Soccer: record one current-build manual run with visible cursor, kick cue, score and optional rhythm aid; include misses and success. This can replace timing estimates with demonstrable screenshots. Compare its completed 7-day click/engagement windows, not same-day noise.
3. Clocky/Surgeon/graveyard: capture guard reactivation, exact typed aliases and full paired-hole submission respectively. Require version/platform and repeatable before/after states. Until then preserve the qualified answers, and complete the pending GSC requests when browser control recovers.

## Local evidence files

- `daily-monitoring-2026-09-23-api.json`: raw fresh API responses, locally retained.
- `daily-monitoring-2026-09-23-summary.json`: derived top-N comparisons.
- `daily-monitoring-2026-09-23-public.json`: autocomplete, blocked Trends/native SERP and official news capture.
- `daily-monitoring-2026-09-23-community.json`: fresh Steam listing and selected topics.
- `evidence-research-2026-09-23.json`: original soccer/parser sources, HTTP status and complete captured bodies.
- `evidence-live-2026-09-23-5e96791.json`: pre-change production verification.
