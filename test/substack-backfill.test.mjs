import assert from 'node:assert/strict';
import { buildRecovery } from '../scripts/operations/backfill-substack-20261023.mjs';
const base = 'https://nataliegwinters.substack.com/p/';
const cached = {
  posts: [
    {id:'web-revealed-the-eus-push-to-read-millions',title:'Existing top',url:base+'revealed-the-eus-push-to-read-millions',date:'2026-10-20T11:09:32Z',image:'https://substack-post-media.s3.amazonaws.com/public/images/cover.jpg'},
    ...Array.from({length:24},(_,i)=>({id:'web-history-'+i,title:'History '+i,url:base+'history-'+i,date:`2026-10-${String(19-Math.floor(i/2)).padStart(2,'0')}T11:00:00Z`,image:''}))
  ],updatedAt:1,newestId:'web-revealed-the-eus-push-to-read-millions',newestUrl:base+'revealed-the-eus-push-to-read-millions',marker:'preserve'
};
const snapshot=JSON.stringify(cached);
const {state,changed,added}=buildRecovery(cached,111);
assert.equal(changed,true);assert.equal(added.length,2);assert.equal(state.posts.length,25);
assert.equal(state.marker,'preserve');assert.equal(state.updatedAt,111);
assert.equal(state.posts[0].url,base+'he-helped-run-immigration-under-biden');
assert.equal(state.posts[1].url,base+'blockade-and-riot-how-soros-and-gates');
assert.equal(state.posts[2].image,cached.posts[0].image);
assert.equal(state.posts[0].image,'');assert.equal(state.posts[1].image,'');
assert.equal(JSON.stringify(cached),snapshot,'must not mutate current KV value');
assert.equal(buildRecovery(state,222).changed,false,'repeat must not write');
assert.throws(()=>buildRecovery({...cached,posts:cached.posts.slice(1)}));
assert.throws(()=>buildRecovery({...cached,posts:[{...cached.posts[0],url:base+'a-newer-article'},...cached.posts.slice(1)]}));
assert.throws(()=>buildRecovery({...cached,posts:[cached.posts[0],cached.posts[0],...cached.posts.slice(2)]}));
console.log('One-shot Substack recovery scope, preservation, idempotency and holds: PASS');
