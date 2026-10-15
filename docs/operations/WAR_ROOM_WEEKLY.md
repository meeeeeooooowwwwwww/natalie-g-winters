# War Room video catch-up — 15 October 2026

## Status

Partial preparation, not a completed import. All 57 existing video records and URLs are preserved. Homepage cards and video archive now select newest dated entries; War Room page has a newest-first section. Main H1/title use Natalie G. Winters.

12 candidate uploads have original short article drafts in `war-room-candidates.json`. These are NOT imported by the site and are not published. Source discovery used indexed Rumble publisher listings. Direct channel/page access encountered Cloudflare human verification. Embeds, thumbnails, full content and completeness cannot currently be verified. The two rural-demographics uploads may be duplicates and need comparison. Indexed premium notices may be stale; verify current access without bypassing restrictions.

## Weekly check

A ChatGPT automation named Natalie War Room videos is enabled for Friday morning, approximately 08:00 Pacific/Auckland, starting 23 October 2026. It checks title matches, compares canonical Rumble IDs, verifies metadata and source content, writes original articles, preserves old URLs, tests and uses the established exact-SHA deployment path. It reports source/access failures explicitly. This is an agent-assisted scheduled check, not a running server-side scraper.

Do not treat a failed fetch or empty search index as proof there are no new videos. Use overlapping discovery windows and compare against the complete stored archive. Keep article claims attributed; do not invent quotations, transcripts, dates or embed IDs. Never delete older pages to make room for new ones.

## Remaining work

Obtain accessible direct publisher/video metadata, resolve duplicate-topic uploads, complete the channel inventory, finalise each article against its source, add verified video/copy/thumbnail records and deploy. Candidate air dates are publisher-listed dates, not independently verified upload timestamps. Preserve that distinction when sorting.

## Deployment

Existing central path: grideater `.github/workflows/external-static-site-deploy.yml`, request on `external-site-deploy-control` branch, exact site commit SHA, main trigger file. Follow that repository's operational instructions before changing its control files. Do not reuse the unrelated natalie-article-recovery operation, which also changes email routing.

## Cost

No new Worker cron, upstream calls, KV writes, D1 or Typesense operations. Sorting happens once at module initialisation; pages use the existing static archive. Drafts remain in version control. No image downloader or paid service introduced.
