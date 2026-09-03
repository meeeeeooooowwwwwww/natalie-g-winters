import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderCareerPage(posts) {
  const pageContent = `
    <main class="content-page">
      <article class="content-inner">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">CAREER</div>
            <h1>Natalie Winters: Career and Media Work</h1>
            <p class="hero-deck">From investigative reporting and podcasting to War Room, the White House press corps and independent publishing, Natalie Winters has built an unusually visible media career at an unusually young age.</p>
          </div>
          <aside class="hero-aside"><strong>CAREER SUMMARY</strong>Reporter. Broadcaster. Executive editor. White House correspondent. Entrepreneur. Apparently nobody explained that one job was sufficient.</aside>
        </div>

        <div class="fact-ribbon">
          <div><span>EDUCATION</span><strong>University of Chicago</strong></div>
          <div><span>EARLY INVESTIGATIVE MEDIA</span><strong>The National Pulse</strong></div>
          <div><span>CURRENT BROADCAST HOME</span><strong>Steve Bannon's War Room</strong></div>
          <div><span>WHITE HOUSE ROLE</span><strong>Correspondent since 2025</strong></div>
        </div>

        <div class="prose wide">
          <p><strong>Natalie G. Winters</strong> developed a reporting speciality around Chinese Communist Party influence, foreign influence networks, universities, scientific institutions, government and public policy. At <strong>The National Pulse</strong>, she became a senior investigative reporter and co-hosted <em>The National Pulse Podcast</em> with Raheem Kassam.</p>
          <p>On October 25, 2022, <strong>War Room</strong> announced Winters as a co-host and executive editor, saying her reporting would include China, the CCP, the COVID-19 pandemic and government accountability. That formalised a relationship already familiar to the programme's audience.</p>
          <p>In January 2025, Winters began covering the White House for <em>War Room</em>. Since then, her work has combined live reporting, political commentary, interviews and regular on-air hosting with independent investigations published under her own name.</p>
          <p>In 2024, the <strong>Claremont Institute</strong> selected Natalie Winters as a Lincoln Fellow. Its official biography identifies her as a War Room co-host, former National Pulse senior investigative reporter, University of Chicago graduate and founder of <strong>She's So Right!</strong>.</p>
        </div>

        <section class="section-block">
          <div class="section-title-row">
            <h2>Career, in six useful stops</h2>
            <p>A cleaner chronology for humans and search engines. Everybody wins.</p>
          </div>
          <div class="timeline-grid">
            <div class="timeline-item"><span>FOUNDATION</span><strong>University of Chicago graduate</strong></div>
            <div class="timeline-item"><span>INVESTIGATIVE REPORTING</span><strong>Senior reporter, The National Pulse</strong></div>
            <div class="timeline-item"><span>PODCASTING</span><strong>The National Pulse Podcast</strong></div>
            <div class="timeline-item"><span>2022</span><strong>War Room co-host & executive editor</strong></div>
            <div class="timeline-item"><span>2024</span><strong>Claremont Institute Lincoln Fellow</strong></div>
            <div class="timeline-item"><span>2025 ONWARD</span><strong>War Room White House correspondent</strong></div>
          </div>
        </section>

        <section class="section-block">
          <div class="section-title-row"><h2>Primary references</h2><p>Useful first-party and institutional sources behind the chronology.</p></div>
          <div class="source-list">
            <a class="source-link" href="https://warroom.org/natalie-winters-joins-war-room-as-co-host-and-executive-editor/" target="_blank" rel="noopener noreferrer"><div><span>War Room: co-host & executive editor announcement</span><small>October 25, 2022</small></div><b>→</b></a>
            <a class="source-link" href="https://www.claremont.org/2024-lincoln-fellows/" target="_blank" rel="noopener noreferrer"><div><span>Claremont Institute: 2024 Lincoln Fellows</span><small>Official fellowship biography</small></div><b>→</b></a>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters Career | War Room, National Pulse & White House",
    description: "Natalie Winters' career across The National Pulse, Steve Bannon's War Room, White House reporting, Substack, the Claremont Institute and She's So Right!.",
    canonical: `${SITE.domain}/career`,
    pageContent,
    posts,
    active: "career",
  });
}
