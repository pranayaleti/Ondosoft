import { memo } from "react";
import { Check, X } from "lucide-react";

const features = [
  { label: "Senior-level engineers", ondosoft: true, freelance: false, bigAgency: true },
  { label: "Dedicated project manager", ondosoft: true, freelance: false, bigAgency: true },
  { label: "Fixed-price or agile billing", ondosoft: true, freelance: true, bigAgency: false },
  { label: "On-time delivery guarantee", ondosoft: true, freelance: false, bigAgency: false },
  { label: "Direct access to dev team", ondosoft: true, freelance: true, bigAgency: false },
  { label: "Enterprise security standards", ondosoft: true, freelance: false, bigAgency: true },
  { label: "Post-launch support included", ondosoft: true, freelance: false, bigAgency: false },
  { label: "Transparent weekly demos", ondosoft: true, freelance: false, bigAgency: false },
  { label: "Affordable for startups", ondosoft: true, freelance: true, bigAgency: false },
  { label: "Full-stack capability", ondosoft: true, freelance: false, bigAgency: true },
];

const Cell = ({ yes }) =>
  yes ? (
    <div className="flex items-center justify-center">
      <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
        <Check className="w-4 h-4 text-emerald-400" />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <div className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center">
        <X className="w-4 h-4 text-red-400/60" />
      </div>
    </div>
  );

const ComparisonTable = () => {
  return (
    <section data-testid="comparison-table-section" className="py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Why Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ondosoft vs <span className="text-orange-500">Alternatives</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See how we stack up against freelancers and traditional agencies.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-800">
          <table className="w-full text-left" data-testid="comparison-table">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-5 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Feature
                </th>
                <th className="py-5 px-6 text-center">
                  <span className="inline-block px-4 py-1.5 text-sm font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full">
                    Ondosoft
                  </span>
                </th>
                <th className="py-5 px-6 text-center text-sm font-medium text-gray-400">
                  Freelancers
                </th>
                <th className="py-5 px-6 text-center text-sm font-medium text-gray-400">
                  Big Agencies
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr
                  key={f.label}
                  data-testid={`comparison-row-${i}`}
                  className={`border-b border-gray-800/60 ${
                    i % 2 === 0 ? "bg-gray-900/30" : ""
                  } hover:bg-gray-800/30 transition-colors`}
                >
                  <td className="py-4 px-6 text-sm text-gray-300 font-medium">{f.label}</td>
                  <td className="py-4 px-6">
                    <Cell yes={f.ondosoft} />
                  </td>
                  <td className="py-4 px-6">
                    <Cell yes={f.freelance} />
                  </td>
                  <td className="py-4 px-6">
                    <Cell yes={f.bigAgency} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-6">
            <p className="text-3xl font-bold text-orange-400">10/10</p>
            <p className="text-sm text-gray-400 mt-1">Ondosoft advantages</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <p className="text-3xl font-bold text-gray-400">3/10</p>
            <p className="text-sm text-gray-500 mt-1">Freelancer advantages</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <p className="text-3xl font-bold text-gray-400">4/10</p>
            <p className="text-sm text-gray-500 mt-1">Big agency advantages</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ComparisonTable);
