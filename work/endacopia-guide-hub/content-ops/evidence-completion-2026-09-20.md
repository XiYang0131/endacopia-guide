# Endacopia evidence completion — 2026-09-20

## Scope

Follow-up to the request to search for missing evidence and complete the existing pages. Base a5fed8253c6868b7de9af7a9ef763a89d6475966. Six guide pages and changelog; keep all 56 canonical URLs, redirects, titles, descriptions, ads and analytics unchanged. No new gameplay recording, screenshot, save modification or recovery test.

SEO audit guided claim-specific answers and removal of residual internal work orders. Schema guidance limited date changes to edited pages. Existing Git-to-Vercel production workflow retained.

## Sources and decisions

Read the official Steam news API for app 2684630 and followed all eight announcement redirects successfully (HTTP 200, TLS verification enabled). Public raw capture: `evidence-sources-2026-09-20.json`. The web search reader returned Internal Error or image-only output for some announcements; the official API and directly retrieved announcement HTML supplied the original material. These are two delivery methods of one official source, not two independent witnesses.

| Evidence | Existing page and action | Boundary |
| --- | --- | --- |
| [Official 1.02](https://steamcommunity.com/games/2684630/announcements/detail/689764519146160469) | Puzzle Solutions: toy-grid recovery attempt | Developer explicitly had not reproduced the original cause; no guaranteed repair or new puzzle layout |
| [Official 1.03](https://steamcommunity.com/games/2684630/announcements/detail/689764519146160697) | Water Break and achievement hub: Nibbles bottle-tracking correction | Does not guarantee retroactive credit or establish the whole route as locally tested |
| [Official 1.04](https://steamcommunity.com/games/2684630/announcements/detail/689764519146161653) | Items: missing-Sunflower failure check; Save guide: Cloud support | No universal Core Key recovery or overwritten-save repair |
| [Official 1.05](https://steamcommunity.com/games/2684630/announcements/detail/689764519146161811) | Patch page: two train hitboxes; Save page: historical dice-crash support scope | Not a universal current input fix or guaranteed replacement save |
| [Official 1.06](https://steamcommunity.com/games/2684630/announcements/detail/689764519146161881) | Patch page: dice-fix chronology and rollback context | Historical attempts are not repeated as current rollback instructions |
| [Official 1.07](https://steamcommunity.com/games/2684630/announcements/detail/689764519146162333) | Achievements: ending and gold-ribbon re-checks | Does not complete an unfinished route or fix every achievement |
| [SteamDB UFS](https://steamdb.info/app/2684630/ufs/) + [original Steam backup guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3773635669) | Save guide: documented Windows folder/pattern and Steam-library-relative Proton prefix | SteamDB is a third-party configuration record; no tested restore compatibility claim |

The latest of the eight retrieved official announcements remains 1.08 (August 7). September 20 is the source-check date, not a new patch release date. PCGamingWiki's indexed text supported the Windows path, but its direct web-reader open failed; not counted as a fully retrieved independent source. General Steam Cloud help was linked as support, not presented as a successful detailed extraction.

## Still unresolved

- Clocky/Henry exact input timing and stamina behavior: the current [trackpad/accessibility discussion](https://steamcommunity.com/app/2684630/discussions/0/585058941145194947/) supplies reports, not a demonstrated fix. Clocky's current complaint thread was discovered but its web-reader fetch failed. No new combat answer published.
- Ending C universal A/B prerequisite, save corruption recovery, and Core Key missing after a chapter transition: no qualifying new evidence located. Keep earlier qualified answers.
- Surgeon parser aliases, exact dialogue capture, graveyard numbered pair map: yesterday's provenance improvements are retained; no new runtime test is claimed.
- Office, Telescope and name-puzzle walkthrough screenshots still require authorized/source-specific image evidence or an actual recorded playthrough. No promotional image relabelled as proof and no player screenshot copied.
- Removed public internal-only leads from Items (blue character crying, graveyard cat chase, Game Contestant, copy machine and Bride appearance) into this private queue. Their absence of a supported answer is not filled by guessing.

## Validation and publication

Local verification completed:

- Root `npm run build`: PASS, 56 public canonical pages; private operations data excluded. Only the validated generated `b/dist` directory was rebuilt.
- `check-consolidation.cjs dist`: PASS, 56 pages, 3 retired redirects, 2,133 internal links/anchors, canonical/H1/GA/image/date checks.
- `check-answer-maintenance.cjs`: PASS, 21 visible/structured FAQ matches, preserved titles/descriptions and shared ad/navigation assets.
- `check-evidence-completion.cjs`: PASS; yesterday's original-source corrections retained.
- New `check-official-evidence.cjs`: PASS; official claim links, uncertainty boundaries, 7 edited-page dates and sitemap match.
- `npm run test:performance --prefix work/endacopia-guide-hub`: PASS, 56 pages, 36 static guide panels, 116 images, search/scroll regression. Not a new Lighthouse or field CWV measurement.
- `git diff --check`: PASS. No new browser-render or gameplay screenshot validation claimed.

Exact-commit deployment and production HTTP checks are pending at commit preparation, not yet successful.

GSC browser preflight: selecting the existing external Chrome Endacopia sitemap tab returned `Debugger unattached`. This is a browser-control blocker, not an indexing verdict. Read-only API scopes do not authorize sitemap mutation or an indexing request. No submission claimed.

An alternative read of the existing in-app GSC tab timed out after 30 seconds: `js execution timed out; kernel reset, rerun your request`. Browser retries stopped. Priority sitemap/URL submissions remain pending; this is distinct from an existing URL already being indexed.
