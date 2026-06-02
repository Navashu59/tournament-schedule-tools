# Tournament Schedule Tools Status

Updated: 2026-05-30

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
  - practical double elimination planning rows
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

## 2026-05-30 Content and Tool Consistency Cleanup

The site was adjusted after a DeepSeek Reasoner assistant audit and Codex review.

Changed:

- Rewrote all 38 content drafts to reduce repeated AI-template structure.
- Replaced generic headings like `How To Use It`, `Example`, `What The Results Mean`, and `Common Mistakes` with page-specific headings tied to the exact keyword and organizer scenario.
- Added more SERP/PAA-aligned coverage around byes, match count, court/venue constraints, time slots, export/print workflows, and final organizer review.
- Softened absolute fairness language. Pages now explain that fairness summaries help identify problems, not guarantee perfect real-world fairness.
- Added a basic `double_elimination` tool mode and generated planning rows for the double elimination page.
- Expanded About, How It Works, and Contact trust copy so the site explains scope, limits, and how to report scheduling problems.

Post-change verification:

- `npm run build` passed.
- 46 HTML files generated.
- 45 sitemap URLs generated.
- Internal link check found 0 broken local links.
- JSON-LD parsed on every HTML page.
- Repeated-H2 audit no longer shows duplicated tool-page content frameworks; the only repeated empty pattern is static/support pages without content H2 extraction.

## 2026-06-01 Mature Launch Pass

Goal: move the site from minimum launch readiness to mature first-launch readiness, so Google can more quickly understand the tournament scheduling authority field after the production domain is connected.

Changed:

- Verified Semrush API access from `/Users/bluepha/seo-revenue-system/.env`.
- Saved page-level Semrush keyword evidence to `research/semrush-page-keyword-evidence-2026-06-01.json`.
- Added `planning/mature-launch-inventory.md` as the working inventory for mature-launch gaps.
- Refreshed every page-level `serp-paa/*.md` brief with Semrush related keywords, required PAA coverage, mature-launch modules, and tool capability checks.
- Added participant summary output to generated schedules:
  - games
  - byes
  - home rows
  - away rows
  - back-to-back count
- Added a fifth fairness metric for back-to-back matches.
- Added mature-launch content modules to all 38 content draft pages, including search intent, related searches, organizer checks, byes, court/venue constraints, timing, export/print, and format-specific review notes.

Post-change verification:

- `npm run build` passed.
- `node --check public/assets/app.js` passed.
- 46 HTML files generated.
- 45 sitemap URLs generated.
- Internal link check found 0 broken local links.
- JSON-LD parsed on every HTML page.

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

## 2026-06-01 Production Domain Deployment

Production domain selected:

```text
tournamentscheduletools.org
```

Completed:

- Rebuilt `public/` with `SITE_ORIGIN=https://tournamentscheduletools.org`.
- Confirmed no `https://example.com` remains in generated output.
- Added Cloudflare Pages workflow at `.github/workflows/deploy-cloudflare-pages.yml`.
- Added `scripts/cloudflare-postdeploy.js` to configure DNS records and custom domains when the Cloudflare token has the required permissions.
- Added `_redirects` generation for `www.tournamentscheduletools.org` to redirect to `https://tournamentscheduletools.org`.
- Pushed production-domain build to GitHub.
- GitHub Actions created the Cloudflare Pages project `tournament-schedule-tools`.
- GitHub Actions deployed the site to Cloudflare Pages.

Current Cloudflare Pages preview:

```text
https://206293c0.tournament-schedule-tools.pages.dev
```

Cloudflare Pages custom domains:

```text
tournamentscheduletools.org added
www.tournamentscheduletools.org added
```

Blocked / pending:

- Cloudflare DNS zone creation is pending because the current API token does not have `account zone create` permission.
- Cloudflare DNS records for `tournamentscheduletools.org` and `www.tournamentscheduletools.org` are pending until the DNS zone exists.
- Namecheap nameserver change is pending until Cloudflare returns the zone nameservers.
- GSC property setup and sitemap submission are pending until the domain is live and verifiable.

Next step:

Update the Cloudflare API token with zone creation and DNS edit permissions, or manually add `tournamentscheduletools.org` as a Cloudflare zone, then rerun the `Deploy Cloudflare Pages` workflow.

## 2026-06-01 Production Launch Completed

The production launch is now complete.

Live URLs:

```text
https://tournamentscheduletools.org/
https://www.tournamentscheduletools.org/
```

Cloudflare state:

- The domain `tournamentscheduletools.org` is active in Cloudflare.
- Nameservers are managed by Cloudflare:
  - `pearl.ns.cloudflare.com`
  - `yoxall.ns.cloudflare.com`
- Cloudflare Pages project: `tournament-schedule-tools`.
- Production DNS is configured with DNS-only CNAME records to Cloudflare Pages:
  - `tournamentscheduletools.org` -> `tournament-schedule-tools.pages.dev`
  - `www.tournamentscheduletools.org` -> `tournament-schedule-tools.pages.dev`
- GitHub Actions deploys the site and runs the Cloudflare post-deploy setup.

Live verification:

- `https://tournamentscheduletools.org/` returns HTTP 200.
- `https://www.tournamentscheduletools.org/` returns HTTP 200.
- `https://tournamentscheduletools.org/robots.txt` loads and references the production sitemap.
- `https://tournamentscheduletools.org/sitemap.xml` loads with production canonical URLs.

Google Search Console:

- Domain property added and verified: `sc-domain:tournamentscheduletools.org`.
- DNS verification TXT record:

  ```text
  google-site-verification=-6WfSeGbMeqKJNfVdbpalV1o8abb8MtdFtS_XNyUe-E
  ```

- Sitemap submitted:

  ```text
  https://tournamentscheduletools.org/sitemap.xml
  ```

- GSC sitemap status on 2026-06-01: `成功`.
- GSC discovered pages from sitemap on 2026-06-01: `45`.

Known follow-up:

- Start the 14-30 day post-launch observation window before making large content changes.

## 2026-06-02 Cloudflare SEO Canonicalization

Completed:

- Added an active Cloudflare Redirect Rule:

  ```text
  SEO canonical redirect: www to tournamentscheduletools.org
  ```

- Rule behavior:

  ```text
  https://www.tournamentscheduletools.org/* -> https://tournamentscheduletools.org/${1}
  ```

- The redirect uses HTTP `301` and preserves the query string.
- Updated the `www.tournamentscheduletools.org` DNS CNAME to `proxied: true` so the Cloudflare Redirect Rule can run.
- Kept the apex `tournamentscheduletools.org` CNAME as DNS-only to preserve the stable Cloudflare Pages deployment path.

Verification:

- `https://www.tournamentscheduletools.org/` returns `301` to `https://tournamentscheduletools.org/`.
- `https://www.tournamentscheduletools.org/some-path/?x=1` returns `301` to `https://tournamentscheduletools.org/some-path/?x=1`.
- `https://tournamentscheduletools.org/` remains HTTP `200`.
- `http://tournamentscheduletools.org/` returns `301` to `https://tournamentscheduletools.org/`.
- `http://www.tournamentscheduletools.org/test?x=1` resolves through HTTPS and then to the bare-domain canonical URL.
