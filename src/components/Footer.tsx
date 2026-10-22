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
    <footer className="bg-[#0F2839] text-white/90 border-t border-[#14344A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={businessConfig.logoUrl}
                alt={businessConfig.businessName}
                className="w-10 h-10 object-contain rounded-full bg-[#14344A] p-0.5 border border-[#20A39E]/50"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                {businessConfig.businessName}
              </span>
            </div>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm mb-6">
              Specialized high-temperature trash can sanitization and residential cleaning services. Keeping properties hygienic, odor-free, and welcoming.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <MapPin className="w-4 h-4 text-[#20A39E] shrink-0" />
              <span>{businessConfig.serviceArea}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#20A39E] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Visual Gallery
                </a>
              </li>
              <li>
                <a href="#service-area" className="hover:text-white transition-colors">
                  Service Area
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Confirmed Channels */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#20A39E] mb-4">
              Connect With Us
            </h4>
            <div className="space-y-3 text-sm">
              {/* Instagram: Verified Profile */}
              <a
                href={businessConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
              >
                <div className="w-8 h-8 rounded-md bg-[#20A39E]/20 text-[#20A39E] flex items-center justify-center shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-[#20A39E] transition-colors">
                    Instagram Profile
                  </div>
                  <div className="text-[11px] text-white/60">
                    {businessConfig.instagramHandle}
                  </div>
                </div>
              </a>

              {/* Only show Phone if configured */}
              {businessConfig.phone && (
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#20A39E]" />
                  <span>{businessConfig.phone}</span>
                </a>
              )}

              {/* Only show Email if configured */}
              {businessConfig.email && (
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#20A39E]" />
                  <span>{businessConfig.email}</span>
                </a>
              )}

              {/* Only show WhatsApp if configured */}
              {businessConfig.whatsappNumber && (
                <a
                  href={`https://wa.me/${businessConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#20A39E]" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              {/* Owner Setup helper link */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenOwnerGuide}
                  className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-[#20A39E]" />
                  <span>Owner Configuration Guide</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
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
