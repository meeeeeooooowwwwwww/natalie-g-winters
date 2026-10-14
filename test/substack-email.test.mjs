import assert from "node:assert/strict";
import { extractSubstackNotice, receiveSubstackEmail } from "../src/email-feed.js";
import { getStoredArticleState, upsertEmailArticle } from "../src/substack.js";

const url = "https://nataliegwinters.substack.com/p/the-1-billion-plan-to-permanently";
const image = "https://substack-post-media.s3.amazonaws.com/public/images/83c0c2b3-0d1f-49ec-a8b7-32c836a17e80_1260x1603.jpeg";
const oldImage = "https://substack-post-media.s3.amazonaws.com/public/images/known-cover_1200x675.jpeg";
const recent = new Date(Date.now() - 60 * 60 * 1000).toUTCString();

const mime = [
  'From: "Natalie Winters" <nataliegwinters@substack.com>',
  'To: generalflynn17@gmail.com',
  'Subject: =?UTF-8?Q?The_=E2=82=AC1_Billion_Plan_to_Permanently_Fund_Europe=E2=80=99?=',
  ' =?UTF-8?Q?s_=E2=80=9CDisinformation=E2=80=9D_Industry?=',
  'Date: ' + recent,
  'List-Id: <nataliegwinters.substack.com>',
  'List-Post: <' + url + '>',
  'X-Mailgun-Tag: post',
  'Content-Type: multipart/alternative; boundary="substack-demo"',
  '',
  '--substack-demo',
  'Content-Type: text/plain; charset="utf-8"',
  'Content-Transfer-Encoding: quoted-printable',
  '',
  'View this post on the web at https://nataliegwinters.substack.com/p/the-1-b=',
  'illion-plan-to-permanently',
  '',
  '--substack-demo',
  'Content-Type: text/html; charset="utf-8"',
  'Content-Transfer-Encoding: quoted-printable',
  '',
  '<div class="preview" style="display:none">Europe&#8217;s online speech watchdogs require funding.</div>',
  '<img class="wide-image" data-attrs="{&quot;src&quot;:&quot;' + image + '&quot;,&quot;topImage&quot;:true}" />',
  '<img data-attrs="{&quot;src&quot;:&quot;https://substack-post-media.s3.amazonaws.com/public/images/random-avatar.png&quot;,&quot;topImage&quot;:false}" />',
  '',
  '--substack-demo--',
  ''
].join("\r\n");

const parsed = extractSubstackNotice(mime);
assert.ok(parsed, "accepted authentic publication notification");
assert.equal(parsed.title, "The €1 Billion Plan to Permanently Fund Europe’s “Disinformation” Industry");
assert.equal(parsed.url, url);
assert.equal(parsed.subtitle, "Europe’s online speech watchdogs require funding.");
assert.equal(parsed.image, image);
assert.equal(parsed.imageQuality, 80);
assert.equal(extractSubstackNotice(mime.replace('List-Id: <nataliegwinters.substack.com>', 'List-Id: <other.substack.com>')), null);
assert.equal(extractSubstackNotice(mime.replace('From: "Natalie Winters" <nataliegwinters@substack.com>', 'From: "Someone Else" <evil@example.com>')), null);
assert.equal(extractSubstackNotice(mime.replace('List-Post: <' + url + '>', 'List-Post: <https://evil.example.com/p/forged>')), null);
assert.equal(extractSubstackNotice(mime.replace('X-Mailgun-Tag: post', 'X-Mailgun-Tag: promo')), null);

const entries = new Map();
const env = {
  NATALIE_EMAIL_RECIPIENT: "articles@feeds.nataliegwinters.com",
  NATALIE_KV: {
    async get(key) { return entries.get(key) || null; },
    async put(key, value) { entries.set(key, JSON.parse(value)); },
  },
};

const message = (raw = mime, to = env.NATALIE_EMAIL_RECIPIENT, from = "nataliegwinters@substack.com") => ({
  raw: new ReadableStream({
    start(controller) { controller.enqueue(new TextEncoder().encode(raw)); controller.close(); },
  }),
  rawSize: raw.length,
  from,
  to,
  setReject(message) { this.rejectedWith = message; },
});

const notOurAddress = await receiveSubstackEmail(message(mime, "other@feeds.nataliegwinters.com"), env);
assert.equal(notOurAddress.result, "rejected-recipient");
const notOurSender = await receiveSubstackEmail(message(mime, env.NATALIE_EMAIL_RECIPIENT, "bad@example.com"), env);
assert.equal(notOurSender.result, "rejected-envelope");

const first = await receiveSubstackEmail(message(), env);
assert.equal(first.changed, true);
let state = await getStoredArticleState(env);
assert.equal(state.posts[0].url, url);
assert.equal(state.posts[0].image, image);
assert.equal(state.posts[0].imageQuality, 80);
const repeat = await receiveSubstackEmail(message(), env);
assert.equal(repeat.changed, false);
assert.equal(entries.get("natalie_article_email_status_v1").lastResult, "duplicate");

// Authoritative Substack cover metadata must ALWAYS outrank the provisional
// email body's topImage even if the notification arrives again.
await upsertEmailArticle(env, {
  ...parsed,
  cover_image: oldImage,
  imageQuality: 500,
});
state = await getStoredArticleState(env);
assert.equal(state.posts[0].image, oldImage);
assert.equal(state.posts[0].imageQuality, 500);

const stillCover = await receiveSubstackEmail(message(), env);
assert.equal(stillCover.changed, false);
state = await getStoredArticleState(env);
assert.equal(state.posts[0].image, oldImage);
assert.equal(state.posts[0].imageQuality, 500);

// A transient KV read failure must never allow an email to replace the
// existing rolling archive with a single article.
const originalGet = env.NATALIE_KV.get;
env.NATALIE_KV.get = async () => { throw new Error("temporary KV outage"); };
await assert.rejects(() => receiveSubstackEmail(message(), env), /temporary KV outage/);
env.NATALIE_KV.get = originalGet;
assert.equal(entries.get("natalie_latest_articles_v4").posts.length, 1);

console.log("Substack email intake, routing and image-priority tests: PASS");
