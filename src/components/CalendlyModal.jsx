import { useRef } from "react";
import { X } from "lucide-react";
import CalendlyEmbed from "./CalendlyEmbed";
import { useModalA11y } from "../hooks/useModalA11y";

/**
 * Modal that shows the Calendly scheduler.
 * Traps focus, closes on Escape, and locks body scroll while open.
 */
const CalendlyModal = ({ isOpen, onClose, utmMedium = "website" }) => {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  useModalA11y({ isOpen, containerRef: dialogRef, onClose, initialFocusRef: closeBtnRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendly-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="bg-gradient-to-b from-black to-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] sm:max-h-[95vh] overflow-y-auto border border-neutral-700 shadow-2xl relative mx-auto outline-none"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-4 sm:p-6 pb-4 bg-gradient-to-b from-black to-gray-900 border-b border-neutral-700">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-400 mb-1">
              Book instantly
            </p>
            <h2 id="calendly-modal-title" className="text-xl sm:text-2xl font-bold text-white">
              See live availability and lock a time without leaving this page.
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              We&rsquo;ll meet for 30 minutes to map your goals, timeline, and budget. Your timezone is auto-detected.
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-full text-gray-400 hover:text-white hover:bg-neutral-700 transition-colors flex items-center justify-center"
            aria-label="Close schedule meeting"
          >
            <X className="h-6 w-6 shrink-0" />
          </button>
        </div>

        <div className="p-4 sm:p-6 pt-4">
          <CalendlyEmbed
            utmParams={{
              utm_source: "website",
              utm_medium: utmMedium,
              utm_campaign: "schedule_modal",
            }}
            height={630}
            title="Schedule with Ondosoft"
            description="Pick a time that works for you—no redirects."
          />
        </div>
      </div>
    </div>
  );
};

export default CalendlyModal;
