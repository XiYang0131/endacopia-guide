# Endacopia Keyword, Page, and Evidence Ledger

This is the working record for deciding what to improve next. A row is not
complete until its query intent, evidence state, and next action are explicit.

## Baseline: Google Search Console, August 5, 2026

- Site total: 39 clicks, 1,245 impressions, 3.1% CTR, average position 7.3.
- The site had 74 queries and 31 pages in the selected report.
- The page-level numbers below are the visible August 5 rows. `Not collected`
  means the page was not in that visible top-page set; it is not a zero.
- Do not use one day as a success/failure verdict. Compare the next 7-14 days
  after a small batch of changes.

| Primary keyword | User question | URL | Type | Evidence source / state | GSC Aug 5 clicks / impressions / CTR | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| Endacopia guide | Where should I start? | `/` | Hub / router | Site route pages, Steam references; community-sourced | 3 / 171 / 1.8% | Keep as a router; measure clicks into Guide Index and Walkthrough |
| Endacopia beginner guide | What should I do first? | `/endacopia-beginner-guide/` | Beginner | Community walkthrough cross-check; screenshot proof pending | Not collected | Add a compact first-30-minutes checklist and next-step links |
| Endacopia walkthrough | How do I finish the game? | `/endacopia-walkthrough/` | Full route | Public route sources; screenshot proof pending | Not collected | Separate chapter flow from individual puzzle answers |
| Endacopia full game | What is in the full release? | `/endacopia-full-game/` | Release / route bridge | Steam release references; source-backed | Not collected | Keep distinct from the step-by-step walkthrough |
| Endacopia all endings | How do I get A, B, C, and The Yeti? | `/endacopia-all-endings/` | Ending index | Authorized Steam guide, Steam achievements, community references; replay proof pending | 1 / 83 / 1.2% | Improve result-snippet match and link each branch to its dedicated page |
| Endacopia Ending C | How do I unlock Stay? | `/endacopia-ending-c-complete-route/` | Ending route | Steam guide, Fandom, Neoseeker, Reddit; source-backed, final trigger pending | Not collected | Capture the final Stay trigger when permission or own gameplay is available |
| Endacopia Ending C not triggering | Why did Stay fail? | `/endacopia-ending-c-not-triggering/` | Troubleshooting | Community route reports; source-backed, replay proof pending | Not collected | Keep failure audit above background context |
| Endacopia clown puzzle | What are the theater seats / mini-game steps? | `/endacopia-clown-theater-puzzle/` | Puzzle | Reddit player report; player-reported method, exact proof pending | 1 / 106 / 0.9% | Add a concise answer table and a proof screenshot when authorized |
| Endacopia trapezist | What is the Trapezist route? | `/endacopia-trapezist/` | Character / route | Public guide and community cross-check; screenshot proof pending | Not collected | Refresh the page around the rising query and add route-specific next links |
| Endacopia Mellow | Who is Mellow and where do I find her? | `/endacopia-mellow/` | Character | Fandom and public route notes; community-sourced | Not collected | Add a clear location / interaction answer and date the evidence |
| Endacopia Clocky | How does the Clocky fight work? | `/endacopia-clocky/` | Boss / character | Public route notes; no dedicated replay proof yet | Not collected | Keep as a watch page; do not claim a definitive branch without proof |
| Endacopia Timesville fishing | Where are the fish / fishing key? | `/endacopia-timesville-fishing-guide/` | Item / puzzle | Community route references; table live, screenshot proof pending | 2 / 112 / 1.8% | Improve title/snippet match for fish, key, and 18-fish queries |
| Endacopia items | Where are the key, metal detector, cheese, wrench, and core? | `/endacopia-items-guide/` | Item index | Community references; source-backed, screenshots pending | 1 / 83 / 1.2% | Keep item answers scannable and link each blocker to its own page |
| Endacopia save file location | Where are my saves? | `/endacopia-save-file-location/` | Technical help | Public guide/community cross-check; screenshot proof pending | 11 / 71 / 15.5% | Protect this high-CTR page; only clarify platform paths if evidence supports it |
| Endacopia achievements | How do I unlock every achievement? | `/endacopia-achievements-guide/` | Achievement index | Authorized xixi Steam guide plus achievement references; community-sourced | Not collected | Add proof status per achievement; prioritize Water Break evidence |

