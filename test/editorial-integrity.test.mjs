import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SITE } from "../src/config.js";
import { VIDEOS } from "../src/video-data.js";
import { RECENT_RUMBLE_VIDEOS } from "../src/recent-rumble.js";
import { GLENN_BECK_EPISODE_URL, GLENN_BECK_EMBED_URL, renderGlennBeckCompactPlayer } from "../src/iheart-player.js";
import { renderHomePage } from "../src/pages/home.js";
import { renderVideosPage } from "../src/pages/videos.js";
import { renderAboutPage } from "../src/pages/about.js";
import { renderArticlesPage } from "../src/pages/articles.js";
import { renderInterviewsPage } from "../src/pages/interviews.js";
import { PROFILE_DEPTH_CONTENT, PROFILE_DEPTH_PATHS, renderProfileDepthPage } from "../src/pages/profile-deep-dives.js";
import { PHOTO_ARCHIVE_ITEMS, renderPhotoArchivePage } from "../src/pages/photo-archive.js";
import { renderArticleCards, renderFooter } from "../src/layout.js";

const home = renderHomePage([]);
const videos = renderVideosPage([]);
const about = renderAboutPage([]);
const interviews = renderInterviewsPage([]);
const footer = renderFooter();

const photos = renderPhotoArchivePage([]);
assert.deepEqual([...PROFILE_DEPTH_PATHS].sort(), ["/firing-line-2026", "/national-pulse-history", "/shes-so-right"].sort());
for (const path of PROFILE_DEPTH_PATHS) {
  const entry = PROFILE_DEPTH_CONTENT[path];
  assert.ok(entry.sections.length >= 4, "No thin standalone profile pages");
  assert.ok(entry.sources.length >= 2, "Each profile needs original references");
  const html = renderProfileDepthPage(path, []);
  assert.ok(html.includes('rel="canonical" href="https://nataliegwinters.com' + path + '"'));
  assert.ok(html.includes("Original references") && html.includes('class="source-link"'));
  assert.ok(!html.includes("imdb.com"));
}
assert.equal(PHOTO_ARCHIVE_ITEMS.length, 9, "Preserve four existing archive photographs and add five distinct publisher images");
assert.match(photos, /class="photo-grid"/);
assert.match(photos, /id="photo-viewer"/);
assert.match(photos, /\/assets\/photo-gallery\.css/);
assert.match(photos, /\/assets\/photo-gallery\.js/);
assert.match(photos, /ImageGallery/);
assert.ok(about.includes("Photographs through the years") && about.includes('class="photo-preview-grid"'));
assert.ok(about.includes('id="photo-viewer"'));
assert.ok(about.includes('id="birth-details-title"'), "Birthday section must survive");
assert.ok(about.lastIndexOf('id="birth-details-title"') > about.indexOf("In-depth profiles"), "Keep birth details at bottom");
assert.ok(!home.includes('id="photo-viewer"'), "Only photo-enabled pages load the lightbox");
assert.ok(footer.includes('href="/photos"'), "Photo archive discoverable from footer");
const allowedPhotoHosts = new Set(["upload.wikimedia.org", "www.telegraph.co.uk", "img.i-scmp.com", "www.claremont.org", "static01.nyt.com", "preview.redd.it"]);
assert.equal(new Set(PHOTO_ARCHIVE_ITEMS.map(photo => photo.full)).size, 9, "No duplicated full-size images");
for (const pic of PHOTO_ARCHIVE_ITEMS) {
  assert.ok(allowedPhotoHosts.has(new URL(pic.src).hostname), "Only selected image hosts permitted");
  assert.ok(allowedPhotoHosts.has(new URL(pic.full).hostname), "Only selected originals permitted");
  assert.ok(pic.caption.length >= 35 && pic.alt.length >= 30 && pic.credit.length >= 5);
  assert.equal(new URL(pic.source).protocol, "https:", "Publisher sources must use HTTPS");
  if (pic.licenseUrl) assert.ok(pic.licenseUrl.startsWith("https://creativecommons.org/licenses/"));
  assert.ok(photos.includes(pic.credit));
  assert.ok(photos.includes(pic.full.replace(/&/g, "&amp;")), "Every original must be linked");
  assert.ok(photos.includes(pic.source.replace(/&/g, "&amp;")), "Original publisher source must be linked");
}
assert.ok(PHOTO_ARCHIVE_ITEMS[0].title.includes("Claremont"));
assert.ok(PHOTO_ARCHIVE_ITEMS[1].title.includes("South China Morning Post"));
assert.ok(PHOTO_ARCHIVE_ITEMS.some(p => p.title.includes("New York Times")));
assert.ok(PHOTO_ARCHIVE_ITEMS.some(p => p.title.includes("Telegraph")));
assert.ok(PHOTO_ARCHIVE_ITEMS.some(p => p.title.includes("Reddit")));
assert.ok(PHOTO_ARCHIVE_ITEMS.some(p => p.source.includes("File:Natalie_Winters_(52985166073).jpg")), "Use original Wikimedia photograph instead of cropped duplicate");
assert.ok(interviews.includes('href="/firing-line-2026"'));
const galleryJs = readFileSync(new URL("../public/assets/photo-gallery.js", import.meta.url), "utf8");
const galleryCss = readFileSync(new URL("../public/assets/photo-gallery.css", import.meta.url), "utf8");
assert.ok(galleryJs.length < 1700 && galleryCss.length < 3500, "Viewer must stay lightweight");
assert.match(galleryJs, /dialog\.showModal\(\)/);
assert.match(galleryJs, /dialog\.close\(\)/);
assert.match(galleryJs, /removeAttribute\("src"\)/, "Full image removed on close");
assert.match(galleryCss, /max-width:640px/, "Mobile image layout required");
const sitemapWorker = readFileSync(new URL("../src/worker.js", import.meta.url), "utf8");
assert.match(sitemapWorker, /\.{3}PROFILE_DEPTH_PATHS/);
assert.match(sitemapWorker, /"\/photos"/);

