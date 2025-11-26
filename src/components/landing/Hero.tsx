import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { HeroPill } from "@/components/ui/hero-pill";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { STATS } from "@/constants/data";

interface HeroProps {
  onStartClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative bg-gradient-to-b from-white via-[#F8F4EB] to-[#FAFAF9] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-40 left-20 w-[500px] h-[500px] bg-[#1C8C58] rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-[#5BA67B] rounded-full blur-3xl"></div>
      </div>

      <Container className="relative py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="flex justify-center lg:justify-start">
              <HeroPill
                href="#como-funciona"
                label="Treinamento personalizado para seu cão"
                announcement="Novo"
                className="bg-[#1C8C58]/10 ring-[#1C8C58]/20 [&_div]:bg-[#1C8C58] [&_div]:text-white [&_p]:text-[#1C8C58] [&_svg_path]:fill-[#1C8C58]"
              />
            </div>

            <div className="relative">
              <AnimatedText
                text="Seu cão merece o melhor treinamento"
                textClassName="text-4xl md:text-5xl lg:text-6xl text-[#2D2E29] font-bold text-center lg:text-left"
                underlineClassName="text-[#1C8C58]"
                underlinePath="M 0,10 Q 150,0 300,10 Q 450,20 600,10 Q 750,0 900,10"
                underlineHoverPath="M 0,10 Q 150,20 300,10 Q 450,0 600,10 Q 750,20 900,10"
                underlineDuration={1.5}
                className="items-start"
              />
              <p className="text-lg md:text-xl text-[#6B7280] mt-6 max-w-2xl text-center lg:text-left">
                Jornada personalizada com IA • Chat especialista 24/7
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                onClick={onStartClick}
                variant="default"
                size="xl"
                className="group font-bold"
              >
                <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                  Começar Quiz Grátis
                  <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-2 justify-center lg:justify-start flex-wrap">
              <div className="flex items-center gap-3">
                <AvatarCircles
                  avatarUrls={[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
                  ]}
                  numPeople={50}
                  className="flex-shrink-0"
                />
                <span className="text-sm text-[#6B7280] font-medium">
                  50K+ tutores confiam
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-[#FBBF24] text-base">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-[#6B7280] font-medium">
                  4.8/5
                </span>
              </div>
            </div>

            <p className="text-xs text-[#9CA3AF] flex items-center gap-2 justify-center lg:justify-start pt-2">
              <span className="text-[#1C8C58]">✓</span>7 dias grátis • Sem
              cartão • Cancele quando quiser
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="relative w-[700px] h-[700px]">
                <div className="p-16 h-full w-full rounded-3xl">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/assets/qrcode.png"
                      alt="QR Code Wise Dog Pro"
                      width={300}
                      height={300}
                      className="w-full max-w-[700px] h-auto"
                    />
                  </div>

                  <div className="absolute -top-6 -left-6 bg-white rounded-xl p-5 shadow-lg border border-[#D4C4A8]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#1C8C58] rounded-full animate-pulse"></div>
                      <div>
                        <p className="text-xs text-[#9CA3AF] font-medium">
                          Jornada
                        </p>
                        <p className="text-base font-semibold text-[#1C8C58]">
                          85%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-5 shadow-lg border border-[#D4C4A8]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#FBBF24] rounded-full"></div>
                      <div>
                        <p className="text-xs text-[#9CA3AF] font-medium">
                          Streak
                        </p>
                        <p className="text-base font-semibold text-[#F97316]">
                          7 dias
                        </p>
                      </div>
                    </div>
                  </div>

                  <svg className="absolute -top-[999px] -left-[999px] w-0 h-0">
                    <defs>
                      <clipPath
                        id="clip-pattern-qrcode"
                        clipPathUnits={"objectBoundingBox"}
                      >
                        <path
                          d="M0.997417 0.541807C1.02854 0.316235 0.773628 -0.00919936 0.492039 0.000199072C0.249199 0.00830422 0 0.217547 0 0.539457C0.0251948 0.836695 0.248984 1 0.492039 1C0.745469 1 0.982596 0.83787 0.997417 0.541807Z"
                          fill="#D9D9D9"
                        />
                      </clipPath>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>
                  {/* Imagem principal do cachorro */}
                  <div
                    className="absolute -top-6 -right-6 group cursor-pointer transition-all duration-300 hover:scale-105 hover:-rotate-2 z-10"
                    style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                  >
                    <div
                      className="relative w-[200px] h-[200px] bg-gradient-to-br from-[#FBBF24] via-[#FCD34D] to-[#FBBF24] p-[6px] shadow-2xl"
                      style={{
                        clipPath: "url(#clip-pattern-qrcode)",
                        filter:
                          "drop-shadow(0 10px 25px rgba(251, 191, 36, 0.4))",
                      }}
                    >
                      <div
                        className="relative w-full h-full bg-[#F59E0B] overflow-hidden"
                        style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
                        <Image
                          src="/assets/penelope-corgi.avif"
                          alt="Cão sendo adestrado"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FBBF24]/20 via-transparent to-transparent" />
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#1C8C58] rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xs">🐾</span>
                    </div>
                  </div>

                  {/* Imagens menores de cachorros ao redor - posicionamento natural e aleatório */}
                  {/* Cachorro 1 */}
                  <div
                    className="absolute -top-8 -left-20 group cursor-pointer transition-all duration-300 hover:scale-110 z-0"
                    style={{ 
                      clipPath: "url(#clip-pattern-qrcode)",
                      transform: "rotate(-12deg)"
                    }}
                  >
                    <div
                      className="relative w-[75px] h-[75px] bg-gradient-to-br from-[#1C8C58] via-[#5BA67B] to-[#1C8C58] p-[3px] shadow-lg"
                      style={{
                        clipPath: "url(#clip-pattern-qrcode)",
                        filter:
                          "drop-shadow(0 5px 15px rgba(28, 140, 88, 0.3))",
                      }}
                    >
                      <div
                        className="relative w-full h-full bg-[#156B43] overflow-hidden"
                        style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                      >
                        <Image
                          src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&q=80"
                          alt="Cão treinando"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cachorro 2 */}
                  <div
                    className="absolute top-4 right-12 group cursor-pointer transition-all duration-300 hover:scale-110 z-0"
                    style={{ 
                      clipPath: "url(#clip-pattern-qrcode)",
                      transform: "rotate(8deg)"
                    }}
                  >
                    <div
                      className="relative w-[85px] h-[85px] bg-gradient-to-br from-[#F97316] via-[#FB923C] to-[#F97316] p-[3px] shadow-lg"
                      style={{
                        clipPath: "url(#clip-pattern-qrcode)",
                        filter:
                          "drop-shadow(0 5px 15px rgba(249, 115, 22, 0.3))",
                      }}
                    >
                      <div
                        className="relative w-full h-full bg-[#EA580C] overflow-hidden"
                        style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                      >
                        <Image
                          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop&q=80"
                          alt="Cão treinando"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cachorro 3 */}
                  <div
                    className="absolute left-4 top-1/3 group cursor-pointer transition-all duration-300 hover:scale-110 z-0"
                    style={{ 
                      clipPath: "url(#clip-pattern-qrcode)",
                      transform: "rotate(15deg)"
                    }}
                  >
                    <div
                      className="relative w-[70px] h-[70px] bg-gradient-to-br from-[#5BA67B] via-[#1C8C58] to-[#5BA67B] p-[3px] shadow-lg"
                      style={{
                        clipPath: "url(#clip-pattern-qrcode)",
                        filter:
                          "drop-shadow(0 5px 15px rgba(91, 166, 123, 0.3))",
                      }}
                    >
                      <div
                        className="relative w-full h-full bg-[#156B43] overflow-hidden"
                        style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                      >
                        <Image
                          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=200&h=200&fit=crop&q=80"
                          alt="Cão treinando"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cachorro 4 */}
                  <div
                    className="absolute right-8 top-2/3 group cursor-pointer transition-all duration-300 hover:scale-110 z-0"
                    style={{ 
                      clipPath: "url(#clip-pattern-qrcode)",
                      transform: "rotate(-18deg)"
                    }}
                  >
                    <div
                      className="relative w-[90px] h-[90px] bg-gradient-to-br from-[#FBBF24] via-[#FCD34D] to-[#FBBF24] p-[3px] shadow-lg"
                      style={{
                        clipPath: "url(#clip-pattern-qrcode)",
                        filter:
                          "drop-shadow(0 5px 15px rgba(251, 191, 36, 0.3))",
                      }}
                    >
                      <div
                        className="relative w-full h-full bg-[#F59E0B] overflow-hidden"
                        style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                      >
                        <Image
                          src="https://images.unsplash.com/photo-1534361960057-19889c4d8d1a?w=200&h=200&fit=crop&q=80"
                          alt="Cão treinando"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cachorro 5 */}
                  <div
                    className="absolute -bottom-6 -left-16 group cursor-pointer transition-all duration-300 hover:scale-110 z-0"
                    style={{ 
                      clipPath: "url(#clip-pattern-qrcode)",
                      transform: "rotate(10deg)"
                    }}
                  >
                    <div
                      className="relative w-[80px] h-[80px] bg-gradient-to-br from-[#FB923C] via-[#F97316] to-[#FB923C] p-[3px] shadow-lg"
                      style={{
                        clipPath: "url(#clip-pattern-qrcode)",
                        filter:
                          "drop-shadow(0 5px 15px rgba(251, 146, 60, 0.3))",
                      }}
                    >
                      <div
                        className="relative w-full h-full bg-[#EA580C] overflow-hidden"
                        style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                      >
                        <Image
                          src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=200&h=200&fit=crop&q=80"
                          alt="Cão treinando"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cachorro 6 */}
                  <div
                    className="absolute bottom-8 right-0 group cursor-pointer transition-all duration-300 hover:scale-110 z-0"
                    style={{ 
                      clipPath: "url(#clip-pattern-qrcode)",
                      transform: "rotate(-5deg)"
                    }}
                  >
                    <div
                      className="relative w-[65px] h-[65px] bg-gradient-to-br from-[#1C8C58] via-[#5BA67B] to-[#1C8C58] p-[3px] shadow-lg"
                      style={{
                        clipPath: "url(#clip-pattern-qrcode)",
                        filter:
                          "drop-shadow(0 5px 15px rgba(28, 140, 88, 0.3))",
                      }}
                    >
                      <div
                        className="relative w-full h-full bg-[#156B43] overflow-hidden"
                        style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                      >
                        <Image
                          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop&q=80"
                          alt="Cão treinando"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cachorro 7 - Extra para mais naturalidade */}
                  <div
                    className="absolute top-1/2 -left-10 group cursor-pointer transition-all duration-300 hover:scale-110 z-0"
                    style={{ 
                      clipPath: "url(#clip-pattern-qrcode)",
                      transform: "rotate(-8deg) translateY(-50%)"
                    }}
                  >
                    <div
                      className="relative w-[72px] h-[72px] bg-gradient-to-br from-[#FBBF24] via-[#FCD34D] to-[#FBBF24] p-[3px] shadow-lg"
                      style={{
                        clipPath: "url(#clip-pattern-qrcode)",
                        filter:
                          "drop-shadow(0 5px 15px rgba(251, 191, 36, 0.3))",
                      }}
                    >
                      <div
                        className="relative w-full h-full bg-[#F59E0B] overflow-hidden"
                        style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                      >
                        <Image
                          src="https://images.unsplash.com/photo-1551717743-49959800b1f6?w=200&h=200&fit=crop&q=80"
                          alt="Cão treinando"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ clipPath: "url(#clip-pattern-qrcode)" }}
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 lg:mt-24 pt-16 border-t border-[#D4C4A8]/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat, i) => {
              const icons = ["🐶", "⭐", "📚", "😊"];
              return (
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
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
