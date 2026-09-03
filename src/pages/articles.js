import { SITE } from "../config.js";
import { renderArticleCards, renderLayout } from "../layout.js";

export function renderArticlesPage(posts) {
  const count = Array.isArray(posts) ? posts.length : 0;
  const pageContent = `
    <main class="content-page">
      <article class="content-inner wide-shell">
        <div class="editorial-hero">
          <div>
            <div class="eyebrow">SUBSTACK ARCHIVE</div>
            <h1>Natalie Winters Articles</h1>
            <p class="hero-deck">A larger rolling window into Natalie Winters' latest independent investigations, automatically refreshed from her Substack publication.</p>
          </div>
          <aside class="hero-aside"><strong>LIVE ARCHIVE</strong>The site stores up to 25 recent posts in Cloudflare KV and checks for updates every hour using multiple Substack sources. The developer has finally accepted that “refresh and hope” is not an architecture.</aside>
        </div>

        <div class="article-archive-intro">
          <p>Recent reporting has concentrated heavily on China-linked influence networks, U.S. media and institutions, election infrastructure, political organising, scientific collaboration and national security. This archive links directly to Winters' original publication rather than reproducing her articles.</p>
          <span class="archive-count">${count ? `${count} RECENT POSTS CURRENTLY CACHED` : "LIVE POSTS LOAD FROM SUBSTACK"}</span>
        </div>

        ${renderArticleCards(posts, null, "article-archive-grid")}

        <div class="callout">The archive updates itself from Substack with fallback sources if one route misbehaves. Somewhere, a spreadsheet has been denied employment and a brittle regex has been placed under supervision.<small>FULL PUBLICATION REMAINS ON SUBSTACK</small></div>
      </article>
    </main>
  `;

  return renderLayout({
    title: "Natalie Winters Articles | Latest Substack Investigations",
    description: "Recent Natalie Winters articles and investigations from her Substack, including reporting on China, CCP influence, media, elections, science and national security.",
    canonical: `${SITE.domain}/articles`,
    pageContent,
    posts,
    pageType: "CollectionPage",
  });
}
