import { memo } from 'react';
import { solutions } from '../../constants/productEngineering';
import { SectionHeading, SectionShell } from './ui';
import SolutionCard from './SolutionCard';

const SolutionsGrid = ({ headingAs = 'h2' }) => {
  return (
    <SectionShell id="solutions" labelledBy="solutions-heading">
      <SectionHeading
        as={headingAs}
        titleId="solutions-heading"
        eyebrow="Solutions"
        title="Engineering for the job you actually have"
      >
        Six practices. One studio. Each card is a real delivery lane we already sell — not a
        renamed agency menu.
      </SectionHeading>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px bg-line border border-line">
        {solutions.map((solution) => (
          <SolutionCard key={solution.slug} solution={solution} />
        ))}
      </div>
    </SectionShell>
  );
};

export default memo(SolutionsGrid);
