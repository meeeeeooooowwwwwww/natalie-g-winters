import { SITE } from "../config.js";
import { renderLayout } from "../layout.js";
import { escapeHtml } from "../utils.js";
import { PAGE_BRAND_STYLES } from "../page-brand-ui.js";

export const PHOTO_ARCHIVE_ITEMS = [
  {
    "year": "2023",
    "title": "Young Women's Leadership Summit",
    "caption": "Natalie Winters speaking at the 2023 Young Women's Leadership Summit in Grapevine, Texas, 10 June 2023.",
    "alt": "Natalie Winters speaking into a microphone at the 2023 Young Women's Leadership Summit",
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Natalie_Winters_%2852985166073%29_%28cropped%29.jpg/960px-Natalie_Winters_%2852985166073%29_%28cropped%29.jpg",
    "credit": "Gage Skidmore",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Natalie_Winters_(52985166073)_(cropped).jpg",
    "full": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Natalie_Winters_%2852985166073%29_%28cropped%29.jpg/1600px-Natalie_Winters_%2852985166073%29_%28cropped%29.jpg"
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
    "caption": "Natalie Winters photographed in April 2025. This photographer's original is licensed for reuse with credit.",
    "alt": "Natalie Winters smiling at a public appearance in April 2025",
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Natalie_Winters_Butterworth%27s_%28cropped%29.jpg/500px-Natalie_Winters_Butterworth%27s_%28cropped%29.jpg",
    "credit": "Werner Zagrebbi",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Natalie_Winters_Butterworth%27s_(cropped).jpg",
    "full": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Natalie_Winters_Butterworth%27s_%28cropped%29.jpg"
  }
];
const safe = (value) => escapeHtml(String(value));

export function renderPhotoCard(item, compact = false) {
  const label = `Enlarge photograph: ${item.title}, ${item.year}`;
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
      <small>Photo: ${safe(item.credit)} · <a href="${safe(item.licenseUrl)}" target="_blank" rel="noopener noreferrer">${safe(item.license)}</a> · <a href="${safe(item.source)}" target="_blank" rel="noopener noreferrer">Original and licence details</a> · Cropped for display</small>
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
      creator: { "@type": "Person", name: item.credit },
      license: item.licenseUrl,
      acquireLicensePage: item.source
    }))
  }).replace(/</g,"\\u003c");
  const pageContent = `${PAGE_BRAND_STYLES}
    <main class="content-page prestige-page">
      <article class="content-inner prestige-shell">
        <section class="prestige-hero">
          <div><span class="prestige-kicker">PHOTOGRAPHS · PUBLIC APPEARANCES · 2023–2025</span>
            <h1>Natalie G. Winters: Photo Archive</h1>
            <p class="prestige-deck">Natalie G. Winters at public events and interviews. Tap or click a photograph to see it larger.</p>
          </div>
          <aside class="prestige-summary">
            <div class="prestige-summary-head"><span>PHOTO ARCHIVE</span><strong>Public appearances through the years</strong></div>
            <div class="prestige-summary-row"><span>CREDIT</span><strong>Photographer and source identified</strong></div>
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
  return renderLayout({title:"Natalie Winters Photos | Licensed Career and Interview Images",
    description:"Natalie G. Winters photos from 2023, 2024 and 2025, with full-view photographs, original credits and Creative Commons licences.",
    canonical:`${SITE.domain}/photos`,pageContent,posts,photoViewer:true});
}
