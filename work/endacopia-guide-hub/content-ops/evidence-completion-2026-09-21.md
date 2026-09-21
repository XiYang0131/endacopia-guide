# Missing-evidence research and maintenance — 2026-09-21

## Scope and safeguards

Follow-up to the user's request to search online and fill the missing evidence. Base commit: `4453accab2f44d9eee8369d22c6393136f29162b`. Existing Items and Clocky pages plus changelog only; preserve 56 canonical URLs, titles, descriptions, advertising, analytics and the existing redirects. SEO-audit guided claim-to-source checking, direct answers and explicit uncertainty. Use the existing Git-to-Vercel release workflow.

This is targeted content research, not a complete new daily analytics/SERP report. No current search-volume, ranking improvement, original gameplay capture or local game test is inferred. The separate September 21 API/public snapshots are not used to claim this release's effect.

## Evidence decisions

| Topic | Source and observation | Decision |
| --- | --- | --- |
| Cup → water → flower | [Plant question](https://www.reddit.com/r/Endacopia/comments/1vtzhrz/ok_but_also_how_do_i_water_the_plant/) and [separate Office exchange](https://www.reddit.com/r/Endacopia/comments/1v8oo38/what_to_do_in_business_and_town_areas/) independently describe the cup and dispenser sequence. | Add normal-route steps to Items, community cross-checked, not locally replayed. |
| Flower → Wrench → cooler | [Key question](https://www.reddit.com/r/Endacopia/comments/1v8fnne/how_do_i_get_the_key/) includes the original player's acknowledgement; [Office walkthrough](https://dq7reimagined.com/endacopia/office-call-center-guide/) independently describes removing the casing and taking the key, with linked illustrations. | Complete the existing Wrench section and inventory completion check. No copied prose or image reuse. |
| Cup won't fill | Office exchange describes hand interaction before using the cup, acknowledged by the questioner. | Attribute this particular player workaround, not a universal fix or independently reproduced result. |
| Clocky phase 3 | [Steam September 15–16 thread](https://steamcommunity.com/app/2684630/discussions/0/525387344813205437/) and [independent Reddit rematch discussion](https://www.reddit.com/r/Endacopia/comments/1w26mn9/over_clocky_help/) both advise preserving health. | Add a symptom/check/evidence table. No exact hitbox or timing invented. |
| Clocky holding guard | Steam replies disagree with one another; Reddit includes a partial hold-block strategy. [Opening-fight reports](https://www.reddit.com/r/Endacopia/comments/1vjwt7v/cannot_beat_clock_boss/) discuss stamina but mix demo and full game. | Replace the overly absolute rematch instruction with qualified guidance; distinguish encounters and record conflict. |
| Surgeon prompts | [Original provenance discussion](https://steamcommunity.com/app/2684630/discussions/0/589559342036981989/) and [Clowntainment's guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3773653390) remain one datamined provenance chain. | Retain the existing reference-only parser labels; no runtime-confirmed aliases or dialogue added. |
| Ending C A/B order | [First-run counterexample](https://www.reddit.com/r/Endacopia/comments/1vegamb/is_there_a_way_to_get_the_other_endings_without/) and [ending-order discussion](https://www.reddit.com/r/Endacopia/comments/1v9pgt1/endingc_spoilers_questions/) conflict with some secondary guides' mandatory A/B claims. | Do not universalize an unrecorded branch rule; existing qualified answer retained. |
| Broken Phone | Existing independent original accounts were already added September 19. | No duplicate rewrite or unsupported consumption/boss-identity claim. |

Competitor `endacopiaunstuck.com/guides/get-the-wrench` was used only to discover its original links; not counted as an extra independent witness to those sources. Search-engine snippets and translations of the same Steam thread are not separate sources. Cached relative dates are not converted into exact publication dates.

## Retrieval and remaining proof

- The web reader failed to open two Clocky Steam threads with `Internal Error`. Direct HTTPS retrieval over the configured proxy, with certificate validation, returned 200 for both, the trackpad discussion and Surgeon provenance thread. Raw capture: `evidence-research-2026-09-21.json` (private, not deployed).
- [July Clocky thread](https://steamcommunity.com/app/2684630/discussions/0/589559427438230794/) confirms the author's eventual completion but offers no measured stamina formula; its author Koetype also wrote a linked guide, so these are not independent evidence.
- [Trackpad/controller discussion](https://steamcommunity.com/app/2684630/discussions/0/585058941145194947/) contains difficulty reports, not a demonstrated fix. Do not promise controller support, a mercy skip or a universal mouse setting.
- Still needs recorded build/platform/input footage: exact Clocky block timing, stamina and hit reactions; Surgeon parser variants; Ending C branch flags; graveyard numbered matching map; missing Core Key after chapter transition; corrupt/overwritten-save recovery.
- No player screenshot copied. The screenshot walkthrough remains an external evidence link. First-hand verification labels require an actual test and capture.

## Validation and release

Local validation passed: `npm run build` (56 canonical pages, internal files excluded); consolidation (56 pages, 3 retired redirects, 2,139 links/anchors); answer maintenance (21 visible/structured FAQ matches); previous evidence and official-fix regressions; new `check-researched-answers.cjs` (source links, qualified conflict, unchanged traffic metadata and ads); performance regression (36 static panels, 116 images); `git diff --check`. Performance regression is not a Lighthouse or field-CWV score.

Browser GSC preflight: inventory succeeded, but opening a dedicated Chrome tab at the Endacopia sitemap property returned `js execution timed out; kernel reset, rerun your request` after 30 seconds. Stopped browser retries. No GSC submission made; existing read-only API scopes cannot submit indexing requests. Priority URLs are Items and Clocky; the sitemap is the XML endpoint, not an HTML guide.

Exact-commit release and public HTTP verification pending at preparation. Deployment, request queue, indexing and ranking remain separate states.
