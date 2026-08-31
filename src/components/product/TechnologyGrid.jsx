import { memo } from 'react';
import { technologyGroups } from '../../constants/productEngineering';
import { SectionHeading, SectionShell } from './ui';

const TechnologyGrid = () => {
  return (
    <SectionShell id="technology" labelledBy="tech-heading" className="bg-ink">
      <SectionHeading
        titleId="tech-heading"
        eyebrow="Stack"
        title="Outcome first. Technology second."
      >
        Tools we already list in our working stack — grouped by the job they do.
      </SectionHeading>
      <div className="grid md:grid-cols-2 gap-6">
        {technologyGroups.map((group) => (
          <article key={group.id} className="border-l-2 border-signal pl-5 py-1">
            <h3 className="font-display text-xl text-bone">{group.name}</h3>
            <p className="mt-2 text-neutral-400">{group.outcome}</p>
            <p className="mt-3 font-mono text-xs text-neutral-500 tracking-wide">
              {group.techs.join(' · ')}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
};

export default memo(TechnologyGrid);
