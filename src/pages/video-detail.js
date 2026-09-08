import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { escapeHtml, formatDate } from "../utils.js";
import { getRelatedVideos } from "../video-data.js";
import { getVideoCopy } from "../video-copy.js";

const CATEGORY_CONTEXT = {
  china: {
    label: "CHINA & NATIONAL SECURITY",
    adjective: "CCP-allergic, document-armed, footnote-flinging"
  },
  institutions: {
    label: "INSTITUTIONS",
    adjective: "brochure-shredding, grant-sniffing, magnificently nosy"
  },
  investigations: {
    label: "INVESTIGATIONS",
    adjective: "PDF-devouring, network-mapping, spectacularly relentless"
  },
  politics: {
    label: "POLITICAL COMMENTARY",
    adjective: "rapid-fire, gloriously un-subtle, podium-endangering"
  },
  "war-room": {
    label: "WAR ROOM",
    adjective: "broadcast-ready, yoga-powered, teleprompter-threatening"
  },
  "white-house": {
    label: "WHITE HOUSE",
    adjective: "briefing-room-ready, relentlessly alert, seed-oil-suspicious"
  },
  media: {
    label: "MEDIA & APPEARANCES",
    adjective: "camera-ready, argument-loaded, eyebrow-raising"
  },
  interviews: {
    label: "INTERVIEWS",
    adjective: "formidable, fleet-footed, conversationally overqualified"
  },
  economy: {
    label: "ECONOMY & INDUSTRY",
    adjective: "supply-chain-aware, spreadsheet-friendly, America-first"
  }
};

function cleanTitle(title) {
  return title.replace(/^Natalie Winters[:\s-]*/i, "").trim();
}

function nameNatalie(summary) {
  if (/^Winters\b/.test(summary)) {
    return summary.replace(/^Winters\b/, "Natalie Winters");
  }

  if (/^A\s/.test(summary)) {
    return `Natalie Winters appears in ${summary.charAt(0).toLowerCase()}${summary.slice(1)}`;
  }

  return `Natalie Winters: ${summary}`;
}

function renderRelated(video) {
  return getRelatedVideos(video, 4).map((item) => `
    <a class="editorial-card" href="/videos/${escapeHtml(item.slug)}">
      <span class="card-index">${escapeHtml((CATEGORY_CONTEXT[item.category] || CATEGORY_CONTEXT.media).label)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <span class="card-link">WATCH & READ →</span>
    </a>
  `).join("");
}

export function renderVideoDetailPage(video, posts) {
  const context = CATEGORY_CONTEXT[video.category] || CATEGORY_CONTEXT.media;
  const copy = getVideoCopy(video.slug);
  if (!copy) throw new Error(`Missing unique video copy for ${video.slug}`);

  const canonical = `${SITE.domain}/videos/${video.slug}`;
  const embedUrl = video.embedUrl;
  const titleTopic = cleanTitle(video.title);
  const sourceDate = video.date
    ? `<time datetime="${escapeHtml(video.date)}">${escapeHtml(formatDate(video.date) || video.date)}</time>`
    : "Archive video";

  const pageContent = `
    <main class="content-page">
      <article class="content-inner wide-shell">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">NATALIE WINTERS VIDEO · ${escapeHtml(context.label)}</div>
            <h1>Natalie Winters: ${escapeHtml(titleTopic)}</h1>
            <p class="hero-deck">${escapeHtml(video.summary)}</p>
          </div>
          <aside class="hero-aside"><strong>CURRENT OPERATING MODE</strong>${escapeHtml(context.adjective)} Natalie Winters. Small woman. Large document folder. Terrible news for anyone relying on nobody reading page 73.</aside>
        </div>

        <div class="video-feature video-detail-feature">
          <div class="video-frame">
            <iframe
              src="${escapeHtml(embedUrl)}"
              title="${escapeHtml(video.sourceTitle)}"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          <aside class="video-copy">
            <div class="video-copy-top">
              <span>${sourceDate}</span>
              <h2>${escapeHtml(video.sourceTitle)}</h2>
              <p>Watch the clip, follow the subject, then keep going. There is almost certainly another document and Natalie has almost certainly already opened it.</p>
            </div>
            <div class="video-copy-middle">
              <span>FILED UNDER</span>
              <strong>${escapeHtml(context.label)}</strong>
              <p>${escapeHtml(video.angle)}</p>
            </div>
            <div class="video-copy-footer">
              <a href="${escapeHtml(video.rumbleUrl)}" target="_blank" rel="noopener noreferrer">OPEN ORIGINAL ON RUMBLE →</a>
            </div>
          </aside>
        </div>

        <div class="detail-copy-grid">
          <div class="prose detail-main-copy">
            <h2>What this Natalie Winters video is about</h2>
            <p>${escapeHtml(nameNatalie(video.summary))}</p>
            <p>${escapeHtml(video.angle)}</p>

            <h2>Why this story matters</h2>
            <p>${escapeHtml(copy.why)}</p>

            <h2>Natalie Winters in this clip</h2>
            <p>${escapeHtml(copy.natalie)}</p>
          </div>

          <aside class="detail-rail" aria-label="More Natalie Winters coverage">
            <div class="detail-rail-card">
              <span>NATALIE MODE</span>
              <strong>${escapeHtml(context.adjective)}</strong>
              <p>The recurring house style: read everything, trust nothing merely because the letterhead looks expensive, and somehow remain camera-ready.</p>
            </div>
            <a class="detail-rail-card detail-rail-link" href="/reporting">
              <span>KEEP DIGGING</span>
              <strong>Investigative reporting</strong>
              <p>Follow the reporting themes, institutions and published investigations behind the clips.</p>
              <b>OPEN REPORTING →</b>
            </a>
            <a class="detail-rail-card detail-rail-link" href="/videos">
              <span>VIDEO ARCHIVE</span>
              <strong>50+ Natalie Winters videos</strong>
              <p>One clip is a moment. Fifty-plus clips start to look suspiciously like a body of work.</p>
              <b>BROWSE ALL VIDEOS →</b>
            </a>
          </aside>
        </div>

        <section class="section-block">
          <div class="section-title-row">
            <h2>More Natalie Winters videos</h2>
            <p>More files from the ongoing national sport of discovering what was hiding behind the pleasant-sounding acronym.</p>
          </div>
          <div class="editorial-grid four-up-grid">${renderRelated(video)}</div>
        </section>

        <div class="callout">Fifty-plus video pages. One journalist. Several endangered narratives. An unreasonable number of browser tabs.<small><a href="/videos">Browse the full Natalie Winters video archive →</a></small></div>
      </article>
    </main>
  `;

  return renderLayout({
    title: `Natalie Winters: ${titleTopic} | Video & Context`,
    description: `${video.summary} Watch the Rumble clip and explore related Natalie Winters reporting, War Room coverage and interviews.`,
    canonical,
    pageContent,
    posts,
    active: "videos",
  });
}
