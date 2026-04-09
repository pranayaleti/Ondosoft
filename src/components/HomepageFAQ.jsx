import { memo, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most projects run 6-16 weeks depending on scope. We start with a 1-2 week discovery phase, then move into agile sprints with weekly deliverables. Smaller MVPs can ship in as few as 4 weeks.",
  },
  {
    q: "What does your pricing look like?",
    a: "We offer both fixed-price and time-and-materials options. Typical projects range from $15k-$150k depending on complexity. We always provide a detailed estimate after the free discovery call so there are no surprises.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "Both! About 60% of our clients are funded startups building their first product, and 40% are established businesses scaling existing platforms. We tailor our process to your stage and budget.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes a warranty period for bug fixes. Beyond that, most clients stay on a support retainer for ongoing maintenance, feature development, and scaling. We're a long-term partner, not a one-and-done vendor.",
  },
  {
    q: "Can I talk directly to the developers?",
    a: "Absolutely. Unlike big agencies where you're routed through account managers, at Ondosoft you have direct Slack/Teams access to your dev team. You'll join weekly sprint demos and can give real-time feedback.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "Our core stack is React/Next.js (frontend), Node.js/Python (backend), PostgreSQL/MongoDB (data), and AWS/GCP (cloud). We also build mobile apps with React Native and integrate AI/ML services.",
  },
];

const HomepageFAQ = () => {
  const [open, setOpen] = useState(null);

  const toggle = useCallback(
    (i) => setOpen((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <section data-testid="homepage-faq-section" className="py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Common <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-lg text-gray-400">
            Quick answers to the things we get asked most.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                data-testid={`faq-item-${i}`}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-orange-500/30 bg-orange-500/5"
                    : "border-gray-800 bg-gray-900/40 hover:border-gray-700"
                }`}
              >
                <button
                  data-testid={`faq-toggle-${i}`}
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-orange-400" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href="/faq"
            data-testid="faq-view-all-link"
            className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium transition-colors"
          >
            View all FAQs &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(HomepageFAQ);
