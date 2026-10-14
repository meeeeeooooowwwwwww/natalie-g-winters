import assert from "node:assert/strict";
import { refreshArticlesIfChanged, getUpdaterStatus, getStoredArticleState } from "../src/substack.js";

const cache = new Map();
const env = {
  NATALIE_KV: {
    async get(key) { return cache.get(key) || null; },
    async put(key, value) { cache.set(key, JSON.parse(value)); },
  },
};

const lastSuccessfulAt = Date.now() - 12 * 60 * 60 * 1000;
cache.set("natalie_latest_articles_v4", {
  posts: [{
    id: "old",
    title: "Previously published",
    url: "https://nataliegwinters.substack.com/p/previously-published",
    date: "2026-10-13T11:00:00.000Z",
    subtitle: "Previously published summary",
    image: "https://substack-post-media.s3.amazonaws.com/public/images/older-cover_1000x800.jpg",
  }],
  updatedAt: lastSuccessfulAt,
});
cache.set("natalie_article_check_v8", {
  lastCheckedAt: lastSuccessfulAt,
  lastSuccessfulAt,
  result: "no-change",
});

const originalFetch = globalThis.fetch;
const calls = [];
try {
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response("Too many requests", {
      status: 429,
      headers: { "Retry-After": "43200" },
    });
  };

  const failed = await refreshArticlesIfChanged(env);
  assert.match(failed.error, /429/);
  assert.equal(calls.length, 2, "a 429 should stop further requests to each blocked host");
  assert.equal(calls.some((url) => url.includes("_ngw_check")), false, "do not bust caches");
  assert.equal(calls.filter((url) => new URL(url).hostname === "nataliegwinters.substack.com").length, 1);
  assert.equal(calls.filter((url) => url.includes("r.jina.ai")).length, 1);

  const status = await getUpdaterStatus(env);
  assert.equal(status.lastCheckResult, "error");
  assert.equal(status.rateLimited, true);
  assert.equal(status.consecutiveFailures, 1);
  assert.equal(status.lastSuccessfulAt, lastSuccessfulAt, "preserve previous success on failure");
  assert.equal(status.sourceFailures.length, 2);
  assert.ok(status.nextRetryAt > Date.now() + 11 * 60 * 60 * 1000, "respect Retry-After");
  assert.equal(status.articleCount, 1, "do not erase stored articles");

  const nextCheck = await refreshArticlesIfChanged(env);
  assert.equal(nextCheck.skipped, "cooldown");
  assert.equal(calls.length, 2, "cooldown should make zero network requests");

  // Simulate the retry window elapsing. A single healthy source must clear
  // the cooldown and publish newly discovered content without extra requests.
  cache.set("natalie_article_check_v8", {
    ...cache.get("natalie_article_check_v8"),
    nextRetryAt: Date.now() - 1000,
  });
  calls.length = 0;
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (!String(url).includes("/api/v1/archive")) {
      throw new Error("Healthy archive must not trigger secondary probes: " + url);
    }
    return new Response(JSON.stringify([{
      id: 123,
      title: "Newly published reporting",
      slug: "newly-published-reporting",
      cover_image: "https://substack-post-media.s3.amazonaws.com/public/images/new-cover_1000x800.jpg",
      subtitle: "New article summary",
      post_date: "2026-10-15T11:00:00.000Z",
    }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const recovery = await refreshArticlesIfChanged(env);
  assert.equal(recovery.changed, true);
  assert.equal(calls.length, 1, "healthy hourly update should use one source request");
  const newStatus = await getUpdaterStatus(env);
  assert.equal(newStatus.newestTitle, "Newly published reporting");
  assert.equal(newStatus.lastCheckResult, "updated");
  assert.ok(newStatus.lastSuccessfulAt > lastSuccessfulAt);
  assert.equal(newStatus.nextRetryAt, null);
  assert.equal(newStatus.consecutiveFailures, 0);
  assert.equal(newStatus.rateLimited, false);
  assert.equal(newStatus.lastError, null);
  const persisted = await getStoredArticleState(env);
  assert.equal(persisted.posts.length, 2, "preserve historical articles on recovery");
  console.log("Substack rate-limit backoff and recovery tests: PASS");
} finally {
  globalThis.fetch = originalFetch;
}
