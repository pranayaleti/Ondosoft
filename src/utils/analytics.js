// Comprehensive Analytics Tracking Utility
// Tracks clicks, navigation, user interactions, and other relevant metrics

import { API_URL } from './apiConfig';

// Cap how many session-summary events we retain in memory. Actual events still
// stream to the server; this only bounds the in-memory summary arrays so a long
// SPA session cannot grow unbounded.
const MAX_SESSION_EVENTS = 200;

const pushCapped = (arr, item) => {
  arr.push(item);
  if (arr.length > MAX_SESSION_EVENTS) arr.shift();
};

class AnalyticsTracker {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.pageViews = [];
    this.clicks = [];
    this.navigationEvents = [];
    this.userInteractions = [];
    this.scrollEvents = [];
    this.formInteractions = [];
    this.initialized = false;
    this.currentPage = null;
    this.pageStartTime = null;
    this.lastActivityTime = Date.now();

    // Batch tracking to reduce API calls
    this.batchSize = 10;
    this.batchTimeout = 5000; // 5 seconds
    this.pendingEvents = [];
    this.batchTimer = null;

    // Named listener refs so cleanup() can actually remove them
    this.handlers = {};
    this.scrollTimeoutId = null;
    this.originalPushState = null;
    this.originalReplaceState = null;
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.setupClickTracking();
    this.setupNavigationTracking();
    this.setupScrollTracking();
    this.setupFormTracking();
    this.setupVisibilityTracking();
    this.setupErrorTracking();

    this.handlers.pageHide = () => {
      this.trackPageExit();
      this.flushBatch();
    };
    window.addEventListener('pagehide', this.handlers.pageHide);

    this.handlers.pageShow = (event) => {
      if (event.persisted) {
        this.trackPageView(window.location.pathname);
        this.trackUserInteraction('bfcache_restore', { pathname: window.location.pathname });
      }
    };
    window.addEventListener('pageshow', this.handlers.pageShow);

