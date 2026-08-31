import { memo } from 'react';
import { processSteps } from '../../constants/productEngineering';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { SectionHeading, SectionShell } from './ui';

const EngineeringProcess = () => {
  const [ref, inView] = useInViewOnce();
  const reduced = usePrefersReducedMotion();
  const reveal = reduced || inView;

  return (
    <SectionShell id="how-it-works" labelledBy="process-heading">
      <SectionHeading
        titleId="process-heading"
        eyebrow="How it works"
        title="Five steps. No invented trial."
      >
        Mapped to the discovery → architecture → build → launch → support process already on this
        site. Step 03 is alignment, not a free trial — we do not advertise one.
      </SectionHeading>
      <ol ref={ref} className="relative border-l border-line ml-3 sm:ml-4 space-y-10">
        {processSteps.map((step, index) => (
          <li
            key={step.num}
            className={`pl-8 sm:pl-10 transition-all duration-700 ${
              reveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={reduced ? undefined : { transitionDelay: `${index * 90}ms` }}
          >
            <span
              className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full bg-ink border border-signal"
              aria-hidden="true"
            />
            <p className="font-mono text-xs text-signal">{step.num}</p>
            <h3 className="font-display text-2xl text-bone mt-1 tracking-tight">{step.title}</h3>
            <p className="mt-2 text-neutral-400 leading-relaxed max-w-2xl">{step.desc}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
};

export default memo(EngineeringProcess);
