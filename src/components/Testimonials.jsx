import { memo } from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../constants/data";

const Testimonials = () => {
  return (
    <section className="mt-20 tracking-wide" aria-labelledby="testimonials-heading" data-testid="testimonials-section">
      <h2 id="testimonials-heading" className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20 text-white font-bold">
        What Our <span className="text-orange-500">Clients</span> Say
      </h2>
      <div className="flex flex-wrap justify-center" role="list" aria-label="Customer testimonials">
        {testimonials.map((testimonial, index) => (
          <article
            key={index}
            data-testid={`testimonial-card-${index}`}
            className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2"
            role="listitem"
          >
            <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-6 border border-gray-800 hover:border-orange-500/20 transition-all duration-300 h-full flex flex-col group">
              {/* Rating stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-grow relative">
                <Quote className="w-8 h-8 text-orange-500/10 absolute -top-1 -left-1" />
                <p className="text-gray-300 leading-relaxed text-sm pl-4">
                  "{testimonial.text}"
                </p>
              </blockquote>

              {/* Metric badge */}
              {testimonial.metric && (
                <div className="mt-4 inline-flex items-center gap-2 self-start">
                  <span className="px-3 py-1 text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full">
                    {testimonial.metric}
                  </span>
                  <span className="text-xs text-gray-500">{testimonial.metricLabel}</span>
                </div>
              )}

              {/* Author */}
              <div className="flex mt-5 pt-5 border-t border-gray-800/60 items-center">
                <img
                  className="w-11 h-11 mr-4 rounded-full border-2 border-orange-500/30 flex-shrink-0 group-hover:border-orange-500/60 transition-colors"
                  src={testimonial.image}
                  alt={`${testimonial.user}`}
                  loading="lazy"
                  width="44"
                  height="44"
                />
                <div>
                  <h3 className="text-white font-semibold text-sm">{testimonial.user}</h3>
                  <span className="text-xs text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default memo(Testimonials);
