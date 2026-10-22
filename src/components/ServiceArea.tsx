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
        message: `Great news! ZIP code ${cleanZip} is directly within our primary service route in Burbank and nearby Chicagoland communities.`,
      });
    } else {
      setCheckResult({
        status: 'enquire',
        message: `ZIP code ${cleanZip} may be within our extended service range. Request a quote and we'll confirm our route availability for your address!`,
      });
    }
  };

  return (
    <section id="service-area" className="py-20 bg-[#DDF7EF]/30 border-b border-[#DDF7EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Coverage details */}
          <div className="lg:col-span-7">
            <div className="text-xs font-bold tracking-wider text-[#0FB9B1] uppercase mb-2">
              Coverage & Locations
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A43] tracking-tight mb-4 text-balance">
              Serving {businessConfig.address} & Surrounding Communities
            </h2>
            <p className="text-base sm:text-lg text-[#263238]/85 leading-relaxed mb-6">
              Our mobile wash and sanitization crew is based in Burbank, IL. We regularly schedule curbside trash can sanitization and property cleaning across local neighborhoods to keep homes hygienic and odor-free.
            </p>

            {/* Neighborhood Pills/List */}
            <div className="mb-8">
              <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider block mb-3">
                Key Service Locations:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {businessConfig.serviceAreaCoverage.map((area, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E5E9EC] text-xs font-bold text-[#102A43] shadow-2xs"
                  >
                    <MapPin className="w-4 h-4 text-[#0FB9B1] shrink-0" />
                    <span className="truncate">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive ZIP checker */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E9EC] shadow-sm">
              <label htmlFor="zipCheck" className="block text-xs font-bold text-[#102A43] mb-2 uppercase tracking-wide">
                Check Your ZIP Code:
              </label>
              <form onSubmit={handleCheckCoverage} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    id="zipCheck"
                    type="text"
                    value={zipInput}
                    onChange={(e) => setZipInput(e.target.value)}
                    placeholder="Enter 5-digit ZIP (e.g. 60459)"
                    maxLength={5}
                    className="w-full min-h-[44px] px-4 py-2.5 text-base sm:text-sm rounded-xl border border-[#E5E9EC] focus:border-[#0FB9B1] focus:outline-hidden text-[#263238]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="min-h-[44px] px-6 py-2.5 text-xs font-bold text-white bg-[#102A43] hover:bg-[#163B5C] active:bg-[#0D2230] rounded-xl transition-colors cursor-pointer shrink-0 flex items-center justify-center"
                >
                  Check Area
                </button>
              </form>

              {checkResult.status !== 'idle' && (
                <div
                  className={`mt-4 p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                    checkResult.status === 'served'
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}
                >
                  <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <div className="flex-1">
                    <p>{checkResult.message}</p>
                    <button
                      type="button"
                      onClick={onQuoteClick}
                      className="mt-1.5 font-bold text-[#0FB9B1] underline hover:no-underline cursor-pointer"
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
            <div className="bg-white rounded-3xl p-7 border border-[#E5E9EC] shadow-md flex flex-col items-center text-center">
              <div className="w-full aspect-4/3 rounded-2xl bg-[#102A43] relative overflow-hidden flex items-center justify-center mb-6 border border-[#163B5C]">
                {/* Stylized vector map */}
                <svg className="w-full h-full opacity-60" viewBox="0 0 300 220" fill="none">
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#163B5C" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="110" x2="300" y2="110" stroke="#0FB9B1" strokeWidth="1.5" />
                  <line x1="0" y1="170" x2="300" y2="170" stroke="#163B5C" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="80" y1="0" x2="80" y2="220" stroke="#163B5C" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="160" y1="0" x2="160" y2="220" stroke="#0FB9B1" strokeWidth="1.5" />
                  <line x1="240" y1="0" x2="240" y2="220" stroke="#163B5C" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="160" cy="110" r="75" stroke="#0FB9B1" strokeWidth="1" strokeDasharray="6 6" fill="rgba(15,185,177,0.08)" />
                  <circle cx="160" cy="110" r="45" stroke="#0FB9B1" strokeWidth="1.5" fill="rgba(15,185,177,0.18)" />
                  <circle cx="160" cy="110" r="6" fill="#D4F36A" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#102A43] border-2 border-[#0FB9B1] flex items-center justify-center mb-2 shadow-lg">
                    <MapPin className="w-7 h-7 text-[#0FB9B1]" />
                  </div>
                  <div className="text-white font-extrabold text-base tracking-tight">
                    Burbank, IL Hub
                  </div>
                  <div className="text-xs text-[#D4F36A] font-mono mt-0.5">
                    Local Curbside Mobile Service
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#102A43] mb-1.5">
                Local Mobile Service
              </h3>
              <p className="text-xs text-slate-500 mb-6 max-w-sm">
                Our self-contained sanitization wash vehicles come directly to your curbside on scheduled days.
              </p>

              <button
                onClick={onQuoteClick}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 text-xs font-bold text-[#102A43] bg-[#0FB9B1] hover:bg-[#D4F36A] rounded-xl transition-colors cursor-pointer shadow-xs"
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
