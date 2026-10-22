import React, { useState } from 'react';
import { businessConfig } from '../config/business';

export const FloatingInstagram: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Instagram Social Link"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center"
    >
      <a
        href={businessConfig.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-2.5 p-1.5 sm:p-2.5 rounded-full bg-white text-[#102A43] shadow-xl hover:shadow-2xl border border-slate-200/80 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E1306C]"
        aria-label="Follow Clean Can Crew on Instagram"
      >
        {/* Animated Glow Aura */}
        <span
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] opacity-50 blur-sm group-hover:opacity-90 group-hover:blur-md transition-all duration-300 animate-pulse pointer-events-none"
          aria-hidden="true"
        />

        {/* Instagram Icon with Authentic Gradient and Continuous Subtle Shimmer */}
        <div className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform duration-300 shrink-0">
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </div>

        {/* Text Label that smoothly expands or displays nicely */}
        <div className="relative z-10 pr-2 pl-0.5 hidden sm:flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E1306C]">
              Follow Us
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-ping" />
          </div>
          <span className="text-xs font-bold text-[#102A43] group-hover:text-[#E1306C] transition-colors leading-tight">
            {businessConfig.instagramHandle}
          </span>
        </div>

        {/* Mobile Mini Tooltip Badge on hover */}
        {isHovered && (
          <div className="sm:hidden absolute bottom-full mb-2 right-0 bg-[#102A43] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap animate-in fade-in duration-150">
            Visit @cleaningservice619
          </div>
        )}
      </a>
    </aside>
  );
};
