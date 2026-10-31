import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { escapeHtml, formatDate } from "../utils.js";
import { getRelatedVideos } from "../video-data.js";
import { getVideoCopy } from "../video-copy.js";
import { getVideoThumbnail } from "../video-thumbnails.js";

const CATEGORY_CONTEXT = {
  china: {
    label: "CHINA & NATIONAL SECURITY"
  },
  institutions: {
    label: "INSTITUTIONS"
  },
  investigations: {
    label: "INVESTIGATIONS"
  },
  politics: {
    label: "POLITICAL COMMENTARY"
  },
  "war-room": {
    label: "WAR ROOM"
  },
  "white-house": {
    label: "WHITE HOUSE"
  },
  media: {
    label: "MEDIA & APPEARANCES"
  },
  interviews: {
    label: "INTERVIEWS"
  },
  economy: {
    label: "ECONOMY & INDUSTRY"
  }
};

function cleanTitle(title) {
  return title.replace(/^Natalie Winters[:\s-]*/i, "").trim();
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
            <h1>Natalie G. Winters: ${escapeHtml(titleTopic)}</h1>
            <p class="hero-deck">${escapeHtml(video.summary)}</p>
          </div>
          <aside class="hero-aside"><strong>ORIGINAL BROADCAST</strong> Watch the source recording, confirm the broadcast date and follow any linked original reporting.</aside>
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
              <p>Original publisher description and source-linked context for this appearance.</p>
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
            ${video.relatedReporting ? `<p><a href="${escapeHtml(video.relatedReporting)}" target="_blank" rel="noopener noreferrer">READ THE INVESTIGATION →</a></p>` : ""}
            <h2>About this appearance</h2>
            <p>${escapeHtml(video.summary)}</p>
            <p><strong>Editorial context:</strong> ${escapeHtml(video.angle)}</p>

            <h2>Why this story matters</h2>
            <p>${escapeHtml(copy.why)}</p>

            <h2>Natalie Winters in this clip</h2>
            <p>${escapeHtml(copy.natalie)}</p>
          </div>

          <aside class="detail-rail" aria-label="More Natalie Winters coverage">
            <div class="detail-rail-card">
              <span>ORIGINAL SOURCE</span>
              <strong>Rumble recording</strong>
              <p>Use the original publisher link to check the full broadcast and its accompanying description.</p>
            </div>
            <a class="detail-rail-card detail-rail-link" href="/reporting">
              <span>KEEP DIGGING</span>
              <strong>Investigative reporting</strong>
              <p>Follow the reporting themes, institutions and published investigations behind the clips.</p>
              <b>OPEN REPORTING →</b>
            </a>
            <a class="detail-rail-card detail-rail-link" href="/videos">
              <span>VIDEO ARCHIVE</span>
              <strong>Browse dated video appearances</strong>
              <p>Source-linked videos arranged by known publication or broadcast date.</p>
              <b>BROWSE ALL VIDEOS →</b>
            </a>
          </aside>
        </div>

        <section class="section-block">
          <div class="section-title-row">
            <h2>More Natalie Winters videos</h2>
            <p>Browse other recorded appearances and follow their original publisher links.</p>
          </div>
          <div class="editorial-grid four-up-grid">${renderRelated(video)}</div>
        </section>

        <div class="callout">Explore the recorded broadcasts and interviews in the video library.<small><a href="/videos">Browse the full Natalie G. Winters video archive →</a></small></div>
      </article>
    </main>
  `;

  return renderLayout({
    title: `Natalie G. Winters: ${titleTopic} | Video & Context`,
    description: `${video.summary} Watch the Rumble clip and explore related Natalie Winters reporting, War Room coverage and interviews.`,
    canonical,
    pageContent,
    posts,
    active: "videos",
    video: getVideoThumbnail(video.slug) ? {
      name: video.title,
      description: video.summary,
      thumbnailUrl: getVideoThumbnail(video.slug),
      embedUrl: video.embedUrl,
      duration: video.duration,
    } : null,
  });
}
