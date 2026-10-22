import React from 'react';
import { Sparkles, Shield, Droplets } from 'lucide-react';
import { businessConfig } from '../config/business';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Brand Card with Official Emblem */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden bg-[#14344A] text-white p-8 border border-[#E5E9EC] shadow-md flex flex-col justify-between min-h-[420px]">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-xs uppercase font-mono tracking-widest text-[#20A39E]">
                  Our Approach
                </span>
                <span className="text-xs text-white/70">Burbank, IL</span>
              </div>

              <div className="my-8 flex flex-col items-center text-center">
                <img
                  src={businessConfig.logoUrl}
                  alt={`${businessConfig.businessName} emblem`}
                  className="w-28 h-28 object-contain rounded-full bg-[#0D2230] p-1 border-2 border-[#20A39E]/60 mb-5 shadow-inner"
                  referrerPolicy="no-referrer"
                />
                <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                  {businessConfig.businessName}
                </h3>
                <p className="text-xs text-white/80 max-w-xs leading-relaxed">
                  Dedicated to eliminating odors, bacteria, and grime from curbside trash bins and living environments.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-white font-semibold">Hygiene First</div>
                  <div className="text-white/60 text-[11px]">Sanitized spaces</div>
                </div>
                <div className="border-x border-white/10">
                  <div className="text-white font-semibold">Direct Quotes</div>
                  <div className="text-white/60 text-[11px]">Clear pricing</div>
                </div>
                <div>
                  <div className="text-white font-semibold">Responsible</div>
                  <div className="text-white/60 text-[11px]">Eco solutions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-2">
              About Clean Can Crew
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14344A] tracking-tight mb-6">
              Cleaning That Makes a Difference
            </h2>

            <div className="space-y-4 text-base text-[#263238]/85 leading-relaxed">
              <p>
                A clean space isn’t just about surface appearances—it’s about how you feel every time you walk through the door, open a cabinet, or roll your trash cans out on collection day.
              </p>
              <p>
                Outdoor waste receptacles are frequently the most overlooked hygiene hazard on any property. Over time, bacteria, food residue, and insects build up, producing foul odors that linger around driveways, garages, and entryways. We created {businessConfig.businessName} to tackle these tough jobs with specialized high-temperature washing and sanitizing equipment.
              </p>
              <p>
                From residential trash bins to detailed interior cleaning, our goal is simple: provide friendly, dependable service that takes the hassle off your plate and leaves your property feeling fresh, orderly, and well cared for.
              </p>
            </div>

            {/* Quality Principles */}
            <div className="mt-8 pt-6 border-t border-[#E5E9EC] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-[#F7F9FA] border border-[#E5E9EC] text-[#20A39E] shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#14344A]">High Heat Wash</div>
                  <div className="text-xs text-slate-500">Breaks down stubborn grease & debris</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-[#F7F9FA] border border-[#E5E9EC] text-[#20A39E] shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#14344A]">Sanitization</div>
                  <div className="text-xs text-slate-500">Neutralizes 99% of bacteria and odors</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-[#F7F9FA] border border-[#E5E9EC] text-[#20A39E] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#14344A]">Fresh Results</div>
                  <div className="text-xs text-slate-500">Cleaner cans and healthier surroundings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
