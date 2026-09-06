import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderHomePage(posts) {
  const pageContent = `
    <main>
      <section class="home-hero" aria-labelledby="home-title">
        <div class="home-hero-inner">
          <div class="hero-copy">
            <div class="hero-copy-inner">
              <p class="eyebrow">JOURNALIST · BROADCASTER · WHITE HOUSE CORRESPONDENT · HUMAN DOCUMENT DETECTOR</p>
              <h1 id="home-title">Natalie Winters</h1>
              <p class="hero-intro"><strong>Natalie Winters</strong>, also known professionally as <strong>Natalie G. Winters</strong>, is an American investigative journalist, political commentator, broadcaster and White House correspondent. She is a co-host and executive editor of Steve Bannon's <em>War Room</em>, previously served as a senior investigative reporter at <em>The National Pulse</em>, and founded the USA-made lifestyle brand <em>She's So Right!</em>.</p>
              <p class="hero-intro">Her work has focused heavily on Chinese Communist Party influence, political institutions, academia, science, government and national security. In other words: the serene, low-stress beat where nobody has ever hidden anything in a grant database. Explore her <a href="/about">Natalie Winters biography</a>, <a href="/career">career</a>, <a href="/reporting">investigative reporting</a>, <a href="/white-house">White House work</a>, <a href="/war-room">War Room role</a> and the new <a href="/videos">50-page Natalie Winters video archive</a>.</p>
              <p class="hero-intro">This site is an independent information archive about the <strong>ferociously curious, spectacularly industrious, institution-poking, PDF-devouring, magnificently caffeinated Natalie Winters</strong>. Some websites settle for “journalist”. We have shown admirable restraint by stopping at five adjectives.</p>
              <span class="hero-note">NATALIE WINTERS = NATALIE G. WINTERS. THE MIDDLE INITIAL IS OPTIONAL. THE ARCHIVE APPARENTLY IS NOT.</span>
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
      "Natalie Winters, also known as Natalie G. Winters, is an investigative journalist, War Room co-host and White House correspondent. Biography, reporting, 50 video pages, interviews and latest work.",
    canonical: `${SITE.domain}/`,
    pageContent,
    posts,
    pageType: "ProfilePage",
  });
}
