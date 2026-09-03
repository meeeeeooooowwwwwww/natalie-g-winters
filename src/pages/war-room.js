import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderWarRoomPage(posts) {
  const pageContent = `
    <main class="content-page">
      <article class="content-inner wide-shell">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">WAR ROOM</div>
            <h1>Natalie Winters on War Room</h1>
            <p class="hero-deck">Natalie Winters' public profile is closely tied to Steve Bannon's <em>War Room</em>, where she serves as a co-host and executive editor and has also represented the programme at the White House.</p>
          </div>
          <aside class="hero-aside"><strong>OFFICIAL SINCE 2022</strong>War Room announced Winters as co-host and executive editor on October 25, 2022. The volume knob has remained in excellent health.</aside>
        </div>

        <div class="fact-ribbon">
          <div><span>ANNOUNCED</span><strong>October 25, 2022</strong></div>
          <div><span>ROLE</span><strong>Co-host & executive editor</strong></div>
          <div><span>CORE BEATS</span><strong>China, politics, institutions, national security</strong></div>
          <div><span>WHITE HOUSE</span><strong>Correspondent from January 2025</strong></div>
        </div>

        <div class="prose wide">
          <p>War Room's 2022 announcement said Winters was already well known to its audience from her work at <strong>The National Pulse</strong> and that her reporting would appear through War Room with a focus including China, the Chinese Communist Party and government accountability.</p>
          <p>Over time, the role expanded beyond investigative pieces into regular hosting, opening monologues, interviews, live political analysis and White House coverage. The War Room site now maintains a dedicated <strong>Natalie Winters archive</strong> containing transcripts and clips under her name.</p>
          <p>For anyone searching simply for <strong>"Natalie Winters"</strong>, this relationship is one of the strongest recurring entities associated with her work. That makes it useful to explain clearly rather than bury inside a generic career paragraph.</p>
        </div>

        <section class="section-block">
          <div class="section-title-row"><h2>Selected War Room video</h2><p>Two archive clips that show the reporting themes present from the start.</p></div>
          <div class="video-grid">
            <article class="video-card">
              <div class="video-frame"><iframe src="https://rumble.com/embed/v1n9zm5/?pub=chmqx" title="Natalie Winters on a congressional Wuhan lab investigation" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
              <div class="video-card-copy"><h3>Wuhan lab investigation preview</h3><p>An early War Room clip from the 2022 co-host announcement, reflecting Winters' reporting on COVID-19 origins and scientific institutions.</p><a href="https://warroom.org/natalie-winters-joins-war-room-as-co-host-and-executive-editor/" target="_blank" rel="noopener noreferrer">SOURCE & CONTEXT →</a></div>
            </article>
            <article class="video-card">
              <div class="video-frame"><iframe src="https://rumble.com/embed/v1n9zuh/?pub=chmqx" title="Natalie Winters on different forms of Chinese warfare" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
              <div class="video-card-copy"><h3>China and different forms of warfare</h3><p>A companion clip from the same announcement, showing the China and national-security beat that became central to her reporting.</p><a href="https://warroom.org/natalie-winters-joins-war-room-as-co-host-and-executive-editor/" target="_blank" rel="noopener noreferrer">SOURCE & CONTEXT →</a></div>
            </article>
          </div>
        </section>

        <section class="section-block">
          <div class="section-title-row"><h2>War Room milestones</h2><p>Enough chronology to orient yourself without requiring a cork board and red string.</p></div>
          <div class="editorial-grid">
            <a class="editorial-card" href="https://warroom.org/natalie-winters-joins-war-room-as-co-host-and-executive-editor/" target="_blank" rel="noopener noreferrer"><span class="card-index">2022</span><h3>Co-host & executive editor</h3><p>War Room formally announces Natalie Winters in the expanded role.</p><span class="card-link">READ ANNOUNCEMENT →</span></a>
            <a class="editorial-card" href="/white-house"><span class="card-index">2025</span><h3>White House correspondent</h3><p>Winters begins reporting from the White House while continuing her on-air War Room role.</p><span class="card-link">WHITE HOUSE PAGE →</span></a>
            <a class="editorial-card" href="https://warroom.org/tag/natalie-winters/" target="_blank" rel="noopener noreferrer"><span class="card-index">ARCHIVE</span><h3>War Room's Natalie Winters tag</h3><p>Transcripts, clips and articles collected by War Room under her name.</p><span class="card-link">OPEN ARCHIVE →</span></a>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters War Room | Co-Host, Executive Editor & Videos",
    description: "Natalie Winters on Steve Bannon's War Room: co-host and executive editor since 2022, White House correspondent, selected videos, reporting themes and archive links.",
    canonical: `${SITE.domain}/war-room`,
    pageContent,
    posts,
  });
}
