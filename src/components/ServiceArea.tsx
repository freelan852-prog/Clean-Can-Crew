import React, { useState } from 'react';
import { MapPin, Check, Search, ArrowRight } from 'lucide-react';
import { businessConfig } from '../config/business';

interface ServiceAreaProps {
  onQuoteClick: () => void;
}

export const ServiceArea: React.FC<ServiceAreaProps> = ({ onQuoteClick }) => {
  const [zipInput, setZipInput] = useState('');
  const [checkResult, setCheckResult] = useState<{
    status: 'idle' | 'served' | 'enquire';
    message: string;
  }>({ status: 'idle', message: '' });

  // Known Burbank & nearby Cook County zip codes for friendly instant feedback
  const primaryZips = ['60459', '60453', '60455', '60456', '60457', '60458', '60415', '60482'];

  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    if (primaryZips.includes(cleanZip)) {
      setCheckResult({
        status: 'served',
        message: `Great news! ZIP code ${cleanZip} is directly within our regular service area in Burbank and surrounding communities.`,
      });
    } else {
      setCheckResult({
        status: 'enquire',
        message: `ZIP code ${cleanZip} may be within our extended route. Submit your quote request and we'll confirm our schedule for your area!`,
      });
    }
  };

  return (
    <section id="service-area" className="py-20 bg-[#F7F9FA] border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Coverage details */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-2">
              Coverage & Locations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14344A] tracking-tight mb-4">
              Serving {businessConfig.address} & Surrounding Communities
            </h2>
            <p className="text-base text-[#263238]/80 leading-relaxed mb-6">
              Our mobile wash and cleaning crew is based in Burbank, IL. We regularly schedule curbside trash can sanitization and residential cleaning across local neighborhoods to keep communities hygienic and odor-free.
            </p>

            {/* Neighborhood Pills/List */}
            <div className="mb-8">
              <span className="text-xs font-bold text-[#14344A] uppercase tracking-wider block mb-3">
                Key Service Locations:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {businessConfig.serviceAreaCoverage.map((area, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#E5E9EC] text-xs font-medium text-[#263238]"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#20A39E] shrink-0" />
                    <span className="truncate">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive ZIP checker */}
            <div className="bg-white p-5 rounded-xl border border-[#E5E9EC]">
              <label htmlFor="zipCheck" className="block text-xs font-bold text-[#14344A] mb-2">
                Check Your ZIP Code:
              </label>
              <form onSubmit={handleCheckCoverage} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    id="zipCheck"
                    type="text"
                    value={zipInput}
                    onChange={(e) => setZipInput(e.target.value)}
                    placeholder="Enter 5-digit ZIP code (e.g. 60459)"
                    maxLength={5}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E5E9EC] focus:border-[#20A39E] focus:outline-hidden text-[#263238]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#14344A] hover:bg-[#1E4560] rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Check Area
                </button>
              </form>

              {checkResult.status !== 'idle' && (
                <div
                  className={`mt-3 p-3 rounded-lg text-xs flex items-start gap-2 ${
                    checkResult.status === 'served'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p>{checkResult.message}</p>
                    <button
                      type="button"
                      onClick={onQuoteClick}
                      className="mt-1.5 font-bold underline hover:no-underline cursor-pointer"
                    >
                      Proceed to Request a Quote &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Visual Area Map Representation */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E9EC] shadow-xs flex flex-col items-center text-center">
              <div className="w-full aspect-4/3 rounded-xl bg-[#14344A] relative overflow-hidden flex items-center justify-center mb-6 border border-[#E5E9EC]">
                {/* Chicagoland / Burbank stylized visual vector */}
                <svg className="w-full h-full opacity-60" viewBox="0 0 300 220" fill="none">
                  {/* Grid roads */}
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="110" x2="300" y2="110" stroke="#20A39E" strokeWidth="1.5" />
                  <line x1="0" y1="170" x2="300" y2="170" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="80" y1="0" x2="80" y2="220" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="160" y1="0" x2="160" y2="220" stroke="#20A39E" strokeWidth="1.5" />
                  <line x1="240" y1="0" x2="240" y2="220" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Service Radius Rings */}
                  <circle cx="160" cy="110" r="75" stroke="#20A39E" strokeWidth="1" strokeDasharray="6 6" fill="rgba(32,163,158,0.08)" />
                  <circle cx="160" cy="110" r="45" stroke="#20A39E" strokeWidth="1.5" fill="rgba(32,163,158,0.18)" />

                  {/* Central Hub Pin */}
                  <circle cx="160" cy="110" r="6" fill="#20A39E" />
                  <circle cx="160" cy="110" r="14" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#14344A] border-2 border-[#20A39E] flex items-center justify-center mb-2 shadow-lg">
                    <MapPin className="w-6 h-6 text-[#20A39E]" />
                  </div>
                  <div className="text-white font-bold text-sm tracking-tight">
                    Burbank, IL Hub
                  </div>
                  <div className="text-xs text-white/70 font-mono">
                    Cook County & Chicagoland
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#14344A] mb-1">
                Local Mobile Service
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Our self-contained sanitization wash vehicles come directly to your curbside on scheduled days.
              </p>

              <button
                onClick={onQuoteClick}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#20A39E] hover:bg-[#1B8985] rounded-lg transition-colors cursor-pointer"
              >
                <span>Check Availability for Your Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
