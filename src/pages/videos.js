import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { escapeHtml, formatDate } from "../utils.js";
import { VIDEOS } from "../video-data.js";
import { getVideoBrand, getVideoThumbnail } from "../video-thumbnails.js";

const CATEGORY_LABELS = {
  china: "CHINA",
  institutions: "INSTITUTIONS",
  investigations: "INVESTIGATIONS",
  politics: "POLITICS",
  "war-room": "WAR ROOM",
  "white-house": "WHITE HOUSE",
  media: "MEDIA",
  interviews: "INTERVIEWS",
  economy: "ECONOMY",
};

function displayBrand(video) {
  const raw = getVideoBrand(video.slug, "RUMBLE");

  if (/bannon/i.test(raw)) return "WAR ROOM";
  if (/real.?america/i.test(raw)) return "REAL AMERICA'S VOICE";
  if (/one america/i.test(raw)) return "OAN";
  if (/piers morgan/i.test(video.sourceTitle || "")) return "PIERS MORGAN";
  if (/glenn beck/i.test(video.sourceTitle || "")) return "GLENN BECK";
  if (/white house/i.test(video.title || "") || video.category === "white-house") return "WHITE HOUSE";

  return String(raw || CATEGORY_LABELS[video.category] || "RUMBLE").toUpperCase();
}

function renderVideoCard(video) {
  const thumbnail = getVideoThumbnail(video.slug);
  const brand = displayBrand(video);
  const category = CATEGORY_LABELS[video.category] || "VIDEO";
  const date = formatDate(video.date);

  return `
    <a class="video-thumb-card" href="/videos/${escapeHtml(video.slug)}">
      <div class="video-thumb">
        ${thumbnail
          ? `<img src="${escapeHtml(thumbnail)}" alt="Video thumbnail for ${escapeHtml(video.title)}" width="1280" height="720" loading="lazy" decoding="async" referrerpolicy="no-referrer">`
          : `<div class="archive-no-image">NATALIE G. WINTERS</div>`}
      </div>
      <div class="video-card-copy">
        <div class="video-card-brand">
          <span>${escapeHtml(brand)}</span>
          <span>${escapeHtml(category)}${date ? ` · ${escapeHtml(date)}` : ""}</span>
        </div>
        <h3>${escapeHtml(video.title)}</h3>
        <p>${escapeHtml(video.summary)}</p>
      </div>
    </a>
  `;
}

export function renderVideosPage(posts) {
  const featured =
    VIDEOS.find((video) => video.slug === "china-ai-models-american-voters") ||
    VIDEOS[0];

  const archive = VIDEOS.filter((video) => video.slug !== featured?.slug);

  const pageContent = `
    <main>
      <div class="video-publication-page">
        <header class="video-publication-header">
          <div>
            <span>WATCH · WAR ROOM · WHITE HOUSE · INTERVIEWS</span>
            <h1>Natalie G. Winters Videos</h1>
          </div>
          <p>A visual archive built from the real Rumble thumbnails and publisher metadata, with dedicated pages for context and search.</p>
        </header>

        ${featured ? `
          <section class="video-lead" aria-label="Featured Natalie G. Winters video">
            <div class="video-frame">
              <iframe
                src="${escapeHtml(featured.embedUrl)}"
                title="${escapeHtml(featured.title)}"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
            <div class="video-lead-copy">
              <span>${escapeHtml(displayBrand(featured))} · ${escapeHtml(CATEGORY_LABELS[featured.category] || "VIDEO")}</span>
              <h2>${escapeHtml(featured.title)}</h2>
              <p>${escapeHtml(featured.summary)}</p>
              <div class="archive-meta">
                ${formatDate(featured.date) ? `<time datetime="${escapeHtml(featured.date)}">${escapeHtml(formatDate(featured.date))}</time><span>·</span>` : ""}
                <a href="${escapeHtml(featured.rumbleUrl)}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none">WATCH ON RUMBLE ↗</a>
              </div>
            </div>
          </section>
        ` : ""}

        <section>
          <div class="video-library-head">
            <h2>Video library</h2>
            <p>${VIDEOS.length} clips and appearances currently indexed</p>
          </div>
          <div class="video-library-grid">
            ${archive.map(renderVideoCard).join("")}
          </div>
        </section>
      </div>
    </main>
  `;

  return renderLayout({
    title: "Natalie G. Winters Videos | War Room, White House & Interviews",
    description: "Watch Natalie G. Winters videos, War Room clips, White House reporting, interviews and investigations with a visual Rumble archive.",
    canonical: `${SITE.domain}/videos`,
    pageContent,
    posts,
    active: "videos",
    pageType: "CollectionPage",
  });
}
