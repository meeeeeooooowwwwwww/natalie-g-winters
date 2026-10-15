# War Room video catch-up — 15 October 2026

## Status

Source contains 69 video pages: all 57 original records preserved plus 12 newly verified Rumble uploads. Each new upload has a real oEmbed player, thumbnail, publisher, duration and a unique short context article targeting Natalie G. Winters. Articles explicitly state they are publisher-listing context, not transcripts. Air dates come from indexed publisher listings. These source changes are not yet deployed.

The old oEmbed method works over ordinary curl requests. The channel listing does not currently work from this workspace or the GitHub Actions runner. Live miner run 38788506071 failed with HTTP 403 on the first list-page request, leaving the checkpoint unchanged. CI passed. Do not claim a complete channel inventory or a working scheduled scrape.

The two rural-demographics uploads have distinct embed IDs and durations (77 and 120 seconds); both are preserved. Overlap in footage has not been assessed.

## Weekly check

The mistakenly created ChatGPT task has been disabled at the owner's request. No GPT reminder is part of this design.

`scripts/mine-war-room.py` scans the exact `/c/BannonsWarRoom/videos` list newest-first. It matches Natalie Winters case-insensitively and stops at `lastKnownVideoId`. Metadata comes from Rumble's public oEmbed API, as used by the previous archive import. All new metadata and the checkpoint are saved atomically in `data/war-room-miner.json`; errors leave the old file intact. The initial boundary is the latest dated existing War Room video, v7ew94o (31 August 2026).

`.github/workflows/war-room-miner.yml` runs the script weekly at Thursday 19:00 UTC (Friday 08:00 NZDT / 07:00 NZST) once merged to main. A branch push also runs the first catch-up. It stops on verification challenges, missing/changed markup, repeated pages or an unreached checkpoint. No proxy rotation, challenge bypass or video downloading. Discoveries are saved as awaiting-article records; publication is a separate step and is not yet automatic.

Local tests cover title filtering, pagination stop, preservation of old records and unchanged checkpoint after metadata or pagination failure. Live channel parsing still needs a successful executor run.

Do not treat a failed fetch or empty search index as proof there are no new videos. Use overlapping discovery windows and compare against the complete stored archive. Keep article claims attributed; do not invent quotations, transcripts, dates or embed IDs. Never delete older pages to make room for new ones.

## Remaining work

Resolve channel-list discovery access, verify parsing against a real successful response, complete the inventory, and deploy the verified article additions and ordering changes. Candidate air dates are publisher-listed dates, not independently verified upload timestamps. Preserve that distinction when sorting.

## Deployment

Existing central path: grideater `.github/workflows/external-static-site-deploy.yml`, request on `external-site-deploy-control` branch, exact site commit SHA, main trigger file. Follow that repository's operational instructions before changing its control files. Do not reuse the unrelated natalie-article-recovery operation, which also changes email routing.

## Cost

No new Worker cron, upstream calls, KV writes, D1 or Typesense operations. Sorting happens once at module initialisation; pages use the existing static archive. Drafts remain in version control. No image downloader or paid service introduced.
