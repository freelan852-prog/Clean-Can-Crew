import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { businessConfig } from '../config/business';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-[#E5E9EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-wider text-[#0FB9B1] uppercase mb-2">
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A43] tracking-tight mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#263238]/85">
            Have questions about trash can cleaning, residential services, or scheduling? Find honest answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {businessConfig.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-[#0FB9B1]/40 bg-[#DDF7EF]/20 shadow-xs'
                    : 'border-[#E5E9EC] bg-[#F7F8F4] hover:border-slate-300'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0FB9B1] rounded-2xl"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#102A43] tracking-tight">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0FB9B1] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#102A43]' : ''
                      }`}
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#263238]/90 leading-relaxed border-t border-[#0FB9B1]/20"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Help prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-[#F7F8F4] border border-[#E5E9EC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="p-3 rounded-xl bg-white border border-[#E5E9EC] text-[#0FB9B1] shadow-2xs">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#102A43]">Have a specific cleaning request?</div>
              <div className="text-xs text-slate-500">Reach out through our quote form or message us directly on Instagram.</div>
            </div>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 text-xs font-bold text-white bg-[#102A43] hover:bg-[#163B5C] rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            Contact the Team
          </a>
        </div>
      </div>
    </section>
  );
};
