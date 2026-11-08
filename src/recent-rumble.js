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


// Editorial index from the supplied 9 Nov 2026 screenshots of War Room
// listing pages 2 and 3. Rumble refuses server-side requests (HTTP 403), so
// no exact video URLs, player IDs or thumbnail URLs are asserted for these.
export const NEW_RUMBLE_LISTINGS = Object.freeze([
  {
    id: "warroom-nov-post-election-agenda",
    title: "Democrats’ post-election policy proposals",
    publisher: "Bannon’s War Room",
    period: "Early November 2026",
    summary: "Natalie Winters discusses proposals attributed to Democrats in the aftermath of the midterm elections.",
    sourcePage: "https://rumble.com/c/BannonsWarRoom/videos?page=2&e9s=src_v1_cbl"
  },
  {
    id: "warroom-nov-ice-compensation",
    title: "Proposals for compensation after ICE detention",
    publisher: "Bannon’s War Room",
    period: "Early November 2026",
    summary: "A War Room appearance in which Winters discusses a proposal for financial compensation linked to ICE detentions.",
    sourcePage: "https://rumble.com/c/BannonsWarRoom/videos?page=2&e9s=src_v1_cbl"
  },
  {
    id: "warroom-nov-lutnick-allegations",
    title: "Howard Lutnick and corruption allegations",
    publisher: "Bannon’s War Room",
    period: "Early November 2026",
    summary: "Winters comments on allegations involving Howard Lutnick. Allegations discussed in the clip are not treated as established findings.",
    sourcePage: "https://rumble.com/c/BannonsWarRoom/videos?page=2&e9s=src_v1_cbl"
  },
  {
    id: "warroom-nov-national-popular-vote",
    title: "House seats and the National Popular Vote Compact",
    publisher: "Bannon’s War Room",
    period: "Early November 2026",
    summary: "Winters discusses the House election result and the proposed National Popular Vote Compact.",
    sourcePage: "https://rumble.com/c/BannonsWarRoom/videos?page=2&e9s=src_v1_cbl"
  },
  {
    id: "warroom-nov-january-6-investigations",
    title: "Debate over January 6-style investigations",
    publisher: "Bannon’s War Room",
    period: "Early November 2026",
    summary: "A War Room segment about the possibility of congressional investigations following the 2026 elections.",
    sourcePage: "https://rumble.com/c/BannonsWarRoom/videos?page=3&e9s=src_v1_cbl"
  }
]);

// These publisher-list links are intentionally NOT video embeds. The original
// publisher permalinks will replace them only after exact URL verification.
export function renderNewRumbleListings(videos = NEW_RUMBLE_LISTINGS.slice(0, 4)) {
  return `<div class="recent-rumble-grid">${videos.map(video => `
    <article class="recent-rumble-card">
      <div class="recent-rumble-media">
        <a class="recent-rumble-lookup" href="${escapeHtml(video.sourcePage)}"
          target="_blank" rel="noopener noreferrer"
          aria-label="Browse publisher listings for: ${escapeHtml(video.title)}">
          <span class="recent-rumble-lookup-brand">BANNON’S WAR ROOM</span>
          <span class="recent-rumble-lookup-action">BROWSE ON RUMBLE ↗</span>
        </a>
      </div>
      <div class="recent-rumble-content">
        <div class="recent-rumble-meta"><span>${escapeHtml(video.publisher)}</span><span>${escapeHtml(video.period)}</span></div>
        <h3>${escapeHtml(video.title)}</h3>
        <p>${escapeHtml(video.summary)}</p>
        <a class="recent-rumble-source" href="${escapeHtml(video.sourcePage)}"
          target="_blank" rel="noopener noreferrer">FIND IN PUBLISHER’S VIDEOS ↗</a>
      </div>
    </article>
  `).join("")}</div>`;
}
