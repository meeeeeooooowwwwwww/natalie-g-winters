import { SITE } from "./config.js";
import { PROFILE_DEPTH_PATHS } from "./pages/profile-deep-dives.js";
import { VIDEOS } from "./video-data.js";
import { getVideoThumbnail } from "./video-thumbnails.js";

// Only canonical, indexable pages; /verdict is intentionally noindex.
export const PRIMARY_PATHS = Object.freeze([
  "/",
  "/about",
  "/career",
  "/reporting",
  "/white-house",
  "/war-room",
  "/videos",
  "/interviews",
  "/articles",
  "/china",
  ...PROFILE_DEPTH_PATHS,
  "/photos",
]);

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function videoTag(video) {
  // These publisher thumbnails were recorded from Rumble oEmbed. Do not
  // invent publication timestamps or use a generic site portrait as a thumb.
  const thumbnail = getVideoThumbnail(video.slug);
  if (!thumbnail || !video.embedUrl || !video.title || !video.summary) return "";

  return `<video:video>
      <video:thumbnail_loc>${xmlEscape(thumbnail)}</video:thumbnail_loc>
      <video:title>${xmlEscape(video.title)}</video:title>
      <video:description>${xmlEscape(video.summary.slice(0, 2048))}</video:description>
      <video:player_loc>${xmlEscape(video.embedUrl)}</video:player_loc>
    </video:video>`;
}

export function renderSitemapXml() {
  const mainEntries = PRIMARY_PATHS.map((path) =>
    `  <url><loc>${xmlEscape(SITE.domain + path)}</loc></url>`
  );
  const videoEntries = VIDEOS.map((video) => {
    const loc = `${SITE.domain}/videos/${video.slug}`;
    const metadata = videoTag(video);
    return `  <url><loc>${xmlEscape(loc)}</loc>${metadata ? "\n    " + metadata + "\n  " : ""}</url>`;
  });

  // No inaccurate lastmod values: a broadcast date is NOT the time the
  // website's watch page changed. Google ignores priority/changefreq.
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${[...mainEntries, ...videoEntries].join("\n")}
</urlset>
`;
}
