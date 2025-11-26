"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CreativePricing } from "@/components/ui/creative-pricing";
import type { PricingTier } from "@/components/ui/creative-pricing";
import { Button } from "@/components/common/Button";
import {
  Crown,
  Users,
  CheckCircle2,
  Star,
  TrendingUp,
  Users2,
  Shield,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Heart,
  Volume2,
  ArrowRight,
} from "lucide-react";
import { Confetti } from "./Confetti";
import { DevControls } from "@/components/dev/DevControls";
import type { QuizData } from "@/types";
import { cn } from "@/lib/utils";
import { Awards } from "@/components/ui/award";
import { LevelsCarousel } from "@/components/journey/LevelsCarousel";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { ScarcityBanner } from "@/components/landing/ScarcityBanner";

interface PaywallProps {
  onSelectPlan: (plan: string) => void;
  onBackToLoading?: () => void;
  onBackToQuiz?: () => void;
  quizData?: QuizData;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  petName: string;
  petBreed: string;
  rating: number;
  text: string;
  avatar: string;
}

export const Paywall: React.FC<PaywallProps> = ({
  onSelectPlan,
  onBackToLoading,
  onBackToQuiz,
  quizData,
}) => {
  const isDev = process.env.NODE_ENV === "development";
  const [showConfetti, setShowConfetti] = useState(true);
  const [showFullPaywall, setShowFullPaywall] = useState(() => {
    // Verificar sessionStorage para estado inicial
    if (typeof window !== "undefined") {
      const paywallView = sessionStorage.getItem("paywallView");
      const section = sessionStorage.getItem("currentSection");
      // Priorizar paywallView, depois currentSection
      if (paywallView === "full" || section === "paywall-full") {
        return true;
      }
      if (paywallView === "teaser" || section === "paywall-teaser") {
        return false;
      }
    }
    return false;
  });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Listener para controles do GlobalDevControls
  useEffect(() => {
    if (!isDev) return;

    const handleDevControl = (event: CustomEvent) => {
      const { action } = event.detail;

      switch (action) {
        case "triggerConfetti":
          setShowConfetti(false);
          setTimeout(() => {
            setShowConfetti(true);
          }, 100);
          break;
        case "resetAnimations":
          setAnimationKey((prev) => prev + 1);
          break;
        case "showTeaser":
          setShowFullPaywall(false);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("paywallView", "teaser");
            sessionStorage.setItem("currentSection", "paywall-teaser");
          }
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
          break;
        case "showFullPaywall":
          setShowFullPaywall(true);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("paywallView", "full");
            sessionStorage.setItem("currentSection", "paywall-full");
          }
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
          break;
      }
    };

    const handleResetAll = () => {
      setAnimationKey((prev) => prev + 1);
    };

    window.addEventListener(
      "devPaywallControl",
      handleDevControl as EventListener
    );
    window.addEventListener("resetAllAnimations", handleResetAll);

    // Salvar seção atual
    if (typeof window !== "undefined") {
      const section = showFullPaywall ? "paywall-full" : "paywall-teaser";
      sessionStorage.setItem("currentSection", section);
    }

    return () => {
      window.removeEventListener(
        "devPaywallControl",
        handleDevControl as EventListener
      );
      window.removeEventListener("resetAllAnimations", handleResetAll);
    };
  }, [isDev, showFullPaywall]);

  // Função para obter o conector correto baseado no gênero
  const getPetConnector = () => {
    if (!quizData?.name) return "";
    const gender = quizData.gender?.toLowerCase();
    if (gender === "fêmea" || gender === "femea") {
      return "da";
    } else if (gender === "macho") {
      return "do";
    }
    return "do";
  };

  const petName = quizData?.name || "seu cão";
  const petConnector = getPetConnector();

  // Os 7 níveis da jornada que a IA retornará
  const journeyLevels = [
    {
      id: 1,
      title: "Fundamentos",
      description: "Comandos básicos e primeiros passos",
      theme: "home",
      color: "#F8EBDD",
    },
    {
      id: 2,
      title: "Comportamento",
      description: "Correção de comportamentos indesejados",
      theme: "park",
      color: "#E8F5E9",
    },
    {
      id: 3,
      title: "Passeios",
      description: "Aprenda a caminhar com seu cão",
      theme: "street",
      color: "#EFEBE9",
    },
    {
      id: 4,
      title: "Truques",
      description: "Ensine truques divertidos ao seu cão",
      theme: "garden",
      color: "#F1F8E9",
    },
    {
      id: 5,
      title: "Socialização",
      description: "Ajude seu cão a se socializar",
      theme: "park",
      color: "#E8F5E9",
    },
    {
      id: 6,
      title: "Avançado",
      description: "Técnicas avançadas de treinamento",
      theme: "forest",
      color: "#E8F5E9",
    },
    {
      id: 7,
      title: "Mestre",
      description: "Torne-se um mestre em adestramento",
      theme: "beach",
      color: "#E0F2F1",
    },
  ];

  // Depoimentos reais
  const testimonials: Testimonial[] = [
    {
      name: "Mariana S.",
      petName: "Luna",
      petBreed: "Labrador",
      rating: 5,
      text: "Em 2 semanas Luna parou de pular nas visitas. App mudou nossa vida!",
      avatar: "M",
    },
    {
      name: "Carlos M.",
      petName: "Thor",
      petBreed: "SRD",
      rating: 5,
      text: "Economizei R$ 800 em adestrador. Thor aprendeu 5 comandos em 1 mês.",
      avatar: "C",
    },
    {
      name: "Juliana R.",
      petName: "Biscoito",
      petBreed: "Golden Retriever",
      rating: 5,
      text: "Biscoito agora obedece comandos básicos. Lições são claras e funcionam!",
      avatar: "J",
    },
  ];

  // FAQ
  const faqs: FAQItem[] = [
    {
      question: "Posso cancelar a qualquer momento?",
      answer:
        "Sim! Cancele quando quiser, sem multa ou burocracia. Seu acesso continua até o fim do período pago.",
    },
    {
      question: "Funciona para qualquer raça?",
      answer:
        "Sim, incluindo SRD (vira-latas). O plano é personalizado para o perfil único do seu cão, independente da raça.",
    },
    {
      question: "E se eu não tiver tempo?",
      answer:
        "Lições de apenas 10-15 min/dia. Você escolhe o horário que funciona melhor para você e seu pet.",
    },
    {
      question: "Preciso de equipamento especial?",
      answer:
        "Não! O app inclui clicker e apito virtuais. Tudo que você precisa está no seu celular.",
    },
    {
      question: "Funciona offline?",
      answer:
        "Sim! Baixe as lições e treine sem internet. Perfeito para quando estiver no parque ou em áreas sem sinal.",
    },
    {
      question: "E se meu cão não aprender?",
      answer:
        "Temos garantia de 30 dias. Se não funcionar, devolvemos 100% do seu dinheiro, sem perguntas.",
    },
    {
      question: "Posso usar para múltiplos pets?",
      answer:
        "Sim! Planos Premium e Família permitem cadastrar até 5 e 10 pets respectivamente, cada um com seu plano personalizado.",
    },
  ];

  useEffect(() => {
    // Mostrar confetes apenas uma vez quando a página abrir
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      clearTimeout(confettiTimer);
    };
  }, []);

  // Detectar scroll para mostrar CTA sticky
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollTop = scrollRef.current.scrollTop;
        setShowStickyCTA(scrollTop > 200);
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, [showFullPaywall]);

  const tiers: PricingTier[] = [
    {
      name: "Básico",
      icon: <span className="text-2xl">🐕</span>,
      price: 29.9,
      annualPrice: 287.04, // 20% de desconto (29.9 * 12 * 0.8)
      description: "Treinamento completo sem extras",
      color: "amber",
      features: [
        "Tudo do plano Free",
        "Até 3 pets",
        "100+ lições completas",
        "Personalização avançada",
        "Ferramentas completas",
        "Lembretes ilimitados",
        "Calendário básico",
        "Sem anúncios",
      ],
    },
    {
      name: "Premium",
      icon: <Crown className="w-6 h-6" />,
      price: 49.9,
      annualPrice: 479.04, // 20% de desconto (49.9 * 12 * 0.8)
      description: "Máximo valor com IA e comunidade",
      color: "purple",
      features: [
        "Tudo do plano Básico",
        "Até 5 pets",
        "Chat assistente IA ilimitado",
        "Identificação de raça IA",
        "Diagnóstico por foto",
        "Calendário completo",
        "Timeline de lembranças",
        "Emagrecimento + calorias",
        "Armazenamento 500MB",
        "Acesso à comunidade",
        "Cupons exclusivos",
      ],
      popular: true,
    },
    {
      name: "Família",
      icon: <Users className="w-6 h-6" />,
      price: 79.9,
      annualPrice: 767.04, // 20% de desconto (79.9 * 12 * 0.8)
      description: "Para famílias com múltiplos pets",
      color: "blue",
      features: [
        "Tudo do plano Premium",
        "Até 10 pets",
        "Armazenamento 2GB",
        "Relatórios avançados",
        "Até 3 usuários",
        "Prioridade em marketplace",
      ],
    },
  ];

  const handlePlanSelect = (tier: PricingTier) => {
    onSelectPlan(tier.name.toLowerCase());
  };

  const handleShowFullPaywall = () => {
    setShowFullPaywall(true);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  // Tela 1: Teaser (Não-scrollable)
  if (!showFullPaywall) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] to-[#F8F4EB] flex items-center justify-center p-6 relative overflow-hidden">
        {showConfetti && <Confetti duration={3000} />}

        {/* Dev Controls */}
        {isDev && (
          <DevControls>
            <div className="space-y-2">
              <Button
                size="sm"
                onClick={() => {
                  setShowConfetti(false);
                  setTimeout(() => {
                    setShowConfetti(true);
                  }, 100);
                }}
                variant="outline"
                className="w-full text-xs"
              >
                🎉 Reiniciar Confetes
              </Button>
              <Button
                size="sm"
                onClick={handleShowFullPaywall}
                className="w-full text-xs bg-[#1C8C58] hover:bg-[#156B43]"
              >
                ⏭️ Pular para Paywall Completo
              </Button>
              {onBackToLoading && (
                <Button
                  size="sm"
                  onClick={onBackToLoading}
                  variant="outline"
                  className="w-full text-xs"
                >
                  ⬅️ Voltar ao Loading
                </Button>
              )}
              {onBackToQuiz && (
                <Button
                  size="sm"
                  onClick={onBackToQuiz}
                  variant="outline"
                  className="w-full text-xs"
                >
                  ⬅️ Voltar ao Quiz
                </Button>
              )}
            </div>
          </DevControls>
        )}

        <motion.div
          key={`main-container-${animationKey}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full text-center"
        >
          {/* Seção 1: Headline Personalizada - Estilo CreativePricing */}
          <motion.div
            key={`headline-${animationKey}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 space-y-6"
          >
            <div className="text-xl text-zinc-600 dark:text-zinc-400 rotate-[-1deg]">
              Plano Personalizado
            </div>
            <div className="relative flex justify-center">
              <AnimatedText
                text={
                  quizData?.name
                    ? `Seu plano ${petConnector} ${petName} está pronto!`
                    : "Seu plano personalizado está pronto!"
                }
                textClassName="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white rotate-[-1deg] mb-4"
                underlineClassName="text-[#1C8C58]"
                underlinePath="M 0,10 Q 200,0 400,10 Q 600,20 800,10 Q 1000,0 1200,10"
                underlineHoverPath="M 0,10 Q 200,20 400,10 Q 600,0 800,10 Q 1000,20 1200,10"
                underlineDuration={1.5}
                className="items-center"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-3 bg-zinc-900/20 dark:bg-white/20 rotate-[-1deg] rounded-full blur-sm" />
            </div>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 rotate-[-1deg]">
              Veja seu cão obedecendo em 2 semanas
            </p>
          </motion.div>

          {/* Seção 2: Preview do Plano - Minimalista */}
          <motion.div
            key={`preview-${animationKey}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 relative mt-32"
          >
            {/* Imagem do Bulldog - Base encostando no topo do container, centralizada, com container sobrepondo parte da base */}
            <motion.div
              key={`bulldog-${animationKey}`}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="absolute w-96 h-96 md:w-[28rem] md:h-[28rem] z-0 pointer-events-none"
              style={{
                top: "-97%",
                left: "21%",
                transform: "translateX(-50%)",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/assets/bulldog-teaser.png"
                  alt="Bulldog"
                  fill
                  className="object-contain drop-shadow-2xl"
                  unoptimized
                />
              </div>
            </motion.div>

            <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg p-4 relative py-10 z-10 shadow-[0_-6px_20px_rgba(0,0,0,0.08)]">
              {/* Overlay para criar efeito de sobreposição na base da imagem - apenas uma pequena parte */}
              <div className="absolute top-0 left-0 right-0 h-12 md:h-16 bg-white dark:bg-zinc-900 z-20 pointer-events-none rounded-t-lg" />
              {/* Conteúdo com espaçamento para não ficar sobreposto pela imagem */}
              <div className="relative z-30">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Sua Jornada de Treinamento
                </h3>
                <LevelsCarousel levels={journeyLevels} />
              </div>
            </div>
          </motion.div>

          {/* Seção 3: CTA Primário - Estilo CreativePricing */}
          <motion.div
            key={`cta-${animationKey}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={handleShowFullPaywall}
              size="lg"
              className="group bg-[#1C8C58] text-white border-2 border-[#156B43] shadow-[4px_4px_0px_0px] shadow-[#156B43] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-[#156B43] hover:border-[#0F5A35] hover:shadow-[#0F5A35] active:translate-x-[-1px] active:translate-y-[-1px] active:shadow-[4px_4px_0px_0px] transition-all duration-200 px-8 py-6 text-lg font-semibold z-50"
            >
              <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                Ver Meu Plano Completo
                <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Button>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4">
              Plano personalizado baseado nas suas respostas
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Tela 2: Paywall Principal (Scrollable - Minimalista)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] to-[#F8F4EB] relative overflow-hidden">
      <ScarcityBanner />
      {showConfetti && <Confetti duration={3000} />}

      <div
        ref={scrollRef}
        className="h-screen overflow-y-auto scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* ACIMA DA DOBRA - Minimalista */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            {/* Headline Personalizada - Estilo CreativePricing */}
            <div className="text-center space-y-6 mb-16">
              <div className="text-xl text-zinc-600 dark:text-zinc-400 rotate-[-1deg]">
                Plano Personalizado
              </div>
              <div className="relative">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white rotate-[-1deg] mb-4"
                >
                  {quizData?.name ? (
                    <>
                      Seu plano {petConnector}{" "}
                      <span className="text-zinc-900 dark:text-white">
                        {petName}
                      </span>{" "}
                      está pronto!
                    </>
                  ) : (
                    <>
                      Seu plano{" "}
                      <span className="text-zinc-900 dark:text-white">
                        personalizado
                      </span>{" "}
                      está pronto!
                    </>
                  )}
                </motion.h1>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-3 bg-zinc-900/20 dark:bg-white/20 rotate-[-1deg] rounded-full blur-sm" />
              </div>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 rotate-[-1deg] max-w-2xl mx-auto">
                Veja seu cão obedecendo em 2 semanas. Comece grátis por 7 dias.
              </p>
            </div>

            {/* Preview Minimalista das Lições */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg shadow-[4px_4px_0px_0px] shadow-zinc-900 dark:shadow-white rotate-[-1deg]" />
                <div className="relative bg-white dark:bg-zinc-900 p-8 rounded-lg border-2 border-zinc-900 dark:border-white">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                    Sua Jornada de Treinamento
                  </h2>
                  <LevelsCarousel levels={journeyLevels} />
                </div>
              </div>
            </motion.div>

            {/* CTA Inicial - Após ver a jornada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16 text-center"
            >
              <Button
                onClick={() => {
                  // Scroll para seção de preços
                  const pricingSection =
                    document.getElementById("pricing-section");
                  if (pricingSection) {
                    pricingSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                size="lg"
                className="group bg-[#1C8C58] text-white border-2 border-[#156B43] shadow-[4px_4px_0px_0px] shadow-[#156B43] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-[#156B43] hover:border-[#0F5A35] hover:shadow-[#0F5A35] active:translate-x-[-1px] active:translate-y-[-1px] active:shadow-[4px_4px_0px_0px] transition-all duration-200 px-12 py-6 text-xl font-semibold"
              >
                <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                  Ver Planos e Preços
                  <ArrowRight className="w-6 h-6 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Button>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4">
                Sem cartão de crédito • Cancele quando quiser
              </p>
            </motion.div>
          </motion.div>

          {/* SCROLL 1: Benefícios Transformadores - O QUE ele vai conseguir */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                O Que {petName} Vai Aprender
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Resultados reais que você verá nas primeiras semanas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: "🐕",
                  title: "Obediência em 2 Semanas",
                  desc: "Veja seu cão respondendo a comandos básicos como 'senta', 'fica' e 'vem'",
                  highlight: "Resultado rápido e visível",
                },
                {
                  icon: "🔇",
                  title: "Fim dos Latidos Excessivos",
                  desc: "Reduza latidos em até 70% em 1 mês com técnicas comprovadas",
                  highlight: "Paz em casa",
                },
                {
                  icon: "🚶",
                  title: "Passeios Sem Puxões",
                  desc: "Aprenda a caminhar com seu cão na coleira sem ser arrastado",
                  highlight: "Passeios agradáveis",
                },
                {
                  icon: "👥",
                  title: "Socialização Perfeita",
                  desc: "Seu cão vai interagir melhor com pessoas e outros animais",
                  highlight: "Mais confiança",
                },
                {
                  icon: "❤️",
                  title: "Vínculo Mais Forte",
                  desc: "Crie uma conexão profunda e duradoura com seu melhor amigo",
                  highlight: "Relacionamento único",
                },
                {
                  icon: "🎓",
                  title: "Truques Avançados",
                  desc: "Ensine truques divertidos que impressionam família e amigos",
                  highlight: "Diversão garantida",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg p-6 relative group hover:shadow-[6px_6px_0px_0px] hover:shadow-zinc-900 dark:hover:shadow-white transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                    {benefit.desc}
                  </p>
                  <div className="text-sm font-semibold text-[#1C8C58]">
                    ✨ {benefit.highlight}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SCROLL 2: Prova Social - Depoimentos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                Tutores Que Já Transformaram Seus Cães
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Veja resultados reais de pessoas como você
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg shadow-[4px_4px_0px_0px] shadow-zinc-900 dark:shadow-white transition-all duration-300 group-hover:shadow-[6px_6px_0px_0px] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" />
                  <div className="relative bg-white dark:bg-zinc-900 p-6 rounded-lg border-2 border-zinc-900 dark:border-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-white border-2 border-zinc-900 dark:border-white flex items-center justify-center text-white dark:text-zinc-900 font-bold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          {testimonial.petName} ({testimonial.petBreed})
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i <= testimonial.rating
                              ? "fill-zinc-900 dark:fill-white text-zinc-900 dark:text-white"
                              : "fill-zinc-200 dark:fill-zinc-700 text-zinc-200 dark:text-zinc-700"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Proof Stats */}
            <div className="bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-900 dark:border-white rounded-lg p-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                    12.000+
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    Tutores já treinaram
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 fill-zinc-900 dark:fill-white text-zinc-900 dark:text-white"
                      />
                    ))}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    4.8/5 na App Store
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                    98%
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    Taxa de sucesso
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SCROLL 3: Seção de Preços - Posição Estratégica */}
          <motion.div
            id="pricing-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <CreativePricing
              tag="Escolha seu plano"
              title="Transforme seu cão em um campeão"
              description="Comece com 7 dias grátis, sem cartão de crédito"
              tiers={tiers}
              onSelectTier={(tier) => handlePlanSelect(tier)}
            />
          </motion.div>

          {/* SCROLL 4: Comparação de Custo - Economia */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 text-center">
                Compare o Investimento
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-lg border-2 border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800">
                  <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                    R$ 1.800/ano
                  </div>
                  <div className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                    Adestrador Presencial
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    12 sessões × R$ 150
                  </div>
                </div>
                <div className="text-center p-6 rounded-lg border-2 border-zinc-900 dark:border-white bg-amber-400 dark:bg-amber-500">
                  <div className="text-3xl font-bold text-zinc-900 mb-2">
                    R$ 598/ano
                  </div>
                  <div className="text-lg font-semibold text-zinc-900 mb-2">
                    App de Adestramento
                  </div>
                  <div className="text-sm text-zinc-900 mb-4">R$ 49,90/mês</div>
                  <div className="text-lg font-bold text-zinc-900">
                    Economize R$ 1.202!
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SCROLL 5: Gamificação - Badges e Conquistas */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                Sistema de Gamificação
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Ganhe badges e conquistas ao completar lições e alcançar marcos
                no treinamento {petConnector} {petName}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Badge Bronze */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg p-6"
              >
                <Awards
                  variant="badge"
                  title="10"
                  subtitle="Lições Completas"
                  recipient="Bronze"
                  date="Iniciante"
                />
              </motion.div>

              {/* Badge Prata */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg p-6"
              >
                <Awards
                  variant="badge"
                  title="25"
                  subtitle="Lições Completas"
                  recipient="Prata"
                  date="Intermediário"
                />
              </motion.div>

              {/* Badge Ouro */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg p-6"
              >
                <Awards
                  variant="badge"
                  title="50"
                  subtitle="Lições Completas"
                  recipient="Ouro"
                  date="Avançado"
                />
              </motion.div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-900 dark:border-white rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                    🏆
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Conquistas
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                    🔥
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Streak de Dias
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                    ⭐
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Pontos XP
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                    📊
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Ranking
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SCROLL 6: Garantia - Reduzir Risco */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            {/* Garantia Destacada */}
            <div className="bg-zinc-900 dark:bg-white border-2 border-zinc-900 dark:border-white rounded-lg p-8 text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-white dark:text-zinc-900" />
              <h3 className="text-3xl font-bold mb-4 text-white dark:text-zinc-900">
                Garantia de 30 Dias
              </h3>
              <p className="text-lg mb-6 text-white/90 dark:text-zinc-900/90">
                Não funcionou? Reembolso total, sem perguntas. Você não tem nada
                a perder.
              </p>
              <Button
                onClick={() => {
                  // Scroll para seção de preços
                  const pricingSection =
                    document.getElementById("pricing-section");
                  if (pricingSection) {
                    pricingSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                size="lg"
                className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-2 border-white dark:border-zinc-900 shadow-[4px_4px_0px_0px] shadow-white dark:shadow-zinc-900 hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all px-12 py-6 text-lg font-semibold"
              >
                Ver Planos e Preços
              </Button>
            </div>
          </motion.div>

          {/* SCROLL 7: FAQ - Remover Objeções */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8 text-center">
              Perguntas Frequentes
            </h2>

            {/* FAQ Accordion Minimalista */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-zinc-900 rounded-lg border-2 border-zinc-900 dark:border-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <span className="font-semibold text-zinc-900 dark:text-white">
                      {faq.question}
                    </span>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-zinc-900 dark:text-white flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-600 dark:text-zinc-400 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4 text-zinc-600 dark:text-zinc-400 border-t-2 border-zinc-900 dark:border-white">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Final Sticky no Rodapé - Estilo Minimalista */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t-2 border-zinc-900 dark:border-white shadow-[0_-4px_0px_0px] shadow-zinc-900 dark:shadow-white">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Trial grátis de 7 dias • Cancele quando quiser
                </p>
              </div>
              <Button
                onClick={() => {
                  // Scroll para seção de preços
                  const pricingSection =
                    document.getElementById("pricing-section");
                  if (pricingSection) {
                    pricingSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                size="lg"
                className="group bg-[#1C8C58] text-white border-2 border-[#156B43] shadow-[4px_4px_0px_0px] shadow-[#156B43] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-[#156B43] hover:border-[#0F5A35] hover:shadow-[#0F5A35] active:translate-x-[-1px] active:translate-y-[-1px] active:shadow-[4px_4px_0px_0px] transition-all duration-200 px-8 py-3 font-semibold"
              >
                <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                  Ver Planos e Preços
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dev Controls */}
      {isDev && (
        <DevControls>
          <div className="space-y-2">
            <Button
              size="sm"
              onClick={() => {
                setShowConfetti(false);
                setTimeout(() => {
                  setShowConfetti(true);
                }, 100);
              }}
              variant="outline"
              className="w-full text-xs"
            >
              🎉 Reiniciar Confetes
            </Button>
            <Button
              size="sm"
              onClick={() => setShowFullPaywall(false)}
              variant="outline"
              className="w-full text-xs"
            >
              ⬅️ Voltar ao Teaser
            </Button>
            {onBackToLoading && (
              <Button
                size="sm"
                onClick={onBackToLoading}
                variant="outline"
                className="w-full text-xs"
              >
                ⬅️ Voltar ao Loading
              </Button>
            )}
            {onBackToQuiz && (
              <Button
                size="sm"
                onClick={onBackToQuiz}
                variant="outline"
                className="w-full text-xs"
              >
                ⬅️ Voltar ao Quiz
              </Button>
            )}
          </div>
        </DevControls>
      )}
    </div>
  );
};
