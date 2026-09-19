# Endacopia answer and evidence maintenance — 2026-09-19

## Scope and release boundary

- User authorized researching, completing current pages, maintaining the site and deploying. No new canonical pages, URL changes, further mergers or advertising changes in this iteration.
- Base commit: `93d1110e92437535d06a2fc07dd4b2e1ef84467a`. Preserve the existing three permanent redirects and 56 canonical URLs.
- SEO audit, site architecture and schema skills informed direct-answer placement, claim-specific evidence, distinct page roles and visible/structured-answer consistency.
- Runtime metrics and Google indexing are separate from deployment; no ranking or traffic improvement is claimed.

## Data used for prioritization

Target lock: `https://www.endacopiaguide.com`, GSC `sc-domain:endacopiaguide.com`, GA4 `483141489`. This is a content-maintenance iteration following the same-day audit, not a new complete daily analytics run. No new GA4 engagement inference is made.

GSC audit used Web, all countries/devices, canonical www pages; last complete date September 16, first incomplete date September 17. Completed 7-day window: September 10–16 vs September 3–9. Completed 28-day window: August 20–September 16.

- Meaning query: 1,487 impressions / 9 clicks / average position 6.05, versus 1,750 / 23 / 6.11. The similar average positions and lower CTR do not establish a site-wide ranking penalty or a reason to merge its URL. Prior recent edits also fall near the end of that observation period.
- 28-day page clicks / impressions: Telescope 922 / 10,588; Puzzle Solutions 824 / 23,167; All Fish 381 / 11,296; Office 358 / 3,479; Meaning 292 / 24,639; Name Puzzle 52 / 516; Characters 7 / 1,573; Mellow 6 / 2,241; Screenshot Checklist 3 / 102.
- Existing traffic URLs retained. Screenshot Checklist is repurposed for players, not removed or noindexed.

## Research and evidence boundaries

1. **Name prompt — SCRIBBLY:** original player discussion, an indexed Neoseeker Chapter 1 excerpt and an independent walkthrough agree. Added the box/Flashlight clue, active prompt, map handoff and failure checks. Neoseeker direct retrieval returned 403; its indexed excerpt was not described as a successful full-page fetch.
   - https://www.reddit.com/r/Endacopia/comments/1v8hil9/what_the_hell_is_its_name_lore_spoiler_ig/
   - https://www.neoseeker.com/endacopia/Chapter_1
   - https://dq7reimagined.com/endacopia/walkthrough/
2. **Office — seven symbol rules:** original Steam solution discussion cross-checked with two community guides; answer table matches the displayed clue rather than depending on inconsistent numbered ordering. Includes the hidden fifth caret square and completion beyond the headset room. Removed the misplaced legacy body-part sequence from Ending C and linked to the correct separate guide topics. Also separated general Office progression from the optional secret; no universal softlock cure claimed.
   - https://steamcommunity.com/app/2684630/discussions/0/589559079513582480/
   - https://steamcommunity.com/sharedfiles/filedetails/?id=3773016498
   - https://steamcommunity.com/sharedfiles/filedetails/?id=3773635669
3. **Telescope:** xixi documents the third/last night slot as 04:00; independent player discussions support late-night timing. Added clock, location and door-opening checks; no invented star coordinates or claimed gameplay replay.
   - https://steamcommunity.com/sharedfiles/filedetails/?id=3774754099
   - https://www.reddit.com/r/Endacopia/comments/1vaamov/need_help_on_animal_village_what_to_do_with/
   - https://www.reddit.com/r/Endacopia/comments/1vq2lkn/spoilers_stuck_could_use_a_hand/
4. **Mellow / Characters / Meaning:** creator's premise supports the lost child and player's role. Meaning's short reported dialogue quotation is attributed to a public transcript; it is not a dictionary definition, creator-confirmed spelling origin or proof of a canonical ending. Untested character relationships remain labelled.
   - https://andyl4nd.itch.io/endacopiademo
   - https://www.mejoress.com/endacopia-the-surgeons-answers-ending-c-guide/

