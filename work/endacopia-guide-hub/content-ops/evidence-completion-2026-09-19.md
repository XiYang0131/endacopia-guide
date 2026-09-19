# Endacopia evidence completion — 2026-09-19

Scope: original-source follow-up after the answer-maintenance release e2a85d1. English public Steam and Reddit sources retrieved September 19. No new GA4/GSC performance read, gameplay test, gameplay screenshot or official transcript is claimed. Preserve all 56 canonical URLs and the three existing redirects, titles/descriptions and advertising.

## Claim-to-source decisions

| Claim / page | Original evidence | Decision |
| --- | --- | --- |
| Broken Phone / Phone, Items, Telescope, Puzzle | [Original discovery thread](https://steamcommunity.com/app/2684630/discussions/0/589559342036963893/) and [TotadiCocainine's fight record](https://steamcommunity.com/app/2684630/discussions/0/589559427438314447/) | Two original player accounts support the broad route. Attribute the second author; remove unsupported consumption / Fairy identification. No universal failure fix. |
| Opening Clocky / Clocky, Ending C, All Endings, Puzzle | [Original post, edit 3](https://www.reddit.com/r/Endacopia/comments/1v95wch/ending_c_secrets/) and [separate completion report](https://www.reddit.com/r/Endacopia/comments/1w30vlo/question_about_the_underground_secret_no_spoilers/) | Corrected community guidance; no longer recommend repeating the opening merely to skip the fight. Not a local playtest. |
| Additional Clocky cross-check | [Koetype guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3773698067&l=greek) | The English guide body was available through the Greek-interface URL. Base and English-interface URLs returned web-tool Internal Error. No combat timing inferred. |
| A/B prerequisite | [First-run completion reply](https://www.reddit.com/r/Endacopia/comments/1vegamb/is_there_a_way_to_get_the_other_endings_without/) | Single first-person counterexample; retain needs-verification for universal branch conditions. |
| Surgeon / Meaning | [Clowntainment's list](https://steamcommunity.com/sharedfiles/filedetails/?id=3773653390) and [publication/provenance discussion](https://steamcommunity.com/app/2684630/discussions/0/589559342036981989/) | The author says the list is datamined. These two links are ONE provenance chain, not independent confirmation. Later matching transcripts may be derivative. Suggested inputs are documented reference strings, not verified runtime answers. |
| Ozzie / Characters | Early player-discovered keywords in the provenance discussion, plus TotadiCocainine's independent boss record | Two accounts support the alias; detailed lore is not upgraded. |
| Graveyard memory puzzle / Puzzle | [Player help thread](https://www.reddit.com/r/Endacopia/comments/1vj75vt/glitch/) plus [Viri's guide comments](https://steamcommunity.com/sharedfiles/filedetails/?id=3773067527) | Independent support for thematic pairing; first thread supplies interaction/completion detail. No numbered pairing map or universal frozen-screen diagnosis. |
| Other constellations | [Original graveyard question](https://www.reddit.com/r/Endacopia/comments/1v9o9vh/anyone_know_what_the_hidden_graveyard/) | Unresolved lead; not the beach clue. No reward invented. |

## Excluded or qualified material

- The Camera discussion does not substantiate the old Fairy label. The Nove/9PM Office thread concerns another encounter, not Broken Phone.
- Cached relative timestamps are not used as exact publication dates. Source retrieval date is not a new patch date.
- No copied walkthrough prose, full transcript, downloaded player screenshot or invented gameplay capture.
- No new evidence for universal save recovery, Wrench/Core Key failure recovery, precise combat input timing, A/B ordering or all parser aliases. These remain pending.
- No new pages or title experiments based on this research.

## Technical correction and acceptance

The Ending C troubleshooting FAQ's first JSON-LD question accidentally contained multiple preceding article sections. Fixed its value to the actual visible question, updated the related answer, and made the FAQ regression matcher unable to cross a closed H3. This is a schema consistency fix, not a rich-result eligibility claim.

Validation completed:

- Root `npm run build`: 56 canonical pages; internal operations files excluded.
- `node scripts/check-consolidation.cjs dist`: PASS, 56 pages / 3 retired-route redirects / 2,122 internal links and fragments / 5 Ending C FAQ answers; date/canonical/GA checks passed.
- `node scripts/check-answer-maintenance.cjs`: PASS, 21 visible/structured FAQ matches, unchanged traffic URLs and shared advertising/navigation assets; added a heading-boundary regression fixture.
- `node scripts/check-evidence-completion.cjs`: PASS, original-source links, unsupported-claim removal, parser uncertainty and repaired FAQ question.
- `npm run test:performance --prefix work/endacopia-guide-hub`: PASS, 56 pages, 36 static panels, 116 images, search/scroll checks. Not Lighthouse or field CWV measurement.
- `git diff --check`: PASS.
- 11 guide pages plus changelog modified. Sitemap dates changed only for the two touched pages whose prior date was earlier than today.

Deployment/public verification and GSC outcome are appended after the release. Existing unrelated local reports are intentionally not included in this commit.
