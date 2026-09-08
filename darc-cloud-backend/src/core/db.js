import { createClient } from '@supabase/supabase-js';

let _client = null;

export function getDB(env) {
  if (!_client) {
    _client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
  }
  return _client;
}
