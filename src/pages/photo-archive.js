import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { escapeHtml } from "../utils.js";
import { PAGE_BRAND_STYLES } from "../page-brand-ui.js";

export const PHOTO_ARCHIVE_ITEMS = [
  {
    "year": "2024",
    "title": "Claremont Institute headshot",
    "caption": "Portrait accompanying the Claremont Institute's 2024 Lincoln Fellows profile.",
    "alt": "Natalie G. Winters headshot published by the Claremont Institute",
    "src": "https://www.claremont.org/wp-content/uploads/2024/05/Winters_Headshot_1.png",
    "full": "https://www.claremont.org/wp-content/uploads/2024/05/Winters_Headshot_1.png",
    "credit": "The Claremont Institute",
    "source": "https://www.claremont.org/2024-lincoln-fellows/"
  },
  {
    "year": "2025",
    "title": "South China Morning Post portrait",
    "caption": "Portrait featured in the South China Morning Post's February 2025 profile of Natalie Winters.",
    "alt": "Natalie Winters wearing a light knit top in a portrait featured by the South China Morning Post",
    "src": "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/canvas/2025/02/04/743277c5-8954-448f-9277-50d9be98018a_9709b187.jpg?itok=Lnr_PZbv",
    "full": "https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1024,format=auto/sites/default/files/d8/images/canvas/2025/02/04/743277c5-8954-448f-9277-50d9be98018a_9709b187.jpg",
    "credit": "South China Morning Post",
    "source": "https://www.scmp.com/magazines/style/entertainment/article/3297287/who-white-house-correspondent-natalie-winters-controversial-journalist-works-steve-bannon-slammed"
  },
  {
    "year": "2025",
    "title": "The New York Times portrait",
    "caption": "Photograph accompanying The New York Times' April 2025 profile of Natalie Winters.",
    "alt": "Natalie Winters portrait published with The New York Times April 2025 profile",
    "src": "https://static01.nyt.com/images/2025/04/24/multimedia/07NATALIE-WINTERS-01-lpbg/07NATALIE-WINTERS-01-lpbg-superJumbo-v4.jpg?quality=75&auto=avif",
    "full": "https://static01.nyt.com/images/2025/04/24/multimedia/07NATALIE-WINTERS-01-lpbg/07NATALIE-WINTERS-01-lpbg-superJumbo-v4.jpg?quality=75&auto=avif",
    "credit": "The New York Times",
    "source": "https://www.nytimes.com/2025/04/11/style/natalie-winters-trump-bannon.html"
  },
  {
    "year": "2025",
    "title": "The Telegraph photograph",
    "caption": "Natalie Winters press photograph supplied from The Telegraph's February 2025 coverage.",
    "alt": "Natalie Winters in a photograph published by The Telegraph",
    "src": "https://www.telegraph.co.uk/content/dam/en-us/politics/2025/02/15/TELEMMGLPICT000412216340_17396294392240_trans_NvBQzQNjv4Bq46f-NZ5M8qj6gPC-TVyYhde1l7Sgc-lnoq0a0QqYE0w.jpeg?imwidth=720",
    "full": "https://www.telegraph.co.uk/content/dam/en-us/politics/2025/02/15/TELEMMGLPICT000412216340_17396294392240_trans_NvBQzQNjv4Bq46f-NZ5M8qj6gPC-TVyYhde1l7Sgc-lnoq0a0QqYE0w.jpeg?imwidth=1920",
    "credit": "The Telegraph",
    "source": "https://www.telegraph.co.uk/content/dam/en-us/politics/2025/02/15/TELEMMGLPICT000412216340_17396294392240_trans_NvBQzQNjv4Bq46f-NZ5M8qj6gPC-TVyYhde1l7Sgc-lnoq0a0QqYE0w.jpeg?imwidth=1920"
  },
  {
    "year": "2023",
    "title": "Young Women's Leadership Summit",
    "caption": "Natalie Winters speaking at the 2023 Young Women's Leadership Summit in Grapevine, Texas, 10 June 2023. Original uncropped event photograph.",
    "alt": "Natalie Winters speaking into a microphone at the 2023 Young Women's Leadership Summit",
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Natalie_Winters_%2852985166073%29.jpg/960px-Natalie_Winters_%2852985166073%29.jpg",
    "credit": "Gage Skidmore",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Natalie_Winters_(52985166073).jpg",
    "full": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Natalie_Winters_%2852985166073%29.jpg/1920px-Natalie_Winters_%2852985166073%29.jpg"
  },
  {
    "year": "2024",
    "title": "AmericaFest",
    "caption": "Natalie Winters on stage during AmericaFest at Phoenix Convention Center, 21 December 2024.",
    "alt": "Natalie Winters seated on stage during the December 2024 AmericaFest event",
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Natalie_Winters_%2854233606032%29.jpg/960px-Natalie_Winters_%2854233606032%29.jpg",
    "credit": "Gage Skidmore",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Natalie_Winters_(54233606032).jpg",
    "full": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Natalie_Winters_%2854233606032%29.jpg/1600px-Natalie_Winters_%2854233606032%29.jpg"
  },
  {
    "year": "2025",
    "title": "Taiwan vice-presidential interview",
    "caption": "Natalie Winters interviewing Vice President Bi-khim Hsiao for War Room, 1 December 2025.",
    "alt": "Natalie Winters interviewing Taiwan Vice President Bi-khim Hsiao in two facing armchairs",
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/12.02_%E5%89%AF%E7%B8%BD%E7%B5%B1%E6%8E%A5%E5%8F%97%E7%BE%8E%E5%9C%8B%E5%AA%92%E9%AB%94%E3%80%8C%E6%88%B0%E6%83%85%E5%AE%A4%E3%80%8D%EF%BC%88War_Room%EF%BC%89%E7%AF%80%E7%9B%AE%E5%B0%88%E8%A8%AA_-_54957691492.jpg/960px-12.02_%E5%89%AF%E7%B8%BD%E7%B5%B1%E6%8E%A5%E5%8F%97%E7%BE%8E%E5%9C%8B%E5%AA%92%E9%AB%94%E3%80%8C%E6%88%B0%E6%83%85%E5%AE%A4%E3%80%8D%EF%BC%88War_Room%EF%BC%89%E7%AF%80%E7%9B%AE%E5%B0%88%E8%A8%AA_-_54957691492.jpg",
    "credit": "I Chen Lin / Taiwan Presidential Office",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:12.02_副總統接受美國媒體「戰情室」（War_Room）節目專訪_-_54957691492.jpg",
    "full": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/12.02_%E5%89%AF%E7%B8%BD%E7%B5%B1%E6%8E%A5%E5%8F%97%E7%BE%8E%E5%9C%8B%E5%AA%92%E9%AB%94%E3%80%8C%E6%88%B0%E6%83%85%E5%AE%A4%E3%80%8D%EF%BC%88War_Room%EF%BC%89%E7%AF%80%E7%9B%AE%E5%B0%88%E8%A8%AA_-_54957691492.jpg/1600px-12.02_%E5%89%AF%E7%B8%BD%E7%B5%B1%E6%8E%A5%E5%8F%97%E7%BE%8E%E5%9C%8B%E5%AA%92%E9%AB%94%E3%80%8C%E6%88%B0%E6%83%85%E5%AE%A4%E3%80%8D%EF%BC%88War_Room%EF%BC%89%E7%AF%80%E7%9B%AE%E5%B0%88%E8%A8%AA_-_54957691492.jpg"
  },
  {
    "year": "2025",
    "title": "Public appearance portrait",
    "caption": "Natalie Winters photographed at a public appearance in April 2025.",
    "alt": "Natalie Winters smiling at a public appearance in April 2025",
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Natalie_Winters_Butterworth%27s_%28cropped%29.jpg/500px-Natalie_Winters_Butterworth%27s_%28cropped%29.jpg",
    "credit": "Werner Zagrebbi",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Natalie_Winters_Butterworth%27s_(cropped).jpg",
    "full": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Natalie_Winters_Butterworth%27s_%28cropped%29.jpg"
  },
  {
    "year": "Archive",
    "title": "Portrait shared on Reddit",
    "caption": "Additional portrait of Natalie Winters shared on Reddit.",
    "alt": "Portrait of Natalie Winters shared on Reddit",
    "src": "https://preview.redd.it/natalie-winters-v0-bvxdc9lssake1.jpg?width=720&format=pjpg&auto=webp&s=18057783f641e8fc7539cfa552152dda5f95e3b4",
    "full": "https://preview.redd.it/natalie-winters-v0-bvxdc9lssake1.jpg?width=720&format=pjpg&auto=webp&s=18057783f641e8fc7539cfa552152dda5f95e3b4",
    "credit": "Reddit image",
    "source": "https://preview.redd.it/natalie-winters-v0-bvxdc9lssake1.jpg?width=720&format=pjpg&auto=webp&s=18057783f641e8fc7539cfa552152dda5f95e3b4"
  }
];
const safe = (value) => escapeHtml(String(value));

