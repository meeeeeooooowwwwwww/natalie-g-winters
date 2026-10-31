# nataliegwinters.com

Cloudflare Worker site for **nataliegwinters.com**.

## Public routes

- `/` - profile overview and featured video
- `/about` - biography
- `/career` - career timeline and roles
- `/reporting` - investigative reporting focus
- `/white-house` - White House reporting role
- `/war-room` - War Room role and archive context
- `/videos` - source-linked Rumble video archive, with newer verified external interviews
- `/videos/:slug` - dedicated video/context pages
- `/interviews` - interviews and external appearances
- `/articles` - rolling Substack archive
- `/china` - China / CCP reporting hub
- `/verdict` - legacy satirical personal page (not indexed; not included in sitemap)
- `/sitemap.xml` - Worker-generated sitemap including video pages
- `/<indexnow-key>.txt` - IndexNow ownership proof for the apex domain
- `/api/status` - non-indexed operational status for the article updater

All normal public pages share the global header, latest Substack reporting and footer. The `/articles` archive suppresses the duplicate five-card latest-reporting strip because those posts are already displayed there.

## Substack article updater

The Worker stores up to 25 recent Natalie Winters Substack posts in `NATALIE_KV`.

A Cloudflare Cron Trigger runs hourly at minute 17:

```text
17 * * * *
```

A normal page request also starts a background refresh when the last check is more than one hour old.

The updater uses a bounded discovery pass:

1. Substack RSS publication feed.
2. Substack archive API, cross-checked even when RSS succeeds, for canonical covers and metadata.
3. Reader-backed archive API only when neither direct source returns usable posts.

There are at most three discovery requests per pass, each with an eight-second timeout. There is no homepage/sitemap crawling or per-post request fan-out. A 429 stops further calls to that host; Retry-After and backoff survive deployments, including partial success. Concurrent refreshes in the same Worker isolate share one promise (this is not a distributed lock).

Email intake is an independent publication path, but requires the routing and forwarding setup in `docs/operations/SUBSTACK_EMAIL_INGEST.md`. Deploying the handler does not activate email delivery.

Results are merged by canonical post URL. Good stored metadata is retained when a fresh source is incomplete, while corrected titles, dates, subtitles and cover images can still repair the cache even when the newest article URL has not changed.

Article images are restricted to Substack media hosts. Profile/avatar/logo-sized images are rejected so an author photo cannot silently become an unrelated article cover. If no trustworthy cover is available, the site renders an explicitly editorial text-based cover using the article's canonical title and date, never a fabricated reporting photo or unrelated stock image.

An old verified post list is retained only as a last-resort bootstrap if KV is empty and every live Substack source is unavailable. It is not re-injected into a healthy rolling archive.

## Current media
The homepage featured-video hero intentionally shows a standalone, playful YouTube
embed (currently `1c7XccFwJrQ`) titled "Behind the scenes with Natalie Winters"
with autoplay disabled; the caption explicitly marks it as unofficial and the
feature remains separate from reporting. The homepage's separate appearance section
and the top of /videos show verified late-October 2026 Rumble source-page
links (not guessed playback IDs or third-party stock thumbnails).
Older confirmed embedded clips remain in the historical archive. The 29 October
Natalie Winters appearance on The Glenn Beck Program uses the owner's
**episode-specific** iHeart iframe, displayed at a compact 120px height with
no autoplay permission and a direct episode link beside the player.

## Rumble in-page playback and mobile cards

Recent videos now use the native Rumble oEmbed metadata (player IDs and
`hugh.cdn.rumble.cloud` thumbnails), verified on 31 October 2026 against
all five original source URLs. A video poster is an accessible **Play video**
button; clicking loads an iframe *in the same card*, without leaving the site.
The separate original Rumble source link is kept for attribution. Players
do not load or autoplay before a visitor clicks, protecting mobile bandwidth.

