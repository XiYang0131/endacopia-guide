# SCYS Handbook Notes: Endacopia Site Iteration

Source: SCYS activity `10092`, course `182`, manual TOC and detail pages read
through MCP on August 8, 2026.

## Relevant chapters read

- `13027` Choosing a game keyword: validate with Google Trends, the `gpts`
  benchmark, Similarweb KD, and a manual SERP review. A trend spike alone does
  not approve a new page.
- `13030` Finding user questions: use Google autocomplete, Trends related
  queries, and Similarweb to build a keyword list. One search intent maps to one
  page; use a hub when many related items do not justify separate pages.
- `13033` Researching sources: use multiple sources, keep URLs with the notes,
  and treat AI as an organizer rather than a source of facts.
- `13036` Building the site: keep the homepage as the main-term router, add a
  navigation/index page, then route users to focused inner pages. Reuse layout,
  not another site's copy.
- `13042` Reading data: use GSC impressions, clicks, average position, CTR, and
  the actual query list to decide what to add or revise. Improve the existing
  site before opening a second one.
- `13080` and `13081` Template and page scaling: separate framework, config, and
  content; only scale after a single page is genuinely useful. Batch production
  must not become near-duplicate content.

## Applied to Endacopia in this batch

1. Added a standard evidence panel to the 100% checklist with evidence state,
   last checked date, source summary, and the next proof target.
2. Strengthened the Guide Index as the middle layer between the homepage and
   focused pages. Added a fresh-coverage block for fish, Misery Town,
   underground, Water Break, demo/full-game, and map intents.
3. Added Privacy to the Guide Index footer and the homepage trust section so
   GA4 and correction expectations are reachable from the main route.

## Operating rule for the next batch

Do not create a new page from Trends alone. Record the query, page intent,
GSC evidence, source status, and next proof target in
`content-ops/keyword-page-evidence.md`. Change no more than two or three
search-facing pages, then wait 7-14 days before judging the result.
