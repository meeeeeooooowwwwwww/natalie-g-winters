NATALIE SUBSTACK UPDATER FIX

Replace:
  C:\nataliegwinters.com\site\src\substack.js
  C:\nataliegwinters.com\site\wrangler.jsonc

IMPORTANT ONE-LINE CHANGE IN src\worker.js:

Find:
  const posts = await getLatestPosts(env);

Change it to:
  const posts = await getLatestPosts(env, ctx);

Do not replace the rest of worker.js. This preserves all current pages/routes.

Then deploy:
  cd /mnt/c/nataliegwinters.com/site
  npx wrangler deploy

What changed:
- Primary source is now /api/v1/posts, not the stale archive endpoint.
- API checks explicitly bypass cache.
- Cron runs every 2 hours.
- Existing article KV remains intact on errors.
- Next visitor triggers a background refresh if Cron has missed its window.
