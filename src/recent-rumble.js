import { escapeHtml } from "./utils.js";

// Source URLs and titles read directly from Rumble search on 30 October 2026.
// Publisher-native oEmbed metadata independently verified for all five on
// 31 Oct 2026: correct embed URLs and first-party Rumble CDN thumbnails.
// Search results supplied relative publication dates, so don't invent exact days.
export const RECENT_RUMBLE_VIDEOS = Object.freeze([
  {
    id: "v7hfm0m",
    embedUrl: "https://rumble.com/embed/v7f9934/",
    thumbnailUrl: "https://hugh.cdn.rumble.cloud/video/fwe2/3d/s8/6/2/O/u/-/2Ou-A.qR4e.jpg",
    title: "Obama alumni network and election-related content moderation",
    sourceTitle: "Natalie Winters Exposes Obama Alumni Group’s Election-Censorship Operation and Left-Wing Censorship Network’s Plan to Shield Itself from U.S. Political Changes",
    url: "https://rumble.com/v7hfm0m-winters.html",
    publisher: "Bannon’s War Room",
    period: "Late October 2026",
    summary: "In this recent War Room appearance, Natalie Winters discusses her reporting about an Obama alumni network and election-related content moderation."
  },
  {
    id: "v7hcxyw",
    embedUrl: "https://rumble.com/embed/v7f6l1e/",
    thumbnailUrl: "https://hugh.cdn.rumble.cloud/video/fww1/ec/s8/6/4/p/2/9/4p29A.qR4e.jpg",
    title: "Inside the neoconservatives’ plans for the Republican Party",
    sourceTitle: "Natalie Winters: Inside the NeoCons’ Secret Plan to Take the Republican Party Back",
    url: "https://rumble.com/v7hcxyw-natalie-winters-inside-the-neocons-secret-plan-to-take-the-republican-party.html",
    publisher: "TheLibertyDaily",
    period: "Late October 2026",
    summary: "An appearance covering Natalie Winters’ reporting on political organising and efforts to influence the direction of the Republican Party."
  },
  {
    id: "v7hbz26",
    embedUrl: "https://rumble.com/embed/v7f5m4o/",
    thumbnailUrl: "https://hugh.cdn.rumble.cloud/video/fwe2/77/s8/6/-/m/R/9/-mR9A.qR4e.jpg",
    title: "Political disputes and efforts directed at Trump",
    sourceTitle: "NATALIE WINTERS: THE POLITICAL WARFARE OF DEMOCRATS VOW TO GO AFTER TRUMP",
    url: "https://rumble.com/v7hbz26-natalie-winters-the-political-warfare-of-democrats-vow-to-go-after-trump.html",
    publisher: "Bannon’s War Room",
    period: "Late October 2026",
    summary: "Natalie Winters discusses political and legal opposition to Donald Trump in a recent War Room broadcast."
  },
  {
    id: "v7hape6",
    embedUrl: "https://rumble.com/embed/v7f4cgo/",
    thumbnailUrl: "https://hugh.cdn.rumble.cloud/video/fwe2/74/s8/6/o/W/C/9/oWC9A.qR4e.jpg",
    title: "Election reporting: red mirages and blue shifts",
    sourceTitle: "Natalie Winters: Democrats are bringing back the “Red Mirage” and “Blue Shift.” They want to normalize waiting days—even weeks—for midterm results.",
    url: "https://rumble.com/v7hape6-natalie.html",
    publisher: "Bannon’s War Room",
    period: "Late October 2026",
    summary: "A War Room clip in which Natalie Winters discusses contested interpretations of vote-counting delays and election-night result projections."
  },
  {
    id: "v7hapky",
    embedUrl: "https://rumble.com/embed/v7f4cng/",
    thumbnailUrl: "https://hugh.cdn.rumble.cloud/video/fwe2/5b/s8/6/c/0/C/9/c0C9A.qR4e.jpg",
    title: "Republican Party strategy: additional War Room clip",
    sourceTitle: "Natalie Winters: Inside the Neocons’ Secret Plan to Take the Republican Party Back",
    url: "https://rumble.com/v7hapky-natalie-winters-inside-the-neocons-secret-plan-to-take-the-republican-party.html",
    publisher: "Bannon’s War Room",
    period: "Late October 2026",
    summary: "An additional publisher upload concerning the political-organising story covered in the neoconservative-party report."
  }
]);

// A user-initiated button replaces its poster with the actual Rumble iframe.
// The Rumble source link stays separate, so selecting Play never navigates away.
export function renderRumblePlayButton(video, extraClass = "") {
  if (!video?.embedUrl || !video?.thumbnailUrl) return "";
  return `<button type="button"
    class="recent-rumble-poster ${escapeHtml(extraClass)}"
    data-rumble-embed="${escapeHtml(video.embedUrl)}"
    data-rumble-title="${escapeHtml(video.sourceTitle)}"
    aria-label="Play video here: ${escapeHtml(video.title)}">
      <img class="recent-rumble-thumbnail" src="${escapeHtml(video.thumbnailUrl)}"
        alt="" width="1280" height="720" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      <span class="recent-rumble-poster-kicker" aria-hidden="true">NATALIE G. WINTERS</span>
      <span class="recent-rumble-play" aria-hidden="true">▶</span>
      <span class="recent-rumble-poster-title" aria-hidden="true">PLAY VIDEO</span>
    </button>`;
}

