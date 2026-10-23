// Temporary, narrowly scoped October 2026 article-backlog recovery.
// Retire after live readback. Does not change email or polling status.
const KEY='natalie_latest_articles_v4';
const ALLOWED=new Set([
  'https://nataliegwinters.substack.com/p/revealed-the-eus-push-to-read-millions',
  'https://nataliegwinters.substack.com/p/blockade-and-riot-how-soros-and-gates',
  'https://nataliegwinters.substack.com/p/he-helped-run-immigration-under-biden',
]);
const ADD=[
  { id:'web-he-helped-run-immigration-under-biden',title:'He Helped Run Immigration Under Biden. Now He Works For The Chinese.', url:'https://nataliegwinters.substack.com/p/he-helped-run-immigration-under-biden', date:'2026-10-22T11:10:33.000Z',subtitle:'Michael Valverde’s advisory deal promises private case reviews and better approval prospects.',image:'',imageQuality:0,imageVersion:'' },
  { id:'web-blockade-and-riot-how-soros-and-gates',title:'BLOCKADE AND RIOT: How Soros & Gates-Backed Activists Are Already Training For A Contested Election',url:'https://nataliegwinters.substack.com/p/blockade-and-riot-how-soros-and-gates',date:'2026-10-21T11:58:33.000Z',subtitle:'Open Society Policy Center, Melinda French Gates’ Pivotal Ventures and Pritzker Family Foundation are among its supporters.',image:'',imageQuality:0,imageVersion:'' },
];

export function previewOctoberRecovery(state, now=Date.now()) {
  if (!state || !Array.isArray(state.posts) || state.posts.length!==25) return null;
  if (!ALLOWED.has(state.posts[0]?.url)) return null;
  if (!state.posts.every(p=>typeof p.title==='string'&&/^https:\/\/nataliegwinters\.substack\.com\/p\/[a-z0-9-]+$/.test(p.url))) return null;
  const present=new Set(state.posts.map(p=>p.url));
  if (present.size!==25) return null;
  const missing=ADD.filter(p=>!present.has(p.url));
  if (!missing.length) return {changed:false, state};
  const posts=[...missing,...state.posts].sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)).slice(0,25);
  if (posts.length!==25 || posts[0].url!==ADD[0].url || posts[1].url!==ADD[1].url) return null;
  return {changed:true,state:{...state,posts,updatedAt:now,newestId:posts[0].id,newestUrl:posts[0].url}};
}

export async function recoverVerifiedOctoberArticles(env) {
  if (!env?.NATALIE_KV) return 'missing-kv';
  const current=await env.NATALIE_KV.get(KEY,'json');
  const result=previewOctoberRecovery(current);
  if (!result) return 'guard-blocked';
  if (!result.changed) return 'already-recovered';
  const latest=await env.NATALIE_KV.get(KEY,'json');
  if (JSON.stringify(latest)!==JSON.stringify(current)) return 'changed-during-preflight';
  await env.NATALIE_KV.put(KEY,JSON.stringify(result.state));
  console.log('Natalie Oct 21–22 verified newsletter article archive recovered');
  return 'updated';
}
