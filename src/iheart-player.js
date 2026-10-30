// Official iHeart programme-feed embed supplied by the site owner.
// The iframe may open the show feed rather than a specific episode. Always
// provide a direct link to the 29 October Natalie Winters episode beside it.
export const GLENN_BECK_EPISODE_URL = "https://www.iheart.com/podcast/175-the-glenn-beck-program-23014384/episode/best-of-the-program-guest-348722739/";
export const GLENN_BECK_EMBED_URL = "https://www.iheart.com/podcast/175-the-glenn-beck-program-23014384/?embed=true";

export function renderGlennBeckCompactPlayer() {
  return `
    <div class="glenn-beck-compact-player">
      <iframe
        src="${GLENN_BECK_EMBED_URL}"
        title="The Glenn Beck Program on iHeart (programme feed)"
        width="100%"
        height="120"
        loading="lazy"
        allow="autoplay"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
      <a href="${GLENN_BECK_EPISODE_URL}" target="_blank" rel="noopener noreferrer">
        LISTEN TO NATALIE WINTERS · 29 OCTOBER 2026 ↗
      </a>
    </div>
  `;
}
