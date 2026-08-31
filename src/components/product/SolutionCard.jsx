import { memo } from 'react';
import { Link } from 'react-router-dom';

const SolutionCard = ({ solution }) => {
  return (
    <article className="flex flex-col border border-line bg-panel p-6 sm:p-7 h-full">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">{solution.eyebrow}</p>
      <h3 className="font-display text-2xl text-bone mt-3 tracking-tight">{solution.name}</h3>
      <p className="mt-3 text-neutral-400 leading-relaxed flex-1">{solution.summary}</p>
      <ul className="mt-5 space-y-1.5 text-sm text-neutral-300">
        {solution.capabilities.slice(0, 3).map((item) => (
          <li key={item}>— {item}</li>
        ))}
      </ul>
      <p className="mt-5 font-mono text-[11px] text-neutral-500 tracking-wide">
        {solution.technologies.slice(0, 4).join(' · ')}
      </p>
      <Link
        to={solution.href}
        className="mt-6 inline-flex items-center min-h-12 text-ember font-semibold hover:text-orange-400"
      >
        {solution.cta}
      </Link>
    </article>
  );
};

export default memo(SolutionCard);
