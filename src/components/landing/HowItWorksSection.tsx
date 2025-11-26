"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { STEPS } from "@/constants/data";
import {
  ClipboardList,
  Sparkles,
  Target,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HowItWorksSectionProps {
  onStartClick: () => void;
}

const stepIcons = [ClipboardList, Sparkles, Target, Trophy];

// Cores personalizadas para cada etapa - cores distintas e contrastantes
const stepColors = [
  {
    // Passo 1 - Verde
    bg: "bg-[#1C8C58]",
    border: "border-[#0F5A35]",
    shadow: "shadow-[4px_4px_0px_0px_#0F5A35]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#0F5A35]",
    hoverBg: "hover:bg-[#156B43]",
    text: "text-white",
    iconColor: "text-white",
    timeColor: "text-white/90",
    arrowColor: "text-[#1C8C58]",
  },
  {
    // Passo 2 - Azul
    bg: "bg-[#3B82F6]",
    border: "border-[#1E40AF]",
    shadow: "shadow-[4px_4px_0px_0px_#1E40AF]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#1E40AF]",
    hoverBg: "hover:bg-[#2563EB]",
    text: "text-white",
    iconColor: "text-white",
    timeColor: "text-white/90",
    arrowColor: "text-[#3B82F6]",
  },
  {
    // Passo 3 - Roxo
    bg: "bg-[#8B5CF6]",
    border: "border-[#6D28D9]",
    shadow: "shadow-[4px_4px_0px_0px_#6D28D9]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#6D28D9]",
    hoverBg: "hover:bg-[#7C3AED]",
    text: "text-white",
    iconColor: "text-white",
    timeColor: "text-white/90",
    arrowColor: "text-[#8B5CF6]",
  },
  {
    // Passo 4 - Amarelo
    bg: "bg-[#FBBF24]",
    border: "border-[#D97706]",
    shadow: "shadow-[4px_4px_0px_0px_#D97706]",
    hoverShadow: "hover:shadow-[2px_2px_0px_0px_#D97706]",
    hoverBg: "hover:bg-[#F59E0B]",
    text: "text-white",
    iconColor: "text-white",
    timeColor: "text-white/90",
    arrowColor: "text-[#FBBF24]",
  },
];

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onStartClick,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Section id="como-funciona" background="white">
      <Container>
        <div className="text-center mb-16 lg:mb-24">
          <Heading className="text-3xl md:text-4xl lg:text-5xl">
            Como Funciona em 4 Passos
          </Heading>
          <p className="text-base md:text-lg text-[#6B7280] mt-4 max-w-2xl mx-auto">
            Simples, rápido e eficaz
          </p>
        </div>

        <div className="relative" ref={ref}>
          {/* Linha conectora - Desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 z-0">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C8C58]/20 via-[#3B82F6]/20 via-[#8B5CF6]/20 to-[#FBBF24]/20"></div>
              {/* Setas ao longo da linha */}
              {[0, 1, 2].map((i) => {
                const colors = stepColors[i + 1];
                const position = ((i + 1) * 100) / 4;
                return (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                    style={{ left: `${position}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.3 }}
                  >
                    <ArrowRight className={cn("w-6 h-6", colors.arrowColor)} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {STEPS.map((step, i) => {
              const Icon = stepIcons[i];
              const isLast = i === STEPS.length - 1;
              const colors = stepColors[i];

              return (
                <motion.div
                  key={i}
                  className="relative"
                  variants={cardVariants}
                >
                  {/* Card do passo */}
                  <div
                    className={cn(
                      "relative rounded-2xl p-6 lg:p-8 border-2 transition-all duration-200 cursor-pointer group",
                      colors.bg,
                      colors.border,
                      colors.shadow,
                      colors.hoverShadow,
                      colors.hoverBg,
                      "hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
                    )}
                  >
                    {/* Número do passo */}
                    <div
                      className={cn(
                        "absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-white text-sm lg:text-base font-bold shadow-lg z-10 border-2",
                        colors.bg,
                        colors.border
                      )}
                    >
                      {step.num}
                    </div>

                    {/* Ícone */}
                    <div className="flex justify-center mb-6 mt-4">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {Icon && (
                          <Icon
                            className={cn(
                              "w-8 h-8 lg:w-10 lg:h-10",
                              colors.iconColor
                            )}
                          />
                        )}
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className={cn("text-center space-y-3", colors.text)}>
                      <h3 className="text-lg lg:text-xl font-bold">
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm lg:text-base font-semibold",
                          colors.timeColor
                        )}
                      >
                        {step.time}
                      </p>
                      <p className="text-sm leading-relaxed opacity-90">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Seta conectora - Mobile/Tablet */}
                  {!isLast && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowRight
                        className={cn(
                          "w-6 h-6 rotate-90 opacity-40",
                          colors.arrowColor
                        )}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 lg:mt-16">
          <Button
            onClick={onStartClick}
            variant="outline"
            size="lg"
            className="border-2 border-[#1C8C58] text-[#1C8C58] hover:bg-[#1C8C58] hover:text-white font-semibold px-8 py-6 text-lg transition-all duration-300 rounded-xl cursor-pointer"
          >
            Começar Agora Grátis
          </Button>
        </div>
      </Container>
    </Section>
  );
};
