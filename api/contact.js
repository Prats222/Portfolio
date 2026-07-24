const rateLimit = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Method not allowed.' });
  }

  const ip = String(request.headers['x-forwarded-for'] || request.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();
  if (isRateLimited(ip)) {
    return response.status(429).json({ message: 'Too many messages. Please wait a few minutes and try again.' });
  }

  const body = typeof request.body === 'string' ? safeJsonParse(request.body) : request.body;
  const name = clean(body?.name, 100);
  const email = clean(body?.email, 254);
  const subject = clean(body?.subject, 140) || 'Portfolio contact';
  const message = clean(body?.message, 4000);
  const website = clean(body?.website, 200);

  if (website) {
    return response.status(200).json({ message: 'Message sent.' });
  }

  if (name.length < 2 || !isEmail(email) || message.length < 10) {
    return response.status(400).json({
      message: 'Enter a valid name and email, plus a message of at least 10 characters.',
    });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
  if (!apiKey || !senderEmail || !receiverEmail) {
    return response.status(503).json({ message: 'The contact service is temporarily unavailable.' });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  try {
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: process.env.BREVO_SENDER_NAME || 'Prateek Mishra Portfolio',
          email: senderEmail,
        },
        to: [{ email: receiverEmail, name: 'Prateek Mishra' }],
        replyTo: { email, name },
        subject: `[Portfolio] ${subject}`,
        htmlContent: `
          <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#182033">
            <h2 style="margin-bottom:20px">New portfolio message</h2>
            <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <div style="margin-top:20px;padding:18px;border:1px solid #d9dfeb;border-radius:8px;line-height:1.6">${safeMessage}</div>
          </div>`,
        textContent: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      }),
    });

    if (!brevoResponse.ok) {
      return response.status(502).json({ message: 'The email provider could not deliver your message.' });
    }

    return response.status(200).json({ message: 'Message sent. I will get back to you soon.' });
  } catch {
    return response.status(502).json({ message: 'The contact service could not send your message.' });
  }
};

function isRateLimited(ip) {
  const now = Date.now();
  const current = rateLimit.get(ip);
  if (!current || now - current.startedAt > WINDOW_MS) {
    rateLimit.set(ip, { count: 1, startedAt: now });
    return false;
  }

  current.count += 1;
  return current.count > MAX_REQUESTS;
}

function clean(value, maximumLength) {
  return typeof value === 'string' ? value.trim().slice(0, maximumLength) : '';
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
