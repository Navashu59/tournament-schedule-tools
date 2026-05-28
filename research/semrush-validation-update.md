# Buildable Shortlist - Semrush Validation Update

> Updated: 2026-05-28
> Semrush API status: working. Previous `ERROR 132` is resolved.
> Database: US

## Summary

Only one cluster currently passes the Semrush volume + variant gate cleanly: `tournament-schedule-tools`. `bingo-card-generator-tools` has enough total volume, but only 4 nonzero variants in the checked set, so it remains borderline until more adjacent terms are expanded.

| Rank | Core keyword | Cluster volume | Nonzero variants | Max keyword volume | Avg CPC | Semrush status |
|---:|---|---:|---:|---:|---:|---|
| 1 | bingo card generator | 49280 | 4 | 27100 | 0.39 | hold_semrush_fail_or_borderline |
| 2 | tournament bracket maker | 35660 | 5 | 18100 | 0.79 | buildable_semrush_pass |
| 3 | classroom seating chart generator | 15610 | 4 | 8100 | 1.63 | hold_semrush_fail_or_borderline |
| 4 | capo calculator | 12380 | 5 | 5400 | 0.48 | hold_semrush_fail_or_borderline |
| 5 | crochet gauge calculator | 3210 | 5 | 1600 | 0.03 | hold_semrush_fail_or_borderline |
| 6 | graph paper generator | 15350 | 5 | 12100 | 0.27 | hold_semrush_fail_or_borderline |

## Keyword-Level Semrush Data

| Keyword | Volume | CPC | Competition | Results |
|---|---:|---:|---:|---:|
| bingo card generator | 27100 | 0.0 | 0.06 | 4810000 |
| bingo card maker | 18100 | 0.0 | 0.06 | 23200000 |
| printable bingo cards | 3600 | 1.94 | 1.0 | 207 |
| baby shower bingo card generator | 0 | 0.0 | 0.0 | 0 |
| music bingo card generator | 480 | 0.0 | 0.74 | 78 |
| tournament bracket maker | 14800 | 0.02 | 0.03 | 12500000 |
| bracket generator | 18100 | 0.04 | 0.03 | 39200000 |
| round robin generator | 2400 | 1.65 | 0.01 | 6200000 |
| league schedule maker | 320 | 2.25 | 0.36 | 36800000 |
| fixture generator | 40 | 0.0 | 0.02 | 13500000 |
| classroom seating chart generator | 320 | 1.85 | 0.13 | 102 |
| seating chart generator | 6600 | 1.49 | 0.4 | 131 |
| seating chart maker | 8100 | 1.49 | 0.4 | 349000000 |
| random seating chart generator | 590 | 1.68 | 0.09 | 623000 |
| desk arrangement maker | None | None | None | None |
| capo calculator | 140 | 0.0 | 0.0 | 84 |
| chord transposer | 1300 | 0.0 | 0.01 | 968000 |
| guitar chord transposer | 140 | 0.0 | 0.02 | 881000 |
| guitar chord finder | 5400 | 1.01 | 0.07 | 107 |
| chord progression generator | 5400 | 1.4 | 0.02 | 789000 |
| crochet gauge calculator | 140 | 0.0 | 0.03 | 298000 |
| crochet stitch calculator | 110 | 0.0 | 0.01 | 127 |
| yarn calculator | 880 | 0.01 | 0.02 | 5990000 |
| knitting calculator | 480 | 0.0 | 0.01 | 131 |
| quilt binding calculator | 1600 | 0.16 | 0.0 | 250000 |
| graph paper generator | 390 | 0.0 | 0.0 | 98500000 |
| printable graph paper | 12100 | 0.68 | 0.09 | 237000000 |
| isometric graph paper | 1600 | 0.39 | 0.43 | 0 |
| polar graph paper | 1000 | 0.3 | 0.06 | 50700000 |
| coordinate plane generator | 260 | 0.0 | 0.0 | 13300000 |

## Updated Buildability Judgment

### Buildable after SERP confirmation

- `tournament bracket maker` / `tournament-schedule-tools`: passes cluster volume and 5 nonzero action variants. Next step is top-10 SERP beatability for bracket, bracket generator, round robin generator, league schedule maker, fixture generator.

### Borderline, needs expansion or stronger evidence

- `bingo card generator`: cluster volume is strong at 49,280, but current checked variants have only 4 nonzero terms. Expand event/classroom variants before rejecting.
- `classroom seating chart generator`: strong user need, but checked cluster volume is 15,610, below 30,000. Needs more teacher/classroom variants or should not be a standalone site yet.
- `capo calculator`: checked cluster volume is 12,380. Better as a music-tool cluster only if broader chord/key terms expand volume.
- `graph paper generator`: checked cluster volume is 15,350. Needs more printable paper variants to reach standalone threshold.
- `crochet gauge calculator`: checked cluster volume is 3,210. Strong pain but not enough demand for standalone site from current terms.

## Next Validation

1. For `tournament-schedule-tools`, run top-10 SERP beatability and Reddit/forum comment-depth validation.
2. For `bingo-card-generator-tools`, expand adjacent terms with Semrush before deciding.
3. Do not start building the other clusters unless expanded Semrush data clears the 30,000 cluster-volume gate.
