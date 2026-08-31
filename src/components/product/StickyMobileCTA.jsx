import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BUILD_TEAM_PATH } from '../../constants/productEngineering';

const HIDDEN_PREFIXES = ['/auth', '/dashboard', '/admin', '/contact'];

const StickyMobileCTA = () => {
  const { pathname } = useLocation();
  const hidden = HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (hidden) return null;

  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <p className="text-sm text-neutral-400">Ready to staff the work?</p>
        <Link
          to={BUILD_TEAM_PATH}
          className="inline-flex items-center justify-center min-h-11 px-4 bg-ember text-white font-semibold rounded-sm"
        >
          Build My Team
        </Link>
      </div>
    </div>
  );
};

export default memo(StickyMobileCTA);
