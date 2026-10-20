// Dynamically match current hostname/port or use proxy
export const API_BASE = (typeof window !== 'undefined' && (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'))
  ? (window.location.port === '8787' ? `${window.location.protocol}//${window.location.hostname}:8787` : (window.__API_BASE__ !== undefined ? window.__API_BASE__ : ''))
  : (typeof window !== 'undefined' && window.__API_BASE__ ? window.__API_BASE__ : '');

let _lastBootstrapEtag = null;

export function invalidateBootstrapEtag() {
  _lastBootstrapEtag = null;
}

export async function api(path, options = {}) {
  const isMutation = ['POST', 'PATCH', 'PUT', 'DELETE'].includes(options.method);
  const isAuth = path.startsWith('/api/auth');

  let parsedBody = null;
  if (isMutation && options.body) {
    try {
      parsedBody = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
    } catch {}
  }

  // Pre-assign deterministic prefixed ID if creating task, project, or comment
  if (options.method === 'POST' && parsedBody && typeof parsedBody === 'object') {
    const { generatePrefixedId } = await import('./offline.js');
    if (path === '/api/tasks' && !parsedBody.id) {
      parsedBody.id = generatePrefixedId('tsk');
      options.body = JSON.stringify(parsedBody);
    } else if (path === '/api/projects' && !parsedBody.id) {
      parsedBody.id = generatePrefixedId('prj');
      options.body = JSON.stringify(parsedBody);
    } else if (path.includes('/comments') && !parsedBody.id) {
      parsedBody.id = generatePrefixedId('cmt');
      options.body = JSON.stringify(parsedBody);
    }
  }

  // Check if browser is actively offline before hitting network for mutations
  if (typeof navigator !== 'undefined' && !navigator.onLine && isMutation && !isAuth) {
    const { enqueueOfflineMutation, simulateOfflineMutation } = await import('./offline.js');
    const { state } = await import('./state.js');
    const { showToast, choose } = await import('./utils.js');
    const item = enqueueOfflineMutation({
      path,
      method: options.method,
      body: parsedBody
    });
    const simResult = simulateOfflineMutation(path, options.method, parsedBody, state);
    showToast(choose('أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة النت 📡', 'Offline mode: action saved locally and will auto-sync on reconnect 📡'), false);
    return { ok: true, queued: true, offline: true, id: item?.id, ...simResult };
  }

  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };

  // ETag conditional request for bootstrap caching
  if (path === '/api/bootstrap' && !options.method && _lastBootstrapEtag) {
    headers['If-None-Match'] = _lastBootstrapEtag;
  }

  options.credentials = 'include';
  let response;
  try {
    response = await fetch(API_BASE + path, { ...options, headers });
  } catch (networkError) {
    if (isMutation && !isAuth) {
      const { enqueueOfflineMutation, simulateOfflineMutation } = await import('./offline.js');
      const { state } = await import('./state.js');
      const { showToast, choose } = await import('./utils.js');
      const item = enqueueOfflineMutation({
        path,
        method: options.method,
        body: parsedBody
      });
      const simResult = simulateOfflineMutation(path, options.method, parsedBody, state);
      showToast(choose('تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية 📡', 'Connection lost: action saved locally for auto-sync 📡'), false);
      return { ok: true, queued: true, offline: true, id: item?.id, ...simResult };
    }
    throw new Error('تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.');
  }
  
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
      _lastBootstrapEtag = null;
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
    
    const err = new Error(payload.error || `Failed to fetch ${path}`);
    err.status = response.status;
    throw err;
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
