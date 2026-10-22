import React from 'react';

interface IllustrationVisualProps {
  type: 'trash-can-sanitization' | 'kitchen-gleam' | 'bathroom-sparkle' | 'living-room-tidy' | 'deck-patio' | 'office-clean' | 'hero-sparkle';
  mode?: 'before' | 'after' | 'hero';
  className?: string;
}

export const IllustrationVisual: React.FC<IllustrationVisualProps> = ({
  type,
  mode = 'after',
  className = '',
}) => {
  if (type === 'trash-can-sanitization') {
    const isClean = mode === 'after' || mode === 'hero';
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden ${
          isClean
            ? 'bg-gradient-to-b from-[#14344A] via-[#1A425E] to-[#122D40]'
            : 'bg-gradient-to-b from-[#3D3A37] via-[#2F2C2A] to-[#22201F]'
        } ${className}`}
      >
        {/* Background elements */}
        {isClean ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(32,163,158,0.35),transparent_70%)]" />
            {/* Water spray streams */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
              viewBox="0 0 400 300"
              fill="none"
            >
              <path
                d="M50 30 C150 120 200 180 350 250"
                stroke="#20A39E"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <path
                d="M380 40 C280 130 220 190 60 260"
                stroke="#64D2CE"
                strokeWidth="1.5"
                strokeDasharray="4 8"
              />
            </svg>
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(120,100,80,0.25),transparent_65%)]" />
        )}

        {/* Can Illustration */}
        <div className="relative z-10 flex flex-col items-center">
          <svg
            width="170"
            height="210"
            viewBox="0 0 170 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-xl"
          >
            {/* Bin Lid */}
            <path
              d="M20 38 C20 32 30 24 85 24 C140 24 150 32 150 38 L146 50 H24 L20 38 Z"
              fill={isClean ? '#1E293B' : '#2A2927'}
              stroke={isClean ? '#38BDF8' : '#57534E'}
              strokeWidth="2"
            />
            {/* Lid Handle */}
            <rect
              x="62"
              y="16"
              width="46"
              height="10"
              rx="4"
              fill={isClean ? '#334155' : '#3F3F46'}
            />

            {/* Bin Body */}
            <path
              d="M26 50 L38 185 C39 192 46 197 53 197 H117 C124 197 131 192 132 185 L144 50 H26 Z"
              fill={isClean ? '#0F172A' : '#1C1917'}
              stroke={isClean ? '#20A39E' : '#44403C'}
              strokeWidth="2.5"
            />

            {/* Wheels */}
            <circle
              cx="36"
              cy="188"
              r="14"
              fill="#0F172A"
              stroke={isClean ? '#64748B' : '#57534E'}
              strokeWidth="3"
            />
            <circle cx="36" cy="188" r="5" fill={isClean ? '#20A39E' : '#78716C'} />
            <circle
              cx="134"
              cy="188"
              r="14"
              fill="#0F172A"
              stroke={isClean ? '#64748B' : '#57534E'}
              strokeWidth="3"
            />
            <circle cx="134" cy="188" r="5" fill={isClean ? '#20A39E' : '#78716C'} />

            {/* Clean vs Grime details */}
            {isClean ? (
              <>
                {/* Clean rib highlights */}
                <line x1="58" y1="65" x2="64" y2="175" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1="85" y1="65" x2="85" y2="175" stroke="#20A39E" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                <line x1="112" y1="65" x2="106" y2="175" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                {/* High shine sparkles */}
                <path
                  d="M78 85 L81 92 L88 95 L81 98 L78 105 L75 98 L68 95 L75 92 Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M115 125 L117 130 L122 132 L117 134 L115 139 L113 134 L108 132 L113 130 Z"
                  fill="#64D2CE"
                />
                <path
                  d="M48 110 L49 114 L53 115 L49 116 L48 120 L47 116 L43 115 L47 114 Z"
                  fill="#FFFFFF"
                />
              </>
            ) : (
              <>
                {/* Grime patches */}
                <ellipse cx="65" cy="95" rx="16" ry="10" fill="#44403C" opacity="0.8" />
                <ellipse cx="105" cy="130" rx="20" ry="14" fill="#38302A" opacity="0.9" />
                <ellipse cx="80" cy="155" rx="28" ry="8" fill="#292524" opacity="0.7" />
                <path d="M45 75 Q 52 90 48 115" stroke="#57534E" strokeWidth="3" opacity="0.6" />
                <path d="M120 80 Q 115 105 122 135" stroke="#44403C" strokeWidth="4" opacity="0.7" />
              </>
            )}
          </svg>
        </div>

        {/* Clean status badge */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80">
          <span className="tracking-wide">
            {isClean ? 'HOT PRESSURE SANITIZED' : 'UNWASHED RESIDUE'}
          </span>
          <span className="text-[#20A39E] font-semibold">
            {isClean ? '200°F CLEAN' : 'ODOR ACCUMULATION'}
          </span>
        </div>
      </div>
    );
  }

  if (type === 'kitchen-gleam') {
    const isClean = mode === 'after';
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden ${
          isClean ? 'bg-[#14344A]' : 'bg-[#292524]'
        } ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(32,163,158,0.25),transparent_70%)]" />
        <svg width="220" height="160" viewBox="0 0 220 160" fill="none" className="z-10">
          {/* Countertop */}
          <rect x="20" y="80" width="180" height="55" rx="4" fill={isClean ? '#1E293B' : '#1C1917'} stroke={isClean ? '#20A39E' : '#57534E'} strokeWidth="2" />
          <line x1="20" y1="95" x2="200" y2="95" stroke={isClean ? '#334155' : '#44403C'} strokeWidth="1.5" />
          {/* Cooktop elements */}
          <circle cx="65" cy="88" r="12" fill={isClean ? '#0F172A' : '#292524'} stroke={isClean ? '#38BDF8' : '#78716C'} strokeWidth="1.5" />
          <circle cx="110" cy="88" r="10" fill={isClean ? '#0F172A' : '#292524'} stroke={isClean ? '#38BDF8' : '#78716C'} strokeWidth="1.5" />
          <circle cx="155" cy="88" r="14" fill={isClean ? '#0F172A' : '#292524'} stroke={isClean ? '#38BDF8' : '#78716C'} strokeWidth="1.5" />
          {/* Backsplash tile lines */}
          <line x1="30" y1="35" x2="190" y2="35" stroke={isClean ? '#334155' : '#44403C'} strokeWidth="1" strokeDasharray="10 5" />
          <line x1="30" y1="55" x2="190" y2="55" stroke={isClean ? '#334155' : '#44403C'} strokeWidth="1" strokeDasharray="10 5" />
          {isClean ? (
            <>
              {/* Sparkles */}
              <path d="M150 45 L152 50 L157 52 L152 54 L150 59 L148 54 L143 52 L148 50 Z" fill="#20A39E" />
              <path d="M70 40 L71 43 L74 44 L71 45 L70 48 L69 45 L66 44 L69 43 Z" fill="#FFFFFF" />
            </>
          ) : (
            <ellipse cx="110" cy="88" rx="22" ry="8" fill="#44403C" opacity="0.8" />
          )}
        </svg>
        <div className="absolute bottom-3 left-4 text-xs font-mono text-white/80">
          {isClean ? 'DEEP DEGREASED & POLISHED' : 'GREASE & SPLATTER BUILDUP'}
        </div>
      </div>
    );
  }

  if (type === 'bathroom-sparkle') {
    const isClean = mode === 'after';
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden ${
          isClean ? 'bg-[#14344A]' : 'bg-[#262626]'
        } ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(32,163,158,0.2),transparent_70%)]" />
        <svg width="200" height="160" viewBox="0 0 200 160" fill="none" className="z-10">
          {/* Faucet & Sink Basin */}
          <path d="M50 110 C50 135 150 135 150 110 Z" fill={isClean ? '#0F172A' : '#171717'} stroke={isClean ? '#20A39E' : '#525252'} strokeWidth="2" />
          {/* Chrome faucet */}
          <path d="M100 100 V60 C100 50 115 50 115 65 V72" stroke={isClean ? '#E2E8F0' : '#737373'} strokeWidth="5" strokeLinecap="round" />
          <rect x="94" y="98" width="12" height="6" rx="2" fill={isClean ? '#94A3B8' : '#525252'} />
          {isClean ? (
            <>
              <circle cx="115" cy="80" r="2.5" fill="#38BDF8" />
              <path d="M85 75 L87 79 L91 80 L87 81 L85 85 L83 81 L79 80 L83 79 Z" fill="#20A39E" />
              <path d="M130 95 L131 98 L134 99 L131 100 L130 103 L129 100 L126 99 L129 98 Z" fill="#FFFFFF" />
            </>
          ) : (
            <path d="M100 85 Q 98 100 95 110" stroke="#78716C" strokeWidth="4" opacity="0.7" />
          )}
        </svg>
        <div className="absolute bottom-3 left-4 text-xs font-mono text-white/80">
          {isClean ? 'DESCALED & DISINFECTED' : 'CALCIUM & SOAP DEPOSITS'}
        </div>
      </div>
    );
  }

  // Default interior tidy / exterior clean scene
  const isClean = mode === 'after';
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${
        isClean ? 'bg-[#14344A]' : 'bg-[#262626]'
      } ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(32,163,158,0.22),transparent_65%)]" />
      <svg width="200" height="150" viewBox="0 0 200 150" fill="none" className="z-10">
        <rect x="30" y="40" width="140" height="80" rx="4" fill={isClean ? '#1E293B' : '#171717'} stroke={isClean ? '#20A39E' : '#525252'} strokeWidth="2" />
        <line x1="30" y1="120" x2="170" y2="120" stroke={isClean ? '#64D2CE' : '#737373'} strokeWidth="3" />
        {isClean ? (
          <>
            <path d="M140 55 L142 59 L146 60 L142 61 L140 65 L138 61 L134 60 L138 59 Z" fill="#20A39E" />
            <path d="M70 70 L71 73 L74 74 L71 75 L70 78 L69 75 L66 74 L69 73 Z" fill="#FFFFFF" />
          </>
        ) : (
          <ellipse cx="100" cy="80" rx="30" ry="12" fill="#404040" opacity="0.6" />
        )}
      </svg>
      <div className="absolute bottom-3 left-4 text-xs font-mono text-white/80">
        {isClean ? 'ORGANIZED & REFRESHED' : 'HIGH-TRAFFIC ACCUMULATION'}
      </div>
    </div>
  );
};
