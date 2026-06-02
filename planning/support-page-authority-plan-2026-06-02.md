# TournamentScheduleTools.org Support Page Authority Plan

Updated: 2026-06-02

## Process Evidence

- Site: `https://tournamentscheduletools.org`
- GSC property: `sc-domain:tournamentscheduletools.org`
- GSC status checked on 2026-06-02 with `/Users/bluepha/seo-revenue-system/scripts/gsc-playwright.js get-performance tournamentscheduletools.org 28`
- GSC result: 0 clicks, 0 impressions, 0% CTR, average position 0. This is expected because the site was launched and sitemap-submitted on 2026-06-01.
- Semrush source: `/Users/bluepha/tournament schedule tools/research/support-page-keyword-validation-2026-06-02.json`
- SERP source: live Google/web result review on 2026-06-02 for pool play, tournament checklist, double elimination, Swiss format, consolation bracket, tournament bracket how-to, and third-place playoff. Some queries exposed PAA/forum-style questions; not every query returned a PAA box.
- DeepSeek deputy role: data/strategy review completed on 2026-06-02. Codex final role: plan owner, risk review, cannibalization control, and execution sequencing.

## Existing Content To Protect

Do not create duplicate pages for these existing guide intents unless GSC later shows a clear query split:

- `/guides/how-to-make-a-round-robin-schedule/`
- `/guides/how-many-games-in-a-round-robin/`
- `/guides/how-to-handle-byes-in-a-tournament/`
- `/guides/how-to-seed-a-tournament-bracket/`
- `/guides/single-elimination-vs-double-elimination/`
- `/guides/how-to-make-a-fair-tournament-schedule/`

## Planning Principles

1. Build pages around real organizer decisions or rule problems, not one page per keyword.
2. Keep all rule language factual and qualified. Tournament rules vary by sport, league, venue, and organizer.
3. Every support page must link naturally to the relevant tool page and to the nearest guide cluster.
4. Because GSC is still pre-baseline, use a staged build. Prepare the plan now, then build in small batches and watch indexing before expanding aggressively.
5. DeepSeek can draft copy and analyze data gaps, but Codex must review facts, cannibalization, SERP fit, internal links, schema, and final content quality.

## Priority Plan

| Priority | Status | URL | Primary intent | Semrush US evidence | Parent tool / cluster | Plan |
|---|---|---|---|---:|---|---|
| P0 | Implemented 2026-06-02 | `/guides/swiss-tournament-format/` | Explain Swiss format, pairings, rounds, standings, and when to use it | `swiss tournament format` 480; related variants include `swiss format tournament`, `swiss system`, `swiss tournament`, `swiss style tournament` | `/chess-tournament-schedule-maker/`, `/esports-bracket-maker/`, `/tournament-schedule-maker/` | Practical format guide created. It avoids claiming one official pairing algorithm across chess, esports, and card games. |
| P0 | Implemented 2026-06-02 | `/guides/how-to-make-a-tournament-bracket/` | Teach bracket setup, team count, seeding, byes, single vs double elimination, print/export | `how to make a tournament bracket` 320; `how to create a tournament bracket` 170 | `/tournament-bracket-maker/`, `/bracket-generator/`, `/printable-tournament-bracket/` | Informational setup guide created. It answers pre-tool setup questions and links users to bracket tools. |
| P0 | Implemented 2026-06-02 | `/guides/consolation-bracket/` | Explain consolation brackets, placement games, guaranteed games, and when they are useful | `consolation bracket` 590 | `/tournament-bracket-maker/`, `/single-elimination-bracket-generator/`, `/double-elimination-bracket-generator/` | Focused guide created. It distinguishes consolation brackets from third-place playoffs and double elimination. |
| P1 | Implemented 2026-06-02 | `/guides/tournament-formats/` | Hub for choosing round robin, single elimination, double elimination, pool play, Swiss, consolation | `tournament formats` 90; `types of tournament formats` 20 | Homepage scheduler, `/tournament-schedule-maker/` | Decision hub created around time, fairness, guaranteed games, and venue constraints. |
| P1 | Implemented 2026-06-02 | `/guides/pool-play-vs-bracket-play/` | Compare pool play, bracket play, and hybrid pool-to-bracket events | `pool play vs bracket play` 50; `pool play format` 20; `pool play tournament format` 20 | `/pool-play-schedule-generator/`, `/tournament-schedule-maker/`, `/tournament-bracket-maker/` | Combined page created. Pool play format variants remain merged into this page. |
| P1 | Implemented 2026-06-02 | `/guides/tournament-checklist/` | Organizer checklist from registration through schedule, venue, rules, communication, results | `tournament checklist` 20; `how to organize a tournament` 20; `how to run a tournament` 20 | `/tournament-schedule-maker/`, `/sports-schedule-maker/`, `/league-schedule-maker/` | Practical workflow page created. It avoids promising registration, payment, live standings, or result management features. |
| P2 | Backlog | `/guides/how-double-elimination-works/` | Explain winners bracket, losers bracket, reset/if game, and game count | `how double elimination works` 20; `how many games in double elimination tournament` 20 | `/double-elimination-bracket-generator/`, `/single-elimination-vs-double-elimination/` | Build after P0/P1 unless GSC shows double-elimination impressions. Rule wording must clarify final reset variants. |
| P2 | Backlog | `/guides/round-robin-tiebreakers/` | Explain common tie-breaker approaches for round robin standings | Semrush exact weak/0, but SERP/forum pain is real around multi-team ties | `/round-robin-generator/`, `/round-robin-schedule-maker/`, `/guides/how-many-games-in-a-round-robin/` | Build only as a practical common-options guide. Avoid claiming a universal official order. Include head-to-head, point/game differential, points for/against, and pre-published rules. |
| P2 | Backlog | `/guides/third-place-playoff/` | Explain third-place games, bronze medal games, and when to add one | `third place playoff` 40 | `/single-elimination-bracket-generator/`, `/tournament-bracket-maker/`, `/guides/consolation-bracket/` | Keep short and specific. This may also be a section inside `consolation-bracket` until GSC validates demand. |

