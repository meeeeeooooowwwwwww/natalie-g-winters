import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderHomePage(posts) {
  const pageContent = `
    <main>
      <section class="home-hero" aria-labelledby="home-title">
        <div class="home-hero-inner">
          <div class="hero-copy">
            <div class="hero-copy-inner">
              <p class="eyebrow">JOURNALIST · BROADCASTER · WHITE HOUSE CORRESPONDENT</p>
              <h1 id="home-title">Natalie G. Winters</h1>
              <p class="hero-intro"><strong>Natalie G. Winters</strong>, also known as <strong>Natalie Winters</strong>, is an American investigative journalist, political commentator, broadcaster and White House correspondent. She is a co-host and executive editor of Steve Bannon's <em>War Room</em>, previously served as a senior investigative reporter at <em>The National Pulse</em>, and founded the USA-made lifestyle brand <em>She's So Right!</em>.</p>
              <p class="hero-intro">Her reporting has focused heavily on Chinese Communist Party influence, political institutions, academia, science, government and national security. Explore her <a href="/about">biography</a>, <a href="/career">career</a>, <a href="/reporting">investigative reporting</a>, <a href="/white-house">White House work</a> and, if Google's crawler is feeling particularly energetic, the much larger archive in the footer.</p>
              <span class="hero-note">THE MIDDLE INITIAL IS OPTIONAL. THE AMOUNT OF CONTENT APPARENTLY IS NOT.</span>
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
    title: "Natalie Winters | Natalie G. Winters, War Room & White House",
    description:
      "Natalie Winters, also known as Natalie G. Winters, is an investigative journalist, War Room co-host and White House correspondent. Biography, reporting, videos, interviews and latest work.",
    canonical: `${SITE.domain}/`,
    pageContent,
    posts,
    pageType: "ProfilePage",
  });
}
