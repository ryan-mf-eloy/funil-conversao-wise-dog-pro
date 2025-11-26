"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Play,
  Zap,
  Pause,
  PlayCircle,
  RotateCcw,
  SkipForward,
  Sparkles,
} from "lucide-react";

export function GlobalDevControls() {
  // Só mostrar em desenvolvimento
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isMainFlow = pathname === "/";

  // Verificar se está na seção de loading
  const [currentSection, setCurrentSection] = useState<string>("");

  useEffect(() => {
    // Detectar seção atual via sessionStorage
    const checkSection = () => {
      if (typeof window !== "undefined") {
        const section = sessionStorage.getItem("currentSection") || "";
        setCurrentSection(section);
      }
    };

    checkSection();
    const interval = setInterval(checkSection, 300);
    return () => clearInterval(interval);
  }, []);

  const isInLoadingSection = currentSection === "journey-generation";
  const isInPaywallSection =
    currentSection === "paywall" ||
    currentSection === "paywall-teaser" ||
    currentSection === "paywall-full" ||
    (isMainFlow && pathname === "/");
  const isInPaywallTeaser = currentSection === "paywall-teaser";
  const isInPaywallFull = currentSection === "paywall-full";

  useEffect(() => {
    // Carregar estado salvo do localStorage
    const savedState = localStorage.getItem("devControlsOpen");
    if (savedState === "true") {
      setIsOpen(true);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Salvar estado no localStorage
    if (isInitialized) {
      localStorage.setItem("devControlsOpen", isOpen ? "true" : "false");
    }
  }, [isOpen, isInitialized]);

  // Funções de controle do Paywall
  const handleShowTeaser = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("currentSection", "paywall-teaser");
      window.dispatchEvent(
        new CustomEvent("devPaywallControl", {
          detail: { action: "showTeaser" },
        })
      );
      setCurrentSection("paywall-teaser");
    }
  };

  const handleShowFullPaywall = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("currentSection", "paywall-full");
      window.dispatchEvent(
        new CustomEvent("devPaywallControl", {
          detail: { action: "showFullPaywall" },
        })
      );
      setCurrentSection("paywall-full");
    }
  };

  // Função para navegar entre seções do fluxo principal
  const navigateToSection = (section: string) => {
    if (typeof window !== "undefined") {
      // Mapear seções de paywall para "paywall" na navegação, mas manter o estado específico
      let navigationSection = section;
      if (section === "paywall-teaser" || section === "paywall-full") {
        navigationSection = "paywall";
        // Salvar o estado específico do paywall para o componente detectar
        sessionStorage.setItem(
          "paywallView",
          section === "paywall-teaser" ? "teaser" : "full"
        );
      }

      sessionStorage.setItem("devNavigateTo", navigationSection);
      sessionStorage.setItem("currentSection", section);

      // Se não estiver na página principal, navegar para lá primeiro
      if (pathname !== "/") {
        router.push("/");
      } else {
        // Se já estiver na página principal, disparar evento para atualizar
        window.dispatchEvent(new Event("devNavigation"));
      }
    }
  };

  // Funções de controle do loading
  const handlePauseResume = () => {
    if (typeof window !== "undefined") {
      const newPausedState = !isPaused;
      setIsPaused(newPausedState);
      window.dispatchEvent(
        new CustomEvent("devLoadingControl", {
          detail: { action: newPausedState ? "pause" : "resume" },
        })
      );
    }
  };

  const handleResetLoading = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("devLoadingControl", {
          detail: { action: "reset" },
        })
      );
    }
  };

  const handleJumpToStep = (stepIndex: number) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("devLoadingControl", {
          detail: { action: "jumpToStep", stepIndex },
        })
      );
    }
  };

  // Funções de controle do Paywall
  const handleTriggerConfetti = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("devPaywallControl", {
          detail: { action: "triggerConfetti" },
        })
      );
    }
  };

  const handleResetAnimations = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("devPaywallControl", {
          detail: { action: "resetAnimations" },
        })
      );
    }
  };

  if (!isInitialized) {
    return null;
  }

  const pages = [
    { path: "/", label: "🏠 Home / Landing" },
    { path: "/login", label: "🔐 Login" },
    { path: "/cadastro", label: "✍️ Cadastro" },
    { path: "/contato", label: "📧 Contato" },
    { path: "/sobre-nos", label: "ℹ️ Sobre Nós" },
    { path: "/blog", label: "📰 Blog" },
    { path: "/politica-privacidade", label: "🔒 Política Privacidade" },
    { path: "/termos-condicoes", label: "📄 Termos e Condições" },
    { path: "/trial-success", label: "✅ Trial Success" },
    { path: "/settings/subscription", label: "⚙️ Minha Assinatura" },
  ];

  const flowSections = [
    { id: "landing", label: "🏠 Landing Page" },
    { id: "quiz", label: "❓ Quiz" },
    { id: "journey-generation", label: "⚙️ Loading / Geração" },
    { id: "paywall-teaser", label: "🎯 Paywall Teaser" },
    { id: "paywall-full", label: "💰 Paywall Completo" },
    { id: "confirmation", label: "✅ Confirmação" },
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[9999]">
      {/* Botão de Toggle - Sempre visível */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "bg-[#1C8C58] text-white p-2 rounded-r-lg shadow-lg hover:bg-[#156B43] transition-colors border-2 border-r-0 border-[#1C8C58]",
          isOpen && "rounded-r-none"
        )}
        aria-label={isOpen ? "Ocultar controles" : "Mostrar controles"}
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>

      {/* Painel de Controles */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white border-2 border-[#1C8C58] border-l-0 rounded-r-xl shadow-2xl w-[320px] max-h-[80vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-b-2 border-[#E5E5E0] bg-gradient-to-r from-[#1C8C58]/5 to-transparent"
            >
              <div className="flex items-center justify-between mb-2">
                <motion.h3
                  className="text-sm font-bold text-[#1C8C58] flex items-center gap-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <span className="text-base">🔧</span>
                  <span>Dev Controls</span>
                </motion.h3>
              </div>
              <p className="text-xs text-[#6B7280]">
                Controles disponíveis em todas as páginas
              </p>
            </motion.div>

            {/* Conteúdo com Scroll */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Controles de Paywall - Apenas quando estiver na seção de paywall */}
              {isInPaywallSection && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-3 pb-3 border-b-2 border-[#E5E5E0]"
                >
                  <div className="text-xs font-semibold text-[#1C8C58] mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Controle de Paywall</span>
                  </div>

                  {/* Navegação entre Teaser e Paywall Completo */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShowTeaser}
                      className={cn(
                        "text-xs px-3 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm border-2",
                        isInPaywallTeaser
                          ? "bg-[#1C8C58] text-white border-[#1C8C58]"
                          : "bg-[#E5E5E0] text-[#6B7280] border-transparent hover:bg-[#D4C4A8]"
                      )}
                    >
                      <span>🎯</span>
                      <span>Teaser</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShowFullPaywall}
                      className={cn(
                        "text-xs px-3 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm border-2",
                        isInPaywallFull
                          ? "bg-[#1C8C58] text-white border-[#1C8C58]"
                          : "bg-[#E5E5E0] text-[#6B7280] border-transparent hover:bg-[#D4C4A8]"
                      )}
                    >
                      <span>💰</span>
                      <span>Completo</span>
                    </motion.button>
                  </div>

                  {/* Botões de Controle */}
                  <div className="grid grid-cols-1 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleTriggerConfetti}
                      className="text-xs px-3 py-2 rounded-lg font-semibold bg-[#FBBF24] text-[#2D2E29] hover:bg-[#FCD34D] transition-all flex items-center justify-center gap-1.5 shadow-sm border-2 border-[#FBBF24]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>🎉 Jogar Confete</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleResetAnimations}
                      className="text-xs px-3 py-2 rounded-lg font-semibold bg-[#6B7280] text-white hover:bg-[#4B5563] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Resetar Animações</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Controles de Loading - Apenas quando estiver na seção de loading */}
              {isInLoadingSection && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-3 pb-3 border-b-2 border-[#E5E5E0]"
                >
                  <div className="text-xs font-semibold text-[#1C8C58] mb-2 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Controle de Loading</span>
                  </div>

                  {/* Botões de Controle */}
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePauseResume}
                      className={cn(
                        "text-xs px-3 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5",
                        isPaused
                          ? "bg-[#1C8C58] text-white hover:bg-[#156B43] shadow-sm"
                          : "bg-[#E5E5E0] text-[#6B7280] hover:bg-[#D4C4A8] border-2 border-transparent"
                      )}
                    >
                      {isPaused ? (
                        <>
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>Continuar</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pausar</span>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleResetLoading}
                      className="text-xs px-3 py-2 rounded-lg font-semibold bg-[#6B7280] text-white hover:bg-[#4B5563] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Resetar</span>
                    </motion.button>
                  </div>

                  {/* Etapas */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-[#6B7280] font-medium">
                      Pular para etapa:
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <motion.button
                          key={step}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleJumpToStep(step - 1)}
                          className="px-2 py-1.5 text-xs font-semibold rounded-lg bg-[#E5E5E0] text-[#6B7280] hover:bg-[#1C8C58]/20 hover:text-[#1C8C58] transition-all"
                        >
                          {step}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Controles do Fluxo Principal */}
              {isMainFlow && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={cn(
                    "space-y-2",
                    isInLoadingSection && "pt-3 border-t-2 border-[#E5E5E0]"
                  )}
                >
                  <div className="text-xs font-semibold text-[#1C8C58] mb-2 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Fluxo Principal</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {flowSections.map((section, index) => (
                      <motion.button
                        key={section.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigateToSection(section.id)}
                        className={cn(
                          "text-xs px-3 py-2 rounded-lg font-semibold transition-all flex items-center justify-between gap-2 text-left w-full border-2",
                          currentSection === section.id
                            ? "bg-[#1C8C58]/20 border-[#1C8C58] text-[#1C8C58] shadow-sm"
                            : "bg-transparent border-transparent hover:bg-[#1C8C58]/10 hover:border-[#1C8C58]/30 text-[#6B7280]"
                        )}
                      >
                        <span className="truncate">{section.label}</span>
                        <Play className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Navegação Rápida */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-3 border-t-2 border-[#E5E5E0]"
              >
                <div className="text-xs font-semibold text-[#1C8C58] mb-2 flex items-center gap-2">
                  <span>🗺️</span>
                  <span>Navegação Rápida</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {pages.map((page, index) => {
                    const isCurrentPage = pathname === page.path;
                    return (
                      <motion.a
                        key={page.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.02 }}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        href={page.path}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(page.path);
                        }}
                        className={cn(
                          "text-xs px-3 py-2 rounded-lg font-semibold transition-all flex items-center justify-between gap-2 border-2",
                          isCurrentPage
                            ? "bg-[#1C8C58]/20 border-[#1C8C58] text-[#1C8C58] shadow-sm"
                            : "bg-transparent border-transparent hover:bg-[#1C8C58]/10 hover:border-[#1C8C58]/30 text-[#6B7280]"
                        )}
                      >
                        <span className="truncate">{page.label}</span>
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
