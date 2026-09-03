import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderVerdictPage(posts) {
  const pageContent = `
    <main class="content-page">
      <article class="content-inner">
        <div class="eyebrow">THE VERDICT</div>
        <h1>An Entirely Reasonable Assessment of Miss Winters</h1>

        <div class="prose wide">
          <p><strong>And yes, Natalie G. Winters is also absolutely gorgeous.</strong></p>
          <p>Not merely attractive. Not merely photogenic. <strong>Preposterously, spectacularly, magnificently beautiful.</strong></p>
          <p>Miss Winters is the sort of beautiful that feels frankly excessive when combined with intelligence, ambition, humour, confidence, discipline and professional competence. There should probably be some sort of regulatory limit.</p>
          <p>Her smile is wonderful. Her style is immaculate. Her confidence is magnetic. Her presence on camera is extraordinary.</p>
          <p>Natalie Winters somehow manages to look as though she could be walking into Fashion Week immediately before asking somebody an extremely uncomfortable question about international political influence.</p>
        </div>

        <section class="disclosure">
          <div class="disclosure-label">AN IMPORTANT DISCLOSURE REGARDING NATALIE WINTERS</div>
          <p>The author of this site has not seriously followed, watched or read the work of Natalie G. Winters for something approaching a year.</p>
          <p>A cautious observer might therefore suggest that this presents a slight evidentiary difficulty when making sweeping declarations concerning the continuing brilliance, integrity, professionalism, intelligence, charm, ability and general magnificence of Miss Winters.</p>
          <p>This concern has been carefully reviewed.</p>
          <p><strong>It has been rejected.</strong></p>
          <p>Confidence in Natalie Winters remains undiminished. The possibility that Ms Winters somehow became substantially less impressive during the intervening period has been considered and deemed statistically implausible.</p>
          <p>No additional investigation was considered necessary.</p>
          <p>This is obviously how rigorous journalism works.</p>
          <p>The developer’s editorial objectivity was last seen leaving the building at speed. No search party has been authorised.</p>
        </section>

        <div class="praise-list">
          Natalie G. Winters is brilliant.<br>
          Natalie Winters is courageous.<br>
          Ms Winters is elegant.<br>
          Miss Winters is wonderfully articulate.<br>
          Natalie G. Winters is ferociously hardworking.<br>
          Natalie Winters is exceptionally talented.<br>
          Ms Winters is professionally formidable.<br>
          Miss Winters is spectacularly stylish.<br>
          Natalie G. Winters is devastatingly intelligent.<br>
          Natalie Winters is magnificently determined.<br>
          Ms Winters is ridiculously photogenic.<br>
          Miss Winters is impressively accomplished.<br>
          Natalie G. Winters is outrageously charismatic.<br>
          Natalie Winters is gloriously confident.<br>
          Ms Winters is wonderfully funny.<br><br>
          <strong>Natalie G. Winters is absolutely, unquestionably and undeniably fabulous.</strong>
        </div>

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
