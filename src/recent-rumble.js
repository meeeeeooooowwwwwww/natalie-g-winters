import { escapeHtml } from "./utils.js";

// Source URLs and titles read directly from Rumble search on 30 October 2026.
// Rumble's search labels were relative (3 / 5 / 6 days); avoid claiming
// an exact publication date or fabricating video-player / thumbnail IDs.
export const RECENT_RUMBLE_VIDEOS = Object.freeze([
  {
    id: "v7hfm0m",
    title: "Obama alumni network and election-related content moderation",
    sourceTitle: "Natalie Winters Exposes Obama Alumni Group’s Election-Censorship Operation and Left-Wing Censorship Network’s Plan to Shield Itself from U.S. Political Changes",
    url: "https://rumble.com/v7hfm0m-winters.html",
    publisher: "Bannon’s War Room",
    period: "Late October 2026",
    summary: "In this recent War Room appearance, Natalie Winters discusses her reporting about an Obama alumni network and election-related content moderation."
  },
  {
    id: "v7hcxyw",
    title: "Inside the neoconservatives’ plans for the Republican Party",
    sourceTitle: "Natalie Winters: Inside the NeoCons’ Secret Plan to Take the Republican Party Back",
    url: "https://rumble.com/v7hcxyw-natalie-winters-inside-the-neocons-secret-plan-to-take-the-republican-party.html",
    publisher: "TheLibertyDaily",
    period: "Late October 2026",
    summary: "An appearance covering Natalie Winters’ reporting on political organising and efforts to influence the direction of the Republican Party."
  },
  {
    id: "v7hbz26",
    title: "Political disputes and efforts directed at Trump",
    sourceTitle: "NATALIE WINTERS: THE POLITICAL WARFARE OF DEMOCRATS VOW TO GO AFTER TRUMP",
    url: "https://rumble.com/v7hbz26-natalie-winters-the-political-warfare-of-democrats-vow-to-go-after-trump.html",
    publisher: "Bannon’s War Room",
    period: "Late October 2026",
    summary: "Natalie Winters discusses political and legal opposition to Donald Trump in a recent War Room broadcast."
  },
  {
    id: "v7hape6",
    title: "Election reporting: red mirages and blue shifts",
    sourceTitle: "Natalie Winters: Democrats are bringing back the “Red Mirage” and “Blue Shift.” They want to normalize waiting days—even weeks—for midterm results.",
    url: "https://rumble.com/v7hape6-natalie.html",
    publisher: "Bannon’s War Room",
    period: "Late October 2026",
    summary: "A War Room clip in which Natalie Winters discusses contested interpretations of vote-counting delays and election-night result projections."
  },
  {
    id: "v7hapky",
    title: "Republican Party strategy: additional War Room clip",
    sourceTitle: "Natalie Winters: Inside the Neocons’ Secret Plan to Take the Republican Party Back",
    url: "https://rumble.com/v7hapky-natalie-winters-inside-the-neocons-secret-plan-to-take-the-republican-party.html",
    publisher: "Bannon’s War Room",
    period: "Late October 2026",
    summary: "An additional publisher upload concerning the political-organising story covered in the neoconservative-party report."
  }
]);

export function renderRecentRumbleCards(videos = RECENT_RUMBLE_VIDEOS.slice(0, 4)) {
  return `<div class="recent-rumble-grid">${videos.map((video) => `
    <article class="recent-rumble-card">
      <a class="recent-rumble-link" href="${escapeHtml(video.url)}" target="_blank" rel="noopener noreferrer" aria-label="Watch on Rumble: ${escapeHtml(video.sourceTitle)}">
        <div class="recent-rumble-poster" aria-hidden="true">
          <span class="recent-rumble-poster-kicker">NATALIE G. WINTERS</span>
          <span class="recent-rumble-play">▶</span>
          <span class="recent-rumble-poster-title">ORIGINAL BROADCAST</span>
        </div>
        <div class="recent-rumble-content">
          <div class="recent-rumble-meta"><span>${escapeHtml(video.publisher)}</span><span>${escapeHtml(video.period)}</span></div>
          <h3>${escapeHtml(video.title)}</h3>
          <p>${escapeHtml(video.summary)}</p>
          <span class="recent-rumble-cta">WATCH ORIGINAL VIDEO ↗</span>
        </div>
      </a>
    </article>
  `).join("")}</div>`;
}
