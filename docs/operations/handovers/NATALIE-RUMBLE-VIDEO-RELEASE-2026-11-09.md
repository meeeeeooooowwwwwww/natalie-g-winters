# Natalie Rumble video release: verified session handover
**Date:** 9 November 2026 NZ time  
**Project:** nataliegwinters.com  
**Status:** Completed and verified in production, no outstanding deployment task

## Handover in one minute

The November 2026 Rumble video update was completed through [PR #50](https://github.com/meeeeeooooowwwwwww/natalie-g-winters/pull/50) and the protected [production deployment #42537354440](https://github.com/meeeeeooooowwwwwww/natalie-g-winters/actions/runs/42537354440). User subsequently reported that the result looked good. The deployed homepage and `/videos` were served successfully from the Cloudflare Worker hostname, with five distinct official iframe IDs, publisher-native thumbnail URLs and click-to-play bindings. **This is evidence of rendered player integration, not an independent browser media playback test.**

For any further update, **read the maintained [Rumble video publishing runbook](../RUMBLE_VIDEO_PUBLISHING.md) first**. It contains the full working process and command checklist. This handover preserves the specific incident, current implementation and links to evidence.

## What failed and why

The initial source lookup requested the War Room channel at `rumble.com/c/BannonsWarRoom/videos?page=2` and `page=3`. Those server-side fetches returned **HTTP 403**, so an earlier release put up **Browse on Rumble** placeholder cards. They lacked actual individual thumbnail URLs and Rumble player IDs and could not play inline. This was a metadata retrieval failure, not a problem with the existing site's video component.

## The successful approach

1. The publisher's alternate host `https://wn0.rumble.com/c/BannonsWarRoom/videos?page=2` and `page=3` returned **HTTP 200** and publisher-embedded structured clip records (title, permalink ID, canonical source, original thumbnail and date).
2. The official public oEmbed endpoint `https://rumble.com/api/Media/oembed.json?url=<encoded original Rumble video URL>` returned **HTTP 200** for each of the five intended video links, with the *different* embed URL and original `hugh.cdn.rumble.cloud` thumbnail. Do not derive player IDs from permalink IDs.
3. The single existing `src/recent-rumble.js` collection was changed from placeholder cards to publisher-verified `url`, `embedUrl`, `thumbnailUrl`, `sourceTitle` metadata. `renderNewRumbleListings` now calls `renderRecentRumbleCards`. `renderRumblePlayButton` and `public/assets/rumble-player.js` provide click-to-play. Older archive records were preserved.
4. An ongoing, **read-only** GitHub Actions workflow was added: [Verify Natalie Rumble videos (read-only)](https://github.com/meeeeeooooowwwwwww/natalie-g-winters/actions/workflows/rumble-collect.yml). It runs `tools/rumble-collect.mjs` and uploads `natalie-rumble-candidates.json` as a seven-day artifact. [Historical successful run #42537179681](https://github.com/meeeeeooooowwwwwww/natalie-g-winters/actions/runs/42537179681): **five verified, zero incomplete**, four on page 2 and one on page 3 at that time. Future pagination may change.
5. CI, editorial checks and collector passed; [PR #50](https://github.com/meeeeeooooowwwwwww/natalie-g-winters/pull/50) merged. Protected production workflow was run with `confirm=DEPLOY` and `manage_email_routing=false`. The temporary one-off workflow and superseded diagnostics were removed, leaving only the canonical collector and the protected release workflow.

## Verified production snapshot

The [deployment evidence](../rumble-release-2026-11-09.json) reports:
- `productionRun=42537354440`, `conclusion=success`
- `videoHttp=200`, `homeHttp=200` at `nataliegwinters-site.generalflynn17.workers.dev`
- All five embed IDs present: `v7fqsp6`, `v7fqrxc`, `v7fqq8e`, `v7fqpqq`, `v7fonwo`
- Native thumbnail refs and `data-rumble-embed` bindings found
- `emailRoutingChanges=false`
- The custom domain returned 403 to the automated runner, so do not mistake a runner-edge denial for a failed deployment.

The four 5 November 2026 clips are: Democrats’ post-election proposals, ICE compensation proposals, Howard Lutnick allegations, and House seats/National Popular Vote Compact. The fifth, dated 4 November, is the January 6-style investigations discussion. The site homepage presently shows the first four; `/videos` shows all five.

Exact canonical source, iframe and image URLs are in `src/recent-rumble.js` and [oEmbed verification evidence](../rumble-oembed-check-2026-11-09.json); do not transcribe or guess URLs from a screenshot.

## Next time: minimum safe workflow

1. Read [the runbook](../RUMBLE_VIDEO_PUBLISHING.md). Run the existing **Verify Natalie Rumble videos (read-only)** workflow for current channel pages and download its artifact. Compare results against existing `NEW_RUMBLE_LISTINGS` and `RECENT_RUMBLE_VIDEOS`, deduplicating by Rumble public ID.
2. Confirm each exact permalink against Rumble oEmbed; update only verified source URLs, thumbnail URLs, iframe URLs, dates, editorial summaries and relevant tests. Never reimplement the player, manufacture metadata, or degrade into dark channel-list cards when oEmbed works.
3. Pass `npm run check` and `npm test`, review a PR, merge, then use the **existing** guarded `deploy-production.yml` with `manage_email_routing=false`. Check both pages and click-to-play in a real browser. Preserve the featured YouTube video, older Rumble archive and Substack/email ingestion.

**Do not** edit Cloudflare Email Routing, deploy unrelated sites, create recurring one-off Actions or treat Rumble's public permalink ID as its iframe embed ID. This task is concluded. Future videos are a **new content update**, not a recovery of this session.