## Evidence status rules

- **Source-backed:** at least two public references agree, or one authoritative
  source directly supports the fact.
- **Player-reported method:** useful lead, but label it until independently
  replayed or supported by a permitted screenshot.
- **Replay proof pending:** do not write “personally tested”; keep the next proof
  target visible on the page.
- **Authorized media:** record the original author, URL, permission wording, and
  exactly which page uses the asset or paraphrased route.

## Candidate watchlist from Google Trends

Google Trends US, past month, web search, checked August 8, 2026. Every
comparison below includes `gpts` in the same chart as the benchmark. Trends is
a relative index, not a monthly search-volume estimate; the benchmark is a
filter for prioritization, not a search-volume number.

| Candidate | Signal | Current page | Decision |
| --- | --- | --- | --- |
| `endacopia game` | Average 5 versus `gpts` 37; recent values 10-18 versus `gpts` 21-34 | `/endacopia-full-game/` | **Best current candidate in this set:** refresh the full-game bridge only after GSC confirms the query intent |
| `endacopia surgeon` | Average 2 versus `gpts` 37; recent values 4-6 versus `gpts` 24-34 | No dedicated page | Do not create a page yet; first validate the exact in-game intent and look for repeated GSC impressions |
| `endacopia mellow` | Average 2 versus `gpts` 37; recent values 5-6 versus `gpts` 23-34 | `/endacopia-mellow/` | Keep the page, but prioritize only if GSC shows a matching query |
| `endacopia trapezist` | Average 2 versus `gpts` 37; recent values 4-7 versus `gpts` 23-34 | `/endacopia-trapezist/` | Keep the page, but do not call the trend a high-volume opportunity |
| `endacopia clown` | Average 2 versus `gpts` 37; recent values 3-6 versus `gpts` 23-34 | `/endacopia-clown-theater-puzzle/` | Use GSC impressions and CTR to decide whether to improve the existing page |
| `endacopia ending c` | Average 1 versus `gpts` 37; recent values 2-5 versus `gpts` 23-34 | `/endacopia-ending-c-complete-route/` | Keep as a search-intent page; do not expand from Trends alone |
| `endacopia clocky` | Average 0 versus `gpts` 37; recent values 1-2 versus `gpts` 24-34 | `/endacopia-clocky/` | Monitor only |
| `endacopia lost key` | Average 0 versus `gpts` 37; one isolated point of 1 | No dedicated page | Defer until GSC confirms repeated demand |
| `endacopia lore` | Average 0 versus `gpts` 37 | `/endacopia-meaning-lore/` | Defer; current signal is too weak |

Similarweb was not authenticated during this check and redirected to its login
page. No Similarweb search volume, KD, or difficulty value is entered here.

## Trends comparison protocol

1. Use the same country, date range, and search type for every comparison.
2. Put `gpts` in the same chart instead of comparing separate screenshots.
3. Record both the candidate average and the recent daily range beside the
   benchmark average and range.
4. Treat a candidate as actionable only when it has sustained non-zero demand,
   a clear player question, and either GSC impressions or a source-backed SERP
   gap. A breakout label alone is not enough.

## Change log

| Date | Pages changed | Reason | Wait period |
| --- | --- | --- | --- |
| 2026-08-08 | Trends watchlist | Rebased candidate decisions against `gpts` in the same charts; removed false high-volume interpretation | Use GSC before creating or expanding a page |
| 2026-08-07 | Contact, About, Editorial Policy, Privacy, All Endings | Make evidence status and correction path explicit; add trust coverage | Review GSC after 7-14 days |
| 2026-08-06 | Home, Clown Theater, All Endings, Timesville Fishing, Items | Align titles and snippets with high-impression queries | Review GSC after 7-14 days |

## Operating rule

Change no more than two or three search-facing pages per batch. Record the old
title, new title, reason, and date here. Use GSC queries and page performance to
choose the next batch; use Trends only as a discovery signal.
