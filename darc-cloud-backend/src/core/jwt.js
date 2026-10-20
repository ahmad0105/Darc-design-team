import { verify } from 'hono/jwt';
import { getSessionToken } from './cookie.js';

export function createJwtMiddleware() {
  return async (c, next) => {
    const path = new URL(c.req.url).pathname;
    if (
      path === '/' ||
      path === '/api/health' ||
      path.startsWith('/api/auth/login') ||
      path.startsWith('/api/auth/forgot-password') ||
      path.startsWith('/api/auth/reset-password') ||
      path.startsWith('/api/auth/activate')
    ) {
      return next();
    }

    const token = getSessionToken(c);
    if (!token) return c.json({ error: 'لم يتم تقديم رمز المصادقة.' }, 401);

    let payload;
    try {
      payload = await verify(token, c.env.JWT_SECRET);
    } catch (e) {
      return c.json({ error: 'الجلسة منتهية أو غير صالحة.' }, 401);
    }

    c.set('userId', payload.userId);
    c.set('roleId', payload.roleId);
    await next();
  };
}
