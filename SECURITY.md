# Security Policy

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET` are stored **only** as Cloudflare Worker secrets.
- The code accesses them via `c.env.<VAR>`; no secret values are ever committed.
- Local development secrets may be placed in `.dev.vars` or `darc-cloud-backend/.env`, both of which are ignored by git.
- Do **not** commit any file that contains raw secret strings.
