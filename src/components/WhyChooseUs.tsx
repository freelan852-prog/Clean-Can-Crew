import React from 'react';
import { MessageSquare, Wrench, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { businessConfig } from '../config/business';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-[#20A39E]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#20A39E]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#20A39E]" />;
      case 'Clock':
      default:
        return <Clock className="w-5 h-5 text-[#20A39E]" />;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-2">
              The Standard We Aim For
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14344A] tracking-tight mb-4 text-balance">
              Why Customers Appreciate Our Service
            </h2>
            <p className="text-base text-[#263238]/80 leading-relaxed mb-6">
              When inviting someone to handle property cleaning or trash can sanitization, you want reliable communication, respect for your home, and results that actually last.
            </p>

            <div className="space-y-3 pt-4 border-t border-[#E5E9EC] text-sm text-[#263238]">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#20A39E] shrink-0" />
                <span>Locally based in Burbank, IL</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#20A39E] shrink-0" />
                <span>Specialized high-pressure & sanitizing equipment</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#20A39E] shrink-0" />
                <span>Flexible single-visit or recurring service plans</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Grid Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {businessConfig.whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#F7F9FA] border border-[#E5E9EC] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E9EC] flex items-center justify-center mb-4 shadow-2xs">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-base font-bold text-[#14344A] mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#263238]/80 leading-relaxed">
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
