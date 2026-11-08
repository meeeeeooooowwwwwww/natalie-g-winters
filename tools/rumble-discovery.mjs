import { mkdirSync, writeFileSync } from "node:fs";
// Read-only Rumble publisher listing discovery for editorial verification.
// Never invent a video permalink, iframe ID or thumbnail from its title.
const urls = [
  "https://rumble.com/c/BannonsWarRoom/videos?page=2&e9s=src_v1_cbl",
  "https://rumble.com/c/BannonsWarRoom/videos?page=3&e9s=src_v1_cbl",
  "https://wn0.rumble.com/c/BannonsWarRoom/videos?page=2",
  "https://wn0.rumble.com/c/BannonsWarRoom/videos?page=3",
  "https://rumble.com/c/BannonsWarRoom/rss",
  "https://wn0.rumble.com/c/BannonsWarRoom/rss"
];
const strip = (s) => s.replace(/<[^>]+>/g, " ").replace(/&(?:amp|#38);/g, "&").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
let total = 0;
const report = { checkedAt: new Date().toISOString(), pages: [], videos: [] };
for (const url of urls) {
  console.log("\nSOURCE", url);
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9"
      },
      signal: AbortSignal.timeout(25000)
    });
    const body = await response.text();
    console.log("STATUS", response.status, "BYTES", body.length);
    report.pages.push({
      url, status: response.status, bytes: body.length,
      titleTag: body.slice(body.indexOf("<title"), body.indexOf("</title>") + 8).slice(0,200),
      preview: body.slice(0,450),
      natalieOccurrences: (body.match(/natalie/gi)||[]).length,
      videoIdOccurrences: (body.match(/v7h[a-z0-9]+/gi)||[]).length,
      hReferences: [...new Set((body.match(/v7h[a-z0-9]{5,9}/gi)||[]))].slice(0,80),
      natalieSnippet: body.includes("Natalie") ? body.slice(Math.max(0,body.indexOf("Natalie")-300),body.indexOf("Natalie")+500) : "",
      natalieRecords: [...body.matchAll(/"title":"(?:Natalie|NATALIE) Winters:[^"]+"/g)].slice(0,12).map(m=>body.slice(Math.max(0,m.index-110),m.index+1000))
    });
    if (!response.ok) continue;
    const matches = [...body.matchAll(/href=["']([^"']*\/v[0-9a-z]+-[^"']+?\.html(?:\?[^"']*)?)["']/gi)];
    const seen = new Set();
    for (const match of matches) {
      const path = match[1].replace(/&amp;/g, "&").split("?")[0];
      const videoId = path.match(/\/v([0-9a-z]+)-/i)?.[1];
      if (!videoId || seen.has(videoId)) continue;
      seen.add(videoId);
      const near = strip(body.slice(Math.max(0,match.index - 700), Math.min(body.length, match.index + 900))).slice(0,700);
      const candidate = /natalie\s+(?:g\.?\s+)?winters/i.test(near) || /natalie.*winters/i.test(path);
      const video = { videoId, url: new URL(path, "https://rumble.com").href, natalieCandidate: candidate, excerpt: near, page: url };
      report.videos.push(video);
      console.log(JSON.stringify(video));
      total++;
    }
    console.log("VIDEO_LINKS",seen.size);
  } catch (error) {
    console.log("ERROR", String(error));
    report.pages.push({ url, error: String(error) });
  }
}
console.log("TOTAL_VIDEO_LINKS",total);

mkdirSync("docs/operations", { recursive: true });
writeFileSync("docs/operations/rumble-discovery-last.json", JSON.stringify(report, null, 2)+"\n");
