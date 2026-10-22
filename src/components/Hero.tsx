import React, { useState, useRef } from 'react';
import { ArrowRight, Phone, MessageCircle, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { businessConfig } from '../config/business';

interface HeroProps {
  onQuoteClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => {
  const [mainImgLoaded, setMainImgLoaded] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply 3D tilt on devices with hover/fine pointers (desktop/laptops)
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTilt({ x: rotateX, y: rotateY });
    setShine({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setShine((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <section className="relative overflow-x-clip bg-gradient-to-b from-[#102A43] via-[#163B5C] to-[#102A43] text-white pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 border-b border-[#163B5C]">
      {/* Background glow elements */}
      <div className="absolute top-1/4 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#0FB9B1]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-[#0FB9B1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Eyebrow, Headline, Value Prop, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wider text-[#D4F36A] uppercase mb-5 backdrop-blur-xs shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0FB9B1] shrink-0" />
              <span className="truncate">Burbank, IL · Trash Can Sanitization</span>
            </div>

            {/* Headline with responsive scale */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-5 text-balance">
              {businessConfig.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed mb-7 max-w-2xl font-normal">
              {businessConfig.subheadline}
            </p>

            {/* CTAs with touch-friendly 48px hitboxes */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <button
                onClick={onQuoteClick}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 text-base font-bold text-[#102A43] bg-[#0FB9B1] hover:bg-[#D4F36A] active:bg-[#0B9690] rounded-xl shadow-lg transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0FB9B1]"
              >
                <span>{businessConfig.ctaLabel}</span>
                <ArrowRight className="w-5 h-5 text-[#102A43]" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-7 py-3.5 sm:py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/20 active:bg-white/15 border border-white/20 rounded-xl transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore Our Services
              </a>
            </div>

            {/* Verified External Channels & Configured Contact */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-300">
              {/* Instagram link with vibrant animated logo */}
              <a
                href={businessConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-105 shadow-sm min-h-[44px]"
              >
                <div className="relative z-10 w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform duration-300 shrink-0">
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D4F36A]">
                      Follow on Instagram
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4F36A] animate-ping" />
                  </div>
                  <span className="font-bold text-white text-sm group-hover:text-[#D4F36A] transition-colors">
                    {businessConfig.instagramHandle}
                  </span>
                </div>
              </a>

              {/* Phone when configured */}
              {businessConfig.phone && (
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="inline-flex items-center gap-2 hover:text-[#0FB9B1] transition-colors font-medium min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-[#0FB9B1]" />
                  <span>{businessConfig.phone}</span>
                </a>
              )}

              {/* WhatsApp when configured */}
              {businessConfig.whatsappNumber && (
                <a
                  href={`https://wa.me/${businessConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#0FB9B1] transition-colors font-medium min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#0FB9B1]" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              <div className="text-xs text-slate-300/80 max-w-xs">
                {businessConfig.ctaSupportingCopy}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photo Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Main High-Resolution Photo */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl aspect-4/3 sm:aspect-5/4 lg:aspect-4/3 bg-[#102A43] group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80"
                alt="Professional high pressure washing and sanitization of outdoor surfaces"
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  mainImgLoaded ? 'opacity-100' : 'opacity-80'
                }`}
                referrerPolicy="no-referrer"
                onError={() => setMainImgLoaded(false)}
              />

              {/* Dynamic Interactive Light Reflection */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                  opacity: shine.opacity,
                }}
              />

              {/* Subtle contrast gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-[#102A43]/20 to-transparent pointer-events-none" />

              {/* Top Banner on Image */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-1.5 bg-[#102A43]/85 backdrop-blur-md px-3 py-1 rounded-xl border border-white/15 text-[11px] sm:text-xs font-semibold text-white shadow-md">
                  <Shield className="w-3.5 h-3.5 text-[#0FB9B1]" />
                  <span>Curbside Power Wash</span>
                </div>
                <span className="bg-[#D4F36A] text-[#102A43] text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg uppercase tracking-wider shadow-sm">
                  200°F Wash
                </span>
              </div>

              {/* Bottom Caption on Main Image */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 pointer-events-none">
                <div className="text-xs sm:text-sm font-bold text-white mb-0.5">
                  High-Heat Outdoor Pressure Wash
                </div>
                <div className="text-[11px] sm:text-xs text-slate-200">
                  Breaks down stubborn grease, bacteria, and pest odors
                </div>
              </div>
            </div>

            {/* Overlapping Secondary Tile 1: Clean curbside bins (desktop/tablet) */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white text-[#263238] p-3 rounded-2xl shadow-2xl border border-[#DDF7EF] items-center gap-3.5 max-w-[280px] z-20 hover:scale-105 transition-transform cursor-default">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=300&q=80"
                  alt="Spotless clean trash and recycling bins"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-[#102A43] flex items-center gap-1.5">
                  <span>Spotless & Fresh</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0FB9B1]" />
                </div>
                <div className="text-slate-600 mt-0.5 leading-snug">
                  Neutralizes smells and leaves bins clean.
                </div>
              </div>
            </div>

            {/* Overlapping Secondary Tile 2: Official Emblem - Safe right position on mobile */}
            <div className="absolute -top-4 right-2 sm:-top-5 sm:-right-4 bg-[#102A43] p-2 sm:p-2.5 rounded-2xl shadow-2xl border border-[#0FB9B1]/40 z-20 flex items-center gap-2 hover:rotate-3 transition-transform cursor-default">
              <img
                src={businessConfig.logoUrl}
                alt={businessConfig.businessName}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
              <div className="pr-1.5">
                <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">Clean Can Crew</div>
                <div className="text-[10px] text-[#D4F36A] font-mono">Burbank, IL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
