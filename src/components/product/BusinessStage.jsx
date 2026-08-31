import { memo } from 'react';
import { businessStages } from '../../constants/productEngineering';
import { SectionHeading, SectionShell } from './ui';

const BusinessStage = () => {
  return (
    <SectionShell id="stages" labelledBy="stages-heading" className="bg-ink">
      <SectionHeading
        titleId="stages-heading"
        eyebrow="By stage"
        title="Engineering support for every stage of growth"
      >
        Same studio, different pressure. We only list capabilities Ondosoft already delivers.
      </SectionHeading>
      <div className="space-y-px bg-line border border-line">
        {businessStages.map((stage) => (
          <article
            key={stage.id}
            className="bg-panel p-6 sm:p-10 lg:grid lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                {stage.name}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl text-bone mt-3 tracking-tight">
                {stage.headline}
              </h3>
              <p className="mt-3 text-neutral-400 leading-relaxed">{stage.body}</p>
            </div>
            <ul className="mt-6 lg:mt-0 lg:col-span-8 grid sm:grid-cols-2 gap-3">
              {stage.capabilities.map((item) => (
                <li
                  key={item}
                  className="border border-line/80 px-4 py-3 text-neutral-200 text-sm leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
};

export default memo(BusinessStage);
