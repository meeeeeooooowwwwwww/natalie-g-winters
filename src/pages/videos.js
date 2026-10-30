import { SITE } from "../config.js";
import { renderGlennBeckCompactPlayer } from "../iheart-player.js";
import { renderLayout } from "../layout.js";
import { escapeHtml, formatDate } from "../utils.js";
import { VIDEOS } from "../video-data.js";
import { getVideoBrand, getVideoThumbnail } from "../video-thumbnails.js";
import { RECENT_RUMBLE_VIDEOS, renderRecentRumbleCards } from "../recent-rumble.js";

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
          <span>${brand === category ? (date ? escapeHtml(date) : "") : `${escapeHtml(category)}${date ? ` · ${escapeHtml(date)}` : ""}`}</span>
        </div>
        <h3>${escapeHtml(video.title)}</h3>
        <p>${escapeHtml(video.summary)}</p>
      </div>
    </a>
  `;
}

export function renderVideosPage(posts) {
  const featured = VIDEOS[0];

  const archive = VIDEOS.filter((video) => video.slug !== featured?.slug);

  const pageContent = `
    <main>
      <div class="video-publication-page">
        <header class="video-publication-header">
          <div>
            <span>WATCH · WAR ROOM · WHITE HOUSE · INTERVIEWS</span>
            <h1>Natalie G. Winters Videos</h1>
          </div>
          <p>Watch recent Rumble appearances directly on this page using verified embedded players and thumbnails. Earlier interviews and archive recordings follow below.</p>
        </header>

        <section class="recent-rumble-section" aria-label="Latest Natalie Winters Rumble video uploads">
          <div class="video-library-head">
            <h2>Latest Rumble videos</h2>
            <p>${RECENT_RUMBLE_VIDEOS.length} source-linked uploads · late October 2026</p>
          </div>
          ${renderRecentRumbleCards(RECENT_RUMBLE_VIDEOS)}
        </section>

        ${featured ? `
          <section class="video-lead" aria-label="Earlier Natalie G. Winters video from the archive">
            <div class="video-frame">
              <iframe
                src="${escapeHtml(featured.embedUrl)}"
                title="${escapeHtml(featured.title)}"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowfullscreen
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
            <div class="video-lead-copy">
              <span>FROM THE ARCHIVE · ${escapeHtml(displayBrand(featured))}</span>
              <h2>${escapeHtml(featured.title)}</h2>
              <p>${escapeHtml(featured.summary)}</p>
              <div class="archive-meta">
                ${formatDate(featured.date) ? `<time datetime="${escapeHtml(featured.date)}">${escapeHtml(formatDate(featured.date))}</time><span>·</span>` : ""}
                <a href="${escapeHtml(featured.rumbleUrl)}" target="_blank" rel="noopener noreferrer">WATCH ARCHIVE VIDEO ON RUMBLE ↗</a>
              </div>
            </div>
          </section>
        ` : ""}

        <section aria-label="Latest verified media appearance">
          <div class="video-library-head">
            <h2>Recent broadcast appearance</h2>
            <p>29 October 2026 · The Glenn Beck Program</p>
          </div>
          <p>Natalie Winters discusses her reporting on the 2026 midterm election preparations. Listen to Natalie’s 29 October interview using the compact episode player below. Playback starts only when selected.</p>
          ${renderGlennBeckCompactPlayer()}
        </section>

        <section>
          <div class="video-library-head">
            <h2>Earlier video archive</h2>
            <p>${VIDEOS.length} documented clips and appearances · most recent embedded archive clip: ${escapeHtml(formatDate(VIDEOS[0]?.date) || "archive")}</p>
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
