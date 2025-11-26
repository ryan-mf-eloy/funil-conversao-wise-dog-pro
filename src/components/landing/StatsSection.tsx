import React from "react";
import { Container } from "@/components/common/Container";
import { STATS } from "@/constants/data";

export const StatsSection: React.FC = () => {
  const icons = ["🐶", "⭐", "📚", "😊"];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FAFAF9] via-[#F8F4EB] to-white">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-[#D4C4A8]/20 hover:border-[#1C8C58]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {icons[i]}
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C8C58] mb-2 group-hover:text-[#156B43] transition-colors">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base text-[#6B7280] font-semibold leading-tight">
                  {stat.label}
                </p>
              </div>
              {/* Decorative element */}
              <div className="absolute top-2 right-2 w-12 h-12 bg-[#1C8C58]/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

