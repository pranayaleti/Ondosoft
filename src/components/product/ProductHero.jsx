import { memo } from 'react';
import { BUILD_TEAM_PATH, PORTFOLIO_PATH } from '../../constants/productEngineering';
import { Eyebrow, PrimaryButton, SecondaryButton } from './ui';
import TrustMetrics from './TrustMetrics';
import HeroArchitecture from './HeroArchitecture';

const ProductHero = () => {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative px-4 sm:px-6 pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-7">
          <Eyebrow>Ondosoft · Product engineering</Eyebrow>
          <h1
            id="hero-heading"
            className="font-display text-[2.15rem] sm:text-5xl md:text-6xl lg:text-[4.15rem] font-semibold tracking-tight text-bone leading-[1.05] mt-5"
          >
            Build, scale, and modernize software with an engineering team that operates like your own.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            A US-based studio in Lehi, Utah. Senior engineers and product leadership for startups,
            scale-ups, and enterprises — strategy first, then production software.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <PrimaryButton to={BUILD_TEAM_PATH}>Build My Team</PrimaryButton>
            <SecondaryButton to={PORTFOLIO_PATH}>See What We’ve Built</SecondaryButton>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="border border-line bg-ink/70 p-5 sm:p-6 rounded-sm">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-500 mb-4">
              System, not a stock photo
            </p>
            <HeroArchitecture />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-14">
        <TrustMetrics />
      </div>
    </section>
  );
};

export default memo(ProductHero);
