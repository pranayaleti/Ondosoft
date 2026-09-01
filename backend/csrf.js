import crypto from 'crypto';

const TTL_MS = 2 * 60 * 60 * 1000;
const COOKIE_NAME = 'csrf_token';

function signingSecret() {
  return process.env.JWT_SECRET || 'your-secret-key-change-in-production';
}

function sign(payload) {
  return crypto.createHmac('sha256', signingSecret()).update(payload).digest('base64url');
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export function issueCsrfToken() {
  const nonce = crypto.randomBytes(16).toString('hex');
  const exp = Date.now() + TTL_MS;
  const payload = Buffer.from(JSON.stringify({ n: nonce, e: exp })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyCsrfToken(token) {
  if (!token || typeof token !== 'string') return false;
  const dot = token.lastIndexOf('.');
  if (dot < 1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!safeEqual(sign(payload), sig)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof data.e === 'number' && data.e > Date.now();
  } catch {
    return false;
  }
}

export function setCsrfCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.CSRF_SAMESITE || 'lax',
    path: '/',
    maxAge: TTL_MS,
  });
}

export function requireCsrf(req, res, next) {
  const header = req.get('x-csrf-token') || req.body?.csrfToken;
  if (!verifyCsrfToken(header)) {
    return res.status(403).json({ error: 'Invalid or missing CSRF token.' });
  }
  const cookieToken = req.cookies?.[COOKIE_NAME];
  if (cookieToken && !safeEqual(cookieToken, header)) {
    return res.status(403).json({ error: 'CSRF token mismatch.' });
  }
  return next();
}

export function captchaConfigured() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY || process.env.RECAPTCHA_SECRET_KEY);
}

export async function verifyCaptchaToken(token, ip) {
  const turnstile = process.env.TURNSTILE_SECRET_KEY;
  const recaptcha = process.env.RECAPTCHA_SECRET_KEY;
  if (!turnstile && !recaptcha) return { ok: true, skipped: true };
  if (!token || typeof token !== 'string') return { ok: false };

  try {
    if (turnstile) {
      const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: turnstile,
          response: token,
          remoteip: ip || '',
        }),
      });
      const data = await response.json();
      return { ok: Boolean(data.success) };
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: recaptcha,
        response: token,
        remoteip: ip || '',
      }),
    });
    const data = await response.json();
    return { ok: Boolean(data.success) };
  } catch {
    return { ok: false };
  }
}

export async function requireCaptchaIfConfigured(req, res, next) {
  if (!captchaConfigured()) return next();
  const token = req.body?.captchaToken || req.get('x-captcha-token');
  const ip = req.ip || req.headers['x-forwarded-for']?.toString().split(',')[0] || '';
  const result = await verifyCaptchaToken(token, ip);
  if (!result.ok) {
    return res.status(403).json({ error: 'Captcha verification failed.' });
  }
  return next();
}
