import React from 'react';
import { Trash2, Home, Sparkles, Key, Building2, Hammer, ArrowRight, Check } from 'lucide-react';
import { businessConfig, ServiceItem } from '../config/business';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const enabledServices = businessConfig.services.filter((s) => s.enabled);
  const marqueeService = enabledServices.find((s) => s.isMarquee) || enabledServices[0];
  const standardServices = enabledServices.filter((s) => s.id !== marqueeService?.id);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trash2':
        return <Trash2 className="w-5 h-5 text-[#0FB9B1]" />;
      case 'Home':
        return <Home className="w-5 h-5 text-[#0FB9B1]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#0FB9B1]" />;
      case 'Key':
        return <Key className="w-5 h-5 text-[#0FB9B1]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#0FB9B1]" />;
      case 'Hammer':
        return <Hammer className="w-5 h-5 text-[#0FB9B1]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#0FB9B1]" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#F7F8F4] border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold tracking-wider text-[#0FB9B1] uppercase mb-2">
            Tailored Property Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A43] tracking-tight mb-4 text-balance">
            Professional Cleaning. A Fresher Everyday.
          </h2>
          <p className="text-base sm:text-lg text-[#263238]/85 leading-relaxed">
            Discover cleaning solutions designed to help keep your bins and property looking their best.
            We use specialized high-temperature washing equipment and targeted care.
          </p>
        </div>

        {/* Asymmetric Service Showcase */}
        {enabledServices.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#E5E9EC]">
            <h3 className="text-lg font-bold text-[#102A43] mb-2">
              Custom Cleaning Enquiries
            </h3>
            <p className="text-sm text-slate-600 mb-6 max-w-lg mx-auto">
              We provide tailored cleaning solutions for residential and commercial spaces.
              Get in touch to describe your requirements.
            </p>
            <button
              onClick={() => onSelectService('other')}
              className="px-6 py-3 text-sm font-bold text-[#102A43] bg-[#0FB9B1] rounded-xl hover:bg-[#D4F36A] transition-colors"
            >
              Enquire About Available Services
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Marquee Service: Trash Can Sanitization */}
            {marqueeService && (
              <div className="group rounded-2xl overflow-hidden bg-[#102A43] text-white border border-[#163B5C] shadow-lg grid grid-cols-1 lg:grid-cols-12 transition-all duration-300">
                {/* Left Column: Real Photography */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                  <img
                    src={marqueeService.imageUrl}
                    alt={marqueeService.title}
                    className="w-full h-full object-cover img-zoom"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#102A43] via-transparent to-transparent opacity-80 pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-[#D4F36A] text-[#102A43] text-xs font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                    Signature Specialty
                  </div>
                </div>

                {/* Right Column: Information & Actions */}
                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                        {getServiceIcon(marqueeService.icon)}
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {marqueeService.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
                      {marqueeService.description}
                    </p>

                    {/* Features list */}
                    {marqueeService.features && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                        {marqueeService.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                            <Check className="w-4 h-4 text-[#0FB9B1] shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <span className="text-xs text-[#0FB9B1] font-mono">
                      200°F Sanitizing Wash · Burbank, IL
                    </span>
                    <button
                      onClick={() => onSelectService(marqueeService.id)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-[#102A43] bg-[#0FB9B1] hover:bg-[#D4F36A] active:bg-[#0B9690] rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Request a Quote for this Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {standardServices.map((service: ServiceItem) => (
                <div
                  key={service.id}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E5E9EC] hover:border-[#0FB9B1]/40 hover:shadow-lg transition-all duration-300"
                >
                  {/* Real Photo Thumbnail */}
                  <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover img-zoom"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 p-2 rounded-lg bg-white/90 backdrop-blur-xs text-[#0FB9B1] shadow-xs">
                      {getServiceIcon(service.icon)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#102A43] tracking-tight mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#263238]/80 leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-1.5 mb-5">
                          {service.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-[11px] text-[#263238]">
                              <Check className="w-3 h-3 text-[#0FB9B1] shrink-0" />
                              <span className="truncate">{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#E5E9EC]">
                      <button
                        onClick={() => onSelectService(service.id)}
                        className="w-full inline-flex items-center justify-between px-3.5 py-2.5 text-xs font-bold text-[#102A43] bg-[#F7F8F4] group-hover:bg-[#0FB9B1] group-hover:text-[#102A43] rounded-lg transition-colors cursor-pointer"
                      >
                        <span>Request a Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
