"use client";

import React from "react";
import { Header } from "@/components/common/Header";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/common/Container";

export default function ContatoPage() {
  const handleStartClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF9]">
      <div className="flex-1">
        <Header showBackButton backHref="/" onStartClick={handleStartClick} hideAnchorLinks={true} />
        <ContactHero />
        <section className="py-16 pb-24">
          <Container size="lg">
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              <ContactInfo />
              <ContactForm />
            </div>
          </Container>
        </section>
      </div>
      <FooterTapedDesign />
    </div>
  );
}
