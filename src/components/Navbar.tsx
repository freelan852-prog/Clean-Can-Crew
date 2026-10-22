import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { businessConfig } from '../config/business';

interface NavbarProps {
  onQuoteClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Service Area', href: '#service-area' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-200 bg-white ${
        scrolled ? 'shadow-xs border-b border-[#E5E9EC]' : 'border-b border-[#E5E9EC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark & Official Emblem */}
          <a
            href="#"
            className="flex items-center gap-3 group shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#20A39E]"
          >
            <img
              src={businessConfig.logoUrl}
              alt={`${businessConfig.businessName} emblem`}
              className="w-11 h-11 object-contain rounded-full bg-[#14344A] p-0.5 border border-[#20A39E]/40 group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#14344A] whitespace-nowrap">
                {businessConfig.businessName}
              </span>
              <span className="text-[11px] text-[#20A39E] font-medium tracking-wider uppercase">
                Trash Can & Property Cleaning
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#263238]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#20A39E] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onQuoteClick}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#20A39E] hover:bg-[#1B8985] active:bg-[#16706D] transition-colors rounded-lg shadow-xs whitespace-nowrap cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#20A39E] focus-visible:ring-offset-2"
            >
              {businessConfig.ctaLabel}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-[#14344A] hover:bg-[#F7F9FA] rounded-lg transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#20A39E]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E9EC] px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-[#263238] hover:text-[#20A39E] hover:bg-[#F7F9FA] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E5E9EC]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuoteClick();
                }}
                className="w-full py-3 px-4 text-center font-semibold text-white bg-[#20A39E] hover:bg-[#1B8985] active:bg-[#16706D] rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                {businessConfig.ctaLabel}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
