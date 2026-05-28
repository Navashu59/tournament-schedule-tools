# Tournament Schedule Tools Status

Updated: 2026-05-28

## Current State

The new site is implemented as a static Cloudflare Pages-ready project.

- Source path: `/Users/bluepha/tournament schedule tools`
- GitHub repository: `https://github.com/Navashu59/tournament-schedule-tools`
- Current pushed branch: `main`
- Build command: `npm run build`
- Publish directory: `public`
- Local preview command: `npm run serve`
- Default local URL: `http://127.0.0.1:8790/`
- Domain: pending. Recommended first choice: `tournamentscheduletools.com`.
- Before production deployment, rebuild with the final origin:
  `SITE_ORIGIN=https://your-domain.com npm run build`

## Domain Recommendation

Recommended domain: `tournamentscheduletools.com`

Reason:

- It exactly matches the site's category and current positioning.
- It covers the broader authority field better than a narrow bracket-only or round-robin-only name.
- It matches the GitHub repository and product name.
- It remains flexible if the site later adds calculators, templates, printable sheets, standings, or sport-specific scheduling tools.

WHOIS check on 2026-05-29 showed `No match` for these candidates:

- `tournamentscheduletools.com`
- `tournamentfixturemaker.com`
- `fairtournamentscheduler.com`
- `poolplayscheduler.com`
- `roundscheduler.com`
- `tourneyscheduletools.com`

Final availability must still be confirmed at checkout because domain availability can change quickly.

## Launch Scope

The first launch includes:

- 38 SEO pages from the validated tournament scheduling cluster
- Homepage with a working scheduler
- Tools index
- About, How it works, Privacy, Terms, Contact
- Sitemap, robots.txt, `_headers`, manifest, favicon
- Page-level meta tags and JSON-LD schema
- Browser-side tournament scheduler with:
  - single elimination brackets
  - round robin schedules
  - league-style fixtures
  - byes for odd or non-power-of-two counts
  - court and time assignment
  - fairness summary
  - copy, CSV export, and print controls

## Content Method

Each planned page has:

- page map entry in `planning/page-map.json`
- SERP/PAA framework note in `serp-paa/`
- content brief in `content-briefs/`
- first-pass user-scenario copy in `content-drafts/`

DeepSeek was used for first-pass copy drafts. The generator normalizes internal links so generated pages do not link to non-existent paths.

## Authority Expansion

Eight pages were added after the first 30-page build to make the site feel more complete around real scheduling constraints:

- `/round-robin-schedule-maker/`
- `/tournament-fixture-generator/`
- `/sports-schedule-maker/`
- `/pool-play-schedule-generator/`
- `/tournament-schedule-template/`
- `/5-team-round-robin/`
- `/7-team-round-robin/`
- `/9-team-round-robin/`

These pages strengthen the round robin schedule, fixture, pool play, template, and odd-team bye clusters without turning the site into low-value page expansion.

## Verification Completed

- `npm run build` passed
- `node --check public/assets/app.js` passed
- 45 index pages generated
- 45 sitemap URLs generated
- 46 HTML files have parseable JSON-LD, including `404.html`
- Internal link check found 0 broken local links
- Playwright smoke test passed:
  - homepage schedule generation works
  - round robin page generation works
  - mobile `/tools/` has no horizontal overflow
  - no browser console errors

## Next Steps

1. Choose and buy the production domain. First choice: `tournamentscheduletools.com`.
2. Rebuild with the final origin:
   `SITE_ORIGIN=https://final-domain.com npm run build`
3. Connect the repository to Cloudflare Pages:
   - repository: `Navashu59/tournament-schedule-tools`
   - build command: `npm run build`
   - publish directory: `public`
4. Add the final custom domain in Cloudflare Pages.
5. After launch, submit `sitemap.xml` in Google Search Console.
6. Watch the first indexing cycle by cluster:
   - core schedule/bracket pages
   - round robin and size pages
   - sport/use-case pages
   - guide pages
7. Use SERP/PAA gap optimization only after baseline impressions appear, unless a page has obvious quality or usability issues.
