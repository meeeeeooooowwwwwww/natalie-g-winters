import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SITE } from "../src/config.js";
import { VIDEOS } from "../src/video-data.js";
import { RECENT_RUMBLE_VIDEOS } from "../src/recent-rumble.js";
import { GLENN_BECK_EPISODE_URL, GLENN_BECK_EMBED_URL, renderGlennBeckCompactPlayer } from "../src/iheart-player.js";
import { renderHomePage } from "../src/pages/home.js";
import { renderVideosPage } from "../src/pages/videos.js";
import { renderArticlesPage } from "../src/pages/articles.js";
import { renderInterviewsPage } from "../src/pages/interviews.js";
import { PROFILE_DEPTH_PATHS, PROFILE_DEPTH_CONTENT, renderProfileDepthPage } from "../src/pages/profile-deep-dives.js";
import { PHOTO_ARCHIVE_ITEMS, renderPhotoArchivePage } from "../src/pages/photo-archive.js";
import { renderAboutPage } from "../src/pages/about.js";
import { renderArticleCards, renderFooter } from "../src/layout.js";

const home = renderHomePage([]);
const videos = renderVideosPage([]);
const interviews = renderInterviewsPage([]);
const about = renderAboutPage([]);
const photos = renderPhotoArchivePage([]);
assert.deepEqual([...PROFILE_DEPTH_PATHS].sort(), ["/national-pulse-history","/shes-so-right","/firing-line-2026"].sort());
for (const path of PROFILE_DEPTH_PATHS) {
  const entry = PROFILE_DEPTH_CONTENT[path];
  assert.ok(entry.sections.length >= 4, "Profile depth needs four substantive sections");
  assert.ok(entry.sources.length >= 2, "Profile needs original sources");
  const html = renderProfileDepthPage(path, []);
  assert.ok(html.includes('rel="canonical" href="https://nataliegwinters.com'+path+'"'));
  assert.ok(html.includes("Original references"));
  assert.ok(!/imdb\.com/i.test(html), "No IMDb links");
}
assert.equal(PHOTO_ARCHIVE_ITEMS.length, 4);
assert.ok(photos.includes('Natalie G. Winters: Photo Archive'));
assert.ok(about.includes('On camera and at public events') && about.includes('href="/photos"'));
for (const photo of PHOTO_ARCHIVE_ITEMS) {
  assert.ok(photo.src.startsWith("https://thumb.wikimedia.org/"));
  assert.ok(photo.alt.length > 25 && photo.caption.length > 30);
  assert.ok(photo.source.startsWith("https://commons.wikimedia.org/wiki/File:"));
  assert.ok(photo.licenseUrl.startsWith("https://creativecommons.org/licenses/"));
  assert.ok(photos.includes(photo.credit));
}
assert.ok(interviews.includes('href="/firing-line-2026"'));
const depthWorker = readFileSync(new URL("../src/worker.js", import.meta.url), "utf8");
assert.match(depthWorker, /\.\.\.PROFILE_DEPTH_PATHS/);
assert.match(depthWorker, /"\/photos"/);

const footer = renderFooter();
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
