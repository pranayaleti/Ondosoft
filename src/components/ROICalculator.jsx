import { memo, useState, useCallback } from "react";
import { DollarSign, Clock, TrendingUp } from "lucide-react";

const ROICalculator = () => {
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(80);

  const handleHours = useCallback((e) => setHours(Number(e.target.value)), []);
  const handleRate = useCallback((e) => setRate(Number(e.target.value)), []);

  const monthlyHours = hours * 4;
  const monthlyCost = monthlyHours * rate;
  const ondosoftSavings = Math.round(monthlyCost * 0.4);
  const annualSavings = ondosoftSavings * 12;

  return (
    <section data-testid="roi-calculator-section" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Value
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Calculate Your <span className="text-orange-500">ROI</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See how much time and money Ondosoft can save versus building with a traditional agency or managing freelancers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Sliders */}
          <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-8 space-y-8">
            <div>
              <label className="flex items-center justify-between text-gray-300 mb-3">
                <span className="font-medium">Hours spent on dev tasks per week</span>
                <span className="text-orange-400 font-bold text-lg">{hours}h</span>
              </label>
              <input
                data-testid="roi-hours-slider"
                type="range"
                min="2"
                max="40"
                value={hours}
                onChange={handleHours}
                className="w-full h-2 rounded-full bg-gray-700 appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>2h</span>
                <span>40h</span>
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between text-gray-300 mb-3">
                <span className="font-medium">Your hourly rate (or dev cost)</span>
                <span className="text-orange-400 font-bold text-lg">${rate}/hr</span>
              </label>
              <input
                data-testid="roi-rate-slider"
                type="range"
                min="30"
                max="250"
                step="10"
                value={rate}
                onChange={handleRate}
                className="w-full h-2 rounded-full bg-gray-700 appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>$30</span>
                <span>$250</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-500">
                Ondosoft delivers 40% faster than industry average, translating your time savings into real dollars.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-6 flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Monthly hours recovered</p>
                <p data-testid="roi-monthly-hours" className="text-3xl font-bold text-white">
                  {Math.round(monthlyHours * 0.4)} hours
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  out of {monthlyHours} total hours/month
                </p>
              </div>
            </div>

            <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-6 flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Monthly savings</p>
                <p data-testid="roi-monthly-savings" className="text-3xl font-bold text-emerald-400">
                  ${ondosoftSavings.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  based on {monthlyHours}h &times; ${rate}/hr &times; 40% efficiency gain
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-6 flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-orange-400/80 mb-1">Estimated annual savings</p>
                <p data-testid="roi-annual-savings" className="text-4xl font-bold text-white">
                  ${annualSavings.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  That's reinvestment capital for growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ROICalculator);
