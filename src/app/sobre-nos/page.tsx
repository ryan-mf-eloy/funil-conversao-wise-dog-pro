"use client";

import React from "react";
import { Header } from "@/components/common/Header";
import AboutUsSection from "@/components/ui/about-us-section";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";

export default function SobreNosPage() {
  const handleStartClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF9]">
      <div className="flex-1">
        <Header onStartClick={handleStartClick} hideAnchorLinks={true} />
        <AboutUsSection />
      </div>
      <FooterTapedDesign />
    </div>
  );
}

