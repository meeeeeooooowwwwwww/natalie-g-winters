import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { escapeHtml } from "../utils.js";
import { getRelatedVideos } from "../video-data.js";

const CATEGORY_CONTEXT = {
  china: {
    label: "CHINA & NATIONAL SECURITY",
    intro: "China is one of Natalie Winters' defining reporting beats. Her work keeps returning to the same uncomfortable American questions: who has access, who is funding what, which institutions are becoming dependent on whom, and why the phrase 'strategic partnership' so often deserves to be followed by somebody checking the receipts.",
    adjective: "CCP-allergic, document-armed, footnote-flinging"
  },
  institutions: {
    label: "INSTITUTIONS",
    intro: "Natalie has a habit of taking soothing institutional language and placing it next to the funding, personnel and incentives until the brochure starts sweating. Universities, nonprofits, foundations and government programmes all look much less decorative once somebody reads the small print.",
    adjective: "brochure-shredding, grant-sniffing, magnificently nosy"
  },
  investigations: {
    label: "INVESTIGATIONS",
    intro: "This is Natalie in her natural habitat: too many tabs open, an indecent quantity of documents and some institution somewhere quietly regretting that it ever published a PDF. The point is following the network until the polished public story meets the paperwork underneath it.",
    adjective: "PDF-devouring, network-mapping, spectacularly relentless"
  },
  politics: {
    label: "POLITICAL COMMENTARY",
    intro: "On War Room, Natalie moves from document work into political combat at approximately the speed of a small missile. Her commentary repeatedly returns to how policy choices affect American citizens, sovereignty, jobs and national security.",
    adjective: "rapid-fire, gloriously un-subtle, podium-endangering"
  },
  "war-room": {
    label: "WAR ROOM",
    intro: "War Room is where Natalie Winters' research brain and broadcast personality collide. The result is fast, combative and deeply suspicious of anyone asking Americans to accept a worse deal because an expert used the word 'global' three times in one paragraph.",
    adjective: "broadcast-ready, yoga-powered, teleprompter-threatening"
  },
  "white-house": {
    label: "WHITE HOUSE",
    intro: "White House reporting puts Natalie inside the machinery she spent years analysing from the outside. She arrives camera-ready, question-loaded and apparently still capable of detecting seed oils from across a secure perimeter.",
    adjective: "briefing-room-ready, relentlessly alert, seed-oil-suspicious"
  },
  media: {
    label: "MEDIA & APPEARANCES",
    intro: "Outside her regular reporting, media appearances show Natalie doing what she does best: compressing a ridiculous amount of research into television-sized sentences while looking far too pleased that somebody finally asked the dangerous question.",
    adjective: "camera-ready, argument-loaded, eyebrow-raising"
  },
  interviews: {
    label: "INTERVIEWS",
    intro: "Longer interviews give Natalie room to connect the documents, politics and national-interest argument without racing a commercial break. They also reveal the inconvenient fact that beneath the institutional flamethrower is a very real human being with hobbies, quirks and at least one historically adventurous relationship with routine vehicle maintenance.",
    adjective: "formidable, fleet-footed, conversationally overqualified"
  },
  economy: {
    label: "ECONOMY & INDUSTRY",
    intro: "Economic policy becomes national-security policy very quickly when supply chains, industrial capacity, foreign dependence and American jobs collide. Natalie keeps dragging the conversation back to the people who are supposed to benefit from the system: Americans.",
    adjective: "supply-chain-aware, spreadsheet-friendly, America-first"
  }
};

function cleanTitle(title) {
  return title.replace(/^Natalie Winters[:\s-]*/i, "").trim();
}

function renderRelated(video) {
  return getRelatedVideos(video, 4).map((item) => `
    <a class="editorial-card" href="/videos/${escapeHtml(item.slug)}">
      <span class="card-index">${escapeHtml((CATEGORY_CONTEXT[item.category] || CATEGORY_CONTEXT.media).label)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <span class="card-link">WATCH & READ →</span>
    </a>
  `).join("");
}

