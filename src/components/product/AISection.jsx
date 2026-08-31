import { memo } from 'react';
import { aiCapabilities } from '../../constants/productEngineering';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { PrimaryButton, SectionHeading, SectionShell } from './ui';

const AIDiagram = ({ reduced }) => (
  <svg
    viewBox="0 0 320 200"
    className="w-full h-auto"
    role="img"
    aria-label="AI architecture: product events flow through a pipeline into a model layer, then back into the application"
  >
    <rect x="8" y="78" width="70" height="44" className="fill-panel stroke-line" strokeWidth="1" />
    <text x="43" y="104" textAnchor="middle" className="fill-bone" style={{ fontSize: '9px', fontFamily: 'IBM Plex Mono, monospace' }}>
      Product
    </text>
    <rect x="125" y="30" width="70" height="44" className="fill-panel stroke-line" strokeWidth="1" />
    <text x="160" y="56" textAnchor="middle" className="fill-bone" style={{ fontSize: '9px', fontFamily: 'IBM Plex Mono, monospace' }}>
      Pipeline
    </text>
    <rect x="125" y="126" width="70" height="44" className="fill-ink stroke-signal" strokeWidth="1" />
    <text x="160" y="152" textAnchor="middle" className="fill-bone" style={{ fontSize: '9px', fontFamily: 'IBM Plex Mono, monospace' }}>
      Model
    </text>
    <rect x="242" y="78" width="70" height="44" className="fill-steel stroke-ember" strokeWidth="1" />
    <text x="277" y="104" textAnchor="middle" className="fill-bone" style={{ fontSize: '9px', fontFamily: 'IBM Plex Mono, monospace' }}>
      Feature
    </text>
    <path d="M78 100 H125" className="stroke-line" strokeWidth="1" fill="none" />
    <path d="M160 74 V126" className="stroke-line" strokeWidth="1" fill="none" />
    <path d="M195 148 H220 V100 H242" className="stroke-signal" strokeWidth="1" fill="none" />
    <path d="M195 52 H220 V100" className="stroke-line" strokeWidth="1" fill="none" />
    {!reduced ? (
      <>
        <circle r="2.2" className="fill-signal">
          <animateMotion dur="2.8s" repeatCount="indefinite" path="M78,100 H125" />
        </circle>
        <circle r="2.2" className="fill-signal">
          <animateMotion dur="3.4s" repeatCount="indefinite" path="M195,148 H220 V100 H242" />
        </circle>
      </>
    ) : null}
  </svg>
);

const AISection = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <SectionShell id="ai" labelledBy="ai-heading" className="bg-ink">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <SectionHeading
            titleId="ai-heading"
            eyebrow="AI engineering"
            title="Turn AI from an experiment into a production capability."
          >
            Capabilities we already list: LLM-powered features, automation, data pipelines, NLP,
            computer vision when it earns its place, and finishing incomplete generated code.
          </SectionHeading>
          <ul className="space-y-5">
            {aiCapabilities.map((item) => (
              <li key={item.title}>
                <h3 className="font-display text-xl text-bone">{item.title}</h3>
                <p className="mt-1 text-neutral-400 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <PrimaryButton to="/solutions/ai">Explore AI Engineering</PrimaryButton>
          </div>
        </div>
        <div className="lg:col-span-5 border border-line bg-panel p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-4">
            Grounded path
          </p>
          <AIDiagram reduced={reduced} />
        </div>
      </div>
    </SectionShell>
  );
};

export default memo(AISection);
