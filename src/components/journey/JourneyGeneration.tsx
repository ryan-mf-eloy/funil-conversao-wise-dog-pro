"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  Brain,
  CheckCircle2,
  Loader2,
  Zap,
  Target,
  Heart,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { DevControls } from "@/components/dev/DevControls";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/types";

interface JourneyGenerationProps {
  quizData: QuizData;
  onComplete: () => void;
  onBack?: () => void; // Para voltar ao quiz
  onSkip?: () => void; // Para pular direto ao paywall
}

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: number;
}

const PROCESSING_STEPS: ProcessingStep[] = [
  {
    id: "analyzing",
    title: "Estamos analisando informações",
    description: "Processando dados do seu cão e preferências...",
    icon: <Brain className="w-6 h-6" />,
    duration: 2000,
  },
  {
    id: "personality",
    title: "Estamos mapeando personalidade",
    description: "Entendendo o perfil comportamental único...",
    icon: <Heart className="w-6 h-6" />,
    duration: 1800,
  },
  {
    id: "challenges",
    title: "Estamos identificando desafios",
    description: "Priorizando os principais desafios de treinamento...",
    icon: <Target className="w-6 h-6" />,
    duration: 1500,
  },
  {
    id: "generating",
    title: "Estamos gerando jornada personalizada",
    description: "Criando lições exclusivas baseadas nas suas respostas...",
    icon: <Zap className="w-6 h-6" />,
    duration: 2500,
  },
  {
    id: "organizing",
    title: "Estamos organizando conteúdo",
    description:
      "Distribuindo lições em 52 semanas para um ano de progresso...",
    icon: <Sparkles className="w-6 h-6" />,
    duration: 2000,
  },
];

