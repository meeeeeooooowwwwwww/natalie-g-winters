import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { PAGE_BRAND_STYLES } from "../page-brand-ui.js";

export function renderReportingPage(posts) {
  const pageContent = `
    ${PAGE_BRAND_STYLES}
    <main class="content-page prestige-page">
      <article class="content-inner prestige-shell">
        <section class="prestige-hero">
          <div>
            <span class="prestige-kicker">INVESTIGATIVE JOURNALISM · FOREIGN INFLUENCE · NATIONAL SECURITY</span>
            <h1>Natalie G. Winters: Investigative Reporting</h1>
            <p class="prestige-deck">The reporting repeatedly follows influence networks: who funds them, who gains access, which American institutions participate, and what the paper trail says when the public-relations copy is stripped away.</p>
          </div>
          <aside class="prestige-summary">
            <div class="prestige-summary-head"><span>REPORTING PROFILE</span><strong>Documents first. Networks second. Names attached.</strong></div>
            <div class="prestige-summary-row"><span>CORE BEAT</span><strong>China & CCP influence</strong></div>
            <div class="prestige-summary-row"><span>SECONDARY BEATS</span><strong>Academia · science · elections · immigration</strong></div>
            <div class="prestige-summary-row"><span>CURRENT PUBLISHING</span><strong>Independent reporting via Substack</strong></div>
          </aside>
        </section>

        <nav class="brand-ribbon" aria-label="Natalie G. Winters reporting platforms and institutions">
          <a class="brand-ribbon-card" href="https://thenationalpulse.com/" target="_blank" rel="noopener noreferrer">
            <small>EARLIER INVESTIGATIVE WORK</small>
            <span class="brand-logo-box"><img class="muted" src="https://ac-landing-pages-user-uploads-production.s3.amazonaws.com/0000156685/69cfa6f7-33fa-4856-8b93-952603e7b716.png" alt="The National Pulse" loading="lazy" decoding="async" referrerpolicy="no-referrer"></span>
            <strong class="role">SENIOR INVESTIGATIVE REPORTER</strong><span class="detail">China, institutions and foreign influence</span>
          </a>
          <a class="brand-ribbon-card" href="${SITE.substackHome}" target="_blank" rel="noopener noreferrer">
            <small>INDEPENDENT PUBLISHING</small>
            <span class="brand-logo-box"><span class="brand-wordmark">Substack</span></span>
            <strong class="role">ORIGINAL REPORTING</strong><span class="detail">Independent investigations under her own name</span>
          </a>
          <a class="brand-ribbon-card" href="https://warroom.org/tag/natalie-winters/" target="_blank" rel="noopener noreferrer">
            <small>BROADCAST AMPLIFICATION</small>
            <span class="brand-logo-box"><img src="https://i.scdn.co/image/ab6765630000ba8ac40baa59db5008897eff9781" alt="War Room" loading="lazy" decoding="async" referrerpolicy="no-referrer"></span>
            <strong class="role">WAR ROOM</strong><span class="detail">Investigations brought onto air</span>
          </a>
          <a class="brand-ribbon-card" href="https://www.claremont.org/2024-lincoln-fellows/" target="_blank" rel="noopener noreferrer">
            <small>INSTITUTIONAL RECOGNITION</small>
            <span class="brand-logo-box"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Claremont_Institute_logo.svg" alt="Claremont Institute" loading="lazy" decoding="async"></span>
            <strong class="role">LINCOLN FELLOW · 2024</strong><span class="detail">Biography cites the reach of her investigations</span>
          </a>
        </nav>

        <div class="prestige-content-grid">
          <div class="prestige-main prestige-prose">
            <p>Her earlier work at <strong>The National Pulse</strong> focused heavily on links between American institutions and Chinese government or CCP-connected entities. The Claremont Institute's 2024 Lincoln Fellows biography says Winters' investigations were cited by the <strong>Congressional Republican Study Committee</strong>, the <strong>National Association of Scholars</strong> and the <strong>Committee on the Present Danger: China</strong>.</p>
            <p>Her independent <strong>Substack</strong> has continued that approach. Recent investigations have examined Chinese influence programmes involving American journalists, political training and exchange networks, election infrastructure, scientific collaboration and coronavirus research.</p>
            <p>The through-line is straightforward: <strong>relationships affecting American security, sovereignty, institutions or public trust deserve scrutiny that goes deeper than the press release.</strong></p>
            <p>That is where the reporting style becomes distinctive. A grant database, an obscure organisational chart, a university partnership or a buried PDF is treated as a starting point rather than an endpoint.</p>
          </div>

          <aside class="prestige-rail" aria-label="Reporting impact">
            <div class="prestige-rail-head"><span>REPORTING IMPACT</span><strong>Work that travels beyond the original article</strong></div>
            <div class="rail-static"><b>CITED</b><span>Republican Study Committee</span></div>
            <div class="rail-static"><b>CITED</b><span>National Association of Scholars</span></div>
            <div class="rail-static"><b>CITED</b><span>Committee on the Present Danger: China</span></div>
            <a href="/articles"><b>ARCHIVE</b><span>Browse current original reporting →</span></a>
          </aside>
        </div>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>Core reporting themes</h2><p>The recurring subjects behind the investigations, broadcasts and interviews.</p></div>
          <div class="prestige-milestones">
            <article class="prestige-milestone"><span>01 · CHINA</span><strong>CCP influence</strong><small>Links between Chinese state or party-connected entities and American institutions.</small></article>
            <article class="prestige-milestone"><span>02 · NETWORKS</span><strong>United Front activity</strong><small>Organisations, exchanges, elite cultivation and relationship mapping.</small></article>
            <article class="prestige-milestone"><span>03 · ACADEMIA</span><strong>Universities & research</strong><small>Partnerships, grants and institutional relationships.</small></article>
            <article class="prestige-milestone"><span>04 · SCIENCE</span><strong>Scientific institutions</strong><small>Research collaboration, public funding and oversight questions.</small></article>
            <article class="prestige-milestone"><span>05 · POLITICS</span><strong>Elections & government</strong><small>Influence, accountability and the machinery surrounding public policy.</small></article>
            <article class="prestige-milestone"><span>06 · SECURITY</span><strong>National sovereignty</strong><small>Stories where institutional relationships intersect with national-security concerns.</small></article>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>Follow the work</h2><p>Move from overview into the underlying reporting, China archive and long-form appearances.</p></div>
          <div class="editorial-grid">
            <a class="editorial-card" href="/china"><span class="card-index">CHINA FILES</span><h3>CCP influence & United Front networks</h3><p>The dedicated archive for one of Natalie G. Winters' longest-running reporting beats.</p><span class="card-link">EXPLORE CHINA REPORTING →</span></a>
            <a class="editorial-card" href="/articles"><span class="card-index">ORIGINAL REPORTING</span><h3>Independent investigations</h3><p>A rolling archive of recent Substack reporting, automatically refreshed from her publication.</p><span class="card-link">BROWSE ARTICLES →</span></a>
            <a class="editorial-card" href="/interviews"><span class="card-index">INTERVIEWS</span><h3>Reporting in conversation</h3><p>Appearances that put the investigations into longer-form discussion, debate and questioning.</p><span class="card-link">SEE APPEARANCES →</span></a>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie G. Winters Reporting | Investigations, China & National Security",
    description: "Investigative reporting by Natalie G. Winters on China, CCP influence, government, elections, science, academia, foreign influence and national security.",
    canonical: `${SITE.domain}/reporting`,
    pageContent,
    posts,
    active: "reporting",
  });
}
