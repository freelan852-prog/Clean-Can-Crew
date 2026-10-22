import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { businessConfig } from '../config/business';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-[#E5E9EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-2">
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14344A] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#263238]/80">
            Have questions about trash can cleaning, residential services, or scheduling? Find honest answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {businessConfig.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className="rounded-xl border border-[#E5E9EC] bg-[#F7F9FA] transition-colors"
              >
                <h3>
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#20A39E] rounded-xl"
                  >
                    <span className="text-base font-bold text-[#14344A] tracking-tight">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#20A39E] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="px-6 pb-5 pt-1 text-sm text-[#263238]/85 leading-relaxed border-t border-[#E5E9EC]/50"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions prompt */}
        <div className="mt-12 p-6 rounded-xl bg-white border border-[#E5E9EC] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-lg bg-[#F7F9FA] border border-[#E5E9EC] text-[#20A39E]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#14344A]">Have a specific cleaning request?</div>
              <div className="text-xs text-slate-500">Reach out through our quote form or message us directly on Instagram.</div>
            </div>
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#14344A] hover:bg-[#1E4560] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Contact the Team
          </a>
        </div>
      </div>
    </section>
  );
};
