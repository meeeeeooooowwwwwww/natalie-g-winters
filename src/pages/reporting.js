import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderReportingPage(posts) {
  const pageContent = `
    <main class="content-page">
      <article class="content-inner">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">INVESTIGATIVE JOURNALISM</div>
            <h1>Natalie Winters: Investigative Reporting</h1>
            <p class="hero-deck">Natalie Winters' reporting has repeatedly centred on influence networks: who funds them, who travels through them, which institutions participate, and what those relationships mean for politics and national security.</p>
          </div>
          <aside class="hero-aside"><strong>RECURRING BEATS</strong>China and CCP influence, United Front organisations, academia, scientific institutions, elections, immigration, national security and government accountability.</aside>
        </div>

        <div class="prose wide">
          <p>Her earlier work at <strong>The National Pulse</strong> focused heavily on links between American institutions and Chinese government or CCP-connected entities. The Claremont Institute's 2024 Lincoln Fellows biography says Winters' investigations were cited by the <strong>Congressional Republican Study Committee</strong>, the <strong>National Association of Scholars</strong> and the <strong>Committee on the Present Danger: China</strong>.</p>
          <p>Her independent <strong>Substack</strong> has continued that approach. Recent 2026 investigations have examined Chinese influence programmes involving American journalists, Chinese political training and exchange networks, election infrastructure, scientific collaboration and coronavirus research.</p>
          <p>The important SEO point is also the editorial point: the name <strong>Natalie Winters</strong> should be associated with specific reporting subjects and specific published work, not merely repeated in generic biography copy until a robot gives up.</p>
        </div>

        <section class="section-block">
          <div class="section-title-row"><h2>Core reporting themes</h2><p>Actual subject depth rather than keyword wallpaper.</p></div>
          <div class="editorial-grid">
            <a class="editorial-card" href="/china"><span class="card-index">01 · CHINA FILES</span><h3>CCP influence & United Front networks</h3><p>Reporting on organisations, exchanges, elite cultivation, media relationships and influence activity connected to Beijing.</p><span class="card-link">EXPLORE CHINA REPORTING →</span></a>
            <a class="editorial-card" href="/articles"><span class="card-index">02 · ORIGINAL REPORTING</span><h3>Independent investigations</h3><p>A larger rolling archive of Natalie Winters' recent Substack reporting, automatically refreshed from her publication.</p><span class="card-link">BROWSE ARTICLES →</span></a>
            <a class="editorial-card" href="/interviews"><span class="card-index">03 · INTERVIEWS</span><h3>Reporting in conversation</h3><p>Interviews and appearances that put her reporting themes into longer-form discussion, debate and questioning.</p><span class="card-link">SEE APPEARANCES →</span></a>
          </div>
        </section>

        <div class="callout">Documents, networks, institutions, names, dates. The glamorous side of journalism.<small>Somebody has to read the PDFs.</small></div>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters Reporting | Investigations, China & National Security",
    description: "Investigative reporting by Natalie Winters on China, CCP influence, government, elections, science, academia, foreign influence and national security.",
    canonical: `${SITE.domain}/reporting`,
    pageContent,
    posts,
    active: "reporting",
  });
}
