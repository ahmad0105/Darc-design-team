// Security & Hardening Middlewares for DARC Cloud Backend

const ALLOWED_ORIGINS = [
  'http://localhost:4318',
  'http://127.0.0.1:4318',
  'http://localhost:8787',
  'http://127.0.0.1:8787',
  'https://darc-design-team.netlify.app'
];

/**
 * Standard HTTP Security Headers to protect against MIME sniffing, clickjacking, etc.
 */
export function securityHeadersMiddleware() {
  return async (c, next) => {
    await next();

    c.res.headers.set('X-Content-Type-Options', 'nosniff');
    c.res.headers.set('X-Frame-Options', 'SAMEORIGIN');
    c.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    c.res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    // Enable HSTS for HTTPS connections
    if (c.req.url.startsWith('https://')) {
      c.res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
  };
}

/**
 * Correlation ID Middleware (Request Tracing)
 * Attaches unique X-Request-Id to request context and outgoing response headers.
 */
export function correlationIdMiddleware() {
  return async (c, next) => {
    let requestId = c.req.header('x-request-id');
    if (!requestId) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        requestId = 'req_' + crypto.randomUUID().replace(/-/g, '').slice(0, 16);
      } else {
        requestId = 'req_' + Math.random().toString(36).substr(2, 12);
      }
    }
    c.set('requestId', requestId);
    c.res.headers.set('X-Request-Id', requestId);
    await next();
    c.res.headers.set('X-Request-Id', requestId);
  };
}

/**
 * Payload Limit Middleware
 * Protects against memory exhaustion and oversized payloads (default 2.5MB).
 */
export function payloadLimitMiddleware(maxBytes = 2.5 * 1024 * 1024) {
  return async (c, next) => {
    const method = c.req.method;
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return next();
    }
    // Skip chunked file uploads that handle streaming
    const contentRange = c.req.header('content-range');
    if (contentRange || c.req.path.includes('/documents/upload')) {
      return next();
    }
    const len = c.req.header('content-length');
    if (len && parseInt(len, 10) > maxBytes) {
      return c.json({
        error: 'حجم البيانات المرسلة كبير جداً ويتجاوز الحد الأقصى المسموح به (2.5MB).',
        code: 'PAYLOAD_TOO_LARGE'
      }, 413);
    }
    await next();
  };
}

/**
 * Origin / CSRF Shield for state-changing requests (POST, PUT, PATCH, DELETE).
 * Ensures requests originate only from approved web domains.
 */
export function csrfGuardMiddleware() {
  return async (c, next) => {
    const method = c.req.method;

    // Safe read-only & preflight methods
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
      return next();
    }

    const origin = c.req.header('origin');

    if (origin) {
      const isAllowed =
        ALLOWED_ORIGINS.includes(origin) ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin === 'https://darc-design-team.netlify.app' ||
        origin.endsWith('.darc-design-team.netlify.app') ||
        origin.endsWith('.workers.dev') ||
        origin.endsWith('.pages.dev') ||
        origin.endsWith('.darc.local');

      if (!isAllowed) {
        return c.json(
          { error: 'طلب محجوب: مصدر غير مصرح به لمنع تزوير الطلبات (CSRF / Origin Rejected).' },
          403
        );
      }
    }

    await next();
  };
}

/**
 * Cryptographically secure identifier generator using Web Crypto API.
 * Works uniformly in Cloudflare Workers and Node.js.
 */
export function generateSecureId(prefix = 'id_') {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(6);
    crypto.getRandomValues(bytes);
    return prefix + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  }
  return prefix + Math.random().toString(36).substr(2, 9);
}
