import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Check, Flame } from 'lucide-react';

interface QuickEstimateCalculatorProps {
  onApplyPlan: (cans: number, frequency: string) => void;
}

export const QuickEstimateCalculator: React.FC<QuickEstimateCalculatorProps> = ({
  onApplyPlan,
}) => {
  const [cansCount, setCansCount] = useState<number>(2);
  const [frequency, setFrequency] = useState<'monthly' | 'onetime' | 'biweekly'>('monthly');

  // Dynamic calculations based on state
  const estMinutes = cansCount * 12 + (frequency === 'onetime' ? 15 : 5);
  const planLabel =
    frequency === 'monthly'
      ? 'Monthly Freshness Upkeep'
      : frequency === 'biweekly'
      ? 'Bi-Weekly High-Usage Plan'
      : 'One-Time Intensive Restoration';

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-gradient-to-b from-[#102A43] via-[#163B5C] to-[#102A43] text-white relative overflow-hidden border-b border-[#163B5C]">
      {/* Background glow elements */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#0FB9B1]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4F36A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold tracking-wider text-[#D4F36A] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0FB9B1]" />
            <span>Interactive Plan Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 text-balance">
            Estimate Your Sanitization Scope
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-200">
            Select how many trash or recycling cans you have to see estimated wash time, cycle temperature, and recommended frequency.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="bg-[#102A43]/90 backdrop-blur-md rounded-3xl border border-white/20 p-5 sm:p-8 lg:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-7 sm:space-y-8">
            {/* Control 1: Number of Cans */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="can-slider" className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Number of Bins / Cans:
                </label>
                <span className="text-lg sm:text-xl font-mono font-extrabold text-[#D4F36A] px-3 py-1 rounded-lg bg-white/10 border border-white/10">
                  {cansCount} {cansCount === 1 ? 'Can' : 'Cans'}
                </span>
              </div>

              {/* Slider with generous touch track */}
              <div className="py-2">
                <input
                  id="can-slider"
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={cansCount}
                  onChange={(e) => setCansCount(parseInt(e.target.value, 10))}
                  aria-label="Adjust number of cans"
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#0FB9B1] focus:outline-hidden touch-pan-x"
                />
              </div>

              {/* Stepper buttons with minimum 44px touch targets */}
              <div className="grid grid-cols-6 gap-2 mt-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCansCount(num)}
                    className={`h-11 sm:h-10 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                      cansCount === num
                        ? 'bg-[#0FB9B1] text-[#102A43] shadow-md scale-105 ring-2 ring-white/40'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    aria-label={`Select ${num} cans`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Frequency Selector */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3">
                Preferred Cleaning Frequency:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer min-h-[52px] active:scale-[0.98] ${
                    frequency === 'monthly'
                      ? 'bg-[#0FB9B1]/20 border-[#0FB9B1] text-white shadow-md ring-1 ring-[#0FB9B1]'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">Monthly</span>
                    {frequency === 'monthly' && <Check className="w-4 h-4 text-[#0FB9B1]" />}
                  </div>
                  <span className="text-xs text-slate-400 block">Most Popular</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFrequency('biweekly')}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer min-h-[52px] active:scale-[0.98] ${
                    frequency === 'biweekly'
                      ? 'bg-[#0FB9B1]/20 border-[#0FB9B1] text-white shadow-md ring-1 ring-[#0FB9B1]'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">Bi-Weekly</span>
                    {frequency === 'biweekly' && <Check className="w-4 h-4 text-[#0FB9B1]" />}
                  </div>
                  <span className="text-xs text-slate-400 block">Heavy Waste Upkeep</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFrequency('onetime')}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer min-h-[52px] active:scale-[0.98] ${
                    frequency === 'onetime'
                      ? 'bg-[#0FB9B1]/20 border-[#0FB9B1] text-white shadow-md ring-1 ring-[#0FB9B1]'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">One-Time</span>
                    {frequency === 'onetime' && <Check className="w-4 h-4 text-[#0FB9B1]" />}
                  </div>
                  <span className="text-xs text-slate-400 block">Intensive Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Real-Time Live Results Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#163B5C] to-[#0D2230] rounded-2xl p-5 sm:p-8 border border-white/20 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-white/15 mb-5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#0FB9B1]">
                  Live Scope Preview
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4F36A] text-[#102A43] text-[10px] font-extrabold uppercase">
                  Burbank Route
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                {planLabel}
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                Tailored for {cansCount} residential bins using our self-contained mobile wash system.
              </p>

              {/* Stat Pillars */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Clock className="w-4 h-4 text-[#0FB9B1] shrink-0" />
                    <span>Est. Service Duration</span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    ~{estMinutes} minutes
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Flame className="w-4 h-4 text-[#D4F36A] shrink-0" />
                    <span>Wash Temperature</span>
                  </div>
                  <span className="font-mono font-bold text-[#D4F36A]">
                    200°F Sanitizing Wash
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-[#0FB9B1] shrink-0" />
                    <span>Odor Neutralization</span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    100% Deodorized
                  </span>
                </div>
              </div>
            </div>

            {/* Action to Apply Plan to Form */}
            <button
              type="button"
              onClick={() => onApplyPlan(cansCount, planLabel)}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-[#102A43] bg-[#0FB9B1] hover:bg-[#D4F36A] active:bg-[#0B9690] rounded-xl shadow-lg transition-all cursor-pointer group"
            >
              <span>Apply This Plan to My Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
