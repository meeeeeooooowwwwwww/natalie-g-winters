import { SITE } from "../config.js";
import { renderGlennBeckCompactPlayer } from "../iheart-player.js";
import { renderArticleCards, renderLayout } from "../layout.js";
import { escapeHtml } from "../utils.js";
import { renderRecentRumbleCards } from "../recent-rumble.js";

export function renderHomePage(posts) {
  const featuredYouTubeId = "ZyhrYis509A";

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
              <span>FEATURED VIDEO · JUST FOR FUN</span>
              <a href="https://www.youtube.com/watch?v=${featuredYouTubeId}" target="_blank" rel="noopener noreferrer">WATCH ON YOUTUBE →</a>
            </div>
            <div class="home-video-frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/${featuredYouTubeId}?rel=0"
                title="Aqua - Barbie Girl (Official Music Video)"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                allow="encrypted-media; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div class="home-video-feature-caption">
              <strong>A brief interruption to the regular programming</strong>
              <span>Aqua · Barbie Girl · YouTube</span>
            </div>
          </div>
        </div>
      </section>

      <section class="brand-ribbon-wrap" aria-label="Reporting areas and media outlets">
        <div class="brand-ribbon home-brand-ribbon">
          <span class="brand-ribbon-label">REPORTING &amp; MEDIA</span>
          <a class="brand-mark brand-mark--whitehouse" href="/white-house" aria-label="Read Natalie G. Winters White House reporting"><img src="/images/white-house-mark.svg" alt="The White House" width="320" height="170" loading="lazy" decoding="async"></a>
          <a class="brand-mark brand-mark--warroom" href="/war-room" aria-label="Bannon's War Room">
            <img src="https://www.omnycontent.com/d/clips/e73c998e-6e60-432f-8610-ae210140c5b1/361b7027-9198-497d-8d04-b212011690dc/3e6b2165-0d3b-4e42-8c90-b42a00f7b5c7/image.jpg?size=Large&amp;t=1776009837" alt="Bannon's War Room" loading="lazy" decoding="async" referrerpolicy="no-referrer">
          </a>
          <a class="brand-mark brand-mark--oan" href="https://www.oann.com/" target="_blank" rel="noopener noreferrer" aria-label="One America News">
            <img src="/images/oan-wordmark.svg" alt="One America News (OAN)" width="320" height="130" loading="lazy" decoding="async">
          </a>
          <a class="brand-mark brand-mark--rav" href="https://americasvoice.news/" target="_blank" rel="noopener noreferrer" aria-label="Real America's Voice">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Logo_Real_America%27s_Voice.svg" alt="Real America's Voice" loading="lazy" decoding="async">
          </a>
          <a class="brand-mark brand-mark--glenn" href="https://www.glennbeck.com/" target="_blank" rel="noopener noreferrer" aria-label="The Glenn Beck Program">
            <img src="https://premierenetworks.s3.amazonaws.com/logo/2021-06/GlennBeckLogo.png" alt="The Glenn Beck Program" loading="lazy" decoding="async" referrerpolicy="no-referrer">
          </a>
        </div>
      </section>

      <section class="home-section white" aria-labelledby="home-reporting-title">
        <div class="home-section-inner">
          <div class="home-section-head">
            <div>
              <span>FROM HER SUBSTACK</span>
              <h2 id="home-reporting-title">Latest reporting</h2>
            </div>
            <p>Recent reporting from Natalie G. Winters’ Substack. Each headline links directly to her original article, preserving the publisher’s title and publication date.</p>
          </div>
          ${renderArticleCards(posts, 5)}
        </div>
      </section>

      <section class="home-section" aria-labelledby="home-video-title">
        <div class="home-section-inner">
          <div class="home-section-head">
            <div>
              <span>WATCH NATALIE</span>
              <h2 id="home-video-title">Recent video appearances</h2>
            </div>
            <p>Newer Rumble broadcasts with original thumbnails. Tap Play to watch here without leaving the website; the original publisher link remains available below each video.</p>
          </div>
          ${renderRecentRumbleCards()}
        </div>
      </section>

      <section class="home-section white" aria-labelledby="latest-interview-title">
        <div class="home-section-inner">
          <div class="home-section-head">
            <div>
              <span>VERIFIED MEDIA APPEARANCE · OCTOBER 29, 2026</span>
              <h2 id="latest-interview-title">Natalie Winters on The Glenn Beck Program</h2>
            </div>
            <p>Natalie discusses her reporting on midterm-election preparations during Glenn Beck’s 29 October broadcast. <a href="/interviews">ALL INTERVIEWS →</a></p>
          </div>
          ${renderGlennBeckCompactPlayer()}
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
