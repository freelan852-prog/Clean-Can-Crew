import React from 'react';
import { Instagram, MapPin, Phone, Mail, MessageCircle, Settings } from 'lucide-react';
import { businessConfig } from '../config/business';

interface FooterProps {
  onPrivacyClick: () => void;
  onOpenOwnerGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onPrivacyClick,
  onOpenOwnerGuide,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#102A43] text-white/90 border-t border-[#163B5C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5 mb-4">
              <img
                src={businessConfig.logoUrl}
                alt={businessConfig.businessName}
                className="w-12 h-12 object-contain rounded-full bg-[#163B5C] p-0.5 border-2 border-[#0FB9B1]/60 shadow-xs"
              />
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white block">
                  {businessConfig.businessName}
                </span>
                <span className="text-xs text-[#0FB9B1] font-medium">
                  Trash Can & Property Cleaning
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mb-6">
              Specialized high-temperature trash can sanitization and property cleaning services. Keeping homes hygienic, odor-free, and welcoming.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-[#0FB9B1] shrink-0" />
              <span>{businessConfig.serviceArea}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0FB9B1] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-[#0FB9B1] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#0FB9B1] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#0FB9B1] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#0FB9B1] transition-colors">
                  Results Gallery
                </a>
              </li>
              <li>
                <a href="#service-area" className="hover:text-[#0FB9B1] transition-colors">
                  Service Area
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#0FB9B1] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#0FB9B1] transition-colors">
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Confirmed Channels */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0FB9B1] mb-4">
              Connect With Us
            </h4>
            <div className="space-y-3 text-sm">
              {/* Instagram: Verified Profile */}
              <a
                href={businessConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0FB9B1]/20 text-[#0FB9B1] flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#0FB9B1] transition-colors">
                    Instagram Profile
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {businessConfig.instagramHandle}
                  </div>
                </div>
              </a>

              {/* Only show Phone if configured */}
              {businessConfig.phone && (
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#0FB9B1]" />
                  <span>{businessConfig.phone}</span>
                </a>
              )}

              {/* Only show Email if configured */}
              {businessConfig.email && (
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#0FB9B1]" />
                  <span>{businessConfig.email}</span>
                </a>
              )}

              {/* Only show WhatsApp if configured */}
              {businessConfig.whatsappNumber && (
                <a
                  href={`https://wa.me/${businessConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#0FB9B1]" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              {/* Owner Setup helper link */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenOwnerGuide}
                  className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-[#0FB9B1]" />
                  <span>Owner Settings & Leads</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} {businessConfig.businessName}. All rights reserved. Located in {businessConfig.address}.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onPrivacyClick}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <a
              href="#contact"
              className="hover:text-white transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
