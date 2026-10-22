import React from 'react';
import { Sparkles, Shield, Droplets, CheckCircle2 } from 'lucide-react';
import { businessConfig } from '../config/business';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Photo Composition with Real Clean Environment Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E5E9EC] shadow-xl aspect-4/3 sm:aspect-5/4 lg:aspect-4/3 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
                alt="Professional meticulous cleaning and sanitization"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/70 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Badge inside photo */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white/50 text-[#102A43] shadow-md flex items-center justify-between">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#0FB9B1]">
                    Quality Standards
                  </div>
                  <div className="text-xs font-bold text-[#102A43]">
                    Deep Sanitization & Hygiene
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-[#0FB9B1]" />
              </div>
            </div>

            {/* Floating Brand Badge Tile with Official Emblem */}
            <div className="absolute -top-4 left-2 sm:-top-8 sm:-left-6 bg-[#102A43] text-white p-2.5 sm:p-3.5 rounded-2xl shadow-xl border border-[#163B5C] flex items-center gap-2.5 sm:gap-3">
              <img
                src={businessConfig.logoUrl}
                alt={businessConfig.businessName}
                className="w-12 h-12 object-contain rounded-full bg-[#163B5C] p-0.5 border border-[#0FB9B1]"
                referrerPolicy="no-referrer"
              />
              <div className="pr-2">
                <div className="text-xs font-bold text-white">Clean Can Crew</div>
                <div className="text-[10px] text-[#D4F36A] font-semibold tracking-wide">
                  Burbank, IL
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7">
            <div className="text-xs font-bold tracking-wider text-[#0FB9B1] uppercase mb-2">
              About Clean Can Crew
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A43] tracking-tight mb-6 text-balance">
              Cleaning That Makes a Difference
            </h2>

            <div className="space-y-4 text-base text-[#263238]/85 leading-relaxed">
              <p>
                A clean space isn’t just about surface appearances—it’s about how you feel every time you walk through the door, open a cabinet, or roll your trash cans out on collection day.
              </p>
              <p>
                Outdoor waste receptacles are frequently the most overlooked hygiene hazard on any property. Over time, bacteria, food residue, and pests build up, producing foul odors that linger around driveways, garages, and entryways. We created {businessConfig.businessName} to tackle these tough jobs with specialized high-temperature washing and sanitizing equipment.
              </p>
              <p>
                From residential trash bins to detailed interior cleaning, our goal is simple: provide dependable, respectful service that takes the chore off your plate and leaves your property feeling fresh, orderly, and well cared for.
              </p>
            </div>

            {/* Quality Principles */}
            <div className="mt-8 pt-6 border-t border-[#E5E9EC] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F8F4] border border-[#E5E9EC]">
                <div className="p-2 rounded-lg bg-white border border-[#E5E9EC] text-[#0FB9B1] shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#102A43]">High Heat Wash</div>
                  <div className="text-xs text-slate-500 mt-0.5">Breaks down grease & built-up grime</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F8F4] border border-[#E5E9EC]">
                <div className="p-2 rounded-lg bg-white border border-[#E5E9EC] text-[#0FB9B1] shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#102A43]">Sanitization</div>
                  <div className="text-xs text-slate-500 mt-0.5">Neutralizes odors & harmful bacteria</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F8F4] border border-[#E5E9EC]">
                <div className="p-2 rounded-lg bg-white border border-[#E5E9EC] text-[#0FB9B1] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#102A43]">Fresh Results</div>
                  <div className="text-xs text-slate-500 mt-0.5">Cleaner bins and welcoming surroundings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
