import assert from "node:assert/strict";
import { INDEXNOW_KEY, INDEXNOW_KEY_PATH, serveIndexNowKey, notifyIndexNowArchive } from "../src/indexnow.js";

assert.match(INDEXNOW_KEY, /^[a-f0-9]{32}$/);
assert.equal(serveIndexNowKey(new Request("https://nataliegwinters.com/other.txt")), null);
const keyRes = serveIndexNowKey(new Request(`https://nataliegwinters.com${INDEXNOW_KEY_PATH}`));
assert.equal(keyRes.status, 200);
assert.equal(await keyRes.text(), INDEXNOW_KEY);
assert.equal(keyRes.headers.get("Content-Type"), "text/plain; charset=UTF-8");
const headRes = serveIndexNowKey(new Request(`https://nataliegwinters.com${INDEXNOW_KEY_PATH}`, { method: "HEAD" }));
assert.equal(headRes.status, 200);
assert.equal(await headRes.text(), "");
const postRes = serveIndexNowKey(new Request(`https://nataliegwinters.com${INDEXNOW_KEY_PATH}`, { method: "POST" }));
assert.equal(postRes.status, 405);

let calls = 0;
const successful = async (request, options) => {
  calls++;
  const url = new URL(request);
  assert.equal(url.hostname, "api.indexnow.org");
  assert.equal(url.searchParams.get("url"), "https://nataliegwinters.com/articles");
  assert.equal(url.searchParams.get("key"), INDEXNOW_KEY);
  assert.equal(url.searchParams.get("keyLocation"), `https://nataliegwinters.com${INDEXNOW_KEY_PATH}`);
  assert.equal(options.method, "GET");
  return new Response(null, { status: 202 });
};
assert.equal(await notifyIndexNowArchive(successful), 202);
assert.equal(calls, 1);
await assert.rejects(() => notifyIndexNowArchive(async () => new Response(null, { status: 429 })), /HTTP 429/);
console.log("IndexNow key and archive notification checks passed");
