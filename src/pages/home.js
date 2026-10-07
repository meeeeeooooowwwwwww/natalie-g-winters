import { SITE } from "../config.js";
import { renderArticleCards, renderLayout } from "../layout.js";
import { escapeHtml, formatDate } from "../utils.js";
import { VIDEOS } from "../video-data.js";
import { getVideoBrand, getVideoThumbnail } from "../video-thumbnails.js";

const FEATURED_VIDEO_SLUGS = [
  "china-ai-models-american-voters",
  "chinese-land-near-us-naval-air-base",
  "white-house-correspondent-announcement",
  "christopher-steele-piers-morgan",
];

function videoBySlug(slug) {
  return VIDEOS.find((video) => video.slug === slug);
}

function renderVideoCard(video) {
  if (!video) return "";

  const thumbnail = getVideoThumbnail(video.slug);
  const brand = getVideoBrand(video.slug, "RUMBLE");
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
          <span>${escapeHtml(brand.toUpperCase())}</span>
          ${date ? `<span>${escapeHtml(date)}</span>` : ""}
        </div>
        <h3>${escapeHtml(video.title)}</h3>
        <p>${escapeHtml(video.summary)}</p>
      </div>
    </a>
  `;
}

export function renderHomePage(posts) {
  const featuredVideos = FEATURED_VIDEO_SLUGS.map(videoBySlug).filter(Boolean);

  const pageContent = `
    <main class="editorial-home">
      <section class="home-publication-hero" aria-labelledby="home-title">
        <div class="home-publication-inner">
          <div class="home-publication-copy">
            <span class="home-kicker">WHITE HOUSE · WAR ROOM · INVESTIGATIONS</span>
            <h1 id="home-title">Natalie G. Winters</h1>
            <p class="home-tagline">Investigative reporting, political media and the paper trail behind the headline.</p>
            <p class="home-summary"><strong>Natalie G. Winters</strong> is a White House correspondent, investigative journalist and <em>War Room</em> co-host and executive editor. This site brings her reporting, broadcasts, interviews and public work together in one visual archive.</p>
            <nav class="home-actions" aria-label="Explore Natalie G. Winters">
              <a href="/articles">READ THE LATEST</a>
              <a href="/videos">WATCH VIDEOS</a>
              <a href="/about">ABOUT NATALIE</a>
            </nav>
          </div>

          <div class="home-video-panel">
            <div class="home-video-head">
              <span>FEATURED VIDEO</span>
              <a href="${escapeHtml(SITE.heroVideoSource)}" target="_blank" rel="noopener noreferrer">WATCH ON YOUTUBE →</a>
            </div>
            <div class="home-video-frame">
              <iframe
                src="${escapeHtml(SITE.heroVideoEmbed)}"
                title="Natalie G. Winters featured video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section class="brand-ribbon-wrap" aria-label="Natalie G. Winters associated media and institutions">
        <div class="brand-ribbon">
          <span class="brand-ribbon-label">ASSOCIATED WITH</span>
          <a class="brand-mark" href="/white-house" aria-label="The White House">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Wh-gov-workmark-logo.svg" alt="The White House" loading="lazy" decoding="async">
          </a>
          <a class="brand-mark" href="/war-room" aria-label="Bannon's War Room">
            <img src="https://storage.warroom.org/images/AVN_YT_Banner_Pandemic_Live_-_smaller.png" alt="Bannon's War Room" loading="lazy" decoding="async" referrerpolicy="no-referrer">
          </a>
          <a class="brand-mark" href="https://www.oann.com/" target="_blank" rel="noopener noreferrer" aria-label="One America News">
            <img src="https://www.oann.com/images/logos/OAN-only-logo.svg" alt="OAN" loading="lazy" decoding="async" referrerpolicy="no-referrer">
          </a>
          <a class="brand-mark" href="https://americasvoice.news/" target="_blank" rel="noopener noreferrer" aria-label="Real America's Voice">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Logo_Real_America%27s_Voice.svg" alt="Real America's Voice" loading="lazy" decoding="async">
          </a>
          <a class="brand-mark" href="https://www.glennbeck.com/" target="_blank" rel="noopener noreferrer" aria-label="The Glenn Beck Program">
            <img src="https://premierenetworks.s3.amazonaws.com/logo/2021-06/GlennBeckLogo.png" alt="The Glenn Beck Program" loading="lazy" decoding="async" referrerpolicy="no-referrer">
          </a>
          <a class="brand-mark text-brand" href="${escapeHtml(SITE.substackHome)}" target="_blank" rel="noopener noreferrer">SUBSTACK</a>
        </div>
      </section>

      <section class="home-section white" aria-labelledby="home-reporting-title">
        <div class="home-section-inner">
          <div class="home-section-head">
            <div>
              <span>FROM HER SUBSTACK</span>
              <h2 id="home-reporting-title">Latest reporting</h2>
            </div>
            <p>The newest investigations are pulled from Natalie’s publication and use the article imagery from the rendered posts rather than generic placeholders.</p>
          </div>
          ${renderArticleCards(posts, 5)}
        </div>
      </section>

      <section class="home-section" aria-labelledby="home-video-title">
        <div class="home-section-inner">
          <div class="home-section-head">
            <div>
              <span>WATCH NATALIE</span>
              <h2 id="home-video-title">Video archive</h2>
            </div>
            <p>Real Rumble thumbnails and publisher attribution make the archive feel like a media library, not a list of links.</p>
          </div>
          <div class="video-thumb-grid">
            ${featuredVideos.map(renderVideoCard).join("")}
          </div>
        </div>
      </section>

      <section class="home-section white">
        <div class="home-section-inner profile-feature">
          <div class="profile-feature-image">
            <img src="${escapeHtml(SITE.images.portrait)}" alt="Natalie G. Winters" width="900" height="1125" loading="lazy" decoding="async">
          </div>
          <div class="profile-feature-copy">
            <span class="home-kicker">REPORTER · BROADCASTER · INVESTIGATOR</span>
            <h2>A publication-first home for the work.</h2>
            <p>The site is designed to put Natalie’s reporting, appearances and visual media ahead of decorative interface elements. Her Substack remains the source publication; this site adds a structured archive across articles, video, biography, White House coverage and War Room work.</p>
            <a href="/about">READ THE BIOGRAPHY →</a>
          </div>
        </div>
      </section>
    </main>
  `;

  return renderLayout({
    title: "Natalie G. Winters | Investigative Journalist, White House Correspondent & War Room",
    description: "Natalie G. Winters reporting, Substack investigations, White House coverage, War Room videos, interviews and media archive.",
    canonical: `${SITE.domain}/`,
    pageContent,
    posts,
    pageType: "ProfilePage",
    showLatestReporting: false,
  });
}
