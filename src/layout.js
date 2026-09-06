import { SITE } from "./config.js";
import { escapeHtml, formatDate } from "./utils.js";

const NAV = [
  ["about", "/about", "ABOUT"],
  ["career", "/career", "CAREER"],
  ["reporting", "/reporting", "REPORTING"],
  ["white-house", "/white-house", "WHITE HOUSE"],
  ["videos", "/videos", "VIDEOS"],
  ["verdict", "/verdict", "THE VERDICT"],
];

const FOOTER_EXPLORE = [
  ["/war-room", "WAR ROOM", "Co-host, executive editor and enough clips to frighten a communications department."],
  ["/videos", "50+ VIDEOS", "Rumble, War Room, White House reports and dedicated video pages."],
  ["/interviews", "INTERVIEWS", "Long-form appearances, debates and conversations beyond War Room."],
  ["/articles", "ARTICLES", "A rolling archive of Natalie Winters' Substack investigations."],
  ["/china", "CHINA FILES", "CCP influence, United Front networks, Taiwan and national-security reporting."],
];

export function renderHeader(active = "") {
  return `
    <header class="site-header">
      <a class="brand" href="/" aria-label="Natalie Winters home">
        NATALIE WINTERS
      </a>

      <nav class="site-nav" aria-label="Main navigation">
        ${NAV.map(([key, href, label]) => `
          <a href="${href}" ${active === key ? 'aria-current="page"' : ""}>${label}</a>
        `).join("")}
      </nav>
    </header>
  `;
}

function localImageUrl(post) {
  if (!post?.image) return "";

  if (String(post.image).startsWith("/images/")) return String(post.image);

  if (!post?.id || !post?.imageVersion) return "";
  return `/media/substack/${encodeURIComponent(post.id)}/${encodeURIComponent(post.imageVersion)}`;
}

export function renderArticleCards(posts, limit = null, className = "article-grid") {
  const visiblePosts = Array.isArray(posts)
    ? (Number.isFinite(limit) ? posts.slice(0, limit) : posts)
    : [];

  if (!visiblePosts.length) {
    return `
      <div class="articles-unavailable">
        Latest reporting is currently available on
        <a href="${SITE.substackHome}" target="_blank" rel="noopener noreferrer">Substack</a>.
      </div>
    `;
  }

  const cards = visiblePosts.map((post) => {
    const proxyImage = localImageUrl(post);
    const image = proxyImage
      ? `<div class="article-image"><img src="${escapeHtml(proxyImage)}" alt="Cover image for ${escapeHtml(post.title)} by Natalie Winters" width="700" height="394" loading="lazy" decoding="async"></div>`
      : `<div class="article-image article-placeholder"><span>NATALIE WINTERS</span></div>`;

    const subtitle = post.subtitle
      ? `<p class="article-subtitle">${escapeHtml(post.subtitle)}</p>`
      : "";

    const date = formatDate(post.date);

    return `
      <article class="article-card">
        <a href="${escapeHtml(post.url)}" target="_blank" rel="noopener noreferrer" class="article-link">
          ${image}
          <div class="article-content">
            <h3>${escapeHtml(post.title)}</h3>
            ${subtitle}
            ${date ? `<time class="article-date" datetime="${escapeHtml(post.date)}">${escapeHtml(date)}</time>` : ""}
          </div>
        </a>
      </article>
    `;
  }).join("");

  return `<div class="${escapeHtml(className)}">${cards}</div>`;
}

export function renderLatestReporting(posts) {
  return `
    <section class="latest" aria-labelledby="latest-reporting-title">
      <div class="latest-inner">
        <div class="section-header">
          <div>
            <span class="section-kicker">AUTOMATICALLY UPDATED</span>
            <h2 id="latest-reporting-title">LATEST NATALIE WINTERS REPORTING</h2>
          </div>
          <a href="/articles">BROWSE ARCHIVE →</a>
        </div>
        ${renderArticleCards(posts, 5)}
      </div>
    </section>
  `;
}

export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-intro">
          <div>
            <span class="footer-kicker">MORE NATALIE WINTERS</span>
            <h2>The magnificently excessive section.</h2>
          </div>
          <p>For people who think America should remain owned, governed and defended in the interests of Americans, and for anyone who enjoys watching the ferociously productive, document-hoarding Natalie Winters turn respectable-looking paperwork into somebody else's very bad day. Yoga may be involved. Seed oils will not be.</p>
        </div>

        <nav class="footer-explore" aria-label="Explore more Natalie Winters coverage">
          ${FOOTER_EXPLORE.map(([href, label, description]) => `
            <a class="footer-explore-card" href="${href}">
              <span>${label}</span>
              <small>${description}</small>
              <b aria-hidden="true">→</b>
            </a>
          `).join("")}
        </nav>

        <div class="footer-bottom">
          <div class="footer-links">
            <a href="${SITE.substackHome}" target="_blank" rel="noopener noreferrer">Natalie Winters on Substack</a>
            <span class="footer-separator">•</span>
            <a href="https://x.com/nataliegwinters" target="_blank" rel="noopener noreferrer">Natalie Winters on X</a>
          </div>
          <a class="footer-credit" href="https://davidaruck.com/" target="_blank" rel="noopener noreferrer">SITE BY: DAVIUS RUCKIUS</a>
        </div>
      </div>
    </footer>
  `;
}

export function externalImage(src, alt, className = "feature-photo", width = 1200, height = 1200) {
  return `<img class="${className}" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" width="${width}" height="${height}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
}

