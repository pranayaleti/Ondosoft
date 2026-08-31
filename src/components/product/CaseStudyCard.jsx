import { memo } from 'react';
import { Link } from 'react-router-dom';
import { buildContactHref } from '../../utils/contactIntent';

const CaseStudyCard = ({ study }) => {
  return (
    <article className="flex flex-col border border-line bg-panel overflow-hidden h-full">
      {study.screenshots?.[0] ? (
        <img
          src={study.screenshots[0]}
          alt={`${study.client} product interface`}
          className="w-full h-48 object-cover"
          loading="lazy"
          width={800}
          height={384}
        />
      ) : null}
      <div className="flex flex-col flex-1 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
          {study.industry}
        </p>
        <h3 className="font-display text-2xl text-bone mt-2 tracking-tight">{study.client}</h3>
        <dl className="mt-5 space-y-3 text-sm">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">Problem</dt>
            <dd className="text-neutral-300 mt-1 leading-relaxed">{study.challenge}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">Solution</dt>
            <dd className="text-neutral-300 mt-1 leading-relaxed">{study.solution}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">Technology</dt>
            <dd className="text-neutral-300 mt-1">{study.technologies.join(' · ')}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">Result</dt>
            <dd className="text-bone mt-1">{study.resultLine}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to={`/case-studies/${study.slug}`}
            className="inline-flex items-center justify-center min-h-12 px-4 border border-line text-bone font-semibold hover:border-signal"
          >
            Read Case Study
          </Link>
          <Link
            to={buildContactHref({
              intent: 'build-team',
              source: 'case-similar',
              extra: { related: study.slug },
            })}
            className="inline-flex items-center justify-center min-h-12 text-ember font-semibold"
          >
            Build Something Similar
          </Link>
        </div>
      </div>
    </article>
  );
};

export default memo(CaseStudyCard);
