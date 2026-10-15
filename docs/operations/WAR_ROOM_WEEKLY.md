# War Room video catch-up — 15 October 2026

## Status

Partial preparation, not a completed import. All 57 existing video records and URLs are preserved. Homepage cards and video archive now select newest dated entries; War Room page has a newest-first section. Main H1/title use Natalie G. Winters.

12 candidate uploads have original short article drafts in `war-room-candidates.json`. These are NOT imported by the site and are not published. Source discovery used indexed Rumble publisher listings. Direct channel/page access encountered Cloudflare human verification. Embeds, thumbnails, full content and completeness cannot currently be verified. The two rural-demographics uploads may be duplicates and need comparison. Indexed premium notices may be stale; verify current access without bypassing restrictions.

## Weekly check

The mistakenly created ChatGPT task has been disabled at the owner's request. No GPT reminder is part of this design.

`scripts/mine-war-room.py` scans the exact `/c/BannonsWarRoom/videos` list newest-first. It matches Natalie Winters case-insensitively and stops at `lastKnownVideoId`. Metadata comes from Rumble's public oEmbed API, as used by the previous archive import. All new metadata and the checkpoint are saved atomically in `data/war-room-miner.json`; errors leave the old file intact. The initial boundary is the latest dated existing War Room video, v7ew94o (31 August 2026).

`.github/workflows/war-room-miner.yml` runs the script weekly at Thursday 19:00 UTC (Friday 08:00 NZDT / 07:00 NZST) once merged to main. A branch push also runs the first catch-up. It stops on verification challenges, missing/changed markup, repeated pages or an unreached checkpoint. No proxy rotation, challenge bypass or video downloading. Discoveries are saved as awaiting-article records; publication is a separate step and is not yet automatic.

Local tests cover title filtering, pagination stop, preservation of old records and unchanged checkpoint after metadata or pagination failure. Live channel parsing still needs a successful executor run.

Do not treat a failed fetch or empty search index as proof there are no new videos. Use overlapping discovery windows and compare against the complete stored archive. Keep article claims attributed; do not invent quotations, transcripts, dates or embed IDs. Never delete older pages to make room for new ones.

## Remaining work

Obtain accessible direct publisher/video metadata, resolve duplicate-topic uploads, complete the channel inventory, finalise each article against its source, add verified video/copy/thumbnail records and deploy. Candidate air dates are publisher-listed dates, not independently verified upload timestamps. Preserve that distinction when sorting.

## Deployment

Existing central path: grideater `.github/workflows/external-static-site-deploy.yml`, request on `external-site-deploy-control` branch, exact site commit SHA, main trigger file. Follow that repository's operational instructions before changing its control files. Do not reuse the unrelated natalie-article-recovery operation, which also changes email routing.

## Cost

No new Worker cron, upstream calls, KV writes, D1 or Typesense operations. Sorting happens once at module initialisation; pages use the existing static archive. Drafts remain in version control. No image downloader or paid service introduced.
