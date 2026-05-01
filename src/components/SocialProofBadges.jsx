import { memo } from "react";
import { Star, ExternalLink } from "lucide-react";

const badges = [
  {
    platform: "Clutch",
    rating: "4.9",
    reviews: "28 Reviews",
    url: "#",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    hoverBorder: "hover:border-rose-500/40",
    starColor: "text-rose-400",
    tagline: "Top Software Developer",
  },
  {
    platform: "Google",
    rating: "4.9",
    reviews: "47 Reviews",
    url: "#",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/40",
    starColor: "text-amber-400",
    tagline: "Verified Business",
  },
  {
    platform: "Trustpilot",
    rating: "4.8",
    reviews: "32 Reviews",
    url: "#",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    hoverBorder: "hover:border-green-500/40",
    starColor: "text-green-400",
    tagline: "Excellent",
  },
  {
    platform: "GoodFirms",
    rating: "5.0",
    reviews: "19 Reviews",
    url: "#",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/40",
    starColor: "text-amber-400",
    tagline: "Top Rated",
  },
];

const SocialProofBadges = () => {
  return (
    <section data-testid="social-proof-section" className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-center text-sm font-medium tracking-widest text-gray-500 uppercase mb-10">
          Rated excellent across leading review platforms
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <a
              key={badge.platform}
              href={badge.url}
              data-testid={`social-proof-${badge.platform.toLowerCase()}`}
              className={`${badge.bgColor} border ${badge.borderColor} ${badge.hoverBorder} rounded-xl p-5 text-center hover:scale-[1.03] transition-all duration-300 block group`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className={`text-xs font-semibold tracking-wider uppercase ${badge.color} mb-1`}>
                {badge.platform}
              </p>
              <p className="text-[10px] text-gray-500 mb-2">{badge.tagline}</p>
              <div className="flex items-center justify-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 fill-current ${badge.starColor}`}
                  />
                ))}
              </div>
              <p className="text-2xl font-bold text-white">{badge.rating}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                {badge.reviews}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(SocialProofBadges);
