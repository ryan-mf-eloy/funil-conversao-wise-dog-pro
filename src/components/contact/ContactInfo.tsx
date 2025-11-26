import React from "react";
import Link from "next/link";
import { Card } from "@/components/common/Card";
import { Mail, MessageCircle, Share2, Lightbulb, ArrowRight, Facebook, Instagram } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const KawaiIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D2E29] mb-4">
          Como Podemos Ajudar?
        </h2>
        <p className="text-lg text-[#6B7280] leading-relaxed">
          Nossa equipe está pronta para responder suas dúvidas sobre o Wise Dog
          Pro, ajudar com problemas técnicos ou ouvir suas sugestões.
        </p>
      </div>

      <div className="space-y-4">
        <Card hover className="group flex items-start gap-5 p-6 border-2 border-transparent hover:border-[#1C8C58]/20 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1C8C58]/10 to-[#5BA67B]/10 flex items-center justify-center text-[#1C8C58] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#2D2E29] mb-1.5">Email</h3>
            <p className="text-[#6B7280] text-sm mb-3">
              Resposta em até 24 horas
            </p>
            <a
              href="mailto:suporte@wisedog.pro"
              className="inline-flex items-center gap-2 text-[#1C8C58] font-semibold hover:underline group-hover:gap-3 transition-all"
            >
              suporte@wisedog.pro
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Card>

        <Card hover className="group flex items-start gap-5 p-6 border-2 border-transparent hover:border-[#1C8C58]/20 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1C8C58]/10 to-[#5BA67B]/10 flex items-center justify-center text-[#1C8C58] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#2D2E29] mb-1.5">Chat ao Vivo</h3>
            <p className="text-[#6B7280] text-sm mb-3">
              Segunda a Sexta, 9h às 18h
            </p>
            <button className="inline-flex items-center gap-2 text-[#1C8C58] font-semibold hover:underline group-hover:gap-3 transition-all">
              Iniciar Chat
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>

        <Card hover className="group flex items-start gap-5 p-6 border-2 border-transparent hover:border-[#1C8C58]/20 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1C8C58]/10 to-[#5BA67B]/10 flex items-center justify-center text-[#1C8C58] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <Share2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#2D2E29] mb-1.5">Redes Sociais</h3>
            <p className="text-[#6B7280] text-sm mb-4">
              Siga-nos e envie mensagem
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 flex items-center justify-center text-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E4405F]/10 to-[#F56040]/10 hover:from-[#E4405F]/20 hover:to-[#F56040]/20 flex items-center justify-center text-[#E4405F] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-black/10 hover:bg-black/20 flex items-center justify-center text-black transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.kawai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/10 to-red-500/10 hover:from-pink-500/20 hover:to-red-500/20 flex items-center justify-center text-pink-600 transition-colors"
                aria-label="Kawai"
              >
                <KawaiIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-[#1C8C58]/5 to-[#5BA67B]/5 p-6 border-2 border-[#1C8C58]/10">
        <h3 className="font-bold text-lg text-[#2D2E29] mb-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1C8C58]/10 flex items-center justify-center text-[#1C8C58]">
            <Lightbulb className="w-5 h-5" />
          </div>
          Perguntas Frequentes
        </h3>
        <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
          Antes de enviar sua mensagem, confira se sua dúvida já foi respondida:
        </p>
        <Link
          href="/#faq"
          className="inline-flex items-center gap-2 text-[#1C8C58] font-semibold text-sm hover:underline group"
        >
          Ver FAQ Completo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Card>
    </div>
  );
};

