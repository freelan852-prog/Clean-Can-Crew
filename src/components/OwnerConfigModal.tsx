import React, { useState, useEffect } from 'react';
import { X, Check, Copy, Settings, Trash2, Download, MessageCircle, Save } from 'lucide-react';
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
  whatsappSynced?: boolean;
}

export const OwnerConfigModal: React.FC<OwnerConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'leads'>('guide');
  const [storedLeads, setStoredLeads] = useState<StoredLead[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [whatsAppNum, setWhatsAppNum] = useState(businessConfig.whatsappNumber || '17086190619');
  const [savedWhatsApp, setSavedWhatsApp] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        const raw = localStorage.getItem('clean_can_crew_leads');
        if (raw) {
          setStoredLeads(JSON.parse(raw));
        }
        const savedPhone = localStorage.getItem('clean_can_crew_whatsapp');
        if (savedPhone) {
          setWhatsAppNum(savedPhone);
        }
      } catch {
        setStoredLeads([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = whatsAppNum.replace(/\D/g, '');
    localStorage.setItem('clean_can_crew_whatsapp', clean || '17086190619');
    setSavedWhatsApp(true);
    setTimeout(() => setSavedWhatsApp(false), 2500);
  };

  const clearLeads = () => {
    localStorage.removeItem('clean_can_crew_leads');
    setStoredLeads([]);
  };

  const exportLeadsJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(storedLeads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `leads_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const sampleConfigSnippet = `// Edit in src/config/business.ts:
export const businessConfig: BusinessConfig = {
  businessName: 'Clean Can Crew',
  phone: '(708) 619-0619',             // Your business phone number
  whatsappNumber: '17086190619',        // Your WhatsApp number (country code + number)
  email: 'info@cleancancrew.com',       // Contact email
  address: 'Burbank, IL',               // City / region
  serviceArea: 'Burbank, IL & Surrounding Neighborhoods',
  formSubmissionEndpoint: 'https://formspree.io/f/your_form_id', // Formspree or custom webhook
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
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#E5E9EC] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-[#E5E9EC] flex items-center justify-between bg-[#F7F8F4]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#102A43] text-white">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 id="owner-guide-title" className="text-base font-bold text-[#102A43]">
                Owner Configuration & Order Sync
              </h3>
              <p className="text-xs text-slate-500">
                Settings & leads for Clean Can Crew ({businessConfig.secondaryBrandName})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Close configuration modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#E5E9EC] bg-[#F7F8F4] px-6 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'guide'
                ? 'border-[#0FB9B1] text-[#102A43]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Configuration & WhatsApp
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'border-[#0FB9B1] text-[#102A43]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Orders & Enquiries</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#DDF7EF] text-[#102A43] font-bold">
              {storedLeads.length}
            </span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#263238]">
          {activeTab === 'guide' ? (
            <>
              {/* WhatsApp Live Sync Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-sm">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Order Sync Number</span>
                </div>
                <p className="text-slate-600 mb-3 text-[11px] leading-relaxed">
                  When customers click <strong>"Submit Order via WhatsApp"</strong> on the quote form, their order details are instantly formatted and dispatched directly to this WhatsApp number:
                </p>
                <form onSubmit={handleSaveWhatsApp} className="flex gap-2">
                  <input
                    type="text"
                    value={whatsAppNum}
                    onChange={(e) => setWhatsAppNum(e.target.value)}
                    placeholder="e.g. 17086190619 (Country code + phone)"
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white border border-emerald-300 focus:outline-hidden focus:border-emerald-600 font-mono"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
                  >
                    {savedWhatsApp ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{savedWhatsApp ? 'Saved!' : 'Save Number'}</span>
                  </button>
                </form>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-[#102A43] text-sm">
                  1. Centralized Business Config File
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  All default business information is permanently configured in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">src/config/business.ts</code>:
                </p>

                <div className="relative bg-[#102A43] rounded-2xl p-4 font-mono text-white/90 overflow-x-auto">
                  <button
                    type="button"
                    onClick={copyConfigSnippet}
                    className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                  <pre className="text-[11px] leading-relaxed">{sampleConfigSnippet}</pre>
                </div>

                <h4 className="font-bold text-[#102A43] text-sm pt-2">
                  2. Optional Email Webhook / Formspree
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  In addition to automatic WhatsApp order dispatch, you can also receive duplicate email alerts by pasting your Formspree endpoint into <code className="bg-slate-100 px-1 rounded font-mono">formSubmissionEndpoint</code> in <code className="bg-slate-100 px-1 rounded font-mono">src/config/business.ts</code>.
                </p>
              </div>
            </>
          ) : (
            <div>
              {storedLeads.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <p>No orders recorded yet.</p>
                  <p className="mt-1 text-[11px]">
                    Fill out the "Submit Order via WhatsApp" form to test order dispatching.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5E9EC]">
                    <span className="font-bold text-slate-700">
                      {storedLeads.length} Order(s) Recorded
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
                        className="p-4 rounded-2xl bg-[#F7F8F4] border border-[#E5E9EC] space-y-1.5 font-mono text-[11px]"
                      >
                        <div className="flex items-center justify-between text-slate-400 text-[10px]">
                          <span className="font-bold text-[#0FB9B1]">ORDER #{idx + 1}</span>
                          <span>{new Date(lead.submittedAt).toLocaleString()}</span>
                        </div>
                        <div className="text-slate-900 font-bold text-xs font-sans">{lead.fullName}</div>
                        <div><strong>Phone:</strong> {lead.phone}</div>
                        {lead.email && <div><strong>Email:</strong> {lead.email}</div>}
                        <div><strong>Service:</strong> {lead.serviceId}</div>
                        <div><strong>Property:</strong> {lead.propertyType}</div>
                        {lead.zipCode && <div><strong>ZIP:</strong> {lead.zipCode}</div>}
                        {lead.details && <div><strong>Notes:</strong> {lead.details}</div>}
                        {lead.whatsappSynced && (
                          <div className="pt-1 text-[10px] text-emerald-700 flex items-center gap-1 font-sans">
                            <Check className="w-3 h-3" />
                            <span>Auto-dispatched to WhatsApp</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F7F8F4] border-t border-[#E5E9EC] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#102A43] hover:bg-[#163B5C] rounded-xl transition-colors cursor-pointer"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
