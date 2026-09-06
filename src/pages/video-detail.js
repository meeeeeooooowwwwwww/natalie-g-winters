import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { escapeHtml } from "../utils.js";
import { getRelatedVideos } from "../video-data.js";

const CATEGORY_CONTEXT = {
  china: {
    label: "CHINA & NATIONAL SECURITY",
    intro: "China has been one of Natalie Winters' longest-running reporting beats. These clips are useful because they connect her name to specific institutions, programmes, people and documents rather than leaving the subject at the level of generic geopolitical commentary.",
    adjective: "ferociously document-minded, institution-poking, footnote-flinging"
  },
  institutions: {
    label: "INSTITUTIONS",
    intro: "A recurring Natalie Winters habit is to look at programmes that seem ordinary until the funding, partnerships, language and institutional incentives are put next to one another. The result is often considerably less sleepy than the brochure suggested.",
    adjective: "brochure-reading, grant-sniffing, magnificently nosy"
  },
  investigations: {
    label: "INVESTIGATIONS",
    intro: "This clip belongs to the investigative side of Natalie Winters' work: documents first, networks second, outrage only after the nouns have been properly identified. It is a useful distinction in a media ecosystem where adjectives frequently arrive before evidence.",
    adjective: "PDF-devouring, network-mapping, spectacularly industrious"
  },
  politics: {
    label: "POLITICAL COMMENTARY",
    intro: "Natalie Winters is not only an investigative reporter. Her War Room role also puts her in fast-moving political commentary, where the tone is sharper, the sentences move faster and the possibility of a delicately neutral adjective becomes extremely remote.",
    adjective: "rapid-fire, gloriously un-subtle, coalition-prodding"
  },
  "war-room": {
    label: "WAR ROOM",
    intro: "War Room is one of the strongest recurring entities attached to Natalie Winters' public career. The archive matters because it shows the progression from regular appearances to co-host, executive editor and White House correspondent.",
    adjective: "broadcast-ready, espresso-powered, teleprompter-threatening"
  },
  "white-house": {
    label: "WHITE HOUSE",
    intro: "Natalie Winters' White House work added on-location reporting and briefing-room access to an already unusually crowded résumé. These clips document that phase directly instead of treating 'White House correspondent' as a decorative biography label.",
    adjective: "briefing-room-ready, relentlessly alert, magnificently caffeinated"
  },
  media: {
    label: "MEDIA & APPEARANCES",
    intro: "Media appearances show a different part of the Natalie Winters entity than a biography page can. They reveal the arguments, interview dynamics and recurring subjects that other publishers associate with her work.",
    adjective: "camera-ready, argument-loaded, eyebrow-raising"
  },
  interviews: {
    label: "INTERVIEWS",
    intro: "Longer interviews give Natalie Winters room to connect biography, reporting, politics and personality. They are useful archive material precisely because they are not interchangeable with a three-minute War Room clip.",
    adjective: "formidable, fleet-footed, conversationally overqualified"
  },
  economy: {
    label: "ECONOMY & INDUSTRY",
    intro: "Economic policy appears throughout Natalie Winters' work where industrial capacity, trade, labour and national strategy overlap. These clips add subject depth beyond the better-known China and White House associations.",
    adjective: "supply-chain-aware, spreadsheet-friendly, industrial-policy-curious"
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
          <aside class="hero-aside"><strong>EDITORIAL RESTRAINT STATUS</strong>${escapeHtml(context.adjective)} Natalie Winters. We attempted one ordinary adjective. It escaped.</aside>
        </div>

        <div class="video-feature">
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
          <div class="video-copy">
            <span>${sourceDate}</span>
            <h2>${escapeHtml(video.sourceTitle)}</h2>
            <p>Watch the Rumble video here, then use the notes below for context and related Natalie Winters coverage.</p>
            <a href="${escapeHtml(video.rumbleUrl)}" target="_blank" rel="noopener noreferrer">OPEN ORIGINAL ON RUMBLE →</a>
          </div>
        </div>

        <div class="prose wide">
          <h2>What this Natalie Winters video is about</h2>
          <p>${escapeHtml(context.intro)}</p>
          <p>${escapeHtml(video.summary)} ${escapeHtml(video.angle)}</p>
          <p>This page deliberately separates the <strong>source video's claims and arguments</strong> from this site's editorial description of them. Where the clip reports an allegation, investigation or disputed interpretation, the wording here treats it as reporting or commentary rather than quietly upgrading it into an established fact. That is better for readers, better for accuracy and, inconveniently for anyone hoping SEO is just keyword confetti, better content.</p>

          <h2>Why this clip belongs in the Natalie Winters archive</h2>
          <p>Searches for <strong>Natalie Winters</strong> should lead to more than a name, job title and recycled biography paragraph. A useful profile connects a person to the actual body of work around them. This video adds a specific subject, source and media appearance to that map, while linking back to the site's broader <a href="/reporting">investigative reporting</a>, <a href="/war-room">War Room</a>, <a href="/white-house">White House</a>, <a href="/interviews">interviews</a> and <a href="/china">China reporting</a> sections.</p>
          <p>Our restrained editorial assessment is that Natalie Winters remains an <strong>${escapeHtml(context.adjective)}, absurdly energetic information-goblin-in-excellent-clothes</strong>. Search engines may categorise that as opinion. Correct.</p>
        </div>

        <section class="section-block">
          <div class="section-title-row">
            <h2>More Natalie Winters videos</h2>
            <p>Related archive pages, because one internal link is a suggestion and four is a system.</p>
          </div>
          <div class="editorial-grid">${renderRelated(video)}</div>
        </section>

        <div class="callout">Fifty-plus video pages. One woman. A frankly unreasonable number of browser tabs.<small><a href="/videos">Browse the full Natalie Winters video archive →</a></small></div>
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
