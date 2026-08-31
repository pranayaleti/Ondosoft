import { memo } from 'react';
import { Link } from 'react-router-dom';
import { buildContactHref } from '../../utils/contactIntent';
import { PrimaryButton, SecondaryButton } from './ui';

const CaseStudyDetail = ({ study }) => {
  const pairs = study.beforeAfter
    ? Object.keys(study.beforeAfter.before).map((key) => ({
        key,
        before: study.beforeAfter.before[key],
        after: study.beforeAfter.after[key],
      }))
    : [];

  return (
    <article className="max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
        {study.industry} · {study.duration}
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-bone mt-3 tracking-tight">{study.title}</h1>
      <p className="mt-4 text-lg text-neutral-400">{study.challenge}</p>

      {study.screenshots?.[0] ? (
        <img
          src={study.screenshots[0]}
          alt={`${study.client} application`}
          className="mt-8 w-full border border-line"
          width={1200}
          height={720}
        />
      ) : null}

      <div className="mt-10 grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="font-display text-2xl text-bone">Problem</h2>
          <p className="mt-3 text-neutral-400 leading-relaxed">{study.challenge}</p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-bone">Solution</h2>
          <p className="mt-3 text-neutral-400 leading-relaxed">{study.solution}</p>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-bone">Technology</h2>
        <p className="mt-3 font-mono text-sm text-neutral-300">{study.technologies.join(' · ')}</p>
      </section>

      {pairs.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-bone">Before → After</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Figures below are from the existing Ondosoft portfolio write-up for this project.
          </p>
          <div className="mt-5 overflow-x-auto border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-panel text-neutral-400 font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3">Measure</th>
                  <th className="px-4 py-3">Before</th>
                  <th className="px-4 py-3">After</th>
                </tr>
              </thead>
              <tbody>
                {pairs.map((row) => (
                  <tr key={row.key} className="border-t border-line">
                    <td className="px-4 py-3 capitalize text-neutral-400">{row.key}</td>
                    <td className="px-4 py-3 text-neutral-300">{row.before}</td>
                    <td className="px-4 py-3 text-bone">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <blockquote className="mt-10 border-l-2 border-ember pl-5">
        <p className="text-lg text-neutral-200 leading-relaxed">“{study.testimonial}”</p>
        <footer className="mt-3 text-sm text-neutral-500">
          {study.author} · {study.role}
        </footer>
      </blockquote>

      {study.screenshots?.length > 1 ? (
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {study.screenshots.slice(1).map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`${study.client} interface ${index + 2}`}
              className="w-full border border-line"
              loading="lazy"
              width={800}
              height={500}
            />
          ))}
        </div>
      ) : null}

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <PrimaryButton
          to={buildContactHref({
            intent: 'build-team',
            source: 'case-detail',
            extra: { related: study.slug },
          })}
        >
          Build Something Similar
        </PrimaryButton>
        <SecondaryButton to="/case-studies">All case studies</SecondaryButton>
      </div>

      <p className="mt-8">
        <Link to="/portfolio" className="text-sm text-neutral-500 hover:text-bone">
          Also filed under Portfolio
        </Link>
      </p>
    </article>
  );
};

export default memo(CaseStudyDetail);
