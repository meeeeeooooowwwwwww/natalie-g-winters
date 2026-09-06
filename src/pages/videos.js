import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { escapeHtml } from "../utils.js";
import { VIDEOS } from "../video-data.js";

const CATEGORY_LABELS = {
  china: "CHINA",
  institutions: "INSTITUTIONS",
  investigations: "INVESTIGATIONS",
  politics: "POLITICS",
  "war-room": "WAR ROOM",
  "white-house": "WHITE HOUSE",
  media: "MEDIA",
  interviews: "INTERVIEWS",
  economy: "ECONOMY"
};

function renderVideoArchiveCards() {
  return VIDEOS.map((video, index) => `
    <a class="editorial-card" href="/videos/${escapeHtml(video.slug)}">
      <span class="card-index">${String(index + 1).padStart(2, "0")} · ${escapeHtml(CATEGORY_LABELS[video.category] || "VIDEO")}</span>
      <h3>${escapeHtml(video.title)}</h3>
      <p>${escapeHtml(video.summary)}</p>
      <span class="card-link">WATCH VIDEO + READ CONTEXT →</span>
    </a>
  `).join("");
}

export function renderVideosPage(posts) {
  const pageContent = `
    <main class="content-page">
      <article class="content-inner wide-shell">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">50+ VIDEO ARCHIVE</div>
            <h1>Natalie Winters Videos</h1>
            <p class="hero-deck"><strong>Natalie Winters</strong> videos, War Room clips, White House reports, interviews and investigations, each with its own crawlable page, original Rumble source and actual editorial context. Because apparently one extremely formidable, magnificently caffeinated journalist required an entire internal-link civilisation.</p>
          </div>
          <aside class="hero-aside"><strong>SEO, BUT MAKE IT USEFUL</strong>Dozens of silent iframes would be lazy. More than fifty unique pages connecting Natalie Winters to actual subjects, sources and appearances gives humans something to read and search engines something meaningful to understand.</aside>
        </div>

        <div class="video-feature">
          <div class="video-frame"><iframe src="${SITE.rumbleEmbed}" title="Featured Natalie Winters video" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
          <div class="video-copy"><span>FEATURED NATALIE WINTERS VIDEO</span><h2>The current featured Rumble clip</h2><p>The homepage video stays here as the lead item while the archive below expands the site from a single embed into a proper Natalie Winters video knowledge hub.</p><a href="/war-room">EXPLORE NATALIE WINTERS ON WAR ROOM →</a></div>
        </div>

        <section class="section-block">
          <div class="section-title-row">
            <h2>Browse 50+ Natalie Winters video pages</h2>
            <p>China, investigations, War Room, White House, interviews, politics and the occasional magnificently impolite institutional autopsy.</p>
          </div>
          <div class="editorial-grid">${renderVideoArchiveCards()}</div>
        </section>

        <div class="prose wide">
          <h2>Why build a Natalie Winters video archive?</h2>
          <p>The shorter search name <strong>Natalie Winters</strong> is competitive because it can refer to a person without the extra disambiguating middle initial. The sensible response is not to repeat the name 900 times until Google files a restraining order. It is to build clearer topical authority around the person: reporting subjects, programmes, interviews, career milestones and individual pieces of work.</p>
          <p>Each archive page therefore has a unique title, description, canonical URL, embedded Rumble video or Rumble-player resolver, source attribution and internal links into the rest of the site. The result is a much denser entity map around <strong>Natalie Winters</strong> while preserving <strong>Natalie G. Winters</strong> as an alternate form of the same name.</p>
        </div>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters Videos | 50+ Rumble, War Room & Interview Clips",
    description: "Watch more than 50 Natalie Winters videos with dedicated pages, Rumble sources and context covering War Room, White House reporting, China investigations, interviews and political commentary.",
    canonical: `${SITE.domain}/videos`,
    pageContent,
    posts,
    active: "videos",
  });
}