export function renderPhotoCard(item, compact = false) {
  const label = `Enlarge photograph: ${item.title}, ${item.year}`;
  const sourceLink = item.source && item.source !== item.full ? `<a href="${safe(item.source)}" target="_blank" rel="noopener noreferrer">Source</a> · ` : "";
  const licenseLink = item.licenseUrl ? ` · <a href="${safe(item.licenseUrl)}" target="_blank" rel="noopener noreferrer">${safe(item.license)}</a>` : "";
  return `<figure class="photo-card${compact ? " photo-card-compact" : ""}">
    <a class="photo-zoom" href="${safe(item.full)}" target="_blank" rel="noopener noreferrer" data-photo-zoom
      data-photo-title="${safe(item.title)}" data-photo-alt="${safe(item.alt)}" aria-label="${safe(label)}">
      <img src="${safe(item.src)}" alt="${safe(item.alt)}" width="960" height="640" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      <span class="photo-zoom-label" aria-hidden="true">VIEW FULL PHOTO ↗</span>
    </a>
    <figcaption class="photo-card-caption">
      <span class="photo-card-year">${safe(item.year)}</span>
      <h2>${safe(item.title)}</h2>
      ${compact ? "" : `<p>${safe(item.caption)}</p>`}
      <small>${safe(item.credit)} · ${sourceLink}<a href="${safe(item.full)}" target="_blank" rel="noopener noreferrer">Original image</a>${licenseLink}</small>
    </figcaption>
  </figure>`;
}

