import assert from "node:assert/strict";
import fs from "node:fs";
import { PAGE_BRAND_STYLES } from "../src/page-brand-ui.js";
import { renderHomePage } from "../src/pages/home.js";

const editorial = fs.readFileSync(new URL("../public/assets/editorial-substack.css", import.meta.url), "utf8");

assert.match(PAGE_BRAND_STYLES, /--prestige-ink:var\(--pub-ink/);
assert.match(PAGE_BRAND_STYLES, /prestige-prose strong\{color:var\(--prestige-ink\)\}/);
assert.match(PAGE_BRAND_STYLES, /brand-logo-box img\.reverse[\s\S]*brightness\(\.28\)/);
assert.match(PAGE_BRAND_STYLES, /brand-logo-box[\s\S]*background:rgba\(255,255,255,\.9\)/);
assert.doesNotMatch(PAGE_BRAND_STYLES, /brightness\(0\) invert\(1\)/);
assert.doesNotMatch(PAGE_BRAND_STYLES, /color:#(?:fff|f7f4f1|f5f1ed|f0ecef|eee9ec|eee8eb|ded8dc)/i);

for (const selector of [
  ".prose strong",
  ".timeline-item strong",
  ".fact-ribbon strong",
  ".video-copy a",
  ".detail-rail-card strong",
  ".praise-list",
  ".shrine",
]) {
  assert.ok(editorial.includes(selector), `missing light-theme safety selector: ${selector}`);
}

assert.match(editorial, /Publication light-theme contrast safety/);
assert.match(editorial, /color:var\(--pub-ink\)!important/);
assert.match(editorial, /color:var\(--pub-pink-dark\)!important/);


const homepage = renderHomePage([]);
assert.match(homepage, /class="brand-ribbon home-brand-ribbon"/);
for (const brand of ["whitehouse", "warroom", "oan", "rav", "glenn"]) {
  assert.match(homepage, new RegExp(`brand-mark--${brand}`), `missing branded logo sizing class: ${brand}`);
}
assert.doesNotMatch(homepage, /AVN_YT_Banner_Pandemic_Live/);
assert.doesNotMatch(homepage, /brand-mark--substack|>SUBSTACK<\//, "Substack must not appear in homepage logo strip");
assert.doesNotMatch(editorial, /brand-mark--substack/, "Remove dead Substack logo styling");
assert.match(homepage, /Second_Trump_administration_White_House_logo\.svg\/330px-/, "Use authentic White House wordmark rather than a fabricated emblem");
assert.match(editorial, /\.home-brand-ribbon \.brand-mark--whitehouse img\{[^}]*filter:none;[^}]*opacity:1;/, "Preserve original official-logo colours");
assert.doesNotMatch(homepage, /white-house-mark\.svg/, "Do not restore the improvised White House logo");
assert.match(homepage, /src="\/images\/oan-wordmark\.svg"/, "Local OAN mark required");
assert.doesNotMatch(homepage, /www\.oann\.com\/images\/logos/, "Broken external OAN logo must not return");
assert.match(editorial, /grid-template-columns:minmax\(116px,\.72fr\) repeat\(5,minmax\(0,1fr\)\)/, "Five-logo ribbon must not leave an empty column");
for (const name of ["oan-wordmark.svg"]) {
  const vector = fs.readFileSync(new URL("../public/images/" + name, import.meta.url), "utf8");
  assert.match(vector, /<svg[^>]*viewBox=/);
  assert.doesNotMatch(vector, /<script|(?:href|src)="https?:\/\//i, "Local logos must not load remote assets or scripts");
}
assert.match(editorial, /\.home-brand-ribbon \.brand-mark--glenn img\{[\s\S]*?max-height:none/);
for (const breakpoint of ["1180", "760", "380"]) {
  assert.match(editorial, new RegExp(`@media\\(max-width:${breakpoint}px\\)`), `missing responsive breakpoint: ${breakpoint}`);
}

// The homepage masthead stays on one line in the side-by-side desktop layout.
// The buttons must still track the video card's bottom; small screens stack.
assert.match(homepage, /<h1 id="home-title">Natalie G\. Winters<\/h1>/);
assert.match(editorial, /\.home-publication-copy h1\{[^}]*font-size:clamp\(36px,4vw,66px\);[^}]*white-space:nowrap;/);
assert.match(editorial, /@media\(min-width:901px\)\{[\s\S]*?\.home-publication-copy\{justify-content:space-between\}[\s\S]*?\.home-publication-copy \.home-actions\{margin-top:20px;padding-top:0\}/);
assert.match(editorial, /@media\(max-width:900px\)\{[\s\S]*?\.home-publication-inner,[\s\S]*?grid-template-columns:1fr/);
assert.match(editorial, /\.home-publication-copy h1\{font-size:clamp\(22px,7\.75vw,58px\)\}/);

console.log("visual theme regression checks passed");
