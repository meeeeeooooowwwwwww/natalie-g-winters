import assert from "node:assert/strict";
import { VIDEOS, getRelatedVideos, getVideoBySlug } from "../src/video-data.js";

assert.ok(VIDEOS.length >= 50, `Expected at least 50 video records, found ${VIDEOS.length}`);

const slugs = VIDEOS.map((video) => video.slug);
assert.equal(new Set(slugs).size, slugs.length, "Every video slug must be unique");

for (const video of VIDEOS) {
  assert.match(video.slug, /^[a-z0-9-]+$/, `Invalid slug: ${video.slug}`);
  assert.ok(video.title?.length >= 12, `Video title is too short: ${video.slug}`);
  assert.ok(video.sourceTitle?.length >= 12, `Source title is too short: ${video.slug}`);
  assert.match(video.rumbleUrl, /^https:\/\/rumble\.com\//, `Non-Rumble source URL: ${video.slug}`);
  assert.ok(video.summary?.length >= 90, `Summary is too thin: ${video.slug}`);
  assert.ok(video.angle?.length >= 70, `Editorial angle is too thin: ${video.slug}`);
  assert.equal(getVideoBySlug(video.slug), video, `Slug lookup failed: ${video.slug}`);

  if (video.embedUrl) {
    assert.match(video.embedUrl, /^https:\/\/rumble\.com\/embed\//, `Invalid Rumble embed URL: ${video.slug}`);
  }

  const related = getRelatedVideos(video, 4);
  assert.equal(related.length, 4, `Expected four related videos for ${video.slug}`);
  assert.ok(related.every((candidate) => candidate.slug !== video.slug), `Related videos must not include self: ${video.slug}`);
}

console.log(`video-data tests passed (${VIDEOS.length} crawlable video pages)`);
