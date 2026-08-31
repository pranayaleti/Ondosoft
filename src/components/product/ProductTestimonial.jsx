import { memo } from 'react';
import { testimonials } from '../../constants/data';
import { SectionHeading, SectionShell } from './ui';

const ProductTestimonial = () => {
  const featured = testimonials.slice(0, 3);

  return (
    <SectionShell id="social-proof" labelledBy="proof-heading">
      <SectionHeading
        titleId="proof-heading"
        eyebrow="From the existing record"
        title="Client · role · project · result"
      >
        Quotes already published on this site. We are not adding new names or numbers here.
      </SectionHeading>
      <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
        {featured.map((item) => (
          <figure key={item.user} className="bg-panel p-6 sm:p-7 flex flex-col">
            <blockquote className="text-neutral-200 leading-relaxed flex-1">“{item.text}”</blockquote>
            <figcaption className="mt-6 text-sm">
              <p className="text-bone font-semibold">{item.company}</p>
              <p className="text-neutral-500">
                {item.user} · {item.role}
              </p>
              {item.metric ? (
                <p className="mt-2 font-mono text-xs text-signal">
                  Result · {item.metric} {item.metricLabel}
                </p>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
};

export default memo(ProductTestimonial);
