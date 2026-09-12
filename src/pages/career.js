import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { PAGE_BRAND_STYLES } from "../page-brand-ui.js";

export function renderCareerPage(posts) {
  const pageContent = `
    ${PAGE_BRAND_STYLES}
    <main class="content-page prestige-page">
      <article class="content-inner prestige-shell">
        <section class="prestige-hero">
          <div>
            <span class="prestige-kicker">CAREER · JOURNALISM · BROADCAST · WHITE HOUSE</span>
            <h1>Natalie G. Winters: Career & Media Work</h1>
            <p class="prestige-deck">From investigative reporting and podcasting to <em>War Room</em>, the White House press corps and independent publishing, Natalie G. Winters has built a unusually visible political-media career while still remarkably young.</p>
          </div>
          <aside class="prestige-summary">
            <div class="prestige-summary-head"><span>CAREER PROFILE</span><strong>Reporter → Broadcaster → White House Correspondent</strong></div>
            <div class="prestige-summary-row"><span>2022</span><strong>War Room co-host & executive editor</strong></div>
            <div class="prestige-summary-row"><span>2024</span><strong>Claremont Institute Lincoln Fellow</strong></div>
            <div class="prestige-summary-row"><span>2025 →</span><strong>White House correspondent</strong></div>
          </aside>
        </section>

        <nav class="brand-ribbon" aria-label="Natalie G. Winters career institutions">
          <a class="brand-ribbon-card" href="https://www.uchicago.edu/" target="_blank" rel="noopener noreferrer">
            <small>EDUCATION</small>
            <span class="brand-logo-box"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/0/05/University_of_Chicago_wordmark.svg" alt="University of Chicago" loading="lazy" decoding="async"></span>
            <strong class="role">GRADUATE</strong><span class="detail">University of Chicago</span>
          </a>
          <a class="brand-ribbon-card" href="https://thenationalpulse.com/" target="_blank" rel="noopener noreferrer">
            <small>EARLY INVESTIGATIVE MEDIA</small>
            <span class="brand-logo-box"><img class="muted" src="https://ac-landing-pages-user-uploads-production.s3.amazonaws.com/0000156685/69cfa6f7-33fa-4856-8b93-952603e7b716.png" alt="The National Pulse" loading="lazy" decoding="async" referrerpolicy="no-referrer"></span>
            <strong class="role">SENIOR INVESTIGATIVE REPORTER</strong><span class="detail">The National Pulse</span>
          </a>
          <a class="brand-ribbon-card" href="https://warroom.org/tag/natalie-winters/" target="_blank" rel="noopener noreferrer">
            <small>BROADCAST · EDITORIAL</small>
            <span class="brand-logo-box"><img src="https://i.scdn.co/image/ab6765630000ba8ac40baa59db5008897eff9781" alt="Bannon's War Room" loading="lazy" decoding="async" referrerpolicy="no-referrer"></span>
            <strong class="role">CO-HOST & EXECUTIVE EDITOR</strong><span class="detail">Steve Bannon's War Room</span>
          </a>
          <a class="brand-ribbon-card" href="/white-house">
            <small>WASHINGTON · D.C.</small>
            <span class="brand-logo-box"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/3/36/Wh-gov-workmark-logo.svg" alt="The White House" loading="lazy" decoding="async"></span>
            <strong class="role">CORRESPONDENT</strong><span class="detail">White House coverage since 2025</span>
          </a>
        </nav>

        <div class="prestige-content-grid">
          <div class="prestige-main prestige-prose">
            <p><strong>Natalie G. Winters</strong> developed a reporting speciality around Chinese Communist Party influence, foreign influence networks, universities, scientific institutions, government and public policy. At <strong>The National Pulse</strong>, she became a senior investigative reporter and co-hosted <em>The National Pulse Podcast</em> with Raheem Kassam.</p>
            <p>On October 25, 2022, <strong>War Room</strong> announced Winters as a co-host and executive editor, saying her reporting would include China, the CCP, the COVID-19 pandemic and government accountability. That formalised a relationship already familiar to the programme's audience.</p>
            <p>In 2024, the <strong>Claremont Institute</strong> selected Natalie G. Winters as a Lincoln Fellow. Its official biography identifies her as a War Room co-host, former National Pulse senior investigative reporter, University of Chicago graduate and founder of <strong>She's So Right!</strong>.</p>
            <p>In January 2025, Winters began covering the <strong>White House</strong> for <em>War Room</em>. Her work now combines live reporting, political commentary, interviews, regular on-air hosting and independent investigations published under her own name.</p>
          </div>

          <aside class="prestige-rail" aria-label="Career chronology">
            <div class="prestige-rail-head"><span>CAREER ARC</span><strong>From research to the press room</strong></div>
            <div class="rail-static"><b>FOUNDATION</b><span>University of Chicago</span></div>
            <div class="rail-static"><b>REPORTING</b><span>The National Pulse</span></div>
            <div class="rail-static"><b>BROADCAST</b><span>War Room</span></div>
            <div class="rail-static"><b>FELLOWSHIP</b><span>Claremont Institute · 2024</span></div>
            <a href="/white-house"><b>WHITE HOUSE</b><span>Correspondent · 2025 onward</span></a>
          </aside>
        </div>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>Six defining stages</h2><p>The chronology is powerful enough that it does not need exaggerated copy. The progression speaks for itself.</p></div>
          <div class="prestige-milestones">
            <article class="prestige-milestone"><span>01 · FOUNDATION</span><strong>University of Chicago</strong><small>Academic foundation before entering political media.</small></article>
            <article class="prestige-milestone"><span>02 · INVESTIGATIVE REPORTING</span><strong>The National Pulse</strong><small>Senior investigative reporter focused heavily on China and institutional influence.</small></article>
            <article class="prestige-milestone"><span>03 · PODCASTING</span><strong>The National Pulse Podcast</strong><small>Co-host alongside Raheem Kassam.</small></article>
            <article class="prestige-milestone"><span>04 · 2022</span><strong>War Room</strong><small>Named co-host and executive editor.</small></article>
            <article class="prestige-milestone"><span>05 · 2024</span><strong>Claremont Lincoln Fellow</strong><small>Selected for the Jack Roth Charitable Foundation Lincoln Fellowship.</small></article>
            <article class="prestige-milestone"><span>06 · 2025 →</span><strong>White House Correspondent</strong><small>Press-room and on-location reporting from Washington.</small></article>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>Institutional proof</h2><p>Direct paths to organisations that document major stages of her career.</p></div>
          <div class="logo-proof-grid">
            <a class="logo-proof-card" href="https://www.claremont.org/2024-lincoln-fellows/" target="_blank" rel="noopener noreferrer"><span>2024 FELLOWSHIP</span><div class="proof-logo"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Claremont_Institute_logo.svg" alt="Claremont Institute" loading="lazy" decoding="async"></div><strong>Claremont Institute</strong><small>Official 2024 Lincoln Fellows biography.</small></a>
            <a class="logo-proof-card" href="https://warroom.org/natalie-winters-joins-war-room-as-co-host-and-executive-editor/" target="_blank" rel="noopener noreferrer"><span>2022 APPOINTMENT</span><div class="proof-logo"><img src="https://i.scdn.co/image/ab6765630000ba8ac40baa59db5008897eff9781" alt="War Room" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div><strong>War Room</strong><small>Co-host and executive-editor announcement.</small></a>
            <a class="logo-proof-card" href="/white-house"><span>2025 →</span><div class="proof-logo"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/3/36/Wh-gov-workmark-logo.svg" alt="The White House" loading="lazy" decoding="async"></div><strong>White House Correspondent</strong><small>The Washington chapter of the career.</small></a>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>Primary references</h2><p>First-party and institutional sources behind the chronology.</p></div>
          <div class="source-list">
            <a class="source-link" href="https://warroom.org/natalie-winters-joins-war-room-as-co-host-and-executive-editor/" target="_blank" rel="noopener noreferrer"><div><span>War Room: co-host & executive editor announcement</span><small>October 25, 2022</small></div><b>→</b></a>
            <a class="source-link" href="https://www.claremont.org/2024-lincoln-fellows/" target="_blank" rel="noopener noreferrer"><div><span>Claremont Institute: 2024 Lincoln Fellows</span><small>Official fellowship biography</small></div><b>→</b></a>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie G. Winters Career | War Room, National Pulse & White House",
    description: "Natalie G. Winters' career across The National Pulse, Steve Bannon's War Room, White House reporting, the Claremont Institute and independent publishing.",
    canonical: `${SITE.domain}/career`,
    pageContent,
    posts,
    active: "career",
  });
}
