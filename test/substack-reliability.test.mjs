import assert from 'node:assert/strict';
import { refreshArticlesIfChanged, getUpdaterStatus, getStoredArticleState } from '../src/substack.js';
const originalFetch = globalThis.fetch;
const cover = 'https://substack-post-media.s3.amazonaws.com/public/images/cover_1200x800.jpg';
const post = (slug, day) => ({ title: slug, slug, post_date: `2026-10-${day}T11:00:00Z`, cover_image: cover, subtitle: 'Summary' });
const rss = `<rss><channel><item><title>new-post</title><link>https://nataliegwinters.substack.com/p/new-post</link><pubDate>Thu, 15 Oct 2026 11:00:00 GMT</pubDate><description>Summary</description><enclosure url="${cover}" /></item></channel></rss>`;
function fixture(failWrites = false) {
  const cache = new Map([['natalie_latest_articles_v4', { posts: [post('old-post', '13')], updatedAt: 1 }]]);
  return { cache, env: { NATALIE_KV: {
    get: async key => cache.get(key) || null,
    put: async (key, value) => {
      if (failWrites && key === 'natalie_latest_articles_v4') throw new Error('write unavailable');
      cache.set(key, JSON.parse(value));
    },
  } } };
}
try {
  let calls = [];
  let indexNowCalls = 0;
  globalThis.fetch = async (url, options) => {
    if (new URL(url).hostname === "api.indexnow.org") {
      indexNowCalls++;
      assert.equal(new URL(url).searchParams.get("url"), "https://nataliegwinters.com/articles");
      return new Response(null, { status: 202 });
    }
    calls.push(String(url));
    assert.ok(options.signal, 'each request has a timeout signal');
    return new Response(String(url).endsWith('/feed') ? rss : JSON.stringify([post('old-post', '13')]));
  };
  const { env } = fixture();
  const first = refreshArticlesIfChanged(env);
  assert.equal(refreshArticlesIfChanged(env), first, 'same-isolate refreshes share work');
  await first;
  assert.equal(calls.length, 2);
  assert.equal(indexNowCalls, 1, 'changed archive triggers exactly one IndexNow notification');
  assert.equal((await getUpdaterStatus(env)).newestTitle, 'new-post', 'stale API cannot hide newer RSS');
  assert.equal((await getStoredArticleState(env)).posts.length, 2);

  calls = [];
  const partial = fixture();
  globalThis.fetch = async url => {
    if (new URL(url).hostname === "api.indexnow.org") {
      indexNowCalls++;
      return new Response(null, { status: 202 });
    }
    calls.push(String(url));
    return String(url).endsWith('/feed') ? new Response(rss)
      : new Response('limited', { status: 429, headers: { 'Retry-After': '43200' } });
  };
  await refreshArticlesIfChanged(partial.env);
  const status = await getUpdaterStatus(partial.env);
  assert.equal(status.newestTitle, 'new-post');
  assert.equal(status.pollingHealth, 'degraded');
  assert.equal(status.rateLimited, true);
  assert.ok(status.nextRetryAt > Date.now() + 11 * 3600000);
  await refreshArticlesIfChanged(partial.env);
  assert.equal(indexNowCalls, 2, 'partial content update is notified once, cooldown is not');
  assert.equal(calls.length, 2, 'partial success must still respect rate limits');

  globalThis.fetch = async url => new Response(String(url).endsWith('/feed') ? rss : JSON.stringify([post('new-post', '15')]));
  const broken = fixture(true);
  const result = await refreshArticlesIfChanged(broken.env);
  assert.match(result.error, /write unavailable/);
  assert.equal((await getUpdaterStatus(broken.env)).lastCheckResult, 'error');
  assert.equal(broken.cache.get('natalie_latest_articles_v4').updatedAt, 1);
  console.log('Substack stale source, request bounds, partial cooldown and KV failure tests: PASS');
} finally { globalThis.fetch = originalFetch; }
