import { memo } from 'react';
import { whyOndo } from '../../constants/productEngineering';
import { SectionHeading, SectionShell } from './ui';

const WhyOndo = () => {
  return (
    <SectionShell id="why-ondo" labelledBy="why-heading">
      <SectionHeading
        titleId="why-heading"
        eyebrow="Why Ondosoft"
        title="Concrete differences, not adjectives"
      >
        Only claims we already make on this site. No invented match times, turnover rates, or
        trial guarantees.
      </SectionHeading>
      <ol className="grid md:grid-cols-2 gap-px bg-line border border-line">
        {whyOndo.map((item, index) => (
          <li key={item.title} className="bg-panel p-6 sm:p-8">
            <p className="font-mono text-xs text-signal">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="font-display text-2xl text-bone mt-3 tracking-tight">{item.title}</h3>
            <p className="mt-3 text-neutral-400 leading-relaxed">{item.body}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
};

export default memo(WhyOndo);
