Natalie Substack updater fix - 2026-08-25

Replace only:
  C:\nataliegwinters.com\site\src\substack.js
  C:\nataliegwinters.com\site\src\worker.js

No change to wrangler.jsonc is required. The existing 2-hour Cron remains.

Deploy:
  cd /mnt/c/nataliegwinters.com/site
  npx wrangler deploy

After deployment:
  1. Visit https://nataliegwinters.com/ once.
  2. Wait 10-20 seconds and refresh. The new check-state key forces an immediate background refresh.
  3. Visit https://nataliegwinters.com/api/status to see the actual updater status.

The updater now treats the live Substack homepage as the source of truth instead of Substack's lagging internal JSON endpoints.
