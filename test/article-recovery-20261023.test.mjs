import assert from 'node:assert/strict';
import { previewOctoberRecovery, recoverVerifiedOctoberArticles } from '../src/article-recovery-20261023.js';
const prefix='https://nataliegwinters.substack.com/p/';
const old={posts:[
  {id:'web-eu',url:prefix+'revealed-the-eus-push-to-read-millions',title:'EU story',image:'https://substack-post-media.s3.amazonaws.com/public/images/verified.jpg',date:'2026-10-20T11:09:32Z'},
  ...Array.from({length:24},(_,i)=>({id:'web-history-'+i,url:prefix+'history-'+i,title:'Existing '+i,date:new Date(Date.UTC(2026,9,19-i)).toISOString(),image:''}))
],updatedAt:1,provenance:'existing-preserved'};
const oldJson=JSON.stringify(old);
const p=previewOctoberRecovery(old,42);
assert(p?.changed);
assert.equal(p.state.posts.length,25);
assert.equal(p.state.updatedAt,42);
assert.equal(p.state.provenance,'existing-preserved');
assert.equal(p.state.posts[0].url,prefix+'he-helped-run-immigration-under-biden');
assert.equal(p.state.posts[1].url,prefix+'blockade-and-riot-how-soros-and-gates');
assert.equal(p.state.posts[2].image,old.posts[0].image);
assert.equal(p.state.posts[0].image,'');
assert.equal(JSON.stringify(old),oldJson);
assert.equal(previewOctoberRecovery(p.state).changed,false,'idempotent repeated request');
assert.equal(previewOctoberRecovery({...old,posts:old.posts.slice(1)}),null);
assert.equal(previewOctoberRecovery({...old,posts:[{...old.posts[0],url:prefix+'new-post'},...old.posts.slice(1)]}),null);
const kv=new Map([['natalie_latest_articles_v4',old]]);
const env={NATALIE_KV:{async get(k){return kv.get(k);},async put(k,v){kv.set(k,JSON.parse(v));}}};
assert.equal(await recoverVerifiedOctoberArticles(env),'updated');
assert.equal(await recoverVerifiedOctoberArticles(env),'already-recovered');
assert.equal(kv.get('natalie_latest_articles_v4').posts.length,25);
console.log('Natalie Worker KV recovery holds and idempotency: PASS');
