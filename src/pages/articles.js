import { SITE } from "../config.js";
import { articleImageUrl, renderLayout } from "../layout.js";
import { escapeHtml, formatDate } from "../utils.js";

function imageMarkup(post, className, width = 1200, height = 675) {
  const src = articleImageUrl(post);
  if (!src) return `<div class="${className}"><div class="archive-no-image">NATALIE G. WINTERS</div></div>`;

  return `
    <div class="${className}">
      <img src="${escapeHtml(src)}" alt="Article image for ${escapeHtml(post.title)}" width="${width}" height="${height}" loading="lazy" decoding="async">
    </div>
  `;
}

function meta(post) {
  const date = formatDate(post?.date);
  return date
    ? `<div class="archive-meta"><span>NATALIE G. WINTERS</span><span>·</span><time datetime="${escapeHtml(post.date)}">${escapeHtml(date)}</time></div>`
    : `<div class="archive-meta"><span>NATALIE G. WINTERS</span></div>`;
}

function sideCard(post) {
  if (!post) return "";
  return `
    <a class="archive-side-card" href="${escapeHtml(post.url)}" target="_blank" rel="noopener noreferrer">
      ${imageMarkup(post, "archive-side-image", 600, 450)}
      <div>
        <h3>${escapeHtml(post.title)}</h3>
        ${post.subtitle ? `<p>${escapeHtml(post.subtitle)}</p>` : ""}
        ${meta(post)}
      </div>
    </a>
  `;
}

function archiveRow(post) {
  return `
    <a class="archive-row" href="${escapeHtml(post.url)}" target="_blank" rel="noopener noreferrer">
      <div>
        <h3>${escapeHtml(post.title)}</h3>
        ${post.subtitle ? `<p>${escapeHtml(post.subtitle)}</p>` : ""}
        ${meta(post)}
      </div>
      ${imageMarkup(post, "archive-row-image", 900, 560)}
    </a>
  `;
}

export function renderArticlesPage(posts) {
  const visible = Array.isArray(posts) ? posts.filter((post) => post?.url && post?.title) : [];
  const lead = visible[0];
  const side = visible.slice(1, 5);
  const archive = visible.slice(5);

  const leadMarkup = lead ? `
    <section class="archive-lead" aria-label="Latest Natalie G. Winters reporting">
      <a class="archive-lead-main" href="${escapeHtml(lead.url)}" target="_blank" rel="noopener noreferrer">
        ${imageMarkup(lead, "archive-lead-image", 1400, 788)}
        <h2>${escapeHtml(lead.title)}</h2>
        ${lead.subtitle ? `<p>${escapeHtml(lead.subtitle)}</p>` : ""}
        ${meta(lead)}
      </a>
      <div class="archive-side">
        ${side.map(sideCard).join("")}
      </div>
    </section>
  ` : `
    <div class="articles-unavailable">
      Latest reporting is currently available on
      <a href="${escapeHtml(SITE.substackHome)}" target="_blank" rel="noopener noreferrer">Substack</a>.
    </div>
  `;

  const pageContent = `
    <main>
      <div class="publication-shell">
        <header class="publication-masthead">
          <span class="pub-kicker">NATALIE G. WINTERS · SUBSTACK</span>
          <h1>Latest Reporting</h1>
          <p>Investigations, documents and political reporting from Natalie G. Winters. Headlines link directly to the original publication on Substack.</p>
        </header>

        <nav class="publication-tabs" aria-label="Publication navigation">
          <a href="/" >HOME</a>
          <a href="/articles" aria-current="page">LATEST</a>
          <a href="/videos">VIDEOS</a>
          <a href="/china">CHINA FILES</a>
          <a href="${escapeHtml(SITE.substackHome)}" target="_blank" rel="noopener noreferrer">SUBSTACK ↗</a>
        </nav>

        ${leadMarkup}

        ${archive.length ? `
          <section>
            <div class="archive-list-head">
              <h2>More from the archive</h2>
              <a href="${escapeHtml(SITE.substackHome)}" target="_blank" rel="noopener noreferrer">VIEW FULL SUBSTACK →</a>
            </div>
            <div class="archive-list">
              ${archive.map(archiveRow).join("")}
            </div>
          </section>
        ` : ""}
      </div>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters Articles | Latest Substack Investigations",
    description: "Recent Natalie Winters articles and investigations from her Substack, including reporting on China, CCP influence, media, elections, science and national security.",
    canonical: `${SITE.domain}/articles`,
    pageContent,
    posts,
    active: "articles",
    pageType: "CollectionPage",
    showLatestReporting: false,
  });
}
