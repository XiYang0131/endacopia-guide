# Endacopia Daily Monitoring - 2026-08-12

## Run status

- Run type: Immediate manual run requested by the owner
- Scope: Google web results, Steam Community, and r/Endacopia
- Checked: 2026-08-12 (China Standard Time)
- Site changes: One small build-note update; no new page created
- Publication: Not deployed, not submitted to GSC, and not posted to a community

## New observations

### 1. Steam 1.08 has a relevant detector fix

- Source: [Endacopia Steam Community page](https://steamcommunity.com/app/2684630)
- Observation: The page shows version 1.08 and notes a fix for the Metal Detector not beeping even though an item remained undug. The same update also lists fixes involving the camera and green mug, the clown corpse, the waterfall code door, Core-room exit, Scribbly, and leaving Misery Town after skipping the boss.
- Judgment: Official build information and directly relevant to the existing Timesville Fishing page.
- Action: Added a version note to `/endacopia-timesville-fishing-guide/`.
- Evidence state: Official update note; it does not prove that every Timesville softlock report is caused by this bug.

### 2. New high-intent Timesville blocker

- Source: [Steam Community discussion](https://steamcommunity.com/app/2684630)
- Observation: A player reports being in Act 3 Timesville after completing the old-key step and not knowing how to play the tape, asking whether the save is softlocked. The Steam page shows the discussion as posted roughly 10 hours before the current crawl.
- Judgment: High-intent unresolved question, but one player report is not enough to publish a definitive fix.
- Action: Added to the pending verification queue; no new page yet.
- Next proof target: Confirm the exact old-key state, tape location/use condition, game version, and whether a route reset or reload resolves it.

### 3. Ending C hints remain active but partly contradictory

- Sources: [Reddit Ending C hint discussion](https://www.reddit.com/r/Endacopia/comments/1vkptg1/guys_im_crying_literally/), [Reddit unresolved gameplay discussion](https://www.reddit.com/r/Endacopia/comments/1vft8rf/unresolved_gameplaystory_details_all_endings/)
- Observation: Recent replies repeat three high-level hints: Misery Town sand, a telescope in the Office/work area, and all fish followed by a black-square area in Timesville. Replies also disagree about whether the opening Clocky fight must be avoided; another recent reply says it is irrelevant.
- Judgment: Community corroboration for the three-area-secret direction, but the Clocky requirement is still conflicting and should remain a community-report/replay-pending claim.
- Action: Existing Ending C pages already label the disputed Clocky branch and link the three area routes. No wording was promoted to confirmed.

## Deduplication and priorities

- Existing pages already cover `/endacopia-timesville-fishing-guide/`, `/endacopia-all-fish-guide/`, `/endacopia-ending-c-complete-route/`, and `/endacopia-ending-c-not-triggering/`.
- Do not create another generic Ending C or fishing page.
- Highest next verification priority: the old-key/tape Timesville blocker.
- Secondary priority: reproduce the Steam 1.08 detector behavior and capture a current-build screenshot.
- Keep the Clocky branch disputed until a current-build replay or stronger independent evidence exists.

## Follow-up after the first pass

- A current Steam page also surfaces a player asking how to complete the two-room puzzle because it appears to be the last step before the VHS tape.
- An independent Timesville walkthrough describes the actionable sequence: finish the two-room puzzle, enter the smaller room, wait for the reversed voice clue, switch to windowed mode with `Alt+Enter`, return, and use the Lost Key on the revealed lock.
- This sequence is now added to `/endacopia-timesville-fishing-guide/` with a replay-pending label. It is useful guidance, but not yet marked as owner-tested.

## Owner correction integrated

- `Lost Key` and `VHS Tape / VHS Projector` are now treated as independent routes.
- The Act 3 VHS route is documented as: Saw/Act 3 progression -> Whiskers/Paisley password -> Dollhouse reference-room state -> VHS Tape -> nighttime Cabin tools -> Nibbles/Beartha -> Black Rose on the leftmost grave -> underground VHS Projector -> TV House playback.
- The Lost Key route remains: Fish Paper -> 18 unique fish -> inspect Fish Paper -> two-room puzzle -> smaller room/reversed clue -> windowed mode -> lock.
- The page no longer implies that Lost Key unlocks or produces the VHS. Both routes remain replay-pending on the current build, with the relevant source links visible on the page.

## Not validated in this run

- Google Trends absolute search volume
- Google Suggest counts
- GSC query/page performance
- A current-build personal replay of the old-key/tape sequence

## Owner-supplied keyword resolution update

The owner matched the 12 monitored queries to route material. These claims are now useful source-backed leads, but remain replay-pending unless a current-build screenshot or video is captured:

- VHS: Black Rose -> underground VHS Projector, Paisley `Yellow` / Dollhouse reference-room state, and VHS playback at the TV House.
- Ending C: three area secrets, final Mellow-room trigger, Stay unlock, and the disputed opening Clocky requirement.
- Puzzles: clown color split (hit Yellow/Pink/Purple/Red; leave Green/Orange/Light Blue/Blue), phone call routes, Broken Phone / Fairy Boss, and surgeon scalpel handling.
- Timesville: Catthew hiding spots, Fisherman License, 18-fish timing, Lost Key room, and the separate VHS route.
- Version: Steam 1.08 detector and softlock fixes.

Editorial rule: promote only the official 1.08 patch note to `Official update`; keep route steps as `Community report` or `Source-backed / replay pending` until the proof shots listed on the affected pages are captured.
