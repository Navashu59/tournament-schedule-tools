# Tournament Schedule Tools

Static tool site project for a differentiated tournament scheduling opportunity.

Core positioning:

> Make fair tournament brackets and schedules without spreadsheets.

Primary cluster:

- tournament schedule maker
- tournament bracket maker
- round robin generator
- league schedule maker
- fixture generator

All project files for this new site live in this directory.

## Build model

- Static generated site
- `public/` deploy output
- Cloudflare Pages compatible
- domain injected with `SITE_ORIGIN`

## Current status

First launch implementation is complete and ready for domain-specific rebuild.
See `PROJECT_STATUS.md` for verification results and deployment next steps.

## Commands

```bash
npm run build
npm run serve
SITE_ORIGIN=https://final-domain.com npm run build
```
