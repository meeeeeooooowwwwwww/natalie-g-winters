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