export const JourneyGeneration: React.FC<JourneyGenerationProps> = ({
  quizData,
  onComplete,
  onBack,
  onSkip,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const processRef = useRef<{
    stepIndex: number;
    intervals: NodeJS.Timeout[];
  } | null>(null);

  // Dev mode - apenas em desenvolvimento
  const isDev = process.env.NODE_ENV === "development";

  const handleReset = () => {
    // Limpar todos os intervals
    if (processRef.current) {
      processRef.current.intervals.forEach(clearInterval);
      processRef.current.intervals.forEach(clearTimeout);
    }
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setProgress(0);
    setIsPaused(false);
  };

  const handleJumpToStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= PROCESSING_STEPS.length) return;
    
    // Limpar intervals atuais
    if (processRef.current) {
      processRef.current.intervals.forEach(clearInterval);
      processRef.current.intervals.forEach(clearTimeout);
    }
    
    // Atualizar estado
    setCurrentStep(stepIndex);
    const completed = new Set(
      PROCESSING_STEPS.slice(0, stepIndex).map((s) => s.id)
    );
    setCompletedSteps(completed);
    setProgress(((stepIndex + 1) / PROCESSING_STEPS.length) * 100);
    setIsPaused(false);
  };

  // Listener para controles do GlobalDevControls
  useEffect(() => {
    if (!isDev) return;
    
    const handleDevControl = (event: CustomEvent) => {
      const { action, stepIndex } = event.detail;
      
      switch (action) {
        case "pause":
          setIsPaused(true);
          break;
        case "resume":
          setIsPaused(false);
          break;
        case "reset":
          handleReset();
          break;
        case "jumpToStep":
          if (typeof stepIndex === "number") {
            handleJumpToStep(stepIndex);
          }
          break;
      }
    };
    
    window.addEventListener("devLoadingControl", handleDevControl as EventListener);
    
    // Salvar seção atual
    if (typeof window !== "undefined") {
      sessionStorage.setItem("currentSection", "journey-generation");
    }
    
    return () => {
      window.removeEventListener("devLoadingControl", handleDevControl as EventListener);
    };
  }, [isDev]);

  useEffect(() => {
    if (isPaused) {
      // Limpar intervals quando pausado
      if (processRef.current) {
        processRef.current.intervals.forEach((interval) => {
          clearInterval(interval);
          clearTimeout(interval);
        });
        processRef.current.intervals = [];
      }
      return;
    }

    // Se já completou, não reiniciar
    if (currentStep >= PROCESSING_STEPS.length) {
      return;
    }

    let stepIndex = currentStep;
    let isCancelled = false;
    const intervals: NodeJS.Timeout[] = [];

    const processSteps = () => {
      if (isPaused || isCancelled) return;

      if (stepIndex >= PROCESSING_STEPS.length) {
        // Todas as etapas concluídas
        setTimeout(() => {
          if (!isPaused && !isCancelled) {
            onComplete();
          }
        }, 500);
        return;
      }

      const step = PROCESSING_STEPS[stepIndex];
      setCurrentStep(stepIndex);

      // Animar progresso durante a etapa
      const progressInterval = setInterval(() => {
        if (isPaused || isCancelled) {
          clearInterval(progressInterval);
          return;
        }
        setProgress((prev) => {
          const stepProgress =
            ((stepIndex + 1) / PROCESSING_STEPS.length) * 100;
          const increment =
            100 / PROCESSING_STEPS.length / (step.duration / 50);
          return Math.min(prev + increment, stepProgress);
        });
      }, 50);
      intervals.push(progressInterval);

      const timeout = setTimeout(() => {
        if (isPaused || isCancelled) {
          clearTimeout(timeout);
          return;
        }
        clearInterval(progressInterval);
        setCompletedSteps((prev) => new Set([...prev, step.id]));
        stepIndex++;
        processSteps();
      }, step.duration);
      intervals.push(timeout);

      processRef.current = { stepIndex, intervals };
    };

    processSteps();

    return () => {
      isCancelled = true;
      intervals.forEach((interval) => {
        clearInterval(interval);
        clearTimeout(interval);
      });
    };
  }, [onComplete, isPaused]);

  const currentStepData = PROCESSING_STEPS[currentStep];
  const overallProgress = progress;

  // Função para obter o conector correto baseado no gênero
  const getPetConnector = () => {
    if (!quizData.name) return "";
    const gender = quizData.gender?.toLowerCase();
    if (gender === "fêmea" || gender === "femea") {
      return "da";
    } else if (gender === "macho") {
      return "do";
    }
    return "do"; // Default
  };

  // Função para obter o artigo correto baseado no gênero
  const getPetArticle = () => {
    const gender = quizData.gender?.toLowerCase();
    if (gender === "fêmea" || gender === "femea") {
      return "a";
    } else if (gender === "macho") {
      return "o";
    }
    return "o"; // Default
  };

  const petConnector = getPetConnector();
  const petArticle = getPetArticle();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] via-white to-[#F8F4EB] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#1C8C58]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#5BA67B]/5 rounded-full blur-3xl" />
      </div>
      {/* Dev Controls - apenas em desenvolvimento */}
      {isDev && (
        <DevControls title="Controles de Loading">
          <div className="space-y-4">
            {/* Seção: Controle de Reprodução */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <div className="text-xs font-semibold text-[#1C8C58] mb-2 flex items-center gap-2">
                <span>⏯️</span>
                <span>Controle de Reprodução</span>
              </div>
              <div className="flex gap-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    size="sm"
                    onClick={() => setIsPaused(!isPaused)}
                    variant={isPaused ? "default" : "outline"}
                    className={cn(
                      "w-full text-xs font-semibold transition-all",
                      isPaused
                        ? "bg-[#1C8C58] hover:bg-[#156B43] text-white"
                        : "border-2 border-[#1C8C58] text-[#1C8C58] hover:bg-[#1C8C58]/10"
                    )}
                  >
                    {isPaused ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <span>▶️</span>
                        <span>Continuar</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5">
                        <span>⏸️</span>
                        <span>Pausar</span>
                      </span>
                    )}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    size="sm"
                    onClick={handleReset}
                    variant="outline"
                    className="w-full text-xs font-semibold border-2 border-[#6B7280] text-[#6B7280] hover:bg-[#6B7280] hover:text-white transition-all"
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <span>🔄</span>
                      <span>Resetar</span>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Seção: Navegação de Etapas */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <div className="text-xs font-semibold text-[#1C8C58] mb-2 flex items-center gap-2">
                <span>📍</span>
                <span>Pular para Etapa</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {PROCESSING_STEPS.map((step, index) => {
                  const isCurrent = currentStep === index;
                  const isCompleted = completedSteps.has(step.id);
                  return (
                    <motion.button
                      key={step.id}
                      onClick={() => handleJumpToStep(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "px-3 py-2 text-xs font-semibold rounded-lg transition-all shadow-sm",
                        isCurrent
                          ? "bg-[#1C8C58] text-white shadow-[#1C8C58]/30 ring-2 ring-[#1C8C58] ring-offset-1"
                          : isCompleted
                          ? "bg-[#1C8C58]/20 text-[#1C8C58] border-2 border-[#1C8C58]/30 hover:bg-[#1C8C58]/30"
                          : "bg-[#E5E5E0] text-[#6B7280] border-2 border-transparent hover:bg-[#D4C4A8] hover:border-[#D4C4A8]"
                      )}
                    >
                      {index + 1}
                    </motion.button>
                  );
                })}
              </div>
              <div className="text-[10px] text-[#9CA3AF] mt-1">
                Etapa atual: {currentStep + 1} de {PROCESSING_STEPS.length}
              </div>
            </motion.div>

            {/* Seção: Navegação Rápida */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-3 border-t-2 border-[#E5E5E0] space-y-2"
            >
              <div className="text-xs font-semibold text-[#1C8C58] mb-2 flex items-center gap-2">
                <span>🧭</span>
                <span>Navegação Rápida</span>
              </div>
              <div className="space-y-2">
                {onBack && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="sm"
                      onClick={onBack}
                      variant="outline"
                      className="w-full text-xs font-semibold border-2 border-[#6B7280] text-[#6B7280] hover:bg-[#6B7280] hover:text-white transition-all"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>⬅️</span>
                        <span>Voltar ao Quiz</span>
                      </span>
                    </Button>
                  </motion.div>
                )}
                {onSkip && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="sm"
                      onClick={onSkip}
                      className="w-full text-xs font-semibold bg-[#1C8C58] hover:bg-[#156B43] text-white border-2 border-[#156B43] shadow-sm hover:shadow-md transition-all"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>⏭️</span>
                        <span>Pular para Paywall</span>
                      </span>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Seção: Status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-3 border-t-2 border-[#E5E5E0]"
            >
              <div className="text-xs font-semibold text-[#1C8C58] mb-2 flex items-center gap-2">
                <span>📊</span>
                <span>Status</span>
              </div>
              <div className="space-y-1.5 text-[10px] text-[#6B7280]">
                <div className="flex items-center justify-between">
                  <span>Progresso:</span>
                  <span className="font-semibold text-[#1C8C58]">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estado:</span>
                  <span
                    className={cn(
                      "font-semibold",
                      isPaused ? "text-[#FBBF24]" : "text-[#1C8C58]"
                    )}
                  >
                    {isPaused ? "⏸️ Pausado" : "▶️ Em execução"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Etapas completas:</span>
                  <span className="font-semibold text-[#1C8C58]">
                    {completedSteps.size}/{PROCESSING_STEPS.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </DevControls>
      )}

      <div className="max-w-3xl w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center mb-8"
          >
            <Image
              src="/assets/app-icon.webp"
              alt="Wise Dog Pro"
              width={120}
              height={120}
              className="object-contain"
              unoptimized
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-[#2D2E29] mb-6 leading-tight"
          >
            {quizData.name ? (
              <>
                Criando {petArticle} jornada {petConnector}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C8C58] to-[#5BA67B]">
                  {quizData.name}
                </span>
              </>
            ) : (
              <>
                Criando sua{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C8C58] to-[#5BA67B]">
                  jornada personalizada
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-[#6B7280] max-w-2xl mx-auto"
          >
            Estamos processando todas as informações para criar o plano perfeito
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-base font-semibold text-[#6B7280]">
              Progresso
            </span>
            <span className="text-lg font-bold text-[#1C8C58]">
              {Math.round(overallProgress)}%
            </span>
          </div>
          <div className="relative h-4 bg-[#E5E5E0] rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1C8C58] via-[#5BA67B] to-[#1C8C58] rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Processing Steps */}
        <div className="space-y-5">
          <AnimatePresence mode="wait">
            {PROCESSING_STEPS.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = completedSteps.has(step.id);
              const isPending = index > currentStep;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.95 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className={cn(
                    "relative p-6 rounded-2xl border-2 transition-all duration-500 backdrop-blur-sm",
                    isActive
                      ? "border-[#1C8C58] bg-gradient-to-br from-white via-[#1C8C58]/5 to-[#5BA67B]/5 shadow-xl shadow-[#1C8C58]/20 scale-[1.02]"
                      : isCompleted
                      ? "border-[#1C8C58]/40 bg-gradient-to-br from-white to-[#1C8C58]/3 shadow-md"
                      : "border-[#E5E5E0] bg-white/80 shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-5">
                    {/* Icon */}
                    <motion.div
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden",
                        isActive
                          ? "bg-gradient-to-br from-[#1C8C58] to-[#5BA67B] text-white shadow-lg shadow-[#1C8C58]/30"
                          : isCompleted
                          ? "bg-gradient-to-br from-[#1C8C58] to-[#5BA67B] text-white shadow-md"
                          : "bg-[#FAFAF9] text-[#9CA3AF] border border-[#E5E5E0]"
                      )}
                      whileHover={
                        !isActive && !isCompleted ? { scale: 1.05 } : {}
                      }
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      )}
                      {isCompleted ? (
                        <CheckCircle2 className="w-8 h-8 relative z-10" />
                      ) : isActive ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="relative z-10"
                        >
                          {step.icon}
                        </motion.div>
                      ) : (
                        <div className="relative z-10">{step.icon}</div>
                      )}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={cn(
                          "text-xl font-bold mb-2 transition-colors",
                          isActive || isCompleted
                            ? "text-[#1C8C58]"
                            : "text-[#6B7280]"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm leading-relaxed transition-colors",
                          isActive
                            ? "text-[#6B7280]"
                            : isCompleted
                            ? "text-[#9CA3AF]"
                            : "text-[#9CA3AF]"
                        )}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Status Indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="w-6 h-6 text-[#1C8C58] animate-spin" />
                      </motion.div>
                    )}
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-[#1C8C58]"
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </motion.div>
                    )}
                  </div>

                  {/* Active Step Shimmer Effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl pointer-events-none"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Fun Facts / Motivational Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#1C8C58]/10 to-[#5BA67B]/10 border border-[#1C8C58]/20">
            <p className="text-sm text-[#6B7280] font-medium">
              Estamos processando todas as informações para criar o plano
              perfeito para{" "}
              {quizData.name ? `${petArticle} ${quizData.name}` : "seu cão"}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