## Existing Page Updates

| Existing page | Update |
|---|---|
| `/guides/how-to-make-a-round-robin-schedule/` | Add clearer links to template/export examples, standings, scoring, and future tiebreaker guide. |
| `/guides/how-many-games-in-a-round-robin/` | Add a short section explaining that standings/tiebreakers are separate from match-count formulas. Link to future tiebreaker page. |
| `/guides/how-to-handle-byes-in-a-tournament/` | Keep as the canonical bye page. Do not create `tournament bye rules` or `how do byes work` duplicates. |
| `/guides/how-to-seed-a-tournament-bracket/` | Add pool-to-bracket seeding and bracket setup examples. Do not create a separate `tournament seeding examples` page yet. |
| `/guides/single-elimination-vs-double-elimination/` | Add links to future `how-double-elimination-works`, `consolation-bracket`, and `third-place-playoff` pages. |
| `/guides/how-to-make-a-fair-tournament-schedule/` | Link to format selection, pool play, Swiss, round robin, and checklist pages once built. |

## Topics To Hold

- `pool play format` and `pool play tournament format`: merge into `/guides/pool-play-vs-bracket-play/`.
- `how to organize a tournament` and `how to run a tournament`: merge into `/guides/tournament-checklist/`.
- `round robin scoring system` and `round robin standings`: merge into `/guides/round-robin-tiebreakers/` or update existing round robin guides.
- `tournament bye rules`, `how do byes work in a tournament`, `bracket seeding examples`, `tournament seeding examples`: update existing byes/seeding guides, do not create new pages now.
- Sport-specific official rules pages: hold unless a sport page is explicitly planned and sourced, because rule variance is high.
- Swiss deep pairing algorithm page: hold. The first Swiss page should explain practical format choices and link users back to schedule tools.

## Execution Sequence

1. Batch 1: build `/guides/swiss-tournament-format/`, `/guides/how-to-make-a-tournament-bracket/`, and `/guides/consolation-bracket/`.
2. Batch 2: build `/guides/tournament-formats/`, `/guides/pool-play-vs-bracket-play/`, and `/guides/tournament-checklist/`.
3. Batch 3: build `/guides/how-double-elimination-works/`, `/guides/round-robin-tiebreakers/`, and optionally `/guides/third-place-playoff/`.
4. After each batch: rebuild, run internal link and JSON-LD checks, visually inspect key pages, commit, deploy, and record deployment status.
5. After 14-30 days of GSC data: re-check queries, impressions, cannibalization, and indexed page counts before expanding more support pages.

## SERP Gap Notes

- Pool play SERP results emphasize guaranteed games, fair seeding, and hybrid pool-to-bracket workflows. The site currently has a pool play tool, but not a dedicated decision guide.
- Tournament checklist SERP results are workflow/checklist-heavy. This is a good utility support page even with low Semrush volume.
- Double elimination SERP/PAA signals emphasize winners bracket, losers bracket, game count, and reset/if game confusion.
- Swiss SERP results are fragmented across chess, esports, and general explainers. The opportunity is a practical, sport-neutral organizer guide with careful caveats.
- Consolation bracket SERP demand is meaningful, but the page must stay narrow to avoid competing with generic bracket tool pages.

## Status Tracker

| Item | Status | Owner |
|---|---|---|
| Semrush validation | Done | Codex |
| GSC validation | Done; no baseline impressions yet | Codex |
| SERP and question-gap review | Done for planning stage | Codex |
| DeepSeek strategy review | Done | DeepSeek deputy |
| Final risk review | Done | Codex |
| Batch 1 implementation | Done 2026-06-02 | Codex + DeepSeek review |
| Batch 2 implementation | Done 2026-06-02 | Codex + DeepSeek review |
| Deployment | Not started | Codex |
