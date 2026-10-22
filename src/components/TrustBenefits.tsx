import React from 'react';
import { CheckCircle2, Calendar, HeartHandshake, ShieldCheck } from 'lucide-react';
import { businessConfig } from '../config/business';

export const TrustBenefits: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#0FB9B1]" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#0FB9B1]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-[#0FB9B1]" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#0FB9B1]" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#DDF7EF]/40 border-b border-[#DDF7EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {businessConfig.benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-start p-5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#DDF7EF] shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="p-3 rounded-xl bg-[#DDF7EF]/60 border border-[#0FB9B1]/20 shadow-2xs mb-3.5 text-[#0FB9B1]">
                {getIcon(benefit.icon)}
              </div>
              <h3 className="text-base font-extrabold text-[#102A43] mb-1.5 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#263238]/85 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