    const trackInitialPageView = () => {
      this.trackPageView(window.location.pathname);
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(trackInitialPageView, { timeout: 2000 });
    } else {
      setTimeout(trackInitialPageView, 100);
    }
  }

  // Remove every listener we own so the singleton can be safely torn down.
  cleanup() {
    if (!this.initialized) return;

    const { pageHide, pageShow, popstate, click, scroll, focus, blur, change, submit,
      visibility, error, rejection } = this.handlers;

    if (pageHide) window.removeEventListener('pagehide', pageHide);
    if (pageShow) window.removeEventListener('pageshow', pageShow);
    if (popstate) window.removeEventListener('popstate', popstate);
    if (click) document.removeEventListener('click', click, true);
    if (scroll) window.removeEventListener('scroll', scroll);
    if (focus) document.removeEventListener('focus', focus, true);
    if (blur) document.removeEventListener('blur', blur, true);
    if (change) document.removeEventListener('change', change, true);
    if (submit) document.removeEventListener('submit', submit, true);
    if (visibility) document.removeEventListener('visibilitychange', visibility);
    if (error) window.removeEventListener('error', error);
    if (rejection) window.removeEventListener('unhandledrejection', rejection);

    this.handlers = {};

    if (this.originalPushState) {
      history.pushState = this.originalPushState;
      this.originalPushState = null;
    }
    if (this.originalReplaceState) {
      history.replaceState = this.originalReplaceState;
      this.originalReplaceState = null;
    }

    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }
    if (this.scrollTimeoutId) {
      clearTimeout(this.scrollTimeoutId);
      this.scrollTimeoutId = null;
    }

    this.initialized = false;
  }

  trackPageView(pathname) {
    const pageView = {
      sessionId: this.sessionId,
      pathname: pathname || window.location.pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      pageLoadTime: performance.timing ? performance.timing.loadEventEnd - performance.timing.navigationStart : null,
      type: 'page_view',
    };

    pushCapped(this.pageViews, pageView);
    this.currentPage = pathname || window.location.pathname;
    this.pageStartTime = Date.now();

    this.sendEvent('page_view', pageView);
  }

  trackClick(element, event) {
    const clickData = {
      sessionId: this.sessionId,
      pathname: window.location.pathname,
      elementType: element.tagName.toLowerCase(),
      elementId: element.id || null,
      elementClass: element.className || null,
      elementText: element.textContent?.trim().substring(0, 100) || null,
      href: element.href || null,
      timestamp: new Date().toISOString(),
      x: event.clientX,
      y: event.clientY,
      button: event.button,
      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      metaKey: event.metaKey,
      type: 'click',
    };

    pushCapped(this.clicks, clickData);
    this.addToBatch('click', clickData);
  }

  trackNavigation(from, to, method = 'link') {
    const navigationData = {
      sessionId: this.sessionId,
      from,
      to,
      method,
      timestamp: new Date().toISOString(),
      timeOnPage: this.pageStartTime ? Date.now() - this.pageStartTime : null,
      type: 'navigation',
    };

    pushCapped(this.navigationEvents, navigationData);
    this.sendEvent('navigation', navigationData);
  }

  trackScroll(depth, timeOnPage) {
    const scrollData = {
      sessionId: this.sessionId,
      pathname: window.location.pathname,
      scrollDepth: depth,
      timeOnPage,
      timestamp: new Date().toISOString(),
      type: 'scroll',
    };

    pushCapped(this.scrollEvents, scrollData);
    this.addToBatch('scroll', scrollData);
  }

  trackFormInteraction(formId, action, fieldName = null) {
    const formData = {
      sessionId: this.sessionId,
      pathname: window.location.pathname,
      formId,
      action,
      fieldName,
      timestamp: new Date().toISOString(),
      type: 'form_interaction',
    };

    pushCapped(this.formInteractions, formData);
    this.addToBatch('form_interaction', formData);
  }

  trackUserInteraction(interactionType, details = {}) {
    const interactionData = {
      sessionId: this.sessionId,
      pathname: window.location.pathname,
      interactionType,
      details,
      timestamp: new Date().toISOString(),
      type: 'user_interaction',
    };

    pushCapped(this.userInteractions, interactionData);
    this.addToBatch('user_interaction', interactionData);
  }

  trackPageExit() {
    if (!this.currentPage || !this.pageStartTime) return;

    const exitData = {
      sessionId: this.sessionId,
      pathname: this.currentPage,
      timeOnPage: Date.now() - this.pageStartTime,
      timestamp: new Date().toISOString(),
      type: 'page_exit',
    };

    this.sendEvent('page_exit', exitData, true);
  }

  setupClickTracking() {
    this.handlers.click = (event) => {
      const element = event.target;

      this.trackClick(element, event);

      if (element.tagName === 'A' || element.closest('a')) {
        const link = element.tagName === 'A' ? element : element.closest('a');
        this.trackUserInteraction('link_click', {
          href: link.href,
          text: link.textContent?.trim().substring(0, 100),
        });
      } else if (element.tagName === 'BUTTON' || element.closest('button')) {
        const button = element.tagName === 'BUTTON' ? element : element.closest('button');
        this.trackUserInteraction('button_click', {
          buttonId: button.id,
          buttonText: button.textContent?.trim().substring(0, 100),
          buttonClass: button.className,
        });
      }
    };
    document.addEventListener('click', this.handlers.click, true);
  }

  setupNavigationTracking() {
    let lastPath = window.location.pathname;

    const trackPathChange = () => {
      const currentPath = window.location.pathname;
      if (currentPath !== lastPath) {
        this.trackNavigation(lastPath, currentPath, 'programmatic');
        this.trackPageView(currentPath);
        lastPath = currentPath;
      }
    };

    this.originalPushState = history.pushState;
    this.originalReplaceState = history.replaceState;

    const self = this;
    history.pushState = function pushStateOverride(...args) {
      self.originalPushState.apply(history, args);
      trackPathChange();
    };
    history.replaceState = function replaceStateOverride(...args) {
      self.originalReplaceState.apply(history, args);
      trackPathChange();
    };

    this.handlers.popstate = () => {
      trackPathChange();
      this.trackNavigation(lastPath, window.location.pathname, 'back');
    };
    window.addEventListener('popstate', this.handlers.popstate);
  }

  setupScrollTracking() {
    let maxScroll = 0;

    const trackScrollDepth = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollDepth = Math.round(((scrollTop + clientHeight) / scrollHeight) * 100);

      if (scrollDepth > maxScroll) {
        maxScroll = scrollDepth;
        const timeOnPage = this.pageStartTime ? Date.now() - this.pageStartTime : 0;

        if ([25, 50, 75, 100].includes(scrollDepth)) {
          this.trackScroll(scrollDepth, timeOnPage);
        }
      }
    };

    this.handlers.scroll = () => {
      if (!this.scrollTimeoutId) {
        this.scrollTimeoutId = setTimeout(() => {
          trackScrollDepth();
          this.scrollTimeoutId = null;
        }, 100);
      }
    };
    window.addEventListener('scroll', this.handlers.scroll, { passive: true });
  }

  setupFormTracking() {
    const isFormControl = (target) =>
      target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT');

    this.handlers.focus = (event) => {
      if (!isFormControl(event.target)) return;
      const form = event.target.closest('form');
      if (form) this.trackFormInteraction(form.id || 'unnamed', 'focus', event.target.name || event.target.id);
    };
    this.handlers.blur = (event) => {
      if (!isFormControl(event.target)) return;
      const form = event.target.closest('form');
      if (form) this.trackFormInteraction(form.id || 'unnamed', 'blur', event.target.name || event.target.id);
    };
    this.handlers.change = (event) => {
      if (!isFormControl(event.target)) return;
      const form = event.target.closest('form');
      if (form) this.trackFormInteraction(form.id || 'unnamed', 'change', event.target.name || event.target.id);
    };
    this.handlers.submit = (event) => {
      const form = event.target;
      if (form.tagName === 'FORM') {
        this.trackFormInteraction(form.id || 'unnamed', 'submit');
        this.trackUserInteraction('form_submit', {
          formId: form.id,
          formAction: form.action,
        });
      }
    };

    document.addEventListener('focus', this.handlers.focus, true);
    document.addEventListener('blur', this.handlers.blur, true);
    document.addEventListener('change', this.handlers.change, true);
    document.addEventListener('submit', this.handlers.submit, true);
  }

  setupVisibilityTracking() {
    this.handlers.visibility = () => {
      if (document.hidden) {
        this.lastActivityTime = Date.now();
      } else {
        const timeAway = Date.now() - this.lastActivityTime;
        if (timeAway > 30000) {
          this.trackUserInteraction('tab_return', { timeAway });
        }
      }
    };
    document.addEventListener('visibilitychange', this.handlers.visibility);
  }

  setupErrorTracking() {
    this.handlers.error = (event) => {
      this.trackUserInteraction('error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    };
    this.handlers.rejection = (event) => {
      this.trackUserInteraction('unhandled_promise_rejection', {
        reason: event.reason?.toString(),
      });
    };
    window.addEventListener('error', this.handlers.error);
    window.addEventListener('unhandledrejection', this.handlers.rejection);
  }

  addToBatch(eventType, eventData) {
    this.pendingEvents.push({ type: eventType, data: eventData });

    if (this.pendingEvents.length >= this.batchSize) {
      this.flushBatch();
    } else if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => {
        this.flushBatch();
      }, this.batchTimeout);
    }
  }

  flushBatch() {
    if (this.pendingEvents.length === 0) return;

    const events = [...this.pendingEvents];
    this.pendingEvents = [];

    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    this.sendBatch(events);
  }

  async sendEvent(eventType, eventData, immediate = false) {
    if (!immediate && eventType !== 'page_view' && eventType !== 'navigation' && eventType !== 'page_exit') {
      this.addToBatch(eventType, eventData);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${API_URL}/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        signal: controller.signal,
        body: JSON.stringify({ type: eventType, data: eventData }),
        keepalive: immediate,
      });

      clearTimeout(timeoutId);
      if (!response.ok) return;
    } catch {
      // Analytics failures never surface to users.
    }
  }

  async sendBatch(events) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${API_URL}/analytics/track-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        signal: controller.signal,
        body: JSON.stringify({ events }),
        keepalive: true,
      });

      clearTimeout(timeoutId);
      if (!response.ok) return;
    } catch {
      // Analytics failures never surface to users.
    }
  }

  getSessionSummary() {
    return {
      sessionId: this.sessionId,
      pageViews: this.pageViews.length,
      clicks: this.clicks.length,
      navigationEvents: this.navigationEvents.length,
      scrollEvents: this.scrollEvents.length,
      formInteractions: this.formInteractions.length,
      userInteractions: this.userInteractions.length,
      timeOnSite: this.pageStartTime ? Date.now() - this.pageStartTime : 0,
    };
  }
}

const analyticsTracker = new AnalyticsTracker();

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      analyticsTracker.init();
    });
  } else {
    analyticsTracker.init();
  }
}

export default analyticsTracker;
