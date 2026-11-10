import assert from "node:assert/strict";
import { __testing } from "../src/substack.js";

const sitemap = `
[EXCLUSIVE: The CCP Infiltrated EPA’s Drinking-Water Committee](https://nataliegwinters.substack.com/p/exclusive-the-ccp-infiltrated-epas)
[Post 2](https://nataliegwinters.substack.com/p/post-2)
[Post 3](https://nataliegwinters.substack.com/p/post-3)
[Post 4](https://nataliegwinters.substack.com/p/post-4)
[Post 5](https://nataliegwinters.substack.com/p/post-5)
[Post 6](https://nataliegwinters.substack.com/p/post-6)
[Post 7](https://nataliegwinters.substack.com/p/post-7)
[Post 8](https://nataliegwinters.substack.com/p/post-8)
[Post 9](https://nataliegwinters.substack.com/p/post-9)
[Post 10](https://nataliegwinters.substack.com/p/post-10)
[Ignored Post](https://nataliegwinters.substack.com/p/ignored-post)
`;
const entries = __testing.extractJinaSitemapEntries(sitemap);

assert.equal(entries[0].url, "https://nataliegwinters.substack.com/p/exclusive-the-ccp-infiltrated-epas");
assert.equal(entries.length, 10);

const profileImage = "https://substackcdn.com/image/fetch/w_80/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fauthor-profile-photo.jpeg";
const coverImage = "https://substackcdn.com/image/fetch/w_1456,c_limit/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9ee3dc4-0d1e-47a9-8332-263e77cf86de_1348x926.jpeg";

const postMarkdown = `Title: EXCLUSIVE: The CCP Infiltrated EPA’s Drinking-Water Committee
URL Source: http://nataliegwinters.substack.com/p/exclusive-the-ccp-infiltrated-epas
Published Time: 2026-09-01T11:45:44+00:00

Markdown Content:
![Natalie Winters profile](${profileImage})

_Beijing recruited a Penn State professor through a CCP-run talent program, placed him at Tsinghua and used him in a Chinese government water initiative—while he advised EPA on America’s drinking-water standards._

[![Article cover](${coverImage})](${coverImage})
`;
const post = __testing.extractJinaPost(postMarkdown, entries[0]);

assert.equal(post.title, "EXCLUSIVE: The CCP Infiltrated EPA’s Drinking-Water Committee");
assert.equal(post.date, "2026-09-01T11:45:44+00:00");
assert.equal(post.image, "", "reader body image is not a canonical cover");
assert.match(post.subtitle, /^Beijing recruited a Penn State professor/);

assert.equal(__testing.chooseArticleImage(profileImage, coverImage), coverImage);
assert.equal(__testing.chooseArticleImage("/images/natalie-g-winters-profile-16x9.jpg"), "");

const jinaArchive = `Title:

URL Source: http://nataliegwinters.substack.com/api/v1/archive?sort=new&search=&offset=0&limit=1

Markdown Content:
[{"id":123,"title":"Archive cover test","slug":"archive-cover-test","canonical_url":"https://nataliegwinters.substack.com/p/archive-cover-test","cover_image":"${coverImage}","post_date":"2026-10-04T13:34:42.943Z"}]`;
const jinaRows = __testing.parseJinaArchiveApi(jinaArchive);
assert.equal(jinaRows.length, 1);
assert.equal(jinaRows[0].cover_image, coverImage);

const bodyImage = "https://substack-post-media.s3.amazonaws.com/public/images/body-evidence_1200x800.jpeg";
const rankedSourceMerge = __testing.mergeSourceResults([
  {
    source: "substack-reader-fallback",
    posts: [{
      title: "Image priority test",
      url: "https://nataliegwinters.substack.com/p/image-priority-test",
      image: bodyImage,
      imageQuality: 50,
      date: "2026-09-07T10:00:00.000Z",
    }],
  },
  {
    source: "substack-post-metadata",
    posts: [{
      title: "Image priority test",
      url: "https://nataliegwinters.substack.com/p/image-priority-test",
      image: coverImage,
      imageQuality: 300,
      date: "2026-09-07T10:00:00.000Z",
    }],
  },
]);
assert.equal(rankedSourceMerge[0].image, coverImage);
assert.equal(rankedSourceMerge[0].imageQuality, 300);

