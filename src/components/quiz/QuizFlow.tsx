"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/Button";
import { QUIZ_QUESTIONS } from "@/constants/data";
import type { QuizData } from "@/types";
import {
  Camera,
  ChevronRight,
  ChevronLeft,
  Check,
  Calendar,
  Search,
  Sparkles,
  X,
  Heart,
  Users,
  Home,
  Building,
  TreePine,
  Building2,
  House,
  Trees,
  Landmark,
  AlertCircle,
  Target,
  Clock,
  Activity,
  Shield,
  Volume2,
  Zap,
  AlertTriangle,
  Scissors,
  Brain,
  Smile,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { DevControls } from "@/components/dev/DevControls";

interface QuizFlowProps {
  currentQuestion: number;
  quizData: QuizData;
  onNext: () => void;
  onPrev: () => void;
  onGoTo?: (questionNumber: number) => void;
  onUpdate: (key: keyof QuizData, value: unknown) => void;
  onFinish: () => void;
  onBack: () => void;
  onSkipToLoading?: () => void; // Para pular direto ao loading em dev
}

const TOTAL_QUESTIONS = 12;

// Faster animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.12,
    },
  },
};

// Breed Selector Component
const BreedSelector: React.FC<{
  question: (typeof QUIZ_QUESTIONS)[0];
  value: string;
  onSelect: (value: string) => void;
}> = ({ question, value, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [popularBreeds] = useState([
    "Raça mista",
    "Labrador Retriever",
    "Pastor-alemão",
    "Golden Retriever",
    "Pit Bull Terrier Americano",
    "Buldogue Francês",
    "Poodle",
    "Shih Tzu",
    "Yorkshire Terrier",
    "Border Collie",
    "Chihuahua",
    "Beagle",
    "Welsh Corgi Pembroke",
    "Husky Siberiano",
  ]);

  const filteredBreeds = useMemo(() => {
    if (!question.options) return [];
    if (!searchTerm) return question.options.slice(0, 50);
    return question.options.filter((breed) =>
      breed.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [question.options, searchTerm]);

  const handleSelect = (breed: string) => {
    onSelect(breed);
    setIsOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".breed-selector")) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <motion.div variants={itemVariants} className="relative breed-selector">
      {!isOpen ? (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setIsOpen(true)}
          className="w-full px-6 py-5 border-2 border-[#E5E5E0] rounded-2xl bg-white text-lg text-left flex items-center justify-between hover:border-[#1C8C58] transition-all duration-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-[#6B7280]" />
            <span
              className={
                value ? "text-[#2D2E29] font-medium" : "text-[#9CA3AF]"
              }
            >
              {value || "Busque ou selecione a raça do seu cão..."}
            </span>
          </div>
          {value ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Check className="w-6 h-6 text-[#1C8C58]" />
            </motion.div>
          ) : (
            <ChevronRight className="w-5 h-5 text-[#6B7280] rotate-90" />
          )}
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-50"
        >
          <div className="relative mb-3">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Digite para buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-12 py-5 border-2 border-[#1C8C58] rounded-2xl bg-white text-lg text-[#2D2E29] focus:outline-none focus:ring-4 focus:ring-[#1C8C58]/10 shadow-lg"
              autoFocus
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setSearchTerm("");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#FAFAF9] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-h-96 overflow-y-auto rounded-2xl border-2 border-[#E5E5E0] bg-white shadow-2xl"
          >
            {!searchTerm && (
              <div className="p-4 border-b border-[#E5E5E0] bg-[#FAFAF9]">
                <p className="text-sm font-semibold text-[#6B7280] mb-3">
                  Mais populares
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularBreeds.map((breed) => (
                    <motion.button
                      key={breed}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelect(breed)}
                      className="px-4 py-2 bg-[#1C8C58]/10 text-[#1C8C58] rounded-lg text-sm font-medium hover:bg-[#1C8C58]/20 transition-colors"
                    >
                      {breed}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-2">
              {filteredBreeds.length > 0 ? (
                filteredBreeds.map((breed, index) => (
                  <motion.button
                    key={breed}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.01 }}
                    whileHover={{ x: 4, backgroundColor: "#FAFAF9" }}
                    onClick={() => handleSelect(breed)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl transition-colors",
                      value === breed &&
                        "bg-[#1C8C58]/10 text-[#1C8C58] font-medium"
                    )}
                  >
                    {breed}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-[#6B7280]">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma raça encontrada</p>
                  <p className="text-sm mt-1">
                    Tente buscar com outras palavras
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export const QuizFlow: React.FC<QuizFlowProps> = ({
  currentQuestion,
  quizData,
  onNext,
  onPrev,
  onGoTo,
  onUpdate,
  onFinish,
  onBack,
  onSkipToLoading,
}) => {
  const [selectedOption, setSelectedOption] = useState<
    string | string[] | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] =
    useState<NodeJS.Timeout | null>(null);
  const [autoAdvanceProgress, setAutoAdvanceProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const [date, setDate] = useState<Date | undefined>(
    quizData.birthday ? new Date(quizData.birthday) : undefined
  );
  const question = QUIZ_QUESTIONS[currentQuestion - 1];
  if (!question) return null;

  const progress = (currentQuestion / TOTAL_QUESTIONS) * 100;
  const AUTO_ADVANCE_DELAY = 1500; // 1.5 segundos - mais rápido e discreto

  // Mensagens motivacionais baseadas no progresso
  const getMotivationalMessage = () => {
    const progressPercent = Math.round(progress);

    if (progressPercent <= 10) {
      const messages = [
        "Vamos começar essa jornada incrível juntos! 🐾",
        "Seu cão vai adorar o que preparamos! 💚",
        "Cada resposta nos aproxima do plano perfeito! ✨",
      ];
      return messages[currentQuestion % messages.length];
    } else if (progressPercent <= 25) {
      const messages = [
        "Continue assim! Estamos conhecendo melhor seu cão 💚",
        "Ótimo começo! Cada detalhe importa 🎯",
        "Você está fazendo um trabalho incrível! 🌟",
      ];
      return messages[currentQuestion % messages.length];
    } else if (progressPercent <= 40) {
      const messages = [
        "Excelente progresso! Estamos no caminho certo 🚀",
        "Continue! Estamos criando algo especial para vocês 💕",
        "Você está indo muito bem! Mantenha o ritmo 🎉",
      ];
      return messages[currentQuestion % messages.length];
    } else if (progressPercent <= 60) {
      const messages = [
        "Quase na metade! Você está arrasando! 🎯",
        "Ótimo trabalho! Falta menos da metade 💪",
        "Continue! Estamos quase lá! ✨",
      ];
      return messages[currentQuestion % messages.length];
    } else if (progressPercent <= 75) {
      const messages = [
        "Você está indo muito bem! Falta pouco 🚀",
        "Incrível! Estamos quase finalizando 🎊",
        "Continue! O melhor está por vir! 🌟",
      ];
      return messages[currentQuestion % messages.length];
    } else if (progressPercent < 100) {
      const messages = [
        "Quase lá! Últimos passos para ver seu plano personalizado ✨",
        "Falta muito pouco! Você está quase no final! 🎉",
        "Última reta! Seu plano personalizado está quase pronto! 🚀",
      ];
      return messages[currentQuestion % messages.length];
    } else {
      return "Perfeito! Vamos finalizar sua jornada personalizada 🎉";
    }
  };

  // Inicializar selectedOption baseado nos dados salvos quando a pergunta muda
  useEffect(() => {
    // Cancelar qualquer avanço automático pendente
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsAnimating(false);
    setAutoAdvanceProgress(0);

    // Inicializar selectedOption baseado nos dados já salvos
    if (question) {
      if (question.type === "radio") {
        if (question.id === 3) {
          setSelectedOption(quizData.gender || null);
        } else if (question.id === 10) {
          setSelectedOption(quizData.time || null);
        } else if (question.id === 12) {
          setSelectedOption(quizData.otherPeople || null);
        } else {
          setSelectedOption(null);
        }
      } else if (question.type === "housing") {
        setSelectedOption(quizData.housingType || null);
      } else if (question.type === "challenge") {
        setSelectedOption(quizData.challenge || []);
      } else if (question.type === "checkbox" && question.id === 7) {
        setSelectedOption(quizData.personality || []);
      } else if (question.type === "health") {
        setSelectedOption(quizData.health || []);
      } else {
        setSelectedOption(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  // Limpar timer ao desmontar
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
      }
    };
  }, [autoAdvanceTimer]);

  useEffect(() => {
    if (date) {
      onUpdate("birthday", date.toISOString().split("T")[0]);
    }
  }, [date, onUpdate]);

  const handleNext = () => {
    if (isAnimating) {
      console.log("[QuizFlow] Already animating, ignoring handleNext");
      return;
    }

    // Validar se pode prosseguir
    const canProceedResult = canProceed();
    if (!canProceedResult) {
      console.log("[QuizFlow] Cannot proceed - validation failed", {
        type: question.type,
        id: question.id,
        selectedOption,
        quizData: {
          name: quizData.name,
          birthday: quizData.birthday,
          breed: quizData.breed,
          gender: quizData.gender,
          time: quizData.time,
          housingType: quizData.housingType,
          otherPeople: quizData.otherPeople,
          challenge: quizData.challenge,
          personality: quizData.personality,
          health: quizData.health,
        },
      });
      return;
    }

    setIsAnimating(true);

    // Usar requestAnimationFrame para garantir que o estado seja atualizado
    requestAnimationFrame(() => {
      setTimeout(() => {
        try {
          if (currentQuestion === TOTAL_QUESTIONS) {
            onFinish();
          } else {
            onNext();
          }
        } catch (error) {
          console.error("[QuizFlow] Error in handleNext:", error);
        } finally {
          // Resetar após um pequeno delay para garantir que a navegação aconteceu
          setTimeout(() => {
            setIsAnimating(false);
          }, 50);
        }
      }, 150); // Reduzido de 200ms para 150ms
    });
  };

  const scheduleAutoAdvance = (selectedValue?: string | string[] | null) => {
    // Cancelar timer anterior se existir
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setAutoAdvanceProgress(0);

    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / AUTO_ADVANCE_DELAY) * 100, 100);
      setAutoAdvanceProgress(progress);

      if (progress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        animationFrameRef.current = null;
      }
    };

    // Iniciar animação de progresso
    animationFrameRef.current = requestAnimationFrame(updateProgress);

    // Agendar avanço - garantir que handleNext seja chamado corretamente
    const timer = setTimeout(() => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setAutoAdvanceProgress(100);
      setAutoAdvanceTimer(null);

      // Função para tentar avançar - com múltiplas tentativas se necessário
      const attemptAdvance = (retries = 5) => {
        if (retries <= 0) {
          console.warn("[QuizFlow] Failed to advance after multiple attempts");
          return;
        }

        // Se temos um valor passado, verificar diretamente
        let canProceedNow = false;

        if (selectedValue !== undefined) {
          // Usar o valor passado diretamente
          canProceedNow = canProceed(selectedValue);
        } else {
          // Verificar o estado atual
          canProceedNow = canProceed();
        }

        if (canProceedNow && !isAnimating) {
          console.log("[QuizFlow] Auto-advancing to next question", {
            selectedValue,
            selectedOption,
            questionType: question.type,
            questionId: question.id,
          });
          handleNext();
        } else {
          // Se não pode prosseguir ainda, tentar novamente após um delay
          // Na próxima tentativa, verificar o estado atual (pode ter mudado)
          setTimeout(() => {
            const currentCanProceed = canProceed();
            if (currentCanProceed && !isAnimating) {
              console.log("[QuizFlow] Auto-advancing on retry");
              handleNext();
            } else if (retries > 1) {
              attemptAdvance(retries - 1);
            }
          }, 80);
        }
      };

      // Usar requestAnimationFrame para garantir que o estado esteja atualizado
      requestAnimationFrame(() => {
        // Dar um pequeno delay adicional para garantir que o React atualizou o estado
        setTimeout(() => {
          attemptAdvance();
        }, 100);
      });
    }, AUTO_ADVANCE_DELAY);

    setAutoAdvanceTimer(timer);
  };

  const cancelAutoAdvance = () => {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setAutoAdvanceProgress(0);
  };

  const handleOptionSelect = (value: string) => {
    if (question.type === "radio") {
      setSelectedOption(value);
      // Atualizar dados primeiro
      if (question.id === 3) onUpdate("gender", value);
      if (question.id === 10) onUpdate("time", value);
      if (question.id === 12) onUpdate("otherPeople", value);

      // Avançar imediatamente após um pequeno delay para garantir que o estado foi atualizado
      setTimeout(() => {
        if (canProceed(value)) {
          handleNext();
        }
      }, 100);
    } else if (question.type === "housing") {
      setSelectedOption(value);
      onUpdate("housingType", value);

      // Avançar imediatamente após um pequeno delay para garantir que o estado foi atualizado
      setTimeout(() => {
        if (canProceed(value)) {
          handleNext();
        }
      }, 100);
    } else if (question.type === "challenge") {
      const current = (quizData.challenge || []) as string[];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      setSelectedOption(updated);
      onUpdate("challenge", updated);
    } else if (question.type === "checkbox") {
      const current = question.id === 7 ? quizData.personality || [] : [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      setSelectedOption(updated);
      if (question.id === 7) onUpdate("personality", updated);
    } else if (question.type === "health") {
      const current = (quizData.health || []) as string[];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      setSelectedOption(updated);
      onUpdate("health", updated);
    }
  };

  const canProceed = (forceSelectedOption?: string | string[] | null) => {
    // Se forceSelectedOption for fornecido, usar ele ao invés de selectedOption
    const currentSelected =
      forceSelectedOption !== undefined ? forceSelectedOption : selectedOption;

    if (question.type === "text") {
      return !!(quizData.name && quizData.name.trim().length > 0);
    }
    if (question.type === "date") {
      return !!quizData.birthday;
    }
    if (question.type === "select") {
      // Para select, sempre verificar quizData.breed pois é atualizado via onUpdate
      return !!quizData.breed;
    }
    if (question.type === "textarea") {
      return true; // Opcional
    }
    if (question.type === "radio") {
      // Verificar tanto currentSelected quanto dados salvos
      if (question.id === 3) {
        return !!(currentSelected || quizData.gender);
      }
      if (question.id === 10) {
        return !!(currentSelected || quizData.time);
      }
      if (question.id === 12) {
        return !!(currentSelected || quizData.otherPeople);
      }
      return !!currentSelected;
    }
    if (question.type === "housing") {
      return !!(currentSelected || quizData.housingType);
    }
    if (question.type === "challenge") {
      const challenges = Array.isArray(currentSelected)
        ? currentSelected
        : quizData.challenge || [];
      return challenges.length > 0;
    }
    if (question.type === "checkbox" && question.id === 7) {
      const personality = Array.isArray(currentSelected)
        ? currentSelected
        : quizData.personality || [];
      return personality.length > 0;
    }
    if (question.type === "health") {
      const health = Array.isArray(currentSelected)
        ? currentSelected
        : quizData.health || [];
      return health.length > 0;
    }
    return true;
  };

  // Challenge icons mapping
  const challengeIcons: Record<string, React.ReactNode> = {
    "Não obedece": <Target className="w-6 h-6" />,
    "Pula nas pessoas": <Activity className="w-6 h-6" />,
    "Puxa a coleira": <Zap className="w-6 h-6" />,
    "Latido excessivo": <Volume2 className="w-6 h-6" />,
    Agressividade: <AlertTriangle className="w-6 h-6" />,
    Ansiedade: <Brain className="w-6 h-6" />,
    Destrutividade: <Scissors className="w-6 h-6" />,
    Fuga: <Zap className="w-6 h-6" />,
    Medo: <Shield className="w-6 h-6" />,
    Hiperatividade: <Activity className="w-6 h-6" />,
  };

  // Challenge colors mapping - cores coerentes com o conteúdo
  const getChallengeColors = (option: string, isSelected: boolean) => {
    const colorMap: Record<
      string,
      {
        border: string;
        bg: string;
        iconBg: string;
        text: string;
        shadow: string;
      }
    > = {
      "Não obedece": {
        border: isSelected ? "border-blue-500" : "border-[#E5E5E0]",
        bg: isSelected
          ? "bg-gradient-to-br from-blue-50 to-blue-100/50"
          : "bg-white",
        iconBg: isSelected ? "bg-blue-500" : "bg-[#FAFAF9]",
        text: isSelected ? "text-blue-700" : "text-[#2D2E29]",
        shadow: isSelected ? "shadow-lg shadow-blue-500/20" : "",
      },
      "Pula nas pessoas": {
        border: isSelected ? "border-orange-500" : "border-[#E5E5E0]",
        bg: isSelected
          ? "bg-gradient-to-br from-orange-50 to-orange-100/50"
          : "bg-white",
        iconBg: isSelected ? "bg-orange-500" : "bg-[#FAFAF9]",
        text: isSelected ? "text-orange-700" : "text-[#2D2E29]",
        shadow: isSelected ? "shadow-lg shadow-orange-500/20" : "",
      },
      "Puxa a coleira": {
        border: isSelected ? "border-yellow-500" : "border-[#E5E5E0]",
        bg: isSelected
          ? "bg-gradient-to-br from-yellow-50 to-yellow-100/50"
          : "bg-white",
        iconBg: isSelected ? "bg-yellow-500" : "bg-[#FAFAF9]",
        text: isSelected ? "text-yellow-700" : "text-[#2D2E29]",
        shadow: isSelected ? "shadow-lg shadow-yellow-500/20" : "",
      },
      "Latido excessivo": {
        border: isSelected ? "border-red-500" : "border-[#E5E5E0]",
        bg: isSelected
          ? "bg-gradient-to-br from-red-50 to-red-100/50"
          : "bg-white",
        iconBg: isSelected ? "bg-red-500" : "bg-[#FAFAF9]",
        text: isSelected ? "text-red-700" : "text-[#2D2E29]",
        shadow: isSelected ? "shadow-lg shadow-red-500/20" : "",
      },
      Agressividade: {
        border: isSelected ? "border-red-600" : "border-[#E5E5E0]",
        bg: isSelected
          ? "bg-gradient-to-br from-red-100 to-red-200/50"
          : "bg-white",
        iconBg: isSelected ? "bg-red-600" : "bg-[#FAFAF9]",
        text: isSelected ? "text-red-800" : "text-[#2D2E29]",
        shadow: isSelected ? "shadow-lg shadow-red-600/20" : "",
      },
      Ansiedade: {
        border: isSelected ? "border-purple-500" : "border-[#E5E5E0]",
        bg: isSelected
          ? "bg-gradient-to-br from-purple-50 to-purple-100/50"
          : "bg-white",
        iconBg: isSelected ? "bg-purple-500" : "bg-[#FAFAF9]",
        text: isSelected ? "text-purple-700" : "text-[#2D2E29]",
        shadow: isSelected ? "shadow-lg shadow-purple-500/20" : "",
      },
      Destrutividade: {
        border: isSelected ? "border-orange-600" : "border-[#E5E5E0]",
        bg: isSelected
          ? "bg-gradient-to-br from-orange-100 to-orange-200/50"
          : "bg-white",
        iconBg: isSelected ? "bg-orange-600" : "bg-[#FAFAF9]",
        text: isSelected ? "text-orange-800" : "text-[#2D2E29]",
        shadow: isSelected ? "shadow-lg shadow-orange-600/20" : "",
      },
      Fuga: {
        border: isSelected ? "border-amber-500" : "border-[#E5E5E0]",
        bg: isSelected
          ? "bg-gradient-to-br from-amber-50 to-amber-100/50"
          : "bg-white",
        iconBg: isSelected ? "bg-amber-500" : "bg-[#FAFAF9]",
        text: isSelected ? "text-amber-700" : "text-[#2D2E29]",
        shadow: isSelected ? "shadow-lg shadow-amber-500/20" : "",
      },
      Medo: {
        border: isSelected ? "border-indigo-500" : "border-[#E5E5E0]",
        bg: isSelected
          ? "bg-gradient-to-br from-indigo-50 to-indigo-100/50"
          : "bg-white",
        iconBg: isSelected ? "bg-indigo-500" : "bg-[#FAFAF9]",
        text: isSelected ? "text-indigo-700" : "text-[#2D2E29]",
        shadow: isSelected ? "shadow-lg shadow-indigo-500/20" : "",
      },
      Hiperatividade: {
        border: isSelected ? "border-green-500" : "border-[#E5E5E0]",
        bg: isSelected
          ? "bg-gradient-to-br from-green-50 to-green-100/50"
          : "bg-white",
        iconBg: isSelected ? "bg-green-500" : "bg-[#FAFAF9]",
        text: isSelected ? "text-green-700" : "text-[#2D2E29]",
        shadow: isSelected ? "shadow-lg shadow-green-500/20" : "",
      },
    };

    return (
      colorMap[option] || {
        border: isSelected ? "border-gray-500" : "border-[#E5E5E0]",
        bg: isSelected
          ? "bg-gradient-to-br from-gray-50 to-gray-100/50"
          : "bg-white",
        iconBg: isSelected ? "bg-gray-500" : "bg-[#FAFAF9]",
        text: isSelected ? "text-gray-700" : "text-[#2D2E29]",
        shadow: isSelected ? "shadow-lg shadow-gray-500/20" : "",
      }
    );
  };

  // Housing icons mapping - ícones mais específicos e visuais
  const housingIcons: Record<string, React.ReactNode> = {
    "Apartamento pequeno": (
      <div className="relative">
        <Building2 className="w-7 h-7" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#1C8C58] rounded-full border-2 border-white" />
      </div>
    ),
    "Apartamento médio/grande": (
      <div className="relative">
        <Building className="w-7 h-7" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#1C8C58] rounded-full" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#1C8C58] rounded-full" />
      </div>
    ),
    "Casa com quintal pequeno": (
      <div className="relative">
        <House className="w-7 h-7" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#1C8C58]/30 rounded-full" />
      </div>
    ),
    "Casa com quintal grande": (
      <div className="relative">
        <Home className="w-7 h-7" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-[#1C8C58]/40 rounded-full" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#5BA67B]/30 rounded-full" />
      </div>
    ),
    "Sítio/Fazenda": (
      <div className="relative">
        <Trees className="w-7 h-7" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-[#1C8C58]/30 rounded-full" />
      </div>
    ),
  };

  // Other people icons mapping
  const otherPeopleIcons: Record<string, React.ReactNode> = {
    "Sim, família com crianças": <Users className="w-6 h-6" />,
    "Sim, família sem crianças": <Users className="w-6 h-6" />,
    "Sim, outros adultos": <Users className="w-6 h-6" />,
    "Não, moro sozinho(a)": <Heart className="w-6 h-6" />,
  };

  const renderQuestion = () => {
    switch (question.type) {
      case "photo":
        return (
          <motion.div variants={itemVariants} className="relative group">
            <label className="flex flex-col items-center justify-center w-full h-64 border-3 border-dashed border-[#E5E5E0] rounded-3xl bg-white cursor-pointer hover:border-[#1C8C58] transition-all duration-300 hover:bg-[#FAFAF9]">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Camera className="w-16 h-16 text-[#1C8C58] mb-4 group-hover:scale-110 transition-transform" />
                <p className="mb-2 text-lg font-medium text-[#2D2E29]">
                  {question.placeholder}
                </p>
                <p className="text-sm text-[#6B7280]">
                  Clique ou arraste uma imagem aqui
                </p>
              </div>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </motion.div>
        );

      case "text":
        return (
          <motion.div variants={itemVariants}>
            <div className="relative">
              <input
                type="text"
                placeholder={question.placeholder}
                className="w-full px-6 py-5 border-2 border-[#E5E5E0] rounded-2xl bg-white text-lg text-[#2D2E29] placeholder:text-[#9CA3AF] focus:border-[#1C8C58] focus:outline-none focus:ring-4 focus:ring-[#1C8C58]/10 transition-all duration-200"
                onChange={(e) => onUpdate("name", e.target.value)}
                value={quizData.name || ""}
                autoFocus
              />
              {quizData.name && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Check className="w-6 h-6 text-[#1C8C58]" />
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case "date":
        return (
          <motion.div variants={itemVariants}>
            <Popover>
              <PopoverTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    "w-full pl-14 pr-6 py-5 border-2 rounded-2xl bg-white text-lg text-left flex items-center justify-between transition-all duration-200",
                    date
                      ? "border-[#1C8C58] text-[#2D2E29]"
                      : "border-[#E5E5E0] text-[#9CA3AF] hover:border-[#1C8C58]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <Calendar className="w-6 h-6 text-[#6B7280]" />
                    <span>
                      {date
                        ? format(date, "dd/MM/yyyy")
                        : "Selecione a data de nascimento"}
                    </span>
                  </div>
                  {date && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="w-6 h-6 text-[#1C8C58]" />
                    </motion.div>
                  )}
                </motion.button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </motion.div>
        );

      case "select":
        return (
          <BreedSelector
            question={question}
            value={quizData.breed || ""}
            onSelect={(value) => {
              onUpdate("breed", value);
              if (value) {
                // Avançar imediatamente após um pequeno delay para garantir que o estado foi atualizado
                setTimeout(() => {
                  if (canProceed()) {
                    handleNext();
                  }
                }, 100);
              }
            }}
          />
        );

      case "textarea":
        return (
          <motion.div variants={itemVariants}>
            <textarea
              placeholder={question.placeholder}
              className="w-full px-6 py-5 border-2 border-[#E5E5E0] rounded-2xl bg-white text-lg text-[#2D2E29] placeholder:text-[#9CA3AF] focus:border-[#1C8C58] focus:outline-none focus:ring-4 focus:ring-[#1C8C58]/10 min-h-[140px] resize-none transition-all duration-200"
              onChange={(e) => onUpdate("special", e.target.value)}
              value={quizData.special || ""}
            />
          </motion.div>
        );

      case "radio":
        // Special handling for gender selection (question.id === 3)
        if (question.id === 3) {
          return (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4"
            >
              {question.options?.map((option, index) => {
                const isSelected = quizData.gender === option;
                const isMale = option === "Macho";

                // Cores diferentes para Macho (azul) e Fêmea (rosa)
                const genderColors = isMale
                  ? {
                      border: isSelected
                        ? "border-blue-500"
                        : "border-[#E5E5E0]",
                      bg: isSelected
                        ? "bg-gradient-to-br from-blue-50 to-blue-100/50"
                        : "bg-white",
                      iconBg: isSelected ? "bg-blue-500" : "bg-[#FAFAF9]",
                      text: isSelected ? "text-blue-700" : "text-[#2D2E29]",
                      shadow: isSelected ? "shadow-lg shadow-blue-500/20" : "",
                      checkColor: "text-blue-500",
                      overlay: isSelected
                        ? "from-blue-500/5 to-transparent"
                        : "",
                    }
                  : {
                      border: isSelected
                        ? "border-pink-500"
                        : "border-[#E5E5E0]",
                      bg: isSelected
                        ? "bg-gradient-to-br from-pink-50 to-pink-100/50"
                        : "bg-white",
                      iconBg: isSelected ? "bg-pink-500" : "bg-[#FAFAF9]",
                      text: isSelected ? "text-pink-700" : "text-[#2D2E29]",
                      shadow: isSelected ? "shadow-lg shadow-pink-500/20" : "",
                      checkColor: "text-pink-500",
                      overlay: isSelected
                        ? "from-pink-500/5 to-transparent"
                        : "",
                    };

                return (
                  <motion.button
                    key={option}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      "relative p-8 rounded-2xl border-2 transition-all duration-200 overflow-hidden",
                      genderColors.border,
                      genderColors.bg,
                      genderColors.shadow,
                      !isSelected && "hover:border-gray-300 hover:bg-[#FAFAF9]"
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br",
                          genderColors.overlay
                        )}
                      />
                    )}
                    <div className="relative flex flex-col items-center gap-4">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center transition-all",
                          genderColors.iconBg,
                          isSelected ? "text-white shadow-lg" : "text-[#6B7280]"
                        )}
                      >
                        <Heart className="w-8 h-8" />
                      </div>
                      <span
                        className={cn(
                          "text-xl font-semibold",
                          genderColors.text
                        )}
                      >
                        {option}
                      </span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="absolute top-2 right-2"
                        >
                          <Check
                            className={cn("w-6 h-6", genderColors.checkColor)}
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          );
        }

        // Regular radio for other questions
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {question.options?.map((option, index) => {
              const isSelected =
                selectedOption === option ||
                (question.id === 10 && quizData.time === option) ||
                (question.id === 11 && quizData.housingType === option) ||
                (question.id === 12 && quizData.otherPeople === option);

              return (
                <motion.label
                  key={option}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    "flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative overflow-hidden",
                    isSelected
                      ? "border-[#1C8C58] bg-gradient-to-br from-[#1C8C58]/10 to-[#5BA67B]/10 shadow-lg shadow-[#1C8C58]/20"
                      : "border-[#E5E5E0] bg-white hover:border-[#1C8C58]/50 hover:bg-[#FAFAF9]"
                  )}
                  onClick={() => handleOptionSelect(option)}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-[#1C8C58]/5 to-transparent"
                    />
                  )}
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all relative z-10",
                      isSelected
                        ? "border-[#1C8C58] bg-[#1C8C58]"
                        : "border-[#D4C4A8] bg-white"
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 600,
                          damping: 30,
                        }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-lg font-medium flex-1 relative z-10",
                      isSelected ? "text-[#1C8C58]" : "text-[#2D2E29]"
                    )}
                  >
                    {option}
                  </span>
                </motion.label>
              );
            })}
          </motion.div>
        );

      case "checkbox":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3"
          >
            {question.options?.map((option, index) => {
              const current =
                question.id === 7 ? quizData.personality || [] : [];
              const isSelected = current.includes(option);

              return (
                <motion.button
                  key={option}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOptionSelect(option)}
                  className={cn(
                    "relative px-5 py-3 rounded-xl border-2 transition-all duration-200 overflow-hidden group flex items-center gap-2",
                    isSelected
                      ? "border-[#1C8C58] bg-gradient-to-br from-[#1C8C58]/10 to-[#5BA67B]/10 shadow-lg shadow-[#1C8C58]/20"
                      : "border-[#E5E5E0] bg-white hover:border-[#1C8C58]/50 hover:bg-[#FAFAF9]"
                  )}
                >
                  {isSelected && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-[#1C8C58]/5 to-transparent"
                      />
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className="relative z-10 flex-shrink-0"
                      >
                        <Check className="w-5 h-5 text-[#1C8C58]" />
                      </motion.div>
                    </>
                  )}
                  <span
                    className={cn(
                      "text-base font-medium relative z-10",
                      isSelected ? "text-[#1C8C58]" : "text-[#2D2E29]"
                    )}
                  >
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        );

      case "health":
        const healthOptions = question.options || [];
        const selectedHealth = (quizData.health || []) as string[];

        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="flex flex-wrap gap-3">
              {healthOptions.map((option) => {
                const isSelected = selectedHealth.includes(option);

                return (
                  <motion.button
                    key={option}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      "relative px-5 py-3 rounded-xl border-2 transition-all duration-200 overflow-hidden group flex items-center gap-2",
                      isSelected
                        ? "border-[#1C8C58] bg-gradient-to-br from-[#1C8C58]/10 to-[#5BA67B]/10 shadow-lg shadow-[#1C8C58]/20"
                        : "border-[#E5E5E0] bg-white hover:border-[#1C8C58]/50 hover:bg-[#FAFAF9]"
                    )}
                  >
                    {isSelected && (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-br from-[#1C8C58]/5 to-transparent"
                        />
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className="relative z-10 flex-shrink-0"
                        >
                          <Check className="w-5 h-5 text-[#1C8C58]" />
                        </motion.div>
                      </>
                    )}
                    <span
                      className={cn(
                        "text-base font-medium relative z-10",
                        isSelected ? "text-[#1C8C58]" : "text-[#2D2E29]"
                      )}
                    >
                      {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {selectedHealth.length > 0 &&
              !selectedHealth.includes("Nenhum problema") && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-[#6B7280]">
                    Descreva mais detalhes sobre as condições de saúde
                    (opcional)
                  </label>
                  <textarea
                    placeholder="Ex: Diagnóstico, tratamento atual, medicamentos..."
                    className="w-full px-4 py-3 border-2 border-[#E5E5E0] rounded-xl bg-white text-[#2D2E29] placeholder:text-[#9CA3AF] focus:border-[#1C8C58] focus:outline-none focus:ring-4 focus:ring-[#1C8C58]/10 min-h-[100px] resize-none transition-all duration-200"
                    onChange={(e) => onUpdate("healthNotes", e.target.value)}
                    value={quizData.healthNotes || ""}
                  />
                </motion.div>
              )}
          </motion.div>
        );

      case "challenge":
        const selectedChallenges = (quizData.challenge || []) as string[];

        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {question.options?.map((option, index) => {
              const isSelected = selectedChallenges.includes(option);
              const icon = challengeIcons[option] || (
                <AlertCircle className="w-6 h-6" />
              );
              const colors = getChallengeColors(option, isSelected);

              return (
                <motion.button
                  key={option}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(option)}
                  className={cn(
                    "relative p-5 rounded-2xl border-2 transition-all duration-200 overflow-hidden group flex items-center gap-4",
                    colors.border,
                    colors.bg,
                    colors.shadow,
                    !isSelected && "hover:border-gray-300 hover:bg-[#FAFAF9]"
                  )}
                >
                  {isSelected && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={cn(
                          "absolute inset-0",
                          colors.bg,
                          "opacity-30"
                        )}
                      />
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className="absolute top-2 right-2 z-20"
                      >
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            colors.iconBg
                          )}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </motion.div>
                    </>
                  )}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all relative z-10 flex-shrink-0",
                      colors.iconBg,
                      isSelected ? "text-white shadow-md" : "text-[#6B7280]"
                    )}
                  >
                    {icon}
                  </div>
                  <span
                    className={cn(
                      "text-base font-medium flex-1 text-left relative z-10",
                      colors.text
                    )}
                  >
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        );

      case "housing":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {question.options?.map((option, index) => {
              const isSelected = quizData.housingType === option;
              const icon = housingIcons[option] || <Home className="w-6 h-6" />;

              return (
                <motion.button
                  key={option}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(option)}
                  className={cn(
                    "relative p-6 rounded-2xl border-2 transition-all duration-200 overflow-hidden group",
                    isSelected
                      ? "border-[#1C8C58] bg-gradient-to-br from-[#1C8C58]/10 to-[#5BA67B]/10 shadow-lg shadow-[#1C8C58]/20"
                      : "border-[#E5E5E0] bg-white hover:border-[#1C8C58]/50 hover:bg-[#FAFAF9]"
                  )}
                >
                  {isSelected && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-[#1C8C58]/5 to-transparent"
                      />
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute top-3 right-3"
                      >
                        <Check className="w-6 h-6 text-[#1C8C58]" />
                      </motion.div>
                    </>
                  )}
                  <div className="relative flex flex-col items-center gap-3">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-xl flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-[#1C8C58] text-white shadow-lg"
                          : "bg-[#FAFAF9] text-[#6B7280]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center",
                          isSelected ? "text-white" : "text-[#6B7280]"
                        )}
                      >
                        {icon}
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-base font-semibold text-center",
                        isSelected ? "text-[#1C8C58]" : "text-[#2D2E29]"
                      )}
                    >
                      {option}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Dev mode - apenas em desenvolvimento
  const isDev = process.env.NODE_ENV === "development";
  const [showDevControls, setShowDevControls] = useState(true); // Mostrar por padrão em dev

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] via-white to-[#F8F4EB] flex flex-col">
      {/* Dev Controls - apenas em desenvolvimento */}
      {isDev && (
        <DevControls>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowDevControls(!showDevControls)}
                className="text-xs text-[#6B7280] hover:text-[#1C8C58] font-medium px-2 py-1 rounded hover:bg-[#1C8C58]/10 transition-colors border border-[#E5E5E0] hover:border-[#1C8C58] ml-auto"
                aria-label={
                  showDevControls ? "Ocultar controles" : "Mostrar controles"
                }
              >
                {showDevControls ? "▼" : "▲"}
              </button>
            </div>

            {showDevControls && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#6B7280]">
                    Pular para pergunta:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      max={TOTAL_QUESTIONS}
                      defaultValue={currentQuestion}
                      className="w-20 px-2 py-1 text-sm border border-[#E5E5E0] rounded"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const value = parseInt(
                            (e.target as HTMLInputElement).value
                          );
                          if (value >= 1 && value <= TOTAL_QUESTIONS) {
                            // Usar onNext/onPrev para navegar
                            const diff = value - currentQuestion;
                            if (diff > 0) {
                              for (let i = 0; i < diff; i++) {
                                setTimeout(() => onNext(), i * 50);
                              }
                            } else if (diff < 0) {
                              for (let i = 0; i < Math.abs(diff); i++) {
                                setTimeout(() => onPrev(), i * 50);
                              }
                            }
                          }
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        const input = document.querySelector(
                          'input[type="number"]'
                        ) as HTMLInputElement;
                        const value = parseInt(input.value);
                        if (
                          value >= 1 &&
                          value <= TOTAL_QUESTIONS &&
                          value !== currentQuestion
                        ) {
                          if (onGoTo) {
                            onGoTo(value);
                          } else {
                            // Fallback: usar onNext/onPrev
                            const diff = value - currentQuestion;
                            if (diff > 0) {
                              for (let i = 0; i < diff; i++) {
                                setTimeout(() => onNext(), i * 100);
                              }
                            } else {
                              for (let i = 0; i < Math.abs(diff); i++) {
                                setTimeout(() => onPrev(), i * 100);
                              }
                            }
                          }
                        }
                      }}
                    >
                      Ir
                    </Button>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5E5E0] space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      // Preencher dados de teste
                      onUpdate("name", "Thor");
                      onUpdate("gender", "Macho");
                      onUpdate("breed", "Golden Retriever");
                      onUpdate("personality", ["Brincalhão", "Obediente"]);
                      onUpdate("challenge", ["Puxa a coleira"]);
                      onUpdate("time", "30 min/dia");
                      onUpdate("housingType", "Casa com quintal grande");
                      onUpdate("otherPeople", "Sim, família sem crianças");
                    }}
                    className="w-full text-xs"
                  >
                    📝 Preencher Dados Teste
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        // Submeter diretamente
                        onFinish();
                      }}
                      className="flex-1 text-xs bg-[#1C8C58] hover:bg-[#156B43]"
                    >
                      ✅ Submeter
                    </Button>
                    {onSkipToLoading && (
                      <Button
                        size="sm"
                        onClick={onSkipToLoading}
                        variant="outline"
                        className="flex-1 text-xs"
                      >
                        ⏭️ Pular Loading
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </DevControls>
      )}

      {/* Progress Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.15 }}
        className="bg-white/80 backdrop-blur-md border-b border-[#E5E5E0]/50 sticky top-0 z-50"
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#6B7280]">
              Pergunta {currentQuestion} de {TOTAL_QUESTIONS}
            </span>
            <span className="text-sm font-semibold text-[#1C8C58]">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="relative h-2 bg-[#E5E5E0] rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1C8C58] to-[#5BA67B] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8">
        <div className="max-w-3xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              {/* Question Header */}
              <div className="text-center space-y-4">
                {quizData.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C8C58]/10 rounded-full"
                  >
                    <Sparkles className="w-4 h-4 text-[#1C8C58]" />
                    <span className="text-sm font-semibold text-[#1C8C58]">
                      Personalizando para {quizData.name}
                    </span>
                  </motion.div>
                )}

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.15 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2E29] leading-tight"
                >
                  {question.title}
                </motion.h2>

                {question.placeholder &&
                  question.type !== "text" &&
                  question.type !== "date" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.12 }}
                      className="text-lg text-[#6B7280]"
                    >
                      {question.placeholder}
                    </motion.p>
                  )}
              </div>

              {/* Question Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {renderQuestion()}
              </motion.div>

              {/* Mensagem motivacional extra para retenção - apenas em algumas etapas */}
              {(() => {
                // Mostrar mensagens apenas em etapas específicas (não todas)
                const motivationalSteps = [3, 5, 7, 9, 11];
                const stepIndex = motivationalSteps.indexOf(currentQuestion);
                if (stepIndex === -1) return null;

                const messages = [
                  "Cada resposta nos ajuda a criar algo único para vocês 💚",
                  "Estamos conhecendo melhor seu cão a cada pergunta 🐕",
                  "Continue assim! Você está indo muito bem 🚀",
                  "Ótimo progresso! Estamos quase lá ✨",
                  "Falta muito pouco! Você está fazendo um trabalho incrível! 🎯",
                  "Cada detalhe importa para personalizar o melhor treinamento 💪",
                  "Estamos criando algo especial para vocês 🌟",
                  "Continue! O melhor está por vir! 🎉",
                ];

                // Usar o índice da etapa para variar a mensagem
                const messageIndex =
                  (stepIndex + currentQuestion) % messages.length;

                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <p className="text-sm text-[#9CA3AF] italic">
                      {messages[messageIndex]}
                    </p>
                  </motion.div>
                );
              })()}

              {/* Navigation - sempre visível */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 }}
                className="flex items-center justify-between gap-4 pt-4"
              >
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (currentQuestion > 1) {
                      onPrev();
                    } else {
                      onBack();
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Voltar
                </Button>

                {/* Botão Próximo/Finalizar - apenas para perguntas sem auto-advance */}
                {(question.type !== "radio" || question.id === 3) && (
                  <Button
                    onClick={() => {
                      handleNext();
                    }}
                    disabled={!canProceed() || isAnimating}
                    className={cn(
                      "flex items-center gap-2 min-w-[140px] justify-center",
                      !canProceed() && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {currentQuestion === TOTAL_QUESTIONS ? (
                      <>
                        Finalizar
                        <Sparkles className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        Próximo
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                )}

                {/* Para perguntas com auto-advance, mostrar apenas o botão Voltar centralizado */}
                {question.type === "radio" && question.id !== 3 && (
                  <div className="flex-1" /> // Spacer para manter o layout
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1C8C58]/5 to-transparent pointer-events-none" />
    </div>
  );
};
