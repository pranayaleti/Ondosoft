import { useEffect } from 'react';

export function isAbortError(error) {
  return error?.name === 'AbortError' || error?.code === 20;
}

/**
 * Run an effect with an AbortController. The signal is aborted on unmount
 * (and before the effect re-runs), so in-flight fetches can be cancelled.
 *
 * Usage:
 *   useAbortableEffect((signal) => {
 *     loadData({ signal }).catch((err) => {
 *       if (!isAbortError(err)) setError(err.message);
 *     });
 *   }, [deps]);
 */
export function useAbortableEffect(effect, deps) {
  useEffect(() => {
    const controller = new AbortController();
    const cleanup = effect(controller.signal);
    return () => {
      controller.abort();
      if (typeof cleanup === 'function') cleanup();
    };
    // Caller is responsible for a stable dependency list, same as useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
