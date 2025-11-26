import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2D2E29] text-white py-16 px-6">
      <Container>
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/app-icon.webp"
                  alt="Wise Dog Pro"
                  width={36}
                  height={36}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-lg font-semibold">Wise Dog Pro</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Links</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="#sobre"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a
                  href="/contato"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-2xl hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="#"
                className="text-2xl hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="#"
                className="text-2xl hover:opacity-80 transition-opacity"
                aria-label="TikTok"
              >
                🎵
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/60">
            © 2025 Wise Dog Pro. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};

