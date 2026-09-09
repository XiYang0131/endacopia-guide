# Endacopia daily monitoring — 2026-09-09

## Scope and evidence boundary

- Site: `https://www.endacopiaguide.com/`
- GSC property: `sc-domain:endacopiaguide.com`
- GSC search type: Web search
- GSC data freshness shown in the UI: last updated 19 hours ago; this is not a same-day-complete dataset.
- Main windows: 7 days (`2026-08-31`–`2026-09-06`) and 28 days (`2026-08-10`–`2026-09-06`).
- No fresh Similarweb estimate was reused. No fresh Google Trends result was treated as available after the direct request returned HTTP 429.

## GSC observations

### 7-day window

- Clicks: `2,014`
- Impressions: `45,909`
- CTR: `4.4%`
- Average position: `6.1`

Top queries observed:

| Query | Clicks | Impressions |
|---|---:|---:|
| `endacopia telescope` | 53 | 373 |
| `endacopia metal detector` | 34 | 259 |
| `endacopia meaning` | 29 | 2,255 |
| `endacopia water break` | 26 | 64 |
| `endacopia soccer ball timing` | 22 | 174 |
| `endacopia office secret` | 19 | 58 |
| `metal detector endacopia` | 17 | 120 |
| `endacopia office secret puzzle` | 17 | 55 |
| `telescope endacopia` | 13 | 106 |
| `endacopia scalpel` | 12 | 49 |

### 28-day window

- Clicks: `6,208`
- Impressions: `167,996`
- CTR: `3.7%`
- Average position: `6.2`

Top queries observed:

| Query | Clicks | Impressions |
|---|---:|---:|
| `endacopia telescope` | 123 | 973 |
| `endacopia meaning` | 103 | 11,615 |
| `endacopia water break` | 68 | 217 |
| `endacopia soccer ball timing` | 65 | 639 |
| `endacopia metal detector` | 63 | 720 |
| `endacopia office secret` | 47 | 186 |
| `endacopia scalpel` | 47 | 175 |
| `endacopia steam deck` | 41 | 252 |
| `telescope endacopia` | 40 | 329 |
| `water break endacopia` | 37 | 124 |

### Query-to-page assessment

- `endacopia metal detector`: high-demand query cluster, but the existing Items Guide already owns the answer and received the new direct `#metal-detector-route` handoff. This does not justify a separate page yet.
- `endacopia scalpel`: the existing Puzzle Solutions page already owns the Surgeon answer context and now exposes the direct `#scalpel-surgeon-puzzle` handoff. Keep the answer evidence-bounded; do not add unverified route conditions.
- `endacopia lost key` and `endacopia core key`: visible in the prior query audit but lower-intent/low-volume relative to the two clusters above; keep them on Items/Fish pages rather than splitting URLs.
- `endacopia meaning`: still high impressions and comparatively weak CTR/intent fit. It remains the next monitoring target, but this release does not rewrite its title/description during the existing observation window.

28-day page observations included:

| Page | Clicks | Impressions |
|---|---:|---:|
| `/endacopia-telescope-puzzle/` | 633 | 7,953 |
| `/endacopia-puzzle-solutions/` | 622 | 19,141 |
| `/endacopia-water-break-achievement/` | 438 | 2,731 |
| `/endacopia-soccer-ball/` | 372 | 11,485 |
| `/endacopia-all-fish-guide/` | 340 | 10,162 |
| `/endacopia-items-guide/` | 340 | 7,665 |
| `/endacopia-red-ball-guide/` | 330 | 3,358 |
| `/endacopia-office-secret/` | 322 | 3,649 |
| `/endacopia-save-file-location/` | 314 | 2,978 |
| `/endacopia-meaning-lore/` | 297 | 22,848 |

## GA4 realtime observation

- Property: `Endacopia`.
- Scope: Realtime overview; not a complete historical acquisition report.
- 6 active users in the last 30 minutes; 1 active user in the last 5 minutes.
- Visible acquisition source: `google`, 2 active users / 100% of the displayed source breakdown.
- Visible events: `page_view` 8, `session_start` 6, `sponsor_ads_loaded` 6, `first_visit` 4, `user_engagement` 4, `guide_scroll_50` 2, and `related_guide_click` 1.
- `next_guide_click` was not visible in this realtime snapshot; no conclusion is made about its absence from historical data.
- Visible page titles included Save File Location, Telescope, Achievements, Clown Puzzle, Puzzle Solutions, and Water Break.

## Unread sources and exact blockers

- Google Trends: not read for today; direct request returned HTTP `429`.
- Google autocomplete: not read for today.
- Similarweb: not read for today; no old estimate was substituted.
- Complete US/English SERP: not captured today; top-10, PAA, image, and video result coverage is incomplete and is not described as a complete SERP.
- Community: prior public references remain context only; no single post is used to establish a page fact.

## Implemented maintenance

- Added a direct Metal Detector handoff from the Items Guide quick-answer area to `#metal-detector-route`.
- Added a direct Scalpel/Surgeon handoff from Puzzle Solutions to `#scalpel-surgeon-puzzle`.
- Updated visible `Last checked` and JSON-LD `dateModified` to `2026-09-08` on the two changed pages and changelog.
- Synchronized the three corresponding sitemap `lastmod` values.
- No new page was created; no unverified Clocky, Broken Phone, archive, combat-input, or disputed route fact was added.

## Validation and release state

- `npm run build`: passed.
- `git diff --check`: passed; only existing CRLF warnings were reported.
- Static audit: `59` pages, `59` sitemap URLs, `page_issues=0`, `url_issues=0`, `date_mismatches=0`.
- Release commit: `07fc9e2` (includes the deployed handoff report; content change is in `9b0990d`).
- Production checks: Items Guide 200, Puzzle Solutions 200, changelog 200, sitemap 200.
- Apex check: `https://endacopiaguide.com/` returns 308 to `https://www.endacopiaguide.com/`.
- Sitemap in GSC: submitted 2026-08-30, last read 2026-09-05, status `成功`, 59 discovered pages, 0 videos. No duplicate sitemap submission made.
- URL Inspection request: the GSC UI action timed out after 30 seconds while opening the Items Guide inspection flow. Status is therefore **not confirmed submitted**; it is not reported as indexed.

## Next review

- Recheck the 7-day/28-day GSC query and page windows after the new anchors have had time to appear in behavior data.
- In GA4, monitor `related_guide_click`, `next_guide_click`, and `guide_scroll_90` for Items Guide and Puzzle Solutions.
- Re-run Trends and Similarweb only when the source pages return usable data; keep the 429/unread state visible until then.
- Revisit the Meaning/Lore page only after the title/description observation window or new independent evidence shows a concrete intent mismatch.
