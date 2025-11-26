"use client";

import React from "react";
import { motion } from "motion/react";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { REVIEWS } from "@/constants/data";

export const TestimonialsAnimatedSection: React.FC = () => {
  const firstColumn = REVIEWS.slice(0, 3);
  const secondColumn = REVIEWS.slice(3, 6);
  const thirdColumn = REVIEWS.slice(6, 9);

  return (
    <section id="depoimentos" className="bg-[#FAFAF9] my-20 relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-10"
        >
          <div className="flex justify-center">
            <div className="border border-[#D4C4A8]/20 py-1 px-4 rounded-lg bg-white text-[#6B7280] text-sm font-medium">
              Depoimentos
            </div>
          </div>

          <Heading level={2} className="mt-5">
            O que nossos tutores dizem
          </Heading>
          <p className="text-center mt-5 text-[#6B7280] opacity-75">
            Veja o que nossos clientes têm a dizer sobre nós.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] h-[740px] overflow-hidden">
          <div className="h-full overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
          </div>
          <div className="h-full overflow-hidden hidden md:block">
            <TestimonialsColumn testimonials={secondColumn} duration={19} />
          </div>
          <div className="h-full overflow-hidden hidden lg:block">
            <TestimonialsColumn testimonials={thirdColumn} duration={17} />
          </div>
        </div>
      </Container>
    </section>
  );
};
