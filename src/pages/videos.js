import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderVideosPage(posts) {
  const pageContent = `
    <main class="content-page">
      <article class="content-inner wide-shell">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">VIDEO ARCHIVE</div>
            <h1>Natalie Winters Videos</h1>
            <p class="hero-deck">Selected Natalie Winters broadcasts, War Room clips and appearances, with enough context around each video that the page is useful even to people who do not immediately press play.</p>
          </div>
          <aside class="hero-aside"><strong>A SMALL EDITORIAL PRINCIPLE</strong>Embeds are useful. Thirty silent rectangles with no explanation are not. The robots deserve paragraphs too.</aside>
        </div>

        <div class="video-feature">
          <div class="video-frame"><iframe src="${SITE.rumbleEmbed}" title="Featured Natalie Winters video" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
          <div class="video-copy"><span>FEATURED VIDEO</span><h3>Natalie Winters on camera</h3><p>The site's current featured Rumble video, preserved as the lead item while the wider archive builds around it.</p><a href="/war-room">EXPLORE WAR ROOM COVERAGE →</a></div>
        </div>

        <section class="section-block">
          <div class="section-title-row"><h2>War Room archive clips</h2><p>Selected moments tied to major parts of her career and reporting.</p></div>
          <div class="video-grid">
            <article class="video-card"><div class="video-frame"><iframe src="https://rumble.com/embed/v6c48kg/?pub=4" title="Natalie Winters announced as War Room White House correspondent" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div><div class="video-card-copy"><h3>Live from the White House</h3><p>War Room announces Winters as its White House correspondent on January 28, 2025.</p><a href="/white-house">WHITE HOUSE CONTEXT →</a></div></article>
            <article class="video-card"><div class="video-frame"><iframe src="https://rumble.com/embed/v1n9zuh/?pub=chmqx" title="Natalie Winters discusses Chinese warfare" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div><div class="video-card-copy"><h3>China and different forms of warfare</h3><p>An earlier clip showing the China and national-security beat that became a defining strand of her work.</p><a href="/china">EXPLORE CHINA FILES →</a></div></article>
          </div>
        </section>

        <section class="section-block">
          <div class="section-title-row"><h2>Longer appearances</h2><p>Not everything worth watching needs another iframe.</p></div>
          <div class="appearance-grid">
            <article class="appearance-card"><span>PBS · FIRING LINE · 2026</span><h3>Natalie Winters and Adam Mockler</h3><p>A public forum at Hofstra University on politics, media, immigration and how each guest defines their role in the new media landscape.</p><a href="https://www.pbs.org/video/natalie-winters-and-adam-mockler-gcgw4i/" target="_blank" rel="noopener noreferrer">WATCH ON PBS →</a></article>
            <article class="appearance-card"><span>WAR ROOM · TAIPEI · 2025</span><h3>Interview with Taiwan Vice President Hsiao Bi-khim</h3><p>A recorded interview from Taiwan covering cross-strait tensions, defence, U.S.-Taiwan relations and the CCP threat.</p><a href="https://warroom.org/exclusive-taiwans-vice-president-on-the-ccp-threat-and-the-fight-for-freedom/" target="_blank" rel="noopener noreferrer">WATCH / READ WAR ROOM →</a></article>
            <article class="appearance-card"><span>PIERS MORGAN UNCENSORED · 2025</span><h3>Christopher Steele debate</h3><p>Winters challenges former MI6 officer Christopher Steele over the Trump dossier in a widely circulated panel appearance.</p><a href="https://www.breitbart.com/clips/2025/03/20/war-rooms-winters-to-christopher-steele-you-are-the-ultimate-grifter/" target="_blank" rel="noopener noreferrer">VIEW CLIP & CONTEXT →</a></article>
            <article class="appearance-card"><span>OAN · JULY 2026</span><h3>The Matt Gaetz Show</h3><p>A 2026 appearance discussing her role in the press briefing room, media criticism and audience competition.</p><a href="https://www.oann.com/video/the-matt-gaetz-show-video/natalie-winters-joins-the-matt-gaetz-show-with-a-message/" target="_blank" rel="noopener noreferrer">WATCH ON OAN →</a></article>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters Videos | War Room, Rumble & Media Appearances",
    description: "Natalie Winters videos including War Room and Rumble clips, White House reporting, PBS Firing Line, interviews and selected media appearances.",
    canonical: `${SITE.domain}/videos`,
    pageContent,
    posts,
  });
}
