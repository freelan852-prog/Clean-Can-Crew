import React from 'react';
import { X, Shield } from 'lucide-react';
import { businessConfig } from '../config/business';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#E5E9EC] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E5E9EC] flex items-center justify-between bg-[#F7F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-md bg-white border border-[#E5E9EC] text-[#20A39E]">
              <Shield className="w-4 h-4" />
            </div>
            <h3 id="privacy-title" className="text-lg font-bold text-[#14344A]">
              Privacy & Enquiry Notice
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors cursor-pointer"
            aria-label="Close privacy notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#263238]/85 leading-relaxed">
          <p>
            <strong>Last Updated:</strong> {new Date().getFullYear()}
          </p>
          <p>
            This privacy notice describes how <strong>{businessConfig.businessName}</strong> handles the personal information you submit through our quote enquiry forms.
          </p>

          <h4 className="font-bold text-[#14344A] text-base pt-2">
            1. What Information We Collect
          </h4>
          <p>
            When you request a quote or contact us, we collect the details you voluntarily provide, including:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
            <li>Your full name</li>
            <li>Telephone number</li>
            <li>Email address (if provided)</li>
            <li>Property type, location or postal code (e.g., Burbank, IL)</li>
            <li>Requested cleaning services and any specific notes</li>
          </ul>

          <h4 className="font-bold text-[#14344A] text-base pt-2">
            2. How We Use Your Information
          </h4>
          <p>
            Your information is used solely to respond to your enquiry, provide price estimates, schedule appointments, and coordinate cleaning services. We do not sell, rent, or trade your contact information to third parties or marketing lists.
          </p>

          <h4 className="font-bold text-[#14344A] text-base pt-2">
            3. Data Retention & Security
          </h4>
          <p>
            We take reasonable precautions to safeguard your contact details. If you wish to have your contact details updated or removed from our enquiry records, contact us directly via our Instagram page ({businessConfig.instagramHandle}) or through our contact form.
          </p>

          <h4 className="font-bold text-[#14344A] text-base pt-2">
            4. Business Owner Customization
          </h4>
          <p>
            This basic policy is provided as a starting framework and can be tailored by the business owner to match any specific municipal or state regulatory requirements.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F7F9FA] border-t border-[#E5E9EC] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#14344A] hover:bg-[#1E4560] rounded-lg transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
