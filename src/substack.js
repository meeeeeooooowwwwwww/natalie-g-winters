import { SITE } from "./config.js";

const ARTICLE_CACHE_KEY = "natalie_latest_articles_v4";
const LEGACY_CACHE_KEY = "natalie_latest_articles_v3";

/*
  Bump the check-state key when updater behaviour changes materially.
  The article cache itself stays on v4 so a deploy never blanks the site.
*/
const CHECK_STATE_KEY = "natalie_article_check_v4";

const CHECK_INTERVAL_MS = 60 * 60 * 1000;
const MAX_STORED_POSTS = 25;
const FRESH_POST_COUNT = 5;
const DISCOVERY_COUNT = 10;

const SUBSTACK_HOME = SITE.substackHome;
const SUBSTACK_ARCHIVE = `${SITE.substackHome}archive`;
const SUBSTACK_FEED = `${SITE.substackHome}feed`;
const SUBSTACK_ARCHIVE_API = `${SITE.substackHome}api/v1/archive?sort=new&search=&offset=0&limit=${DISCOVERY_COUNT}`;
const JINA_READER = "https://r.jina.ai/http://nataliegwinters.substack.com";

/*
  Last-resort bootstrap only. These are never re-injected into a healthy
  rolling archive. If every live source is unavailable and KV is empty,
  a known-good list is better than a blank article section.
*/
const EMERGENCY_FALLBACK_POSTS = [
  {
    id: "web-exclusive-the-ccp-infiltrated-epas",
    title: "EXCLUSIVE: The CCP Infiltrated EPA’s Drinking-Water Committee",
    url: "https://nataliegwinters.substack.com/p/exclusive-the-ccp-infiltrated-epas",
    image: "https://substackcdn.com/image/fetch/$s_!OOy2!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9ee3dc4-0d1e-47a9-8332-263e77cf86de_1348x926.jpeg",
    subtitle: "Beijing recruited a Penn State professor through a CCP-run talent program, placed him at Tsinghua and used him in a Chinese government water initiative—while he advised EPA on America’s drinking-water standards.",
    date: "2026-09-01T11:45:44.000Z",
  },
  {
    id: "web-exc-secret-chinese-buyer-purchased",
    title: "EXC: Secret Chinese Buyer Purchased Farmland Near U.S. Navy’s Pacific Fighter Jet Hub",
    url: "https://nataliegwinters.substack.com/p/exc-secret-chinese-buyer-purchased",
    image: "https://substackcdn.com/image/fetch/$s_!b-C1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F83be70bc-55f8-473c-9ab9-cab72e2f8495_1993x560.png",
    subtitle: "More than 1,500 acres belonging to a potentially CCP-linked buyer.",
    date: "2026-08-31T11:45:22.000Z",
  },
  {
    id: "web-exclusive-american-kids-attended",
    title: "EXCLUSIVE: American Kids Attended A Camp In Xinjiang Run By A Sanctioned Paramilitary Group Abusing Uyghurs",
    url: "https://nataliegwinters.substack.com/p/exclusive-american-kids-attended",
    image: "https://substackcdn.com/image/fetch/$s_!EWM1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F33e37cb1-4d9c-4fca-bd83-816522cf27dd_700x525.jpeg",
    subtitle: "Students were told to bring the sanctioned ‘Corps spirit’ back to America.",
    date: "2026-08-30T13:03:42.000Z",
  },
  {
    id: "web-meet-the-republican-lobbyists-getting",
    title: "Meet The Republican Lobbyists Getting Paid To Help China Buy American Farmland",
    url: "https://nataliegwinters.substack.com/p/meet-the-republican-lobbyists-getting",
    image: "https://substackcdn.com/image/fetch/$s_!WTpr!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F691eaba0-8780-433b-a2e9-feb10a8be832_1260x988.jpeg",
    subtitle: "The money trail behind Republican lobbyists helping Chinese interests buy American farmland.",
    date: "2026-08-29T12:54:41.000Z",
  },
  {
    id: "web-mosques-wudu-lessons-and-90-million",
    title: "Mosques, Wudu Lessons And $90 Million From Saudi Arabia: Inside The New Boy Scouts",
    url: "https://nataliegwinters.substack.com/p/mosques-wudu-lessons-and-90-million",
    image: "https://substackcdn.com/image/fetch/$s_!5v5T!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb9cb4dc-9058-4cc2-a1bf-1fffd188eb9e_1260x1507.jpeg",
    subtitle: "Islamic lessons for four-year-olds, a mosque at Scouting’s historic headquarters and nearly $90 million from Saudi Arabia.",
    date: "2026-08-28T11:43:39.000Z",
  },
  {
    id: "web-was-an-obama-energy-secretary-a-ccp",
    title: "Was An Obama Energy Secretary A CCP Plant?",
    url: "https://nataliegwinters.substack.com/p/was-an-obama-energy-secretary-a-ccp",
    image: "",
    subtitle: "NEVER BEFORE REPORTED: Obama Energy Secretary Steven Chu was listed as an ‘Overseas Honorary President’ of a CCP United Front group used to cultivate and mobilize elite overseas scientists.",
    date: "2026-08-26T12:00:00.000Z",
  },
  {
    id: "web-revealed-the-government-paid-hundreds",
    title: "REVEALED: The Government Paid Hundreds Of Influencers To Promote COVID Vaccines. I Unmasked Dozens Of Them.",
    url: "https://nataliegwinters.substack.com/p/revealed-the-government-paid-hundreds",
    image: "",
    subtitle: "Among the recovered ads: ‘vaccinate your children!!,’ pregnancy and breastfeeding appeals, a vaccinated six-year-old—and claims that the shots were ‘completely safe.’",
    date: "2026-08-25T12:00:00.000Z",
  },
];

