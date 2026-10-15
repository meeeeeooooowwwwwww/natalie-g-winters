# Substack publication email intake — setup and verification

## State and safety boundary

The site already displays the latest 25 posts from Cloudflare KV. The new
`email()` Worker handler only receives messages **after Cloudflare Email
Routing is explicitly configured**. Deploying the code alone does not
subscribe, forward, route, or replay any messages.

- Cloudflare zone: `nataliegwinters.com`
- Dedicated subdomain: `feeds.nataliegwinters.com`
- Only accepted recipient: `articles@feeds.nataliegwinters.com`
- Target Worker: `nataliegwinters-site`
- Original publication: `nataliegwinters@substack.com`
- Sender publication identity: `List-Id: nataliegwinters.substack.com`
- Article identity: `List-Post: <https://nataliegwinters.substack.com/p/...>`

Do not enable apex email routing or alter existing MX records for the apex.
Cloudflare supports separately onboarding subdomains. No credentials, mailbox
contents, or Gmail tokens are stored by this Worker.

## Initial routing and Gmail forwarding verification

1. In Cloudflare, open **nataliegwinters.com → Compute → Email Service →
   Email Routing → Settings → Subdomains**. Enable routing only for `feeds`.
   Check that Cloudflare supplies the subdomain MX/TXT records.
2. Add `articles@feeds.nataliegwinters.com` as an exact custom address,
   temporarily forwarding it to the verified Gmail destination
   `generalflynn17@gmail.com`. This **temporary** forward is needed so
   Gmail's new-address confirmation message is actually received.
3. In the Gmail account `generalflynn17@gmail.com`, go to **Settings →
   See all settings → Forwarding and POP/IMAP → Add a forwarding address**.
   Enter `articles@feeds.nataliegwinters.com`. Verify from the confirmation
   message that Cloudflare temporarily forwarded to the inbox.
4. Change the Cloudflare routing action for the exact custom address to
   **Send to Worker → nataliegwinters-site** (not `forward` to Gmail).
5. Back in Gmail, leave global forwarding **disabled**. Create a filter using
   sender `nataliegwinters@substack.com`, and select **Forward it to →
   articles@feeds.nataliegwinters.com**. Preserve inbox copies. A filter
   must apply to *new incoming* newsletter messages; previously received
   messages are not backfilled.
6. Verify on a genuinely new publication notification; inspect
   `https://nataliegwinters.com/api/status` for `emailLastReceivedAt`,
   `emailNewestTitle`, `emailNewestUrl`, and `emailImageProvisional`.
   The actual archive must also display the post. Normal RSS updates
   continue as fallback/enrichment, respecting rate limits.

## Cover images

Only canonical archive cover/social metadata, post Open Graph metadata, and
explicit RSS media fields establish a preview image. Email body `topImage`
means an inline article image, not the publication cover. Email ingestion
therefore leaves the image empty until a canonical source supplies it; existing
verified covers are preserved. Cached body/reader heuristic image ranks 50, 80
and 100 are suppressed on read. Never manually promote an inline image to a
canonical cover rank.

## Failures and rollback

- The Email Worker only accepts the exact receiving address, Substack
  sender, publication List-Id, valid List-Post URL, and a plausible date.
- Unrecognised or malformed messages do not modify KV.
- Gmail forwarding has to remain active for this path; Substack RSS remains
  independent. No ongoing Gmail API access is needed.
- To stop email ingestion, disable the exact Cloudflare routing rule, then
  remove the Gmail forwarding filter if desired. Existing cached articles
  remain untouched. Do not disable the site's normal Worker routes.
- Forwarded email headers alone are not cryptographic proof of authorship.
  The receiving address must remain dedicated and unpublished outside the
  forwarding configuration. Consider direct Substack subscription to this
  mailbox if Gmail forwarding proves unreliable.
- Monitor errors and KV updates after activation. Do not treat a passing
  code/deployment check as proof an email has actually arrived.

## Validation

Run `npm run check && npm test && npx wrangler deploy --dry-run` before
deployment. Tests cover valid MIME, rejected senders/recipients, idempotent
replay, and official-image priority.
