const rateLimit = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const DEFAULT_FORMSPREE_FORM_ID = 'xnpdwzwd';

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Method not allowed.' });
  }

  const body = typeof request.body === 'string' ? safeJsonParse(request.body) : request.body;
  const name = clean(body?.name, 100);
  const email = clean(body?.email, 254);
  const subject = clean(body?.subject, 140) || 'Portfolio contact';
  const message = clean(body?.message, 4000);

  if (clean(body?.website, 200)) {
    return response.status(400).json({ message: 'The form could not accept your message.' });
  }
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return response.status(400).json({
      message: 'Enter a valid name and email, plus a message of at least 10 characters.',
    });
  }

  const formId = process.env.FORMSPREE_FORM_ID?.trim() || DEFAULT_FORMSPREE_FORM_ID;
  if (!/^[a-z0-9]{6,32}$/i.test(formId)) {
    console.error('Portfolio contact: invalid Formspree form ID.');
    return response.status(503).json({ message: 'The contact service is temporarily unavailable.' });
  }

  const ip = String(request.headers['x-forwarded-for'] || request.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();
  if (isRateLimited(ip)) {
    return response.status(429).json({ message: 'Too many messages. Please wait a few minutes and try again.' });
  }

  try {
    const upstream = await fetch('https://formspree.io/f/' + formId, {
      method: 'POST',
      redirect: 'error',
      signal: AbortSignal.timeout(9000),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });
    const result = await upstream.json().catch(() => null);
    if (upstream.ok && result?.ok === true) {
      return response.status(200).json({ accepted: true, message: 'Thanks, your message was sent.' });
    }
    console.error('Portfolio contact: Formspree did not accept the message.', { status: upstream.status });
  } catch (error) {
    console.error('Portfolio contact: Formspree connection failed.', { type: error.name });
  }
  return response.status(502).json({ message: 'The contact service could not confirm your message.' });
};

function isRateLimited(ip) {
  const now = Date.now();
  if (rateLimit.size >= 2048) {
    for (const [key, entry] of rateLimit) {
      if (now - entry.startedAt >= WINDOW_MS) rateLimit.delete(key);
    }
    if (rateLimit.size >= 2048 && !rateLimit.has(ip)) return true;
  }
  const current = rateLimit.get(ip);
  if (!current || now - current.startedAt >= WINDOW_MS) {
    rateLimit.set(ip, { count: 1, startedAt: now });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

function clean(value, maximumLength) {
  return typeof value === 'string' ? value.trim().slice(0, maximumLength) : '';
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}
