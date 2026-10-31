import assert from "node:assert/strict";
import { SITE } from "../src/config.js";
import { PRIMARY_PATHS, renderSitemapXml } from "../src/sitemap.js";
import { VIDEOS } from "../src/video-data.js";
import { getVideoThumbnail } from "../src/video-thumbnails.js";
import { renderVideoDetailPage } from "../src/pages/video-detail.js";

const xml = renderSitemapXml();
assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
assert.match(xml, /xmlns:video="http:\/\/www\.google\.com\/schemas\/sitemap-video\/1\.1"/);
assert.doesNotMatch(xml, /<priority>|<changefreq>|<lastmod>/, "Unverifiable timestamps and ignored hints must stay absent");
assert.doesNotMatch(xml, /\/verdict<\/loc>/, "Noindex satire must not appear in the sitemap");
const listedUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = [
  ...PRIMARY_PATHS.map(path => SITE.domain + path),
  ...VIDEOS.map(video => SITE.domain + "/videos/" + video.slug),
];
assert.equal(listedUrls.length, expectedUrls.length);
assert.equal(new Set(listedUrls).size, expectedUrls.length, "Sitemap must not duplicate URLs");
assert.deepEqual(listedUrls, expectedUrls, "Sitemap must cover all actual indexable page routes");
const metaCount = (xml.match(/<video:video>/g) || []).length;
const withThumbnail = VIDEOS.filter(video => getVideoThumbnail(video.slug));
assert.equal(metaCount, withThumbnail.length, "Embed metadata must match real Rumble thumbnails");
for (const video of withThumbnail) {
  const html = renderVideoDetailPage(video, []);
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1);
  const graph = JSON.parse(scripts[0][1])["@graph"];
  const obj = graph.find(node => node["@type"] === "VideoObject");
  assert.ok(obj, "Missing video schema for " + video.slug);
  assert.equal(obj.name, video.title);
  assert.equal(obj.thumbnailUrl, getVideoThumbnail(video.slug));
  assert.equal(obj.embedUrl, video.embedUrl);
  assert.equal(obj.url, SITE.domain + "/videos/" + video.slug);
  assert.equal(obj.uploadDate, undefined, "Unverified air dates must not become upload dates");
  assert.ok(html.includes('property="og:image" content="' + getVideoThumbnail(video.slug)));
  assert.ok(xml.includes("<video:thumbnail_loc>" + getVideoThumbnail(video.slug) + "</video:thumbnail_loc>"));
}
console.log("Video SEO metadata checks passed: " + listedUrls.length + " URLs and " + metaCount + " video entries");
