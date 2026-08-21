import { useEffect } from 'react';

const FOCUSABLE = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

/**
 * Wire dialog / drawer accessibility for a container ref:
 * - traps Tab within the container
 * - closes on Escape
 * - locks body scroll while open
 * - restores focus to the previously-focused element on close
 */
export function useModalA11y({ isOpen, containerRef, onClose, initialFocusRef }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;

    const container = containerRef.current;
    const target =
      (initialFocusRef && initialFocusRef.current) ||
      container?.querySelector(FOCUSABLE) ||
      container;
    if (target && typeof target.focus === 'function') {
      // Defer to next frame so focus lands after the modal mounts.
      requestAnimationFrame(() => target.focus());
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose?.();
        return;
      }
      if (event.key !== 'Tab' || !container) return;

      const focusables = Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
      );
      if (focusables.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        // Delay restore to avoid fighting the closing animation focus.
        requestAnimationFrame(() => previouslyFocused.focus());
      }
    };
  }, [isOpen, containerRef, onClose, initialFocusRef]);
}
