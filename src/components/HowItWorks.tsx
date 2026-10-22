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
        return <FileText className="w-5 h-5 text-[#20A39E]" />;
      case 1:
        return <PhoneCall className="w-5 h-5 text-[#20A39E]" />;
      case 2:
      default:
        return <CheckCircle className="w-5 h-5 text-[#20A39E]" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-[#F7F9FA] border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-2">
            Simple & Transparent
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14344A] tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-base text-[#263238]/80">
            Getting your space or curbside bins professionally cleaned is quick and straightforward.
            Here is what to expect from start to finish.
          </p>
        </div>

        {/* Steps Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {businessConfig.steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative flex flex-col bg-white rounded-xl p-8 border border-[#E5E9EC] shadow-2xs hover:shadow-md transition-shadow duration-200"
            >
              {/* Step indicator header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-extrabold font-mono text-[#14344A]/25">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#F7F9FA] border border-[#E5E9EC] flex items-center justify-center">
                  {getStepIcon(idx)}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-[#14344A] mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-[#263238]/80 leading-relaxed mb-6 flex-1">
                {step.description}
              </p>

              <div className="pt-4 border-t border-[#E5E9EC] text-xs font-medium text-slate-500">
                {idx === 0 && 'Quick 60-second online enquiry'}
                {idx === 1 && 'Direct communication & quote confirmation'}
                {idx === 2 && 'Prompt, thorough service execution'}
              </div>
            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onQuoteClick}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#20A39E] hover:bg-[#1B8985] active:bg-[#16706D] rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <span>Request Your Service Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