function decodeHtmlEntities(value = "") {
  return String(value)
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function stripTags(value = "") {
  return decodeHtmlEntities(
    String(value)
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function getTagAttribute(tag, name) {
  const match = String(tag).match(
    new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i")
  );
  return match ? decodeHtmlEntities(match[2]) : "";
}

function getMeta(html, key) {
  const tags = String(html).match(/<meta\b[^>]*>/gi) || [];

  for (const tag of tags) {
    const property = getTagAttribute(tag, "property");
    const name = getTagAttribute(tag, "name");

    if (property === key || name === key) {
      return getTagAttribute(tag, "content");
    }
  }

  return "";
}

function getCanonical(html, fallbackUrl) {
  const tags = String(html).match(/<link\b[^>]*>/gi) || [];

  for (const tag of tags) {
    const rel = getTagAttribute(tag, "rel").toLowerCase();
    if (rel === "canonical") {
      return canonicalPostUrl(getTagAttribute(tag, "href")) || fallbackUrl;
    }
  }

  return fallbackUrl;
}

function getPublishedDate(html) {
  const metaDate =
    getMeta(html, "article:published_time") ||
    getMeta(html, "datePublished") ||
    getMeta(html, "publish-date");

  if (metaDate) return metaDate;

  const jsonDate = String(html).match(/"datePublished"\s*:\s*"([^"]+)"/i);
  if (jsonDate) return decodeHtmlEntities(jsonDate[1]);

  const timeTag = String(html).match(/<time\b[^>]*\bdatetime=(["'])(.*?)\1/i);
  if (timeTag) return decodeHtmlEntities(timeTag[2]);

  return "";
}

function canonicalPostUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl, SUBSTACK_HOME);

    if (parsed.hostname !== "nataliegwinters.substack.com") return "";
    if (!parsed.pathname.startsWith("/p/")) return "";

    const pieces = parsed.pathname.split("/").filter(Boolean);
    if (pieces.length < 2) return "";

    parsed.pathname = `/p/${pieces[1]}`;
    parsed.search = "";
    parsed.hash = "";

    return parsed.toString();
  } catch {
    return "";
  }
}

function stablePostId(url = "") {
  try {
    const parsed = new URL(url);
    const slug = parsed.pathname.split("/").filter(Boolean).pop() || "post";
    return `web-${slug.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  } catch {
    return "web-post";
  }
}

function unwrapSubstackImageUrl(rawUrl = "") {
  const value = decodeHtmlEntities(String(rawUrl).trim());
  if (!value) return "";

  try {
    const parsed = new URL(value);
    if (parsed.hostname !== "substackcdn.com") return value;

    const encodedTarget = parsed.pathname.match(/\/(https?%3A%2F%2F.+)$/i);
    if (encodedTarget?.[1]) {
      try {
        return decodeURIComponent(encodedTarget[1]);
      } catch {
        return value;
      }
    }
  } catch {
    return "";
  }

  return value;
}

function isAllowedArticleImageHost(url = "") {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      (
        parsed.hostname === "substackcdn.com" ||
        parsed.hostname === "substack-post-media.s3.amazonaws.com"
      )
    );
  } catch {
    return false;
  }
}

function isLikelyArticleImage(rawUrl = "") {
  const original = decodeHtmlEntities(String(rawUrl).trim());
  if (!original) return false;

  const unwrapped = unwrapSubstackImageUrl(original) || original;
  if (!isAllowedArticleImageHost(unwrapped) && !isAllowedArticleImageHost(original)) {
    return false;
  }

  let haystack = `${original} ${unwrapped}`.toLowerCase();
  try {
    haystack = decodeURIComponent(haystack);
  } catch {
    // Keep the undecoded string if a malformed percent escape appears.
  }

  if (
    /(?:avatar|favicon|profile[-_ ]?(?:photo|image|picture)?|author[-_ ]?(?:photo|avatar)|publication[-_ ]?logo|site[-_ ]?logo|\/logos?\/|\/icons?\/)/i.test(haystack)
  ) {
    return false;
  }

  if (/(?:^|[,/])w_(?:16|24|32|40|48|64|80|96|100|120|128)(?:[,/]|$)/i.test(haystack)) {
    return false;
  }

  return true;
}

function chooseArticleImage(...candidates) {
  const flattened = candidates.flat(Infinity);

  for (const candidate of flattened) {
    const value = decodeHtmlEntities(String(candidate || "").trim());
    if (isLikelyArticleImage(value)) return value;
  }

  return "";
}

function imageVersion(url = "") {
  const source = unwrapSubstackImageUrl(url) || url;
  if (!source) return "";

  try {
    const parsed = new URL(source);
    const last = parsed.pathname.split("/").filter(Boolean).pop() || "image";
    return last.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 180) || "image";
  } catch {
    return "image";
  }
}

function normalisePost(post = {}) {
  const rawUrl = post.canonical_url || post.url || (
    post.slug ? `${SITE.substackHome}p/${post.slug}` : ""
  );
  const url = canonicalPostUrl(rawUrl);
  const image = chooseArticleImage(post.cover_image, post.social_image, post.image);

  return {
    id: String(post.id || stablePostId(url || rawUrl)),
    title: stripTags(post.title || "") || "Natalie Winters reporting",
    url,
    image,
    imageVersion: image ? imageVersion(image) : "",
    subtitle: stripTags(post.subtitle || post.description || ""),
    date: post.post_date || post.published_at || post.date || "",
  };
}

function isGenericTitle(value = "") {
  return !value || value === "Natalie Winters reporting";
}

function mergePostMetadata(primary, fallback) {
  const preferred = normalisePost(primary || {});
  const backup = normalisePost(fallback || {});
  const image = chooseArticleImage(preferred.image, backup.image);

  const title = isGenericTitle(preferred.title) && !isGenericTitle(backup.title)
    ? backup.title
    : preferred.title || backup.title;

  const subtitle = preferred.subtitle || backup.subtitle || "";
  const preferredDate = Date.parse(preferred.date || "");
  const backupDate = Date.parse(backup.date || "");
  const date = Number.isFinite(preferredDate)
    ? preferred.date
    : Number.isFinite(backupDate)
      ? backup.date
      : preferred.date || backup.date || "";

  return {
    id: preferred.id || backup.id || stablePostId(preferred.url || backup.url),
    title,
    url: preferred.url || backup.url,
    image,
    imageVersion: image ? imageVersion(image) : "",
    subtitle,
    date,
  };
}

function postListsEqual(a = [], b = []) {
  if (a.length !== b.length) return false;

  const fields = ["id", "title", "url", "image", "imageVersion", "subtitle", "date"];
  return a.every((post, index) => {
    const other = b[index] || {};
    return fields.every((field) => String(post?.[field] || "") === String(other?.[field] || ""));
  });
}

async function readKey(env, key) {
  if (!env?.NATALIE_KV) return null;

  try {
    return await env.NATALIE_KV.get(key, "json");
  } catch (error) {
    console.error(`KV read error for ${key}:`, error);
    return null;
  }
}

async function writeKey(env, key, value) {
  if (!env?.NATALIE_KV) return;

  try {
    await env.NATALIE_KV.put(key, JSON.stringify(value));
  } catch (error) {
    console.error(`KV write error for ${key}:`, error);
  }
}

async function saveArticleState(env, state) {
  return writeKey(env, ARTICLE_CACHE_KEY, state);
}

async function saveCheckState(env, state) {
  return writeKey(env, CHECK_STATE_KEY, state);
}

export async function getUpdaterStatus(env) {
  const articles = await getStoredArticleState(env);
  const check = await readKey(env, CHECK_STATE_KEY);

  return {
    articleCount: Array.isArray(articles?.posts) ? articles.posts.length : 0,
    newestTitle: articles?.posts?.[0]?.title || null,
    newestUrl: articles?.posts?.[0]?.url || null,
    articlesUpdatedAt: articles?.updatedAt || null,
    lastCheckedAt: check?.lastCheckedAt || null,
    lastSuccessfulAt: check?.lastSuccessfulAt || null,
    lastCheckResult: check?.result || null,
    lastCheckSource: check?.source || null,
    sourceFailures: check?.failures || [],
    lastError: check?.error || null,
  };
}

async function fetchTextFresh(baseUrl, accept = "text/html,application/xhtml+xml") {
  const url = new URL(baseUrl);
  url.searchParams.set("_ngw_check", String(Date.now()));

  const response = await fetch(url.toString(), {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; NatalieGWintersSite/6.0; +https://nataliegwinters.com/)",
      "Accept": accept,
      "Cache-Control": "no-cache, no-store, max-age=0",
      "Pragma": "no-cache",
    },
    cf: {
      cacheTtl: 0,
      cacheEverything: false,
    },
  });

  if (!response.ok) {
    throw new Error(`Substack returned ${response.status} for ${baseUrl}`);
  }

  return response.text();
}

async function fetchJinaText(pathname) {
  const response = await fetch(`${JINA_READER}${pathname}`, {
    headers: {
      "Accept": "text/plain",
      "X-No-Cache": "true",
      "User-Agent": "NatalieGWintersSite/6.0 (+https://nataliegwinters.com/)",
    },
    cf: { cacheTtl: 0, cacheEverything: false },
  });

  if (!response.ok) {
    throw new Error(`Reader fallback returned ${response.status} for ${pathname}`);
  }

  return response.text();
}

function extractJinaSitemapEntries(markdown) {
  const entries = [];
  const seen = new Set();
  const linkPattern = /^\[([^\]]+)\]\((https?:\/\/nataliegwinters\.substack\.com\/p\/[^)]+)\)$/gim;
  let match;

  while ((match = linkPattern.exec(String(markdown))) !== null) {
    const url = canonicalPostUrl(match[2]);
    if (!url || seen.has(url)) continue;
    seen.add(url);
    entries.push({ title: decodeHtmlEntities(match[1]).trim(), url });
    if (entries.length >= DISCOVERY_COUNT) break;
  }

  return entries;
}

function extractJinaCoverImage(content = "") {
  const candidates = [];
  const text = String(content);

  const markdownImages = /!\[[^\]]*\]\((https:\/\/(?:substackcdn\.com|substack-post-media\.s3\.amazonaws\.com)\/[^\s)]+)(?:\s+["'][^"']*["'])?\)/gi;
  let match;
  while ((match = markdownImages.exec(text)) !== null) {
    candidates.push(match[1]);
  }

  const htmlImages = text.match(/<img\b[^>]*>/gi) || [];
  for (const tag of htmlImages) {
    candidates.push(getTagAttribute(tag, "src"));
  }

  const rawUrls = text.match(/https:\/\/(?:substackcdn\.com\/image\/fetch\/|substack-post-media\.s3\.amazonaws\.com\/)[^\s)\]>"']+/gi) || [];
  candidates.push(...rawUrls);

  return chooseArticleImage(candidates);
}

function extractJinaPost(markdown, entry) {
  const text = String(markdown);
  const title = text.match(/^Title:\s*(.+)$/mi)?.[1]?.trim() || entry.title;
  const date = text.match(/^Published Time:\s*(.+)$/mi)?.[1]?.trim() || "";
  const content = text.split(/^Markdown Content:\s*$/mi)[1] || "";
  const image = extractJinaCoverImage(content);
  const firstParagraph = content
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .find((part) => part && !part.startsWith("[") && !part.startsWith("#") && !part.startsWith("!")) || "";
  const subtitle = stripTags(firstParagraph.replace(/^_+|_+$/g, "").replace(/\*\*/g, "")).slice(0, 500);

  return normalisePost({
    id: stablePostId(entry.url),
    title,
    url: entry.url,
    image,
    subtitle,
    date,
  });
}

async function fetchJinaSitemapPosts() {
  const year = new Date().getUTCFullYear();
  const sitemap = await fetchJinaText(`/sitemap/${year}`);
  const entries = extractJinaSitemapEntries(sitemap);

  if (!entries.length) throw new Error("Reader fallback sitemap returned no posts");

  const posts = await Promise.all(
    entries.slice(0, FRESH_POST_COUNT).map(async (entry) => {
      try {
        return extractJinaPost(
          await fetchJinaText(new URL(entry.url).pathname),
          entry
        );
      } catch (error) {
        console.warn(`Reader fallback could not hydrate ${entry.url}:`, error);
        return normalisePost({ ...entry, id: stablePostId(entry.url) });
      }
    })
  );

  return { posts, source: "substack-reader-fallback" };
}

function extractFirstArticleImage(html = "") {
  const tags = String(html).match(/<img\b[^>]*>/gi) || [];
  const candidates = tags.map((tag) => getTagAttribute(tag, "src"));
  return chooseArticleImage(candidates);
}

function extractXmlTag(block, tagName) {
  const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = String(block).match(
    new RegExp(`<${escaped}\\b[^>]*>([\\s\\S]*?)<\\/${escaped}>`, "i")
  );
  if (!match) return "";
  return decodeHtmlEntities(
    match[1]
      .replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/i, "$1")
      .trim()
  );
}

function extractRssPosts(xml) {
  const items = String(xml).match(/<item\b[\s\S]*?<\/item>/gi) || [];
  const posts = [];

  for (const item of items.slice(0, DISCOVERY_COUNT)) {
    const link = canonicalPostUrl(extractXmlTag(item, "link"));
    if (!link) continue;

    const description = extractXmlTag(item, "description");
    const encoded = extractXmlTag(item, "content:encoded");
    const mediaTag = item.match(/<media:content\b[^>]*>/i)?.[0] || "";
    const enclosureTag = item.match(/<enclosure\b[^>]*>/i)?.[0] || "";
    const image = chooseArticleImage(
      getTagAttribute(mediaTag, "url"),
      getTagAttribute(enclosureTag, "url"),
      extractFirstArticleImage(encoded),
      extractFirstArticleImage(description)
    );

    posts.push(normalisePost({
      id: stablePostId(link),
      title: stripTags(extractXmlTag(item, "title")) || "Natalie Winters reporting",
      url: link,
      image,
      subtitle: stripTags(description).slice(0, 500),
      date: extractXmlTag(item, "pubDate"),
    }));
  }

  return posts;
}

async function fetchArchiveApiPosts() {
  const text = await fetchTextFresh(
    SUBSTACK_ARCHIVE_API,
    "application/json,text/plain;q=0.9,*/*;q=0.8"
  );
  const data = JSON.parse(text);
  const rows = Array.isArray(data) ? data : Array.isArray(data?.posts) ? data.posts : [];

  const posts = rows
    .slice(0, DISCOVERY_COUNT)
    .map(normalisePost)
    .filter((post) => post.url && post.title);

  if (!posts.length) throw new Error("Substack archive API returned no usable posts");

  return { posts, source: "substack-archive-api" };
}

async function fetchRssPosts() {
  const xml = await fetchTextFresh(
    SUBSTACK_FEED,
    "application/rss+xml,application/xml,text/xml;q=0.9,*/*;q=0.8"
  );
  const posts = extractRssPosts(xml);

  if (!posts.length) throw new Error("Substack RSS feed returned no usable posts");

  return { posts, source: "substack-rss" };
}

function extractPostEntries(html) {
  const ordered = [];
  const byUrl = new Map();
  const anchorRegex = /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi;

  let match;
  while ((match = anchorRegex.exec(String(html))) !== null) {
    const url = canonicalPostUrl(decodeHtmlEntities(match[2]));
    if (!url) continue;

    const candidateTitle = stripTags(match[3]);

    if (!byUrl.has(url)) {
      const entry = { url, title: candidateTitle };
      byUrl.set(url, entry);
      ordered.push(entry);
    } else if (candidateTitle) {
      const existing = byUrl.get(url);
      if (!existing.title || candidateTitle.length > existing.title.length) {
        existing.title = candidateTitle;
      }
    }
  }

  return ordered;
}

async function fetchHomepageEntries() {
  const homeHtml = await fetchTextFresh(SUBSTACK_HOME);
  let entries = extractPostEntries(homeHtml);

  if (entries.length < FRESH_POST_COUNT) {
    const archiveHtml = await fetchTextFresh(SUBSTACK_ARCHIVE);
    const archiveEntries = extractPostEntries(archiveHtml);
    const seen = new Set(entries.map((entry) => entry.url));

    for (const entry of archiveEntries) {
      if (!seen.has(entry.url)) {
        seen.add(entry.url);
        entries.push(entry);
      }
    }
  }

  if (!entries.length) {
    throw new Error("Could not find any /p/ article links on Natalie Winters' Substack homepage");
  }

  return entries.slice(0, DISCOVERY_COUNT);
}

async function fetchPostMetadata(entry) {
  try {
    const html = await fetchTextFresh(entry.url);
    const canonical = getCanonical(html, entry.url);
    const image = chooseArticleImage(
      getMeta(html, "og:image"),
      getMeta(html, "twitter:image")
    );

    return normalisePost({
      id: stablePostId(canonical),
      title:
        getMeta(html, "og:title") ||
        getMeta(html, "twitter:title") ||
        entry.title ||
        "Natalie Winters reporting",
      url: canonical,
      image,
      subtitle:
        getMeta(html, "og:description") ||
        getMeta(html, "description") ||
        "",
      date: getPublishedDate(html),
    });
  } catch (error) {
    console.error(`Could not hydrate Substack post ${entry.url}:`, error);

    try {
      return extractJinaPost(
        await fetchJinaText(new URL(entry.url).pathname),
        entry
      );
    } catch (readerError) {
      console.warn(`Reader fallback could not hydrate ${entry.url}:`, readerError);
      return normalisePost({
        id: stablePostId(entry.url),
        title: entry.title || "Natalie Winters reporting",
        url: entry.url,
      });
    }
  }
}

async function fetchHomepagePosts() {
  const entries = await fetchHomepageEntries();
  const posts = [];

  for (const entry of entries.slice(0, FRESH_POST_COUNT)) {
    posts.push(await fetchPostMetadata(entry));
  }

  return { posts, source: "substack-homepage" };
}

async function fetchHomepageGapPosts(existingUrls) {
  const entries = await fetchHomepageEntries();
  const missing = entries
    .slice(0, FRESH_POST_COUNT)
    .filter((entry) => !existingUrls.has(entry.url));

  if (!missing.length) {
    return { posts: [], source: "substack-homepage-gap-fill", authoritativeOrder: true };
  }

  const posts = [];
  for (const entry of missing) {
    posts.push(await fetchPostMetadata(entry));
  }

  return {
    posts,
    source: "substack-homepage-gap-fill",
    authoritativeOrder: true,
  };
}

function mergeSourceResults(results) {
  const records = new Map();
  let sequence = 0;

  results.forEach((result, sourceIndex) => {
    (result.posts || []).forEach((post, postIndex) => {
      const normalised = normalisePost(post);
      if (!normalised.url) return;

      const existing = records.get(normalised.url);
      const authoritativeRank = result.authoritativeOrder ? postIndex : Number.POSITIVE_INFINITY;

      if (!existing) {
        records.set(normalised.url, {
          post: normalised,
          bestRank: postIndex,
          authoritativeRank,
          firstSeen: sequence++,
          sourceIndex,
        });
        return;
      }

      existing.post = mergePostMetadata(existing.post, normalised);
      existing.bestRank = Math.min(existing.bestRank, postIndex);
      existing.authoritativeRank = Math.min(existing.authoritativeRank, authoritativeRank);
    });
  });

  return [...records.values()]
    .sort((a, b) => {
      const aAuthoritative = Number.isFinite(a.authoritativeRank);
      const bAuthoritative = Number.isFinite(b.authoritativeRank);

      if (aAuthoritative !== bAuthoritative) return aAuthoritative ? -1 : 1;
      if (aAuthoritative && bAuthoritative && a.authoritativeRank !== b.authoritativeRank) {
        return a.authoritativeRank - b.authoritativeRank;
      }

      const aTime = Date.parse(a.post.date || "");
      const bTime = Date.parse(b.post.date || "");
      const aValid = Number.isFinite(aTime);
      const bValid = Number.isFinite(bTime);

      if (aValid && bValid && aTime !== bTime) return bTime - aTime;
      if (aValid !== bValid) return aValid ? -1 : 1;
      if (a.bestRank !== b.bestRank) return a.bestRank - b.bestRank;
      if (a.sourceIndex !== b.sourceIndex) return a.sourceIndex - b.sourceIndex;
      return a.firstSeen - b.firstSeen;
    })
    .map((record) => record.post)
    .slice(0, DISCOVERY_COUNT);
}

async function fetchLatestPostsFromSubstack() {
  const results = [];
  const failures = [];
  const primarySources = [fetchArchiveApiPosts, fetchRssPosts, fetchJinaSitemapPosts];

  for (const source of primarySources) {
    try {
      const result = await source();
      if (result.posts?.length) results.push(result);
    } catch (error) {
      const message = `${source.name}: ${String(error?.message || error)}`;
      failures.push(message);
      console.warn(`Substack source failed (${source.name}):`, error);
    }
  }

  const existingUrls = new Set(
    results.flatMap((result) => result.posts || []).map((post) => normalisePost(post).url).filter(Boolean)
  );

  try {
    const gapResult = await fetchHomepageGapPosts(existingUrls);
    if (gapResult.posts.length) results.push(gapResult);
  } catch (error) {
    const message = `fetchHomepageGapPosts: ${String(error?.message || error)}`;
    failures.push(message);
    console.warn("Substack homepage gap check failed:", error);
  }

  if (!results.length) {
    try {
      results.push(await fetchHomepagePosts());
    } catch (error) {
      const message = `fetchHomepagePosts: ${String(error?.message || error)}`;
      failures.push(message);
      console.warn("Substack homepage fallback failed:", error);
    }
  }

  if (!results.length) {
    throw new Error(`All Substack discovery sources failed: ${failures.join(" | ")}`);
  }

  const posts = mergeSourceResults(results)
    .map(normalisePost)
    .filter((post) => post.title && post.url);

  if (!posts.length) {
    throw new Error(`Substack sources returned no usable posts: ${failures.join(" | ")}`);
  }

  return {
    posts: posts.slice(0, DISCOVERY_COUNT),
    source: results.map((result) => result.source).join("+"),
    failures,
  };
}

async function migrateLegacyCache(env) {
  const legacy = await readKey(env, LEGACY_CACHE_KEY);

  if (!legacy || !Array.isArray(legacy.posts) || !legacy.posts.length) {
    return null;
  }

  const posts = mergeFreshWithHistory([], legacy.posts);
  if (!posts.length) return null;

  const migrated = {
    posts,
    updatedAt: legacy.updatedAt || Date.now(),
    newestId: posts[0]?.id || "",
    newestUrl: posts[0]?.url || "",
    migratedFrom: LEGACY_CACHE_KEY,
    migratedAt: Date.now(),
  };

  await saveArticleState(env, migrated);
  return migrated;
}

function mergeFreshWithHistory(freshPosts, storedPosts = []) {
  const records = new Map();
  let sequence = 0;

  const add = (post, freshRank = Number.POSITIVE_INFINITY) => {
    const normalised = normalisePost(post);
    const key = normalised.url || normalised.id;
    if (!key || !normalised.url) return;

    const existing = records.get(key);
    if (!existing) {
      records.set(key, {
        post: normalised,
        freshRank,
        firstSeen: sequence++,
      });
      return;
    }

    if (Number.isFinite(freshRank)) {
      existing.post = mergePostMetadata(normalised, existing.post);
      existing.freshRank = Math.min(existing.freshRank, freshRank);
    } else {
      existing.post = mergePostMetadata(existing.post, normalised);
    }
  };

  freshPosts.forEach((post, index) => add(post, index));
  storedPosts.forEach((post) => add(post));

  return [...records.values()]
    .sort((a, b) => {
      const aTime = Date.parse(a.post.date || "");
      const bTime = Date.parse(b.post.date || "");
      const aValid = Number.isFinite(aTime);
      const bValid = Number.isFinite(bTime);

      if (aValid && bValid && aTime !== bTime) return bTime - aTime;
      if (aValid !== bValid) {
        if (Number.isFinite(a.freshRank) !== Number.isFinite(b.freshRank)) {
          return Number.isFinite(a.freshRank) ? -1 : 1;
        }
        return aValid ? -1 : 1;
      }
      if (a.freshRank !== b.freshRank) return a.freshRank - b.freshRank;
      return a.firstSeen - b.firstSeen;
    })
    .map((record) => record.post)
    .slice(0, MAX_STORED_POSTS);
}

export async function getStoredArticleState(env) {
  const current = await readKey(env, ARTICLE_CACHE_KEY);

  if (current && Array.isArray(current.posts) && current.posts.length) {
    const repairedPosts = mergeFreshWithHistory([], current.posts);
    const needsRepair = !postListsEqual(current.posts.map(normalisePost), repairedPosts);

    if (needsRepair) {
      const repaired = {
        ...current,
        posts: repairedPosts,
        updatedAt: Date.now(),
        newestId: repairedPosts[0]?.id || current.newestId || "",
        newestUrl: repairedPosts[0]?.url || current.newestUrl || "",
        repairedAt: Date.now(),
      };

      await saveArticleState(env, repaired);
      return repaired;
    }

    return {
      ...current,
      posts: current.posts.map(normalisePost),
    };
  }

  return migrateLegacyCache(env);
}

export async function refreshArticlesIfChanged(env) {
  const startedAt = Date.now();
  const stored = await getStoredArticleState(env);

  try {
    const fresh = await fetchLatestPostsFromSubstack();
    const mergedPosts = mergeFreshWithHistory(
      fresh.posts,
      Array.isArray(stored?.posts) ? stored.posts : []
    );
    const storedPosts = Array.isArray(stored?.posts) ? stored.posts.map(normalisePost) : [];
    const changed = !postListsEqual(storedPosts, mergedPosts);

    if (changed) {
      await saveArticleState(env, {
        posts: mergedPosts,
        updatedAt: Date.now(),
        newestId: mergedPosts[0]?.id || "",
        newestUrl: mergedPosts[0]?.url || "",
      });
    }

    await saveCheckState(env, {
      lastCheckedAt: Date.now(),
      lastSuccessfulAt: Date.now(),
      result: changed ? "updated" : "no-change",
      source: fresh.source,
      failures: fresh.failures,
      newestUrl: mergedPosts[0]?.url || "",
      newestTitle: mergedPosts[0]?.title || "",
      durationMs: Date.now() - startedAt,
    });

    console.log(
      changed
        ? `Substack updated via ${fresh.source}: ${mergedPosts[0]?.url || "unknown"}`
        : `Substack check: no change via ${fresh.source} (${mergedPosts[0]?.url || "unknown"})`
    );

    return {
      changed,
      newestId: mergedPosts[0]?.id || "",
      newestUrl: mergedPosts[0]?.url || "",
      source: fresh.source,
      failures: fresh.failures,
    };
  } catch (error) {
    console.error("Substack refresh failed:", error);

    await saveCheckState(env, {
      lastCheckedAt: Date.now(),
      result: "error",
      source: "all-sources",
      error: String(error?.message || error),
      durationMs: Date.now() - startedAt,
    });

    return {
      changed: false,
      error: String(error?.message || error),
    };
  }
}

export async function getLatestPosts(env, ctx = null) {
  let stored = await getStoredArticleState(env);

  if (!stored || !Array.isArray(stored.posts) || !stored.posts.length) {
    try {
      const fresh = await fetchLatestPostsFromSubstack();
      const posts = mergeFreshWithHistory(fresh.posts, []);

      stored = {
        posts,
        updatedAt: Date.now(),
        newestId: posts[0]?.id || "",
        newestUrl: posts[0]?.url || "",
      };

      await saveArticleState(env, stored);
      await saveCheckState(env, {
        lastCheckedAt: Date.now(),
        lastSuccessfulAt: Date.now(),
        result: "bootstrap",
        source: fresh.source,
        failures: fresh.failures,
        newestUrl: posts[0]?.url || "",
        newestTitle: posts[0]?.title || "",
      });
    } catch (error) {
      console.error("Initial Substack bootstrap failed:", error);

      const posts = mergeFreshWithHistory(EMERGENCY_FALLBACK_POSTS, []);
      if (!posts.length) return [];

      stored = {
        posts,
        updatedAt: Date.now(),
        newestId: posts[0]?.id || "",
        newestUrl: posts[0]?.url || "",
        emergencyFallback: true,
      };

      await saveArticleState(env, stored);
      await saveCheckState(env, {
        lastCheckedAt: Date.now(),
        result: "fallback-bootstrap",
        source: "emergency-fallback",
        error: String(error?.message || error),
        newestUrl: posts[0]?.url || "",
        newestTitle: posts[0]?.title || "",
      });
    }
  }

  const checkState = await readKey(env, CHECK_STATE_KEY);
  const lastCheckedAt = Number(checkState?.lastCheckedAt || 0);
  const overdue = !lastCheckedAt || Date.now() - lastCheckedAt > CHECK_INTERVAL_MS;

  if (overdue && ctx?.waitUntil) {
    ctx.waitUntil(refreshArticlesIfChanged(env));
  }

  return stored.posts;
}

export function findStoredPostById(state, id) {
  if (!state || !Array.isArray(state.posts)) return null;

  return state.posts.find((post) => String(post.id) === String(id)) || null;
}

export const __testing = {
  chooseArticleImage,
  extractJinaCoverImage,
  extractJinaPost,
  extractJinaSitemapEntries,
  mergeFreshWithHistory,
  mergeSourceResults,
  normalisePost,
  postListsEqual,
};
