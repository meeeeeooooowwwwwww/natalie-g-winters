// Official iHeart programme-feed embed supplied by the site owner.
// Embed and direct link both target the exact 29 October Natalie Winters episode.
// Playback is initiated by the visitor; never enable autoplay.
export const GLENN_BECK_EPISODE_URL = "https://www.iheart.com/podcast/175-the-glenn-beck-program-23014384/episode/best-of-the-program-guest-natalie-winters-102926-348722739/";
export const GLENN_BECK_EMBED_URL = "https://www.iheart.com/podcast/175-the-glenn-beck-program-23014384/episode/best-of-the-program-guest-natalie-winters-102926-348722739/?embed=true";

export function renderGlennBeckCompactPlayer() {
  return `
    <div class="glenn-beck-compact-player">
      <iframe
        src="${GLENN_BECK_EMBED_URL}"
        title="Natalie Winters on The Glenn Beck Program, 29 October 2026"
        width="100%"
        height="120"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
      <a href="${GLENN_BECK_EPISODE_URL}" target="_blank" rel="noopener noreferrer">
        LISTEN TO NATALIE WINTERS · 29 OCTOBER 2026 ↗
      </a>
    </div>
  `;
}