assert.match(about, /<time datetime="2001-02-24"><strong>24 February 2001<\/strong><\/time>/, "About page should show the requested birthday");
assert.match(about, /Los Angeles, California, USA/, "About page should show birthplace");
assert.ok(about.lastIndexOf('id="birth-details-title"') > about.indexOf('Explore Natalie G. Winters in depth'), "Birth details should remain at the bottom of About");
assert.ok(!about.includes("imdb.com"), "Do not link to competing biography websites");
assert.match(about, /"birthDate":"2001-02-24"/, "Person structured data should share the birthday");
assert.match(about, /"birthPlace":\{"@type":"Place","name":"Los Angeles, California, USA"\}/, "Person structured data should share the birthplace");
const featured = VIDEOS[0];

assert.ok(featured, "A dated video archive must remain available");
assert.equal(RECENT_RUMBLE_VIDEOS.length, 5, "Five newer Rumble source videos expected");
assert.equal(new Set(RECENT_RUMBLE_VIDEOS.map(v => v.url)).size, 5, "No duplicate sources");
for (const [index, video] of RECENT_RUMBLE_VIDEOS.entries()) {
  assert.match(video.url, /^https:\/\/rumble\.com\/v[0-9a-z]+-[a-z0-9-]+\.html$/);
  assert.ok(video.title.length >= 20 && video.sourceTitle.length >= 30);
  assert.ok(home.includes(video.url) === (index < 4), "Homepage should feature the four newest distinct topics");
  assert.ok(videos.includes(video.url), "Videos page must contain each current source video");
}
assert.ok(home.includes(RECENT_RUMBLE_VIDEOS[0].title), "Homepage recent appearance cards must retain the latest Rumble video");
assert.ok(home.includes('Behind the scenes with Natalie Winters (just for fun)') && home.includes('A completely unofficial look behind the curtain'), "Non-editorial hero is explicitly labelled as an unofficial just-for-fun feature");
assert.ok(!home.includes("RECENT RUMBLE BROADCAST · LATE OCTOBER 2026"), "Hero must not mislabel music as a Natalie broadcast");
assert.ok(home.includes("Recent video appearances"), "Homepage must show current video heading");
assert.ok(!home.includes(featured.embedUrl), "An October 7 clip must not be featured on homepage");
assert.ok(videos.includes(featured.embedUrl), "Historic playable clips must remain on videos archive");
assert.ok(!home.includes("v7eztbo"), "Unrelated Rumble video must never return");
assert.ok(!JSON.stringify(SITE).includes("v7eztbo"), "Configuration must not restore unrelated video");
assert.ok(home.includes('aria-label="Read Natalie G. Winters White House reporting"') && home.includes('alt="The White House official wordmark"'), "White House graphic must remain accessible and link to reporting");

for (const page of [home, videos, interviews]) {
  assert.ok(page.includes(GLENN_BECK_EPISODE_URL), "The verified 29 October interview URL must be easy to find");
  assert.ok(page.includes(GLENN_BECK_EMBED_URL), "Exact Natalie episode iHeart iframe must be visible");
}
const player = renderGlennBeckCompactPlayer();
assert.match(player, /height="120"/, "Player should be compact");
assert.doesNotMatch(player, /allow="autoplay"|autoplay=true|autoplay=1/i, "Audio must never autoplay");

const noCover = {
  id: "missing-cover",
  title: "Inside the Left’s Election Backchannel—and the Talking Points It Didn’t Want Public",
  url: "https://nataliegwinters.substack.com/p/inside-the-lefts-election-backchanneland",
  image: "", date: "2026-10-30T10:00:00Z"
};
const homeCards = renderArticleCards([noCover]);
const archive = renderArticlesPage([noCover]);
for (const output of [homeCards, archive]) {
  assert.ok(output.includes("editorial-article-cover"), "Missing-cover article must have designed title-card fallback");
  assert.ok(output.includes("ORIGINAL REPORT ON SUBSTACK"), "Do not imply a publisher-supplied photograph exists");
  assert.ok(output.includes(noCover.title), "Original article title must survive");
}
assert.doesNotMatch(homeCards, /class="article-image article-placeholder"><span>NATALIE G. WINTERS<\/span><\/div>/);
assert.match(footer, /Not an official White House or United States government website/);
assert.doesNotMatch(footer, /magnificently excessive|Yoga may be involved/);

const workerSource = readFileSync(new URL("../src/worker.js", import.meta.url), "utf8");
assert.doesNotMatch(workerSource, /SITEMAP_LASTMOD\s*=/, "Global stale sitemap date must not be restored");
assert.match(workerSource, /lastmod:.*video\.date/);
console.log("editorial integrity checks passed: recent Rumble videos and article covers");
