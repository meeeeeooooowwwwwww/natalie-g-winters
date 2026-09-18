import { SITE } from "../config.js";
import { externalImage, renderLayout } from "../layout.js";
import { PAGE_BRAND_STYLES } from "../page-brand-ui.js";

export function renderAboutPage(posts) {
  const pageContent = `
    ${PAGE_BRAND_STYLES}
    <main class="content-page prestige-page">
      <article class="content-inner prestige-shell">
        <section class="prestige-hero">
          <div>
            <span class="prestige-kicker">BIOGRAPHY · JOURNALISM · BROADCAST · BUSINESS</span>
            <h1>About Natalie G. Winters</h1>
            <p class="prestige-deck"><strong>Natalie G. Winters</strong> is an American investigative journalist, broadcaster, political commentator, White House correspondent and entrepreneur whose work has focused heavily on foreign influence, China and the institutions shaping American public life.</p>
          </div>
          <aside class="prestige-summary">
            <div class="prestige-summary-head"><span>AT A GLANCE</span><strong>Natalie G. Winters</strong></div>
            <div class="prestige-summary-row"><span>MEDIA</span><strong>War Room co-host & executive editor</strong></div>
            <div class="prestige-summary-row"><span>WASHINGTON</span><strong>White House correspondent</strong></div>
            <div class="prestige-summary-row"><span>EDUCATION</span><strong>University of Chicago graduate</strong></div>
          </aside>
        </section>

        <nav class="brand-ribbon" aria-label="Natalie G. Winters biography credentials">
          <a class="brand-ribbon-card" href="/white-house">
            <small>WASHINGTON</small>
            <span class="brand-logo-box"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/3/36/Wh-gov-workmark-logo.svg" alt="The White House" loading="lazy" decoding="async"></span>
            <strong class="role">CORRESPONDENT</strong><span class="detail">White House coverage since 2025</span>
          </a>
          <a class="brand-ribbon-card" href="https://warroom.org/tag/natalie-winters/" target="_blank" rel="noopener noreferrer">
            <small>BROADCAST</small>
            <span class="brand-logo-box"><img src="https://i.scdn.co/image/ab6765630000ba8ac40baa59db5008897eff9781" alt="War Room" loading="lazy" decoding="async" referrerpolicy="no-referrer"></span>
            <strong class="role">CO-HOST & EXECUTIVE EDITOR</strong><span class="detail">Steve Bannon's War Room</span>
          </a>
          <a class="brand-ribbon-card" href="https://www.uchicago.edu/" target="_blank" rel="noopener noreferrer">
            <small>EDUCATION</small>
            <span class="brand-logo-box"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/0/05/University_of_Chicago_wordmark.svg" alt="University of Chicago" loading="lazy" decoding="async"></span>
            <strong class="role">GRADUATE</strong><span class="detail">University of Chicago</span>
          </a>
          <a class="brand-ribbon-card" href="https://www.claremont.org/2024-lincoln-fellows/" target="_blank" rel="noopener noreferrer">
            <small>FELLOWSHIP · 2024</small>
            <span class="brand-logo-box"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Claremont_Institute_logo.svg" alt="Claremont Institute" loading="lazy" decoding="async"></span>
            <strong class="role">LINCOLN FELLOW</strong><span class="detail">Claremont Institute</span>
          </a>
        </nav>

        <section class="visual-feature">
          <figure>
            ${externalImage(SITE.images.portrait, "Natalie G. Winters", "feature-photo", 1272, 1274)}
            <figcaption>Natalie G. Winters</figcaption>
          </figure>
          <div class="visual-feature-copy">
            <span class="prestige-kicker">BIOGRAPHY</span>
            <div class="prestige-prose">
              <p>Winters grew up in Santa Monica, California and graduated from the <strong>University of Chicago</strong>. She entered political media at a young age and developed a reporting speciality around Chinese Communist Party influence in American institutions.</p>
              <p>She became a <strong>senior investigative reporter at The National Pulse</strong> and co-hosted <em>The National Pulse Podcast</em> with Raheem Kassam. On October 25, 2022, <strong>War Room</strong> formally announced Winters as a co-host and executive editor.</p>
              <p>In January 2025, Natalie G. Winters began reporting from the <strong>White House</strong> for <em>War Room</em>, adding briefing-room and on-location reporting to her regular broadcasting and political commentary.</p>
              <p>She also publishes independent investigations through <strong>Substack</strong> and founded the USA-made lifestyle brand <strong>She's So Right!</strong>.</p>
              <p>In 2024, the <strong>Claremont Institute</strong> selected Natalie G. Winters as a Lincoln Fellow. Its official biography highlights her China-focused reporting, University of Chicago education, National Pulse career and business work.</p>
              <p>Her public style is easy to recognise: fast, research-heavy, confrontational, strongly pro-American and willing to put obscure documents, institutional relationships and uncomfortable questions directly into public view.</p>
            </div>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>The profile in six markers</h2><p>A concise map of the roles and institutions that define the public career.</p></div>
          <div class="prestige-milestones">
            <article class="prestige-milestone"><span>EDUCATION</span><strong>University of Chicago</strong><small>Academic foundation before entering national political media.</small></article>
            <article class="prestige-milestone"><span>REPORTING</span><strong>The National Pulse</strong><small>Senior investigative reporter and podcast co-host.</small></article>
            <article class="prestige-milestone"><span>BROADCAST</span><strong>War Room</strong><small>Co-host and executive editor since 2022.</small></article>
            <article class="prestige-milestone"><span>WASHINGTON</span><strong>White House</strong><small>Correspondent since January 2025.</small></article>
            <article class="prestige-milestone"><span>FELLOWSHIP</span><strong>Claremont Institute</strong><small>2024 Lincoln Fellow.</small></article>
            <article class="prestige-milestone"><span>BUSINESS</span><strong>She's So Right!</strong><small>Founder of the USA-made lifestyle brand.</small></article>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>Explore Natalie G. Winters in depth</h2><p>The biography is the overview. These sections carry the evidence, appearances and reporting underneath it.</p></div>
          <div class="editorial-grid four-up-grid">
            <a class="editorial-card" href="/war-room"><span class="card-index">WAR ROOM</span><h3>Co-host & executive editor</h3><p>The programme most closely associated with Natalie G. Winters' broadcasting and political-media work.</p><span class="card-link">EXPLORE WAR ROOM →</span></a>
            <a class="editorial-card" href="/china"><span class="card-index">REPORTING</span><h3>China & CCP investigations</h3><p>The long-running reporting beat covering influence networks, institutions, Taiwan and national security.</p><span class="card-link">EXPLORE CHINA FILES →</span></a>
            <a class="editorial-card" href="/videos"><span class="card-index">VIDEO</span><h3>Broadcast archive</h3><p>Dedicated video pages connecting her name to interviews, reporting and major appearances.</p><span class="card-link">BROWSE VIDEOS →</span></a>
            <a class="editorial-card" href="/interviews"><span class="card-index">MEDIA</span><h3>Interviews & debates</h3><p>External appearances across television, podcasts, panels and debates.</p><span class="card-link">BROWSE INTERVIEWS →</span></a>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie G. Winters Biography | About Natalie Winters",
    description: "Biography of Natalie G. Winters, also known as Natalie Winters: investigative journalist, War Room co-host, White House correspondent, University of Chicago graduate and She's So Right! founder.",
    canonical: `${SITE.domain}/about`,
    pageContent,
    posts,
    active: "about",
    pageType: "ProfilePage",
  });
}