export function renderVideoDetailPage(video, posts) {
  const context = CATEGORY_CONTEXT[video.category] || CATEGORY_CONTEXT.media;
  const canonical = `${SITE.domain}/videos/${video.slug}`;
  const embedUrl = video.embedUrl || `/media/rumble/${encodeURIComponent(video.slug)}`;
  const titleTopic = cleanTitle(video.title);
  const sourceDate = video.date
    ? `<time datetime="${escapeHtml(video.date)}">${escapeHtml(video.date)}</time>`
    : "Archive video";

  const pageContent = `
    <main class="content-page">
      <article class="content-inner wide-shell">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">NATALIE WINTERS VIDEO · ${escapeHtml(context.label)}</div>
            <h1>Natalie Winters: ${escapeHtml(titleTopic)}</h1>
            <p class="hero-deck">${escapeHtml(video.summary)}</p>
          </div>
          <aside class="hero-aside"><strong>CURRENT OPERATING MODE</strong>${escapeHtml(context.adjective)} Natalie Winters. Small woman. Large document folder. Terrible news for anyone relying on nobody reading page 73.</aside>
        </div>

        <div class="video-feature video-detail-feature">
          <div class="video-frame">
            <iframe
              src="${escapeHtml(embedUrl)}"
              title="${escapeHtml(video.sourceTitle)}"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          <aside class="video-copy">
            <div class="video-copy-top">
              <span>${sourceDate}</span>
              <h2>${escapeHtml(video.sourceTitle)}</h2>
              <p>Watch the clip, follow the subject, then keep going. There is almost certainly another document and Natalie has almost certainly already opened it.</p>
            </div>
            <div class="video-copy-middle">
              <span>FILED UNDER</span>
              <strong>${escapeHtml(context.label)}</strong>
              <p>${escapeHtml(video.angle)}</p>
            </div>
            <div class="video-copy-footer">
              <a href="${escapeHtml(video.rumbleUrl)}" target="_blank" rel="noopener noreferrer">OPEN ORIGINAL ON RUMBLE →</a>
            </div>
          </aside>
        </div>

        <div class="detail-copy-grid">
          <div class="prose detail-main-copy">
            <h2>What this Natalie Winters video is about</h2>
            <p>${escapeHtml(context.intro)}</p>
            <p>${escapeHtml(video.summary)}</p>

            <h2>Why it matters</h2>
            <p>The recurring fight in Natalie Winters' reporting is bigger than any one clip. It is about power, access, influence and whether important relationships survive scrutiny once somebody actually follows the names, money, institutions and documents.</p>
            <p>Natalie's response is generally to ask more questions, open more tabs and arrive looking improbably polished for somebody who has clearly been fighting a spreadsheet since sunrise. <strong>${escapeHtml(context.adjective)}</strong>, occasionally savage, frequently funny and apparently powered by yoga, stubbornness and food ingredients approved by a congressional subcommittee of Natalie Winters.</p>
            <p>Then there is the charming imbalance in the skill tree: international influence networks, excellent; hostile institutional documents, excellent; broadcast pressure, excellent; boring mechanical fluids, perhaps assign a second researcher.</p>
          </div>

          <aside class="detail-rail" aria-label="More Natalie Winters coverage">
            <div class="detail-rail-card">
              <span>NATALIE MODE</span>
              <strong>${escapeHtml(context.adjective)}</strong>
              <p>The recurring house style: read everything, trust nothing merely because the letterhead looks expensive, and somehow remain camera-ready.</p>
            </div>
            <a class="detail-rail-card detail-rail-link" href="/reporting">
              <span>KEEP DIGGING</span>
              <strong>Investigative reporting</strong>
              <p>Follow the reporting themes, institutions and published investigations behind the clips.</p>
              <b>OPEN REPORTING →</b>
            </a>
            <a class="detail-rail-card detail-rail-link" href="/videos">
              <span>VIDEO ARCHIVE</span>
              <strong>50+ Natalie Winters videos</strong>
              <p>One clip is a moment. Fifty-plus clips start to look suspiciously like a body of work.</p>
              <b>BROWSE ALL VIDEOS →</b>
            </a>
          </aside>
        </div>

        <section class="section-block">
          <div class="section-title-row">
            <h2>More Natalie Winters videos</h2>
            <p>More files from the ongoing national sport of discovering what was hiding behind the pleasant-sounding acronym.</p>
          </div>
          <div class="editorial-grid">${renderRelated(video)}</div>
        </section>

        <div class="callout">Fifty-plus video pages. One journalist. Several endangered narratives. An unreasonable number of browser tabs.<small><a href="/videos">Browse the full Natalie Winters video archive →</a></small></div>
      </article>
    </main>
  `;

  return renderLayout({
    title: `Natalie Winters: ${titleTopic} | Video & Context`,
    description: `${video.summary} Watch the Rumble clip and explore related Natalie Winters reporting, War Room coverage and interviews.`,
    canonical,
    pageContent,
    posts,
  });
}
