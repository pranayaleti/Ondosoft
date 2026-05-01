import { memo, useState } from "react";
import { Send, AlertCircle, CheckCircle2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | already | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        if (data.status === "already_subscribed") {
          setStatus("already");
          setMessage(data.message || "You're already subscribed!");
        } else {
          setStatus("success");
          setMessage(data.message || "You're in! Check your inbox.");
        }
        setEmail("");
      } else {
        throw new Error(data.detail || "Something went wrong");
      }
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Failed to subscribe. Please try again.");
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

          {status === "success" ? (
            <div
              data-testid="newsletter-success"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-medium animate-scale-in"
            >
              <CheckCircle2 className="w-5 h-5" />
              {message}
            </div>
          ) : status === "already" ? (
            <div
              data-testid="newsletter-already"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 font-medium animate-scale-in"
            >
              <CheckCircle2 className="w-5 h-5" />
              {message}
            </div>
          ) : (
            <>
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
                  disabled={status === "loading"}
                  className="flex-1 w-full px-5 py-3.5 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
                />
                <button
                  data-testid="newsletter-submit-btn"
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
              {status === "error" && (
                <div
                  data-testid="newsletter-error"
                  className="mt-4 inline-flex items-center gap-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  {message}
                </div>
              )}
            </>
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
