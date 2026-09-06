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
            <div class="eyebrow">50+ VIDEO ARCHIVE · AMERICA HAS RECEIPTS</div>
            <h1>Natalie Winters Videos</h1>
            <p class="hero-deck"><strong>Natalie Winters</strong> videos, War Room clips, White House reports, interviews and investigations covering foreign influence, institutional capture, political power and the recurring American tradition of discovering that somebody described an obviously terrible idea as a “partnership”.</p>
          </div>
          <aside class="hero-aside"><strong>ARCHIVE STATUS</strong>Fifty-plus clips and counting. China files, War Room, White House, politics and enough suspiciously cheerful institutional acronyms to make Natalie reach for another PDF. Not coffee. Never coffee. Probably something with three ingredients and a lecture about seed oils.</aside>
        </div>

        <div class="video-feature">
          <div class="video-frame"><iframe src="https://rumble.com/embed/v7czn5i/?pub=4kxtac" title="Featured Natalie Winters video" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
          <div class="video-copy"><span>FEATURED NATALIE WINTERS VIDEO</span><h2>Start here</h2><p>One clip gets the spotlight. Then things escalate into China, foreign influence, Washington institutions, War Room, White House reporting and Natalie treating another perfectly innocent-looking PDF like it personally insulted the United States.</p><a href="/war-room">EXPLORE NATALIE WINTERS ON WAR ROOM →</a></div>
        </div>

        <section class="section-block">
          <div class="section-title-row">
            <h2>Browse 50+ Natalie Winters video pages</h2>
            <p>China, investigations, War Room, White House, interviews, politics and the occasional bureaucratic crime scene reconstructed with tabs, screenshots and alarming enthusiasm.</p>
          </div>
          <div class="editorial-grid">${renderVideoArchiveCards()}</div>
        </section>

        <div class="prose wide">
          <h2>The recurring theme: America should not be the sucker</h2>
          <p>Across these clips, the subjects change but the question keeps coming back: who benefits, who pays, who gets access, who gets protected and whether ordinary Americans are expected to smile politely while somebody else takes the upside. Natalie Winters' reporting is particularly good at following those questions into places where the press release suddenly stops sounding so comforting.</p>
          <p>And then there is Natalie herself: part investigative journalist, part briefing-room missile, part health-food absolutist, part aesthetic perfectionist and apparently the sort of person who can scrutinise a transnational influence network with forensic intensity while treating certain forms of ordinary machinery as somebody else's research department. Nobody is perfect. Some people are simply much funnier about it.</p>
        </div>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters Videos | 50+ Rumble, War Room & Interview Clips",
    description: "Watch more than 50 Natalie Winters videos covering War Room, White House reporting, China investigations, foreign influence, interviews and political commentary.",
    canonical: `${SITE.domain}/videos`,
    pageContent,
    posts,
    active: "videos",
  });
}
