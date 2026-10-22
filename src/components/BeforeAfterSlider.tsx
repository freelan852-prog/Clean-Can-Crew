import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt = 'Before cleaning',
  afterAlt = 'After cleaning',
  beforeLabel = 'Before',
  afterLabel = 'After Clean',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative select-none overflow-hidden rounded-2xl cursor-ew-resize touch-pan-y ${className}`}
      role="slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Interactive before and after comparison slider"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setSliderPosition((prev) => Math.max(0, prev - 5));
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setSliderPosition((prev) => Math.min(100, prev + 5));
        }
      }}
    >
      {/* Background (After / Clean Result Image) */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
        loading="lazy"
      />

      {/* Foreground (Before / Dirty Condition Image) clipped to sliderPosition */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Persistent Before and After Labels */}
      <div className="absolute top-3 left-3 bg-[#102A43]/85 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/20 pointer-events-none shadow-sm">
        {beforeLabel}
      </div>

      <div className="absolute top-3 right-3 bg-[#0FB9B1]/95 backdrop-blur-md text-[#102A43] text-[10px] sm:text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-white/30 pointer-events-none shadow-sm">
        {afterLabel}
      </div>

      {/* Vertical Slider Handle & Divider Line */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Vertical divider line */}
        <div className="absolute top-0 bottom-0 w-0.5 -ml-[1px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

        {/* Center Round Draggable Grip Handle with $\ge 44px$ touch target */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-[#102A43] shadow-2xl border-2 border-[#0FB9B1] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 touch-none pointer-events-auto"
          aria-hidden="true"
        >
          <svg
            className="w-4 h-4 text-[#102A43]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
          </svg>
        </div>
      </div>
    </div>
  );
};
