import { memo } from 'react';
import { BUILD_TEAM_PATH, SCHEDULE_PATH } from '../../constants/productEngineering';
import { PrimaryButton, SecondaryButton } from './ui';

const FinalCTA = ({
  heading = 'Have a product to build, modernize, or scale?',
  body = 'Tell us what you are trying to accomplish. We will come back with a team shape, a sequence, and a path to production — not a generic capabilities brochure.',
}) => {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="px-4 sm:px-6 py-20 md:py-28"
    >
      <div className="max-w-4xl mx-auto border border-line bg-panel px-6 py-12 sm:px-12 sm:py-16">
        <h2
          id="final-cta-heading"
          className="font-display text-3xl sm:text-4xl md:text-5xl text-bone tracking-tight"
        >
          {heading}
        </h2>
        <p className="mt-5 text-lg text-neutral-400 leading-relaxed max-w-2xl">{body}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <PrimaryButton to={BUILD_TEAM_PATH}>Build My Team</PrimaryButton>
          <SecondaryButton to={SCHEDULE_PATH}>Schedule a Consultation</SecondaryButton>
        </div>
      </div>
    </section>
  );
};

export default memo(FinalCTA);
