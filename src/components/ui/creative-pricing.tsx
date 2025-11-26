"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Pencil, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  icon: React.ReactNode;
  price: number; // Preço mensal
  annualPrice?: number; // Preço anual (opcional, calculado automaticamente se não fornecido)
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

function CreativePricing({
  tag = "Simple Pricing",
  title = "Make Short Videos That Pop",
  description = "Edit, enhance, and go viral in minutes",
  tiers,
  onSelectTier,
}: {
  tag?: string;
  title?: string;
  description?: string;
  tiers: PricingTier[];
  onSelectTier?: (tier: PricingTier) => void;
}) {
  const [isAnnual, setIsAnnual] = useState(false);

  // Calcular desconto médio
  const calculateDiscount = (monthlyPrice: number, annualPrice: number) => {
    const monthlyTotal = monthlyPrice * 12;
    const discount = ((monthlyTotal - annualPrice) / monthlyTotal) * 100;
    return Math.round(discount);
  };

  // Calcular preço anual se não fornecido (20% de desconto padrão)
  const getAnnualPrice = (tier: PricingTier) => {
    if (tier.annualPrice) return tier.annualPrice;
    return tier.price * 12 * 0.8; // 20% de desconto
  };

  // Calcular desconto para cada tier
  const getDiscount = (tier: PricingTier) => {
    const annualPrice = getAnnualPrice(tier);
    return calculateDiscount(tier.price, annualPrice);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center space-y-6 mb-16">
        <div className="text-xl text-blue-500 rotate-[-1deg]">{tag}</div>
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white rotate-[-1deg]">
            {title}
            <div className="absolute -right-12 top-0 text-amber-500 rotate-12">
              ✨
            </div>
            <div className="absolute -left-8 bottom-0 text-blue-500 -rotate-12">
              ⭐️
            </div>
          </h2>
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-3 bg-blue-500/20 
            rotate-[-1deg] rounded-full blur-sm"
          />
        </div>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 rotate-[-1deg]">
          {description}
        </p>

        {/* Switcher Mensal/Anual */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span
            className={cn(
              "text-lg font-semibold transition-colors",
              !isAnnual
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-400 dark:text-zinc-500"
            )}
          >
            Mensal
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={cn(
              "relative w-16 h-8 rounded-full border-2 transition-colors duration-300",
              "border-zinc-900 dark:border-white",
              isAnnual ? "bg-[#1C8C58]" : "bg-zinc-200 dark:bg-zinc-700"
            )}
            aria-label="Alternar entre mensal e anual"
          >
            <div
              className={cn(
                "absolute w-7 h-7 rounded-full bg-white dark:bg-zinc-900",
                "border-2 border-zinc-900 dark:border-white",
                "transition-all duration-300 shadow-sm"
              )}
              style={{
                top: "0px",
                left: isAnnual ? "calc(100% - 38px)" : "2px",
              }}
            />
          </button>
          <div className="relative flex items-center">
            <span
              className={cn(
                "text-lg font-semibold transition-colors",
                isAnnual
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-400 dark:text-zinc-500"
              )}
            >
              Anual
            </span>
            {isAnnual && (
              <span className="absolute -top-3 left-full ml-2 text-xs font-bold text-[#1C8C58] bg-[#1C8C58]/15 dark:bg-[#1C8C58]/25 px-2.5 py-1 rounded-md border-2 border-[#1C8C58]/40 whitespace-nowrap shadow-sm">
                Economize até {Math.max(...tiers.map((t) => getDiscount(t)))}%
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 gap-8 ${
          tiers.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
        } max-w-5xl mx-auto`}
      >
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={cn(
              "relative group",
              "transition-all duration-300",
              tiers.length === 2
                ? index === 0
                  ? "rotate-[-1deg]"
                  : "rotate-[1deg]"
                : index === 0
                ? "rotate-[-1deg]"
                : index === 1
                ? "rotate-[1deg]"
                : "rotate-[-2deg]"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 bg-white dark:bg-zinc-900",
                "border-2 border-zinc-900 dark:border-white",
                "rounded-lg shadow-[4px_4px_0px_0px] shadow-zinc-900 dark:shadow-white",
                "transition-all duration-300",
                "group-hover:shadow-[8px_8px_0px_0px]",
                "group-hover:translate-x-[-4px]",
                "group-hover:translate-y-[-4px]"
              )}
            />

            <div className="relative p-6">
              {tier.popular && (
                <div
                  className="absolute -top-2 -right-2 bg-amber-400 text-zinc-900 
                  px-3 py-1 rounded-full rotate-12 text-sm border-2 border-zinc-900 font-semibold"
                >
                  Popular!
                </div>
              )}

              <div className="mb-6">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full mb-4",
                    "flex items-center justify-center",
                    "border-2 border-zinc-900 dark:border-white",
                    tier.color === "amber" && "text-amber-500",
                    tier.color === "blue" && "text-blue-500",
                    tier.color === "purple" && "text-purple-500"
                  )}
                >
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {tier.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {isAnnual ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                        R${" "}
                        {(getAnnualPrice(tier) / 12)
                          .toFixed(2)
                          .replace(".", ",")}
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-400 text-lg">
                        /mês
                      </span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        R$ {getAnnualPrice(tier).toFixed(2).replace(".", ",")}
                        /ano
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1C8C58] bg-[#1C8C58]/10 dark:bg-[#1C8C58]/20 px-2 py-0.5 rounded">
                          Economize {getDiscount(tier)}%
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          (R${" "}
                          {(tier.price * 12 - getAnnualPrice(tier))
                            .toFixed(2)
                            .replace(".", ",")}
                          /ano)
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                      R$ {tier.price.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      /mês
                    </span>
                  </>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-zinc-900 
                      dark:border-white flex items-center justify-center"
                    >
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-lg text-zinc-900 dark:text-white">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => onSelectTier?.(tier)}
                className={cn(
                  "w-full h-12 text-lg relative font-semibold",
                  "border-2 border-zinc-900 dark:border-white",
                  "transition-all duration-300",
                  "shadow-[4px_4px_0px_0px] shadow-zinc-900 dark:shadow-white",
                  "hover:shadow-[6px_6px_0px_0px]",
                  "hover:translate-x-[-2px] hover:translate-y-[-2px]",
                  tier.popular
                    ? [
                        "bg-amber-400 text-zinc-900",
                        "hover:bg-amber-300",
                        "active:bg-amber-400",
                        "dark:hover:bg-amber-300",
                        "dark:active:bg-amber-400",
                      ]
                    : [
                        "bg-zinc-50 dark:bg-zinc-800",
                        "text-zinc-900 dark:text-white",
                        "hover:bg-white dark:hover:bg-zinc-700",
                        "active:bg-zinc-50 dark:active:bg-zinc-800",
                      ]
                )}
                variant="ghost"
              >
                Começar Trial Grátis
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="relative -z-10 mt-16 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-20 text-4xl rotate-12 opacity-20">
          ✎
        </div>
        <div className="absolute bottom-0 right-20 text-4xl -rotate-12 opacity-20">
          ✏️
        </div>
      </div>
    </div>
  );
}

export { CreativePricing };
