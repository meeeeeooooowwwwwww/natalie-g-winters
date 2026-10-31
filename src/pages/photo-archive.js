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
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Natalie_Winters_%2852985166073%29_%28cropped%29.jpg/960px-Natalie_Winters_%2852985166073%29_%28cropped%29.jpg",
    "credit": "Gage Skidmore",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Natalie_Winters_(52985166073)_(cropped).jpg"
  },
  {
    "year": "2024",
    "title": "AmericaFest",
    "caption": "Natalie Winters on stage during AmericaFest at Phoenix Convention Center, 21 December 2024.",
    "alt": "Natalie Winters seated on stage during the December 2024 AmericaFest event",
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Natalie_Winters_%2854233606032%29.jpg/960px-Natalie_Winters_%2854233606032%29.jpg",
    "credit": "Gage Skidmore",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Natalie_Winters_(54233606032).jpg"
  },
  {
    "year": "2025",
    "title": "Taiwan vice-presidential interview",
    "caption": "Natalie Winters interviewing Vice President Bi-khim Hsiao for War Room, 1 December 2025.",
    "alt": "Natalie Winters interviewing Taiwan Vice President Bi-khim Hsiao in two facing armchairs",
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/12.02_%E5%89%AF%E7%B8%BD%E7%B5%B1%E6%8E%A5%E5%8F%97%E7%BE%8E%E5%9C%8B%E5%AA%92%E9%AB%94%E3%80%8C%E6%88%B0%E6%83%85%E5%AE%A4%E3%80%8D%EF%BC%88War_Room%EF%BC%89%E7%AF%80%E7%9B%AE%E5%B0%88%E8%A8%AA_-_54957691492.jpg/960px-12.02_%E5%89%AF%E7%B8%BD%E7%B5%B1%E6%8E%A5%E5%8F%97%E7%BE%8E%E5%9C%8B%E5%AA%92%E9%AB%94%E3%80%8C%E6%88%B0%E6%83%85%E5%AE%A4%E3%80%8D%EF%BC%88War_Room%EF%BC%89%E7%AF%80%E7%9B%AE%E5%B0%88%E8%A8%AA_-_54957691492.jpg",
    "credit": "I Chen Lin / Taiwan Presidential Office",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:12.02_副總統接受美國媒體「戰情室」（War_Room）節目專訪_-_54957691492.jpg"
  },
  {
    "year": "2025",
    "title": "Public appearance portrait",
    "caption": "Natalie Winters photographed in April 2025. This photographer's original is licensed for reuse with credit.",
    "alt": "Natalie Winters smiling at a public appearance in April 2025",
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Natalie_Winters_Butterworth%27s_%28cropped%29.jpg/500px-Natalie_Winters_Butterworth%27s_%28cropped%29.jpg",
    "credit": "Werner Zagrebbi",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Natalie_Winters_Butterworth%27s_(cropped).jpg"
  }
];
export function renderPhotoArchivePage(posts){
 const e=x=>escapeHtml(String(x));
 const gallery=PHOTO_ARCHIVE_ITEMS.map(item=>`<figure style="margin:0;min-width:0;border:1px solid var(--prestige-line);background:rgba(255,255,255,.75);"><a href="${e(item.source)}" target="_blank" rel="noopener noreferrer"><img src="${e(item.src)}" alt="${e(item.alt)}" width="960" height="640" loading="lazy" decoding="async" referrerpolicy="no-referrer" style="width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;display:block"></a><figcaption style="padding:18px;line-height:1.5"><small style="color:var(--prestige-accent);font-weight:800">${e(item.year)}</small><h2 style="margin:4px 0;font-size:19px">${e(item.title)}</h2><p>${e(item.caption)}</p><small>Photograph: ${e(item.credit)} · <a href="${e(item.licenseUrl)}" target="_blank" rel="noopener noreferrer">${e(item.license)}</a> · <a href="${e(item.source)}" target="_blank" rel="noopener noreferrer">Image and credit details</a>. Unmodified photo, presented at a smaller display size.</small></figcaption></figure>`).join("\n");
 const photoData = '<script type="application/ld+json">' + JSON.stringify({
   "@context": "https://schema.org",
   "@type": "ImageGallery",
   name: "Natalie G. Winters public photographs",
   url: SITE.domain + "/photos",
   associatedMedia: PHOTO_ARCHIVE_ITEMS.map(item => ({
     "@type": "ImageObject",
     contentUrl: item.src,
     name: item.title,
     description: item.caption,
     creditText: item.credit,
     creator: { "@type": "Person", name: item.credit },
     license: item.licenseUrl,
     acquireLicensePage: item.source
   }))
 }).replace(/</g, "\\u003c") + '</script>';
 const pageContent=`${photoData}${PAGE_BRAND_STYLES}<main class="content-page prestige-page"><article class="content-inner prestige-shell"><section class="prestige-hero"><div><span class="prestige-kicker">PHOTOGRAPHS · 2023–2025 · LICENSED SOURCES</span><h1>Natalie G. Winters: Photo Archive</h1><p class="prestige-deck">Documented photographs from public events and interviews, each with its date, photographer and reuse licence.</p></div><aside class="prestige-summary"><div class="prestige-summary-head"><span>IMAGE ARCHIVE</span><strong>Public record, not invented portraits</strong></div><div class="prestige-summary-row"><span>CREDIT</span><strong>Every photographer identified</strong></div><div class="prestige-summary-row"><span>RIGHTS</span><strong>Creative Commons attribution</strong></div></aside></section><section class="prestige-section"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,330px),1fr));gap:22px">${gallery}</div></section><section class="prestige-section"><div class="prestige-prose"><p>All images are linked to their original Wikimedia Commons file pages, where the applicable permissions and full credits can be checked. Editorial image search results are not automatically free to reuse, so this archive does not copy unlicensed agency photographs.</p><p>See the <a href="/about">biography</a>, <a href="/career">career chronology</a> and <a href="/interviews">media interviews</a> for the events and work behind the pictures.</p></div></section></article></main>`;
 return renderLayout({title:"Natalie Winters Photos | Licensed Career and Interview Images",description:"Natalie G. Winters photos from 2023, 2024 and 2025, including event portraits and the Taiwan vice-presidential interview, with photographer credits and licences.",canonical:`${SITE.domain}/photos`,pageContent,posts});
}
