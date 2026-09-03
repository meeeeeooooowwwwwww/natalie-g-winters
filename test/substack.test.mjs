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

const postMarkdown = `Title: EXCLUSIVE: The CCP Infiltrated EPA’s Drinking-Water Committee
URL Source: http://nataliegwinters.substack.com/p/exclusive-the-ccp-infiltrated-epas
Published Time: 2026-09-01T11:45:44+00:00

Markdown Content:
_Beijing recruited a Penn State professor through a CCP-run talent program, placed him at Tsinghua and used him in a Chinese government water initiative—while he advised EPA on America’s drinking-water standards._

[![Image 1](https://substackcdn.com/image/fetch/example/cover.jpeg)](https://substackcdn.com/image/fetch/example/cover.jpeg)
`;
const post = __testing.extractJinaPost(postMarkdown, entries[0]);

assert.equal(post.title, "EXCLUSIVE: The CCP Infiltrated EPA’s Drinking-Water Committee");
assert.equal(post.date, "2026-09-01T11:45:44+00:00");
assert.match(post.image, /^https:\/\/substackcdn\.com\/image\/fetch\//);
assert.match(post.subtitle, /^Beijing recruited a Penn State professor/);

const future = {
  id: "future",
  title: "Future post",
  url: "https://nataliegwinters.substack.com/p/future-post",
  date: "2026-09-02T12:00:00.000Z",
};
const merged = __testing.mergeManualWithHistory([], [future, post]);
assert.equal(merged[0].url, future.url);

console.log("Substack updater parser and ordering tests: PASS");
