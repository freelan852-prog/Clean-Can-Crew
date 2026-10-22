import React, { useState, useEffect } from 'react';
import { X, Check, Copy, Settings, Trash2, Download } from 'lucide-react';
import { businessConfig } from '../config/business';

interface OwnerConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StoredLead {
  fullName: string;
  phone: string;
  email?: string;
  serviceId: string;
  propertyType: string;
  zipCode?: string;
  details?: string;
  submittedAt: string;
}

export const OwnerConfigModal: React.FC<OwnerConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'leads'>('guide');
  const [storedLeads, setStoredLeads] = useState<StoredLead[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        const raw = localStorage.getItem('clean_can_crew_leads');
        if (raw) {
          setStoredLeads(JSON.parse(raw));
        }
      } catch {
        setStoredLeads([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const clearLeads = () => {
    localStorage.removeItem('clean_can_crew_leads');
    setStoredLeads([]);
  };

  const exportLeadsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(storedLeads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `leads_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const sampleConfigSnippet = `// Edit in src/config/business.ts:
export const businessConfig: BusinessConfig = {
  businessName: 'Clean Can Crew',
  phone: '(708) 555-0199',             // Your business phone number
  whatsappNumber: '17085550199',        // Your WhatsApp number (country code + number)
  email: 'info@cleancancrew.com',       // Contact email
  address: 'Burbank, IL',               // City / region
  serviceArea: 'Burbank, IL & Surrounding Neighborhoods',
  formSubmissionEndpoint: 'https://formspree.io/f/your_form_id', // Formspree or custom webhook
  // ...
};`;

  const copyConfigSnippet = () => {
    navigator.clipboard.writeText(sampleConfigSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-guide-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#E5E9EC] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E9EC] flex items-center justify-between bg-[#F7F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-md bg-[#14344A] text-white">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 id="owner-guide-title" className="text-base font-bold text-[#14344A]">
                Owner Configuration & Lead Viewer
              </h3>
              <p className="text-xs text-slate-500">
                Centralized settings for Clean Can Crew ({businessConfig.secondaryBrandName})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors cursor-pointer"
            aria-label="Close configuration modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#E5E9EC] bg-[#F7F9FA] px-6 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'guide'
                ? 'border-[#20A39E] text-[#14344A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Configuration Guide
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'border-[#20A39E] text-[#14344A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Stored Enquiries</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#20A39E]/20 text-[#14344A]">
              {storedLeads.length}
            </span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#263238]">
          {activeTab === 'guide' ? (
            <>
              <div className="space-y-3">
                <h4 className="font-bold text-[#14344A] text-sm">
                  1. Updating Contact Information & Services
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  All business data is centralized in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">src/config/business.ts</code>. Simply update the fields below to make real phone numbers, emails, and WhatsApp actions automatically appear throughout the website:
                </p>

                <div className="relative bg-[#0F2839] rounded-xl p-4 font-mono text-white/90 overflow-x-auto">
                  <button
                    type="button"
                    onClick={copyConfigSnippet}
                    className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] bg-white/10 hover:bg-white/20 rounded-md text-white transition-colors"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                  <pre className="text-[11px] leading-relaxed">{sampleConfigSnippet}</pre>
                </div>

                <h4 className="font-bold text-[#14344A] text-sm pt-2">
                  2. Connecting Live Form Submissions
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  To receive quote requests directly in your email inbox:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-700 pl-1">
                  <li>Create a free account at <strong>Formspree.io</strong> or use your preferred webhook provider.</li>
                  <li>Copy your endpoint URL (e.g., <code className="bg-slate-100 px-1 rounded">https://formspree.io/f/xyz123</code>).</li>
                  <li>Paste it into <code className="bg-slate-100 px-1 rounded">formSubmissionEndpoint</code> in <code className="bg-slate-100 px-1 rounded">src/config/business.ts</code>.</li>
                  <li>Quotes will immediately send email notifications directly to you!</li>
                </ol>

                <h4 className="font-bold text-[#14344A] text-sm pt-2">
                  3. Adding Verified Testimonials
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  When customers leave reviews on your Instagram or Google profile, add their quotes to the <code className="bg-slate-100 px-1 rounded">testimonials</code> array in <code className="bg-slate-100 px-1 rounded">src/config/business.ts</code>. The site will automatically transition from the general customer-experience banner to genuine testimonial cards.
                </p>
              </div>
            </>
          ) : (
            <div>
              {storedLeads.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <p>No enquiries recorded yet.</p>
                  <p className="mt-1 text-[11px]">
                    Fill out the "Submit Quote Request" form on the site to test lead capture.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5E9EC]">
                    <span className="font-bold text-slate-700">
                      {storedLeads.length} Lead(s) in Local Storage
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={exportLeadsJSON}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-[#E5E9EC] rounded-lg hover:bg-slate-50 text-slate-700"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export JSON</span>
                      </button>
                      <button
                        type="button"
                        onClick={clearLeads}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {storedLeads.map((lead, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#F7F9FA] border border-[#E5E9EC] space-y-1 font-mono text-[11px]"
                      >
                        <div className="flex items-center justify-between text-slate-400 text-[10px]">
                          <span>#{idx + 1}</span>
                          <span>{new Date(lead.submittedAt).toLocaleString()}</span>
                        </div>
                        <div className="text-slate-900 font-bold text-xs">{lead.fullName}</div>
                        <div><strong>Phone:</strong> {lead.phone}</div>
                        {lead.email && <div><strong>Email:</strong> {lead.email}</div>}
                        <div><strong>Service:</strong> {lead.serviceId}</div>
                        <div><strong>Property:</strong> {lead.propertyType}</div>
                        {lead.zipCode && <div><strong>ZIP:</strong> {lead.zipCode}</div>}
                        {lead.details && <div><strong>Notes:</strong> {lead.details}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F7F9FA] border-t border-[#E5E9EC] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-[#14344A] hover:bg-[#1E4560] rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