function renderStructuredData({ canonical, description, title, pageType = "WebPage" }) {
  const personId = `${SITE.domain}/#natalie-winters`;
  const websiteId = `${SITE.domain}/#website`;
  const pageId = `${canonical}#webpage`;
  const primaryImageId = `${canonical}#primaryimage`;
  const isProfilePage = pageType === "ProfilePage";

  const person = {
    "@type": "Person",
    "@id": personId,
    name: "Natalie Winters",
    alternateName: ["Natalie G. Winters", "Natalie G Winters", "Miss Winters", "Ms Winters"],
    url: `${SITE.domain}/`,
    description: "Natalie Winters, also known as Natalie G. Winters, is an investigative journalist, War Room co-host and White House correspondent.",
    image: [
      SITE.images.profile1x1,
      SITE.images.profile4x3,
      SITE.images.profile16x9,
    ],
    jobTitle: ["Investigative Journalist", "White House Correspondent", "Political Commentator", "Broadcaster"],
    knowsAbout: [
      "China and Chinese Communist Party influence",
      "United States politics",
      "White House reporting",
      "National security",
      "Foreign influence",
      "Media and political institutions"
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Chicago",
    },
    sameAs: [
      "https://x.com/nataliegwinters",
      SITE.substackHome,
      "https://shessoright.co/",
      "https://warroom.org/tag/natalie-winters/",
    ],
  };

  const page = {
    "@type": pageType,
    "@id": pageId,
    url: canonical,
    name: title,
    description,
    isPartOf: { "@id": websiteId },
    primaryImageOfPage: { "@id": primaryImageId },
    inLanguage: "en-US",
  };

  if (isProfilePage) {
    page.mainEntity = { "@id": personId };
  } else {
    page.about = { "@id": personId };
  }

  const graph = [
    person,
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${SITE.domain}/`,
      name: "Natalie Winters",
      alternateName: "Natalie G. Winters",
      description: "Independent information and video archive about journalist and White House correspondent Natalie Winters, also known as Natalie G. Winters.",
      inLanguage: "en-US",
      about: { "@id": personId },
    },
    {
      "@type": "ImageObject",
      "@id": primaryImageId,
      url: SITE.images.profile1x1,
      contentUrl: SITE.images.profile1x1,
      width: 1200,
      height: 1200,
      caption: "Natalie Winters (Natalie G. Winters)",
    },
    page,
  ];

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
}

export function renderLayout({
  title,
  description,
  canonical,
  pageContent,
  posts,
  active = "",
  robots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  pageType = "WebPage",
  showLatestReporting = true,
}) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeCanonical = escapeHtml(canonical);
  const ogImage = escapeHtml(SITE.images.profile16x9);
  const ogType = pageType === "ProfilePage" ? "profile" : "website";

  return `<!doctype html>
<html lang="en-US">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-VF9JXJYF33"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VF9JXJYF33');
  </script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#090208">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDescription}">
  <meta name="robots" content="${escapeHtml(robots)}">
  <meta name="googlebot" content="${escapeHtml(robots)}">
  <link rel="canonical" href="${safeCanonical}">
  <link rel="alternate" type="application/rss+xml" title="Natalie Winters on Substack" href="${escapeHtml(SITE.substackHome)}feed">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="stylesheet" href="/assets/theme-magenta.css">
  <link rel="stylesheet" href="/assets/layout-v2.css">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <meta property="og:site_name" content="Natalie Winters">
  <meta property="og:locale" content="en_US">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDescription}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${safeCanonical}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:alt" content="Natalie Winters, also known as Natalie G. Winters">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDescription}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="twitter:image:alt" content="Natalie Winters, also known as Natalie G. Winters">
  <script type="application/ld+json">${renderStructuredData({ canonical, description, title, pageType })}</script>
</head>
<body>
  <div class="site-bg" aria-hidden="true"></div>
  <div class="page">
    ${renderHeader(active)}
    ${pageContent}
    ${showLatestReporting ? renderLatestReporting(posts) : ""}
    ${renderFooter()}
  </div>
</body>
</html>`;
}
