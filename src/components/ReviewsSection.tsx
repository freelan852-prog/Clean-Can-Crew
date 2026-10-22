import React from 'react';
import { Star, MessageCircleHeart, Instagram } from 'lucide-react';
import { businessConfig } from '../config/business';

interface ReviewsSectionProps {
  onQuoteClick: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onQuoteClick }) => {
  const hasVerifiedReviews = businessConfig.testimonials && businessConfig.testimonials.length > 0;

  return (
    <section className="py-20 bg-white border-b border-[#E5E9EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasVerifiedReviews ? (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-2">
                Verified Feedback
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14344A] tracking-tight mb-4">
                What Our Customers Say
              </h2>
              <p className="text-base text-[#263238]/80">
                Direct experiences from verified clients across our service locations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businessConfig.testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-xl bg-[#F7F9FA] border border-[#E5E9EC] flex flex-col justify-between"
                >
                  <div>
                    {t.rating && (
                      <div className="flex items-center gap-1 mb-3 text-amber-500">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500" />
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-[#263238] leading-relaxed italic mb-4">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E9EC] flex items-center justify-between text-xs">
                    <span className="font-bold text-[#14344A]">{t.author}</span>
                    {t.location && <span className="text-slate-500">{t.location}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* General Customer Experience & Commitment Section (Active by default per instructions) */
          <div className="max-w-4xl mx-auto bg-[#F7F9FA] rounded-2xl border border-[#E5E9EC] p-8 sm:p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E9EC] text-[#20A39E] flex items-center justify-center mx-auto mb-6 shadow-2xs">
              <MessageCircleHeart className="w-6 h-6" />
            </div>

            <div className="text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-2">
              Our Service Standards
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14344A] tracking-tight mb-4">
              Committed to Exceptional Customer Experiences
            </h2>

            <p className="text-base text-[#263238]/85 max-w-2xl mx-auto leading-relaxed mb-6">
              We hold ourselves to high cleanliness, sanitization, and punctuality standards.
              Every service is delivered with attention to detail and honest communication.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto mb-8 bg-white p-5 rounded-xl border border-[#E5E9EC]">
              <div>
                <div className="font-bold text-[#14344A] text-sm">Respect for Property</div>
                <div className="text-xs text-slate-500 mt-1">Careful handling of your cans, fixtures, and surfaces.</div>
              </div>
              <div className="sm:border-l sm:border-[#E5E9EC] sm:pl-4">
                <div className="font-bold text-[#14344A] text-sm">Clear Follow-Up</div>
                <div className="text-xs text-slate-500 mt-1">Direct confirmation on pricing, scope, and timing.</div>
              </div>
              <div className="sm:border-l sm:border-[#E5E9EC] sm:pl-4">
                <div className="font-bold text-[#14344A] text-sm">Customer Care</div>
                <div className="text-xs text-slate-500 mt-1">We address feedback promptly to ensure your satisfaction.</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onQuoteClick}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#20A39E] hover:bg-[#1B8985] active:bg-[#16706D] rounded-lg transition-colors cursor-pointer"
              >
                Experience the Difference — Request a Quote
              </button>

              <a
                href={businessConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#14344A] hover:bg-white rounded-lg transition-colors border border-[#E5E9EC]"
              >
                <Instagram className="w-4 h-4 text-[#20A39E]" />
                <span>See Our Updates on Instagram</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
