import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { businessConfig } from '../config/business';

interface FinalCTAProps {
  onQuoteClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onQuoteClick }) => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#102A43] via-[#163B5C] to-[#102A43] text-white relative overflow-hidden border-b border-[#163B5C]">
      {/* Decorative radial teal lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0FB9B1]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#D4F36A] uppercase mb-4 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#0FB9B1]" />
          <span>Cleaner Cans · Fresher Spaces · Burbank, IL</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 text-balance">
          Ready for a Cleaner Space?
        </h2>

        <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed mb-10">
          Tell us a little about your cleaning needs and take the next step toward a fresher, more hygienic environment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onQuoteClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-bold text-[#102A43] bg-[#0FB9B1] hover:bg-[#D4F36A] active:bg-[#0B9690] rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-5 h-5 text-[#102A43]" />
          </button>

          <a
            href={businessConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-base font-semibold text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
          >
            Visit Our Instagram
          </a>
        </div>
      </div>
    </section>
  );
};
