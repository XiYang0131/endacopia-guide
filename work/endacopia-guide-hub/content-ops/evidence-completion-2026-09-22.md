# Missing evidence follow-up — 2026-09-22

## Scope

User request: search online for the missing evidence, complete the existing guides and continue the previously authorized maintenance release. Base commit: `9c65813031b3a0c3a95825ad22350ab20db2221e`. Four existing guides plus changelog; no new URL, redirect, title/description rewrite, ad change, tracking change, or copied gameplay media.

The SEO-audit skill guided claim-level provenance, direct answers, failure checks and removal of internal work orders from the Boss page. This is targeted evidence research, not a new complete GA4/GSC or Google US SERP report. No traffic improvement, search volume, new official patch, frame test or original screenshot is claimed.

## Evidence decisions

| Existing page / question | Evidence actually read | Decision and boundary |
| --- | --- | --- |
| Clocky: why does guard fail after a hit? | [Hazzmat, September 10, comment 12](https://steamcommunity.com/app/2684630/discussions/0/583932134340834928/) and [pig parfait, September 16, comment 5](https://steamcommunity.com/app/2684630/discussions/0/525387344813205437/) each describe their own completion and needing to reactivate guard after damage. | Add a release/re-press block check. Distinct first-person accounts support a community-crosschecked tip, not an official rule, exact reset duration or guaranteed block. Pig parfait also appears in the earlier thread; their two posts are not counted as two witnesses. |
| Henry: direct punches do not resolve the fight | [HelaPup's original reply](https://steamcommunity.com/app/2684630/discussions/0/589559342036950878/) explains guiding the bat with the hands toward the hanging uvula. [wazor's Ending A route](https://steamcommunity.com/sharedfiles/filedetails/?id=3781525811) separately describes the same environmental target. | Add an answer, encounter prerequisite, aim/result check and source links to the existing Boss guide. Do not add a dodge key, five-hit claim, fixed coordinates or exact phase timings. Not locally replayed. |
| Graveyard scan: how to select and submit a pair | [Original strange-safe post and author's solution](https://www.reddit.com/r/Endacopia/comments/1v8k6cr/endacopia_strange_safe_spoilers/) specify one hole on each side, the large top button, and a child/older woman blowing out candles example. [Separate glitch thread](https://www.reddit.com/r/Endacopia/comments/1vj75vt/glitch/) specifies Exit and disappearance. [Another original player thread](https://www.reddit.com/r/Endacopia/comments/1vfzgdr/stuck_on_a_puzzle/) and [Viri's comments](https://steamcommunity.com/sharedfiles/filedetails/?id=3773067527) corroborate thematic pairing. | Clarify one selection per side and failure checking; attribute the candle example. The child/older-woman pair is also consistent with the Neoseeker indexed reference. Do not publish a numbered coordinate map or claim the site watched the whole sequence. |
| Surgeon: Reflection and parser rules | [RootsyToots's original list](https://steamcommunity.com/app/2684630/discussions/0/589559342036981989/) includes Reflection; SKsheep's July 28 reply says it failed. The thread explicitly identifies Clowntainment's subsequent list as datamined and links to it. | Document the conflicting alias. Remove the unsupported general claim that capitalization is flexible. Full questions remain candidates from the reference, not guaranteed runtime replacements. No new dialogue answers asserted. |
| Broken Phone | [Kromer's original exchange](https://steamcommunity.com/app/2684630/discussions/0/589559342036963893/) and [separate fight-discovery thread](https://steamcommunity.com/app/2684630/discussions/0/589559427438314447/) support beach constellation → detector → Misery Town encounter. This route is already in the September 19 release. | Retain current route; no duplicate rewrite. [Reddit camera discussion](https://www.reddit.com/r/Endacopia/comments/1v9ic45/camera/) mentions consumption but remains an individual report for that specific claim. No guaranteed one-use/respawn/recovery claim. |
| Input accessibility | [Trackpad and controller thread](https://steamcommunity.com/app/2684630/discussions/0/585058941145194947/) has difficulty reports, no working layout or demonstrated fix. | Replace generic controller/sensitivity suggestions with encounter routing and an explicit unresolved boundary. Do not promise native controller support, a mercy skip or a universal setting. |

## Rejected shortcuts and retrieval limits

- Direct HTTPS retrieval through the existing configured proxy, with certificate validation, returned 200 for seven original Steam discussion pages and the wazor/xixi guides. Raw captures: `evidence-research-2026-09-22.json` and `evidence-reference-capture-2026-09-22.json`. Only the visible first page was read for paginated discussions: 15/16 comments in the large Clocky thread, 15/21 in the Broken Phone thread. No claim of exhaustive community coverage.
- The web reader returned `Internal Error` for the two Clocky discussions and the wazor guide; the direct retrieval supplied the actual text. The Steam guide reader displays a removed/incompatible-item notice alongside readable text on some guides; these remain attributed public references, not official endorsements. No guide prose or images copied.
- [Neoseeker Chapter 1](https://www.neoseeker.com/endacopia/Chapter_1) was visible in the search index with the young/old, school/school and mirror/car pair descriptions; opening its live page returned HTTP 403. No live-page or screenshot verification is claimed. The indexed pair labels support only the described scenes, not precise hole positions or version behavior.
- [Brain-scan guide](https://endacopia.wiki/puzzles/brain-scan/) and [Ending C archive](https://endacopiaarchive.wiki/endacopia-ending-c-secrets/) repeat three broad scene pairs. Their independence is not established by having different domains. The brain-scan guide's instruction to photograph each pair conflicts with original button-based explanations, so it was not adopted.
- [Endacopia Unstuck's source list](https://endacopiaunstuck.com/guides/skull-memory-puzzle) was useful for locating the original Reddit posts; it is not an additional independent witness to those posts. Its video link could not be read through the web tool. No frame or video reproduction is claimed.
- Some competitor Henry pages add unsupported dodge controls, fixed phase/hit counts or even conflate the kitchen scene with the final battle. Only the crosschecked bat/target mechanic was used. Different-language versions of the same guide count as one source.
- No confirmed replacement for Ending C's disputed A/B prerequisites, missing Core Key after a chapter transition, corrupted/overwritten save recovery, or exact combat frame/input behavior was established in this pass.

## Actual changes

1. `/endacopia-clocky/`: guard-reactivation symptom/check/source row; preserved conflicting hold-block advice and encounter separation.
2. `/endacopia-boss-fights-guide/`: Henry direct answer and target checks; correct Clocky handoff; removed internal `Next proof task`, publication instructions, duplicated input checklist, unmeasured one-point stamina rule and fixed two-punch advice.
3. `/endacopia-puzzle-solutions/`: one memory per side, explicit confirmation and candle example with original links. Existing anchor retained.
4. `/endacopia-surgeon-answers/`: failed-keyword explanation, original conflict and parser uncertainty; existing prompt reference retained.
5. `/changelog/` and sitemap: only these five modified pages carry September 22; all other dates and 56 URLs preserved. Regression script expanded without changing ads or analytics.

## Validation

- `npm run build`: PASS, 56 canonical pages; operational files excluded.
- `node scripts/check-consolidation.cjs dist`: PASS, 2,145 internal links/anchors, three retired-route rules, canonical/H1/GA tag/alt/date checks.
- `node scripts/check-answer-maintenance.cjs`: PASS, 21 visible/structured FAQ answer matches; public internal files zero; traffic URLs and metadata preserved.
- `node scripts/check-evidence-completion.cjs`: PASS.
- `node scripts/check-official-evidence.cjs`: PASS.
- `node scripts/check-researched-answers.cjs`: PASS, six-page regression coverage including unchanged Items content.
- `npm run test:performance --prefix work/endacopia-guide-hub`: PASS, 36 static panels and 116 images. Not a Lighthouse measurement or field CWV result.
- `git diff --check`: PASS. Existing unrelated dirty reports and untracked root files are preserved and excluded from this release.

## Release / GSC state at preparation

Build and static checks are complete; exact commit push, Vercel READY and public-content verification will be recorded below only after success.

GSC browser inventory was readable. Selecting the existing external Chrome tab for the correct Endacopia sitemap property failed after 21.4 seconds with `Debugger unattached`. No sitemap or URL request was submitted; browser retries stopped. The existing read-only API authorization does not allow sitemap writes and is not an indexing-request API. Resume with the full XML URL `https://www.endacopiaguide.com/sitemap.xml` and the four changed guide URLs. HTML guides are URL-inspection targets, not sitemap files.

## Remaining evidence work and acceptance

1. Record a current-build Clocky rematch with visible stamina, guard state and input immediately before/after damage; compare matched situations rather than estimating from wins.
2. Record the entire graveyard scan, label every hole and scene, submit each pair and capture disappearance. Verify the school and mirror/car pairs directly before adding a complete numbered diagram.
3. Test Surgeon aliases from one save/build: Reflection, full Rodger question, bare/full Ticketo, Ticketa, Ozzie and Bride; retain exact input and full on-screen response.
4. Record Henry's target, hand position, successful and missed swings; do not infer frame windows from the written tactic.
5. For Phone/Core Key/save-loss recovery, obtain a reproducible before/after state or official fix. Preserve working saves; no destructive experimentation on the user's game files.

No original gameplay screenshot was produced. External sources are linked with their provenance instead of relabeling someone else's media as this site's test.
