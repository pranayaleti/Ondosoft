import { memo } from "react";
import { Star } from "lucide-react";

const badges = [
  {
    platform: "Clutch",
    rating: "4.9",
    reviews: "28 Reviews",
    url: "https://clutch.co",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
  },
  {
    platform: "Google",
    rating: "4.9",
    reviews: "47 Reviews",
    url: "https://google.com",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    platform: "Trustpilot",
    rating: "4.8",
    reviews: "32 Reviews",
    url: "https://trustpilot.com",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    platform: "GoodFirms",
    rating: "5.0",
    reviews: "19 Reviews",
    url: "https://goodfirms.co",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
];

const SocialProofBadges = () => {
  return (
    <section data-testid="social-proof-section" className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-center text-sm font-medium tracking-widest text-gray-500 uppercase mb-10">
          Rated excellent across leading platforms
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.platform}
              data-testid={`social-proof-${badge.platform.toLowerCase()}`}
              className={`${badge.bgColor} border ${badge.borderColor} rounded-xl p-5 text-center hover:scale-105 transition-transform duration-300`}
            >
              <p className={`text-xs font-semibold tracking-wider uppercase ${badge.color} mb-2`}>
                {badge.platform}
              </p>
              <div className="flex items-center justify-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 fill-current ${badge.color}`}
                  />
                ))}
              </div>
              <p className="text-2xl font-bold text-white">{badge.rating}</p>
              <p className="text-xs text-gray-500 mt-1">{badge.reviews}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(SocialProofBadges);
