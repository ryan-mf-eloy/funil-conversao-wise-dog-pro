import React from "react";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { MessageCircle, Zap } from "lucide-react";

export const ContactHero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-[#F8F4EB] to-[#FAFAF9] py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1C8C58]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5BA67B]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <Container size="md">
        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1C8C58]/10 to-[#5BA67B]/10 text-[#1C8C58] px-5 py-2.5 rounded-full text-sm font-semibold border border-[#1C8C58]/20 mb-8 shadow-sm">
            <Zap className="w-4 h-4" />
            Estamos aqui para ajudar
          </div>
          <Heading level={1} className="text-4xl md:text-5xl lg:text-6xl mb-6">
            Contato
          </Heading>
          <p className="text-lg md:text-xl text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
            Tem dúvidas, sugestões ou precisa de suporte? Envie sua mensagem e
            nossa equipe responderá em até 24 horas.
          </p>
        </div>
      </Container>
    </section>
  );
};

