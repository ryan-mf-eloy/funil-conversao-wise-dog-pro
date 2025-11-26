import React from "react";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

export const ImageGallerySection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#F8F4EB] via-[#FED7AA]/30 to-[#F8F4EB]">
      <div className="relative">
        <ImageAutoSlider
          speed={25}
          backgroundColor="transparent"
          className="min-h-[600px]"
        />
        {/* Overlay gradient para suavizar transições nas bordas */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F4EB] via-transparent to-[#F8F4EB] pointer-events-none z-30" />
      </div>
    </section>
  );
};
