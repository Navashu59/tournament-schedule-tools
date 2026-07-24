# Semrush and SERP Execution - 2026-07-24

## Evidence

- GSC through 2026-07-21 protects `/fixture-generator/`, the fair-schedule
  guide, double elimination, and `/7-team-round-robin/`.
- Semrush US reports 1,900 searches for `round robin generator`, 18,100 for
  `tournament bracket maker`, 480 for `sports schedule maker`, and 390 for
  `pickleball round robin generator`.
- Live results reward a working scheduler, print/export, sharing, standings, and
  format-specific output. Phrase-only copies do not create a separate job.
- DeepSeek supported a small alias batch and warned against merging format and
  team-count pages with existing signals.

## Executed

- Added permanent redirects:
  - `/tournament-fixture-generator/` to `/fixture-generator/`
  - `/round-robin-schedule-maker/` to `/round-robin-generator/`
  - `/bracket-generator/` to `/tournament-bracket-maker/`
- Removed those aliases from the sitemap, tools index, schema list, and active
  contextual links.
- Kept `/playoff-bracket-maker/`, `/sports-schedule-maker/`, team-count pages,
  sport pages, and all protected pages separate.
- Combined hostname and path normalization into one Worker redirect.

## Measure

Track redirected-query transfer, owner impressions, the specific-tool to `/tools/`
impression ratio, `/7-team-round-robin/` and double-elimination positions, and
redirect errors after 14 and 28 clean days.
