"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { cn } from "@/lib/utils";
import { Sparkles, MessageCircle, BookOpen, Calendar, Wrench, Trophy } from "lucide-react";

export const BenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("ia-personalizada");

  const tabs = [
    {
      id: "ia-personalizada",
      label: "IA Personalizada",
      content: (
        <div className="grid md:grid-cols-2 gap-6 w-full h-full">
          <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-[#D4C4A8]/20">
            <img
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Jornada personalizada de treinamento com IA"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                <Sparkles className="w-5 h-5 text-[#FBBF24]" />
                <span className="text-[#2D2E29] font-semibold text-sm">Inteligência Artificial</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-3xl font-bold text-[#2D2E29] mb-2">
              Jornada 100% Personalizada
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              Nossa IA analisa as características únicas do seu cão através de um quiz detalhado e cria uma jornada de treinamento personalizada com 50-60 lições adaptadas especialmente para ele.
            </p>
            <ul className="space-y-2 text-[#6B7280]">
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Análise completa de raça, idade e comportamento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Lições organizadas na ordem ideal para seu pet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Conteúdo gerado dinamicamente por IA</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "chat-ia",
      label: "Chat IA 24/7",
      content: (
        <div className="grid md:grid-cols-2 gap-6 w-full h-full">
          <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-[#D4C4A8]/20">
            <img
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Chat com IA especializada em cães"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                <MessageCircle className="w-5 h-5 text-[#1C8C58]" />
                <span className="text-[#2D2E29] font-semibold text-sm">Assistente Virtual</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-3xl font-bold text-[#2D2E29] mb-2">
              Especialista Disponível 24/7
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              Tire suas dúvidas a qualquer momento com nosso assistente de IA especializado em comportamento canino, saúde, nutrição e adestramento.
            </p>
            <ul className="space-y-2 text-[#6B7280]">
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Respostas instantâneas sobre qualquer assunto</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Análise de fotos do seu cão</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Histórico de conversas salvo</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "jornada-treino",
      label: "Jornada de Treino",
      content: (
        <div className="grid md:grid-cols-2 gap-6 w-full h-full">
          <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-[#D4C4A8]/20">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Lições de treinamento interativas"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
                <span className="text-[#2D2E29] font-semibold text-sm">Lições Interativas</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-3xl font-bold text-[#2D2E29] mb-2">
              Lições Práticas e Teóricas
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              Acesse uma biblioteca completa de lições de treinamento com passos detalhados, dicas profissionais e acompanhamento de progresso.
            </p>
            <ul className="space-y-2 text-[#6B7280]">
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>5 tipos de lições: Prática, Teoria, Q&A, Checkpoint e Desafios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Passo a passo detalhado com vídeos e imagens</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Acompanhamento de progresso em tempo real</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "calendario-saude",
      label: "Calendário de Saúde",
      content: (
        <div className="grid md:grid-cols-2 gap-6 w-full h-full">
          <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-[#D4C4A8]/20">
            <img
              src="https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Calendário de saúde e atividades"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                <Calendar className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-[#2D2E29] font-semibold text-sm">Organização Total</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-3xl font-bold text-[#2D2E29] mb-2">
              Saúde em Dia
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              Mantenha o controle completo da saúde do seu pet com lembretes automáticos de vacinas, consultas veterinárias e medicamentos.
            </p>
            <ul className="space-y-2 text-[#6B7280]">
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Registro de vacinas, consultas e exames</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Lembretes automáticos personalizados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Histórico completo de saúde</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "ferramentas",
      label: "Ferramentas",
      content: (
        <div className="grid md:grid-cols-2 gap-6 w-full h-full">
          <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-[#D4C4A8]/20">
            <img
              src="https://images.unsplash.com/photo-1551717743-49959800b1f6?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Ferramentas profissionais de treinamento"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                <Wrench className="w-5 h-5 text-[#F97316]" />
                <span className="text-[#2D2E29] font-semibold text-sm">Kit Profissional</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-3xl font-bold text-[#2D2E29] mb-2">
              Ferramentas Profissionais
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              Acesse ferramentas essenciais para o treinamento: clicker virtual, apito com frequências ajustáveis e timer para sessões de treino.
            </p>
            <ul className="space-y-2 text-[#6B7280]">
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Clicker virtual com som realista</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Apito com frequências de 1-22kHz</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Timer para controlar sessões de treino</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "gamificacao",
      label: "Gamificação",
      content: (
        <div className="grid md:grid-cols-2 gap-6 w-full h-full">
          <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-[#D4C4A8]/20">
            <img
              src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Sistema de gamificação e conquistas"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                <Trophy className="w-5 h-5 text-[#FBBF24]" />
                <span className="text-[#2D2E29] font-semibold text-sm">Conquistas</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-3xl font-bold text-[#2D2E29] mb-2">
              Treine e Ganhe
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              Mantenha a motivação com nosso sistema de gamificação: badges, streaks de dias consecutivos e progresso visual do treinamento.
            </p>
            <ul className="space-y-2 text-[#6B7280]">
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Badges e conquistas desbloqueáveis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Streak de dias consecutivos de treino</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1C8C58] mt-1 font-bold">✓</span>
                <span>Compartilhamento social de progresso</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Section id="por-que-escolher" background="light">
      <Container>
        <div className="text-center mb-12">
          <Heading>Por Que Escolher Wise Dog Pro?</Heading>
          <p className="text-base text-[#6B7280] max-w-2xl mx-auto mt-4">
            Tecnologia de ponta + expertise em comportamento canino. Tudo que
            você precisa para treinar seu cão.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-5xl flex flex-col gap-4">
            {/* Tabs Navigation */}
            <div className="flex gap-2 flex-wrap bg-white/80 backdrop-blur-sm border-2 border-[#D4C4A8]/30 p-2 rounded-xl shadow-lg">
              {tabs.map((tab, index) => {
                // Cores diferentes para cada aba quando ativa
                const activeColors = [
                  "bg-[#1C8C58]", // Verde - IA Personalizada
                  "bg-[#3B82F6]", // Azul - Chat IA 24/7
                  "bg-[#8B5CF6]", // Roxo - Jornada de Treino
                  "bg-[#3B82F6]", // Azul - Calendário de Saúde
                  "bg-[#F97316]", // Laranja - Ferramentas
                  "bg-[#FBBF24]", // Amarelo - Gamificação
                ];
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative px-4 py-2.5 text-sm font-semibold rounded-lg text-[#2D2E29] outline-none transition-colors hover:text-[#1C8C58]"
                    )}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="active-tab-benefits"
                        className={cn(
                          "absolute inset-0 shadow-md !rounded-lg",
                          activeColors[index] || "bg-[#1C8C58]"
                        )}
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    <span className={cn(
                      "relative z-10",
                      activeTab === tab.id && "text-white"
                    )}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-6 bg-white/80 backdrop-blur-sm border-2 border-[#D4C4A8]/30 rounded-xl shadow-lg min-h-[500px]">
              {tabs.map(
                (tab) =>
                  activeTab === tab.id && (
                    <motion.div
                      key={tab.id}
                      initial={{
                        opacity: 0,
                        scale: 0.95,
                        x: -10,
                        filter: "blur(10px)",
                      }}
                      animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                      transition={{
                        duration: 0.5,
                        ease: "circInOut",
                        type: "spring",
                      }}
                    >
                      {tab.content}
                    </motion.div>
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
