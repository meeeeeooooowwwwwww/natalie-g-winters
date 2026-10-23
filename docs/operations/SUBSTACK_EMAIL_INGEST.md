# Substack publication email intake — setup and verification

## State and safety boundary

The site already displays the latest 25 posts from Cloudflare KV. The new
`email()` Worker handler only receives messages **after Cloudflare Email
Routing is configured and a real message arrives**. The configured
literal Worker address does not create a Gmail filter, subscribe to
Substack, or replay historic messages.

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

**Deployment ownership:** `wrangler.jsonc` declares exactly one
`addresses` entry: `articles@feeds.nataliegwinters.com`. Cloudflare
Wrangler 4.113+ can manage the exact Send-to-Worker rule on deployment.
This rule belongs only to `nataliegwinters-site`. The first deployment
requires the `feeds` subdomain to be enabled for Email Routing and a
Cloudflare token permitted to change email rules. A dry run is not a
live routing test. Never configure an apex catch-all or change apex MX.

1. In Cloudflare, select `nataliegwinters.com` and open **Compute →
   Email Service → Email Routing → Settings → Subdomains**. Enable just
   `feeds`. Verify that Cloudflare supplied MX/TXT DNS records on
   `feeds.nataliegwinters.com`, not the apex.
2. **Only if Gmail has not verified this forwarding destination yet:**
   temporarily create the exact address
   `articles@feeds.nataliegwinters.com` with **Send to an email** to
   the already verified destination `generalflynn17@gmail.com`.
   In Gmail's **Settings → See all settings → Forwarding and POP/IMAP**,
   add `articles@feeds.nataliegwinters.com` as a forwarding address.
   Confirm Gmail's verification message arrived through Cloudflare.
3. Once Gmail shows that forwarding address as verified, **remove only
   the temporary exact email-forwarding rule**. Do not remove other
   routes or any apex settings. Confirm no manually managed rule
   conflicts with the declared address; a takeover conflict must be
   investigated, not force-overridden.
4. Deploy the current `main` commit using Natalie's own
   **Deploy Natalie G. Winters (independent)** manual workflow with
   confirmation `DEPLOY`. Wrangler creates/manages the literal
   `articles@feeds.nataliegwinters.com` → `nataliegwinters-site`
   routing rule. Verify in Cloudflare that the rule is **Active** and
   the action is **Send to a Worker**, not Send to an email. If
   deployment reports missing permissions or routing conflicts, leave
   the existing rule unchanged and repair that specific blocker.
5. In Gmail, **leave global forwarding disabled**. Create a filter with
   `from:nataliegwinters@substack.com`, action **Forward it to →
   articles@feeds.nataliegwinters.com**. Retain Gmail's inbox copies.
   Filter forwarding applies to **new** publication notifications,
   not historical mail already in the inbox.
6. Wait for a genuinely new Natalie post notification, then inspect
   `https://nataliegwinters.com/api/status` and verify
   `emailLastReceivedAt`, `emailNewestTitle`, `emailNewestUrl` and
   the public `/articles` page. Do not mistake GitHub CI success,
   Wrangler deployment, or a successful RSS poll for proof of email
   delivery. If edge access returns 403, inspect this Worker from an
   authorized browser or in Cloudflare Worker logs without weakening
   access protections.

No existing article is auto-forwarded or backfilled by Gmail filter
creation. Keep the scheduled RSS polling as a secondary,
rate-limit-respecting metadata/cover-enrichment source.

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
- To stop email ingestion, remove/disable Gmail's sender-specific forwarding
  filter first. For a permanent stop, remove the exact address from Wrangler
  in a reviewed change before deploying, since a Wrangler-managed rule may
  be recreated on later deployments. Existing cached articles stay untouched.
  Do not disable the site's normal Worker routes.
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
