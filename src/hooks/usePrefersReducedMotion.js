import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener?.('change', onChange);
    return () => mediaQuery.removeEventListener?.('change', onChange);
  }, []);

  return prefersReducedMotion;
}
