import React from "react";
import { Button } from "@/components/common/Button";
import { Heading } from "@/components/common/Heading";

interface ConfirmationProps {
  onBack: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] to-[#F8F4EB] flex items-center justify-center p-8">
      <div className="text-center max-w-lg">
        <div className="text-9xl mb-8 animate-[bounce_2s_ease-in-out_infinite]">
          🎉
        </div>
        <Heading level={1}>
          Bem-vindo ao
          <br />
          Wise Dog Pro!
        </Heading>
        <p className="text-xl text-[#6B7280] mb-10 leading-relaxed mt-6">
          Sua jornada personalizada está sendo preparada. Em breve você
          receberá um email com os próximos passos.
        </p>
        <Button onClick={onBack} size="lg">
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
};

