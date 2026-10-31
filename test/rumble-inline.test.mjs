import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { RECENT_RUMBLE_VIDEOS, renderRecentRumbleCards } from "../src/recent-rumble.js";
import { renderHomePage } from "../src/pages/home.js";
import { renderVideosPage } from "../src/pages/videos.js";
import { renderWhiteHousePage } from "../src/pages/white-house.js";

const home = renderHomePage([]);
const videos = renderVideosPage([]);
const poster = renderRecentRumbleCards();
const assets = readFileSync(new URL("../public/assets/editorial-substack.css", import.meta.url), "utf8");
const script = readFileSync(new URL("../public/assets/rumble-player.js", import.meta.url), "utf8");

assert.equal(RECENT_RUMBLE_VIDEOS.length, 5);
assert.equal(new Set(RECENT_RUMBLE_VIDEOS.map(x => x.embedUrl)).size, 5);
for (const video of RECENT_RUMBLE_VIDEOS) {
  assert.match(video.embedUrl, /^https:\/\/rumble\.com\/embed\/[a-z0-9]+\/$/);
  assert.match(video.thumbnailUrl, /^https:\/\/hugh\.cdn\.rumble\.cloud\/video\/[^"]+\.jpg$/);
  assert.match(video.url, /^https:\/\/rumble\.com\/v[0-9a-z]+-[^"]+\.html$/);
  assert.ok(videos.includes(video.embedUrl), "Video page uses official embed: " + video.id);
  assert.ok(videos.includes(video.thumbnailUrl), "Video page shows native Rumble thumbnail: " + video.id);
}
for (const video of RECENT_RUMBLE_VIDEOS.slice(0,4)) {
  assert.ok(home.includes(video.embedUrl), "Homepage embeds one of four current clips");
  assert.ok(home.includes(video.thumbnailUrl), "Homepage uses verified publisher thumbnail");
}
assert.ok(home.includes('src="https://www.youtube-nocookie.com/embed/1c7XccFwJrQ?rel=0"'), "Hero must embed the requested YouTube video");
assert.ok(home.includes('href="https://www.youtube.com/watch?v=1c7XccFwJrQ"'), "Hero must link to the same source video");
assert.ok(home.includes('class="home-video-frame"'), "Hero must retain responsive aspect-ratio wrapper");
assert.ok(home.includes('Behind the scenes with Natalie Winters'), "Hero needs the requested playful caption");
assert.ok(home.includes('A completely unofficial look behind the curtain'), "Satirical hero must remain clearly unofficial");
assert.ok(assets.includes(".home-video-frame iframe") && assets.includes("aspect-ratio:16/9"), "Hero iframe must remain responsive");
assert.ok(!home.includes("autoplay=1"), "Hero must not autoplay");
assert.ok(home.includes("/assets/rumble-player.js"), "Player handler must load on homepage");
assert.ok(poster.includes("<button") && poster.includes('data-rumble-embed="'));
assert.ok(!poster.includes('class="recent-rumble-link"'), "Thumbnail must no longer be an external link");
assert.ok(poster.includes("ORIGINAL ON RUMBLE"), "Separate external source link remains available");
assert.ok(assets.includes(".recent-rumble-thumbnail") && assets.includes("object-fit:cover"));
const mobile = assets.slice(assets.indexOf("Mobile layout and verified"));
assert.ok(mobile.includes(".article-grid .article-link{display:flex!important;flex-direction:column!important"), "Mobile cards must stack image above copy");
assert.ok(mobile.includes(".article-grid .article-image{width:100%!important;height:auto!important"), "Mobile images have full width, natural aspect ratio");
assert.ok(mobile.includes(".archive-side-card{display:flex!important;flex-direction:column!important"), "Article archive side cards must stack on small screens");
assert.ok(mobile.includes(".recent-rumble-grid{grid-template-columns:minmax(0,1fr)}"), "Rumble mobile cards are single-column");

// Verify click-to-load behaviour without relying on a live browser or guessing IDs.
let handler;
let inserted;
const chosen = RECENT_RUMBLE_VIDEOS[0];
const button = {
  getAttribute(name) {
    return name === "data-rumble-embed" ? chosen.embedUrl :
      name === "data-rumble-title" ? chosen.sourceTitle : null;
  },
  replaceWith(node) { inserted = node; }
};
const document = {
  addEventListener(type, cb) { assert.equal(type, "click"); handler = cb; },
  createElement(tag) {
    assert.equal(tag, "iframe");
    return {
      attributes: {},
      setAttribute(name,value) {this.attributes[name] = value; }
    };
  }
};
vm.runInNewContext(script, { document, URL });
assert.equal(typeof handler, "function");
handler({ target: { closest: () => button } });
assert.equal(inserted.src, chosen.embedUrl, "The play button must load verified Rumble embed, not permalink");
assert.equal(inserted.className, "recent-rumble-frame");
assert.equal(inserted.attributes.loading, "eager");
assert.equal(inserted.attributes.allowfullscreen, "");
assert.ok(!inserted.src.includes("autoplay"), "Do not autoplay before visitor uses native player");

const whiteHouse = renderWhiteHousePage([]);
assert.ok(whiteHouse.includes("ORIGINAL BROADCAST · RUMBLE PREMIUM"), "White House video must show the publisher restriction");
assert.ok(whiteHouse.includes("https://hugh.cdn.rumble.cloud/video/fwe2/87/s8/6/U/H/6/d/UH6dx.qR4e.1.jpg"), "White House archive must use the publisher's real thumbnail");
assert.ok(whiteHouse.includes("https://rumble.com/embed/v6c48kg/?pub=4"), "White House archive retains the original video source");
assert.ok(whiteHouse.includes("https://warroom.org/bannons-warroom-show-clip-roundup-28-jan-25-am/"), "White House archive retains contemporary coverage");
assert.ok(!whiteHouse.includes('<iframe src="https://rumble.com/embed/v6c48kg/'), "Do not display a dead Rumble Premium iframe as a playable video");
assert.ok(!whiteHouse.includes("▶ PLAY VIDEO"), "Restricted videos must never advertise public playback");

console.log("Rumble inline playback, native thumbnails and mobile article layouts: PASS");
