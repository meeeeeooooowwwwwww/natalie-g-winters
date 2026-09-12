import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderHomePage(posts) {
  const pageContent = `
    <style>
      .authority-stage{position:relative;overflow:hidden;padding:0 22px 62px;background:linear-gradient(180deg,rgba(8,7,10,.98),rgba(2,2,4,.98));border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08)}
      .authority-stage::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 12% 18%,rgba(200,166,92,.10),transparent 25%),radial-gradient(circle at 88% 68%,rgba(255,26,168,.07),transparent 28%);pointer-events:none}
      .authority-inner{position:relative;max-width:var(--page-max);margin:0 auto}
      .authority-intro{display:grid;grid-template-columns:minmax(0,.8fr) minmax(300px,.55fr);gap:50px;align-items:end;padding:54px 0 30px}
      .authority-kicker,.media-kicker{display:block;margin-bottom:12px;font-size:8px;font-weight:800;letter-spacing:.2em;color:#c8a65c}
      .authority-intro h2{margin:0;max-width:760px;font-size:clamp(30px,4vw,56px);line-height:.96;letter-spacing:-.045em;color:#f5f1ed;text-wrap:balance}
      .authority-intro p{margin:0;font-size:13px;line-height:1.7;color:#8f888d}
      .credential-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.018)}
      .credential-card{position:relative;min-height:168px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;text-decoration:none;border-right:1px solid rgba(255,255,255,.085);transition:background .18s ease,transform .18s ease,border-color .18s ease}
      .credential-card:last-child{border-right:0}
      .credential-card:hover{background:linear-gradient(160deg,rgba(200,166,92,.09),rgba(255,255,255,.02));transform:translateY(-2px)}
      .credential-card small{font-size:8px;font-weight:800;letter-spacing:.15em;color:#6f696d}
      .credential-mark{display:flex;min-height:48px;align-items:center;font-weight:900;line-height:.95;color:#f3efeb;letter-spacing:-.035em;text-wrap:balance}
      .credential-card[data-brand="white-house"] .credential-mark{font-family:Georgia,"Times New Roman",serif;font-size:21px;letter-spacing:.04em}
      .credential-card[data-brand="war-room"] .credential-mark{font-size:25px;letter-spacing:-.06em}
      .credential-card[data-brand="uchicago"] .credential-mark{font-family:Georgia,"Times New Roman",serif;font-size:20px;letter-spacing:-.02em}
      .credential-card[data-brand="claremont"] .credential-mark{font-family:Georgia,"Times New Roman",serif;font-size:20px;letter-spacing:.015em}
      .credential-role{font-size:10px;line-height:1.45;color:#9e979b}
      .credential-role strong{display:block;margin-bottom:3px;font-size:9px;letter-spacing:.12em;color:#c8a65c}
      .media-authority{margin-top:28px;padding-top:28px;border-top:1px solid rgba(255,255,255,.075)}
      .media-authority-head{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:18px}
      .media-authority-head h3{margin:0;font-size:15px;letter-spacing:.12em;color:#ddd7da}
      .media-authority-head p{max-width:560px;margin:0;text-align:right;font-size:10px;line-height:1.55;color:#706a6e}
      .media-brand-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));border-top:1px solid rgba(255,255,255,.085);border-bottom:1px solid rgba(255,255,255,.085)}
      .media-brand{min-height:92px;padding:16px 12px;display:flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;color:#9f989c;border-right:1px solid rgba(255,255,255,.07);filter:grayscale(1);transition:color .18s ease,background .18s ease,filter .18s ease,transform .18s ease}
      .media-brand:last-child{border-right:0}
      .media-brand:hover{color:#fff;background:rgba(255,255,255,.035);filter:none;transform:translateY(-2px)}
      .media-brand b{font-size:clamp(12px,1.25vw,18px);line-height:1;letter-spacing:-.035em}
      .media-brand[data-brand="oan"] b{font-family:Georgia,"Times New Roman",serif;font-size:24px;letter-spacing:.04em}
      .media-brand[data-brand="rav"] b{font-size:15px;letter-spacing:-.055em}
      .media-brand[data-brand="beck"] b{font-family:Georgia,"Times New Roman",serif;font-size:17px}
      .media-brand[data-brand="timcast"] b{font-size:18px;letter-spacing:-.065em}
      .media-brand[data-brand="human-events"] b{font-family:Georgia,"Times New Roman",serif;font-size:16px;letter-spacing:-.02em}
      .media-brand[data-brand="first"] b{font-size:21px;letter-spacing:-.06em}
      .authority-note{margin:14px 0 0;font-size:9px;line-height:1.55;color:#5d575b}
      @media(max-width:980px){.authority-intro{grid-template-columns:1fr;gap:18px}.credential-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.credential-card:nth-child(2){border-right:0}.credential-card:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.085)}.media-brand-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.media-brand:nth-child(3){border-right:0}.media-brand:nth-child(-n+3){border-bottom:1px solid rgba(255,255,255,.07)}}
      @media(max-width:620px){.authority-stage{padding:0 14px 42px}.authority-intro{padding-top:38px}.credential-grid{grid-template-columns:1fr}.credential-card{min-height:132px;border-right:0;border-bottom:1px solid rgba(255,255,255,.085)}.credential-card:last-child{border-bottom:0}.media-authority-head{display:block}.media-authority-head p{margin-top:10px;text-align:left}.media-brand-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.media-brand:nth-child(odd){border-right:1px solid rgba(255,255,255,.07)}.media-brand:nth-child(even){border-right:0}.media-brand:nth-child(-n+4){border-bottom:1px solid rgba(255,255,255,.07)}}
    </style>

    <main>
      <section class="home-hero" aria-labelledby="home-title">
        <div class="home-hero-inner">
          <div class="hero-copy">
            <div class="hero-copy-inner">
              <p class="eyebrow">WHITE HOUSE CORRESPONDENT · WAR ROOM · INVESTIGATIONS</p>
              <h1 id="home-title">Natalie G. Winters</h1>
              <p class="hero-headline">Investigative reporting. White House access. A national media voice.</p>
              <p class="hero-summary"><strong>Natalie G. Winters</strong> is a White House correspondent, investigative journalist and <em>War Room</em> co-host and executive editor known for reporting on foreign influence, national security and the institutions shaping American politics.</p>

              <nav class="hero-actions" aria-label="Explore Natalie G. Winters">
                <a href="/about">BIOGRAPHY <span aria-hidden="true">→</span></a>
                <a href="/articles">LATEST REPORTING <span aria-hidden="true">→</span></a>
                <a href="/interviews">MEDIA <span aria-hidden="true">→</span></a>
              </nav>

              <div class="hero-proof" aria-label="Natalie G. Winters career highlights">
                <span><b>WHITE HOUSE</b> correspondent</span>
                <span><b>WAR ROOM</b> co-host &amp; executive editor</span>
                <span><b>UCHICAGO</b> graduate</span>
              </div>
            </div>
          </div>

          <div class="hero-media">
            <div class="hero-media-header">
              <span>OAN · THE MATT GAETZ SHOW</span>
              <a href="${SITE.heroVideoSource}" target="_blank" rel="noopener noreferrer">WATCH ON OAN →</a>
            </div>

            <div class="hero-video" aria-label="Natalie G. Winters on The Matt Gaetz Show on One America News">
              <iframe
                src="${SITE.heroVideoEmbed}"
                title="Natalie G. Winters on The Matt Gaetz Show on One America News"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>

            <nav class="hero-quick-grid" aria-label="Explore Natalie G. Winters coverage">
              <a class="hero-quick-card" href="/china">
                <span>CHINA FILES</span>
                <strong>Foreign influence, United Front networks and the documents connecting them.</strong>
                <small>OPEN FILES →</small>
              </a>
              <a class="hero-quick-card" href="/war-room">
                <span>WAR ROOM</span>
                <strong>Investigations, broadcasts and the paper trail brought onto air.</strong>
                <small>ENTER WAR ROOM →</small>
              </a>
              <a class="hero-quick-card" href="/white-house">
                <span>WHITE HOUSE</span>
                <strong>Briefing-room reporting and political coverage from Washington.</strong>
                <small>VIEW COVERAGE →</small>
              </a>
            </nav>
          </div>
        </div>
      </section>

      <section class="authority-stage" aria-labelledby="authority-title">
        <div class="authority-inner">
          <div class="authority-intro">
            <div>
              <span class="authority-kicker">CAREER · CREDENTIALS · INSTITUTIONS</span>
              <h2 id="authority-title">The record speaks before the biography does.</h2>
            </div>
            <p>Selected institutions and roles from Natalie G. Winters' career, presented as direct paths into the work rather than decorative name-dropping.</p>
          </div>

          <div class="credential-grid" aria-label="Natalie G. Winters credentials and institutions">
            <a class="credential-card" data-brand="white-house" href="/white-house">
              <small>WASHINGTON · D.C.</small>
              <span class="credential-mark">THE WHITE HOUSE</span>
              <span class="credential-role"><strong>CORRESPONDENT</strong>White House press coverage</span>
            </a>
            <a class="credential-card" data-brand="war-room" href="https://warroom.org/tag/natalie-winters/" target="_blank" rel="noopener noreferrer">
              <small>BROADCAST · EDITORIAL</small>
              <span class="credential-mark">WAR ROOM</span>
              <span class="credential-role"><strong>CO-HOST &amp; EXECUTIVE EDITOR</strong>Broadcasts, investigations and interviews</span>
            </a>
            <a class="credential-card" data-brand="uchicago" href="/career">
              <small>EDUCATION</small>
              <span class="credential-mark">University of Chicago</span>
              <span class="credential-role"><strong>GRADUATE</strong>Career timeline and background</span>
            </a>
            <a class="credential-card" data-brand="claremont" href="https://www.claremont.org/2024-lincoln-fellows/" target="_blank" rel="noopener noreferrer">
              <small>FELLOWSHIP · 2024</small>
              <span class="credential-mark">Claremont Institute</span>
              <span class="credential-role"><strong>LINCOLN FELLOW</strong>Jack Roth Charitable Foundation Lincoln Fellowship</span>
            </a>
          </div>

          <div class="media-authority">
            <div class="media-authority-head">
              <div>
                <span class="media-kicker">MEDIA &amp; MOVEMENT</span>
                <h3>FEATURED &amp; WELCOMED ACROSS</h3>
              </div>
              <p>Selected networks and shows that have hosted, featured or amplified Natalie G. Winters. Every mark links directly to an appearance.</p>
            </div>

            <div class="media-brand-grid" aria-label="Selected Natalie G. Winters media appearances">
              <a class="media-brand" data-brand="oan" href="https://www.youtube.com/watch?v=CP-Wzou3NzI" target="_blank" rel="noopener noreferrer" title="Natalie G. Winters on The Matt Gaetz Show, One America News"><b>OAN</b></a>
              <a class="media-brand" data-brand="rav" href="https://americasvoice.news/i-think-we-have-our-country-back/" target="_blank" rel="noopener noreferrer" title="Natalie G. Winters on Real America's Voice"><b>REAL AMERICA'S VOICE</b></a>
              <a class="media-brand" data-brand="beck" href="https://www.theblaze.com/shows/the-glenn-beck-program/george-soros-protests" target="_blank" rel="noopener noreferrer" title="Natalie G. Winters on The Glenn Beck Program"><b>GLENN BECK</b></a>
              <a class="media-brand" data-brand="timcast" href="https://www.youtube.com/watch?v=06KBLBphdV0" target="_blank" rel="noopener noreferrer" title="Natalie G. Winters on Timcast IRL"><b>TIMCAST IRL</b></a>
              <a class="media-brand" data-brand="human-events" href="https://humanevents.com/2024/12/11/natalie-winters-chris-wray-stepping-down-will-not-make-our-appetite-for-justice-dissipate" target="_blank" rel="noopener noreferrer" title="Natalie G. Winters on Human Events Daily"><b>HUMAN EVENTS</b></a>
              <a class="media-brand" data-brand="first" href="https://www.thefirsttv.com/watch/americas-institutions-have-been-seized-by-communists/" target="_blank" rel="noopener noreferrer" title="Natalie G. Winters on The First"><b>THE FIRST</b></a>
            </div>
            <p class="authority-note">Appearance links document the relationship shown. Institutional marks identify education, fellowship or professional roles and do not imply organisational endorsement unless explicitly stated by the source.</p>
          </div>
        </div>
      </section>
    </main>
  `;

  return renderLayout({
    title: "Natalie G. Winters | White House Correspondent & Investigative Journalist",
    description:
      "Natalie G. Winters is a White House correspondent, investigative journalist and War Room co-host and executive editor. Biography, reporting, White House coverage, interviews and video archive.",
    canonical: `${SITE.domain}/`,
    pageContent,
    posts,
    pageType: "ProfilePage",
  });
}
