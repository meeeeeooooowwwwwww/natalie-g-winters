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
            <div class="prestige-summary-row"><span>SUPPORTIVE MEDIA</span><strong>OAN · RAV · Glenn Beck · Human Events</strong></div>
            <div class="prestige-summary-row"><span>LONG FORM</span><strong>Timcast · podcasts · panels</strong></div>
            <div class="prestige-summary-row"><span>MAINSTREAM / ADVERSARIAL</span><strong>PBS · Piers Morgan</strong></div>
          </aside>
        </section>

        <section class="prestige-section" style="margin-top:34px;padding-top:0;border-top:0">
          <div class="prestige-section-head"><h2>Featured & welcomed across</h2><p>Selected networks and shows that have hosted, featured or amplified Natalie G. Winters. Every card links directly to an appearance.</p></div>
          <div class="appearance-brand-grid">
            <article class="appearance-brand-card"><div class="appearance-brand-top"><img class="reverse" src="https://www.oann.com/images/logos/OAN-only-logo.svg" alt="OAN" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div><span>OAN · THE MATT GAETZ SHOW</span><h3>A message from the White House press corps</h3><p>Winters responds to attempts to belittle her White House presence and argues that audience size has changed the media hierarchy.</p><a href="https://www.youtube.com/watch?v=CP-Wzou3NzI" target="_blank" rel="noopener noreferrer">WATCH APPEARANCE →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Logo_Real_America%27s_Voice.svg" alt="Real America's Voice" loading="lazy" decoding="async"></div><span>REAL AMERICA'S VOICE</span><h3>“I think we have our country back”</h3><p>A White House-era appearance on one of the principal networks carrying the broader War Room media ecosystem.</p><a href="https://americasvoice.news/i-think-we-have-our-country-back/" target="_blank" rel="noopener noreferrer">WATCH ON RAV →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><img class="reverse" src="https://premierenetworks.s3.amazonaws.com/logo/2021-06/GlennBeckLogo.png" alt="The Glenn Beck Program" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div><span>THE GLENN BECK PROGRAM</span><h3>Political organising and coordinated attacks</h3><p>Winters joins Glenn Beck to discuss political organising and groups she linked to attacks on Tesla locations.</p><a href="https://www.theblaze.com/shows/the-glenn-beck-program/george-soros-protests" target="_blank" rel="noopener noreferrer">VIEW ON BLAZE MEDIA →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><img class="reverse" src="https://timcast.com/_next/static/media/timcast-logo.0~vh38qkdscg_.png" alt="Timcast" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div><span>TIMCAST IRL</span><h3>Full-show guest appearance</h3><p>A long-form format where the conversation can move beyond a short television hit into politics, media and current events.</p><a href="https://www.youtube.com/watch?v=06KBLBphdV0" target="_blank" rel="noopener noreferrer">WATCH TIMCAST IRL →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/9/98/Human_Events_logo.svg" alt="Human Events" loading="lazy" decoding="async"></div><span>HUMAN EVENTS DAILY</span><h3>Justice, accountability and the FBI</h3><p>Hosted by Jack Posobiec, with Winters discussing Chris Wray, accountability and the political appetite for institutional reform.</p><a href="https://humanevents.com/2024/12/11/natalie-winters-chris-wray-stepping-down-will-not-make-our-appetite-for-justice-dissipate" target="_blank" rel="noopener noreferrer">OPEN HUMAN EVENTS →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/The_First_TV_logo.png" alt="The First" loading="lazy" decoding="async"></div><span>THE FIRST</span><h3>America's institutions and communist influence</h3><p>A Jesse Kelly appearance focused on institutional capture, China and the ideological networks around American public life.</p><a href="https://www.thefirsttv.com/watch/americas-institutions-have-been-seized-by-communists/" target="_blank" rel="noopener noreferrer">WATCH ON THE FIRST →</a></article>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>Major interviews, debates & international appearances</h2><p>Different environments show a different kind of credibility: long-form context, hostile questioning and senior international interviews.</p></div>
          <div class="appearance-brand-grid">
            <article class="appearance-brand-card"><div class="appearance-brand-top"><span class="brand-wordmark">PBS</span></div><span>FIRING LINE · JUNE 4, 2026</span><h3>Firing Line with Margaret Hoover</h3><p>Natalie G. Winters and Adam Mockler discuss politics, trust in media, journalistic standards, immigration and digital audiences at Hofstra University.</p><a href="https://www.pbs.org/video/natalie-winters-and-adam-mockler-gcgw4i/" target="_blank" rel="noopener noreferrer">WATCH ON PBS →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><span class="brand-wordmark">Taiwan</span></div><span>PRESIDENTIAL OFFICE · DECEMBER 2025</span><h3>Vice President Hsiao Bi-khim</h3><p>Winters interviews Taiwan's vice president at the Presidential Office in Taipei on geopolitics, cross-strait relations, defence and U.S.-Taiwan cooperation.</p><a href="https://warroom.org/exclusive-taiwans-vice-president-on-the-ccp-threat-and-the-fight-for-freedom/" target="_blank" rel="noopener noreferrer">WATCH INTERVIEW →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><span class="brand-wordmark">Piers Morgan</span></div><span>UNCENSORED · MARCH 2025</span><h3>Debate with Christopher Steele</h3><p>A combative panel segment in which Winters challenges Steele over the Trump dossier and his role in the 2016 political controversy.</p><a href="https://www.breitbart.com/clips/2025/03/20/war-rooms-winters-to-christopher-steele-you-are-the-ultimate-grifter/" target="_blank" rel="noopener noreferrer">VIEW CLIP & CONTEXT →</a></article>
            <article class="appearance-brand-card"><div class="appearance-brand-top"><span class="brand-wordmark">Undercurrents</span></div><span>APRIL 16, 2025</span><h3>Where MAGA could go wrong</h3><p>A 26-minute interview with Emily Jashinsky discussing Winters' White House role, media coverage and areas of tension inside the MAGA coalition.</p><a href="https://podcasts.apple.com/us/podcast/natalie-winters-where-maga-could-go-wrong/id1759350741?i=1000703756985" target="_blank" rel="noopener noreferrer">LISTEN ON APPLE PODCASTS →</a></article>
          </div>
        </section>

        <div class="quote-panel"><p>Long-form appearances matter because they show Natalie G. Winters' arguments, reporting themes and ability to operate outside a single friendly format.</p><small>THE CLIPS ARE THE RECEIPTS</small></div>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie G. Winters Interviews | OAN, Glenn Beck, PBS, Timcast & More",
    description: "Natalie G. Winters interviews and media appearances including OAN, Real America's Voice, Glenn Beck, Timcast IRL, Human Events, PBS, Piers Morgan and international interviews.",
    canonical: `${SITE.domain}/interviews`,
    pageContent,
    posts,
  });
}
