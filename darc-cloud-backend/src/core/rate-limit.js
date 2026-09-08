// Smart In-Memory Rate Limiter for Cloudflare Workers & Edge isolates
// Zero external dependencies, sub-millisecond execution, automatic memory cleanup.

const AUTH_MAX_ATTEMPTS = 5;
const AUTH_WINDOW_MS = 60 * 1000; // 1 minute

const MUTATION_MAX_REQUESTS = 120;
const MUTATION_WINDOW_MS = 60 * 1000; // 1 minute

// ip -> { count: number, resetAt: number }
const _authFailures = new Map();

// key -> { count: number, resetAt: number }
const _mutationTracker = new Map();

// Periodic cleanup to avoid memory leaks in long-lived isolates
let _lastCleanup = Date.now();
function maybeCleanup() {
  const now = Date.now();
  if (now - _lastCleanup < 60000) return;
  _lastCleanup = now;

  for (const [ip, item] of _authFailures.entries()) {
    if (now > item.resetAt) _authFailures.delete(ip);
  }
  for (const [key, item] of _mutationTracker.entries()) {
    if (now > item.resetAt) _mutationTracker.delete(key);
  }
}

export function getClientIp(c) {
  const cfIp = c.req.header('cf-connecting-ip');
  if (cfIp && cfIp !== '127.0.0.1' && cfIp !== '::1') {
    return cfIp;
  }
  return (
    c.req.header('x-forwarded-for')?.split(',')[0].trim() ||
    cfIp ||
    c.req.header('x-real-ip') ||
    '127.0.0.1'
  );
}

/**
 * Checks if the IP has exceeded allowed failed login attempts.
 */
export function authRateLimiter() {
  return async (c, next) => {
    if (c.req.method === 'OPTIONS') return next();
    maybeCleanup();

    const ip = getClientIp(c);
    const now = Date.now();
    const entry = _authFailures.get(ip);

    if (entry && now < entry.resetAt) {
      if (entry.count >= AUTH_MAX_ATTEMPTS) {
        const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
        return c.json(
          {
            error: 'تم تجاوز الحد المسموح من المحاولات الخاطئة. يرجى الانتظار دقيقة قبل المحاولة مجدداً.',
            retryAfter: retryAfterSeconds
          },
          429,
          {
            'Retry-After': String(retryAfterSeconds),
            'X-RateLimit-Limit': String(AUTH_MAX_ATTEMPTS),
            'X-RateLimit-Remaining': '0'
          }
        );
      }
    }

    await next();
  };
}

/**
 * Record a failed authentication attempt for this IP.
 */
export function recordAuthFailure(ip) {
  const now = Date.now();
  const entry = _authFailures.get(ip);

  if (!entry || now > entry.resetAt) {
    _authFailures.set(ip, { count: 1, resetAt: now + AUTH_WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

/**
 * Clear failure counter upon successful login.
 */
export function clearAuthFailure(ip) {
  _authFailures.delete(ip);
}

/**
 * Rate limiter for mutations (POST, PATCH, PUT, DELETE) to protect against DoS/spam.
 */
export function mutationRateLimiter() {
  return async (c, next) => {
    if (c.req.method === 'OPTIONS' || c.req.method === 'GET' || c.req.method === 'HEAD') {
      return next();
    }

    maybeCleanup();

    const userId = c.get('userId');
    const ip = getClientIp(c);
    const key = userId ? `u:${userId}` : `ip:${ip}`;
    const now = Date.now();

    let entry = _mutationTracker.get(key);
    if (!entry || now > entry.resetAt) {
      entry = { count: 1, resetAt: now + MUTATION_WINDOW_MS };
      _mutationTracker.set(key, entry);
    } else {
      entry.count += 1;
    }

    if (entry.count > MUTATION_MAX_REQUESTS) {
      const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
      return c.json(
        { error: 'تم إرسال عدد كبير من الطلبات في وقت قصير. يرجى الانتظار بضع ثوانٍ.', retryAfter: retryAfterSeconds },
        429,
        {
          'Retry-After': String(retryAfterSeconds),
          'X-RateLimit-Limit': String(MUTATION_MAX_REQUESTS),
          'X-RateLimit-Remaining': '0'
        }
      );
    }

    await next();
  };
}
