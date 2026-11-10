# Natalie Substack cover-image reliability

Updated 10 November 2026 after repeated reports of incorrect article images.

## Source of truth

- Match each card to its **canonical /p/<slug> article URL**.
- Only a Substack **per-post** archive API `cover_image` is automatically considered a verified publication cover (rank 500); the October 2026 three-item verified override map remains secondary.
- Do not substitute `social_image` (may be a publication default), newsletter `topImage`, an RSS body image, or Jina's first image from an article for that cover.
- RSS continues to supply titles/dates. A new email notice can introduce a report with an intentionally image-free editorial title card until its official cover appears.
- The homepage and /articles read the same canonical KV store. No independent manually maintained image maps should be created for these two routes.

## Protections

1. Normalize incoming covers by canonical post URL. Stored rank 450 social images and older reader/body ranks 50, 80, 100, and 120 are suppressed on read.
2. After merging sources and old cache, reject any image URL assigned to **more than one distinct canonical article URL**. This is deliberately conservative: fall back to the explicit editorial title card instead of labeling an unrelated image as an article's cover. If Substack deliberately reuses the same artwork for two posts, treat those as image-free pending a specific editorial decision.
3. `imageVersion()` now derives a fingerprint from the complete original image URL and a `v3` route prefix. An edited cover cannot continue using an old same-filename 30-day Cloudflare cache entry.
4. The /media/substack proxy accepts only successful `image/jpeg`, `image/png`, `image/webp`, `image/avif`, or `image/gif` responses. Do not cache 200-OK HTML error pages as images. Max image response cache duration is one day.
5. Keep the bounded, rate-limit-aware RSS/archive/reader discovery and protected email routing unchanged.

## Troubleshooting the next recurrence

1. On the live homepage and /articles, note the exact title and canonical Substack /p/ URL of affected cards, and inspect `/api/status` if authorized. The public status may be blocked by the Cloudflare edge and should not be guessed.
2. Inspect that article's image on Substack's **archive page**, not the first image inside the article. Compare the exact image source path with the site card and its `/media/substack/<id>/<imageVersion>` URL. A blank editorial card is intentional when no verified cover exists.
3. Verify `src/substack.js` image ranking, image key versioning, and `src/worker.js` image proxy response type. Run `npm run check && npm test` and the Worker dry-run, including `test/substack.test.mjs`. Inspect each new article: URL/title/cover association must stay together through RSS, archive, KV merge, and image proxy.
4. Record findings and fix source-level logic. Do not hand-patch one screenshot or guess an image for a post. Only after tests pass merge, then run the guarded Natalie-only production deploy from main with `confirm=DEPLOY`, `manage_email_routing=false`. Verify real pages after release.

## Known limitations

- The Substack archive JSON endpoint can return 429/403; a new article may temporarily show the designed title card until a verified per-post cover is available.
- A passing GitHub check is not a verified Cloudflare production deploy, and the read-only tools cannot force remote Cloudflare KV records to refresh.
- The duplicate-image rule protects against false associations but also suppresses intentionally reused publication artwork pending manual verification.

## Root-cause investigation, 10 November 2026

The previous image-cache patch was **deployed** successfully (GitHub Actions run
`42775566874`, commit `7778fef`), yet the first article image was still
missing. A read-only CI audit against the live Worker and the publisher's own
archive established the following:

- The live `/api/status` returned `pollingHealth=error`,
  `lastCheckResult=error`, `consecutiveFailures=3`, with Substack RSS
  HTTP 429 and the reader backed archive failing.
- The old reader request contained `?sort=new&search=&offset=0&limit=10`.
  Direct diagnosis found `offset=0` returned HTTP 400
  (`offset: Invalid value`); direct Substack access also returned HTTP 403.
- The corrected reader URL `https://r.jina.ai/http://nataliegwinters.substack.com/api/v1/archive?sort=new&limit=25`
  returned HTTP 200 and 25 source records with individual `cover_image` URLs.
- All 25 live article links were matched by slug to those 25 publisher records:
  **24/25 referenced the same original cover filenames**; the newest
  `democrats-censorship-bill-would-punish` had no local cover even though its
  official source image was
  `346a280e-6e96-4101-8409-14741ff74a57_1672x941.png`.
- Six live image proxy responses were checked against the matching optimised
  Substack CDN response: each returned HTTP 200 image/jpeg, equal byte lengths
  and identical SHA-256 digests. This rules out proxy content substitution
  for those six tested images; it does **not** prove every pixel the user sees.

**Repair:** Fetch the reader-backed first page without invalid `offset`,
prefer it ahead of direct 429-prone sources, retrieve all 25 canonical covers
in one response, and bump the stored updater check-state key once (v8 to v9)
to clear the failure cooldown only for this source recovery. An explicitly
verified Nov 9 cover serves as an immediate read-time repair even before the
next successful fetch. After this release, preserve v9 across deployments.

For future audits use `node tools/audit-live-covers.mjs` on a network-enabled
runner, compare each article's **slug + exact cover file**, and optionally
hash-check the live `/media/substack/...` image against Substack's optimised
source bytes. The previous source-focused tests did not check real production
freshness or the invalid upstream query, which is why they passed while the
site remained faulty.
