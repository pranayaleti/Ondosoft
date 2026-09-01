import { useEffect, useRef } from 'react';
import {
  captchaEnabled,
  ensureCaptchaScript,
  getCaptchaProvider,
  getCaptchaSiteKey,
  setTurnstileToken,
} from '../utils/captchaClient';

const CaptchaField = () => {
  const hostRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (!captchaEnabled()) return undefined;
    const provider = getCaptchaProvider();
    const siteKey = getCaptchaSiteKey();
    let cancelled = false;

    const mount = async () => {
      await ensureCaptchaScript();
      if (cancelled || provider !== 'turnstile' || !hostRef.current || !window.turnstile) return;
      if (widgetIdRef.current !== null) return;
      widgetIdRef.current = window.turnstile.render(hostRef.current, {
        sitekey: siteKey,
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
    };

    mount();

    return () => {
      cancelled = true;
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      setTurnstileToken('');
    };
  }, []);

  if (!captchaEnabled()) return null;

  if (getCaptchaProvider() === 'recaptcha') {
    return (
      <p className="text-xs text-neutral-500">
        This form is protected by reCAPTCHA. Submitting sends a verification token to our server.
      </p>
    );
  }

  return <div ref={hostRef} className="cf-turnstile" />;
};

export default CaptchaField;
