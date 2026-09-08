// Dynamically match current hostname (localhost vs 127.0.0.1) so origin and API match 100% to prevent Cross-Site Cookie rejection
export const API_BASE = (typeof window !== 'undefined' && (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'))
  ? `${window.location.protocol}//${window.location.hostname}:8787`
  : (typeof window !== 'undefined' && window.__API_BASE__ ? window.__API_BASE__ : '');

let _lastBootstrapEtag = null;

export function invalidateBootstrapEtag() {
  _lastBootstrapEtag = null;
}

export async function api(path, options = {}) {
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };

  // ETag conditional request for bootstrap caching
  if (path === '/api/bootstrap' && !options.method && _lastBootstrapEtag) {
    headers['If-None-Match'] = _lastBootstrapEtag;
  }

  options.credentials = 'include';
  const response = await fetch(API_BASE + path, { ...options, headers });
  
  if (response.status === 304) {
    return null; // HTTP 304 Not Modified: Data is identical, 0 bytes transferred
  }

  if (!response.ok) {
    const text = await response.text();
    if (response.status !== 401) {
      console.error(`API Failed [${path}]: ${response.status} - ${text}`);
    }
    let payload = {};
    try { payload = JSON.parse(text); } catch(e) {}
    
    if (response.status === 401) {
      if (path !== '/api/auth/login') {
        const { state } = await import('./state.js');
        if (state.data) state.data.user = null;
        if (typeof window !== 'undefined') {
          if (window.location.hash !== '#login') {
            window.location.hash = '#login';
          }
        }
      }
    }
    
    throw new Error(payload.error || `Failed to fetch ${path}`);
  }

  const etag = response.headers.get('ETag');
  if (etag && path === '/api/bootstrap') {
    _lastBootstrapEtag = etag;
  }
  
  const result = await response.json();

  // On successful mutations, broadcast to other open tabs to trigger immediate sync
  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(options.method)) {
    if (path !== '/api/auth/login' && path !== '/api/auth/logout') {
      import('./realtime.js').then(m => m.notifyStateMutation()).catch(() => {});
    }
  }

  return result;
}
