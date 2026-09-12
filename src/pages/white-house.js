import { SITE } from "../config.js";
import { externalImage, renderLayout } from "../layout.js";
import { PAGE_BRAND_STYLES } from "../page-brand-ui.js";

export function renderWhiteHousePage(posts) {
  const pageContent = `
    ${PAGE_BRAND_STYLES}
    <main class="content-page prestige-page">
      <article class="content-inner prestige-shell">
        <section class="prestige-hero">
          <div>
            <span class="prestige-kicker">WHITE HOUSE · WASHINGTON · NEW MEDIA PRESS CORPS</span>
            <h1>Natalie G. Winters at the White House</h1>
            <p class="prestige-deck">In January 2025, Natalie G. Winters entered the White House press environment as <em>War Room</em>'s correspondent, becoming one of the most recognisable figures in the administration's expanded new-media press contingent.</p>
          </div>
          <aside class="prestige-summary">
            <div class="prestige-summary-head"><span>WHITE HOUSE ROLE</span><strong>Correspondent since January 2025</strong></div>
            <div class="prestige-summary-row"><span>FIRST DAY</span><strong>January 28, 2025</strong></div>
            <div class="prestige-summary-row"><span>BROADCAST HOME</span><strong>Steve Bannon's War Room</strong></div>
            <div class="prestige-summary-row"><span>FORMAT</span><strong>Press-room access · lawn hits · live reporting</strong></div>
          </aside>
        </section>

        <nav class="brand-ribbon" aria-label="White House media and source relationships">
          <a class="brand-ribbon-card" href="#white-house-story">
            <small>WASHINGTON · D.C.</small>
            <span class="brand-logo-box"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/3/36/Wh-gov-workmark-logo.svg" alt="The White House" loading="lazy" decoding="async"></span>
            <strong class="role">CORRESPONDENT</strong><span class="detail">White House press coverage</span>
          </a>
          <a class="brand-ribbon-card" href="https://warroom.org/tag/natalie-winters/" target="_blank" rel="noopener noreferrer">
            <small>BROADCAST HOME</small>
            <span class="brand-logo-box"><img src="https://i.scdn.co/image/ab6765630000ba8ac40baa59db5008897eff9781" alt="War Room" loading="lazy" decoding="async" referrerpolicy="no-referrer"></span>
            <strong class="role">WAR ROOM</strong><span class="detail">Co-host, executive editor and correspondent</span>
          </a>
          <a class="brand-ribbon-card" href="https://www.cjr.org/analysis/white-house-press-karoline-leavitt-natalie-winters-new-media.php" target="_blank" rel="noopener noreferrer">
            <small>MEDIA-INDUSTRY COVERAGE</small>
            <span class="brand-logo-box"><span class="brand-wordmark">Columbia Journalism Review</span></span>
            <strong class="role">PROFILED</strong><span class="detail">The new-media press shift</span>
          </a>
          <a class="brand-ribbon-card" href="https://www.youtube.com/watch?v=CP-Wzou3NzI" target="_blank" rel="noopener noreferrer">
            <small>TELEVISION</small>
            <span class="brand-logo-box"><img class="reverse" src="https://www.oann.com/images/logos/OAN-only-logo.svg" alt="OAN" loading="lazy" decoding="async" referrerpolicy="no-referrer"></span>
            <strong class="role">THE MATT GAETZ SHOW</strong><span class="detail">White House role and media hierarchy</span>
          </a>
        </nav>

        <section id="white-house-story" class="visual-feature">
          <figure>
            ${externalImage(SITE.images.whiteHouse, "Natalie G. Winters reporting outside the White House")}
            <figcaption>Natalie G. Winters reporting from the White House</figcaption>
          </figure>
          <div class="visual-feature-copy">
            <span class="prestige-kicker">THE WHITE HOUSE CHAPTER</span>
            <div class="prestige-prose">
              <p><strong>Natalie G. Winters began serving as War Room's White House correspondent in January 2025.</strong> War Room's January 28 show featured her reporting live from the White House as the programme formally announced the role.</p>
              <p>Her arrival coincided with the Trump administration's effort to widen access for podcasters, digital outlets and other non-traditional media. That placed Winters directly inside a broader argument about who counts as White House media, how audiences are built, and whether old gatekeeping structures still match the modern information environment.</p>
              <p><strong>Columbia Journalism Review</strong> later profiled Winters as part of that shift, describing how War Room's plan for a White House correspondent developed and how new conservative media were moving into spaces previously dominated by legacy organisations.</p>
              <p>Since then, Winters has combined briefing-room access and White House reporting with regular War Room hosting, investigative work and external media appearances.</p>
            </div>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>From lawn hit to press-room fixture</h2><p>The White House chapter is not a single appearance. It is now a recurring part of her professional identity.</p></div>
          <div class="prestige-milestones">
            <article class="prestige-milestone"><span>JAN 28 · 2025</span><strong>Role announced</strong><small>War Room introduces Natalie G. Winters as its White House correspondent.</small></article>
            <article class="prestige-milestone"><span>NEW MEDIA</span><strong>Expanded press access</strong><small>Part of a broader effort to bring digital and independent media into the room.</small></article>
            <article class="prestige-milestone"><span>ON AIR</span><strong>Live reporting + hosting</strong><small>White House reporting sits alongside regular War Room broadcasting.</small></article>
            <article class="prestige-milestone"><span>PRESS ROOM</span><strong>Briefing access</strong><small>Coverage moves beyond commentary into direct Washington access.</small></article>
            <article class="prestige-milestone"><span>PROFILE</span><strong>National attention</strong><small>Her role becomes a story in its own right across political and media-industry coverage.</small></article>
            <article class="prestige-milestone"><span>ONGOING</span><strong>White House correspondent</strong><small>A continuing professional chapter rather than a one-off credential.</small></article>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>The announcement</h2><p>The original War Room clip that made the role public.</p></div>
          <div class="video-feature">
            <div class="video-frame"><iframe src="https://rumble.com/embed/v6c48kg/?pub=4" title="Natalie G. Winters announced as War Room White House correspondent" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
            <div class="video-copy"><span>WAR ROOM · JANUARY 28, 2025</span><h3>The White House correspondent announcement</h3><p>War Room formally introduces Natalie G. Winters in the role while she reports live from the White House.</p><a href="https://warroom.org/bannons-warroom-show-clip-roundup-28-jan-25-am/" target="_blank" rel="noopener noreferrer">OPEN WAR ROOM SOURCE →</a></div>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>Further reading</h2><p>Contemporary coverage and first-party material documenting the White House chapter.</p></div>
          <div class="source-list">
            <a class="source-link" href="https://www.cjr.org/analysis/white-house-press-karoline-leavitt-natalie-winters-new-media.php" target="_blank" rel="noopener noreferrer"><div><span>Columbia Journalism Review: The New Kids in the Room</span><small>February 19, 2025</small></div><b>→</b></a>
            <a class="source-link" href="https://warroom.org/bannons-warroom-show-clip-roundup-28-jan-25-am/" target="_blank" rel="noopener noreferrer"><div><span>War Room: White House correspondent announcement</span><small>January 28, 2025</small></div><b>→</b></a>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie G. Winters White House Correspondent | War Room",
    description: "Natalie G. Winters at the White House: War Room correspondent since January 2025, new-media press access, reporting, video and career context.",
    canonical: `${SITE.domain}/white-house`,
    pageContent,
    posts,
    active: "white-house",
  });
}
