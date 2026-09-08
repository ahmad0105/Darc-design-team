# Security Policy
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET` are stored **only** as Cloudflare Worker secrets.
- The code accesses them via `c.env.<VAR>`; no secret values are committed.
- Development secrets may be placed in `.dev.vars`, which is ignored by git.
