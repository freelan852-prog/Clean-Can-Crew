import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle, Info, Copy, Check } from 'lucide-react';
import { businessConfig } from '../config/business';

interface QuoteFormProps {
  preselectedServiceId?: string;
  onClearPreselection?: () => void;
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
    'idle' | 'success_live' | 'unconfigured_notice' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Sync preselected service from Services section
  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const submissionPayload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      businessName: businessConfig.businessName,
    };

    // If an actual form endpoint is configured, submit to it
    if (businessConfig.formSubmissionEndpoint && businessConfig.formSubmissionEndpoint.trim() !== '') {
      try {
        const response = await fetch(businessConfig.formSubmissionEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(submissionPayload),
        });

        if (response.ok) {
          setSubmitStatus('success_live');
        } else {
          setSubmitStatus('error');
          setErrorMessage(
            'The form service returned an error. Please try again or reach out on Instagram @cleaningservice619.'
          );
        }
      } catch {
        setSubmitStatus('error');
        setErrorMessage(
          'Network connection error while submitting. Please check your connection and try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Per instructions: "If no submission backend is configured, clearly mark the form as requiring configuration during development. Do not pretend that an enquiry has been sent."
      // Save locally to ensure customer enquiry is never silently discarded
      try {
        const existing = JSON.parse(localStorage.getItem('clean_can_crew_leads') || '[]');
        existing.push(submissionPayload);
        localStorage.setItem('clean_can_crew_leads', JSON.stringify(existing));
      } catch (err) {
        console.warn('Local storage write note:', err);
      }

      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('unconfigured_notice');
      }, 400);
    }
  };

  const getServiceLabel = (id: string) => {
    const s = businessConfig.services.find((item) => item.id === id);
    if (s) return s.title;
    if (id === 'other') return 'Other / Custom Cleaning Request';
    return id;
  };

  const buildWhatsAppMessage = () => {
    const message = `Hello Clean Can Crew! I would like to request a quote.\n\nName: ${formData.fullName}\nService: ${getServiceLabel(formData.serviceId)}\nProperty Type: ${formData.propertyType}\nLocation / ZIP: ${formData.zipCode || 'Burbank'}\nDetails: ${formData.details || 'Standard clean'}`;
    return encodeURIComponent(message);
  };

  const copySummaryText = () => {
    const text = `Quote Request for Clean Can Crew:\nName: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nService: ${getServiceLabel(formData.serviceId)}\nProperty: ${formData.propertyType}\nZIP: ${formData.zipCode}\nNotes: ${formData.details || 'None'}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-[#E5E9EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#20A39E] uppercase mb-2">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14344A] tracking-tight mb-4">
            Let's Make Your Space Shine
          </h2>
          <p className="text-base text-[#263238]/80">
            Share a few details about your cleaning needs so our team can follow up with you directly.
          </p>
        </div>

        {/* Backend Configuration Notice / Transparency Banner */}
        {!businessConfig.formSubmissionEndpoint && (
          <div className="mb-8 p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">Owner Note — Submission Endpoint:</span> Live form delivery requires setting your form webhook or Formspree endpoint in{' '}
              <code className="font-mono bg-amber-100/70 px-1.5 py-0.5 rounded text-[11px]">src/config/business.ts</code> (field: <code className="font-mono text-[11px]">formSubmissionEndpoint</code>). While unconfigured, submitted requests are preserved safely in browser storage for testing.
            </div>
          </div>
        )}

        {/* Live Submission Success State */}
        {submitStatus === 'success_live' && (
          <div className="p-8 sm:p-10 rounded-2xl bg-[#F7F9FA] border border-emerald-300 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#14344A] mb-2">
              Quote Request Sent!
            </h3>
            <p className="text-sm text-[#263238]/80 max-w-md mx-auto mb-6">
              Thank you, <strong>{formData.fullName}</strong>. We received your request for{' '}
              <strong>{getServiceLabel(formData.serviceId)}</strong> and will reach out to{' '}
              <strong>{formData.phone}</strong> shortly.
            </p>
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
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#20A39E] rounded-lg hover:bg-[#1B8985] transition-colors cursor-pointer"
            >
              Submit Another Request
            </button>
          </div>
        )}

        {/* Unconfigured Backend Notification Modal / Card */}
        {submitStatus === 'unconfigured_notice' && (
          <div className="p-8 sm:p-10 rounded-2xl bg-[#F7F9FA] border border-[#20A39E] text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#20A39E]/10 text-[#20A39E] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#14344A]">
                  Enquiry Prepared & Recorded Locally
                </h3>
                <span className="text-xs text-slate-500">
                  Site is currently running in Preview/Setup mode
                </span>
              </div>
            </div>

            <p className="text-sm text-[#263238]/85 leading-relaxed mb-6">
              Thank you for testing the form! Because an external form submission endpoint is not yet connected in <code className="font-mono text-xs bg-slate-200 px-1 py-0.5 rounded">src/config/business.ts</code>, your enquiry was saved safely in local browser storage without being lost.
            </p>

            <div className="bg-white p-4 rounded-xl border border-[#E5E9EC] text-xs font-mono space-y-1 text-slate-700 mb-6">
              <div><strong>Name:</strong> {formData.fullName}</div>
              <div><strong>Phone:</strong> {formData.phone}</div>
              {formData.email && <div><strong>Email:</strong> {formData.email}</div>}
              <div><strong>Service:</strong> {getServiceLabel(formData.serviceId)}</div>
              <div><strong>Property Type:</strong> {formData.propertyType}</div>
              <div><strong>Location ZIP:</strong> {formData.zipCode || 'Not provided'}</div>
              {formData.details && <div><strong>Notes:</strong> {formData.details}</div>}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copySummaryText}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#14344A] bg-white border border-[#E5E9EC] rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Enquiry Details'}</span>
              </button>

              <a
                href={businessConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#14344A] rounded-lg hover:bg-[#1E4560] transition-colors"
              >
                <span>Send to @cleaningservice619 on Instagram &rarr;</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmitStatus('idle')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer ml-auto"
              >
                Edit Details
              </button>
            </div>
          </div>
        )}

        {/* The Live Interactive Form */}
        {(submitStatus === 'idle' || submitStatus === 'error') && (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#F7F9FA] rounded-2xl p-6 sm:p-10 border border-[#E5E9EC] shadow-2xs"
          >
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold text-[#14344A] mb-1.5"
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
                  className={`w-full px-4 py-3 text-sm rounded-lg bg-white border ${
                    errors.fullName ? 'border-rose-400 focus:border-rose-500' : 'border-[#E5E9EC] focus:border-[#20A39E]'
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
                  className="block text-xs font-bold text-[#14344A] mb-1.5"
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
                  className={`w-full px-4 py-3 text-sm rounded-lg bg-white border ${
                    errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-[#E5E9EC] focus:border-[#20A39E]'
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
                  className="block text-xs font-bold text-[#14344A] mb-1.5"
                >
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
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
                  className={`w-full px-4 py-3 text-sm rounded-lg bg-white border ${
                    errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-[#E5E9EC] focus:border-[#20A39E]'
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
                  className="block text-xs font-bold text-[#14344A] mb-1.5"
                >
                  Property Type
                </label>
                <select
                  id="propertyType"
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-lg bg-white border border-[#E5E9EC] focus:border-[#20A39E] focus:outline-hidden text-[#263238] transition-colors cursor-pointer"
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
                    className="block text-xs font-bold text-[#14344A]"
                  >
                    Requested Service <span className="text-rose-500">*</span>
                  </label>
                  {preselectedServiceId && onClearPreselection && (
                    <button
                      type="button"
                      onClick={onClearPreselection}
                      className="text-[11px] text-[#20A39E] hover:underline cursor-pointer"
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
                  className={`w-full px-4 py-3 text-sm rounded-lg bg-white border ${
                    errors.serviceId ? 'border-rose-400' : 'border-[#E5E9EC] focus:border-[#20A39E]'
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
                  className="block text-xs font-bold text-[#14344A] mb-1.5"
                >
                  Size / Number of Cans <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="propertySize"
                  type="text"
                  value={formData.propertySize}
                  onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                  placeholder="e.g. 2 Trash Cans or 3-Bed Home"
                  className="w-full px-4 py-3 text-sm rounded-lg bg-white border border-[#E5E9EC] focus:border-[#20A39E] focus:outline-hidden text-[#263238] transition-colors"
                />
              </div>

              {/* Preferred Date */}
              <div>
                <label
                  htmlFor="preferredDate"
                  className="block text-xs font-bold text-[#14344A] mb-1.5"
                >
                  Preferred Date / Day <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-lg bg-white border border-[#E5E9EC] focus:border-[#20A39E] focus:outline-hidden text-[#263238] transition-colors"
                />
              </div>

              {/* ZIP Code */}
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-xs font-bold text-[#14344A] mb-1.5"
                >
                  ZIP or Postal Code <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="60459"
                  maxLength={10}
                  className="w-full px-4 py-3 text-sm rounded-lg bg-white border border-[#E5E9EC] focus:border-[#20A39E] focus:outline-hidden text-[#263238] transition-colors"
                />
              </div>
            </div>

            {/* Additional Details */}
            <div className="mb-8">
              <label
                htmlFor="details"
                className="block text-xs font-bold text-[#14344A] mb-1.5"
              >
                Additional Details / Notes <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                id="details"
                rows={3}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Tell us about any specific odors, heavy stains, gate access, or scheduling preferences..."
                className="w-full px-4 py-3 text-sm rounded-lg bg-white border border-[#E5E9EC] focus:border-[#20A39E] focus:outline-hidden text-[#263238] transition-colors resize-y"
              />
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#E5E9EC]">
              <div className="text-xs text-slate-500">
                Direct quote estimate · No payment taken now
              </div>

              <div className="flex items-center gap-3">
                {/* Optional WhatsApp Enquiry Button if configured */}
                {businessConfig.whatsappNumber && (
                  <a
                    href={`https://wa.me/${businessConfig.whatsappNumber}?text=${buildWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-[#20A39E] hover:bg-[#1B8985] active:bg-[#16706D] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#20A39E] focus-visible:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Quote Request</span>
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