const renderedBodyImage = "https://substackcdn.com/image/fetch/w_1456,c_limit/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Frendered-body-image.jpeg";
const publicationPreview = __testing.normalisePost({
  title: "Publication preview preference",
  url: "https://nataliegwinters.substack.com/p/publication-preview-preference",
  cover_image: coverImage,
  image: renderedBodyImage,
  imageQuality: 400,
  date: "2026-10-04T10:00:00.000Z",
});
assert.equal(publicationPreview.image, coverImage);
assert.equal(publicationPreview.imageQuality, 500);

const publicationCoverPreference = __testing.mergeSourceResults([
  {
    source: "substack-archive-api",
    posts: [{
      title: "Publication preview preference",
      url: "https://nataliegwinters.substack.com/p/publication-preview-preference",
      cover_image: coverImage,
      date: "2026-10-04T10:00:00.000Z",
    }],
  },
  {
    source: "substack-reader-fallback",
    posts: [{
      title: "Publication preview preference",
      url: "https://nataliegwinters.substack.com/p/publication-preview-preference",
      image: renderedBodyImage,
      imageQuality: 400,
      date: "2026-10-04T10:00:00.000Z",
    }],
  },
]);
assert.equal(publicationCoverPreference[0].image, coverImage);
assert.equal(publicationCoverPreference[0].imageQuality, 500);

// Three archived October covers must be the publisher's cover_image, never
// first-body-image fallbacks. Fresh canonical metadata can override them.
for (const [url, officialCover] of [
  ["https://nataliegwinters.substack.com/p/meet-the-american-university-leaders", "https://substack-post-media.s3.amazonaws.com/public/images/7e4aba5f-56b5-4c97-a8d9-9a69847a3955_1672x941.png"],
  ["https://nataliegwinters.substack.com/p/he-helped-run-immigration-under-biden", "https://substack-post-media.s3.amazonaws.com/public/images/cd2d18ee-2ab8-461b-971f-ca39d16374ca_700x467.jpeg"],
  ["https://nataliegwinters.substack.com/p/blockade-and-riot-how-soros-and-gates", "https://substack-post-media.s3.amazonaws.com/public/images/c098b97a-820a-4f7d-8173-2da9bebae208_1260x859.jpeg"],
]) {
  const repaired = __testing.normalisePost({
    title: "Covered article", url, image: bodyImage, imageQuality: 120,
    date: "2026-10-23T11:10:34.000Z",
  });
  assert.equal(repaired.image, officialCover);
  assert.equal(repaired.imageQuality, 400);
  const changedCover = __testing.normalisePost({
    title: "Covered article", url,
    cover_image: coverImage,
    date: "2026-10-23T11:10:34.000Z",
  });
  assert.equal(changedCover.image, coverImage);
  assert.equal(changedCover.imageQuality, 500);
}

const stored = {
  id: "stored",
  title: "Old title",
  url: "https://nataliegwinters.substack.com/p/test-post",
  image: coverImage,
  subtitle: "Old subtitle",
  date: "2026-09-05T12:00:00.000Z",
};
const freshWithoutImage = {
  id: "stored",
  title: "Updated title",
  url: stored.url,
  image: "",
  subtitle: "Updated subtitle",
  date: stored.date,
};
const historyMerge = __testing.mergeFreshWithHistory([freshWithoutImage], [stored]);
assert.equal(historyMerge[0].image, coverImage);
assert.equal(historyMerge[0].title, "Updated title");
assert.equal(historyMerge[0].subtitle, "Updated subtitle");

const staleBodyHistory = {
  ...stored,
  image: bodyImage,
  imageQuality: 50,
};
const freshCanonical = {
  ...freshWithoutImage,
  image: coverImage,
  imageQuality: 300,
};
const upgradedHistory = __testing.mergeFreshWithHistory([freshCanonical], [staleBodyHistory]);
assert.equal(upgradedHistory[0].image, coverImage);
assert.equal(upgradedHistory[0].imageQuality, 300);

