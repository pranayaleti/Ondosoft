import { API_URL } from './apiConfig';

let cachedToken = null;
let inflight = null;
let serverCaptchaRequired = false;

export function isServerCaptchaRequired() {
  return serverCaptchaRequired;
}

export async function getCsrfToken({ refresh = false } = {}) {
  if (refresh) {
    cachedToken = null;
    if (inflight) {
      await inflight.catch(() => {});
      cachedToken = null;
    }
  }
  if (cachedToken) return cachedToken;
  if (inflight) return inflight;

  inflight = fetch(`${API_URL}/csrf-token`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.csrfToken) {
        throw new Error(data.error || 'Could not issue a CSRF token.');
      }
      cachedToken = data.csrfToken;
      serverCaptchaRequired = Boolean(data.captchaRequired);
      return cachedToken;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function clearCsrfToken() {
  cachedToken = null;
}

export async function csrfHeaders(extra = {}, { refresh = false } = {}) {
  const token = await getCsrfToken({ refresh });
  return {
    'Content-Type': 'application/json',
    'X-CSRF-Token': token,
    ...extra,
  };
}

async function sendPublicForm(url, body, { signal, captchaToken, refresh } = {}) {
  const headers = await csrfHeaders({}, { refresh });
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers,
    signal,
    body: JSON.stringify({
      ...body,
      csrfToken: headers['X-CSRF-Token'],
      ...(captchaToken ? { captchaToken } : {}),
    }),
  });
}

export async function postPublicForm(url, body, { signal, captchaToken } = {}) {
  let res = await sendPublicForm(url, body, { signal, captchaToken, refresh: false });

  if (res.status === 403) {
    const data = await res.clone().json().catch(() => ({}));
    const message = String(data.error || '');
    if (/csrf/i.test(message)) {
      clearCsrfToken();
      res = await sendPublicForm(url, body, { signal, captchaToken, refresh: true });
    }
  }

  return res;
}
