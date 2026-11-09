# Natalie G. Winters: Rumble video publishing runbook

Updated and rechecked: 9 November 2026. Maintainer: site operations.

**Start here on the next video-update session.** This is the authoritative procedure for the `nataliegwinters.com` recent Rumble clips. See also the [completed November release handover](handovers/NATALIE-RUMBLE-VIDEO-RELEASE-2026-11-09.md). The site README points here to avoid conflicting instructions.

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

## What actually worked in the 9 November 2026 session

The first release mistakenly showed dark **Browse on Rumble** placeholders. The original Rumble channel page had returned HTTP 403 to server-side requests, and screenshots only established titles, not playable metadata. **Do not repeat that workaround when a clip actually exists.**

The fix was a repeatable, two-stage publisher-source lookup:

1. **Discover the actual video permalink on Rumble's own alternate hostname**, for example `https://wn0.rumble.com/c/BannonsWarRoom/videos?page=2` and `page=3`. The response was HTTP 200 from a network-enabled GitHub Actions runner (the `rumble.com/c/.../videos` request returned 403). The HTML contains structured records holding `permalink_id`, `title`, `url`, `thumb`, `upload_date` and `duration`. Select only matching Natalie Winters clips and note that page positions will change as newer clips arrive. A browser tab showing an actual clip URL is also a valid discovery source.
2. **Use Rumble's own oEmbed JSON for every selected permalink**. This returned HTTP 200 and supplied the canonical `html` iframe `src` and `thumbnail_url`. The video/public ID and embed/player ID differed. The exact IDs in the table below came from publisher metadata, **not** a guessed mapping.
3. **Populate the existing recent-video collection** in `src/recent-rumble.js`. `NEW_RUMBLE_LISTINGS` uses these verified fields and `renderNewRumbleListings()` delegates to `renderRecentRumbleCards()`. The clickable thumbnail uses `renderRumblePlayButton()` and `public/assets/rumble-player.js`. This makes video playback inline on the same page; the original-source link is separate.
4. **Check both pages and older content**: `src/pages/home.js` currently renders the first four new appearances; `src/pages/videos.js` includes all five. Preserve `RECENT_RUMBLE_VIDEOS`, the featured YouTube video and the independent Glenn Beck section. As future appearances are appended, re-evaluate whether the first four are the correct most-recent clips. The fifth clip in this release was an earlier 4 November appearance, not a fifth 5 November clip.
5. **Verify and deploy safely**: [PR #50](https://github.com/meeeeeooooowwwwwww/natalie-g-winters/pull/50) passed the site CI, the editorial-quality check and the read-only Rumble collector. It was merged, then deployed by the existing guarded [production workflow run #42537354440](https://github.com/meeeeeooooowwwwwww/natalie-g-winters/actions/runs/42537354440), with `manage_email_routing=false`. The deployment check returned HTTP 200 for the homepage and `/videos` through the Worker hostname; the custom domain was 403 to the runner's edge request. It verified all five embedded-player IDs, native thumbnail references and the `data-rumble-embed` click bindings. This is not an independent browser playback test.
6. **Clean up ad-hoc diagnostics** once evidence is recorded. The temporary discovery/oEmbed scripts and one-time release workflows used while diagnosing this problem were deleted. Keep the single maintained `tools/rumble-collect.mjs` script and `.github/workflows/rumble-collect.yml`; do not recreate a new workflow for every clip update.

### Exact commands and checkpoints for the next operator

- In the GitHub Actions page of `meeeeeooooowwwwwww/natalie-g-winters`, choose **Verify Natalie Rumble videos (read-only)** and run it on `main` with the relevant channel pages, initially `2,3`. Download its `natalie-rumble-candidates` JSON artifact; artifacts are retained for seven days. The [successful run #42537179681](https://github.com/meeeeeooooowwwwwww/natalie-g-winters/actions/runs/42537179681) found **four matching clips on page 2 and one on page 3, verified=5, incomplete=0**. This is historical evidence, not an assurance that those page numbers will contain the same clips next time.
- For manual official metadata confirmation, use the following Node 22+ snippet with an **actual** Rumble permalink, never a guessed URL:

```js
const originalUrl = "https://rumble.com/v7hx2o8-winters.html"; // replace with verified publisher permalink
const endpoint = "https://rumble.com/api/Media/oembed.json?url=" + encodeURIComponent(originalUrl);
const res = await fetch(endpoint);
if (!res.ok) throw new Error(`Rumble oEmbed HTTP ${res.status}`);
const oembed = await res.json();
console.log({
  title: oembed.title,
  iframe: oembed.html?.match(/src="([^"]+)"/)?.[1],
  thumbnail: oembed.thumbnail_url,
  durationSeconds: oembed.duration
});
```

- Edit `src/recent-rumble.js` on a dedicated branch, preserve the old cards, update test assertions in `test/rumble-inline.test.mjs` and run `npm ci && npm run check && npm test`. Verify unique video IDs, exact Rumble permalinks, correct oEmbed URLs and native thumbnails, source attribution, plus desktop and mobile layout.
- After PR checks and merge, launch **Deploy Natalie G. Winters (independent)** (`.github/workflows/deploy-production.yml`) on `main`: `confirm=DEPLOY`, `manage_email_routing=false`. Check the resulting Action conclusion. Visit `https://nataliegwinters.com/` and `https://nataliegwinters.com/videos`; click a recent video thumbnail and confirm playback stays inside the card, and test **ORIGINAL ON RUMBLE** separately. If runner-only 403 prevents direct inspection, inspect the Worker-domain output and then the public site in a browser.
- Keep source metadata evidence in `docs/operations/` when needed, but do not keep large one-off diagnostic workflows. **No new Cloudflare configuration, routing or email changes are needed for an ordinary Rumble video update.**

### Next-session quick start

Read this runbook, `src/recent-rumble.js`, the collector workflow and the latest release evidence. Run the existing collector first. Verify URLs, embedded player IDs and thumbnails through oEmbed, check against published IDs to avoid duplicates, then use the existing cards, tests and protected deployment. Do not ask the user for all individual links while the publisher metadata endpoints are accessible; only request help for genuinely unresolvable clips.

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
