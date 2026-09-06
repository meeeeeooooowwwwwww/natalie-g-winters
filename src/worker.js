import { SITE } from "./config.js";
import {
  findStoredPostById,
  getLatestPosts,
  getStoredArticleState,
  getUpdaterStatus,
  refreshArticlesIfChanged,
} from "./substack.js";
import { htmlResponse } from "./utils.js";
import { renderLayout } from "./layout.js";
import { renderHomePage } from "./pages/home.js";
import { renderAboutPage } from "./pages/about.js";
import { renderCareerPage } from "./pages/career.js";
import { renderReportingPage } from "./pages/reporting.js";
import { renderWhiteHousePage } from "./pages/white-house.js";
import { renderVerdictPage } from "./pages/verdict.js";
import { renderWarRoomPage } from "./pages/war-room.js";
import { renderVideosPage } from "./pages/videos.js";
import { renderVideoDetailPage } from "./pages/video-detail.js";
import { renderInterviewsPage } from "./pages/interviews.js";
import { renderArticlesPage } from "./pages/articles.js";
import { renderChinaPage } from "./pages/china.js";
import { VIDEOS, getVideoBySlug } from "./video-data.js";

const IMAGE_CACHE_SECONDS = 30 * 24 * 60 * 60;
const RUMBLE_CACHE_SECONDS = 30 * 24 * 60 * 60;
const SITEMAP_LASTMOD = "2026-09-07";

const PRIMARY_PATHS = [
  "/",
  "/about",
  "/career",
  "/reporting",
  "/white-house",
  "/verdict",
  "/war-room",
  "/videos",
  "/interviews",
  "/articles",
  "/china",
];

function render404(posts) {
  return renderLayout({
    title: "Page Not Found | Natalie Winters",
    description: "Natalie Winters, also known as Natalie G. Winters.",
    canonical: `${SITE.domain}/`,
    posts,
    robots: "noindex,follow",
    pageContent: `
      <main class="not-found">
        <div>
          <h1>404</h1>
          <p>Apparently even the magnificently over-documented Natalie Winters does not have this page.</p>
          <a href="/">RETURN HOME</a>
        </div>
      </main>
    `,
  });
}

