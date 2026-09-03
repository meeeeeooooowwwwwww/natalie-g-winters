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
import { renderInterviewsPage } from "./pages/interviews.js";
import { renderArticlesPage } from "./pages/articles.js";
import { renderChinaPage } from "./pages/china.js";

const IMAGE_CACHE_SECONDS = 30 * 24 * 60 * 60;

function render404(posts) {
  return renderLayout({
    title: "Page Not Found | Natalie G. Winters",
    description: "Natalie G. Winters",
    canonical: `${SITE.domain}/`,
    posts,
    robots: "noindex,follow",
    pageContent: `
      <main class="not-found">
        <div>
          <h1>404</h1>
          <p>Apparently even Natalie G. Winters does not have this page.</p>
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
    return new Response(
      "Image not found",
      {
        status: 404,
        headers: {
          "Cache-Control": "public, max-age=60",
        },
      }
    );
  }

  if (
    post.imageVersion &&
    String(version) !== String(post.imageVersion)
  ) {
    return new Response(
      "Image version not found",
      {
        status: 404,
        headers: {
          "Cache-Control": "public, max-age=60",
        },
      }
    );
  }

  if (!isAllowedSubstackImage(post.image)) {
    return new Response(
      "Image source not allowed",
      {
        status: 403,
      }
    );
  }

  const cache = caches.default;

  const cacheKey = new Request(
    request.url,
    {
      method: "GET",
    }
  );

  const cached = await cache.match(cacheKey);

  if (cached) {
    return cached;
  }

  const upstream = await fetch(
    substackOptimisedImageUrl(post.image),
    {
      headers: {
        "Accept":
          request.headers.get("Accept") ||
          "image/avif,image/webp,image/*,*/*",

        "User-Agent":
          "Mozilla/5.0 (compatible; NatalieGWintersSite/3.0; +https://nataliegwinters.com/)",
      },

      cf: {
        cacheEverything: true,
        cacheTtl: IMAGE_CACHE_SECONDS,
      },
    }
  );

  if (!upstream.ok) {
    return new Response(
      "Image temporarily unavailable",
      {
        status: 502,
        headers: {
          "Cache-Control": "public, max-age=60",
        },
      }
    );
  }

  const headers = new Headers(
    upstream.headers
  );

  headers.delete("Set-Cookie");

  headers.set(
    "Cache-Control",
    `public, max-age=${IMAGE_CACHE_SECONDS}, immutable`
  );

  headers.set(
    "X-Content-Type-Options",
    "nosniff"
  );

  const response = new Response(
    upstream.body,
    {
      status: 200,
      headers,
    }
  );

  ctx.waitUntil(
    cache.put(
      cacheKey,
      response.clone()
    )
  );

  return response;
}

function routePage(pathname, posts) {
  switch (
    pathname.replace(/\/$/, "") || "/"
  ) {
    case "/":
      return renderHomePage(posts);

    case "/about":
      return renderAboutPage(posts);

    case "/career":
      return renderCareerPage(posts);

    case "/reporting":
      return renderReportingPage(posts);

    case "/white-house":
      return renderWhiteHousePage(posts);

    case "/verdict":
      return renderVerdictPage(posts);

    case "/war-room":
      return renderWarRoomPage(posts);

    case "/videos":
      return renderVideosPage(posts);

    case "/interviews":
      return renderInterviewsPage(posts);

    case "/articles":
      return renderArticlesPage(posts);

    case "/china":
      return renderChinaPage(posts);

    default:
      return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    /*
      LEGACY HOMEPAGE REDIRECTS

      Google currently has /index.html indexed from the old site.
      Permanently redirect that URL to the canonical homepage.

      Query strings are preserved.
    */

    if (
      url.pathname === "/index.html" ||
      url.pathname === "/index.htm" ||
      url.pathname === "/wedding" ||
      url.pathname === "/wedding/"
    ) {
      const destination = new URL(
        "/",
        SITE.domain
      );

      destination.search =
        url.search;

      return Response.redirect(
        destination.toString(),
        301
      );
    }

    /*
      CANONICAL PATH NORMALISATION

      Keep one indexable URL for content pages rather than allowing
      both /about and /about/ to compete.
    */

    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      const cleanPath = url.pathname.replace(/\/+$/, "");
      const canonicalPaths = new Set([
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
      ]);

      if (canonicalPaths.has(cleanPath)) {
        const destination = new URL(cleanPath, SITE.domain);
        destination.search = url.search;
        return Response.redirect(destination.toString(), 301);
      }
    }

    /*
      STATIC ASSETS
    */

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
        url.pathname === "/robots.txt" ||
        url.pathname === "/sitemap.xml"
      )
    ) {
      return env.ASSETS.fetch(request);
    }

    /*
      SUBSTACK IMAGE PROXY
    */

    const imageMatch =
      url.pathname.match(
        /^\/media\/substack\/([^/]+)\/([^/]+)$/
      );

    if (imageMatch) {
      return serveSubstackImage(
        request,
        env,
        ctx,
        decodeURIComponent(imageMatch[1]),
        decodeURIComponent(imageMatch[2])
      );
    }

    /*
      UPDATER STATUS
    */

    if (url.pathname === "/api/status") {
      const status = await getUpdaterStatus(env);

      return new Response(
        JSON.stringify(status, null, 2),
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Cache-Control": "no-store",
          },
        }
      );
    }

    /*
      PAGE ROUTING
    */

    const posts =
      await getLatestPosts(
        env,
        ctx
      );

    const page =
      routePage(
        url.pathname,
        posts
      );

    const response =
      page
        ? htmlResponse(
            page,
            200,
            60
          )
        : htmlResponse(
            render404(posts),
            404,
            60
          );

    return withSeoHostProtection(
      response,
      request
    );
  },

  /*
    HOURLY SUBSTACK UPDATE CHECK
  */

  async scheduled(
    controller,
    env,
    ctx
  ) {
    ctx.waitUntil(
      refreshArticlesIfChanged(env)
        .catch((error) => {
          console.error(
            "Scheduled Substack check failed:",
            error
          );
        })
    );
  },
};