import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { businessConfig, GalleryItem } from '../config/business';
import { IllustrationVisual } from './IllustrationVisual';

export const Gallery: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [activeMode, setActiveMode] = useState<'after' | 'before'>('after');
  const [cardModes, setCardModes] = useState<Record<string, 'after' | 'before'>>({});

  const toggleCardMode = (id: string) => {
    setCardModes((prev) => ({
      ...prev,
      [id]: prev[id] === 'before' ? 'after' : 'before',
    }));
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activeItem) return;

      if (e.key === 'Escape') {
        setActiveItem(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = businessConfig.gallery.findIndex((i) => i.id === activeItem.id);
        const nextIndex = (currentIndex + 1) % businessConfig.gallery.length;
        setActiveItem(businessConfig.gallery[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = businessConfig.gallery.findIndex((i) => i.id === activeItem.id);
        const prevIndex = (currentIndex - 1 + businessConfig.gallery.length) % businessConfig.gallery.length;
        setActiveItem(businessConfig.gallery[prevIndex]);
      }
    },
    [activeItem]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="gallery" className="py-20 bg-[#F7F9FA] border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-2">
              Visual Benchmarks
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14344A] tracking-tight mb-3">
              Sanitization & Cleaning Results
            </h2>
            <p className="text-base text-[#263238]/80">
              Compare our standard clean and sanitized conditions against unwashed, high-traffic spaces.
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-white px-4 py-2.5 rounded-lg border border-[#E5E9EC] self-start md:self-auto">
            Interactive preview: toggle Before / After on any card
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessConfig.gallery.map((item) => {
            const currentMode = cardModes[item.id] || 'after';

            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-xl overflow-hidden bg-white border border-[#E5E9EC] hover:shadow-md transition-all duration-200"
              >
                {/* Visual Canvas */}
                <div className="relative aspect-4/3 w-full bg-[#14344A] overflow-hidden">
                  <IllustrationVisual
                    type={item.svgSceneType}
                    mode={currentMode}
                    className="h-full transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Mode switcher overlay */}
                  <div className="absolute top-3 left-3 flex items-center bg-black/60 backdrop-blur-xs p-1 rounded-lg z-20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCardModes((prev) => ({ ...prev, [item.id]: 'before' }));
                      }}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                        currentMode === 'before'
                          ? 'bg-[#14344A] text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Before
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCardModes((prev) => ({ ...prev, [item.id]: 'after' }));
                      }}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                        currentMode === 'after'
                          ? 'bg-[#20A39E] text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      After Clean
                    </button>
                  </div>

                  {/* Expand Lightbox Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveItem(item);
                      setActiveMode(currentMode);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors z-20 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`Enlarge ${item.title}`}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Information Footer */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#20A39E] mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-[#14344A] mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#263238]/80 leading-relaxed">
                      {currentMode === 'after' ? item.afterDescription : item.beforeDescription}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E5E9EC] flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => toggleCardMode(item.id)}
                      className="text-[#20A39E] font-semibold hover:underline cursor-pointer"
                    >
                      Switch to {currentMode === 'after' ? 'Before' : 'After'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveItem(item);
                        setActiveMode(currentMode);
                      }}
                      className="text-slate-500 hover:text-[#14344A] cursor-pointer"
                    >
                      Inspect in Full View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical disclaimer note per instructions */}
        <div className="mt-10 p-4 rounded-lg bg-white border border-[#E5E9EC] text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            <strong>Transparency Notice:</strong> Images depict illustrated service benchmarks representative of our cleaning and sanitization processes. Customer project photos will be published once verified by the owner.
          </span>
          <a
            href={businessConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#20A39E] hover:underline whitespace-nowrap font-medium"
          >
            Visit @cleaningservice619 on Instagram &rarr;
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative bg-[#14344A] rounded-2xl max-w-3xl w-full border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#20A39E]">
                  {activeItem.category}
                </span>
                <h3 id="modal-title" className="text-lg font-bold text-white">
                  {activeItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white/10 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setActiveMode('before')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      activeMode === 'before'
                        ? 'bg-white text-[#14344A]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMode('after')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      activeMode === 'after'
                        ? 'bg-[#20A39E] text-white'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    After Clean
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="relative aspect-16/10 w-full bg-[#0D2230]">
              <IllustrationVisual
                type={activeItem.svgSceneType}
                mode={activeMode}
                className="h-full"
              />

              {/* Prev / Next buttons */}
              <button
                type="button"
                onClick={() => {
                  const currentIndex = businessConfig.gallery.findIndex((i) => i.id === activeItem.id);
                  const prevIndex = (currentIndex - 1 + businessConfig.gallery.length) % businessConfig.gallery.length;
                  setActiveItem(businessConfig.gallery[prevIndex]);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const currentIndex = businessConfig.gallery.findIndex((i) => i.id === activeItem.id);
                  const nextIndex = (currentIndex + 1) % businessConfig.gallery.length;
                  setActiveItem(businessConfig.gallery[nextIndex]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Caption */}
            <div className="px-6 py-4 bg-[#0F2839] text-xs text-white/85 flex items-center justify-between">
              <span>
                <strong>{activeMode === 'after' ? 'After Result:' : 'Prior Condition:'}</strong>{' '}
                {activeMode === 'after'
                  ? activeItem.afterDescription
                  : activeItem.beforeDescription}
              </span>
              <span className="text-slate-400 font-mono hidden sm:inline">
                ESC to close · ← / → to navigate
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
