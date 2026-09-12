import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";

export function renderHomePage(posts) {
  const pageContent = `
    <style>
      @media(min-width:981px){
        .hero-copy h1{
          font-size:clamp(46px,3.7vw,64px);
          line-height:.9;
          letter-spacing:-.06em;
          white-space:nowrap;
          text-wrap:nowrap;
        }
      }

      .authority-stage{
        position:relative;
        overflow:hidden;
        padding:0 22px clamp(58px,5vw,80px);
        background:linear-gradient(180deg,rgba(8,7,10,.98),rgba(2,2,4,.98));
        border-top:1px solid rgba(255,255,255,.08);
        border-bottom:1px solid rgba(255,255,255,.08);
      }

      .authority-stage::before{
        content:"";
        position:absolute;
        inset:0;
        background:
          radial-gradient(circle at 12% 18%,rgba(200,166,92,.09),transparent 25%),
          radial-gradient(circle at 88% 68%,rgba(255,26,168,.06),transparent 28%);
        pointer-events:none;
      }

      .authority-inner{
        position:relative;
        max-width:var(--page-max);
        margin:0 auto;
      }

      .authority-layout{
        display:grid;
        grid-template-columns:minmax(0,1fr) clamp(270px,18vw,300px);
        gap:clamp(28px,2.4vw,42px);
        align-items:start;
      }

      .authority-main{min-width:0}

      .authority-intro{
        display:grid;
        grid-template-columns:minmax(0,1fr) minmax(260px,.52fr);
        gap:clamp(34px,3vw,52px);
        align-items:end;
        padding:clamp(48px,4vw,64px) 0 32px;
      }

      .authority-kicker,
      .media-kicker,
      .rail-kicker{
        display:block;
        margin-bottom:12px;
        font-size:8px;
        font-weight:800;
        letter-spacing:.2em;
        color:#c8a65c;
      }

      .authority-intro h2{
        margin:0;
        max-width:690px;
        font-size:clamp(32px,3.2vw,50px);
        line-height:.98;
        letter-spacing:-.042em;
        color:#f5f1ed;
        text-wrap:balance;
        scroll-margin-top:88px;
      }

      .authority-intro p{
        max-width:430px;
        margin:0;
        font-size:13px;
        line-height:1.7;
        color:#8f888d;
      }

      .credential-grid{
        display:grid;
        grid-template-columns:repeat(4,minmax(0,1fr));
        gap:10px;
      }

      .credential-card{
        position:relative;
        min-height:196px;
        padding:22px 22px 20px;
        display:grid;
        grid-template-rows:auto 1fr auto;
        gap:14px;
        text-decoration:none;
        border:1px solid rgba(255,255,255,.09);
        background:linear-gradient(155deg,rgba(255,255,255,.026),rgba(255,255,255,.009));
        transition:background .18s ease,transform .18s ease,border-color .18s ease,box-shadow .18s ease;
      }

      .credential-card:hover{
        border-color:rgba(200,166,92,.26);
        background:linear-gradient(155deg,rgba(200,166,92,.065),rgba(255,255,255,.014));
        box-shadow:0 18px 40px rgba(0,0,0,.18);
        transform:translateY(-2px);
      }

      .credential-card small{
        font-size:8px;
        font-weight:800;
        letter-spacing:.15em;
        color:#6f696d;
      }

      .credential-logo{
        min-height:72px;
        display:flex;
        align-items:center;
        justify-content:center;
        overflow:hidden;
      }

      .credential-logo img{
        display:block;
        width:auto;
        height:auto;
        max-width:88%;
        max-height:58px;
        object-fit:contain;
        object-position:center;
        filter:grayscale(1) brightness(0) invert(1);
        opacity:.9;
        transition:opacity .18s ease,filter .18s ease,transform .18s ease;
      }

      .credential-card:hover .credential-logo img{
        opacity:1;
        transform:scale(1.025);
      }

      .credential-card[data-brand="white-house"] .credential-logo img{
        max-height:66px;
        max-width:72%;
      }

      .credential-card[data-brand="war-room"] .credential-logo img{
        max-height:68px;
        max-width:92%;
        filter:grayscale(1) contrast(1.12) brightness(.94);
        opacity:.95;
      }

      .credential-card[data-brand="uchicago"] .credential-logo img{
        max-height:52px;
        max-width:88%;
      }

      .credential-card[data-brand="claremont"] .credential-logo img{
        max-height:50px;
        max-width:88%;
      }

      .credential-role{
        font-size:10px;
        line-height:1.48;
        color:#9e979b;
      }

      .credential-role strong{
        display:block;
        margin-bottom:4px;
        font-size:9px;
        letter-spacing:.12em;
        color:#c8a65c;
      }

      .media-authority{
        margin-top:36px;
        padding-top:32px;
        border-top:1px solid rgba(255,255,255,.075);
      }

      .media-authority-head{
        display:grid;
        grid-template-columns:minmax(0,1fr) minmax(280px,.7fr);
        gap:32px;
        align-items:end;
        margin-bottom:20px;
      }

      .media-authority-head h3{
        margin:0;
        font-size:16px;
        line-height:1.15;
        letter-spacing:.12em;
        color:#ddd7da;
      }

      .media-authority-head p{
        max-width:470px;
        margin:0 0 1px auto;
        text-align:right;
        font-size:10px;
        line-height:1.6;
        color:#706a6e;
      }

      .media-brand-grid{
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:9px;
      }

      .media-brand{
        position:relative;
        min-height:124px;
        padding:22px 18px 34px;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
        text-decoration:none;
        border:1px solid rgba(255,255,255,.085);
        background:linear-gradient(155deg,rgba(255,255,255,.022),rgba(255,255,255,.006));
        overflow:hidden;
        transition:background .18s ease,transform .18s ease,border-color .18s ease,box-shadow .18s ease;
      }

      .media-brand:hover{
        border-color:rgba(255,255,255,.16);
        background:rgba(255,255,255,.035);
        box-shadow:0 15px 34px rgba(0,0,0,.16);
        transform:translateY(-2px);
      }

      .media-brand img{
        display:block;
        width:auto;
        height:auto;
        max-width:70%;
        max-height:58px;
        object-fit:contain;
        filter:grayscale(1) brightness(0) invert(1);
        opacity:.8;
        transition:opacity .18s ease,transform .18s ease,filter .18s ease;
      }

      .media-brand:hover img{
        opacity:1;
        transform:scale(1.035);
      }

      .media-brand-date{
        position:absolute;
        left:14px;
        bottom:11px;
        font-size:7px;
        font-weight:800;
        letter-spacing:.14em;
        color:#6f696d;
      }

      .media-brand[data-brand="oan"] img{
        max-height:62px;
        max-width:44%;
      }

      .media-brand[data-brand="rav"] img{
        max-height:66px;
        max-width:58%;
      }

      .media-brand[data-brand="beck"] img{
        max-height:64px;
        max-width:68%;
        filter:grayscale(1) invert(1) contrast(1.12);
        opacity:.9;
      }

      .media-brand[data-brand="war-room"] img{
        max-height:72px;
        max-width:76%;
        filter:grayscale(1) contrast(1.12) brightness(.94);
        opacity:.96;
      }

      .authority-note{
        max-width:980px;
        margin:14px 0 0;
        font-size:9px;
        line-height:1.55;
        color:#5d575b;
      }

      .authority-rail{
        position:sticky;
        top:76px;
        margin-top:clamp(48px,4vw,64px);
        border:1px solid rgba(255,255,255,.1);
        background:linear-gradient(180deg,rgba(255,255,255,.032),rgba(255,255,255,.01));
        box-shadow:0 24px 70px rgba(0,0,0,.23);
      }

      .rail-header{
        padding:21px 20px 19px;
        border-bottom:1px solid rgba(255,255,255,.08);
      }

      .rail-header h3{
        margin:0;
        font-size:22px;
        line-height:1;
        letter-spacing:-.035em;
        color:#f3efeb;
        white-space:nowrap;
      }

      .rail-list{display:grid}

      .rail-item{
        display:block;
        padding:17px 20px;
        text-decoration:none;
        border-bottom:1px solid rgba(255,255,255,.065);
        transition:background .18s ease,padding-left .18s ease;
      }

      .rail-item:hover{
        background:rgba(200,166,92,.055);
        padding-left:24px;
      }

      .rail-item span{
        display:block;
        margin-bottom:5px;
        font-size:8px;
        font-weight:800;
        letter-spacing:.14em;
        color:#c8a65c;
      }

      .rail-item strong{
        display:block;
        font-size:12px;
        line-height:1.35;
        color:#e6e0e3;
      }

      .rail-item small{
        display:block;
        margin-top:4px;
        font-size:9px;
        line-height:1.45;
        color:#716a6f;
      }

      .rail-cta{
        display:block;
        padding:18px 20px;
        text-decoration:none;
        font-size:9px;
        font-weight:800;
        letter-spacing:.14em;
        color:#fff;
        background:linear-gradient(90deg,rgba(255,26,168,.12),rgba(200,166,92,.08));
      }

      .rail-cta:hover{
        background:linear-gradient(90deg,rgba(255,26,168,.18),rgba(200,166,92,.12));
      }

      @media(max-width:1180px){
        .authority-layout{grid-template-columns:1fr}
        .authority-rail{
          position:static;
          margin-top:0;
          display:grid;
          grid-template-columns:repeat(4,minmax(0,1fr));
        }
        .rail-header{grid-column:1/-1}
        .rail-list{display:contents}
        .rail-item{border-right:1px solid rgba(255,255,255,.065)}
        .rail-item:nth-child(4){border-right:0}
        .rail-cta{grid-column:1/-1;text-align:center}
      }

      @media(max-width:980px){
        .authority-intro{grid-template-columns:1fr;gap:18px}
        .authority-intro p{max-width:720px}
        .credential-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
        .media-authority-head{grid-template-columns:1fr;gap:12px}
        .media-authority-head p{max-width:700px;margin:0;text-align:left}
        .media-brand-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
        .authority-rail{grid-template-columns:repeat(2,minmax(0,1fr))}
        .rail-header{grid-column:1/-1}
        .rail-item:nth-child(2n){border-right:0}
        .rail-cta{grid-column:1/-1}
      }

      @media(max-width:620px){
        .authority-stage{padding:0 14px 46px}
        .authority-intro{padding-top:40px}
        .credential-grid{grid-template-columns:1fr;gap:8px}
        .credential-card{min-height:166px}
        .media-brand-grid{grid-template-columns:1fr;gap:8px}
        .media-brand{min-height:106px;padding:16px 12px 32px}
        .media-brand img{max-width:70%;max-height:50px}
        .authority-rail{grid-template-columns:1fr}
        .rail-item{border-right:0}
        .rail-cta{grid-column:auto}
      }
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
          <div class="authority-layout">
            <div class="authority-main">
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
                  <span class="credential-logo"><img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Wh-gov-workmark-logo.svg" alt="The White House" loading="lazy" decoding="async"></span>
                  <span class="credential-role"><strong>CORRESPONDENT</strong>White House press coverage</span>
                </a>
                <a class="credential-card" data-brand="war-room" href="/war-room">
                  <small>BROADCAST · EDITORIAL</small>
                  <span class="credential-logo"><img src="https://storage.warroom.org/images/AVN_YT_Banner_Pandemic_Live_-_smaller.png" alt="Bannon's War Room" loading="lazy" decoding="async" referrerpolicy="no-referrer"></span>
                  <span class="credential-role"><strong>CO-HOST &amp; EXECUTIVE EDITOR</strong>Broadcasts, investigations and interviews</span>
                </a>
                <a class="credential-card" data-brand="uchicago" href="/career">
                  <small>EDUCATION</small>
                  <span class="credential-logo"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/University_of_Chicago_wordmark.svg" alt="University of Chicago" loading="lazy" decoding="async"></span>
                  <span class="credential-role"><strong>GRADUATE</strong>Career timeline and background</span>
                </a>
                <a class="credential-card" data-brand="claremont" href="https://www.claremont.org/2024-lincoln-fellows/" target="_blank" rel="noopener noreferrer">
                  <small>FELLOWSHIP · 2024</small>
                  <span class="credential-logo"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Claremont_Institute_logo.svg" alt="Claremont Institute" loading="lazy" decoding="async"></span>
                  <span class="credential-role"><strong>LINCOLN FELLOW</strong>Jack Roth Charitable Foundation Lincoln Fellowship</span>
                </a>
              </div>

              <div class="media-authority">
                <div class="media-authority-head">
                  <div>
                    <span class="media-kicker">CURRENT CONSERVATIVE MEDIA · 2026</span>
                    <h3>RECENTLY FEATURED &amp; WELCOMED</h3>
                  </div>
                  <p>Recent appearances only. Each promoted destination has been checked before being placed here; older appearances remain in the media archive rather than the homepage.</p>
                </div>

                <div class="media-brand-grid" aria-label="Recent Natalie G. Winters media appearances">
                  <a class="media-brand" data-brand="oan" href="https://www.oann.com/video/the-matt-gaetz-show-video/natalie-winters-joins-the-matt-gaetz-show-with-a-message/" target="_blank" rel="noopener noreferrer" title="Natalie G. Winters on The Matt Gaetz Show, One America News, August 24 2026"><img src="https://www.oann.com/images/logos/OAN-only-logo.svg" alt="OAN" loading="lazy" decoding="async" referrerpolicy="no-referrer"><span class="media-brand-date">AUG 24 · 2026</span></a>
                  <a class="media-brand" data-brand="rav" href="https://rumble.com/v7e4his-war-room-with-steve-bannon-pm-edition.html" target="_blank" rel="noopener noreferrer" title="Natalie G. Winters on Real America's Voice, August 13 2026"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Logo_Real_America%27s_Voice.svg" alt="Real America's Voice" loading="lazy" decoding="async"><span class="media-brand-date">AUG 13 · 2026</span></a>
                  <a class="media-brand" data-brand="beck" href="https://newsradio1410.iheart.com/featured/glenn-beck/content/2026-07-28-175-the-glenn-beck-program-best-of-the-program-guest-natalie-winters-72826/" target="_blank" rel="noopener noreferrer" title="Natalie G. Winters on The Glenn Beck Program, July 28 2026"><img src="https://premierenetworks.s3.amazonaws.com/logo/2021-06/GlennBeckLogo.png" alt="The Glenn Beck Program" loading="lazy" decoding="async" referrerpolicy="no-referrer"><span class="media-brand-date">JUL 28 · 2026</span></a>
                  <a class="media-brand" data-brand="war-room" href="/war-room" title="Current Natalie G. Winters War Room archive"><img src="https://storage.warroom.org/images/AVN_YT_Banner_Pandemic_Live_-_smaller.png" alt="Bannon's War Room" loading="lazy" decoding="async" referrerpolicy="no-referrer"><span class="media-brand-date">CURRENT · 2026</span></a>
                </div>
                <p class="authority-note">Homepage links prioritise current, working destinations. Historical appearances are kept in the media archive instead of being promoted here as if they were recent.</p>
              </div>
            </div>

            <aside class="authority-rail" aria-label="Natalie G. Winters at a glance">
              <div class="rail-header">
                <span class="rail-kicker">AT A GLANCE</span>
                <h3>Natalie G. Winters</h3>
              </div>
              <div class="rail-list">
                <a class="rail-item" href="/white-house"><span>WHITE HOUSE</span><strong>Correspondent</strong><small>Press-room and Washington coverage</small></a>
                <a class="rail-item" href="/war-room"><span>WAR ROOM</span><strong>Co-host &amp; Executive Editor</strong><small>Broadcasting, editorial and investigations</small></a>
                <a class="rail-item" href="/career"><span>BACKGROUND</span><strong>University of Chicago · Claremont</strong><small>Education, fellowship and career timeline</small></a>
                <a class="rail-item" href="/interviews"><span>MEDIA</span><strong>Interviews &amp; appearances</strong><small>Networks, podcasts, debates and panels</small></a>
              </div>
              <a class="rail-cta" href="/about">VIEW FULL BIOGRAPHY →</a>
            </aside>
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
