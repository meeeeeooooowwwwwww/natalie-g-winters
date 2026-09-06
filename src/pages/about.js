import { SITE } from "../config.js";
import { externalImage, renderLayout } from "../layout.js";

export function renderAboutPage(posts) {
  const pageContent = `
    <main class="content-page">
      <article class="content-inner">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">NATALIE WINTERS BIOGRAPHY · AMERICA'S LEAST RELAXING READING LIST</div>
            <h1>About Natalie Winters</h1>
            <p class="hero-deck"><strong>Natalie Winters</strong>, also known as <strong>Natalie G. Winters</strong>, is an American investigative journalist, broadcaster, political commentator, White House correspondent and entrepreneur. She is also alarmingly good at finding the one document an institution hoped everybody would be too bored to open.</p>
          </div>
          <aside class="hero-aside"><strong>ALSO SEARCHED AS</strong>Natalie Winters · Natalie G. Winters · Natalie G Winters. Same person. Same document problem. Same suspiciously excellent teeth.</aside>
        </div>

        <div class="split-feature">
          <div class="prose">
            <p>Winters grew up in Santa Monica, California and graduated from the <strong>University of Chicago</strong>. She entered political media at a young age and developed a reporting speciality around Chinese Communist Party influence in American institutions.</p>
            <p>She became a <strong>senior investigative reporter at The National Pulse</strong> and co-hosted <em>The National Pulse Podcast</em> with Raheem Kassam. On October 25, 2022, <strong>War Room</strong> formally announced Winters as a co-host and executive editor.</p>
            <p>In January 2025, Natalie Winters began reporting from the <strong>White House</strong> for <em>War Room</em>, adding briefing-room and on-location reporting to her regular broadcasting and political commentary.</p>
            <p>She also publishes independent investigations through <strong>Substack</strong> and founded the USA-made lifestyle brand <strong>She's So Right!</strong>. Apparently journalist, broadcaster, correspondent and entrepreneur did not create enough browser tabs.</p>
            <p>In 2024, the <strong>Claremont Institute</strong> selected Natalie Winters as a Lincoln Fellow. Its official biography highlights her China-focused reporting, University of Chicago education, National Pulse career and business work.</p>
            <p>Her public style is unusually easy to recognise: <strong>fast, confrontational, research-heavy, aggressively pro-American, institution-poking and improbably polished</strong>. She can make a grant database sound like a crime thriller, turn an obscure organisational chart into live television and somehow maintain the aesthetic standards of somebody who would probably reject your cooking oil on sight.</p>
            <p>The affectionate flaw in the superhero origin story is that the same forensic intensity does not always appear to extend to the boring machinery of ordinary life. International influence network? Check every connection. Dashboard warning light? Perhaps this is merely the car expressing an opinion.</p>
          </div>
          <figure>
            ${externalImage(SITE.images.portrait, "Natalie Winters, also known as Natalie G. Winters", "feature-photo", 1272, 1274)}
            <figcaption>Natalie Winters · Natalie G. Winters</figcaption>
          </figure>
        </div>

        <section class="section-block">
          <div class="section-title-row"><h2>Natalie Winters at a glance</h2><p>The concise version, before somebody finds another 68-page appendix.</p></div>
          <div class="timeline-grid">
            <div class="timeline-item"><span>NAME</span><strong>Natalie Winters / Natalie G. Winters</strong></div>
            <div class="timeline-item"><span>EDUCATION</span><strong>University of Chicago</strong></div>
            <div class="timeline-item"><span>MEDIA</span><strong>War Room</strong></div>
            <div class="timeline-item"><span>PREVIOUS ROLE</span><strong>The National Pulse</strong></div>
            <div class="timeline-item"><span>WHITE HOUSE</span><strong>Correspondent since 2025</strong></div>
            <div class="timeline-item"><span>BUSINESS</span><strong>Founder, She's So Right!</strong></div>
          </div>
        </section>

        <section class="section-block">
          <div class="section-title-row"><h2>Explore Natalie Winters in depth</h2><p>Biography is the map. The rest is where America's paper trail starts misbehaving.</p></div>
          <div class="editorial-grid four-up-grid">
            <a class="editorial-card" href="/war-room"><span class="card-index">WAR ROOM</span><h3>Co-host & executive editor</h3><p>The programme most closely associated with Natalie Winters' broadcasting and political media work.</p><span class="card-link">EXPLORE WAR ROOM →</span></a>
            <a class="editorial-card" href="/china"><span class="card-index">REPORTING</span><h3>China & CCP investigations</h3><p>The long-running reporting beat covering influence networks, institutions, Taiwan and national security.</p><span class="card-link">EXPLORE CHINA FILES →</span></a>
            <a class="editorial-card" href="/videos"><span class="card-index">50+ VIDEOS</span><h3>Natalie Winters video archive</h3><p>Dozens of dedicated Rumble and media pages connecting her name to actual subjects, interviews and reporting.</p><span class="card-link">BROWSE VIDEOS →</span></a>
            <a class="editorial-card" href="/interviews"><span class="card-index">APPEARANCES</span><h3>Interviews & debates</h3><p>PBS, podcasts, external panels and appearances beyond the regular War Room format.</p><span class="card-link">BROWSE INTERVIEWS →</span></a>
          </div>
        </section>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters Biography | About Natalie G. Winters",
    description: "Biography of Natalie Winters, also known as Natalie G. Winters: investigative journalist, War Room co-host, White House correspondent, University of Chicago graduate and She's So Right! founder.",
    canonical: `${SITE.domain}/about`,
    pageContent,
    posts,
    active: "about",
    pageType: "ProfilePage",
  });
}