export function renderRecentRumbleCards(videos = RECENT_RUMBLE_VIDEOS.slice(0, 4)) {
  return `<div class="recent-rumble-grid">${videos.map((video) => `
    <article class="recent-rumble-card">
      <div class="recent-rumble-media">
        ${renderRumblePlayButton(video)}
      </div>
      <div class="recent-rumble-content">
        <div class="recent-rumble-meta"><span>${escapeHtml(video.publisher)}</span><span>${escapeHtml(video.period)}</span></div>
        <h3>${escapeHtml(video.title)}</h3>
        <p>${escapeHtml(video.summary)}</p>
        <a class="recent-rumble-source" href="${escapeHtml(video.url)}" target="_blank" rel="noopener noreferrer">ORIGINAL ON RUMBLE ↗</a>
      </div>
    </article>
  `).join("")}</div>`;
}


// Verified against the publisher's official oEmbed JSON on 9 Nov 2026.
// The original URL, real Rumble iframe URL, and native CDN thumbnail must
// travel together. No guessed player IDs or generic stock thumbnails.
export const NEW_RUMBLE_LISTINGS = Object.freeze([
  {
    id: "v7hx5mo",
    title: "Democrats’ post-election policy proposals",
    sourceTitle: "Natalie Winters: The most concerning stuff that the Democrats are pushing is the compounding of the amnesty stuff with what they want to do to elections, because that is fundamentally irreversible.",
    url: "https://rumble.com/v7hx5mo-winters.html",
    embedUrl: "https://rumble.com/embed/v7fqsp6/",
    thumbnailUrl: "https://hugh.cdn.rumble.cloud/video/fwe2/ab/s8/6/a/F/C/b/aFCbB.qR4e.jpg",
    publisher: "Bannon’s War Room",
    period: "5 November 2026",
    summary: "Natalie Winters discusses proposals attributed to Democrats in the aftermath of the midterm elections."
  },
  {
    id: "v7hx4uu",
    title: "Proposals for compensation after ICE detention",
    sourceTitle: "Natalie Winters: The Dems want to reimburse victims of ICE $500k—that’s the opening bid. For every additional day they were in detention, they’ll get another $100k. So you can only imagine what these people want to do when it comes to citizenship.",
    url: "https://rumble.com/v7hx4uu-winters.html",
    embedUrl: "https://rumble.com/embed/v7fqrxc/",
    thumbnailUrl: "https://hugh.cdn.rumble.cloud/video/fwe2/f0/s8/6/w/p/C/b/wpCbB.qR4e.jpg",
    publisher: "Bannon’s War Room",
    period: "5 November 2026",
    summary: "A War Room appearance in which Winters discusses a proposal for financial compensation linked to ICE detentions."
  },
  {
    id: "v7hx35w",
    title: "Howard Lutnick and corruption allegations",
    sourceTitle: "Natalie Winters: People like Howard Lutnick have engaged in corruption and made some really shady deals. Democrats are going to try to link people like him—the actual grifters in the administration—to the entire MAGA movement.",
    url: "https://rumble.com/v7hx35w-winters.html",
    embedUrl: "https://rumble.com/embed/v7fqq8e/",
    thumbnailUrl: "https://hugh.cdn.rumble.cloud/video/fww1/2f/s8/6/e/T/B/b/eTBbB.qR4e.jpg",
    publisher: "Bannon’s War Room",
    period: "5 November 2026",
    summary: "Winters comments on allegations involving Howard Lutnick. Allegations discussed in the clip are not treated as established findings."
  },
  {
    id: "v7hx2o8",
    title: "House seats and the National Popular Vote Compact",
    sourceTitle: "Natalie Winters: The number of House seats Dems hold now could allow them to institute the National Popular Vote Compact, meaning the Electoral College would no longer determine how we choose our presidents.",
    url: "https://rumble.com/v7hx2o8-winters.html",
    embedUrl: "https://rumble.com/embed/v7fqpqq/",
    thumbnailUrl: "https://hugh.cdn.rumble.cloud/video/fww1/7d/s8/6/i/J/B/b/iJBbB.qR4e.jpg",
    publisher: "Bannon’s War Room",
    period: "5 November 2026",
    summary: "Winters discusses the House election result and the proposed National Popular Vote Compact."
  },
  {
    id: "v7hv0u6",
    title: "Debate over January 6-style investigations",
    sourceTitle: "NATALIE WINTERS: Democrats Want January 6-Style Investigations And Show Trials Against The Trump Administration With Republican Help",
    url: "https://rumble.com/v7hv0u6-natalie-winters-democrats-want-january-6-style-investigations.html",
    embedUrl: "https://rumble.com/embed/v7fonwo/",
    thumbnailUrl: "https://hugh.cdn.rumble.cloud/video/fwe2/86/s8/6/-/l/e/b/-lebB.qR4e.jpg",
    publisher: "Bannon’s War Room",
    period: "4 November 2026",
    summary: "A War Room segment about the possibility of congressional investigations following the 2026 elections."
  }
]);

// Use the same click-to-play component as the verified October archive.
// This keeps the Rumble thumbnail, source link and iframe behaviour identical.
export function renderNewRumbleListings(videos = NEW_RUMBLE_LISTINGS.slice(0, 4)) {
  return renderRecentRumbleCards(videos);
}
