"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Check, ChevronDown, ChevronUp, X, Shield, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Confetti } from "./Confetti";
import { DevControls } from "@/components/dev/DevControls";
import { PaymentForm } from "./PaymentForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { QuizData } from "@/types";
import { cn } from "@/lib/utils";

interface PaywallProps {
  onSelectPlan: (plan: string) => void;
  onBackToLoading?: () => void;
  onBackToQuiz?: () => void;
  quizData?: QuizData;
}

// Dados do plano completo (8 semanas)
const fullPlanWeeks = [
  {
    week: 1,
    title: "Comandos Básicos",
    lessons: [
      { title: "Sentar", duration: "10 min", hasVideo: true },
      { title: "Deitar", duration: "15 min", hasVideo: true },
    ],
  },
  {
    week: 2,
    title: "Controle",
    lessons: [
      { title: "Ficar", duration: "12 min", hasVideo: true },
      { title: "Vir quando chamado", duration: "20 min", hasVideo: true },
    ],
  },
  {
    week: 3,
    title: "Socialização",
    lessons: [
      { title: "Interagir com outros cães", duration: "25 min", hasVideo: true },
      { title: "Aceitar carinho de estranhos", duration: "15 min", hasVideo: true },
    ],
  },
  {
    week: 4,
    title: "Comportamento",
    lessons: [
      { title: "Parar de pular", duration: "18 min", hasVideo: true },
      { title: "Não latir excessivamente", duration: "20 min", hasVideo: true },
    ],
  },
  {
    week: 5,
    title: "Passeio",
    lessons: [
      { title: "Caminhar na coleira", duration: "15 min", hasVideo: true },
      { title: "Não puxar a coleira", duration: "22 min", hasVideo: true },
    ],
  },
  {
    week: 6,
    title: "Avançado",
    lessons: [
      { title: "Rolamento", duration: "10 min", hasVideo: true },
      { title: "Dar a pata", duration: "8 min", hasVideo: true },
    ],
  },
  {
    week: 7,
    title: "Reforço",
    lessons: [
      { title: "Revisão de comandos", duration: "30 min", hasVideo: true },
      { title: "Consolidação", duration: "25 min", hasVideo: true },
    ],
  },
  {
    week: 8,
    title: "Master",
    lessons: [
      { title: "Comandos complexos", duration: "20 min", hasVideo: true },
      { title: "Certificação", duration: "15 min", hasVideo: false },
    ],
  },
];

// Depoimentos
const testimonials = [
  {
    name: "Mariana S.",
    petName: "Luna",
    petBreed: "Labrador",
    petAge: "2 anos",
    text: "Em 2 semanas Luna parou de pular nas visitas. O app mudou nossa vida!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Carlos M.",
    petName: "Thor",
    petBreed: "SRD",
    petAge: "1 ano",
    text: "Economizei R$ 800 em adestrador. Thor aprendeu 5 comandos em 1 mês.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
  },
  {
    name: "Juliana P.",
    petName: "Mel",
    petBreed: "Golden Retriever",
    petAge: "4 anos",
    text: "Mel tinha ansiedade de separação. Hoje fica calma sozinha. Obrigada!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
  },
];

// FAQ
const faqs = [
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim! Cancele em 1 clique nas configurações. Sem multa, sem burocracia.",
  },
  {
    question: "Funciona para qualquer raça?",
    answer: "Sim! Funciona para todas as raças, incluindo SRD (vira-latas). O plano é personalizado para o perfil único do seu cão.",
  },
  {
    question: "E se eu não tiver tempo?",
    answer: "Lições de apenas 10-15 min/dia. Você escolhe o horário que funciona melhor para você e seu pet.",
  },
  {
    question: "Preciso de equipamento especial?",
    answer: "Não! O app inclui clicker e apito virtuais. Tudo que você precisa está no seu celular.",
  },
  {
    question: "Funciona offline?",
    answer: "Sim! Baixe as lições e treine sem internet. Perfeito para quando estiver no parque ou em áreas sem sinal.",
  },
  {
    question: "Serve para gatos também?",
    answer: "Atualmente focamos em cães. Estamos trabalhando em uma versão para gatos em breve!",
  },
  {
    question: "Como funciona o chat com IA?",
    answer: "É um assistente especializado em cães, treinado em comportamento canino, nutrição e saúde. Responde suas dúvidas 24/7 em segundos.",
  },
];

