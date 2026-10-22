import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sliders, Layers } from 'lucide-react';
import { businessConfig, GalleryItem } from '../config/business';
import { BeforeAfterSlider } from './BeforeAfterSlider';

export const Gallery: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [useInteractiveSlider, setUseInteractiveSlider] = useState<boolean>(true);
  const [cardModes, setCardModes] = useState<Record<string, 'after' | 'before'>>({});

  const categories = ['all', 'Trash Can Sanitization', 'Residential Cleaning', 'Deep Cleaning', 'Property Cleaning', 'Commercial Cleaning'];

  const filteredItems =
    selectedCategory === 'all'
      ? businessConfig.gallery
      : businessConfig.gallery.filter((item) => item.category === selectedCategory);

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
        const prevIndex =
          (currentIndex - 1 + businessConfig.gallery.length) % businessConfig.gallery.length;
        setActiveItem(businessConfig.gallery[prevIndex]);
      }
    },
    [activeItem]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when Lightbox modal is open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeItem]);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#F7F8F4] border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-wider text-[#0FB9B1] uppercase mb-2">
              Visual Benchmarks
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A43] tracking-tight mb-3 text-balance">
              Sanitization & Cleaning Results
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#263238]/85">
              Drag the interactive comparison handle on any photo to see the transformative before-and-after clean.
            </p>
          </div>

          {/* Interactive Mode Toggle */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#E5E9EC] shadow-xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setUseInteractiveSlider(true)}
              className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                useInteractiveSlider
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Drag Wipe Slider</span>
            </button>

            <button
              type="button"
              onClick={() => setUseInteractiveSlider(false)}
              className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                !useInteractiveSlider
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Click Toggle</span>
            </button>
          </div>
        </div>

        {/* Category Filters with smooth horizontal touch scroll */}
        <div className="flex items-center gap-2 overflow-x-auto touch-pan-x pb-3 mb-8 text-xs font-semibold scrollbar-none overscroll-x-contain">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[44px] px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0 active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-[#0FB9B1] text-[#102A43] font-extrabold shadow-sm'
                  : 'bg-white text-slate-600 border border-[#E5E9EC] hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Results' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid with Interactive Before/After Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const currentMode = cardModes[item.id] || 'after';
            const displayImg =
              currentMode === 'before' && item.beforeImageUrl
                ? item.beforeImageUrl
                : item.imageUrl;

            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-[#E5E9EC] hover:border-[#0FB9B1]/40 hover:shadow-2xl transition-all duration-300"
              >
                {/* Photo / Slider Container */}
                <div className="relative aspect-4/3 w-full bg-[#102A43] overflow-hidden">
                  {useInteractiveSlider && item.beforeImageUrl ? (
                    <BeforeAfterSlider
                      beforeImage={item.beforeImageUrl}
                      afterImage={item.imageUrl}
                      beforeAlt={`${item.title} - Before`}
                      afterAlt={`${item.title} - After clean`}
                      className="w-full h-full"
                    />
                  ) : (
                    <>
                      <img
                        src={displayImg}
                        alt={item.title}
                        className="w-full h-full object-cover img-zoom"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Mode switcher overlay */}
                      <div className="absolute top-3 left-3 flex items-center bg-black/70 backdrop-blur-md p-1 rounded-xl z-20 border border-white/10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCardModes((prev) => ({ ...prev, [item.id]: 'before' }));
                          }}
                          className={`min-h-[36px] px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                            currentMode === 'before'
                              ? 'bg-[#102A43] text-white shadow-xs'
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
                          className={`min-h-[36px] px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                            currentMode === 'after'
                              ? 'bg-[#0FB9B1] text-[#102A43] shadow-xs'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          After Clean
                        </button>
                      </div>
                    </>
                  )}

                  {/* Expand Lightbox Button with 44px touch target */}
                  <button
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-xl bg-black/70 text-white hover:bg-black/90 active:scale-95 transition-all z-30 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white border border-white/10 shadow-md"
                    aria-label={`Enlarge ${item.title}`}
                    title="Open in full screen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Information Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0FB9B1] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#102A43] mb-1.5 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#263238]/80 leading-relaxed mb-4">
                      {item.afterDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E9EC] flex items-center justify-between text-xs">
                    {useInteractiveSlider ? (
                      <span className="text-slate-400 font-medium">
                        Drag handle left/right to compare
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleCardMode(item.id)}
                        className="text-[#0FB9B1] font-bold hover:underline cursor-pointer min-h-[36px] flex items-center"
                      >
                        Toggle to {currentMode === 'after' ? 'Before' : 'Clean'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveItem(item)}
                      className="text-[#102A43] font-bold hover:text-[#0FB9B1] cursor-pointer min-h-[36px] flex items-center"
                    >
                      Enlarge &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical Transparency Disclaimer */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E9EC] text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <span>
            <strong>Transparency Notice:</strong> Photographs represent our sanitization benchmark. Past customer project photos will be added as verified by the owner.
          </span>
          <a
            href={businessConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0FB9B1] hover:underline whitespace-nowrap font-bold"
          >
            Visit @cleaningservice619 on Instagram &rarr;
          </a>
        </div>
      </div>

      {/* Lightbox Modal with Full Interactive Slider */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative bg-[#102A43] rounded-3xl max-w-4xl w-full border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-[#0D2230] shrink-0">
              <div className="min-w-0 pr-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#0FB9B1] block truncate">
                  {activeItem.category}
                </span>
                <h3 id="modal-title" className="text-base sm:text-lg font-bold text-white truncate">
                  {activeItem.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Full Drag Slider */}
            <div className="relative aspect-4/3 sm:aspect-16/10 max-h-[60dvh] w-full bg-black shrink">
              {activeItem.beforeImageUrl ? (
                <BeforeAfterSlider
                  beforeImage={activeItem.beforeImageUrl}
                  afterImage={activeItem.imageUrl}
                  className="w-full h-full"
                />
              ) : (
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Prev / Next buttons */}
              <button
                type="button"
                onClick={() => {
                  const currentIndex = businessConfig.gallery.findIndex((i) => i.id === activeItem.id);
                  const prevIndex =
                    (currentIndex - 1 + businessConfig.gallery.length) % businessConfig.gallery.length;
                  setActiveItem(businessConfig.gallery[prevIndex]);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 active:scale-95 transition-all z-30"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const currentIndex = businessConfig.gallery.findIndex((i) => i.id === activeItem.id);
                  const nextIndex = (currentIndex + 1) % businessConfig.gallery.length;
                  setActiveItem(businessConfig.gallery[nextIndex]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 active:scale-95 transition-all z-30"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Caption */}
            <div className="px-5 py-3.5 bg-[#0D2230] text-xs text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 shrink-0">
              <span className="line-clamp-2 sm:line-clamp-none">
                <strong>After Clean:</strong> {activeItem.afterDescription}
              </span>
              <span className="text-slate-400 font-mono text-[10px] hidden sm:inline whitespace-nowrap">
                Drag slider or use arrow keys (← / →)
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
