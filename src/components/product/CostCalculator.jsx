import { memo, useMemo, useState } from 'react';
import { costModel } from '../../constants/productEngineering';
import { buildContactHref } from '../../utils/contactIntent';
import { PrimaryButton, SecondaryButton, SectionHeading, SectionShell } from './ui';

const SENIORITY = [
  { id: 'junior', label: 'Junior' },
  { id: 'mid', label: 'Mid' },
  { id: 'senior', label: 'Senior' },
  { id: 'staff', label: 'Staff / lead' },
];

const EXTRA_ROLES = [
  { id: 'techlead', label: 'Tech lead' },
  { id: 'designer', label: 'Product designer' },
  { id: 'qa', label: 'QA engineer' },
  { id: 'devops', label: 'DevOps / cloud' },
];

const currency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const CostCalculator = () => {
  const [developers, setDevelopers] = useState(3);
  const [seniority, setSeniority] = useState('senior');
  const [months, setMonths] = useState(12);
  const [roles, setRoles] = useState({ techlead: true, designer: false, qa: false, devops: false });

  const result = useMemo(() => {
    const base = costModel.usAnnual[seniority];
    let usAnnual = developers * base * costModel.roleWeight.developer;
    EXTRA_ROLES.forEach((role) => {
      if (roles[role.id]) usAnnual += base * costModel.roleWeight[role.id];
    });
    const fraction = months / 12;
    const usCost = usAnnual * fraction;
    const ondoLow = usCost * costModel.ondoRatio.low;
    const ondoMid = usCost * costModel.ondoRatio.mid;
    const ondoHigh = usCost * costModel.ondoRatio.high;
    const saveMid = Math.max(0, usCost - ondoMid);
    return {
      usAnnual,
      usCost,
      ondoLow,
      ondoMid,
      ondoHigh,
      saveMid,
      monthlyDelta: saveMid / months,
    };
  }, [developers, seniority, months, roles]);

  const toggleRole = (id) => {
    setRoles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SectionShell id="cost-calculator" labelledBy="cost-heading">
      <SectionHeading
        titleId="cost-heading"
        eyebrow="Illustrative model"
        title="What could your engineering team cost?"
      >
        Compare typical US fully-loaded engineering cost with an illustrative Ondosoft range.
        This is a planning tool — not a quote.
      </SectionHeading>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        <form className="lg:col-span-5 border border-line bg-panel p-5 sm:p-7 space-y-7">
          <div>
            <label htmlFor="dev-count" className="flex justify-between text-sm text-neutral-300 mb-2">
              <span>Number of developers</span>
              <span className="font-mono text-signal">{developers}</span>
            </label>
            <input
              id="dev-count"
              type="range"
              min="1"
              max="12"
              value={developers}
              onChange={(event) => setDevelopers(Number(event.target.value))}
              className="w-full accent-ember"
            />
          </div>

          <fieldset>
            <legend className="text-sm text-neutral-300 mb-3">Seniority</legend>
            <div className="grid grid-cols-2 gap-2">
              {SENIORITY.map((level) => (
                <label
                  key={level.id}
                  className={`min-h-12 border px-3 py-2 flex items-center gap-2 cursor-pointer ${
                    seniority === level.id ? 'border-ember bg-ink text-bone' : 'border-line text-neutral-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="seniority"
                    value={level.id}
                    checked={seniority === level.id}
                    onChange={() => setSeniority(level.id)}
                    className="sr-only"
                  />
                  {level.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="duration" className="flex justify-between text-sm text-neutral-300 mb-2">
              <span>Project duration</span>
              <span className="font-mono text-signal">{months} mo</span>
            </label>
            <input
              id="duration"
              type="range"
              min="3"
              max="24"
              step="1"
              value={months}
              onChange={(event) => setMonths(Number(event.target.value))}
              className="w-full accent-ember"
            />
          </div>

          <fieldset>
            <legend className="text-sm text-neutral-300 mb-3">Roles required</legend>
            <div className="space-y-2">
              <p className="text-sm text-neutral-200">Developers — {developers} (from the slider)</p>
              {EXTRA_ROLES.map((role) => (
                <label key={role.id} className="flex items-center gap-3 min-h-11 text-neutral-300">
                  <input
                    type="checkbox"
                    checked={roles[role.id]}
                    onChange={() => toggleRole(role.id)}
                    className="h-4 w-4 accent-ember"
                  />
                  {role.label}
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <div className="lg:col-span-7 border border-line bg-ink p-5 sm:p-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                Typical US engineering cost
              </p>
              <p className="font-display text-3xl sm:text-4xl text-bone mt-2">{currency(result.usCost)}</p>
              <p className="text-sm text-neutral-500 mt-1">
                {currency(result.usAnnual)} / year fully-loaded · {months} months
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
                Ondosoft estimated cost
              </p>
              <p className="font-display text-3xl sm:text-4xl text-bone mt-2">{currency(result.ondoMid)}</p>
              <p className="text-sm text-neutral-500 mt-1">
                Range {currency(result.ondoLow)} – {currency(result.ondoHigh)}
              </p>
            </div>
          </div>

          <dl className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="border border-line px-4 py-4">
              <dt className="text-sm text-neutral-500">Potential savings (mid estimate)</dt>
              <dd className="font-display text-2xl text-signal mt-1">{currency(result.saveMid)}</dd>
            </div>
            <div className="border border-line px-4 py-4">
              <dt className="text-sm text-neutral-500">Monthly difference</dt>
              <dd className="font-display text-2xl text-bone mt-1">{currency(result.monthlyDelta)}</dd>
            </div>
          </dl>

          <p className="mt-6 text-sm text-neutral-500 leading-relaxed">{costModel.disclaimer}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <PrimaryButton to={buildContactHref({ intent: 'build-team', source: 'cost-calculator' })}>
              Build My Team
            </PrimaryButton>
            <SecondaryButton to="/pricing">See published packages</SecondaryButton>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default memo(CostCalculator);
