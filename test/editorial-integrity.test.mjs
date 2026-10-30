import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SITE } from "../src/config.js";
import { VIDEOS } from "../src/video-data.js";
import { renderHomePage } from "../src/pages/home.js";
import { renderVideosPage } from "../src/pages/videos.js";
import { renderInterviewsPage } from "../src/pages/interviews.js";
import { renderFooter } from "../src/layout.js";

const home = renderHomePage([]);
const videos = renderVideosPage([]);
const interviews = renderInterviewsPage([]);
const footer = renderFooter();
const featured = VIDEOS[0];

assert.ok(featured, "A dated archive video is required");
assert.ok(home.includes(featured.embedUrl), "Homepage must embed a source-linked archive video");
assert.ok(home.includes(featured.rumbleUrl), "Homepage must link to the original recording");
assert.ok(home.includes(featured.sourceTitle), "Homepage iframe must identify the programme");
assert.ok(!home.includes("v7eztbo"), "Unrelated Rumble video must never return");
assert.ok(!JSON.stringify(SITE).includes("v7eztbo"), "Configuration must not restore unrelated video");
assert.ok(home.includes("WHITE HOUSE COVERAGE"), "White House reference should describe the coverage");
assert.ok(home.includes("Selected video appearances"), "Curated archive must not imply a live feed");

const interview = "https://www.iheart.com/podcast/175-the-glenn-beck-program-23014384/episode/best-of-the-program-guest-348722739/";
for (const page of [home, videos, interviews]) {
  assert.ok(page.includes(interview), "The verified 29 October interview must be easy to find");
}
const rumblePlaylist = "https://rumble.com/playlists/FtvHjVmJo7c";
for (const page of [home, videos]) {
  assert.ok(page.includes(rumblePlaylist), "The 26 October appearance must link to its original publisher playlist");
}
assert.match(footer, /Not an official White House or United States government website/);
assert.doesNotMatch(footer, /magnificently excessive|Yoga may be involved/);

const workerSource = readFileSync(new URL("../src/worker.js", import.meta.url), "utf8");
assert.doesNotMatch(workerSource, /SITEMAP_LASTMOD\s*=/, "Global stale sitemap date must not be restored");
assert.match(workerSource, /lastmod:.*video\.date/);
console.log("editorial integrity regression checks passed");
