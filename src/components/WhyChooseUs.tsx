import React from 'react';
import { MessageSquare, Wrench, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { businessConfig } from '../config/business';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-[#0FB9B1]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#0FB9B1]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#0FB9B1]" />;
      case 'Clock':
      default:
        return <Clock className="w-5 h-5 text-[#0FB9B1]" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#102A43] to-[#163B5C] text-white border-b border-[#163B5C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5">
            <div className="text-xs font-bold tracking-wider text-[#D4F36A] uppercase mb-2">
              The Standard We Aim For
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
              Why Customers Appreciate Our Service
            </h2>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6">
              When inviting someone to handle property cleaning or curbside trash can sanitization, you want reliable communication, respect for your home, and results that actually last.
            </p>

            <div className="space-y-3 pt-6 border-t border-white/15 text-sm text-slate-200">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0FB9B1] shrink-0" />
                <span>Locally based in Burbank, IL</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0FB9B1] shrink-0" />
                <span>Specialized high-pressure & sanitizing equipment</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0FB9B1] shrink-0" />
                <span>Flexible single-visit or recurring service plans</span>
              </div>
            </div>

            {/* Embedded High-Res Photo Thumbnail */}
            <div className="mt-8 rounded-xl overflow-hidden border border-white/20 shadow-md h-44 relative hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1000&q=80"
                alt="Pressure washing and exterior care"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-xs font-bold text-white">
                Dedicated Surface & Can Cleaning
              </div>
            </div>
          </div>

          {/* Right Column: 4 Grid Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {businessConfig.whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#163B5C]/70 backdrop-blur-xs border border-white/15 hover:border-[#0FB9B1]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-5 text-[#0FB9B1] shadow-xs">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
