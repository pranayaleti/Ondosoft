import { memo, useState } from "react";
import { Send } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section data-testid="newsletter-section" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent border border-orange-500/20 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
            Get Engineering Insights
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8 relative z-10">
            Join 2,000+ founders and CTOs who receive our bi-weekly digest on product engineering, scaling, and AI integration.
          </p>

          {submitted ? (
            <div
              data-testid="newsletter-success"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-medium"
            >
              <Send className="w-4 h-4" />
              You're in! Check your inbox.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              data-testid="newsletter-form"
              className="relative z-10 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                data-testid="newsletter-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="flex-1 w-full px-5 py-3.5 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                data-testid="newsletter-submit-btn"
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Subscribe <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-xs text-gray-600 mt-4 relative z-10">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(NewsletterSignup);
