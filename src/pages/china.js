import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderChinaPage(posts) {
  const pageContent = `
    <main class="content-page">
      <article class="content-inner wide-shell">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">CHINA FILES · NO FREE PASSES</div>
            <h1>Natalie Winters: China & CCP Reporting</h1>
            <p class="hero-deck">Chinese Communist Party influence and foreign-influence networks have been among the most persistent themes in Natalie Winters' reporting. The underlying question is not especially complicated: <strong>why should any foreign power get privileged access to American institutions, technology, media, land, research or decision-makers while Americans are told not to be rude about it?</strong></p>
          </div>
          <aside class="hero-aside"><strong>THE RECURRING QUESTION</strong>Who is connected to whom, who paid for the introduction, what access followed, and why did the brochure use the word “exchange” seventeen times?</aside>
        </div>

        <div class="prose wide">
          <p>Winters' China reporting frequently focuses on the <strong>United Front</strong>, exchange organisations, elite cultivation, media and academic relationships, scientific collaboration, political networks and the ways Beijing-linked groups seek access or influence abroad.</p>
          <p>That subject has remained active in 2026. Recent Substack investigations have examined programmes that sponsored American journalists' travel to China, political training involving Communist Party USA figures, Chinese-linked organisations and U.S. institutions, and continuing scientific collaboration involving coronavirus researchers.</p>
          <p>The editorial position of this archive is uncomplicated: <strong>American sovereignty is not an antique to be admired while everybody quietly sells pieces off the back.</strong> Trade, research and diplomacy can serve legitimate purposes. Secrecy, dependency, influence-buying and elite access deserve considerably less politeness.</p>
          <p>This is also where Natalie is most unmistakably Natalie: tiny frame, enormous stack of receipts, immaculate presentation and the expression of somebody who has just discovered that a supposedly boring exchange programme has a 76-page annual report. Somewhere, a communications director feels a disturbance in the Force.</p>
          <p>In December 2025, Winters interviewed <strong>Taiwan Vice President Hsiao Bi-khim</strong> at Taiwan's Presidential Office. Taiwan's own Presidential Office described Winters as a War Room co-host and White House correspondent and recorded the interview's focus on geopolitics, cross-strait relations, defence, U.S.-Taiwan relations and investment.</p>
        </div>

        <section class="section-block">
          <div class="section-title-row"><h2>Recent China-focused investigations</h2><p>Selected original Natalie Winters reports. Bring tabs. She did.</p></div>
          <div class="editorial-grid">
            <a class="editorial-card" href="https://nataliegwinters.substack.com/p/revealed-china-linked-influence-group" target="_blank" rel="noopener noreferrer"><span class="card-index">AUG 10, 2026</span><h3>Journalist exchange and influence programme</h3><p>An investigation into a China-linked programme that sponsored American journalists and arranged access to Chinese institutions and officials.</p><span class="card-link">READ ON SUBSTACK →</span></a>
            <a class="editorial-card" href="https://nataliegwinters.substack.com/p/exclusive-wuhans-bat-woman-is-building" target="_blank" rel="noopener noreferrer"><span class="card-index">AUG 11, 2026</span><h3>Coronavirus research after Wuhan</h3><p>Reporting on Shi Zhengli's current laboratory work and continued connections involving NIH-backed researchers.</p><span class="card-link">READ ON SUBSTACK →</span></a>
            <a class="editorial-card" href="https://nataliegwinters.substack.com/p/exc-inside-the-ccps-training-program" target="_blank" rel="noopener noreferrer"><span class="card-index">JUL 30, 2026</span><h3>CCP political training programme</h3><p>An investigation into political education and exchange involving Communist Party USA figures and the Chinese Communist Party's International Department.</p><span class="card-link">READ ON SUBSTACK →</span></a>
          </div>
        </section>

        <section class="section-block">
          <div class="section-title-row"><h2>Taiwan interview</h2><p>Geopolitics, defence and cross-strait relations, with considerably fewer soothing corporate euphemisms.</p></div>
          <div class="video-feature">
            <div class="video-frame"><iframe src="https://rumble.com/embed/v1n9zuh/?pub=chmqx" title="Natalie Winters China reporting archive clip" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
            <div class="video-copy"><span>CHINA BEAT · ARCHIVE CLIP</span><h3>A beat that has been there for years</h3><p>An earlier War Room clip on Chinese warfare sits alongside a later body of reporting that grew into interviews and detailed investigations.</p><a href="https://warroom.org/exclusive-taiwans-vice-president-on-the-ccp-threat-and-the-fight-for-freedom/" target="_blank" rel="noopener noreferrer">TAIWAN INTERVIEW →</a></div>
          </div>
        </section>

        <section class="section-block">
          <div class="section-title-row"><h2>Source trail</h2><p>The links beneath the links, for anyone who also enjoys ruining a peaceful afternoon with primary material.</p></div>
          <div class="source-list">
            <a class="source-link" href="https://english.president.gov.tw/Page/645" target="_blank" rel="noopener noreferrer"><div><span>Office of the President, Taiwan: Hsiao Bi-khim activity record</span><small>Lists the interview with Natalie Winters</small></div><b>→</b></a>
            <a class="source-link" href="https://www.president.gov.tw/News/39666" target="_blank" rel="noopener noreferrer"><div><span>Taiwan Presidential Office: War Room interview release</span><small>December 2, 2025</small></div><b>→</b></a>
            <a class="source-link" href="https://www.claremont.org/2024-lincoln-fellows/" target="_blank" rel="noopener noreferrer"><div><span>Claremont Institute biography</span><small>Notes her focus on CCP infiltration in America</small></div><b>→</b></a>
            <a class="source-link" href="https://warroom.org/tag/natalie-winters/" target="_blank" rel="noopener noreferrer"><div><span>War Room Natalie Winters archive</span><small>Clips and transcripts across China and geopolitics</small></div><b>→</b></a>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters China Reporting | CCP, Taiwan & Influence Networks",
    description: "Natalie Winters reporting on China and the Chinese Communist Party, United Front influence networks, Taiwan, scientific collaboration, media and national security.",
    canonical: `${SITE.domain}/china`,
    pageContent,
    posts,
  });
}
