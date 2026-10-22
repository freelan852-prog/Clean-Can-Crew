import React from 'react';
import { ArrowRight, FileText, PhoneCall, CheckCircle } from 'lucide-react';
import { businessConfig } from '../config/business';

interface HowItWorksProps {
  onQuoteClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onQuoteClick }) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FileText className="w-6 h-6 text-[#0FB9B1]" />;
      case 1:
        return <PhoneCall className="w-6 h-6 text-[#0FB9B1]" />;
      case 2:
      default:
        return <CheckCircle className="w-6 h-6 text-[#0FB9B1]" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-[#F7F8F4] border-b border-[#E5E9EC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-wider text-[#0FB9B1] uppercase mb-2">
            Simple & Transparent
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A43] tracking-tight mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-[#263238]/85">
            Getting your space or curbside bins professionally cleaned is quick and straightforward.
          </p>
        </div>

        {/* Visually Connected 3-Step Timeline */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#0FB9B1]/20 via-[#0FB9B1] to-[#0FB9B1]/20 -translate-y-12 z-0" />

          {businessConfig.steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative z-10 flex flex-col bg-white rounded-2xl p-8 border border-[#E5E9EC] shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Header with Step Number & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#DDF7EF] border border-[#0FB9B1]/30 flex items-center justify-center text-[#102A43] font-extrabold text-xl font-mono shadow-xs">
                  {step.number}
                </div>
                <div className="p-3 rounded-xl bg-[#F7F8F4] border border-[#E5E9EC]">
                  {getStepIcon(idx)}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-[#102A43] mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-[#263238]/85 leading-relaxed mb-6 flex-1">
                {step.description}
              </p>

              <div className="pt-4 border-t border-[#E5E9EC] text-xs font-semibold text-[#0FB9B1]">
                {idx === 0 && 'Fast online quote form'}
                {idx === 1 && 'Transparent confirmation & schedule'}
                {idx === 2 && 'Punctual, thorough execution'}
              </div>
            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="mt-14 text-center">
          <button
            onClick={onQuoteClick}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-bold text-[#102A43] bg-[#0FB9B1] hover:bg-[#D4F36A] active:bg-[#0B9690] rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>Request Your Service Quote</span>
            <ArrowRight className="w-4 h-4 text-[#102A43]" />
          </button>
        </div>
      </div>
    </section>
  );
};
