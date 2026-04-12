"use client";

import { AppProvider, useApp } from '@/components/travel/AppContext';
import { AuthPage } from '@/components/auth/AuthPage';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PricingSection } from '@/components/PricingSection';
import { CTASection } from '@/components/CTASection';
import { useState } from 'react';

function HomePageContent() {
  const { user, currentPage, setCurrentPage } = useApp();
  const [showAuthPage, setShowAuthPage] = useState(false);

  return (
    <>
      {showAuthPage || currentPage === 'auth' ? (
        // Show auth page
        <AuthPage />
      ) : (
        // Show landing page with hero and CTA to auth
        <main className="overflow-hidden">
          <HeroSection onGetStarted={() => setShowAuthPage(true)} />
          <FeaturesSection />
          <PricingSection onGetStarted={() => setShowAuthPage(true)} />
          <CTASection onGetStarted={() => setShowAuthPage(true)} />
        </main>
      )}
    </>
  );
}

export function HomePage() {
  return (
    <AppProvider>
      <HomePageContent />
    </AppProvider>
  );
}
