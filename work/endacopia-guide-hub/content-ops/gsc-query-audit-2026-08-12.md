# GSC Query-to-Page Audit - 2026-08-12

## Collection scope

- Source: Google Search Console, Search results performance, Web search
- Property: `sc-domain:endacopiaguide.com`
- UI range selected: 28 days
- Visible data currently runs through 2026-08-09; Search Console reports 5 hours since the last update
- Rows: 271 queries
- Summary: 381 clicks, 11,500 impressions, 3.3% CTR, average position 7.4
- This is a Search Console snapshot, not an absolute market-volume estimate.

## High-signal queries

| Query cluster | Visible signal | Existing owner | Decision |
| --- | --- | --- | --- |
| `endacopia fish paper`, `fish paper endacopia` | 69 impressions, 2 clicks, positions 5.1-8.1 | `/endacopia-timesville-fishing-guide/` | Rewrite snippet and first heading around Fish Paper. |
| `endacopia fishing key`, `endacopia fish key`, `endacopia lost key`, `lost key endacopia` | 124 impressions, 3 clicks, positions 6.9-8.9 | `/endacopia-timesville-fishing-guide/` | Keep Lost Key and VHS explicitly separate; expose the key route earlier. |
| `endacopia telescope`, `telescope endacopia` | 41 impressions, 0 clicks, positions 9.1-9.5 | `/endacopia-telescope-puzzle/` | Rewrite title/description around use, timing, stars, and Office handoff. |
| `endacopia wrench`, `endacopia how to get wrench`, `how to get wrench in endacopia` | 50 impressions, 0 clicks, positions 6.5-8.9 | `/endacopia-items-guide/` | Add an above-the-fold answer table; retain community-report label. |
| `endacopia core key` | 19 impressions, 0 clicks, position 7.9 | `/endacopia-items-guide/` | Add a direct Core Key route framing; do not invent a pickup location. |
| `endacopia nibbles`, `nibbles endacopia` | 50 impressions, 0 clicks, positions 6.6-7.0 | `/endacopia-items-guide/` | Add a visible proof-needed handoff; no unsupported Nibbles route published. |
| `endacopia office`, `endacopia the office`, `endacopia office guide` | 70 impressions, 1 click, positions 6.0-7.8 | `/endacopia-office-secret/` | Existing exact `office secret` query has 10 clicks / 54 impressions / 18.5% CTR. Protect this page and do not rewrite again in this batch. |
| `endacopia ending c guide`, `endacopia how to get ending c`, `how to get ending c in endacopia` | 228 impressions, 3 clicks, positions 6.6-8.0 | `/endacopia-ending-c-complete-route/` | High-priority observation, but the page was just CTR-rewritten. Wait 7-14 days before another change. |

## High-impression, low-CTR pages intentionally left unchanged

`scribbly endacopia` (161 impressions), `endacopia chameleon` (156), `endacopia clown puzzle` (252), `endacopia achievement guide` (83), and `endacopia trapezist` (76) already received a title/description pass in the current observation window. Rewriting them again would remove the comparison baseline. Review their next 7-14 days of clicks, CTR, and average position first.

## Implemented in this batch

- `/endacopia-timesville-fishing-guide/`: title, description, structured metadata, and H1 now lead with Fish Paper, Lost Key, 18 fish, Fishing Key, and the separate VHS route.
- `/endacopia-items-guide/`: title, description, structured metadata, and a new above-the-fold table for Wrench, Core Key, Nibbles, and Metal Detector.
- `/endacopia-telescope-puzzle/`: title, description, and H1 now lead with how to use the Telescope, night state, stars, and Office clue.
- Updated sitemap dates and the public changelog.

## Evidence state

- Official update: Steam 1.08 detector-not-beeping fix.
- Source-backed / replay pending: Fish Paper, Lost Key, VHS, Telescope route framing.
- Community report / replay pending: flower -> bench worker -> Wrench -> water cooler.
- Proof needed: exact Nibbles door, picture, and blackmail triggers.

## Next review

After 7-14 days, compare the same query clusters by clicks, CTR, average position, and landing page. Do not request another title rewrite from a one-day fluctuation. If Nibbles queries continue to show while the Items page receives no meaningful click, gather an authorized screenshot or current-build replay before creating a dedicated page.
