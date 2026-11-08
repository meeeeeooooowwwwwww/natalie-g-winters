// Reusable, read-only Natalie Winters Rumble collector.
// Runs in Node 22+ (including GitHub Actions) with no auth, no D1/R2 writes.
// Source: official Rumble channel page via its documented mirror hostname,
// plus publisher-native oEmbed for exact embed/thumbnail verification.
import { writeFileSync, mkdirSync } from "node:fs";
const pages=(process.env.RUMBLE_PAGES || "2,3").split(",").map(x=>Number(x.trim()));
if (!pages.length || pages.length>4 || pages.some(n=>!Number.isInteger(n)||n<1||n>20)) {
  throw new Error("RUMBLE_PAGES must contain 1–4 comma-separated integers in 1..20");
}
const timeoutMs=12000;
const fetchText=async url=>{
  const res=await fetch(url,{signal:AbortSignal.timeout(timeoutMs),headers:{accept:"text/html,application/json"}});
  const body=await res.text();
  if(!res.ok)throw new Error(`HTTP ${res.status}: ${url}`);
  return body;
};
const parseValue=s=>{
  try{return JSON.parse('"' + s + '"');}catch{return s.replace(/\\u0026/g,"&");}
};
const lastCapture=(text,pattern)=>[...text.matchAll(pattern)].at(-1)?.[1] ?? null;
const result={collectedAt:new Date().toISOString(),publisher:"Bannons War Room",source:"Rumble channel and official oEmbed",pages:[],videos:[]};
const seen=new Set();
for(const page of pages){
  const pageUrl=`https://wn0.rumble.com/c/BannonsWarRoom/videos?page=${page}`;
  try{
    const html=await fetchText(pageUrl);
    let found=0;
    for(const m of html.matchAll(/"permalink_id":"(v[0-9a-z]+)"/g)){
      const id=m[1];
      if(seen.has(id))continue;
      const before=html.slice(Math.max(0,m.index-6500),m.index);
      const titleEsc=lastCapture(before,/"title":"((?:\\.|[^"\\])*)"/g);
      if(!titleEsc)continue;
      const title=parseValue(titleEsc);
      if(!/natalie\\s+(?:g\\.?\\s+)?winters/i.test(title))continue;
      const source=lastCapture(before,/"url":"(https:\/\/rumble\\.com\/v[0-9a-z]+-[^"]+\\.html)"/g);
      // Only use the publisher's canonical URL when it matches the record ID.
      const sourceUrl=source && source.includes("/"+id+"-")?source:null;
      const candidate=sourceUrl || `https://rumble.com/${id}-winters.html`;
      let meta;
      try{meta=JSON.parse(await fetchText("https://rumble.com/api/Media/oembed.json?url="+encodeURIComponent(candidate)));}
      catch(e){
        result.videos.push({id,title,sourceUrl,verified:false,error:String(e)});
        seen.add(id);continue;
      }
      const iframe=meta.html?.match(/src="(https:\/\/rumble\\.com\/embed\/v[0-9a-z]+\/)" /)?.[1]
         || meta.html?.match(/src="(https:\/\/rumble\\.com\/embed\/v[0-9a-z]+\/)"/)?.[1];
      const verified=meta.title===title && !!iframe && /^https:\/\/hugh\\.cdn\\.rumble\\.cloud\/video\//.test(meta.thumbnail_url||"");
      result.videos.push({id,title,sourceUrl:sourceUrl||candidate,embedUrl:verified?iframe:null,thumbnailUrl:verified?meta.thumbnail_url:null,duration:meta.duration,verified,page});
      seen.add(id);found++;
      if(result.videos.length>=30)break;
    }
    result.pages.push({page,url:pageUrl,bytes:html.length,matchingVideoCount:found});
  }catch(e){result.pages.push({page,url:pageUrl,error:String(e)});}
}
const out="artifacts/natalie-rumble-candidates.json";
mkdirSync("artifacts",{recursive:true});
writeFileSync(out,JSON.stringify(result,null,2)+"\n");
console.log("Rumble source verification completed",JSON.stringify({
  pages:result.pages,verified:result.videos.filter(v=>v.verified).length,
  incomplete:result.videos.filter(v=>!v.verified).length,output:out
}));
if(!result.videos.some(x=>x.verified))process.exitCode=1;
