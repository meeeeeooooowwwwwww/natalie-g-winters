import assert from "node:assert/strict";
import { VIDEOS } from "../src/video-data.js";
import { VIDEO_COPY, getVideoCopy } from "../src/video-copy.js";

const videoSlugs = new Set(VIDEOS.map((video) => video.slug));
const copySlugs = Object.keys(VIDEO_COPY);

assert.equal(copySlugs.length, VIDEOS.length, `Expected ${VIDEOS.length} unique copy records, found ${copySlugs.length}`);

for (const slug of copySlugs) {
  assert.ok(videoSlugs.has(slug), `Copy exists for unknown video slug: ${slug}`);
}

const whyBlocks = [];
const natalieBlocks = [];

for (const video of VIDEOS) {
  const copy = getVideoCopy(video.slug);
  assert.ok(copy, `Missing unique copy for ${video.slug}`);
  assert.ok(copy.why.length >= 180, `Why-it-matters copy is too short for ${video.slug}`);
  assert.ok(copy.natalie.length >= 120, `Natalie-specific copy is too short for ${video.slug}`);

  const namedSummary = /^Winters\b/.test(video.summary)
    ? video.summary.replace(/^Winters\b/, "Natalie Winters")
    : `Natalie Winters: ${video.summary}`;
  const renderedMainCopy = `${namedSummary} ${video.angle} ${copy.why} ${copy.natalie}`;
  const nameMentions = renderedMainCopy.match(/Natalie Winters/g) || [];
  assert.ok(nameMentions.length >= 3, `Expected at least three natural Natalie Winters mentions in rendered main copy for ${video.slug}`);

  assert.ok(!renderedMainCopy.includes("The recurring fight in Natalie Winters' reporting is bigger than any one clip"), `Old duplicated boilerplate survived for ${video.slug}`);
  assert.ok(!renderedMainCopy.includes("Then there is the charming imbalance in the skill tree"), `Old duplicated boilerplate survived for ${video.slug}`);

  whyBlocks.push(copy.why);
  natalieBlocks.push(copy.natalie);
}

assert.equal(new Set(whyBlocks).size, VIDEOS.length, "Every why-it-matters paragraph must be unique");
assert.equal(new Set(natalieBlocks).size, VIDEOS.length, "Every Natalie-specific paragraph must be unique");

console.log(`video-copy tests passed (${VIDEOS.length} unique video-page copy sets)`);
