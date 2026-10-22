import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { businessConfig } from '../config/business';

interface NavbarProps {
  onQuoteClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Estimator', href: '#calculator' },
    { label: 'About', href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Results Gallery', href: '#gallery' },
    { label: 'Service Area', href: '#service-area' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#102A43]/95 backdrop-blur-md shadow-md border-b border-[#163B5C]'
          : 'bg-[#102A43] border-b border-[#163B5C]'
      }`}
    >
      {/* Interactive Top Reading Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-[#0FB9B1] via-[#D4F36A] to-[#0FB9B1] transition-all duration-150 ease-out z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          {/* Zone 1: Brand Wordmark & Official Emblem */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3.5 group shrink min-w-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0FB9B1]"
          >
            <img
              src={businessConfig.logoUrl}
              alt={`${businessConfig.businessName} emblem`}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full bg-[#163B5C] p-0.5 border-2 border-[#0FB9B1]/60 group-hover:scale-105 transition-transform shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-xl font-extrabold tracking-tight text-white truncate">
                {businessConfig.businessName}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#0FB9B1] font-semibold tracking-wider uppercase truncate">
                Trash Can & Property Care
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#0FB9B1] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Instagram Redirect Button with 44px touch target */}
            <a
              href={businessConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E1306C]"
              aria-label="Follow Clean Can Crew on Instagram"
              title="Follow @cleaningservice619 on Instagram"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            <button
              onClick={onQuoteClick}
              className="hidden sm:inline-flex items-center justify-center px-5 sm:px-6 py-2.5 text-sm font-bold text-[#102A43] bg-[#0FB9B1] hover:bg-[#D4F36A] active:bg-[#0B9690] transition-colors rounded-xl shadow-sm whitespace-nowrap cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0FB9B1] focus-visible:ring-offset-2 min-h-[44px]"
            >
              {businessConfig.ctaLabel}
            </button>

            {/* Mobile Hamburger Button with 44px touch target */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-11 h-11 flex items-center justify-center text-white hover:bg-[#163B5C] active:bg-[#163B5C]/80 rounded-xl transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0FB9B1] cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Full Mobile Overlay & Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 z-40 bg-[#102A43]/95 backdrop-blur-md flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          <div className="px-5 py-6">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center min-h-[48px] px-4 py-3 text-lg font-bold text-slate-100 hover:text-[#0FB9B1] hover:bg-white/5 active:bg-white/10 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="p-5 border-t border-[#163B5C] bg-[#0D2230]/80 space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onQuoteClick();
              }}
              className="w-full min-h-[48px] py-3.5 px-4 text-center font-bold text-[#102A43] bg-[#0FB9B1] hover:bg-[#D4F36A] active:bg-[#0B9690] rounded-xl shadow-md transition-colors cursor-pointer text-base"
            >
              {businessConfig.ctaLabel}
            </button>
            <p className="text-center text-xs text-slate-400">
              Curbside trash can sanitization & property care in Burbank, IL
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
