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
assert.equal(post.image, coverImage);
assert.match(post.subtitle, /^Beijing recruited a Penn State professor/);

assert.equal(__testing.chooseArticleImage(profileImage, coverImage), coverImage);
assert.equal(__testing.chooseArticleImage("/images/natalie-g-winters-profile-16x9.jpg"), "");

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

console.log("Substack updater source, ordering and cover-image tests: PASS");
