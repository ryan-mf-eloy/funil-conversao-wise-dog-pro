import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { PlayStoreButton } from "@/components/ui/play-store-button";

export const AppStoresSection: React.FC = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-[#1C8C58] to-[#5BA67B]">
      <Container size="md">
        <div className="text-center">
          <Heading className="text-white text-4xl md:text-5xl font-bold">
            Baixe Agora em Seu Dispositivo
          </Heading>
          <p className="text-lg md:text-xl text-white/95 mb-16 mt-6 font-medium">
            Disponível em iOS e Android
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="#" 
              className="min-w-[320px] sm:min-w-[350px]"
            >
              <AppStoreButton
                variant="secondary"
                className="bg-black text-white w-full h-20 text-lg shadow-2xl border-2 border-black/20 rounded-xl hover:bg-gray-900 hover:border-gray-700 transition-colors duration-300"
              />
            </Link>

            <Link 
              href="#" 
              className="min-w-[320px] sm:min-w-[350px]"
            >
              <PlayStoreButton
                variant="secondary"
                className="bg-white text-[#1C8C58] w-full h-20 text-lg shadow-2xl border-2 border-white/20 font-bold rounded-xl"
              />
            </Link>
          </div>

          <p className="text-sm md:text-base text-white/90 mt-12 flex items-center gap-2 justify-center font-medium">
            <span className="text-xl">✓</span>
            <span>
              7 dias grátis • Sem cartão de crédito • Cancele quando quiser
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
};

