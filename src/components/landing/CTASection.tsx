import React from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onStartClick: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onStartClick }) => {
  return (
    <section className="py-28 bg-gradient-to-br from-[#2D2E29] to-[#156B43] text-white">
      <Container size="md">
        <div className="text-center">
          <Heading level={2} className="text-white">
            Pronto para Transformar seu Cão?
          </Heading>
          <p className="text-lg mb-10 opacity-90 mt-4">
            Junte-se a 50.000+ tutores que já estão vendo resultados
          </p>
          <Button
            onClick={onStartClick}
            variant="default"
            size="xl"
            className="group font-bold mb-6 bg-[#FBBF24] text-[#2D2E29] border-2 border-[#FBBF24] shadow-[4px_4px_0px_0px_#d4a017] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-[#FCD34D] hover:border-[#FCD34D] hover:shadow-[#d4a017] active:translate-x-[-1px] active:translate-y-[-1px] active:shadow-[4px_4px_0px_0px] transition-all duration-200"
          >
            <span className="flex items-center justify-center gap-2 whitespace-nowrap text-[#2D2E29]">
              Começar Quiz Grátis
              <ArrowRight className="w-5 h-5 flex-shrink-0 text-[#2D2E29] group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </Button>
          <p className="text-xs opacity-80">
            7 dias grátis • Sem cartão de crédito • Cancele quando quiser
          </p>
        </div>
      </Container>
    </section>
  );
};
