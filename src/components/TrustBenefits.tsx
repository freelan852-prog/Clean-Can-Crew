import React from 'react';
import { CheckCircle2, Calendar, HeartHandshake, ShieldCheck } from 'lucide-react';
import { businessConfig } from '../config/business';

export const TrustBenefits: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-[#20A39E]" />;
      case 'Calendar':
        return <Calendar className="w-6 h-6 text-[#20A39E]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#20A39E]" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-6 h-6 text-[#20A39E]" />;
    }
  };

  return (
    <section className="py-12 bg-white border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {businessConfig.benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-start p-6 rounded-xl bg-[#F7F9FA] border border-[#E5E9EC] transition-transform hover:-translate-y-0.5 duration-200"
            >
              <div className="p-2.5 rounded-lg bg-white border border-[#E5E9EC] shadow-2xs mb-4">
                {getIcon(benefit.icon)}
              </div>
              <h3 className="text-base font-bold text-[#14344A] mb-2 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-sm text-[#263238]/80 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
