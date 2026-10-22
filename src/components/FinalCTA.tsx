import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { businessConfig } from '../config/business';

interface FinalCTAProps {
  onQuoteClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onQuoteClick }) => {
  return (
    <section className="py-20 bg-[#14344A] text-white relative overflow-hidden">
      {/* Background glow and subtle vector details */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(32,163,158,0.22),transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-4 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cleaner Cans · Fresher Spaces</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 text-balance">
          Ready for a Cleaner Space?
        </h2>

        <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed mb-8">
          Tell us a little about your cleaning needs and take the next step toward a fresher, more welcoming environment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onQuoteClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-[#20A39E] hover:bg-[#1B8985] active:bg-[#16706D] rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={businessConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg transition-colors"
          >
            Visit Our Instagram
          </a>
        </div>
      </div>
    </section>
  );
};
