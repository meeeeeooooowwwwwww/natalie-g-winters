import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderHomePage(posts) {
  const pageContent = `
    <main>
      <section class="home-hero" aria-labelledby="home-title">
        <div class="home-hero-inner">
          <div class="hero-copy">
            <div class="hero-copy-inner">
              <p class="eyebrow">WHITE HOUSE · WAR ROOM · INVESTIGATIONS</p>
              <h1 id="home-title">Natalie Winters</h1>
              <p class="hero-headline">Power, politics and the paper trail behind both.</p>
              <p class="hero-summary"><strong>Natalie Winters</strong> is a White House correspondent, investigative journalist and <em>War Room</em> co-host known for reporting on foreign influence, national security and the institutions shaping American politics.</p>

              <nav class="hero-actions" aria-label="Explore Natalie Winters">
                <a href="/about">BIOGRAPHY <span aria-hidden="true">→</span></a>
                <a href="/articles">LATEST REPORTING <span aria-hidden="true">→</span></a>
                <a href="/videos">VIDEO ARCHIVE <span aria-hidden="true">→</span></a>
              </nav>

              <div class="hero-proof" aria-label="Natalie Winters archive highlights">
                <span><b>WHITE HOUSE</b> correspondent</span>
                <span><b>WAR ROOM</b> co-host &amp; executive editor</span>
                <span><b>50+</b> dedicated video pages</span>
              </div>
            </div>
          </div>

          <div class="hero-media">
            <div class="hero-media-header">
              <span>FEATURED VIDEO</span>
              <a href="/videos">VIEW ARCHIVE →</a>
            </div>

            <div class="hero-video" aria-label="Natalie Winters featured video">
              <iframe
                src="${SITE.rumbleEmbed}"
                title="Natalie Winters featured video"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowfullscreen
                scrolling="no"
                loading="lazy"
              ></iframe>
            </div>

            <nav class="hero-quick-grid" aria-label="Explore Natalie Winters coverage">
              <a class="hero-quick-card" href="/china">
                <span>CHINA FILES</span>
                <strong>Foreign influence, United Front networks and the documents connecting them.</strong>
                <small>OPEN FILES →</small>
              </a>
              <a class="hero-quick-card" href="/war-room">
                <span>WAR ROOM</span>
                <strong>Investigations, broadcasts and the paper trail brought onto air.</strong>
                <small>ENTER WAR ROOM →</small>
              </a>
              <a class="hero-quick-card" href="/white-house">
                <span>WHITE HOUSE</span>
                <strong>Briefing-room reporting and political coverage from Washington.</strong>
                <small>VIEW COVERAGE →</small>
              </a>
            </nav>
          </div>
        </div>
      </section>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters | White House Correspondent & Investigative Journalist",
    description:
      "Natalie Winters is a White House correspondent, investigative journalist and War Room co-host. Biography, reporting, White House coverage, interviews and 50+ video pages.",
    canonical: `${SITE.domain}/`,
    pageContent,
    posts,
    pageType: "ProfilePage",
  });
}
