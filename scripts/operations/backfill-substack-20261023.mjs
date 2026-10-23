import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const KEY = 'natalie_latest_articles_v4';
const NAMESPACE_ID = '7751d2c212db4316b98316b280882892';
const EXPECTED_OLD_URL = 'https://nataliegwinters.substack.com/p/revealed-the-eus-push-to-read-millions';
const ALLOWED_HOST = 'nataliegwinters.substack.com';
const ARTICLES = Object.freeze([
  {
    id: 'web-he-helped-run-immigration-under-biden',
    title: 'He Helped Run Immigration Under Biden. Now He Works For The Chinese.',
    url: 'https://nataliegwinters.substack.com/p/he-helped-run-immigration-under-biden',
    date: '2026-10-22T11:10:33.000Z',
    subtitle: 'Michael Valverde’s advisory deal promises private case reviews and better approval prospects.',
    image: '',
    imageQuality: 0,
    imageVersion: '',
  },
  {
    id: 'web-blockade-and-riot-how-soros-and-gates',
    title: 'BLOCKADE AND RIOT: How Soros & Gates-Backed Activists Are Already Training For A Contested Election',
    url: 'https://nataliegwinters.substack.com/p/blockade-and-riot-how-soros-and-gates',
    date: '2026-10-21T11:58:33.000Z',
    subtitle: 'Open Society Policy Center, Melinda French Gates’ Pivotal Ventures and Pritzker Family Foundation are among its supporters.',
    image: '',
    imageQuality: 0,
    imageVersion: '',
  },
]);

function hash(s) { return createHash('sha256').update(s).digest('hex'); }
function canonicalUrl(url) {
  const u = new URL(url);
  assert.equal(u.protocol, 'https:');
  assert.equal(u.hostname, ALLOWED_HOST);
  assert.match(u.pathname, /^\/p\/[a-z0-9-]+$/);
  assert.equal(u.search, '');
  assert.equal(u.hash, '');
  return u.href;
}

export function buildRecovery(current, now = Date.now()) {
  assert(current && Array.isArray(current.posts), 'Expected existing KV article cache');
  assert.equal(current.posts.length, 25, 'Refuse unexpected archive shape/count');
  assert(current.posts.every(p => typeof p.title === 'string' && typeof p.url === 'string'), 'Invalid existing post');
  const oldNewest = canonicalUrl(current.posts[0].url);
  const eligible = [EXPECTED_OLD_URL, ...ARTICLES.map(x => x.url)];
  assert(eligible.includes(oldNewest), 'Archive moved beyond approved newest cohort; abort instead of overwriting fresher email arrivals');
  assert(current.posts.every(p => canonicalUrl(p.url)), 'Unexpected existing article URL');
  const unique = new Set(current.posts.map(p => p.url));
  assert.equal(unique.size, current.posts.length, 'Existing article duplicates');

  const add = ARTICLES.filter(p => !unique.has(p.url));
  for (const p of add) {
    assert.equal(canonicalUrl(p.url), p.url);
    assert(Number.isFinite(Date.parse(p.date)));
    assert.equal(p.image, '', 'Unverified email body image cannot become article cover');
  }
  if (!add.length) return { changed: false, state: current, added: [] };

  const posts = [...add, ...current.posts]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 25);
  assert.equal(posts.length, 25);
  assert.equal(new Set(posts.map(p => p.url)).size, 25);
  assert.deepEqual(posts.slice(0, 2).map(p => p.url), ARTICLES.map(p => p.url));
  const updated = {
    ...current,
    posts,
    updatedAt: now,
    newestId: posts[0].id,
    newestUrl: posts[0].url,
  };
  return { changed: true, state: updated, added: add.map(p => p.url) };
}

function readRemote() {
  const value = execFileSync('npx', ['--no-install', 'wrangler', 'kv', 'key', 'get', KEY, '--namespace-id', NAMESPACE_ID, '--remote', '--text'],
    { encoding: 'utf8', maxBuffer: 2_000_000, stdio: ['ignore', 'pipe', 'inherit'], timeout: 45_000 });
  assert(value.trim().startsWith('{'), 'KV key absent or malformed; do not initialize production archive');
  return { raw: value.trim(), state: JSON.parse(value) };
}

async function main() {
  assert.equal(process.env.GITHUB_REF, 'refs/heads/main', 'Production recovery only from main');
  assert(process.env.CLOUDFLARE_API_TOKEN && process.env.CLOUDFLARE_ACCOUNT_ID, 'Natalie Cloudflare credentials required');
  assert.equal(process.env.NATALIE_BACKFILL_APPROVED, 'two-email-posts-20261023', 'Incorrect one-time job scope');
  const initial = readRemote();
  const proposed = buildRecovery(initial.state);
  if (!proposed.changed) {
    console.log('PASS: both verified Substack article URLs already present; no write.');
    return;
  }
  const repeat = readRemote();
  assert.equal(hash(repeat.raw), hash(initial.raw), 'KV archive changed during recovery preflight; abort safely');
  const folder = mkdtempSync(join(tmpdir(), 'natalie-kv-backfill-'));
  try {
    const path = join(folder, 'articles.json');
    writeFileSync(path, JSON.stringify(proposed.state));
    console.log('Preflight PASS: preserving 25-post archive; inserting ' + proposed.added.length + ' verified article URLs.');
    execFileSync('npx', ['--no-install', 'wrangler', 'kv', 'key', 'put', KEY, '--namespace-id', NAMESPACE_ID, '--remote', '--path', path],
      { encoding: 'utf8', maxBuffer: 2_000_000, stdio: ['ignore', 'pipe', 'inherit'], timeout: 45_000 });
    console.log('KV write requested. Newest: ' + proposed.state.posts[0].url);
    const check = readRemote();
    const actual = check.state.posts.map(p => p.url);
    const complete = ARTICLES.every(p => actual.includes(p.url));
    console.log('Remote read-after-write: ' + (complete ? 'PASS' : 'pending KV propagation') + ', articleCount=' + check.state.posts.length);
    if (!complete) process.exitCode = 2;
  } finally { rmSync(folder, { recursive: true, force: true }); }
}

if (process.argv[1] && import.meta.url === new URL('file://' + process.argv[1]).href) {
  main().catch(error => { console.error('BLOCK: ' + error.message); process.exitCode = 1; });
}
