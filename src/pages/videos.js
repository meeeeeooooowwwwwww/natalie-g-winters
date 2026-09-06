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
            <p class="hero-deck"><strong>Natalie Winters</strong> videos, War Room clips, White House reports, interviews and investigations, each with its own page, original Rumble source and useful context. Because one extremely formidable, yoga-powered, seed-oil-suspicious journalist apparently produces more rabbit holes than a normal browser tab bar can safely contain.</p>
          </div>
          <aside class="hero-aside"><strong>ARCHIVE STATUS</strong>Fifty-plus clips and counting. China files, War Room, White House, interviews, politics and several subjects that looked considerably less innocent after somebody opened the PDF.</aside>
        </div>

        <div class="video-feature">
          <div class="video-frame"><iframe src="${SITE.rumbleEmbed}" title="Featured Natalie Winters video" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
          <div class="video-copy"><span>FEATURED NATALIE WINTERS VIDEO</span><h2>Start here</h2><p>One clip gets the spotlight. Then the archive opens into War Room appearances, White House reports, investigations, interviews and enough institutional rabbit holes to ruin a perfectly sensible evening.</p><a href="/war-room">EXPLORE NATALIE WINTERS ON WAR ROOM →</a></div>
        </div>

        <section class="section-block">
          <div class="section-title-row">
            <h2>Browse 50+ Natalie Winters video pages</h2>
            <p>China, investigations, War Room, White House, interviews, politics and the occasional magnificently impolite institutional autopsy.</p>
          </div>
          <div class="editorial-grid">${renderVideoArchiveCards()}</div>
        </section>

        <div class="prose wide">
          <h2>Why the archive goes beyond clips</h2>
          <p>A name and job title only tell you so much. The useful part is seeing the actual subjects, institutions, interviews, arguments and recurring themes around <strong>Natalie Winters</strong>. Each page connects one appearance to the broader body of work instead of dumping fifty silent players into a wall and calling it an archive.</p>
          <p>The result is a much clearer map of her reporting and media work across China, national security, political institutions, War Room, the White House and long-form interviews, while preserving <strong>Natalie G. Winters</strong> as the full form of the same name.</p>
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
