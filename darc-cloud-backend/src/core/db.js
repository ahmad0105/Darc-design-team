import { createClient } from '@supabase/supabase-js';

let _client = null;

export function getDB(env) {
  if (env && env._db) return env._db;
  if (!_client) {
    _client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }
  return _client;
}
