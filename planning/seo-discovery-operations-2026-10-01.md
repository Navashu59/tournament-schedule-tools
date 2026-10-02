# SEO Discovery Operations - 2026-10-01

## Current diagnosis

Google has indexed and crawled priority URLs, but the 30-day GSC result is 1 click from 616 impressions at average position 56.6. Bing is the early validation channel: GA4 records 102 Bing organic sessions in September versus 6 Google organic sessions.

## Completed technical discovery actions

- GSC sitemap has been re-submitted once after this record.
- `public/828dd65056bd7082aea0b4d4eb35498f.txt` is the IndexNow key-verification file.
- Use the explicit submission script only for canonical URLs that changed materially after a production deploy. Do not submit all URLs on every deploy.

```bash
INDEXNOW_HOST=tournamentscheduletools.org \
INDEXNOW_KEY=828dd65056bd7082aea0b4d4eb35498f \
node scripts/indexnow-submit.mjs \
  https://tournamentscheduletools.org/round-robin-generator/ \
  https://tournamentscheduletools.org/fixture-generator/
```

## External discovery queue

| Target type | Matching URL | Acceptance rule |
| --- | --- | --- |
| School or community league resource | Relevant sport or team-count tool | The resource must be publicly useful and editor-controlled. |
| Tournament organizer guide | Round robin or fixture generator | Link follows a real scheduling use case. |
| Sport-specific organizer resource | Volleyball, chess, cornhole, ping-pong tool | Use the sport page, not the homepage. |

Do not buy links, use automated directories, or post comments for links. Record source, URL, target page, publication date, referral sessions, and ranking movement before repeating a channel.

## Review gates

- At day 14: GSC sitemap reread and at least one core query within average position 30.
- At day 30: Google organic sessions 15+ or one primary tool has sustained page-one/two visibility.
- If Bing remains strong while Google does not improve, prioritize editorial, sport-relevant mentions rather than more sitemap submissions.
