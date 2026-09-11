import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryStrip from '../components/CategoryStrip';
import FeaturesGrid from '../components/FeaturesGrid';
import HowItWorks from '../components/HowItWorks';
import SocialProof from '../components/SocialProof';
import PricingSection from '../components/PricingSection';
import FaqAccordion from '../components/FaqAccordion';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CategoryStrip />
        <FeaturesGrid />
        <HowItWorks />
        <SocialProof />
        <PricingSection />
        <FaqAccordion />
      </main>
      <Footer />
    </div>
  );
}
