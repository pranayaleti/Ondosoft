import { useLayoutEffect } from 'react';
import { ensureGlobalJsonLd } from '../utils/staticJsonLd';

// Global Organization / WebSite / LocalBusiness / Service graph.
// Prerender writes the same graph on #ondo-ld-global. We never emit a
// <script> during render (React would put it in #root and duplicate it).
// After paint, ensureGlobalJsonLd keeps the head tag and strips body copies.
const SchemaMarkup = () => {
  useLayoutEffect(() => {
    ensureGlobalJsonLd();
  }, []);

  return null;
};

export default SchemaMarkup;
