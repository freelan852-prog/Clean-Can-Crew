/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBenefits } from './components/TrustBenefits';
import { Services } from './components/Services';
import { About } from './components/About';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { ReviewsSection } from './components/ReviewsSection';
import { ServiceArea } from './components/ServiceArea';
import { FAQ } from './components/FAQ';
import { QuoteForm } from './components/QuoteForm';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { OwnerConfigModal } from './components/OwnerConfigModal';
import { FloatingInstagram } from './components/FloatingInstagram';
import { QuickEstimateCalculator } from './components/QuickEstimateCalculator';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('trash-can-sanitization');
  const [prefilledSize, setPrefilledSize] = useState<string>('');
  const [prefilledNotes, setPrefilledNotes] = useState<string>('');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isOwnerGuideOpen, setIsOwnerGuideOpen] = useState(false);

  const scrollToQuote = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyPlan = (cans: number, planLabel: string) => {
    setSelectedServiceId('trash-can-sanitization');
    setPrefilledSize(`${cans} ${cans === 1 ? 'Curbside Can' : 'Curbside Cans'}`);
    setPrefilledNotes(`Plan Selected: ${planLabel} (${cans} bins scope)`);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F4] text-[#263238] flex flex-col font-sans selection:bg-[#0FB9B1]/20 selection:text-[#102A43]">
      {/* Sticky Top Bar Contract */}
      <Navbar onQuoteClick={() => scrollToQuote()} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onQuoteClick={() => scrollToQuote()} />

        {/* 4 Pillars Trust & Benefits */}
        <TrustBenefits />

        {/* Tailored Cleaning Services */}
        <Services onSelectService={(serviceId) => scrollToQuote(serviceId)} />

        {/* Interactive Sanitization Scope & Frequency Estimator */}
        <QuickEstimateCalculator onApplyPlan={handleApplyPlan} />

        {/* Editorial About Section */}
        <About />

        {/* How It Works 3-Step Process */}
        <HowItWorks onQuoteClick={() => scrollToQuote()} />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Before-and-After Visual Gallery with Interactive Drag Slider & Lightbox */}
        <Gallery />

        {/* Customer Reviews / Service Commitment */}
        <ReviewsSection onQuoteClick={() => scrollToQuote()} />

        {/* Service Area & Coverage Checker */}
        <ServiceArea onQuoteClick={() => scrollToQuote()} />

        {/* FAQ Accordion */}
        <FAQ />

        {/* Lead Capture Quote Form */}
        <QuoteForm
          preselectedServiceId={selectedServiceId}
          prefilledSize={prefilledSize}
          prefilledNotes={prefilledNotes}
          onClearPreselection={() => {
            setSelectedServiceId('trash-can-sanitization');
            setPrefilledSize('');
            setPrefilledNotes('');
          }}
        />

        {/* Closing High-Impact Call to Action */}
        <FinalCTA onQuoteClick={() => scrollToQuote()} />
      </main>

      {/* Footer */}
      <Footer
        onPrivacyClick={() => setIsPrivacyOpen(true)}
        onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)}
      />

      {/* Modals */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <OwnerConfigModal
        isOpen={isOwnerGuideOpen}
        onClose={() => setIsOwnerGuideOpen(false)}
      />

      {/* Floating Animated Instagram Redirect Button */}
      <FloatingInstagram />
    </div>
  );
}