const staleApi = {
  source: "substack-archive-api",
  posts: [{
    title: "Older post",
    url: "https://nataliegwinters.substack.com/p/older-post",
    date: "2026-09-05T10:00:00.000Z",
  }],
};
const fresherRss = {
  source: "substack-rss",
  posts: [{
    title: "Newer post",
    url: "https://nataliegwinters.substack.com/p/newer-post",
    date: "2026-09-06T10:00:00.000Z",
  }],
};
const sourceMerge = __testing.mergeSourceResults([staleApi, fresherRss]);
assert.equal(sourceMerge[0].title, "Newer post");

const homepageGap = {
  source: "substack-homepage-gap-fill",
  authoritativeOrder: true,
  posts: [{
    title: "Just-published post",
    url: "https://nataliegwinters.substack.com/p/just-published-post",
    date: "",
  }],
};
const gapMerge = __testing.mergeSourceResults([staleApi, homepageGap]);
assert.equal(gapMerge[0].title, "Just-published post");

assert.equal(__testing.postListsEqual(historyMerge, historyMerge.map((item) => ({ ...item }))), true);

// Regression: a social-image fallback can be a generic publication photo,
// not the article's own archive cover. Never promote it to a cover.
const socialOnly = __testing.normalisePost({
  title: "Social-only metadata",
  url: "https://nataliegwinters.substack.com/p/social-only-metadata",
  social_image: coverImage,
});
assert.equal(socialOnly.image, "", "social-only metadata must not invent a cover");
const staleSocial = __testing.normalisePost({
  title: "Previously cached generic social image",
  url: "https://nataliegwinters.substack.com/p/stale-social",
  image: coverImage,
  imageQuality: 450,
});
assert.equal(staleSocial.image, "", "legacy cached social-image rank must be retired");

// The exact image URL, not the last filename alone, must form the cache key.
// A changed cover must not load a 30-day-old proxy response.
const firstUrl = "https://substack-post-media.s3.amazonaws.com/public/images/a/cover.jpeg";
const secondUrl = "https://substack-post-media.s3.amazonaws.com/public/images/b/cover.jpeg";
assert.notEqual(__testing.imageVersion(firstUrl), __testing.imageVersion(secondUrl));
assert.match(__testing.imageVersion(firstUrl), /^v3-cover\.jpeg-[0-9a-f]{8}$/);
assert.equal(__testing.imageVersion(firstUrl), __testing.imageVersion(firstUrl));

// If one source image has been assigned to unrelated articles, show neither
// with a misleading article-specific cover label until separately verified.
const shared = __testing.mergeFreshWithHistory([
  { title: "Report A", url: "https://nataliegwinters.substack.com/p/report-a", cover_image: coverImage },
  { title: "Report B", url: "https://nataliegwinters.substack.com/p/report-b", cover_image: coverImage },
]);
assert.equal(shared.length, 2);
assert.ok(shared.every(post => post.image === "" && post.imageVersion === ""), "reused cover must fail closed across distinct article URLs");
const distinct = __testing.mergeFreshWithHistory([
  { title: "Report A", url: "https://nataliegwinters.substack.com/p/report-a", cover_image: firstUrl },
  { title: "Report B", url: "https://nataliegwinters.substack.com/p/report-b", cover_image: secondUrl },
]);
assert.ok(distinct.every(post => post.image), "distinct verified covers must remain available");
assert.ok(__testing.mergeSourceResults([{ source: "archive", posts: [
  { title: "Report A", url: "https://nataliegwinters.substack.com/p/report-a", cover_image: coverImage },
  { title: "Report B", url: "https://nataliegwinters.substack.com/p/report-b", cover_image: coverImage },
]}]).every(post => !post.image), "cross-article collisions must not escape via fresh source merge");

console.log("Substack updater source, ordering and cover-image tests: PASS");
