import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderHomePage(posts) {
  const pageContent = `
    <main>
      <section class="home-hero" aria-labelledby="home-title">
        <div class="home-hero-inner">
          <div class="hero-copy">
            <div class="hero-copy-inner">
              <p class="eyebrow">JOURNALIST · BROADCASTER · WHITE HOUSE CORRESPONDENT · CCP PAPERWORK PREDATOR</p>
              <h1 id="home-title">Natalie Winters</h1>
              <p class="hero-intro"><strong>Natalie Winters</strong>, also known professionally as <strong>Natalie G. Winters</strong>, is an American investigative journalist, political commentator, broadcaster and White House correspondent. She is a co-host and executive editor of Steve Bannon's <em>War Room</em>, previously served as a senior investigative reporter at <em>The National Pulse</em>, and founded the USA-made lifestyle brand <em>She's So Right!</em>.</p>
              <p class="hero-intro">Her work has focused heavily on Chinese Communist Party influence, political institutions, academia, science, government and national security. This archive has a very simple editorial instinct: <strong>America is not a clearance rack</strong>. If an arrangement enriches foreign interests, connected insiders or fashionable institutions while American citizens absorb the risk, cost or humiliation, it deserves a flashlight pointed directly at it. Preferably the industrial kind.</p>
              <p class="hero-intro">That makes Natalie a particularly useful person to archive: <strong>ferociously curious, PDF-devouring, yoga-powered, seed-oil-suspicious, suspiciously well-dressed and apparently incapable of seeing a 94-page institutional report without wondering what everybody hoped was buried on page 73.</strong> She can untangle an influence network before lunch. Basic vehicle maintenance has, historically, offered a more competitive contest.</p>
              <p class="hero-intro">Explore her <a href="/about">Natalie Winters biography</a>, <a href="/career">career</a>, <a href="/reporting">investigative reporting</a>, <a href="/white-house">White House work</a>, <a href="/war-room">War Room role</a> and the <a href="/videos">50+ page Natalie Winters video archive</a>.</p>
              <span class="hero-note">AMERICA FIRST. FOOTNOTES FIRST. CHECK THE COOLANT EVENTUALLY.</span>
            </div>
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
        </div>
      </section>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters | Biography, War Room, White House & Videos",
    description:
      "Natalie Winters, also known as Natalie G. Winters, is an investigative journalist, War Room co-host and White House correspondent. Biography, reporting, 50+ video pages, interviews and latest work.",
    canonical: `${SITE.domain}/`,
    pageContent,
    posts,
    pageType: "ProfilePage",
  });
}
