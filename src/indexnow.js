// IndexNow only reports the site's own changed URLs; external Substack posts
// retain their publisher's canonical URLs and must never be submitted here.
export const INDEXNOW_KEY = "ab4217eb5bafe937a14c84ab1d3afc50";
export const INDEXNOW_KEY_PATH = `/${INDEXNOW_KEY}.txt`;
const ARCHIVE_URL = "https://nataliegwinters.com/articles";
const KEY_URL = `https://nataliegwinters.com${INDEXNOW_KEY_PATH}`;

export function serveIndexNowKey(request) {
  const url = new URL(request.url);
  if (url.pathname !== INDEXNOW_KEY_PATH) return null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  return new Response(request.method === "HEAD" ? null : INDEXNOW_KEY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

// Invoke only after an actual KV article archive change, not on every request,
// cron tick, or unrelated video/page. IndexNow does not guarantee indexing.
export async function notifyIndexNowArchive(fetcher = fetch) {
  const url = new URL("https://api.indexnow.org/indexnow");
  url.searchParams.set("url", ARCHIVE_URL);
  url.searchParams.set("key", INDEXNOW_KEY);
  url.searchParams.set("keyLocation", KEY_URL);
  const response = await fetcher(url, {
    method: "GET",
    signal: AbortSignal.timeout(5000),
  });
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow returned HTTP ${response.status}`);
  }
  return response.status;
}
