# Natalie G. Winters: Rumble video publishing runbook

Updated: 9 November 2026. Maintainer: site operations.

## Read this first

**Do not add an unplayable video listing card when an individual clip has been published.** Each public video record in `src/recent-rumble.js` needs the exact original Rumble video URL, the **different** publisher iframe URL, and the native high-resolution thumbnail URL. The homepage and `/videos` share one click-to-play implementation, so do not create another media component or use a channel listing as the original clip link.

**Rumble's main channel pages frequently return 403 to web crawlers/GitHub Actions. That is not proof that the videos are inaccessible.** As at 9 Nov 2026 the official Rumble host `https://wn0.rumble.com/c/BannonsWarRoom/videos?page=2` (and `page=3`) returned the publisher's full HTML including structured video data. Rumble's official no-auth oEmbed also returned 200. If these endpoints cease working, stop and gather links from a user-open browser tab or direct publisher URLs; never invent embed or thumbnail IDs or disable site security to bypass a challenge.

## Fast path for future sessions

1. Use the existing **Verify Natalie Rumble videos (read-only)** GitHub Actions workflow (`.github/workflows/rumble-collect.yml`), `Run workflow`, pages `2,3` or the relevant page numbers. Download the `natalie-rumble-candidates` JSON artifact. The underlying script is `tools/rumble-collect.mjs`, also runnable with `RUMBLE_PAGES=2,3 node tools/rumble-collect.mjs` from a network-enabled Node 22+ environment. The collector is read-only; it does not publish or deploy anything.
2. Inspect each video's publisher title, permalink and status. The channel response contains structured `title`, `upload_date`, `thumb`, `permalink_id`, and canonical `url` records. Match the exact intended clip, not a broad War Room episode or a clip with similar wording. Deduplicate using the immutable Rumble permalink ID.
3. For each canonical link `https://rumble.com/v...-....html`, verify the official **oEmbed** endpoint:
   `https://rumble.com/api/Media/oembed.json?url=<URL-ENCODED-ORIGINAL-VIDEO-URL>`.
   Read `title`, `html` (the `https://rumble.com/embed/v.../` iframe), `thumbnail_url` (normally `https://hugh.cdn.rumble.cloud/video/...qR4e.jpg`), `duration`, and verify that the title matches the clip. Rumble also serves the same official oEmbed on `https://wn0.rumble.com/api/Media/oembed.json?url=...` when suitable. **Public permalink IDs are not iframe IDs.** Do not assume a mathematical offset or construct an embed URL yourself.
4. Add newest-first records to `NEW_RUMBLE_LISTINGS` in `src/recent-rumble.js` with `id`, editorial `title`, exact `sourceTitle`, `url`, `embedUrl`, `thumbnailUrl`, `publisher`, `period` and an accurate, cautiously framed `summary`. If metadata is incomplete, keep the record out of the playable collection until verified; do not invent the missing assets.
5. Use **the existing** `renderRumblePlayButton`/`renderRecentRumbleCards` component. `renderNewRumbleListings` delegates to it. The Play button loads an iframe on click and the separate ORIGINAL ON RUMBLE link opens the source. The homepage currently displays the first four recent records; `/videos` shows the full recent list.
6. Run `npm ci && npm run check && npm test` and inspect changes in a pull request. Tests in `test/rumble-inline.test.mjs` assert source URLs, poster URLs, click-to-play, uniqueness, homepage and archive inclusion. Inspect both desktop and mobile cards, plus click-to-play and external source links.
7. Merge only after passing CI. Deploy using the **existing protected** `.github/workflows/deploy-production.yml` with `confirm=DEPLOY`, `manage_email_routing=false` (code-only). **Never modify the Natalie email-to-Worker rule as part of a video update.** Verify `/videos` and the homepage in the public browser. Production checks may receive Cloudflare 403 at the custom domain from an automated runner; the deployment workflow checks the canonical `nataliegwinters-site.generalflynn17.workers.dev` fallback. An HTTP 200 with visible content is evidence of the deployed Worker, not of successful client-side Rumble playback; verify the actual Play action in a browser.

## Exactly verified clips on 9 November 2026

| Original Rumble ID | Official embedded player | Video duration | Date in publisher channel |
| --- | --- | --- | --- |
| `v7hx5mo` | `v7fqsp6` | 5:13 | 5 Nov 2026 |
| `v7hx4uu` | `v7fqrxc` | 14:00 | 5 Nov 2026 |
| `v7hx35w` | `v7fqq8e` | 12:00 | 5 Nov 2026 |
| `v7hx2o8` | `v7fqpqq` | 4:59 | 5 Nov 2026 |
| `v7hv0u6` | `v7fonwo` | 8:32 | 4 Nov 2026 |

Authoritative verification evidence: `docs/operations/rumble-oembed-check-2026-11-09.json` and `docs/operations/rumble-discovery-last.json`. The former was populated from actual HTTP 200 Rumble official oEmbed responses; its `html`/`thumbnail_url` fields provide the exact player and poster for each of these records. The older `RECENT_RUMBLE_VIDEOS` archive must be preserved and deduplicated, not overwritten.

## Common failure modes

- **Rumble channel 403:** use the publisher's mirror host and official oEmbed; do not conclude clips are missing.
- **Video card shows a dark 'Browse on Rumble' panel:** the record is a placeholder, not a verified playable video; complete metadata instead of re-implementing the UI.
- **Video opens Rumble rather than playing on-site:** check `renderRumblePlayButton`, the `data-rumble-embed` attributes and `public/assets/rumble-player.js`; the thumbnail itself must be a Play button and the original publisher link stays separate.
- **Wrong clip / blank image:** verify the exact public `url`, the distinct `embedUrl` from oEmbed, and the native `thumbnail_url`; do not use a generic portrait or a constructed CDN path.
- **Premium / restricted content:** label it as such; never promise a public player that Rumble refuses to play.
- **Article/video ingestion scope:** this runbook is for manually curated video records. Do not touch Substack article ingestion, email routing, D1/R2, or unrelated sites during a video-only release.

For safety, collector output is **review evidence**, not an autonomous publishing instruction. If a script yields zero verified results, preserve the existing playable clips and report the block.
