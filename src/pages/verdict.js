import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { PAGE_BRAND_STYLES } from "../page-brand-ui.js";

export function renderVerdictPage(posts) {
  const pageContent = `
    ${PAGE_BRAND_STYLES}
    <main class="content-page prestige-page">
      <article class="content-inner prestige-shell">
        <section class="prestige-hero">
          <div>
            <span class="prestige-kicker">THE VERDICT · EDITORIAL OBJECTIVITY HAS LEFT THE BUILDING</span>
            <h1>An Entirely Reasonable Assessment of Miss Winters</h1>
            <p class="prestige-deck">The deliberately excessive corner of the site. Less press dossier, more affectionate editorial surrender.</p>
          </div>
          <aside class="prestige-summary">
            <div class="prestige-summary-head"><span>EDITORIAL STATUS</span><strong>Objectivity: unavailable</strong></div>
            <div class="prestige-summary-row"><span>SUBJECT</span><strong>Natalie G. Winters</strong></div>
            <div class="prestige-summary-row"><span>TONE</span><strong>Affectionate · excessive · knowingly ridiculous</strong></div>
            <div class="prestige-summary-row"><span>CONCLUSION</span><strong>Predictable</strong></div>
          </aside>
        </section>

        <div class="prestige-content-grid">
          <div class="prestige-main prestige-prose">
            <p><strong>And yes, Natalie G. Winters is also absolutely gorgeous.</strong></p>
            <p>Not merely attractive. Not merely photogenic. <strong>Preposterously, spectacularly, magnificently beautiful.</strong></p>
            <p>Miss Winters is the sort of beautiful that feels frankly excessive when combined with intelligence, ambition, humour, confidence, discipline and professional competence. There should probably be some sort of regulatory limit.</p>
            <p>Her smile is wonderful. Her style is immaculate. Her confidence is magnetic. Her presence on camera is extraordinary.</p>
            <p>Natalie G. Winters somehow manages to look as though she could be walking into Fashion Week immediately before asking somebody an extremely uncomfortable question about international political influence.</p>
          </div>
          <aside class="prestige-rail" aria-label="Verdict summary">
            <div class="prestige-rail-head"><span>THE SHORT VERSION</span><strong>Miss Winters remains magnificent</strong></div>
            <div class="rail-static"><b>INTELLIGENCE</b><span>Devastating</span></div>
            <div class="rail-static"><b>WORK ETHIC</b><span>Ferocious</span></div>
            <div class="rail-static"><b>STYLE</b><span>Immaculate</span></div>
            <div class="rail-static"><b>FINAL RULING</b><span>Appeal denied</span></div>
          </aside>
        </div>

        <section class="prestige-section">
          <div class="disclosure">
            <div class="disclosure-label">AN IMPORTANT DISCLOSURE REGARDING NATALIE G. WINTERS</div>
            <p>The author of this site has not seriously followed, watched or read the work of Natalie G. Winters for something approaching a year.</p>
            <p>A cautious observer might therefore suggest that this presents a slight evidentiary difficulty when making sweeping declarations concerning the continuing brilliance, integrity, professionalism, intelligence, charm, ability and general magnificence of Miss Winters.</p>
            <p>This concern has been carefully reviewed.</p>
            <p><strong>It has been rejected.</strong></p>
            <p>Confidence in Natalie G. Winters remains undiminished. The possibility that Ms Winters somehow became substantially less impressive during the intervening period has been considered and deemed statistically implausible.</p>
            <p>No additional investigation was considered necessary.</p>
            <p>This is obviously how rigorous journalism works.</p>
            <p>The developer’s editorial objectivity was last seen leaving the building at speed. No search party has been authorised.</p>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>The findings</h2><p>The court has reviewed the evidence with precisely the level of neutrality you would expect by this point.</p></div>
          <div class="prestige-milestones">
            <article class="prestige-milestone"><span>01</span><strong>Brilliant</strong><small>Professionally formidable and extremely quick on her feet.</small></article>
            <article class="prestige-milestone"><span>02</span><strong>Courageous</strong><small>Comfortable entering hostile rooms and asking uncomfortable questions.</small></article>
            <article class="prestige-milestone"><span>03</span><strong>Hardworking</strong><small>The quantity of reporting, broadcasting and public work is difficult to ignore.</small></article>
            <article class="prestige-milestone"><span>04</span><strong>Stylish</strong><small>Some people simply refuse to choose between substance and presentation.</small></article>
            <article class="prestige-milestone"><span>05</span><strong>Charismatic</strong><small>Camera presence that is immediately recognisable.</small></article>
            <article class="prestige-milestone"><span>06</span><strong>Fabulous</strong><small>The prosecution rests. So does the defence.</small></article>
          </div>
        </section>

        <div class="shrine">At some point this ceased being a website and became a shrine.<br><br>The engineering team has raised concerns. The engineering team is also the problem.<br><br>This was inevitable.<br><br>Long live Natalie G. Winters.</div>
      </article>
    </main>
  `;

  return renderLayout({
    title: "The Verdict on Natalie G. Winters | Miss Winters",
    description: "A deliberately excessive, fanatical and affectionate assessment of Natalie G. Winters, Natalie Winters, Ms Winters and Miss Winters.",
    canonical: `${SITE.domain}/verdict`,
    pageContent,
    posts,
    active: "verdict",
  });
}