function withSeoHostProtection(response, request) {
  const hostname = new URL(request.url).hostname;

  if (!hostname.endsWith(".workers.dev")) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function isAllowedSubstackImage(url) {
  try {
    const parsed = new URL(url);

    return (
      parsed.protocol === "https:" &&
      (
        parsed.hostname === "substack-post-media.s3.amazonaws.com" ||
        parsed.hostname === "substackcdn.com"
      )
    );
  } catch {
    return false;
  }
}

function substackOptimisedImageUrl(source) {
  return (
    "https://substackcdn.com/image/fetch/" +
    "w_700,c_limit,f_auto,q_auto:good,fl_progressive:steep/" +
    encodeURIComponent(source)
  );
}

async function serveSubstackImage(request, env, ctx, id, version) {
  const state = await getStoredArticleState(env);
  const post = findStoredPostById(state, id);

  if (!post?.image) {
    return new Response("Image not found", {
      status: 404,
      headers: { "Cache-Control": "public, max-age=60" },
    });
  }

  if (post.imageVersion && String(version) !== String(post.imageVersion)) {
    return new Response("Image version not found", {
      status: 404,
      headers: { "Cache-Control": "public, max-age=60" },
    });
  }

  if (!isAllowedSubstackImage(post.image)) {
    return new Response("Image source not allowed", { status: 403 });
  }

  const cache = caches.default;
  const cacheKey = new Request(request.url, { method: "GET" });
  const cached = await cache.match(cacheKey);

  if (cached) return cached;

  const upstream = await fetch(substackOptimisedImageUrl(post.image), {
    headers: {
      Accept: request.headers.get("Accept") || "image/avif,image/webp,image/*,*/*",
      "User-Agent": "Mozilla/5.0 (compatible; NatalieWintersSite/4.0; +https://nataliegwinters.com/)",
    },
    cf: { cacheEverything: true, cacheTtl: IMAGE_CACHE_SECONDS },
  });

  if (!upstream.ok) {
    return new Response("Image temporarily unavailable", {
      status: 502,
      headers: { "Cache-Control": "public, max-age=60" },
    });
  }

  const headers = new Headers(upstream.headers);
  headers.delete("Set-Cookie");
  headers.set("Cache-Control", `public, max-age=${IMAGE_CACHE_SECONDS}, immutable`);
  headers.set("X-Content-Type-Options", "nosniff");

  const response = new Response(upstream.body, { status: 200, headers });
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

function normaliseRumbleHtml(html) {
  return String(html || "")
    .replace(/\\u002F/gi, "/")
    .replace(/\\\//g, "/")
    .replace(/&amp;/g, "&");
}

function findRumbleEmbedUrl(html) {
  const source = normaliseRumbleHtml(html);
  const direct = source.match(/https:\/\/rumble\.com\/embed\/(?:ucfsd\.)?[a-z0-9._-]+\/?(?:\?[^\"'<>\s]*)?/i);
  if (direct) return direct[0];

  const json = source.match(/[\"'](?:embedUrl|embed_url)[\"']\s*:\s*[\"']([^\"']+)[\"']/i);
  if (json?.[1]?.startsWith("https://rumble.com/embed/")) return json[1];

  return null;
}

async function serveRumbleEmbed(request, video, ctx) {
  if (!video) {
    return new Response("Video not found", { status: 404 });
  }

  if (video.embedUrl) {
    return Response.redirect(video.embedUrl, 302);
  }

  const cache = caches.default;
  const cacheKey = new Request(request.url, { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    const upstream = await fetch(video.rumbleUrl, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "Mozilla/5.0 (compatible; NatalieWintersVideoArchive/1.0; +https://nataliegwinters.com/videos)",
      },
      cf: { cacheEverything: true, cacheTtl: RUMBLE_CACHE_SECONDS },
    });

    if (upstream.ok) {
      const embedUrl = findRumbleEmbedUrl(await upstream.text());
      if (embedUrl) {
        const response = new Response(null, {
          status: 302,
          headers: {
            Location: embedUrl,
            "Cache-Control": `public, max-age=${RUMBLE_CACHE_SECONDS}`,
          },
        });
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
        return response;
      }
    }
  } catch (error) {
    console.error("Rumble embed lookup failed:", video.slug, error);
  }

  return new Response(`<!doctype html><html><body style="margin:0;background:#090208;color:#fff;font-family:system-ui;display:grid;place-items:center;min-height:100vh;text-align:center"><div><strong>Natalie Winters video</strong><p>The embedded player could not be resolved automatically.</p><a style="color:#fff" href="${video.rumbleUrl}" target="_blank" rel="noopener noreferrer">Watch this video on Rumble →</a></div></body></html>`, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "public, max-age=300",
      "X-Robots-Tag": "noindex",
    },
  });
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderSitemap() {
  const primary = PRIMARY_PATHS.map((path) => ({
    loc: `${SITE.domain}${path === "/" ? "/" : path}`,
    priority: path === "/" ? "1.0" : path === "/articles" ? "0.95" : "0.9",
    changefreq: path === "/" || path === "/articles" ? "daily" : "weekly",
  }));

  const videoPages = VIDEOS.map((video) => ({
    loc: `${SITE.domain}/videos/${video.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  }));

  const urls = [...primary, ...videoPages].map((entry) => `  <url><loc>${xmlEscape(entry.loc)}</loc><lastmod>${SITEMAP_LASTMOD}</lastmod><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority}</priority></url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function renderSitemapResponse() {
  return new Response(renderSitemap(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function routePage(pathname, posts) {
  const clean = pathname.replace(/\/$/, "") || "/";

  if (clean.startsWith("/videos/")) {
    const slug = decodeURIComponent(clean.slice("/videos/".length));
    const video = getVideoBySlug(slug);
    return video ? renderVideoDetailPage(video, posts) : null;
  }

  switch (clean) {
    case "/": return renderHomePage(posts);
    case "/about": return renderAboutPage(posts);
    case "/career": return renderCareerPage(posts);
    case "/reporting": return renderReportingPage(posts);
    case "/white-house": return renderWhiteHousePage(posts);
    case "/verdict": return renderVerdictPage(posts);
    case "/war-room": return renderWarRoomPage(posts);
    case "/videos": return renderVideosPage(posts);
    case "/interviews": return renderInterviewsPage(posts);
    case "/articles": return renderArticlesPage(posts);
    case "/china": return renderChinaPage(posts);
    default: return null;
  }
}

function isCanonicalContentPath(pathname) {
  if (PRIMARY_PATHS.includes(pathname)) return true;
  if (!pathname.startsWith("/videos/")) return false;
  return Boolean(getVideoBySlug(decodeURIComponent(pathname.slice("/videos/".length))));
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (
      url.pathname === "/index.html" ||
      url.pathname === "/index.htm" ||
      url.pathname === "/wedding" ||
      url.pathname === "/wedding/"
    ) {
      const destination = new URL("/", SITE.domain);
      destination.search = url.search;
      return Response.redirect(destination.toString(), 301);
    }

    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      const cleanPath = url.pathname.replace(/\/+$/, "");
      if (isCanonicalContentPath(cleanPath)) {
        const destination = new URL(cleanPath, SITE.domain);
        destination.search = url.search;
        return Response.redirect(destination.toString(), 301);
      }
    }

    if (url.pathname === "/sitemap.xml") {
      return withSeoHostProtection(renderSitemapResponse(), request);
    }

    if (
      env?.ASSETS &&
      (
        url.pathname.startsWith("/assets/") ||
        url.pathname.startsWith("/bg_images/") ||
        url.pathname.startsWith("/images/") ||
        url.pathname === "/favicon.svg" ||
        url.pathname === "/favicon.ico" ||
        url.pathname === "/favicon-96x96.png" ||
        url.pathname === "/apple-touch-icon.png" ||
        url.pathname === "/robots.txt"
      )
    ) {
      return env.ASSETS.fetch(request);
    }

    const imageMatch = url.pathname.match(/^\/media\/substack\/([^/]+)\/([^/]+)$/);
    if (imageMatch) {
      return serveSubstackImage(
        request,
        env,
        ctx,
        decodeURIComponent(imageMatch[1]),
        decodeURIComponent(imageMatch[2])
      );
    }

    const rumbleMatch = url.pathname.match(/^\/media\/rumble\/([^/]+)$/);
    if (rumbleMatch) {
      const video = getVideoBySlug(decodeURIComponent(rumbleMatch[1]));
      return serveRumbleEmbed(request, video, ctx);
    }

    if (url.pathname === "/api/status") {
      const status = await getUpdaterStatus(env);
      return new Response(JSON.stringify(status, null, 2), {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Cache-Control": "no-store",
        },
      });
    }

    const posts = await getLatestPosts(env, ctx);
    const page = routePage(url.pathname, posts);
    const response = page
      ? htmlResponse(page, 200, 60)
      : htmlResponse(render404(posts), 404, 60);

    return withSeoHostProtection(response, request);
  },

  async scheduled(controller, env, ctx) {
    ctx.waitUntil(
      refreshArticlesIfChanged(env).catch((error) => {
        console.error("Scheduled Substack check failed:", error);
      })
    );
  },
};
