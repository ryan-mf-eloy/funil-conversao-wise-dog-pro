"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageAutoSliderProps {
  images?: string[];
  speed?: number; // Animation duration in seconds
  className?: string;
  imageClassName?: string;
  containerClassName?: string;
  backgroundColor?: "black" | "transparent" | "custom";
  customBackgroundColor?: string;
}

export const ImageAutoSlider: React.FC<ImageAutoSliderProps> = ({
  images,
  speed = 20,
  className,
  imageClassName,
  containerClassName,
  backgroundColor = "black",
  customBackgroundColor,
}) => {
  // Default images - dog training related from Unsplash
  const defaultImages = [
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1551717743-49959800b1f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1534361960057-19889dbdf1bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const imageList = images || defaultImages;
  // Duplicate images for seamless loop
  const duplicatedImages = [...imageList, ...imageList];

  // Generate unique ID for this instance to avoid style conflicts
  const sliderId = React.useMemo(() => `slider-${Math.random().toString(36).substr(2, 9)}`, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-right-${sliderId} {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .infinite-scroll-${sliderId} {
            animation: scroll-right-${sliderId} ${speed}s linear infinite;
          }

          .scroll-container-${sliderId} {
            mask: linear-gradient(
              90deg,
              transparent 0%,
              black 5%,
              black 95%,
              transparent 100%
            );
            -webkit-mask: linear-gradient(
              90deg,
              transparent 0%,
              black 5%,
              black 95%,
              transparent 100%
            );
          }

          .image-item-${sliderId} {
            transition: transform 0.3s ease, filter 0.3s ease;
          }

          .image-item-${sliderId}:hover {
            transform: scale(1.05);
            filter: brightness(1.1);
          }
        `
      }} />

      <div
        className={cn(
          "w-full min-h-screen relative overflow-hidden flex items-center justify-center",
          backgroundColor === "black" && "bg-black",
          backgroundColor === "transparent" && "bg-transparent",
          backgroundColor === "custom" && customBackgroundColor,
          className
        )}
        style={backgroundColor === "custom" && customBackgroundColor ? { backgroundColor: customBackgroundColor } : undefined}
      >
        {/* Background gradient */}
        {backgroundColor === "black" && (
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-0" />
        )}

        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center py-8">
          <div
            className={cn(
              `scroll-container-${sliderId} w-full max-w-6xl`,
              containerClassName
            )}
          >
            <div className={`infinite-scroll-${sliderId} flex gap-6 w-max`}>
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    `image-item-${sliderId} flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden shadow-2xl`,
                    imageClassName
                  )}
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${(index % imageList.length) + 1}`}
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient overlay */}
        {backgroundColor === "black" && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20" />
        )}
      </div>
    </>
  );
};

