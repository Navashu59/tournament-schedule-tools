# TournamentScheduleTools.org Authority Audit and P0/P1 Execution

Date: 2026-06-09
Site: `https://tournamentscheduletools.org`

## Data Checked

- GSC local record: `ops/sites/tournamentscheduletools/gsc_data.json` in `seo-revenue-system`.
- GSC status: last saved 28-day record shows 0 clicks and 0 impressions, so GSC cannot yet identify query-level winners or cannibalization.
- Semrush exact checks saved to `research/semrush-authority-audit-2026-06-09.json`.
- Semrush related checks saved to `research/semrush-authority-related-2026-06-09.json`.
- DeepSeek deputy review saved to `research/deepseek-authority-audit-2026-06-09.json` with 896 total tokens.
- Existing SERP/PAA briefs used from `serp-paa/`, especially seeding, byes, round robin match count, and single vs double elimination.

## Key Semrush Signals

| Keyword | US volume | Action |
|---|---:|---|
| `bracket generator` | 18,100 | Protect existing core page; no duplicate guide. |
| `tournament bracket maker` | 14,800 | Protect existing core page; improve internal paths. |
| `round robin generator` | 2,400 | Protect existing core page and strengthen related guides. |
| `sports schedule maker` | 590 | Keep current page; not a separate authority push this pass. |
| `playoff bracket maker` | 480 | Add a distinct tool page because intent differs from generic bracket maker. |
| `tournament seeding` | 480 | Strengthen existing seeding guide; do not create a duplicate page. |
| `tournament bye` | 210 | Strengthen existing bye guide; do not create a duplicate page. |
| `tournament bracket seeding` | 140 | Fold into existing seeding guide. |
| `tournament schedule maker` | 110 | Improve homepage/core architecture and title differentiation. |
| `tournament schedule template` | 30 | Keep existing template page. |

## Plan

### P0

1. Fix homepage and core tool title duplication.
2. Add a real `/guides/` hub so guide pages have a topical parent.
3. Point guide breadcrumbs to `/guides/` instead of `/tools/`.
4. Rebuild sitemap with `/guides/` and updated modified dates.
5. Verify no broken internal links, duplicate titles, duplicate descriptions, or JSON-LD parse errors.

### P1

1. Add `/playoff-bracket-maker/` for verified `playoff bracket maker` demand.
2. Expand `/guides/how-to-seed-a-tournament-bracket/` with seed source, seed placement examples, byes, and pool-to-bracket handling.
3. Expand `/guides/how-to-handle-byes-in-a-tournament/` with bye formula, field-size examples, round robin bye rotation, and publishing language.
4. Expand `/guides/how-many-games-in-a-round-robin/` with single/double formulas, odd/even rounds, event-time estimation, and pool alternatives.
5. Expand `/guides/single-elimination-vs-double-elimination/` with match-count estimates, finals reset caveats, format comparison, and round robin alternative.

## Completed

- Added `/guides/` collection page.
- Added `/playoff-bracket-maker/` tool page.
- Updated `planning/page-map.json` with the new page and 2026-06-09 modified dates for updated guides.
- Updated `scripts/generate-site.js` for guides hub, navigation, breadcrumbs, sitemap entry, and non-duplicated home title.
- Rebuilt `public/` with `SITE_ORIGIN=https://tournamentscheduletools.org`.

## Verification

- `SITE_ORIGIN=https://tournamentscheduletools.org npm run build` passed.
- `node --check public/assets/app.js` passed.
- `node --check scripts/generate-site.js` passed.
- Internal link check: 0 broken local links.
- JSON-LD parse check: 0 errors.
- Duplicate title check: 0 duplicate titles.
- Duplicate description check: 0 duplicate descriptions.
- Duplicate H1 check: 0 duplicate H1s.
- Playwright smoke:
  - `/playoff-bracket-maker/` generated rows for a 6-team playoff test.
  - `/guides/` mobile 390px: no horizontal overflow.
  - `/playoff-bracket-maker/` mobile 390px: no horizontal overflow.

## Held Topics

- Do not create a separate `tournament seeding` page yet; it should consolidate into the existing seeding guide.
- Do not create a separate `tournament bye` page yet; it should consolidate into the existing bye guide.
- Do not create low-volume score sheet pages in this pass. Semrush shows only weak exact evidence, and the current product does not yet provide a score sheet-specific tool.
