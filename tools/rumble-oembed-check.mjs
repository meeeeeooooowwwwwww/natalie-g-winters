// One-shot read-only verification of published Rumble oEmbed metadata.
// No credentials, no media downloading, no external production writes.
import { mkdirSync, writeFileSync } from "node:fs";
const originals=[
 "https://rumble.com/v7hx5mo-winters.html",
 "https://rumble.com/v7hx4uu-winters.html",
 "https://rumble.com/v7hx35w-winters.html",
 "https://rumble.com/v7hx2o8-winters.html",
 "https://rumble.com/v7hv0u6-natalie-winters-democrats-want-january-6-style-investigations.html"
];
const basehosts=["https://rumble.com","https://wn0.rumble.com"];
const result={checkedAt:new Date().toISOString(),records:[]};
for (const videoUrl of originals){
 for (const host of basehosts){
  const request=host+"/api/Media/oembed.json?url="+encodeURIComponent(videoUrl);
  try {
   const r=await fetch(request,{signal:AbortSignal.timeout(10000),headers:{accept:"application/json"}});
   const raw=await r.text();
   let data={};
   if(r.ok)try{const j=JSON.parse(raw); data={title:j.title,thumbnail_url:j.thumbnail_url,html:j.html,duration:j.duration};}catch{}
   const record={videoUrl,host,status:r.status,bytes:raw.length,...data};
   result.records.push(record);
   console.log(JSON.stringify(record));
  }catch(e){result.records.push({videoUrl,host,error:String(e)});}
 }
}
mkdirSync("docs/operations",{recursive:true});
writeFileSync("docs/operations/rumble-oembed-check-2026-11-09.json",JSON.stringify(result,null,2)+"\n");