export const Paywall: React.FC<PaywallProps> = ({
  onSelectPlan,
  onBackToLoading,
  onBackToQuiz,
  quizData,
}) => {
  const isDev = process.env.NODE_ENV === "development";
  const [showConfetti, setShowConfetti] = useState(true);
  const [showFullPaywall, setShowFullPaywall] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const topCTARef = useRef<HTMLDivElement>(null);
  const bottomCTARef = useRef<HTMLDivElement>(null);

  // Função para obter o conector correto
  const getPetConnector = () => {
    if (!quizData?.name) return "";
    const gender = quizData.gender?.toLowerCase();
    if (gender === "fêmea" || gender === "femea") return "da";
    if (gender === "macho") return "do";
    return "do";
  };

  const petName = quizData?.name || "seu cão";
  const petConnector = getPetConnector();

  // Calcular datas do trial
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 7);
  const firstChargeDate = new Date(trialEndDate);
  const monthlyPrice = 49.90;
  const annualPrice = 39.90;
  const firstChargeAmount = selectedPlan === "annual" ? annualPrice * 12 : monthlyPrice;

  // Preview das primeiras lições
  const previewLessons = fullPlanWeeks.slice(0, 2);

  // Detectar scroll para mostrar CTAs sticky
  useEffect(() => {
    if (!showFullPaywall) return;

    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollTop = scrollRef.current.scrollTop;
        const scrollHeight = scrollRef.current.scrollHeight;
        const clientHeight = scrollRef.current.clientHeight;
        const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

        // Mostrar CTA do meio após scroll 1 (25%)
        if (scrollPercent > 25 && scrollPercent < 75) {
          // CTA do meio visível
        }
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, [showFullPaywall]);

  const handlePaymentSubmit = async (data: any) => {
    setIsProcessingPayment(true);
    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessingPayment(false);
    onSelectPlan(selectedPlan === "annual" ? "annual" : "monthly");
  };

  const scrollToPayment = () => {
    if (scrollRef.current) {
      setShowPaymentForm(true);
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  // TELA 1: TEASER (Não-scrollable)
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
                  setTimeout(() => setShowConfetti(true), 100);
                }}
                variant="outline"
                className="w-full text-xs"
              >
                🎉 Reiniciar Confetes
              </Button>
              <Button
                size="sm"
                onClick={() => setShowFullPaywall(true)}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full text-center"
        >
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 space-y-6"
          >
            <div className="text-xl text-[#6B7280]">Plano Personalizado</div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2D2E29] mb-4">
              Seu Plano {petConnector} {petName} Está Pronto!
            </h1>
            <p className="text-xl text-[#6B7280]">
              Baseado nas respostas do quiz, criamos um plano de 8 semanas
            </p>
          </motion.div>

          {/* Preview das Primeiras Lições */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="bg-white border-2 border-[#D4C4A8]/30 rounded-xl p-6 mb-4">
              <h3 className="text-lg font-bold text-[#2D2E29] mb-4 text-left">
                Primeiras lições do seu plano
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {previewLessons.map((week, weekIndex) => (
                  <div
                    key={week.week}
                    className="bg-[#F8F4EB] border-2 border-[#D4C4A8]/20 rounded-lg p-4 text-left"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">📚</span>
                      <h4 className="font-semibold text-[#2D2E29]">
                        Semana {week.week}: {week.title}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {week.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-center gap-2 text-sm text-[#6B7280]">
                          <span>•</span>
                          <span>{lesson.title}</span>
                          <span className="text-xs">({lesson.duration})</span>
                          {lesson.hasVideo && <span className="text-xs">🎥</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#6B7280] mt-4 text-center">
                + 6 semanas de treinamento...
              </p>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-sm text-[#6B7280]">
              ⓘ 12.000+ tutores já treinaram com sucesso
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={() => setShowFullPaywall(true)}
              size="lg"
              className="group bg-[#1C8C58] text-white border-2 border-[#156B43] shadow-[4px_4px_0px_0px] shadow-[#156B43] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-[#156B43] hover:border-[#0F5A35] hover:shadow-[#0F5A35] active:translate-x-[-1px] active:translate-y-[-1px] active:shadow-[4px_4px_0px_0px] transition-all duration-200 px-8 py-6 text-lg font-semibold"
            >
              <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                Ver Plano Completo e Começar
                <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // TELA 2: PAYWALL PRINCIPAL (Scrollable)
  return (
    <div className="min-h-screen bg-[#FAFAF9] relative">
      {/* CTA STICKY TOPO */}
      <div
        ref={topCTARef}
        className="sticky top-0 z-50 bg-white border-b-2 border-[#1C8C58] shadow-lg"
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#2D2E29]">
              Trial grátis de 7 dias • Cancele quando quiser
            </p>
          </div>
          <Button
            onClick={scrollToPayment}
            size="lg"
            className="bg-[#1C8C58] text-white border-2 border-[#156B43] shadow-[4px_4px_0px_0px] shadow-[#156B43] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-[#156B43] transition-all duration-200 px-6 py-3 font-semibold"
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              Iniciar Trial Gratuito de 7 Dias
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </span>
          </Button>
        </div>
      </div>

      {/* CONTEÚDO SCROLLABLE */}
      <div
        ref={scrollRef}
        className="max-w-4xl mx-auto px-4 py-8 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        {/* ACIMA DA DOBRA */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#2D2E29] mb-6">
            📋 Plano Completo para {petName}
          </h2>

          {/* Accordion 8 Semanas */}
          <Accordion type="single" collapsible className="mb-8">
            {fullPlanWeeks.map((week) => (
              <AccordionItem key={week.week} value={`week-${week.week}`}>
                <AccordionTrigger className="text-left">
                  Semana {week.week}: {week.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {week.lessons.map((lesson, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <span>•</span>
                        <span>{lesson.title}</span>
                        <span>({lesson.duration})</span>
                        {lesson.hasVideo && <span>🎥</span>}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Seu Investimento */}
          <div className="bg-white border-2 border-[#1C8C58] rounded-xl p-6 mb-8">
            <div className="text-center mb-6">
              <div className="inline-block bg-[#FBBF24] text-[#2D2E29] px-4 py-2 rounded-lg font-bold text-lg mb-4">
                🎉 7 DIAS GRÁTIS
              </div>
              <p className="text-sm text-[#6B7280] mb-4">Depois, escolha:</p>
            </div>

            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-3 p-4 border-2 border-[#D4C4A8]/30 rounded-lg cursor-pointer hover:bg-[#F8F4EB] transition-colors">
                <input
                  type="radio"
                  name="plan"
                  value="monthly"
                  checked={selectedPlan === "monthly"}
                  onChange={() => setSelectedPlan("monthly")}
                  className="w-5 h-5 text-[#1C8C58]"
                />
                <div className="flex-1">
                  <div className="font-semibold text-[#2D2E29]">R$ 49,90/mês (mensal)</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-[#1C8C58] rounded-lg cursor-pointer bg-[#1C8C58]/5 hover:bg-[#1C8C58]/10 transition-colors">
                <input
                  type="radio"
                  name="plan"
                  value="annual"
                  checked={selectedPlan === "annual"}
                  onChange={() => setSelectedPlan("annual")}
                  className="w-5 h-5 text-[#1C8C58]"
                />
                <div className="flex-1">
                  <div className="font-semibold text-[#2D2E29] flex items-center gap-2">
                    R$ 39,90/mês (anual) <span className="text-[#FBBF24]">⭐</span>
                  </div>
                  <div className="text-sm text-[#6B7280]">Economize R$ 120/ano!</div>
                </div>
              </label>
            </div>

            <div className="space-y-2 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1C8C58]" />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1C8C58]" />
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1C8C58]" />
                <span>Garantia 30 dias</span>
              </div>
            </div>
          </div>

          {/* Comparação de Custo */}
          <div className="bg-white border-2 border-[#D4C4A8]/30 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-[#2D2E29] mb-4">
              💰 vs Adestrador Presencial
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-[#F8F4EB] rounded-lg">
                <div className="font-bold text-[#2D2E29] mb-2">Adestrador</div>
                <div className="text-sm text-[#6B7280]">R$ 150/sessão</div>
                <div className="text-sm text-[#6B7280]">R$ 1.800/ano</div>
              </div>
              <div className="text-center p-4 bg-[#1C8C58]/10 rounded-lg border-2 border-[#1C8C58]">
                <div className="font-bold text-[#2D2E29] mb-2">App</div>
                <div className="text-sm text-[#6B7280]">R$ 39,90/mês</div>
                <div className="text-sm text-[#6B7280]">R$ 478/ano</div>
              </div>
            </div>
            <div className="text-center mt-4">
              <div className="inline-block bg-[#FBBF24] text-[#2D2E29] px-4 py-2 rounded-lg font-bold">
                Economize R$ 1.322! 🎉
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-[#6B7280] mb-8">Scroll para ver mais ↓</p>
        </div>

        {/* SCROLL 1: Tabela Comparativa */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#2D2E29] mb-6">📊 O Que Você Ganha com Premium</h3>
          <div className="bg-white border-2 border-[#D4C4A8]/30 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1C8C58] text-white">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">Free</th>
                  <th className="p-4 text-center">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Lições básicas", free: "3", premium: "∞" },
                  { feature: "Plano personalizado", free: "❌", premium: "✅" },
                  { feature: "Chat IA", free: "❌", premium: "✅" },
                  { feature: "Calendário", free: "❌", premium: "✅" },
                  { feature: "Modo offline", free: "❌", premium: "✅" },
                  { feature: "Ferramentas", free: "❌", premium: "✅" },
                  { feature: "Comunidade", free: "❌", premium: "✅" },
                  { feature: "Marketplace", free: "❌", premium: "✅" },
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-[#F8F4EB]" : "bg-white"}>
                    <td className="p-4 font-medium text-[#2D2E29]">{row.feature}</td>
                    <td className="p-4 text-center text-[#6B7280]">{row.free}</td>
                    <td className="p-4 text-center text-[#1C8C58] font-semibold">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={scrollToPayment}
              variant="outline"
              className="border-2 border-[#1C8C58] text-[#1C8C58] hover:bg-[#1C8C58] hover:text-white"
            >
              Desbloquear Todas Features
            </Button>
          </div>
        </div>

        {/* SCROLL 2: Benefícios + Social Proof */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#2D2E29] mb-6">🎯 Veja a Transformação</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: "🐕", title: "Obediência em 2 Semanas", desc: "Veja seu cão respondendo a comandos básicos" },
              { icon: "🔇", title: "Fim dos Latidos em 1 Mês", desc: "Reduza latidos excessivos e tenha paz em casa" },
              { icon: "❤️", title: "Vínculo Mais Forte", desc: "Crie conexão profunda com seu melhor amigo" },
            ].map((benefit, index) => (
              <div key={index} className="bg-white border-2 border-[#D4C4A8]/30 rounded-xl p-6 text-center">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h4 className="font-bold text-[#2D2E29] mb-2">{benefit.title}</h4>
                <p className="text-sm text-[#6B7280]">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border-2 border-[#D4C4A8]/30 rounded-xl p-6 mb-6">
            <h4 className="text-xl font-bold text-[#2D2E29] mb-4">📈 Números Que Provam</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1C8C58] mb-2">12.000+</div>
                <div className="text-sm text-[#6B7280]">Tutores treinaram</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1C8C58] mb-2 flex items-center justify-center gap-1">
                  4.8<Star className="w-5 h-5 text-[#FBBF24] fill-[#FBBF24]" />
                </div>
                <div className="text-sm text-[#6B7280]">(2.341 avaliações)</div>
              </div>
            </div>
          </div>

          <div className="bg-[#FBBF24] border-2 border-[#FBBF24] rounded-xl p-4 text-center">
            <div className="font-bold text-[#2D2E29]">🏆 Melhor App de Pet 2024</div>
            <div className="text-sm text-[#2D2E29]">Google Play Awards</div>
          </div>
        </div>

        {/* SCROLL 3: Depoimentos */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#2D2E29] mb-6">💬 Histórias Reais de Sucesso</h3>
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white border-2 border-[#D4C4A8]/30 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-[#2D2E29]">{testimonial.name}</div>
                    <div className="text-sm text-[#6B7280]">
                      {testimonial.petName} ({testimonial.petBreed}, {testimonial.petAge})
                    </div>
                  </div>
                </div>
                <p className="text-[#6B7280] mb-3">&quot;{testimonial.text}&quot;</p>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FBBF24] fill-[#FBBF24]" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="text-xl font-bold text-[#2D2E29] mb-4">📸 Galeria: Antes/Depois</h4>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-[#D4C4A8]/20 rounded-lg border-2 border-[#D4C4A8]/30 flex items-center justify-center">
                  <Image
                    src="/assets/app-icon.webp"
                    alt="Wise Dog Pro"
                    width={48}
                    height={48}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SCROLL 4: FAQ + Garantia + Formulário */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#2D2E29] mb-6">❓ Perguntas Frequentes</h3>
          <Accordion type="single" collapsible className="mb-8">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Garantia */}
          <div className="bg-white border-2 border-[#1C8C58] rounded-xl p-8 mb-8 text-center">
            <div className="text-5xl mb-4">🛡️</div>
            <h4 className="text-2xl font-bold text-[#2D2E29] mb-4">Garantia de 30 Dias</h4>
            <p className="text-[#6B7280] mb-2">Não funcionou?</p>
            <p className="text-[#6B7280] mb-4">Reembolso total, sem perguntas.</p>
            <p className="font-semibold text-[#2D2E29]">Você não tem nada a perder.</p>
          </div>

          {/* Aviso Transparência */}
          <div className="bg-[#FEF3C7] border-2 border-[#FBBF24] rounded-xl p-6 mb-8">
            <h4 className="font-bold text-[#2D2E29] mb-4">⚠️ IMPORTANTE - Leia:</h4>
            <div className="space-y-2 text-sm text-[#2D2E29]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1C8C58]" />
                <span>Não cobraremos nada hoje</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1C8C58]" />
                <span>Trial grátis até {trialEndDate.toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1C8C58]" />
                <span>Lembrete 24h antes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1C8C58]" />
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          {showPaymentForm && (
            <div className="bg-white border-2 border-[#D4C4A8]/30 rounded-xl p-8">
              <h4 className="text-2xl font-bold text-[#2D2E29] mb-6">💳 INFORMAÇÕES DE PAGAMENTO</h4>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2D2E29] mb-3">
                  Escolha seu plano:
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-[#D4C4A8]/30 rounded-lg cursor-pointer hover:bg-[#F8F4EB]">
                    <input
                      type="radio"
                      name="plan"
                      value="monthly"
                      checked={selectedPlan === "monthly"}
                      onChange={() => setSelectedPlan("monthly")}
                      className="w-5 h-5 text-[#1C8C58]"
                    />
                    <span className="font-semibold text-[#2D2E29]">Mensal - R$ 49,90/mês</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-[#1C8C58] rounded-lg cursor-pointer bg-[#1C8C58]/5">
                    <input
                      type="radio"
                      name="plan"
                      value="annual"
                      checked={selectedPlan === "annual"}
                      onChange={() => setSelectedPlan("annual")}
                      className="w-5 h-5 text-[#1C8C58]"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-[#2D2E29] flex items-center gap-2">
                        Anual - R$ 39,90/mês <span className="text-[#FBBF24]">⭐</span>
                      </span>
                      <div className="text-sm text-[#6B7280]">(Economize R$ 120/ano!)</div>
                    </div>
                  </label>
                </div>
              </div>

              <PaymentForm
                onSubmit={handlePaymentSubmit}
                isLoading={isProcessingPayment}
                trialEndDate={trialEndDate}
                selectedPlan={selectedPlan}
                firstChargeAmount={firstChargeAmount}
                firstChargeDate={firstChargeDate}
              />

              <div className="mt-6 text-center">
                <p className="text-xs text-[#6B7280] mb-2">🔒 Pagamento seguro</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA STICKY RODAPÉ */}
      <div
        ref={bottomCTARef}
        className="sticky bottom-0 z-50 bg-white border-t-2 border-[#1C8C58] shadow-lg"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#2D2E29]">
              Trial grátis de 7 dias • Cancele quando quiser
            </p>
          </div>
          <Button
            onClick={scrollToPayment}
            size="lg"
            className="bg-[#1C8C58] text-white border-2 border-[#156B43] shadow-[4px_4px_0px_0px] shadow-[#156B43] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-[#156B43] transition-all duration-200 px-6 py-3 font-semibold"
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              Começar Agora - Sem Risco
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

