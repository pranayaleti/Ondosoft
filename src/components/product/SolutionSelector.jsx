import { memo, useCallback, useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSolutionBySlug, selectorOptions } from '../../constants/productEngineering';
import { PrimaryButton, SectionHeading, SectionShell } from './ui';

const SolutionSelector = () => {
  const headingId = useId();
  const [activeId, setActiveId] = useState(selectorOptions[0].id);
  const activeIndex = selectorOptions.findIndex((option) => option.id === activeId);
  const active = selectorOptions[activeIndex] || selectorOptions[0];
  const solution = useMemo(() => getSolutionBySlug(active.solutionSlug), [active.solutionSlug]);

  const move = useCallback((delta) => {
    setActiveId((current) => {
      const index = selectorOptions.findIndex((option) => option.id === current);
      const next = (index + delta + selectorOptions.length) % selectorOptions.length;
      return selectorOptions[next].id;
    });
  }, []);

  const onListKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveId(selectorOptions[0].id);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveId(selectorOptions[selectorOptions.length - 1].id);
    }
  };

  return (
    <SectionShell id="what-do-you-need" labelledBy={headingId} className="bg-ink">
      <SectionHeading
        titleId={headingId}
        eyebrow="Interactive brief"
        title="What are you trying to accomplish?"
      >
        Pick a goal. We map it to a solution, a team shape, and a next step — the same way we’d
        start a real engagement.
      </SectionHeading>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div className="lg:col-span-5">
          <div
            role="listbox"
            aria-label="What you need"
            aria-activedescendant={`need-${active.id}`}
            tabIndex={0}
            onKeyDown={onListKeyDown}
            className="border border-line divide-y divide-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            {selectorOptions.map((option, index) => {
              const selected = option.id === active.id;
              return (
                <button
                  key={option.id}
                  id={`need-${option.id}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => setActiveId(option.id)}
                  className={`w-full text-left min-h-12 px-4 py-4 flex items-baseline gap-4 ${
                    selected ? 'bg-steel text-bone' : 'bg-panel text-neutral-400 hover:text-bone'
                  }`}
                >
                  <span className="font-mono text-xs text-signal w-6 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg sm:text-xl tracking-tight">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 border border-line bg-panel p-6 sm:p-8 flex flex-col">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Recommended</p>
          <h3 className="font-display text-2xl sm:text-3xl text-bone mt-2 tracking-tight">
            {solution?.name}
          </h3>
          <p className="mt-3 text-neutral-400 leading-relaxed">{solution?.summary}</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                Team composition
              </p>
              <ul className="mt-2 space-y-1.5 text-neutral-200">
                {active.team.map((member) => (
                  <li key={member} className="flex gap-2">
                    <span className="text-signal" aria-hidden="true">
                      /
                    </span>
                    {member}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                Capabilities
              </p>
              <ul className="mt-2 space-y-1.5 text-neutral-200">
                {(solution?.capabilities || []).slice(0, 4).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-signal" aria-hidden="true">
                      /
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm text-neutral-400">
            <span className="text-neutral-200">Engagement: </span>
            {active.engagement}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {active.ctaHref.startsWith('#') ? (
              <PrimaryButton href={active.ctaHref}>{active.ctaLabel}</PrimaryButton>
            ) : (
              <PrimaryButton to={active.ctaHref}>{active.ctaLabel}</PrimaryButton>
            )}
            {solution ? (
              <Link
                to={solution.href}
                className="inline-flex items-center min-h-12 text-signal hover:text-bone font-medium"
              >
                Explore {solution.name}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default memo(SolutionSelector);
