export function getCaptchaProvider() {
  if (import.meta.env.VITE_TURNSTILE_SITE_KEY) return 'turnstile';
  if (import.meta.env.VITE_RECAPTCHA_SITE_KEY) return 'recaptcha';
  return null;
}

export function getCaptchaSiteKey() {
  return (
    import.meta.env.VITE_TURNSTILE_SITE_KEY ||
    import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
    ''
  );
}

export function captchaEnabled() {
  return Boolean(getCaptchaProvider() && getCaptchaSiteKey());
}

function loadScript(src, id) {
  if (document.getElementById(id)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Captcha script failed to load'));
    document.head.appendChild(script);
  });
}

export async function ensureCaptchaScript() {
  const provider = getCaptchaProvider();
  const siteKey = getCaptchaSiteKey();
  if (!provider || !siteKey) return;

  if (provider === 'turnstile') {
    await loadScript('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit', 'ondo-turnstile');
    return;
  }

  await loadScript(`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`, 'ondo-recaptcha');
}

export async function executeCaptcha(action = 'submit') {
  const provider = getCaptchaProvider();
  const siteKey = getCaptchaSiteKey();
  if (!provider || !siteKey) return null;

  await ensureCaptchaScript();

  if (provider === 'recaptcha') {
    await new Promise((resolve) => {
      const started = Date.now();
      const wait = () => {
        if (window.grecaptcha?.execute) return resolve();
        if (Date.now() - started > 8000) return resolve();
        setTimeout(wait, 50);
      };
      wait();
    });
    if (!window.grecaptcha?.execute) return null;
    await new Promise((resolve) => window.grecaptcha.ready(resolve));
    return window.grecaptcha.execute(siteKey, { action });
  }

  return new Promise((resolve) => {
    const started = Date.now();
    const wait = () => {
      if (window.turnstileWidgetToken) return resolve(window.turnstileWidgetToken);
      if (Date.now() - started > 400) return resolve(window.turnstileWidgetToken || null);
      setTimeout(wait, 40);
    };
    wait();
  });
}

export async function requireCaptchaToken(action = 'submit') {
  if (!captchaEnabled()) return null;
  const token = await executeCaptcha(action);
  if (!token) {
    throw new Error('Please complete the captcha and try again.');
  }
  return token;
}

export function setTurnstileToken(token) {
  window.turnstileWidgetToken = token || '';
}
