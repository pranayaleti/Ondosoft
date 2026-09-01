import { AlertCircle, Loader, Inbox } from 'lucide-react';

export function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4" role="status" aria-live="polite">
      <Loader className="w-10 h-10 animate-spin text-orange-500 mb-3" aria-hidden="true" />
      <p className="text-gray-400">{label}</p>
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="max-w-xl mx-auto bg-red-500/10 border border-red-500/40 rounded-lg p-6 text-red-300" role="alert">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">{title}</h2>
          <p className="text-sm mb-4">{message || 'Please try again.'}</p>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="min-h-11 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ title, message, action }) {
  return (
    <div className="border border-dashed border-gray-700 rounded-xl p-8 text-center text-gray-400">
      <Inbox className="w-10 h-10 mx-auto mb-3 text-gray-500" aria-hidden="true" />
      <h2 className="text-lg font-semibold text-white mb-1">{title}</h2>
      {message ? <p className="text-sm max-w-md mx-auto mb-4">{message}</p> : null}
      {action || null}
    </div>
  );
}
