# Endacopia Daily Monitoring - 2026-08-13

## Run status

- Run type: Immediate manual monitoring pass requested by the owner
- Checked: 2026-08-13, Asia/Shanghai
- Scope: Google web discovery, Steam Community, r/Endacopia, and existing site coverage
- Site changes: One focused update to the existing underground page; no new page created
- Publication: Local change only; not deployed, not submitted to GSC, and no community post sent

## Data boundary

This pass found current search and player-intent signals, but it did not produce a reproducible Google Trends index, Google Suggest count, People Also Ask snapshot, or GSC query export. Trends values must not be treated as absolute volume. The items below are opportunity and content-gap signals, not measured search-volume claims.

## Raw observations

### 1. Underground and secret-boss intent is active

- [Steam Endacopia General Discussions](https://steamcommunity.com/app/2684630/discussions/) was crawled today and showed 403 active topics. Recent visible topics included “Un der ground” about 1 hour ago, “clocky c ending” about 4 hours ago, “Softlocked! Help!” about 16 hours ago, “What am I not getting with the clown death puzzle???” about 17 hours ago, and “Possibly bugged achievement” about 20 hours ago.
- [Reddit: how do I encounter the secret underground bosses?](https://www.reddit.com/r/Endacopia/comments/1vb18gc/how_do_i_encounter_the_secret_undergound_bosses/) gives a player-reported route: gambling floor, wheel-spin Error tile, wooden pallet elevator, then Lockpick on the right-hand door.
- [Reddit: Found (and beat) a secret boss!](https://www.reddit.com/r/Endacopia/comments/1v9apb8/found-and-beat-a-secret-boss/) independently repeats the gambling-floor/elevator/Lockpick path and adds a phone-number clue after the second fight.
- [Reddit: Underground](https://www.reddit.com/r/Endacopia/comments/1vhs7de/underground/) confirms that players are still distinguishing the full-game underground content from the demo-era hallway secret; the thread also contains uncertainty about what happens after the bride encounter.

### 2. Beach metal-detector scare is being mistaken for a route or Ending C trigger

- [Reddit: Secret at the beach?](https://www.reddit.com/r/Endacopia/comments/1vlzpm3/secret_at_the_beach/) reports a first-time metal-detector event at the top-left of the beach, where the player is pulled underground and sees a crying face. A reply says it is a scripted horror event unrelated to Ending C and not RNG, but this remains a community explanation rather than an official confirmation.

### 3. Steam Deck control precision is a concrete support problem

- [Reddit: Steam deck mouse precision](https://www.reddit.com/r/Endacopia/comments/1vlrpy6/steam_deck_mouse_precision/) reports that a joystick-mapped cursor is too fast for the AI boss. Replies recommend the trackpad for cursor control and temporarily lowering sensitivity for Scribbly and clown surgery; another reply mentions launch-option cursor-speed changes. This is useful troubleshooting, but it is one discussion and has not been independently replayed.

## Deduplicated judgment

### Promoted to existing page: underground secret-boss entrance

- Intent: “How do I enter the underground / secret boss area?”
- Evidence state: **Community-corroborated, replay pending**. Two separate Reddit threads describe the same entrance chain; no official guide or owner replay was found in this pass.
- Existing page: `/endacopia-underground/`
- Action taken: Added the Error-tile -> wooden pallet elevator -> Lockpick entrance, the paper/phone clue, source links, last-checked date, and an explicit warning not to change the computer clock from a single report.
- Why no new page: The existing underground page already owns the intent and can absorb this route without creating a thin duplicate.

### Keep pending: beach crying-face event

- Intent: “What is the underground face / beach metal-detector scare?”
- Evidence state: **Community report; not confirmed**. One direct report and replies explain it as a scripted horror event, but no official source or second independent route guide was found.
- Next proof target: Current-build screenshot or video showing the top-left beach trigger and whether the event changes any inventory, achievement, Ending C flag, or map state.

### Keep pending: Steam Deck sensitivity and launch options

- Intent: “How do I slow the cursor / beat AI boss on Steam Deck?”
- Evidence state: **Community report; not confirmed**. The existing `/endacopia-steam-deck/` page already covers trackpad/touchscreen controls, but it should not present the launch-option syntax as a verified fix yet.
- Next proof target: Two independent Deck users or a reproducible controller profile with the exact setting and version.

### Existing pages already absorb the remaining active topics

- `clocky c ending` -> `/endacopia-clocky/`, `/endacopia-ending-c-complete-route/`, and `/endacopia-ending-c-not-triggering/`
- clown death puzzle -> `/endacopia-clown-theater-puzzle/`
- softlock / bugged achievement -> `/endacopia-achievements-guide/` and the affected route pages
- movement keybind / arrow controls -> existing control notes; no verified new workaround found

## Verification and build

- Local content update: completed in `endacopia-underground/index.html`
- No sitemap URL added; no new page added
- Build and diff checks: run after this report update
- Deployment: intentionally not performed during this monitoring-only pass
- GSC: intentionally not submitted because no public deployment occurred

## Next review indicators

1. Confirm the underground entrance on the current Steam build and capture the Error tile, elevator, Lockpick door, and phone clue.
2. Check whether Google begins showing queries such as `Endacopia underground`, `Endacopia secret boss`, `Endacopia error tile`, or `Endacopia wooden elevator` for the existing page.
3. Check whether the beach-face event produces a separate query cluster or remains a one-off curiosity.
4. Re-check the Steam Deck thread for an exact, repeatable sensitivity setting before changing the public guide.
5. Run a dedicated Trends/Suggest/PAA snapshot with region, date range, and comparison term recorded before making any new keyword decision.
