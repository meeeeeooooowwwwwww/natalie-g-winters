import { SITE } from "../config.js";
import { externalImage, renderLayout } from "../layout.js";

export function renderWhiteHousePage(posts) {
  const pageContent = `
    <main class="content-page">
      <article class="content-inner">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">WHITE HOUSE</div>
            <h1>Natalie Winters at the White House</h1>
            <p class="hero-deck">In January 2025, Natalie Winters entered the White House press environment as War Room's correspondent, becoming one of the most recognisable figures in the administration's expanded "new media" press contingent.</p>
          </div>
          <aside class="hero-aside"><strong>FIRST DAY</strong>January 28, 2025. A press pass, a live hit from the White House lawn and, famously, one missing "r" in "correspondent". The internet survived.</aside>
        </div>

        <div class="split-feature reverse">
          <figure>
            ${externalImage(SITE.images.whiteHouse, "Natalie Winters reporting outside the White House")}
            <figcaption>Natalie Winters reporting from the White House</figcaption>
          </figure>

          <div class="prose">
            <p><strong>Natalie Winters began serving as War Room's White House correspondent in January 2025.</strong> War Room's January 28 show featured her reporting live from the White House as the programme formally announced the role.</p>
            <p>Her arrival coincided with the Trump administration's effort to widen access for podcasters, digital outlets and other non-traditional media. The result placed Winters directly inside a broader argument about who counts as White House media, how audiences are built, and whether old gatekeeping structures still match the modern information environment.</p>
            <p>Columbia Journalism Review later profiled Winters as part of that shift, describing how War Room's plan for a White House correspondent developed and how new conservative media were moving into spaces previously dominated by legacy organisations.</p>
            <p>Since then, Winters has combined briefing-room access and White House reporting with regular War Room hosting and external appearances. Subtle she is not. Searchable she certainly is.</p>
          </div>
        </div>

        <section class="section-block">
          <div class="section-title-row"><h2>From lawn hit to press-room fixture</h2><p>A few markers in the White House chapter.</p></div>
          <div class="fact-ribbon">
            <div><span>JAN 28, 2025</span><strong>War Room announces White House role</strong></div>
            <div><span>NEW MEDIA</span><strong>Part of a widened press-access strategy</strong></div>
            <div><span>ON AIR</span><strong>Live reporting plus regular War Room hosting</strong></div>
            <div><span>PUBLIC PROFILE</span><strong>Covered by national and media-industry press</strong></div>
          </div>
        </section>

        <section class="section-block">
          <div class="video-feature">
            <div class="video-frame"><iframe src="https://rumble.com/embed/v6c48kg/?pub=4" title="Natalie Winters announced as War Room White House correspondent" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>
            <div class="video-copy"><span>WAR ROOM · JANUARY 28, 2025</span><h3>The White House correspondent announcement</h3><p>War Room's clip announcing Natalie Winters in the role, reporting live from the White House.</p><a href="https://warroom.org/bannons-warroom-show-clip-roundup-28-jan-25-am/" target="_blank" rel="noopener noreferrer">OPEN WAR ROOM SOURCE →</a></div>
          </div>
        </section>

        <section class="section-block">
          <div class="section-title-row"><h2>Further reading</h2><p>Contemporary coverage of the new-media press shift.</p></div>
          <div class="source-list">
            <a class="source-link" href="https://www.cjr.org/analysis/white-house-press-karoline-leavitt-natalie-winters-new-media.php" target="_blank" rel="noopener noreferrer"><div><span>Columbia Journalism Review: The New Kids in the Room</span><small>February 19, 2025</small></div><b>→</b></a>
            <a class="source-link" href="https://warroom.org/bannons-warroom-show-clip-roundup-28-jan-25-am/" target="_blank" rel="noopener noreferrer"><div><span>War Room: White House correspondent announcement</span><small>January 28, 2025</small></div><b>→</b></a>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters White House Correspondent | War Room",
    description: "Natalie Winters at the White House: War Room correspondent since January 2025, new-media press access, reporting, video and career context.",
    canonical: `${SITE.domain}/white-house`,
    pageContent,
    posts,
    active: "white-house",
  });
}
