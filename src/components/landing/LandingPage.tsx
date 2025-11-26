import React from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { BenefitsSection } from "./BenefitsSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { TestimonialsAnimatedSection } from "./TestimonialsAnimatedSection";
import { FeaturesSection } from "./FeaturesSection";
import { AppStoresSection } from "./AppStoresSection";
import { FAQSection } from "./FAQSection";
import { ImageGallerySection } from "./ImageGallerySection";
import { CTASection } from "./CTASection";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";

interface LandingPageProps {
  onStartClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartClick }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF9]">
      <div className="flex-1">
        <Header onStartClick={onStartClick} />
        <Hero onStartClick={onStartClick} />
        <BenefitsSection />
        <HowItWorksSection onStartClick={onStartClick} />
        <TestimonialsAnimatedSection />
        <AppStoresSection />
        <FAQSection onStartClick={onStartClick} />
        <ImageGallerySection />
        <CTASection onStartClick={onStartClick} />
      </div>
      <FooterTapedDesign />
    </div>
  );
};

