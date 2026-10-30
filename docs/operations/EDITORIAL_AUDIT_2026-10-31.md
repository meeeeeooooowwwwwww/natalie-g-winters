# Natalie G. Winters site and content verification — 31 October 2026 (NZ time)

## Editorial standard
The website is an independent archive about a journalist and broadcaster. It is not a
White House or US government website. Separate **original publisher wording**,
**reported claims**, **context**, **broadcast date**, **upload date**, and **verified embed**.
Never label an archived video "latest" simply because it is first in a static array.

## Source readback
- Public site: https://nataliegwinters.com/articles
- Original archive: https://nataliegwinters.substack.com/archive
- On verification, both showed **Inside the Left’s Election Backchannel—and the Talking
  Points It Didn’t Want Public** as the newest article, dated **30 October 2026**.
  Earlier entries on 29, 28, 27 and 26 October were likewise present.
  **No direct KV backfill was warranted**, and none was performed during this review.
  Keep runtime publishing tied to canonical sources rather than a hard-coded snapshot.
- War Room publisher's Rumble playlist: https://rumble.com/playlists/FtvHjVmJo7c
  Listed **Natalie Winters Exposes Obama Alumni Group’s Election-Censorship Operation
  and Left-Wing Censorship Network’s Plan to Shield Itself from U.S. Political Changes**,
  with an **aired-on date of 26 October 2026** and **27:19** duration. A precise
  standalone player/embed ID was *not* verified, so we link to the publisher's
  playlist, not an invented iframe address.
- The Glenn Beck Program official iHeart episode, **29 October 2026**:
  https://www.iheart.com/podcast/175-the-glenn-beck-program-23014384/episode/best-of-the-program-guest-348722739/
  This is a verified **podcast/broadcast appearance**, not necessarily a Rumble clip.
- Newest video in the existing hard-coded directly embedded archive is dated
  **7 October 2026** (Rumble). The home page now embeds that actual curated
  archive record rather than an unrelated hard-coded video ID.
- The supplied Rumble search URL https://rumble.com/search/all?q=natalie%20winters
  could not be loaded in the available research browser. A search page is a
  discovery aid, not proof that every result names the correct Natalie Winters.

## Repository corrections
- Source-first footer, accurate media labels and clearly independent attribution.
- Homepage video uses the video-data record's exact player and original source link.
- Recent verified War Room and Glenn Beck appearances are linked without fabricating an embed.
- Removed a hard-coded global sitemap lastmod date. Dated video entries use their own
  known date; undated pages omit unverifiable lastmod.
- Archived one-off October recovery workflows from the active Actions directory.
  Historical commits preserve those scripts and procedures.
- The completed October article-recovery code is no longer executed on status reads
  or scheduled checks. The normal scheduled and request-triggered updater remains.
- Kept the legacy satirical /verdict page available but marked noindex and removed
  it from the professional sitemap.
- Added editorial integrity tests and source-only CI.

## Outstanding live verification
- Complete production release and run smoke tests with proper Cloudflare credentials.
- Confirm source image URL and HTTP status for each newly displayed article.
- Confirm mobile layout, keyboard navigation and video iframe playback in a real browser.
- Confirm Gmail -> Cloudflare Email Routing -> Worker actually receives the next
  genuine newsletter notification. Normal website deployment does not establish this.
- Audit current Rumble search results using an interactive browser and update the
  structured video archive only for entries with a verified title, original URL,
  publication/broadcast date and usable embed ID.
