import React from 'react';
import { Trash2, Home, Sparkles, Key, Building2, Hammer, ArrowRight, Check } from 'lucide-react';
import { businessConfig, ServiceItem } from '../config/business';
import { IllustrationVisual } from './IllustrationVisual';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const enabledServices = businessConfig.services.filter((s) => s.enabled);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trash2':
        return <Trash2 className="w-5 h-5 text-[#20A39E]" />;
      case 'Home':
        return <Home className="w-5 h-5 text-[#20A39E]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#20A39E]" />;
      case 'Key':
        return <Key className="w-5 h-5 text-[#20A39E]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#20A39E]" />;
      case 'Hammer':
        return <Hammer className="w-5 h-5 text-[#20A39E]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#20A39E]" />;
    }
  };

  const getVisualType = (serviceId: string) => {
    switch (serviceId) {
      case 'trash-can-sanitization':
        return 'trash-can-sanitization' as const;
      case 'residential-cleaning':
        return 'living-room-tidy' as const;
      case 'deep-cleaning':
        return 'bathroom-sparkle' as const;
      case 'move-in-move-out':
        return 'kitchen-gleam' as const;
      case 'commercial-cleaning':
        return 'office-clean' as const;
      default:
        return 'deck-patio' as const;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#F7F9FA] border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-2">
            Tailored Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14344A] tracking-tight mb-4">
            Cleaning Services Tailored to Your Space
          </h2>
          <p className="text-base sm:text-lg text-[#263238]/80 leading-relaxed">
            Explore the cleaning options available and tell us what your property needs.
            Every service is handled with dedicated equipment and attentive care.
          </p>
        </div>

        {enabledServices.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-[#E5E9EC]">
            <h3 className="text-lg font-bold text-[#14344A] mb-2">
              Custom Cleaning Enquiries
            </h3>
            <p className="text-sm text-slate-600 mb-6 max-w-lg mx-auto">
              We provide tailored cleaning solutions for residential and commercial spaces.
              Get in touch to describe your requirements and confirm availability.
            </p>
            <button
              onClick={() => onSelectService('other')}
              className="px-6 py-3 text-sm font-semibold text-white bg-[#20A39E] rounded-lg hover:bg-[#1B8985] transition-colors"
            >
              Enquire About Available Services
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enabledServices.map((service: ServiceItem) => (
              <div
                key={service.id}
                className={`flex flex-col rounded-xl overflow-hidden bg-white border transition-all duration-200 hover:shadow-md ${
                  service.isMarquee
                    ? 'border-[#20A39E] ring-1 ring-[#20A39E]/20'
                    : 'border-[#E5E9EC]'
                }`}
              >
                {/* Visual Header */}
                <div className="h-48 w-full relative overflow-hidden bg-[#14344A]">
                  <IllustrationVisual
                    type={getVisualType(service.id)}
                    mode="after"
                    className="h-full"
                  />
                  {service.isMarquee && (
                    <div className="absolute top-3 right-3 bg-[#20A39E] text-white text-[11px] font-bold px-2.5 py-1 rounded-sm shadow-xs uppercase tracking-wider">
                      Signature Specialty
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="p-2 rounded-md bg-[#F7F9FA] border border-[#E5E9EC]">
                        {getServiceIcon(service.icon)}
                      </div>
                      <h3 className="text-lg font-bold text-[#14344A] tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[#263238]/80 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features list */}
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-xs text-[#263238]/90"
                          >
                            <Check className="w-3.5 h-3.5 text-[#20A39E] shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Card Action: Preselects in Quote Form */}
                  <div className="pt-4 border-t border-[#E5E9EC]">
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="w-full inline-flex items-center justify-between px-4 py-2.5 text-xs font-bold text-[#14344A] bg-[#F7F9FA] hover:bg-[#20A39E] hover:text-white rounded-lg transition-colors cursor-pointer group"
                    >
                      <span>Request a Quote for this Service</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
