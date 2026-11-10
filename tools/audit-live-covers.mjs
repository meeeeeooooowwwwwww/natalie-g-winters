// Read-only remote audit of article covers. Invoked only in the designated PR CI.
// No tokens, writes, browser automation, cache purges or secrets.
const targets = [
  ["source-archive", "https://nataliegwinters.substack.com/archive"],
  ["source-api", "https://nataliegwinters.substack.com/api/v1/archive?sort=new&search=&offset=0&limit=10"],
  ["source-rss", "https://nataliegwinters.substack.com/feed"],
  ["reader-api", "https://r.jina.ai/http://nataliegwinters.substack.com/api/v1/archive?sort=new&search=&offset=0&limit=10"],
  ["reader-api-no-offset", "https://r.jina.ai/http://nataliegwinters.substack.com/api/v1/archive?sort=new&limit=10"],
  ["reader-api-offset-1", "https://r.jina.ai/http://nataliegwinters.substack.com/api/v1/archive?sort=new&search=&offset=1&limit=10"],
  ["reader-archive", "https://r.jina.ai/http://nataliegwinters.substack.com/archive"],
  ["reader-home", "https://r.jina.ai/http://nataliegwinters.substack.com/"],
  ["worker-articles", "https://nataliegwinters-site.generalflynn17.workers.dev/articles"],
  ["site-articles", "https://nataliegwinters.com/articles"],
  ["worker-status", "https://nataliegwinters-site.generalflynn17.workers.dev/api/status"],
];
for (const [name,url] of targets) {
  try {
    const response=await fetch(url,{headers:{Accept:"text/html,application/json,application/rss+xml,*/*"},signal:AbortSignal.timeout(12000)});
    const body=await response.text();
    console.log("\nAUDIT",name,JSON.stringify({status:response.status,type:response.headers.get("content-type"),length:body.length}));
    if(name==="source-api"){
      try {
        const parsed=JSON.parse(body);const rows=Array.isArray(parsed)?parsed:(parsed.posts||[]);
        for(const row of rows.slice(0,10))console.log("API",JSON.stringify({slug:row.slug,canonical_url:row.canonical_url,title:row.title,cover_image:row.cover_image,social_image:row.social_image,post_date:row.post_date}));
      }catch(e){console.log("API-PARSE",String(e),body.slice(0,280));}
    } else if(name==="source-rss"){
      const items=body.match(/<item\b[\s\S]*?<\/item>/g)||[];
      for(const item of items.slice(0,6)){
        console.log("RSS",JSON.stringify({title:item.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.slice(0,110),link:item.match(/<link>(.*?)<\/link>/i)?.[1],enclosure:item.match(/<enclosure[^>]*>/i)?.[0]?.slice(0,400),media:item.match(/<media:content[^>]*>/i)?.[0]?.slice(0,400)}));
      }
    }else if(name==="source-archive"){
      for (const needle of ["democrats-censorship-bill","346a280e-6e96-4101-8409-14741ff74a57","a2619426-4870-4e43-ba56-c538f30d7646"]){
        const i=body.indexOf(needle);
        console.log("ARCHIVE-NEEDLE",needle,i,i>=0?body.slice(Math.max(0,i-300),i+330).replace(/\s+/g," "):"");
      }
    }else if(name.endsWith("articles")){
      const cards=body.match(/<article class="article-card"[\s\S]*?<\/article>/g)||[];
      console.log("CARDS",cards.length,"fragment",body.slice(body.indexOf("article-card")-70,body.indexOf("article-card")+360));
      for(const card of cards.slice(0,12))console.log("CARD",JSON.stringify({href:card.match(/<a href="([^"]+)"/)?.[1],img:card.match(/<img src="([^"]+)"/)?.[1],title:card.match(/<h3>([\s\S]*?)<\/h3>/)?.[1]?.slice(0,140).replace(/<[^>]*>/g,""),placeholder:card.includes("editorial-article-cover")}));
    }else if(name==="worker-status"){
      console.log("STATUS",body.slice(0,2500));
    }else if(name.startsWith("reader-")){
      const m=body.match(/Markdown Content:\s*\n([\s\S]*)/);
      try {const parsed=JSON.parse(m?m[1]:body);for(const row of (Array.isArray(parsed)?parsed:(parsed.posts||[])).slice(0,10))console.log("READER",JSON.stringify({slug:row.slug,cover_image:row.cover_image,social_image:row.social_image}));}
      catch(e){console.log("READER-PARSE",String(e),body.slice(0,2200));}
    }
  }catch(e){console.log("AUDIT-ERROR",name,String(e));}
}
