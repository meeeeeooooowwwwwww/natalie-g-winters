// Cloudflare Email Routing intake for Natalie Substack publication notices.
// Verified email topImage is provisional; archive/OG cover metadata outranks it.
import { upsertEmailArticle } from "./substack.js";

const FROM = "nataliegwinters@substack.com";
const LIST_ID = "nataliegwinters.substack.com";
const POST_ROOT = "https://nataliegwinters.substack.com/p/";
const MAX_EMAIL_BYTES = 1024 * 1024;

function unfold(headers) {
  return headers.replace(/\r?\n[ \t]+/g, " ");
}

function getHeader(raw, name) {
  const headerBlock = unfold(String(raw).split(/\r?\n\r?\n/, 1)[0]);
  const match = headerBlock.match(new RegExp("^" + name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + ":[ \\t]*(.*)$", "im"));
  return match ? match[1].trim() : "";
}

function bytesFromBase64(value) {
  const binary = atob(String(value).replace(/\s+/g, ""));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function quotedPrintableBytes(value) {
  const source = String(value).replace(/=\r?\n/g, "");
  const bytes = [];
  for (let i = 0; i < source.length; i++) {
    if (source[i] === "=" && /^[0-9a-f]{2}$/i.test(source.slice(i + 1, i + 3))) {
      bytes.push(parseInt(source.slice(i + 1, i + 3), 16));
      i += 2;
    } else {
      const cp = source.codePointAt(i);
      if (cp > 127) {
        bytes.push(...new TextEncoder().encode(String.fromCodePoint(cp)));
        if (cp > 0xffff) i++;
      } else bytes.push(cp);
    }
  }
  return Uint8Array.from(bytes);
}

function decodeWord(encoded, type, payload) {
  try {
    const bytes = type.toUpperCase() === "B"
      ? bytesFromBase64(payload)
      : quotedPrintableBytes(payload.replace(/_/g, " "));
    return new TextDecoder(encoded, { fatal: false }).decode(bytes);
  } catch {
    return "";
  }
}

function decodeMimeHeader(value) {
  return String(value)
    .replace(/\?=\s+(?==\?)/g, "?=")
    .replace(/=\?([^?]+)\?([BQ])\?([^?]+)\?=/gi, (_, charset, type, data) => decodeWord(charset, type, data));
}

function decodePart(payload, encoding) {
  if (/base64/i.test(encoding)) {
    try { return new TextDecoder().decode(bytesFromBase64(payload)); }
    catch { return ""; }
  }
  if (/quoted-printable/i.test(encoding)) {
    return new TextDecoder().decode(quotedPrintableBytes(payload));
  }
  return payload;
}

function parsePart(raw) {
  const [head, ...bodyParts] = String(raw).split(/\r?\n\r?\n/);
  const body = bodyParts.join("\n\n");
  return {
    contentType: getHeader(head + "\n\n", "Content-Type").toLowerCase(),
    body: decodePart(body, getHeader(head + "\n\n", "Content-Transfer-Encoding")),
  };
}

function getMailParts(raw) {
  const type = getHeader(raw, "Content-Type");
  const boundary = type.match(/boundary=["']?([^;"'\s]+)/i)?.[1];
  if (!boundary) return [parsePart(raw)];
  const chunks = raw.split("--" + boundary).slice(1);
  return chunks.filter((s) => s.trim() && !s.startsWith("--")).map(parsePart);
}

function decodeEntities(input) {
  return String(input).replace(/&quot;/gi, '"').replace(/&apos;|&#39;/gi, "'")
    .replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ").replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([a-f0-9]+);/gi, (_, d) => String.fromCodePoint(parseInt(d, 16)));
}

function stripHtml(input) {
  return decodeEntities(String(input).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function postUrl(value) {
  try {
    const url = new URL(decodeEntities(String(value).replace(/^<|>$/g, "").trim()));
    if (url.protocol !== "https:") return "";
    if (url.hostname === "nataliegwinters.substack.com" && /^\/p\/[^/]+\/?$/.test(url.pathname)) {
      return POST_ROOT + url.pathname.split("/")[2];
    }
    if (url.hostname === "open.substack.com" && /^\/pub\/nataliegwinters\/p\/[^/]+\/?$/.test(url.pathname)) {
      return POST_ROOT + url.pathname.split("/")[4];
    }
  } catch {}
  return "";
}


function verifiedNewsletterTopImage(html) {
  // Read only Substack's author-published topImage asset, never the first
  // arbitrary <img> (which may be a tracker, avatar, icon or inline advert).
  // This is provisional article artwork, NOT an authoritative preview cover.
  const tags = String(html).match(/<img\\b[^>]*>/gi) || [];
  for (const tag of tags.slice(0, 80)) {
    const attribute = tag.match(/\\bdata-attrs\\s*=\\s*(["'])(.*?)\\1/i)?.[2];
    if (!attribute) continue;
    let metadata;
    try { metadata = JSON.parse(decodeEntities(attribute)); }
    catch { continue; }
    if (metadata?.topImage !== true || typeof metadata.src !== "string") continue;
    try {
      const src = new URL(metadata.src);
      if (src.protocol !== "https:" || src.hostname !== "substack-post-media.s3.amazonaws.com") continue;
      if (src.search || src.hash || src.username || src.password) continue;
      if (!/^\\/public\\/images\\/[a-z0-9_-]{8,180}\\.(?:jpe?g|png|webp)$/i.test(src.pathname)) continue;
      if ((Number(metadata.width) > 0 && Number(metadata.width) < 400) ||
          (Number(metadata.height) > 0 && Number(metadata.height) < 250)) continue;
      return src.toString();
    } catch {
      // Untrusted or malformed image URLs are ignored, not forwarded.
    }
  }
  return "";
}

export function extractSubstackNotice(raw) {
  if (typeof raw !== "string" || !raw || raw.length > MAX_EMAIL_BYTES) return null;
  const sender = getHeader(raw, "From").match(/<([^<>]+)>/)?.[1] || getHeader(raw, "From");
  const list = getHeader(raw, "List-Id").replace(/^<|>$/g, "").toLowerCase();
  // List-Id plus From and List-Post limit this parser to a single publication.
  // The Cloudflare routing rule must be restricted to a dedicated recipient.
  if (sender.trim().toLowerCase() !== FROM || list !== LIST_ID) return null;
  const article = postUrl(getHeader(raw, "List-Post"));
  if (!article) return null;
  if (getHeader(raw, "X-Mailgun-Tag") && getHeader(raw, "X-Mailgun-Tag") !== "post") return null;
  const title = stripHtml(decodeMimeHeader(getHeader(raw, "Subject"))).slice(0, 250);
  if (!title || /^(re|fwd?):/i.test(title)) return null;
  const dateString = getHeader(raw, "Date");
  const timestamp = Date.parse(dateString);
  if (!Number.isFinite(timestamp)) return null;
  const now = Date.now();
  if (timestamp > now + 10 * 60 * 1000 || timestamp < now - 35 * 24 * 60 * 60 * 1000) return null;

  const parts = getMailParts(raw);
  const html = parts.find((p) => p.contentType.startsWith("text/html"))?.body || "";
  const preview = html.match(/<div\b[^>]*\bclass=["'][^"']*\bpreview\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1] || "";
  // Substack marks the post-body top image. Use it only until its canonical
  // publication cover appears from RSS, Open Graph, or the archive API.
  const image = verifiedNewsletterTopImage(html);
  return {
    title,
    url: article,
    date: new Date(timestamp).toISOString(),
    subtitle: stripHtml(preview).slice(0, 400),
    image,
    imageQuality: image ? 120 : 0,
  };
}

export async function receiveSubstackEmail(message, env) {
  const expected = String(env?.NATALIE_EMAIL_RECIPIENT || "").trim().toLowerCase();
  if (!expected || message.to?.toLowerCase() !== expected) {
    message.setReject?.("Unexpected recipient");
    return { result: "rejected-recipient" };
  }
  if (String(message.from || "").toLowerCase() !== FROM) {
    // Gmail forwarding may rewrite the SMTP envelope via SRS. We only allow
    // the original envelope or Google's forwarding envelope; the RFC From
    // and List-Id are checked independently below.
    const envelope = String(message.from || "").toLowerCase();
    if (!envelope.endsWith("@gmail.com") && !/@[^@]+\.google\.com$/.test(envelope)) {
      message.setReject?.("Unexpected sender");
      return { result: "rejected-envelope" };
    }
  }
  if (Number(message.rawSize) > MAX_EMAIL_BYTES) {
    message.setReject?.("Message too large");
    return { result: "rejected-size" };
  }
  const raw = await new Response(message.raw).text();
  const post = extractSubstackNotice(raw);
  if (!post) {
    // No recipient body, message or sender data is ever written to storage.
    return { result: "ignored-unrecognised-notice" };
  }
  const saved = await upsertEmailArticle(env, post);
  console.log("Substack email article intake:", saved.changed ? "updated" : "duplicate", saved.newestUrl);
  return saved;
}

export const __testing = { decodeMimeHeader, postUrl, getMailParts };
