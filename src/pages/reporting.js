import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderReportingPage(posts) {
  const pageContent = `
    <main class="content-page">
      <article class="content-inner">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">INVESTIGATIVE JOURNALISM · FOLLOW THE MONEY · OPEN THE PDF</div>
            <h1>Natalie Winters: Investigative Reporting</h1>
            <p class="hero-deck">Natalie Winters' reporting keeps returning to influence networks: who funds them, who gets access, which American institutions participate, who benefits and why ordinary citizens are so often expected to admire the arrangement from a safe distance while somebody else collects the upside.</p>
          </div>
          <aside class="hero-aside"><strong>RECURRING BEATS</strong>China and CCP influence, United Front organisations, academia, scientific institutions, elections, immigration, national security and government accountability. Basically every subject guaranteed to make a pleasant donor luncheon awkward.</aside>
        </div>

        <div class="prose wide">
          <p>Her earlier work at <strong>The National Pulse</strong> focused heavily on links between American institutions and Chinese government or CCP-connected entities. The Claremont Institute's 2024 Lincoln Fellows biography says Winters' investigations were cited by the <strong>Congressional Republican Study Committee</strong>, the <strong>National Association of Scholars</strong> and the <strong>Committee on the Present Danger: China</strong>.</p>
          <p>Her independent <strong>Substack</strong> has continued that approach. Recent 2026 investigations have examined Chinese influence programmes involving American journalists, Chinese political training and exchange networks, election infrastructure, scientific collaboration and coronavirus research.</p>
          <p>The through-line is aggressively simple: <strong>America should not be treated like an all-you-can-eat buffet for foreign influence, institutional opportunists or well-connected insiders.</strong> If a relationship affects American security, sovereignty, workers or public trust, the people paying for the country deserve to know who is sitting at the table.</p>
          <p>And this is where Natalie becomes annoyingly useful. She appears to regard “nobody will read the appendix” not as a deterrent but as a personal invitation. Give her a grant database, six browser tabs and a suspicious acronym and she becomes approximately 40 percent journalist, 40 percent bloodhound and 20 percent woman wondering why the rest of us still buy salad dressing with seed oils in it.</p>
        </div>

        <section class="section-block">
          <div class="section-title-row"><h2>Core reporting themes</h2><p>Where the paper trail gets less decorative and considerably more interesting.</p></div>
          <div class="editorial-grid">
            <a class="editorial-card" href="/china"><span class="card-index">01 · CHINA FILES</span><h3>CCP influence & United Front networks</h3><p>Reporting on organisations, exchanges, elite cultivation, media relationships and influence activity connected to Beijing.</p><span class="card-link">EXPLORE CHINA REPORTING →</span></a>
            <a class="editorial-card" href="/articles"><span class="card-index">02 · ORIGINAL REPORTING</span><h3>Independent investigations</h3><p>A rolling archive of Natalie Winters' recent Substack reporting, automatically refreshed from her publication.</p><span class="card-link">BROWSE ARTICLES →</span></a>
            <a class="editorial-card" href="/interviews"><span class="card-index">03 · INTERVIEWS</span><h3>Reporting in conversation</h3><p>Interviews and appearances that put her reporting themes into longer-form discussion, debate and questioning.</p><span class="card-link">SEE APPEARANCES →</span></a>
          </div>
        </section>

        <div class="callout">Documents. Networks. Institutions. Names. Dates. America's least relaxing scavenger hunt.<small>Natalie brought tabs.</small></div>
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