The homepage Rumble appearance cards use the same verified player and thumbnails.
On screens 760px wide or narrower, Substack article cards stack the full-width
image above the title and description. Article archive side cards likewise
stack vertically, avoiding the former 42% / 58% compressed column layout.

Regression tests: `npm test` includes `test/rumble-inline.test.mjs` to
guard mobile article stacking, real thumbnail URLs, embed ownership and
click-to-load behaviour.

## Search discovery and IndexNow

The public `robots.txt` points at the generated `/sitemap.xml` (primary pages and video-detail pages). The rolling Substack archive is an indexable **local** `/articles` page; individual articles retain their **external** Substack canonical URLs and are not submitted to search engines as if hosted on this site.

IndexNow ownership proof is served by the Worker at the static key-file path in `src/indexnow.js`. When a **genuine archive change** persists from scheduled/request-triggered polling or a validated Substack email, a best-effort IndexNow notification reports **only** the changed homepage and `https://nataliegwinters.com/articles`. Duplicate emails, failed source polling and unmodified checks never notify. IndexNow network failures are logged without failing article ingestion. The `api.indexnow.org` submission is shared with participating search engines, including Bing and Yandex; it does not submit to Google or Brave, nor guarantee indexing. The key file must be publicly reachable on the canonical domain for successful ownership validation.

After deploying, verify the key-file endpoint (HTTP 200, plain text matches filename), submit the existing sitemap to Google Search Console and Bing Webmaster Tools, and inspect Bing's IndexNow submissions/errors. The CDN/WAF must allow genuine search crawlers to retrieve pages, robots.txt and sitemap. Do not weaken Cloudflare bot protection merely to make a synthetic test pass. For major non-archive site updates, request recrawls through the search engine consoles; this IndexNow hook intentionally does not ping unchanged pages on every deployment.

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

Website releases are intentionally independent of account-level Email Routing changes.
**Do not run bare `npx wrangler deploy` with the regular restricted production token.**
That command reads the managed `addresses` field and may attempt an Email Routing
API operation for which ordinary Worker deploy tokens have no permission.

Use the manually approved **Deploy Natalie G. Winters (independent)** workflow
in GitHub Actions on `main`, set confirmation to `DEPLOY` and leave
`manage_email_routing=false` for ordinary releases. The workflow runs the
tests, generates a safe temporary Wrangler config without `addresses`,
performs a dry run, deploys the same config and checks the public status.
The existing Email Routing rule is *not* changed by this mode.

Only use `manage_email_routing=true` for explicitly approved setup/changes
with a token that has the relevant Email Routing permissions. See
`docs/operations/SUBSTACK_EMAIL_INGEST.md`. Cron configuration changes
can take several minutes to propagate through Cloudflare.

## Editorial verification

Articles are pulled from Natalie Winters' canonical Substack publication.
Do not invent cover images, headlines or post dates to fill a gap.
When a source is blocked or a video player ID cannot be verified, link the
publisher's known original source rather than manufacturing an embed.

Recent manual verification (31 October 2026 NZ time):
the public `/articles` archive's newest headline matched Substack's
30 October publication. War Room's Rumble playlist confirmed a 26 October
Natalie Winters appearance. Glenn Beck's official podcast page confirmed
an additional 29 October programme appearance. The newest directly verified
Rumble *embed* in the structured archive was dated 7 October. These are
different availability and publication dates and must not be conflated.

The original source and verification limitations are recorded in
`docs/operations/EDITORIAL_AUDIT_2026-10-31.md`.

## Updater status

After deployment, visit:

```text
https://nataliegwinters.com/api/status
```

The JSON shows the newest cached article, article-cache update time, latest check, last successful check, source combination, partial source failures and any final error.

`pollingHealth` distinguishes errors, unverified state, degraded source coverage and overdue checks. `emailHealth: no-email-received` means delivery is not yet proven, not that routing is necessarily absent. An `ok` polling result means sources answered; it cannot prove that Substack has exposed every new article.