export function renderPhotoArchivePage(posts) {
  const gallery = PHOTO_ARCHIVE_ITEMS.map(item => renderPhotoCard(item)).join("");
  const imageData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Natalie G. Winters photographs",
    url: `${SITE.domain}/photos`,
    associatedMedia: PHOTO_ARCHIVE_ITEMS.map(item => ({
      "@type": "ImageObject",
      name: item.title,
      description: item.caption,
      contentUrl: item.full,
      thumbnailUrl: item.src,
      creditText: item.credit,
      ...(item.licenseUrl ? { license: item.licenseUrl } : {}),
      ...(item.source ? { citation: item.source } : {})
    }))
  }).replace(/</g,"\\u003c");
  const pageContent = `${PAGE_BRAND_STYLES}
    <main class="content-page prestige-page">
      <article class="content-inner prestige-shell">
        <section class="prestige-hero">
          <div><span class="prestige-kicker">PHOTOGRAPHS · PORTRAITS · PUBLIC APPEARANCES</span>
            <h1>Natalie G. Winters: Photo Archive</h1>
            <p class="prestige-deck">Natalie G. Winters in portraits, reporting and public appearances. Tap or click a photograph to enlarge it.</p>
          </div>
          <aside class="prestige-summary">
            <div class="prestige-summary-head"><span>PHOTO ARCHIVE</span><strong>Portraits and appearances</strong></div>
            <div class="prestige-summary-row"><span>CREDIT</span><strong>Original publisher links</strong></div>
            <div class="prestige-summary-row"><span>GALLERY</span><strong>Tap to enlarge on mobile or desktop</strong></div>
          </aside>
        </section>
        <section class="prestige-section" aria-label="Natalie Winters photo gallery">
          <div class="photo-grid">${gallery}</div>
        </section>
        <section class="prestige-section"><div class="prestige-prose">
          <p>Use the close button or press Escape to return to the gallery. Browse the <a href="/about">biography</a>, <a href="/career">career chronology</a> and <a href="/interviews">interviews</a> for related appearances.</p>
        </div></section>
      </article>
    </main>
    <script type="application/ld+json">${imageData}</script>`;
  return renderLayout({title:"Natalie Winters Photos | Portraits and Public Appearances",
    description:"Natalie Winters photographs and portraits from the Claremont Institute, The New York Times, South China Morning Post, The Telegraph, Wikimedia Commons and more.",
    canonical:`${SITE.domain}/photos`,pageContent,posts,photoViewer:true});
}
