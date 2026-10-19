import { verify } from 'hono/jwt';
import { getCookie } from 'hono/cookie';

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

    const token = getCookie(c, 'darc_session');
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
