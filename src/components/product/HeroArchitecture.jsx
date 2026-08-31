import { memo } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const NODES = [
  { id: 'web', label: 'Web', x: 48, y: 28, kind: 'edge' },
  { id: 'mobile', label: 'Mobile', x: 132, y: 28, kind: 'edge' },
  { id: 'gateway', label: 'Gateway', x: 90, y: 88, kind: 'core' },
  { id: 'auth', label: 'Auth', x: 36, y: 156, kind: 'svc' },
  { id: 'billing', label: 'Billing', x: 90, y: 156, kind: 'svc' },
  { id: 'core', label: 'Core API', x: 144, y: 156, kind: 'svc' },
  { id: 'data', label: 'Postgres', x: 62, y: 224, kind: 'data' },
  { id: 'queue', label: 'Queue', x: 118, y: 224, kind: 'data' },
];

const LINKS = [
  ['web', 'gateway'],
  ['mobile', 'gateway'],
  ['gateway', 'auth'],
  ['gateway', 'billing'],
  ['gateway', 'core'],
  ['auth', 'data'],
  ['billing', 'data'],
  ['core', 'queue'],
  ['core', 'data'],
];

const nodeById = Object.fromEntries(NODES.map((node) => [node.id, node]));

const HeroArchitecture = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="relative w-full max-w-md mx-auto lg:max-w-none"
      role="img"
      aria-label="Abstract architecture of a product: web and mobile clients talking to a gateway, services, and data stores"
    >
      <div className="absolute inset-0 pe-grid-fade pointer-events-none" aria-hidden="true" />
      <svg
        viewBox="0 0 180 260"
        className="w-full h-auto text-bone"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {LINKS.map(([from, to], index) => {
          const a = nodeById[from];
          const b = nodeById[to];
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={a.x}
                y1={a.y + 10}
                x2={b.x}
                y2={b.y - 10}
                stroke="currentColor"
                className="text-line"
                strokeWidth="0.8"
              />
              {!reduced ? (
                <circle r="1.6" className="fill-signal pe-packet" style={{ animationDelay: `${index * 0.35}s` }}>
                  <animateMotion
                    dur="3.2s"
                    repeatCount="indefinite"
                    begin={`${index * 0.35}s`}
                    path={`M${a.x},${a.y + 10} L${b.x},${b.y - 10}`}
                  />
                </circle>
              ) : null}
            </g>
          );
        })}
        {NODES.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x - 22}
              y={node.y - 11}
              width="44"
              height="22"
              rx="2"
              className={
                node.kind === 'core'
                  ? 'fill-steel stroke-ember'
                  : node.kind === 'data'
                    ? 'fill-ink stroke-signal'
                    : 'fill-panel stroke-line'
              }
              strokeWidth="0.9"
            />
            <text
              x={node.x}
              y={node.y + 3.5}
              textAnchor="middle"
              className="fill-bone"
              style={{ fontSize: '6.2px', fontFamily: 'IBM Plex Mono, ui-monospace, monospace' }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-4 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
        <span>Clients</span>
        <span className="text-signal">Live path</span>
        <span>Data plane</span>
      </div>
    </div>
  );
};

export default memo(HeroArchitecture);
