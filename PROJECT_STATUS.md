# Tournament Schedule Tools Status

Updated: 2026-05-28

## Current State

The new site is implemented as a static Cloudflare Pages-ready project.

- Source path: `/Users/bluepha/tournament schedule tools`
- Build command: `npm run build`
- Publish directory: `public`
- Local preview command: `npm run serve`
- Default local URL: `http://127.0.0.1:8790/`
- Domain: pending. Set `SITE_ORIGIN=https://your-domain.com npm run build` before production deployment.

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

1. Choose and buy the production domain.
2. Rebuild with the final origin:
   `SITE_ORIGIN=https://final-domain.com npm run build`
3. Create the GitHub repository and push this project.
4. Connect the repository to Cloudflare Pages:
   - build command: `npm run build`
   - publish directory: `public`
5. After launch, submit `sitemap.xml` in Google Search Console.
6. Watch the first indexing cycle by cluster:
   - core schedule/bracket pages
   - round robin and size pages
   - sport/use-case pages
   - guide pages
7. Use SERP/PAA gap optimization only after baseline impressions appear, unless a page has obvious quality or usability issues.
