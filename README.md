# nataliegwinters.com

Cloudflare Worker site for nataliegwinters.com.

## Current structure

- `/` - featured Rumble video
- `/about` - concise overview
- `/career` - career timeline and roles
- `/reporting` - investigative reporting focus
- `/white-house` - White House / broadcast role
- `/verdict` - deliberately excessive fan assessment
- `/api/status` - non-indexed operational article-cache status JSON

All public pages share:

- global header
- latest five Substack articles
- global footer

## Article updater

A Cloudflare Cron Trigger runs every two hours:

`0 */2 * * *`

The updater tries Substack's archive API and RSS feed first. If Substack rate-limits Cloudflare, it discovers the current post order through a reader-backed copy of Substack's yearly sitemap, then hydrates the newest five post pages for their titles, dates, summaries and real cover images. The homepage parser remains a final fallback. If the newest URL has not changed, the existing KV article list is preserved.

When a new URL is detected, the Worker merges the newest five posts into the rolling archive and updates KV. Emergency seeds are date-sorted with fetched content, so they cannot pin an older post above a new one.

The last good article list is never intentionally cleared if Substack fails.

## Deployment

From WSL:

```bash
cd /mnt/c/nataliegwinters.com/site
npm install
npx wrangler deploy
```

Cron changes can take up to approximately 15 minutes to propagate through Cloudflare.

## Status check

After deployment, visit:

`https://nataliegwinters.com/api/status`

This shows the last article URL, last successful update/check timestamps and last check result.
