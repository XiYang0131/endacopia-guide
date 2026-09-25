# Query-answer maintenance — 2026-09-25

## Decision and measurement

Target: endacopiaguide.com, GSC sc-domain:endacopiaguide.com, Web/all countries/devices. Fresh local API evidence in click-loss-2026-09-25.json and daily-monitoring-2026-09-25-api.json. Complete September16–22 vs September9–15; September23 onward incomplete, excluded from decisions. No volume estimates or ranking guarantees.

- Puzzle: 198→152 clicks, 4867→4116 impressions, CTR4.07→3.69%. Page-filtered switch query159 impressions/5clicks/position5.96; password103/1/6.63; light-switch31/1/7.55. The actual Office six-switch answer was missing while the house/fridge link was prominent.
- All Fish: 68→47clicks,1538→1326impressions,CTR4.42→3.54%. Fishing guide106/0; all fish63/0; Jantic Fish41/1. Two navigation blocks preceded the actual fish list.
- Walkthrough:19→5clicks,852→728impressions. Small sample. Returned query-page rows show walkthrough26impressions/0clicks and saw-box-code15/0, while Timesville primarily handles Black Rose/VHS. Some overlap is not proof of cannibalization; no merge, redirect or URL change.

## Implemented

1. Puzzle: source-linked Office switch initial state, sequence, success and failure checks; explicit distinction from fridge switches; first-table row and direct anchor. No guessed reset control; replay pending.
2. All Fish: table immediately after quick answer, one later route panel, license/method anchors, Jantic/Colisa row clarification and spelling-source caveat. Removed premature instruction to continue to secret rooms when the key is missing; troubleshoot the collection first. Existing 18-fish list unchanged.
3. Walkthrough: opening progression instead of optional-achievement instructions; chapter jumps and actionable Chapter2 item checkpoints. Existing answers/URLs retained. No promise that optional achievements are prerequisites.
4. Only these three pages and changelog dateModified/visible date/sitemap dates updated. Meaning, How-long, Trapezist, Clocky, titles, descriptions, canonical, JS/CSS/ads and robots preserved.

## Evidence reviewed

- https://www.neoseeker.com/endacopia/Chapter_1 — switch initial state/order/right-door result; public walkthrough, not local test.
- https://showgamer.com/en/prohozhdeniya-igr/4923-prohozhdenie-endacopia — agrees on switch steps; opening chain and Scalpel operation. Published July29. Similar wording in guides is not two independent gameplay reproductions; public copy explicitly retains replay-pending.
- https://steamcommunity.com/sharedfiles/filedetails/?id=3774754099 — original community achievement guide:18fish/six periods/exit after last catch; opening chain. Some spelling differs. Existing credited image reused, no new asset copied.
- https://endacopiaarchive.wiki/how-to-fish/ — same six fish groups, Colisa Lalia spelling.
- https://www.reddit.com/r/Endacopia/comments/1woad6u/stuck_at_the_beginning_of_chapter_2/ — player reports Scalpel/cup/Red Ball blockers, confirms forgotten clown game after reply. Independent demand/problem corroboration, not proof of every branch.
- Competitor structure reviewed: https://endacopia.store/puzzles/switch-puzzle and https://endacopia.wiki/puzzles/waterfall-code/ . Used to identify initial-state/failure-check answer gaps, not copied text or assumed reliable gameplay authority. Waterfall page does not give an exact numeric answer; no unsupported new waterfall facts added.

Research limits: Neoseeker Chapter_2 open returned Internal Error. Search snippets/competitor reads are not a complete GoogleUS/en top10 SERP; no new Trends/Similarweb metrics. Existing Office phrase sources conflict (HELP vs LET wording); parser/sequence still needs direct current-build verification, outside this bounded switch update. No fabricated gameplay/screenshots.

## Validation and release

npm run build PASS56canonical pages; check-consolidation PASS2172links/anchors and visible FAQ match; check-researched-answers PASS; check-intent-maintenance PASS; new check-query-answers PASS; git diff --check PASS. Regression checks preserve metadata, older anchors, fish table placement and protected pages/assets. These are static checks, not gameplay tests.

GSC browser inventory worked but selecting existing tab1 failed after30s: `js execution timed out; kernel reset, rerun your request`. No index request submitted/queued. Read-only API cannot submit URL indexing. Stop retries for this run. Production deployment and exact-file checks are recorded below after completion.

## Follow-up

Compare complete post-release7d/previous7d by page and query, then28d context; annotate crawl date and deployment. Watch switch/password CTR, fishing-guide/all-fish/Jantic entry engagement and next-guide clicks. Need in-game capture of switch initial/final lights, fish slots/exit achievement and Chapter2 item state. Do not attribute an effect to this release before complete post-crawl data.
