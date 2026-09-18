import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { escapeHtml } from "../utils.js";
import { VIDEOS } from "../video-data.js";
import { PAGE_BRAND_STYLES } from "../page-brand-ui.js";

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
    ${PAGE_BRAND_STYLES}
    <main class="content-page prestige-page">
      <article class="content-inner prestige-shell">
        <section class="prestige-hero">
          <div>
            <span class="prestige-kicker">VIDEO ARCHIVE · WAR ROOM · WHITE HOUSE · INTERVIEWS</span>
            <h1>Natalie G. Winters Videos</h1>
            <p class="prestige-deck">A growing archive of Natalie G. Winters clips, War Room broadcasts, White House reports, interviews and investigations covering foreign influence, institutions, political power and national security.</p>
          </div>
          <aside class="prestige-summary">
            <div class="prestige-summary-head"><span>ARCHIVE</span><strong>50+ dedicated video pages</strong></div>
            <div class="prestige-summary-row"><span>CORE CATEGORIES</span><strong>China · War Room · White House</strong></div>
            <div class="prestige-summary-row"><span>FORMAT</span><strong>Video + written context</strong></div>
            <div class="prestige-summary-row"><span>ONGOING</span><strong>New clips continue to be added</strong></div>
          </aside>
        </section>

        <section class="prestige-section" style="margin-top:34px;padding-top:0;border-top:0">
          <div class="prestige-section-head"><h2>Featured video</h2><p>Start with one substantial clip, then move into the full archive by subject.</p></div>
          <div class="video-feature">
            <div class="video-frame"><iframe src="https://rumble.com/embed/v7czn5i/?pub=4kxtac" title="Featured Natalie G. Winters video" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
            <div class="video-copy"><span>FEATURED NATALIE G. WINTERS VIDEO</span><h2>Start here</h2><p>The archive moves across China, foreign influence, Washington institutions, War Room, White House reporting, interviews and political commentary.</p><a href="/war-room">EXPLORE NATALIE G. WINTERS ON WAR ROOM →</a></div>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>Browse the archive</h2><p>Each video has its own page so the clip, subject and context remain searchable rather than disappearing into a generic embed wall.</p></div>
          <div class="editorial-grid">${renderVideoArchiveCards()}</div>
        </section>

        <section class="prestige-section">
          <div class="prestige-content-grid" style="margin-top:0">
            <div class="prestige-main prestige-prose">
              <h2 style="margin-top:0">The recurring question</h2>
              <p>Across the archive, the subjects change but the reporting keeps returning to the same basic problem: who benefits, who pays, who gets access, who gets protected and what the underlying documents actually show.</p>
              <p>Natalie G. Winters' strongest video work is often where reporting and broadcasting meet: the document becomes the segment, the network becomes visible, and an obscure institutional relationship gets translated into something an audience can actually follow.</p>
            </div>
            <aside class="prestige-rail" aria-label="Video archive shortcuts">
              <div class="prestige-rail-head"><span>JUMP INTO THE ARCHIVE</span><strong>Start with the strongest recurring beats</strong></div>
              <a href="/china"><b>CHINA FILES</b><span>Foreign influence and CCP networks</span></a>
              <a href="/war-room"><b>WAR ROOM</b><span>Broadcast and investigative clips</span></a>
              <a href="/white-house"><b>WHITE HOUSE</b><span>Washington reporting</span></a>
              <a href="/interviews"><b>MEDIA</b><span>External interviews and debates</span></a>
            </aside>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie G. Winters Videos | 50+ Rumble, War Room & Interview Clips",
    description: "Watch more than 50 Natalie G. Winters videos covering War Room, White House reporting, China investigations, foreign influence, interviews and political commentary.",
    canonical: `${SITE.domain}/videos`,
    pageContent,
    posts,
    active: "videos",
  });
}