No author screenshots copied and no new original gameplay capture produced. Community cross-checking is not a reproduced test. A/B prerequisites, opening Clocky conditions, saw-choice universality, Broken Phone and exact combat inputs remain unresolved where evidence conflicts.

## Maintenance implemented

- Direct answers, prerequisites, completion checks and linked evidence on priority pages. Name, Office and Telescope answers precede the verification panel for mobile readers.
- Removed repeated Meaning sections and Ending C checklists; All Fish owns the full 18-entry table, Fishing owns the Lost Key/hidden-room continuation; Full Game links to the main walkthrough instead of duplicating the opening route twice.
- Removed public screenshot work orders and keyword-planning sections. Existing evidence warnings remain. Promotional media explicitly does not prove a puzzle solution. Item questions with actual answers were retained and renamed, not blindly deleted.
- Kept the indexed Screenshot Checklist URL as player help for recording clues, clock, inventory, build and save state; protects personal data and links to community examples without reproducing their images.
- Published metadata dates reflect only edited pages. Last checked is refreshed only for the researched claims. Affected FAQ and HowTo data follows visible answers.
- Public build changed from copying the entire workspace to a sitemap/asset allowlist. Local `content-ops`, scripts, manifests and notes remain on disk but must return 404 publicly after deployment.

## Verification

- Root `npm run build`: 56 canonical pages, only public assets and robots/sitemap/llms.
- `node scripts/check-consolidation.cjs dist`: 56 pages, three preserved retired-route rules, canonical/H1/GA/image-alt/dates, internal files and fragment targets pass. Final link count recorded in release follow-up.
- `node scripts/check-answer-maintenance.cjs`: 21 FAQ answers match visible text, seven Office rules, no public internal reports, shared advertising/navigation assets unchanged. Existing titles/descriptions unchanged except the intentionally repurposed Screenshot Checklist page.
- `npm run test:performance --prefix work/endacopia-guide-hub`: 56 pages, 36 static next-guide panels, 116 dimensioned images, search/scroll regression pass. This is not a Lighthouse or field Core Web Vitals result.
- Isolated Edge/Playwright rendering: all 56 routes at 1365px and 390px; 112 checks passed with no page script errors or document overflow. Third-party analytics/ads blocked to avoid polluting GA; this does not test ad delivery. Six screenshots saved privately and three visually inspected. Rechecked after answer-panel reordering.
- Recommended agent-browser CLI unavailable: `npx --no-install` returned missing package `agent-browser@0.38.1`; existing bundled Playwright/Edge used instead.
- Build/static checks run without deployment side effects. Publish only the exact reviewed commit; unrelated pre-existing reports and untracked work are not staged.

## Release follow-up

At initial commit preparation, deployment is pending, not successful. After push, verify the exact Git SHA reaches Vercel production READY, current pages/body versions, XML content type and 56 sitemap URLs, apex/retired redirects, and private-report 404s. OAuth scopes are read-only: URL Inspection is not an indexing request.

GSC UI blocker: browser inventory was available, but selecting the existing in-app GSC tab timed out after 30 seconds (`js execution timed out; kernel reset, rerun your request`). One alternative attempt to open the sitemap page in external Chrome also timed out after 30 seconds with the same error. No sitemap or URL indexing submission is claimed; stopped browser retries. This failure is a browser-control runtime problem, not evidence of a Google crawl or property-permission failure.

## Next evidence to collect

Priority captures: the Office original boards and hidden fifth tile; the Telescope clock/constellation/door transition; name clue/accepted SCRIBBLY/map conversation; three complete secrets and late Ending C trigger from a preserved save; exact Surgeon dialogue for Meaning. Record version, platform and branch state. Revisit CTR, completed-window clicks/impressions and guide handoffs after 7–14 days; do not infer causality from incomplete daily totals.
