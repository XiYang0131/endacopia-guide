# Google Autocomplete Demand Capture: August 8, 2026

## Collection conditions

- Source: Google Search suggestions for English queries beginning with `endacopia`
- Checked: August 8, 2026
- Location and personalization can change the list; suggestions are discovery signals, not search-volume estimates.
- Approval still requires GSC evidence, a SERP intent gap, and a source-backed answer.

## Raw suggestions

| Seed | Suggestions observed |
| --- | --- |
| `endacopia` | game; release date; meaning; demo; mobile; full game; clocky; characters; steam; mellow |
| `endacopia ending` | secret ending; all endings |
| `endacopia all` | all characters; all bosses; all secrets; all endings |
| `endacopia secret` | secrets; secret room; secret ending; secret images; demo secret; all secrets; underground secret |
| `endacopia steam` | steam; demo steam |
| `endacopia clocky` | clocky; clocky fanart; clocky fight |
| `endacopia g` | game; game release date; game reddit; game online; gameplay; game password; game wiki; guide |
| `endacopia m` | meaning; mobile; mellow; music; memes; main character; monster; mobile release date |
| `endacopia r` | release date; reddit; release; release date 2026; release date reddit; room; secret room; demo release date |
| `endacopia s` | steam; surgeon; sign; secrets; secret room; song; soccer ball |
| `endacopia t` | trailer; tip; tutorial; the surgeon; toilet monster; the rule |
| `endacopia c` | clocky; characters; clock; crazy games; game code; clock fight; clown; creator; circus |

## Mapping and decision

| Candidate cluster | Existing page | Decision | Reason |
| --- | --- | --- | --- |
| `all characters`, `mellow`, `main character` | `/endacopia-characters/`, `/endacopia-mellow/` | Updated existing hub | Clear reference intent; no new page needed. |
| `all bosses`, `clocky fight`, `clock fight` | `/endacopia-boss-fights-guide/`, `/endacopia-clocky/` | Updated existing hub | Clear route/achievement intent; keep boss-specific pages separate. |
| `all secrets`, `secret ending`, `secret room`, `underground secret` | `/endacopia-all-secrets/`, `/endacopia-secret-ending/`, `/endacopia-office-secret/`, `/endacopia-underground/` | Keep existing map | Several distinct intents already have dedicated pages. |
| `release date`, `full game`, `game release date` | `/endacopia-release-date/`, `/endacopia-full-game/` | Keep separate | Release fact and full-game route are different tasks. |
| `demo`, `demo steam`, `full version`, `free` | `/endacopia-demo-vs-full-game/`, `/endacopia-play/`, `/endacopia-download/` | Keep existing pages | Version and platform questions should not be merged with walkthrough content. |
| `game password`, `game code` | `/endacopia-puzzle-solutions/`, `/endacopia-277-5944/`, `/endacopia-cheshire-password/` | Route to exact answer pages | Do not create a generic password page without a repeated GSC query. |
| `surgeon`, `sign`, `room`, `toilet monster`, `the rule` | No new page | Watch only | Intent is ambiguous or evidence is not yet strong enough. |
| `mobile`, `online`, `reddit`, `fanart`, `music`, `memes` | Existing play/source pages or no page | Defer | Some are platform/UGC discovery signals, not confirmed guide demand. |

## Next measurement

After the two metadata updates, check GSC for 7-14 days:

```text
query contains: endacopia
compare: characters / bosses / secrets / endings
record: impressions, clicks, CTR, average position, landing page
```

Do not create a new page unless a specific query repeats in GSC and the existing page cannot satisfy it without a separate task.
