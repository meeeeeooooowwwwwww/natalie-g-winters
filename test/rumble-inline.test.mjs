import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { RECENT_RUMBLE_VIDEOS, renderRecentRumbleCards, NEW_RUMBLE_LISTINGS, renderNewRumbleListings } from "../src/recent-rumble.js";
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
assert.ok(home.includes('src="https://www.youtube-nocookie.com/embed/9oFj54nkhgg"'), "Hero must embed the newly requested YouTube video");
assert.ok(home.includes('class="home-video-frame"'), "Hero must retain responsive aspect-ratio wrapper");
assert.ok(home.includes("Our Exciting Jem &amp; The Holograms Coverage"), "Hero must show the new coverage heading");
assert.ok(home.includes("Tune in tomorrow for the next exciting episode No.4! xD"), "Hero must show the exact episode 4 teaser");
assert.ok(!home.includes('OPEN ON YOUTUBE'), "Hero header must not have the external YouTube link");
assert.ok(!home.includes('<strong>Featured video</strong>'), "Hero bottom must not show the obsolete label");
assert.ok(!home.includes('href="https://youtu.be/2AwmwORrepc"'), "Old video link must not return");
assert.ok(assets.includes(".home-video-frame iframe") && assets.includes("flex:1 1 0;") && assets.includes("align-items:stretch;"), "Desktop landscape player must stretch in line with the left intro");
assert.ok(assets.includes(".home-video-frame{flex:none;min-height:0;aspect-ratio:16/9}"), "Stacked mobile player must retain natural widescreen aspect ratio");
assert.ok(home.includes('class="home-video-panel"') && !home.includes("home-video-panel--short"), "Remove old Shorts-only portrait layout");
assert.ok(!home.includes("autoplay=1"), "Hero must not autoplay");
assert.ok(!home.includes("youtube-nocookie.com/embed/1c7XccFwJrQ"), "Old YouTube hero must be removed");
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


assert.equal(NEW_RUMBLE_LISTINGS.length, 5, "Five distinct screenshot-supported November clips");
assert.equal(new Set(NEW_RUMBLE_LISTINGS.map(x => x.id)).size, 5);
assert.equal(new Set(NEW_RUMBLE_LISTINGS.map(x => x.embedUrl)).size, 5, "Each clip has a unique verified embed");
assert.equal(new Set(NEW_RUMBLE_LISTINGS.map(x => x.url)).size, 5, "Each clip has a unique publisher permalink");
for (const clip of NEW_RUMBLE_LISTINGS) {
  assert.match(clip.url, /^https:\/\/rumble\.com\/v[0-9a-z]+-[^"]+\.html$/);
  assert.match(clip.embedUrl, /^https:\/\/rumble\.com\/embed\/v[0-9a-z]+\/$/);
  assert.match(clip.thumbnailUrl, /^https:\/\/hugh\.cdn\.rumble\.cloud\/video\/[^"]+\.jpg$/);
  assert.ok(videos.includes(clip.embedUrl), "Video page embeds exact clip: " + clip.id);
  assert.ok(videos.includes(clip.thumbnailUrl), "Video page includes original thumbnail: " + clip.id);
  assert.ok(videos.includes(clip.url), "Video page includes canonical source: " + clip.id);
}
assert.ok(renderNewRumbleListings(NEW_RUMBLE_LISTINGS).includes('data-rumble-embed='), "New November clips use the existing click-to-play handler");
assert.ok(!renderNewRumbleListings(NEW_RUMBLE_LISTINGS).includes('class="recent-rumble-lookup"'), "No publisher-list placeholder cards");
assert.ok(NEW_RUMBLE_LISTINGS.slice(0,4).every(x => home.includes(x.title)), "Homepage lists new November appearances");
assert.ok(NEW_RUMBLE_LISTINGS.every(x => videos.includes(x.title)), "Video archive lists all five new appearances");

console.log("Rumble inline playback, verified legacy clips, and native November players: PASS");
