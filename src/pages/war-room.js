import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { PAGE_BRAND_STYLES } from "../page-brand-ui.js";

export function renderWarRoomPage(posts) {
  const pageContent = `
    ${PAGE_BRAND_STYLES}
    <main class="content-page prestige-page">
      <article class="content-inner prestige-shell">
        <section class="prestige-hero">
          <div>
            <span class="prestige-kicker">WAR ROOM · BROADCAST · EDITORIAL · INVESTIGATIONS</span>
            <h1>Natalie G. Winters on War Room</h1>
            <p class="prestige-deck">Natalie G. Winters' public profile is closely tied to Steve Bannon's <em>War Room</em>, where she serves as co-host and executive editor and has represented the programme at the White House.</p>
          </div>
          <aside class="prestige-summary">
            <div class="prestige-summary-head"><span>WAR ROOM ROLE</span><strong>Co-host & Executive Editor</strong></div>
            <div class="prestige-summary-row"><span>ANNOUNCED</span><strong>October 25, 2022</strong></div>
            <div class="prestige-summary-row"><span>CORE BEATS</span><strong>China · politics · institutions · national security</strong></div>
            <div class="prestige-summary-row"><span>WHITE HOUSE</span><strong>Correspondent from January 2025</strong></div>
          </aside>
        </section>

        <nav class="brand-ribbon" aria-label="War Room relationship and career links">
          <a class="brand-ribbon-card" href="https://warroom.org/tag/natalie-winters/" target="_blank" rel="noopener noreferrer">
            <small>BROADCAST HOME</small>
            <span class="brand-logo-box"><img src="https://i.scdn.co/image/ab6765630000ba8ac40baa59db5008897eff9781" alt="Bannon's War Room" loading="lazy" decoding="async" referrerpolicy="no-referrer"></span>
            <strong class="role">CO-HOST & EXECUTIVE EDITOR</strong><span class="detail">Official archive under her name</span>
          </a>
          <a class="brand-ribbon-card" href="https://thenationalpulse.com/" target="_blank" rel="noopener noreferrer">
            <small>EARLIER REPORTING</small>
            <span class="brand-logo-box"><img class="muted" src="https://ac-landing-pages-user-uploads-production.s3.amazonaws.com/0000156685/69cfa6f7-33fa-4856-8b93-952603e7b716.png" alt="The National Pulse" loading="lazy" decoding="async" referrerpolicy="no-referrer"></span>
            <strong class="role">THE NATIONAL PULSE</strong><span class="detail">Investigative reporting before the expanded War Room role</span>
          </a>
          <a class="brand-ribbon-card" href="/white-house">
            <small>WASHINGTON</small>
            <span class="brand-logo-box"><img class="reverse" src="https://upload.wikimedia.org/wikipedia/commons/3/36/Wh-gov-workmark-logo.svg" alt="The White House" loading="lazy" decoding="async"></span>
            <strong class="role">WHITE HOUSE CORRESPONDENT</strong><span class="detail">Press coverage from 2025 onward</span>
          </a>
          <a class="brand-ribbon-card" href="/reporting">
            <small>EDITORIAL CORE</small>
            <span class="brand-logo-box"><span class="brand-wordmark">Investigations</span></span>
            <strong class="role">DOCUMENT-DRIVEN REPORTING</strong><span class="detail">Foreign influence, China and institutions</span>
          </a>
        </nav>

        <div class="prestige-content-grid">
          <div class="prestige-main prestige-prose">
            <p>War Room's 2022 announcement said Winters was already well known to its audience from her work at <strong>The National Pulse</strong> and that her reporting would appear through War Room with a focus including China, the Chinese Communist Party and government accountability.</p>
            <p>Over time, the role expanded beyond investigative pieces into regular hosting, opening monologues, interviews, live political analysis and White House coverage. The War Room site now maintains a dedicated <strong>Natalie G. Winters archive</strong> containing transcripts and clips under her name.</p>
            <p>The relationship makes sense editorially. War Room gives the investigations a large broadcast platform, while Winters brings the documents, names, dates and institutional connections that can turn a broad political argument into a sourced segment.</p>
          </div>
          <aside class="prestige-rail" aria-label="War Room milestones">
            <div class="prestige-rail-head"><span>WAR ROOM TIMELINE</span><strong>From recurring guest to core broadcaster</strong></div>
            <div class="rail-static"><b>2022</b><span>Co-host & Executive Editor</span></div>
            <div class="rail-static"><b>ONGOING</b><span>Regular hosting and investigative segments</span></div>
            <div class="rail-static"><b>2025</b><span>White House correspondent</span></div>
            <a href="https://warroom.org/tag/natalie-winters/" target="_blank" rel="noopener noreferrer"><b>ARCHIVE</b><span>Open War Room's Natalie G. Winters tag →</span></a>
          </aside>
        </div>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>Selected War Room video</h2><p>Early clips that show the China and national-security reporting which became central to her on-air role.</p></div>
          <div class="video-grid">
            <article class="video-card">
              <div class="video-frame"><iframe src="https://rumble.com/embed/v1n9zm5/?pub=chmqx" title="Natalie G. Winters on a congressional Wuhan lab investigation" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
              <div class="video-card-copy"><h3>Wuhan lab investigation preview</h3><p>An early War Room clip from the 2022 co-host announcement, reflecting Winters' reporting on COVID-19 origins and scientific institutions.</p><a href="https://warroom.org/natalie-winters-joins-war-room-as-co-host-and-executive-editor/" target="_blank" rel="noopener noreferrer">SOURCE & CONTEXT →</a></div>
            </article>
            <article class="video-card">
              <div class="video-frame"><iframe src="https://rumble.com/embed/v1n9zuh/?pub=chmqx" title="Natalie G. Winters on different forms of Chinese warfare" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
              <div class="video-card-copy"><h3>China and different forms of warfare</h3><p>A companion clip from the same announcement, showing the China and national-security beat that became central to her reporting.</p><a href="https://warroom.org/natalie-winters-joins-war-room-as-co-host-and-executive-editor/" target="_blank" rel="noopener noreferrer">SOURCE & CONTEXT →</a></div>
            </article>
          </div>
        </section>

        <section class="prestige-section">
          <div class="prestige-section-head"><h2>War Room milestones</h2><p>The major role changes and the direct source behind each stage.</p></div>
          <div class="prestige-milestones">
            <article class="prestige-milestone"><span>2022</span><strong>Co-host</strong><small>War Room formally announces Natalie G. Winters in the expanded role.</small></article>
            <article class="prestige-milestone"><span>2022</span><strong>Executive Editor</strong><small>Editorial responsibility formalised alongside the broadcast role.</small></article>
            <article class="prestige-milestone"><span>ONGOING</span><strong>Investigative segments</strong><small>China, institutions, national security and government accountability.</small></article>
            <article class="prestige-milestone"><span>ONGOING</span><strong>Hosting & interviews</strong><small>Regular studio presence beyond individual investigative hits.</small></article>
            <article class="prestige-milestone"><span>2025</span><strong>White House correspondent</strong><small>The broadcast role expands into direct Washington reporting.</small></article>
            <article class="prestige-milestone"><span>ARCHIVE</span><strong>Dedicated War Room tag</strong><small>Transcripts, clips and articles collected under her name.</small></article>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie G. Winters War Room | Co-Host, Executive Editor & Videos",
    description: "Natalie G. Winters on Steve Bannon's War Room: co-host and executive editor since 2022, White House correspondent, selected videos, reporting themes and archive links.",
    canonical: `${SITE.domain}/war-room`,
    pageContent,
    posts,
  });
}
