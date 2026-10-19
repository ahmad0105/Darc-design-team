export function createErrorHandler() {
  return (err, c) => {
    console.error('[DARC Error]', err.message);
    const status = err.status || 500;
    const message = status === 500 ? 'حدث خطأ داخلي في الخادم.' : (err.message || 'حدث خطأ.');
    return c.json({ error: message }, status);
  };
}
