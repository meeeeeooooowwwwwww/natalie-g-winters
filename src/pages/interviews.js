import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderInterviewsPage(posts) {
  const pageContent = `
    <main class="content-page">
      <article class="content-inner wide-shell">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">INTERVIEWS & APPEARANCES</div>
            <h1>Natalie Winters Interviews</h1>
            <p class="hero-deck">A curated record of Natalie Winters in interviews, panels, debates and guest appearances outside the usual War Room format.</p>
          </div>
          <aside class="hero-aside"><strong>WHY THIS PAGE EXISTS</strong>Because "appeared on television somewhere at some point" is not especially useful metadata.</aside>
        </div>

        <section>
          <div class="appearance-grid">
            <article class="appearance-card"><span>PBS · JUNE 4, 2026</span><h3>Firing Line with Margaret Hoover</h3><p>Natalie Winters and Adam Mockler discuss politics, trust in media, journalistic standards, immigration and the relationship between political identity and digital audiences at Hofstra University.</p><a href="https://www.pbs.org/video/natalie-winters-and-adam-mockler-gcgw4i/" target="_blank" rel="noopener noreferrer">WATCH ON PBS →</a></article>
            <article class="appearance-card"><span>TAIWAN · DECEMBER 2025</span><h3>Vice President Hsiao Bi-khim</h3><p>Winters interviews Taiwan's vice president at the Presidential Office in Taipei on geopolitics, cross-strait relations, defence and U.S.-Taiwan cooperation.</p><a href="https://warroom.org/exclusive-taiwans-vice-president-on-the-ccp-threat-and-the-fight-for-freedom/" target="_blank" rel="noopener noreferrer">WAR ROOM INTERVIEW →</a></article>
            <article class="appearance-card"><span>UNDERCURRENTS · APRIL 16, 2025</span><h3>Where MAGA could go wrong</h3><p>A 26-minute interview with Emily Jashinsky discussing Winters' White House role, media coverage and areas of tension inside the MAGA coalition.</p><a href="https://podcasts.apple.com/us/podcast/natalie-winters-where-maga-could-go-wrong/id1759350741?i=1000703756985" target="_blank" rel="noopener noreferrer">LISTEN ON APPLE PODCASTS →</a></article>
            <article class="appearance-card"><span>GLENN BECK · APRIL 4, 2025</span><h3>The Glenn Beck Program</h3><p>Winters appears as a guest to discuss political organising and the groups she linked to coordinated attacks on Tesla locations.</p><a href="https://podcasts.apple.com/us/podcast/what-austin-metcalfs-murder-tells-us-about-male-adolescence/id620967489?i=1000702233589" target="_blank" rel="noopener noreferrer">LISTEN ON APPLE PODCASTS →</a></article>
            <article class="appearance-card"><span>PIERS MORGAN UNCENSORED · MARCH 2025</span><h3>Debate with Christopher Steele</h3><p>A combative panel segment in which Winters challenges Steele over the Trump dossier and his role in the 2016 political controversy.</p><a href="https://www.breitbart.com/clips/2025/03/20/war-rooms-winters-to-christopher-steele-you-are-the-ultimate-grifter/" target="_blank" rel="noopener noreferrer">VIEW CLIP & CONTEXT →</a></article>
            <article class="appearance-card"><span>PIERS MORGAN UNCENSORED · JUNE 25, 2025</span><h3>Iran, Israel and NATO</h3><p>A panel discussion after the Israel-Iran ceasefire, with Winters appearing as War Room's White House correspondent alongside several foreign-policy commentators.</p><a href="https://podcasts.apple.com/sz/podcast/start-of-a-long-war-daddy-trump-at-nato-after/id1618445014?i=1000714552097" target="_blank" rel="noopener noreferrer">LISTEN ON APPLE PODCASTS →</a></article>
            <article class="appearance-card"><span>OAN · JULY 28, 2026</span><h3>The Matt Gaetz Show</h3><p>Winters discusses criticism of her White House presence and presentation, and argues that audience size has changed the media hierarchy.</p><a href="https://www.oann.com/video/the-matt-gaetz-show-video/natalie-winters-joins-the-matt-gaetz-show-with-a-message/" target="_blank" rel="noopener noreferrer">WATCH ON OAN →</a></article>
            <article class="appearance-card"><span>WAR ROOM · ONGOING</span><h3>Guest interviews and hosted segments</h3><p>As a co-host and executive editor, Winters also conducts interviews within War Room itself. The programme's tag archive is the most direct running index.</p><a href="https://warroom.org/tag/natalie-winters/" target="_blank" rel="noopener noreferrer">OPEN WAR ROOM ARCHIVE →</a></article>
          </div>
        </section>

        <div class="quote-panel"><p>Long-form appearances are useful because they show the arguments, questions and reporting themes around Natalie Winters in context, not just in a 12-second clip flying past on social media.</p><small>RADICAL CONCEPT: CONTEXT</small></div>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters Interviews | PBS, Piers Morgan, War Room & More",
    description: "Natalie Winters interviews and media appearances including PBS Firing Line, Piers Morgan Uncensored, Taiwan Vice President Hsiao Bi-khim, Glenn Beck, OAN and podcasts.",
    canonical: `${SITE.domain}/interviews`,
    pageContent,
    posts,
  });
}
