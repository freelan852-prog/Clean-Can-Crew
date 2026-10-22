import React from 'react';
import { ArrowRight, Instagram, Phone, MessageCircle } from 'lucide-react';
import { businessConfig } from '../config/business';
import { IllustrationVisual } from './IllustrationVisual';

interface HeroProps {
  onQuoteClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F7F9FA] to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Value Proposition, and CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-4">
              <span>Burbank, IL</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Trash Can Sanitization</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Property Cleaning</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#14344A] leading-[1.1] mb-6 text-balance">
              {businessConfig.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[#263238]/85 leading-relaxed mb-8 max-w-2xl">
              {businessConfig.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#20A39E] hover:bg-[#1B8985] active:bg-[#16706D] rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#20A39E] focus-visible:ring-offset-2"
              >
                <span>{businessConfig.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-[#14344A] bg-white hover:bg-[#F7F9FA] border border-[#E5E9EC] rounded-lg transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14344A]"
              >
                Explore Our Services
              </a>
            </div>

            {/* Verified External Channels & Configured Contact */}
            <div className="pt-6 border-t border-[#E5E9EC] flex flex-wrap items-center gap-6 text-sm text-[#263238]/80">
              {/* Instagram link (verified) */}
              <a
                href={businessConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#20A39E] transition-colors font-medium group"
              >
                <div className="w-8 h-8 rounded-md bg-[#14344A]/5 flex items-center justify-center group-hover:bg-[#20A39E]/10 transition-colors">
                  <Instagram className="w-4 h-4 text-[#14344A] group-hover:text-[#20A39E]" />
                </div>
                <span>{businessConfig.instagramHandle}</span>
              </a>

              {/* Only show Phone when real contact is configured */}
              {businessConfig.phone && (
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="inline-flex items-center gap-2 hover:text-[#20A39E] transition-colors font-medium"
                >
                  <Phone className="w-4 h-4 text-[#20A39E]" />
                  <span>{businessConfig.phone}</span>
                </a>
              )}

              {/* Only show WhatsApp when configured */}
              {businessConfig.whatsappNumber && (
                <a
                  href={`https://wa.me/${businessConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#20A39E] transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4 text-[#20A39E]" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              <div className="text-xs text-slate-500">
                {businessConfig.ctaSupportingCopy}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase with Official Emblem */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E5E9EC] bg-[#14344A] shadow-xl aspect-4/3 sm:aspect-square lg:aspect-4/3 flex flex-col">
              {/* Top Bar with brand label */}
              <div className="bg-[#0F2839] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={businessConfig.logoUrl}
                    alt="Emblem"
                    className="w-7 h-7 rounded-full object-contain"
                  />
                  <span className="text-xs font-semibold text-white tracking-wide">
                    Clean Can Crew Official Service
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#20A39E] tracking-wider uppercase">
                  Burbank, IL
                </span>
              </div>

              {/* Dynamic Sanitization Visual */}
              <div className="relative flex-1">
                <IllustrationVisual type="trash-can-sanitization" mode="hero" className="h-full" />
              </div>

              {/* Bottom Feature Strip */}
              <div className="bg-[#0D2230] p-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-[#20A39E] font-bold text-sm">200°F+</div>
                  <div className="text-white/70 text-[11px]">Sanitizing Wash</div>
                </div>
                <div className="border-x border-white/10">
                  <div className="text-[#20A39E] font-bold text-sm">100%</div>
                  <div className="text-white/70 text-[11px]">Odor Disinfection</div>
                </div>
                <div>
                  <div className="text-[#20A39E] font-bold text-sm">Eco-Clean</div>
                  <div className="text-white/70 text-[11px]">Responsible Care</div>
                </div>
              </div>
            </div>

            {/* Subtle floating badge card */}
            <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:left-4 bg-white p-3.5 sm:p-4 rounded-xl shadow-lg border border-[#E5E9EC] flex items-center gap-3 max-w-[260px]">
              <img
                src={businessConfig.logoUrl}
                alt={businessConfig.businessName}
                className="w-10 h-10 object-contain rounded-full bg-[#14344A] p-0.5 shrink-0"
              />
              <div className="text-xs">
                <div className="font-bold text-[#14344A]">Cleaner Cans.</div>
                <div className="text-slate-500">Healthier homes & fresher spaces.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
