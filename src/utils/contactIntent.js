export const ASSESSMENT_STORAGE_KEY = 'ondo-engineering-assessment';

export function buildContactHref({ intent = 'build-team', source, extra } = {}) {
  const params = new URLSearchParams();
  if (intent) params.set('intent', intent);
  if (source) params.set('source', source);
  if (extra) {
    Object.entries(extra).forEach(([key, value]) => {
      if (value != null && value !== '') params.set(key, String(value));
    });
  }
  const query = params.toString();
  return query ? `/contact?${query}` : '/contact';
}

export function persistAssessment(result) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(result));
  } catch {
    // Storage can be blocked; the contact form still works without it.
  }
}

export function readAssessment() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(ASSESSMENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
