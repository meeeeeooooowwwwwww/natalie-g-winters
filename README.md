# nataliegwinters.com

Cloudflare Worker site for **nataliegwinters.com**.

## Public routes

- `/` - profile overview and featured video
- `/about` - biography
- `/career` - career timeline and roles
- `/reporting` - investigative reporting focus
- `/white-house` - White House reporting role
- `/war-room` - War Room role and archive context
- `/videos` - 50+ video archive
- `/videos/:slug` - dedicated video/context pages
- `/interviews` - interviews and external appearances
- `/articles` - rolling Substack archive
- `/china` - China / CCP reporting hub
- `/verdict` - deliberately excessive fan assessment
- `/sitemap.xml` - Worker-generated sitemap including video pages
- `/api/status` - non-indexed operational status for the article updater

All normal public pages share the global header, latest Substack reporting and footer. The `/articles` archive suppresses the duplicate five-card latest-reporting strip because those posts are already displayed there.

## Substack article updater

The Worker stores up to 25 recent Natalie Winters Substack posts in `NATALIE_KV`.

A Cloudflare Cron Trigger runs hourly at minute 17:

```text
17 * * * *
```

A normal page request also starts a background refresh when the last check is more than one hour old.

The updater cross-checks several sources instead of trusting the first endpoint that answers:

1. Substack archive API
2. Substack RSS
3. Reader-backed yearly sitemap/post pages
4. The live Substack homepage as a freshness gap check and final fallback

Results are merged by canonical post URL. Good stored metadata is retained when a fresh source is incomplete, while corrected titles, dates, subtitles and cover images can still repair the cache even when the newest article URL has not changed.

Article images are restricted to Substack media hosts. Profile/avatar/logo-sized images are rejected so an author photo cannot silently become an unrelated article cover. If no trustworthy cover is available, the site shows its normal article placeholder rather than inventing one.

An old verified post list is retained only as a last-resort bootstrap if KV is empty and every live Substack source is unavailable. It is not re-injected into a healthy rolling archive.

## Static assets and Worker routing

Cloudflare static assets normally run before Worker code. `wrangler.jsonc` therefore explicitly routes `/sitemap.xml`, `/api/*` and `/media/*` through the Worker first. There is no static `public/sitemap.xml`; the Worker is the single source of truth for the sitemap.

## Local development

From WSL:

```bash
cd /mnt/c/nataliegwinters.com/ngw
git pull --ff-only origin main
npm install
npm run check
npm test
npx wrangler dev
```

Wrangler normally serves the preview at `http://localhost:8787`.

## Deployment

After checking the local preview:

```bash
cd /mnt/c/nataliegwinters.com/ngw
git pull --ff-only origin main
npm install
npm run check
npm test
npx wrangler deploy
```

Cron configuration changes can take several minutes to propagate through Cloudflare.

## Updater status

After deployment, visit:

```text
https://nataliegwinters.com/api/status
```

The JSON shows the newest cached article, article-cache update time, latest check, last successful check, source combination, partial source failures and any final error.
