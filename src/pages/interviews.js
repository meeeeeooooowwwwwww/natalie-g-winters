import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { PAGE_BRAND_STYLES } from "../page-brand-ui.js";

export function renderInterviewsPage(posts) {
  const pageContent = `
    ${PAGE_BRAND_STYLES}
    <main class="content-page prestige-page">
      <article class="content-inner prestige-shell">
        <section class="prestige-hero">
          <div>
            <span class="prestige-kicker">INTERVIEWS · TELEVISION · PODCASTS · DEBATES</span>
            <h1>Natalie G. Winters in the Media</h1>
            <p class="prestige-deck">A curated record of Natalie G. Winters across supportive conservative media, long-form interviews, adversarial debates and international conversations.</p>
          </div>
          <aside class="prestige-summary">
            <div class="prestige-summary-head"><span>MEDIA PROFILE</span><strong>Hosted, interviewed, debated and repeatedly invited back</strong></div>
            <div class="prestige-summary-row"><span>CURRENT CONSERVATIVE MEDIA</span><strong>OAN · Real America's Voice · Glenn Beck · War Room</strong></div>
            <div class="prestige-summary-row"><span>MAJOR MEDIA</span><strong>PBS · Piers Morgan</strong></div>
            <div class="prestige-summary-row"><span>INTERNATIONAL</span><strong>Taiwan Presidential Office</strong></div>
          </aside>
        </section>

        <section class="prestige-section" style="margin-top:34px;padding-top:0;border-top:0">
          <div class="prestige-section-head"><h2>Current conservative media</h2><p>Recent 2026 appearances only. The promoted destinations below were re-checked during the September 2026 site audit.</p></div>
          <div class="appearance-brand-grid">
            <article class="appearance-brand-card"><div class="appearance-brand-top"><img class="reverse" src="https://www.oann.com/images/logos/OAN-only-logo.svg" alt="OAN" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div><span>OAN · AUGUST 24, 2026</span><h3>The Matt Gaetz Show</h3><p>Winters responds to attempts to intimidate or belittle her over her White House presence and says audience size has changed the media hierarchy.</p><a href="https://www.oann.com/video/the-matt-gaetz-show-video/natalie-winters-joins-the-matt-gaetz-show-with-a-message/" target="_blank" rel="noopener noreferrer">WATCH ON OAN →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Logo_Real_America%27s_Voice.svg" alt="Real America's Voice" loading="lazy" decoding="async"></div><span>REAL AMERICA'S VOICE · AUGUST 26, 2026</span><h3>War Room: investigations hour</h3><p>RAV's War Room feed devotes the hour to Winters' current investigations, including CDC influencer funding and institutional reporting.</p><a href="https://omny.fm/shows/real-america-s-voice/cdc-pays-influencers-as-girl-scouts-embrace-islam-the-war-room-with-stephen-k-bannon-ep-5619" target="_blank" rel="noopener noreferrer">LISTEN ON RAV FEED →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><img class="reverse" src="https://premierenetworks.s3.amazonaws.com/logo/2021-06/GlennBeckLogo.png" alt="The Glenn Beck Program" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div><span>THE GLENN BECK PROGRAM · JULY 28, 2026</span><h3>Journalists and Chinese influence</h3><p>Glenn Beck hosts Winters to discuss her reporting on American journalists and China-linked influence programmes.</p><a href="https://newsradio1410.iheart.com/featured/glenn-beck/content/2026-07-28-175-the-glenn-beck-program-best-of-the-program-guest-natalie-winters-72826/" target="_blank" rel="noopener noreferrer">LISTEN ON IHEART →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><img src="https://storage.warroom.org/images/AVN_YT_Banner_Pandemic_Live_-_smaller.png" alt="Bannon's War Room" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div><span>WAR ROOM · CURRENT</span><h3>Co-host & executive editor</h3><p>War Room remains Winters' principal broadcast home, with current hosting, interviews, investigations and White House coverage.</p><a href="/war-room">OPEN CURRENT WAR ROOM ARCHIVE →</a></article>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>Major interviews, debates & international appearances</h2><p>Different environments show a different kind of credibility: long-form context, hostile questioning and senior international interviews.</p></div>
          <div class="appearance-brand-grid">
            <article class="appearance-brand-card"><div class="appearance-brand-top"><span class="brand-wordmark">PBS</span></div><span>FIRING LINE · JUNE 4, 2026</span><h3>Firing Line with Margaret Hoover</h3><p>Natalie G. Winters and Adam Mockler discuss politics, trust in media, journalistic standards, immigration and digital audiences at Hofstra University.</p><a href="https://www.pbs.org/video/natalie-winters-and-adam-mockler-gcgw4i/" target="_blank" rel="noopener noreferrer">WATCH ON PBS →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><span class="brand-wordmark">Taiwan</span></div><span>PRESIDENTIAL OFFICE · DECEMBER 2, 2025</span><h3>Vice President Hsiao Bi-khim</h3><p>Winters interviews Taiwan's vice president on geopolitics, cross-strait relations, defence, Taiwan-U.S. relations and investment.</p><a href="https://english.president.gov.tw/Page/645" target="_blank" rel="noopener noreferrer">VIEW PRESIDENTIAL OFFICE RECORD →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><span class="brand-wordmark">Piers Morgan</span></div><span>UNCENSORED · MARCH 19, 2025</span><h3>Debate with Christopher Steele</h3><p>A combative panel segment in which Winters challenges Steele over the Trump dossier and his role in the 2016 political controversy.</p><a href="https://www.youtube.com/watch?v=4SSUWmn7iGE" target="_blank" rel="noopener noreferrer">WATCH PIERS MORGAN UNCENSORED →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><span class="brand-wordmark">Undercurrents</span></div><span>APRIL 16, 2025</span><h3>Where MAGA could go wrong</h3><p>A 26-minute interview with Emily Jashinsky discussing Winters' White House role, media coverage and areas of tension inside the MAGA coalition.</p><a href="https://podcasts.apple.com/us/podcast/natalie-winters-where-maga-could-go-wrong/id1759350741?i=1000703756985" target="_blank" rel="noopener noreferrer">LISTEN ON APPLE PODCASTS →</a></article>
          </div>
        </section>

        <div class="quote-panel"><p>Long-form appearances matter because they show Natalie G. Winters' arguments, reporting themes and ability to operate outside a single friendly format.</p><small>THE CLIPS ARE THE RECEIPTS</small></div>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie G. Winters Interviews | OAN, Real America's Voice, Glenn Beck & More",
    description: "Natalie G. Winters interviews and media appearances including current 2026 appearances on OAN, Real America's Voice and Glenn Beck, plus PBS, Piers Morgan and an official Taiwan Presidential Office record.",
    canonical: `${SITE.domain}/interviews`,
    pageContent,
    posts,
  });
}
