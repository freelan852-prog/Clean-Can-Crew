import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle, Copy, Check } from 'lucide-react';
import { businessConfig } from '../config/business';

interface QuoteFormProps {
  preselectedServiceId?: string;
  onClearPreselection?: () => void;
  prefilledNotes?: string;
  prefilledSize?: string;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  serviceId: string;
  propertySize: string;
  preferredDate: string;
  zipCode: string;
  details: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceId?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  preselectedServiceId,
  onClearPreselection,
  prefilledNotes,
  prefilledSize,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'Single-Family Home',
    serviceId: preselectedServiceId || 'trash-can-sanitization',
    propertySize: '',
    preferredDate: '',
    zipCode: '60459',
    details: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'whatsapp_sent' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [dispatchedUrl, setDispatchedUrl] = useState('');
  const [dispatchedOrderText, setDispatchedOrderText] = useState('');

  // Current active WhatsApp provider number (supports custom setting in localStorage or default)
  const [providerPhone, setProviderPhone] = useState(
    businessConfig.whatsappNumber || '17086190619'
  );

  useEffect(() => {
    const customWhatsApp = localStorage.getItem('clean_can_crew_whatsapp');
    if (customWhatsApp) {
      setProviderPhone(customWhatsApp);
    }
  }, []);

  // Sync preselected service from Services section
  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (prefilledSize) {
      setFormData((prev) => ({ ...prev, propertySize: prefilledSize }));
    }
  }, [prefilledSize]);

  useEffect(() => {
    if (prefilledNotes) {
      setFormData((prev) => ({ ...prev, details: prefilledNotes }));
    }
  }, [prefilledNotes]);

  // Phone number input formatter
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    let formatted = raw;
    if (raw.length > 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    }
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number.';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit telephone number.';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.serviceId) {
      newErrors.serviceId = 'Please select a cleaning service.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getServiceLabel = (id: string) => {
    const s = businessConfig.services.find((item) => item.id === id);
    if (s) return s.title;
    if (id === 'other') return 'Other / Custom Cleaning Request';
    return id;
  };

  const formatWhatsAppOrder = (data: FormData) => {
    const serviceTitle = getServiceLabel(data.serviceId);
    return `🧹 *NEW CLEANING ORDER REQUEST*
*Business:* ${businessConfig.businessName}
━━━━━━━━━━━━━━━━━━━━
👤 *Customer Name:* ${data.fullName}
📞 *Phone:* ${data.phone}
${data.email.trim() ? `✉️ *Email:* ${data.email.trim()}\n` : ''}🧼 *Service Requested:* ${serviceTitle}
🏠 *Property Type:* ${data.propertyType}
${data.propertySize.trim() ? `🗑️ *Size / Cans Count:* ${data.propertySize.trim()}\n` : ''}${data.preferredDate.trim() ? `📅 *Preferred Date:* ${data.preferredDate.trim()}\n` : ''}📍 *Location / ZIP:* ${data.zipCode.trim() || 'Burbank, IL'}
${data.details.trim() ? `📝 *Special Notes:* ${data.details.trim()}\n` : ''}━━━━━━━━━━━━━━━━━━━━
_Submitted automatically via ${businessConfig.businessName} Website_`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const targetPhone =
      localStorage.getItem('clean_can_crew_whatsapp') || providerPhone || '17086190619';
    const cleanDigits = targetPhone.replace(/\D/g, '');
    const orderText = formatWhatsAppOrder(formData);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanDigits}&text=${encodeURIComponent(
      orderText
    )}`;

    setDispatchedUrl(whatsappUrl);
    setDispatchedOrderText(orderText);

    // Save lead in localStorage for provider records
    const submissionPayload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      businessName: businessConfig.businessName,
      whatsappSynced: true,
      whatsappRecipient: cleanDigits,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('clean_can_crew_leads') || '[]');
      existing.push(submissionPayload);
      localStorage.setItem('clean_can_crew_leads', JSON.stringify(existing));
    } catch (err) {
      console.warn('Local storage write note:', err);
    }

    // Also fire webhook in background if owner configured one
    if (
      businessConfig.formSubmissionEndpoint &&
      businessConfig.formSubmissionEndpoint.trim() !== ''
    ) {
      fetch(businessConfig.formSubmissionEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      }).catch((err) => console.warn('Webhook post:', err));
    }

    // Automatically trigger navigation to WhatsApp
    try {
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.warn('Auto-click attempt:', err);
    }

    setIsSubmitting(false);
    setSubmitStatus('whatsapp_sent');
  };

  const copySummaryText = () => {
    navigator.clipboard.writeText(dispatchedOrderText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const formatDisplayPhone = (raw: string) => {
    const d = raw.replace(/\D/g, '');
    if (d.length === 11 && d.startsWith('1')) {
      return `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
    }
    if (d.length === 10) {
      return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    }
    return `+${d}`;
  };

  return (
    <section id="contact" className="py-24 bg-[#F7F8F4] border-b border-[#E5E9EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF7EF] border border-[#0FB9B1]/30 text-xs font-bold tracking-wider text-[#0FB9B1] uppercase mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Direct WhatsApp Order Sync</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A43] tracking-tight mb-4 text-balance">
            Let's Make Your Space Shine
          </h2>
          <p className="text-base sm:text-lg text-[#263238]/85">
            Submit your cleaning details below and your order will automatically route to our team on WhatsApp for immediate confirmation.
          </p>
        </div>

        {/* WhatsApp Order Sent Confirmation State */}
        {submitStatus === 'whatsapp_sent' && (
          <div className="p-5 sm:p-8 md:p-12 rounded-3xl bg-white border-2 border-[#0FB9B1] text-left shadow-xl animate-in fade-in duration-200">
            <div className="flex items-center gap-3.5 sm:gap-4 mb-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 shadow-xs">
                <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-emerald-600 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-bold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Order Automatically Prepared</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-[#102A43]">
                  Order Sent to Service Provider!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Synced directly with Clean Can Crew on WhatsApp ({formatDisplayPhone(providerPhone)})
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#263238]/90 leading-relaxed mb-6">
              Your order details have been formatted and sent to the service provider. Click the green button below to chat and confirm your cleaning date directly on WhatsApp:
            </p>

            {/* Primary Action to Open WhatsApp */}
            <div className="mb-6">
              <a
                href={dispatchedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#17A850] rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white shrink-0" />
                <span className="text-center">Open WhatsApp to Confirm Order &rarr;</span>
              </a>
            </div>

            {/* Order Text Preview Box */}
            <div className="bg-[#F7F8F4] p-4 sm:p-5 rounded-2xl border border-[#E5E9EC] text-xs font-mono space-y-1.5 text-slate-800 mb-6 overflow-x-auto">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-sans">
                Summary of Order Details:
              </div>
              <pre className="whitespace-pre-wrap font-mono text-xs text-slate-700 leading-relaxed">
                {dispatchedOrderText}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="button"
                onClick={copySummaryText}
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-[#102A43] bg-white border border-[#E5E9EC] rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer shadow-xs"
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Order Text'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmitStatus('idle');
                  setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    propertyType: 'Single-Family Home',
                    serviceId: 'trash-can-sanitization',
                    propertySize: '',
                    preferredDate: '',
                    zipCode: '60459',
                    details: '',
                  });
                }}
                className="min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer sm:ml-auto"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        )}

        {/* The Live Interactive Form */}
        {(submitStatus === 'idle' || submitStatus === 'error') && (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-12 border border-[#E5E9EC] shadow-xl"
          >
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold text-[#102A43] mb-1.5 uppercase tracking-wide"
                >
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  placeholder="e.g. Sarah Jenkins"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  className={`w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl bg-[#F7F8F4] border ${
                    errors.fullName ? 'border-rose-400 focus:border-rose-500' : 'border-[#E5E9EC] focus:border-[#0FB9B1]'
                  } focus:outline-hidden text-[#263238] transition-colors`}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1 text-xs text-rose-500">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold text-[#102A43] mb-1.5 uppercase tracking-wide"
                >
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(708) 555-0199"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={`w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl bg-[#F7F8F4] border ${
                    errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-[#E5E9EC] focus:border-[#0FB9B1]'
                  } focus:outline-hidden text-[#263238] transition-colors`}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-xs text-rose-500">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-[#102A43] mb-1.5 uppercase tracking-wide"
                >
                  Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="sarah@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl bg-[#F7F8F4] border ${
                    errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-[#E5E9EC] focus:border-[#0FB9B1]'
                  } focus:outline-hidden text-[#263238] transition-colors`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-rose-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Property Type */}
              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-xs font-bold text-[#102A43] mb-1.5 uppercase tracking-wide"
                >
                  Property Type
                </label>
                <select
                  id="propertyType"
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl bg-[#F7F8F4] border border-[#E5E9EC] focus:border-[#0FB9B1] focus:outline-hidden text-[#263238] transition-colors cursor-pointer"
                >
                  <option value="Single-Family Home">Single-Family Home</option>
                  <option value="Townhouse / Condominium">Townhouse / Condominium</option>
                  <option value="Multi-Family Property">Multi-Family Property</option>
                  <option value="Commercial / Office">Commercial / Office</option>
                  <option value="Other Property">Other Property</option>
                </select>
              </div>

              {/* Cleaning Service Dropdown */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="serviceId"
                    className="block text-xs font-bold text-[#102A43] uppercase tracking-wide"
                  >
                    Requested Service <span className="text-rose-500">*</span>
                  </label>
                  {preselectedServiceId && onClearPreselection && (
                    <button
                      type="button"
                      onClick={onClearPreselection}
                      className="text-[11px] text-[#0FB9B1] hover:underline cursor-pointer font-bold"
                    >
                      Clear preselection
                    </button>
                  )}
                </div>
                <select
                  id="serviceId"
                  value={formData.serviceId}
                  onChange={(e) => {
                    setFormData({ ...formData, serviceId: e.target.value });
                    if (errors.serviceId) setErrors({ ...errors, serviceId: undefined });
                  }}
                  className={`w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl bg-[#F7F8F4] border ${
                    errors.serviceId ? 'border-rose-400' : 'border-[#E5E9EC] focus:border-[#0FB9B1]'
                  } focus:outline-hidden text-[#263238] transition-colors cursor-pointer`}
                >
                  {businessConfig.services
                    .filter((s) => s.enabled)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  <option value="other">Other / Custom Service</option>
                </select>
                {errors.serviceId && (
                  <p className="mt-1 text-xs text-rose-500">{errors.serviceId}</p>
                )}
              </div>

              {/* Property Size / Number of Cans */}
              <div>
                <label
                  htmlFor="propertySize"
                  className="block text-xs font-bold text-[#102A43] mb-1.5 uppercase tracking-wide"
                >
                  Size / Cans Count <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="propertySize"
                  type="text"
                  value={formData.propertySize}
                  onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                  placeholder="e.g. 2 Curbside Cans or 3-Bed Home"
                  className="w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl bg-[#F7F8F4] border border-[#E5E9EC] focus:border-[#0FB9B1] focus:outline-hidden text-[#263238] transition-colors"
                />
              </div>

              {/* Preferred Date */}
              <div>
                <label
                  htmlFor="preferredDate"
                  className="block text-xs font-bold text-[#102A43] mb-1.5 uppercase tracking-wide"
                >
                  Preferred Date <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl bg-[#F7F8F4] border border-[#E5E9EC] focus:border-[#0FB9B1] focus:outline-hidden text-[#263238] transition-colors"
                />
              </div>

              {/* ZIP Code */}
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-xs font-bold text-[#102A43] mb-1.5 uppercase tracking-wide"
                >
                  ZIP or Postal Code <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="60459"
                  maxLength={10}
                  className="w-full min-h-[48px] px-4 py-3 text-base sm:text-sm rounded-xl bg-[#F7F8F4] border border-[#E5E9EC] focus:border-[#0FB9B1] focus:outline-hidden text-[#263238] transition-colors"
                />
              </div>
            </div>

            {/* Additional Details */}
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="details"
                className="block text-xs font-bold text-[#102A43] mb-1.5 uppercase tracking-wide"
              >
                Additional Details / Notes <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <textarea
                id="details"
                rows={3}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Tell us about specific odors, grease accumulation, gate access, or scheduling preferences..."
                className="w-full px-4 py-3 text-base sm:text-sm rounded-xl bg-[#F7F8F4] border border-[#E5E9EC] focus:border-[#0FB9B1] focus:outline-hidden text-[#263238] transition-colors resize-y"
              />
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-[#E5E9EC]">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span>Auto-syncs order to WhatsApp ({formatDisplayPhone(providerPhone)})</span>
              </div>

              <div className="flex items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-[#102A43] bg-[#0FB9B1] hover:bg-[#D4F36A] active:bg-[#0B9690] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0FB9B1] focus-visible:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#102A43] border-t-transparent rounded-full animate-spin" />
                      <span>Sending Order...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#102A43]" />
                      <span>Submit Order via WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
