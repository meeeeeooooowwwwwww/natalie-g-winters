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
const failures = [];

for (const video of VIDEOS) {
  const copy = getVideoCopy(video.slug);
  if (!copy) {
    failures.push(`${video.slug}: missing unique copy`);
    continue;
  }

  if (copy.why.length < 180) failures.push(`${video.slug}: why-it-matters copy too short (${copy.why.length})`);
  if (copy.natalie.length < 120) failures.push(`${video.slug}: Natalie-specific copy too short (${copy.natalie.length})`);

  const namedSummary = /^Winters\b/.test(video.summary)
    ? video.summary.replace(/^Winters\b/, "Natalie Winters")
    : `Natalie Winters: ${video.summary}`;
  const renderedMainCopy = `${namedSummary} ${video.angle} ${copy.why} ${copy.natalie}`;
  const nameMentions = renderedMainCopy.match(/Natalie Winters/g) || [];
  if (nameMentions.length < 3) failures.push(`${video.slug}: only ${nameMentions.length} Natalie Winters mentions in rendered main copy`);

  if (renderedMainCopy.includes("The recurring fight in Natalie Winters' reporting is bigger than any one clip")) {
    failures.push(`${video.slug}: old recurring-fight boilerplate survived`);
  }
  if (renderedMainCopy.includes("Then there is the charming imbalance in the skill tree")) {
    failures.push(`${video.slug}: old skill-tree boilerplate survived`);
  }

  whyBlocks.push(copy.why);
  natalieBlocks.push(copy.natalie);
}

if (new Set(whyBlocks).size !== VIDEOS.length) failures.push("why-it-matters paragraphs are not all unique");
if (new Set(natalieBlocks).size !== VIDEOS.length) failures.push("Natalie-specific paragraphs are not all unique");

assert.equal(failures.length, 0, `Video copy SEO checks failed:\n- ${failures.join("\n- ")}`);
console.log(`video-copy tests passed (${VIDEOS.length} unique video-page copy sets)`);
