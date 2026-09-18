# Route handoffs — 2026-09-18

## Scope and evidence
- User requested priorities 2 and 3 only. Advertising, Meaning, titles and descriptions unchanged; no new pages.
- Baseline: today's API supplement, final GSC September 9–15 and hostname-filtered GA September 11–17. These pre-release windows cannot measure this change.
- Puzzle, Soccer and Items: direct answer anchors and static contextual next-route links. Removed Soccer's reader-irrelevant keyword paragraph. Corrected Core Key handoff to the existing item-answer section rather than late-game code table.
- Clocky: opening fight, Clockey / Overclockey rematch and Ending C question anchors. Static links work without the feedback component required by the dynamic next-guide renderer. No new input or prerequisite claim.
- Reopened community sources: https://www.reddit.com/r/Endacopia/comments/1vgmgxu/ok_so_i_am_confused_on_how_to_get_the_clockey/ and https://www.reddit.com/r/Endacopia/comments/1v95wch/ending_c_secrets/ . Reports are not a current-build reproduced test. Opening-fight skip remains disputed.
- Existing JS recognizes data-next-guide to avoid a duplicate dynamic panel; data-next-guide-link retains next_guide_click parameters. Related event handler excludes those links, preventing double classification.
- Updated dateModified and sitemap lastmod for the four pages and changelog. Other Last checked evidence dates retained: navigation edits are not fresh gameplay tests.

## Validation
- npm run build passed (static no-op, not a compiler).
- git diff --check passed.
- Custom read-only check: 59 sitemap pages, H1/canonical/GA/image-alt/JSON-LD/date consistency; 2,037 internal links and anchors valid.
- Isolated existing click-handler test: 12 links emit next_guide_click with the expected target_path and page_path. This is not browser rendering or confirmed GA ingestion.
- Shared JS/CSS and all advertising code unchanged.

## Release and GSC
- Production deployment pending at preparation of this note.
- GSC existing in-app tab connection failed: js execution timed out; kernel reset after 30 seconds. Stopped retrying; no URL indexing request or sitemap submission claimed.
- Today's prior Sitemaps API check found sitemap.xml healthy (0 errors); article URLs previously submitted as sitemaps are not valid sitemap submissions. Existing authorization is read-only.

## Follow-up
- Use 7 complete post-release days, segmented by page/device/source; compare next_guide_click and related_guide_click together because some links changed event classification.
- Check guide_scroll_90 and solved feedback alongside sessions; do not maximize time on page at the expense of quick answers.
- Clocky query cluster: impressions, clicks, CTR and position; inspect recrawl when GSC is available. No ranking outcome claimed.
