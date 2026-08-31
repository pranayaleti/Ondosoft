import { memo } from 'react';
import { trustMetrics } from '../../constants/productEngineering';

const TrustMetrics = () => {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
      {trustMetrics.map((metric) => (
        <li key={metric.label} className="bg-ink px-4 py-5 sm:px-5 sm:py-6">
          <p className="font-display text-2xl sm:text-3xl text-bone tracking-tight">{metric.value}</p>
          <p className="mt-1 text-sm text-neutral-300">{metric.label}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-neutral-500 leading-relaxed">
            {metric.note}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default memo(TrustMetrics);
