"use client";

import React from "react";
import { useNavigation } from "@/hooks/useNavigation";
import { useQuiz } from "@/hooks/useQuiz";
import { LandingPage } from "@/components/landing/LandingPage";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { JourneyGeneration } from "@/components/journey/JourneyGeneration";
import { Paywall } from "@/components/paywall/Paywall";
import { Confirmation } from "@/components/confirmation/Confirmation";
import { useRouter } from "next/navigation";
import type { Section } from "@/types";

export default function WiseDogPro() {
  const {
    currentSection,
    quizQuestion,
    navigateTo,
    nextQuestion,
    prevQuestion,
    goToQuestion,
  } = useNavigation("landing");

  const { quizData, updateQuizData, resetQuiz } = useQuiz();

  // Verificar se deve redirecionar para paywall ou iniciar quiz
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const shouldRedirect = sessionStorage.getItem("redirectToPaywall");
      if (shouldRedirect === "true") {
        sessionStorage.removeItem("redirectToPaywall");
        navigateTo("paywall");
        return;
      }

      const startQuiz = sessionStorage.getItem("startQuiz");
      if (startQuiz === "true") {
        sessionStorage.removeItem("startQuiz");
        navigateTo("quiz");
      }

      // Verificar navegação do dev controls
      const devNavigate = sessionStorage.getItem("devNavigateTo");
      if (devNavigate) {
        sessionStorage.removeItem("devNavigateTo");
        const validSections: Section[] = ["landing", "quiz", "journey-generation", "paywall", "confirmation"];
        // Mapear paywall-teaser e paywall-full para paywall
        const mappedSection = devNavigate === "paywall-teaser" || devNavigate === "paywall-full" 
          ? "paywall" 
          : devNavigate;
        if (validSections.includes(mappedSection as Section)) {
          // Manter o estado específico do paywall se for teaser ou full
          if (devNavigate === "paywall-teaser" || devNavigate === "paywall-full") {
            sessionStorage.setItem("paywallView", devNavigate === "paywall-teaser" ? "teaser" : "full");
            sessionStorage.setItem("currentSection", devNavigate);
          } else {
            sessionStorage.setItem("currentSection", mappedSection);
          }
          navigateTo(mappedSection as Section);
        }
      }
    }
  }, [navigateTo]);

  // Salvar seção atual no sessionStorage
  React.useEffect(() => {
    if (typeof window !== "undefined" && currentSection) {
      sessionStorage.setItem("currentSection", currentSection);
    }
  }, [currentSection]);

  // Listener para navegação do dev controls quando já está na página
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleDevNavigation = () => {
        const devNavigate = sessionStorage.getItem("devNavigateTo");
        if (devNavigate) {
          sessionStorage.removeItem("devNavigateTo");
          const validSections: Section[] = ["landing", "quiz", "journey-generation", "paywall", "confirmation"];
          // Mapear paywall-teaser e paywall-full para paywall
          const mappedSection = devNavigate === "paywall-teaser" || devNavigate === "paywall-full" 
            ? "paywall" 
            : devNavigate;
          if (validSections.includes(mappedSection as Section)) {
            // Manter o estado específico do paywall se for teaser ou full
            if (devNavigate === "paywall-teaser" || devNavigate === "paywall-full") {
              sessionStorage.setItem("paywallView", devNavigate === "paywall-teaser" ? "teaser" : "full");
              sessionStorage.setItem("currentSection", devNavigate);
            } else {
              sessionStorage.setItem("currentSection", mappedSection);
            }
            navigateTo(mappedSection as Section);
          }
        }
      };

      window.addEventListener("devNavigation", handleDevNavigation);
      return () => window.removeEventListener("devNavigation", handleDevNavigation);
    }
  }, [navigateTo]);

  const handleStartClick = () => {
    navigateTo("quiz");
  };

  const handleFinishQuiz = () => {
    // Navegar para a tela de geração de jornada
    navigateTo("journey-generation");
  };

  const handleJourneyComplete = () => {
    // Após gerar a jornada, ir para o paywall
    navigateTo("paywall");
  };

  const handleSelectPlan = (plan: string) => {
    updateQuizData("plan", plan);
    // Salvar o plano selecionado no sessionStorage para validação
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedPlan", plan);
      sessionStorage.setItem("planSelectedAt", Date.now().toString());
    }
    navigateTo("cadastro");
  };

  return (
    <>
      {currentSection === "landing" && (
        <LandingPage onStartClick={handleStartClick} />
      )}

      {currentSection === "quiz" && (
        <QuizFlow
          currentQuestion={quizQuestion}
          quizData={quizData}
          onNext={nextQuestion}
          onPrev={prevQuestion}
          onGoTo={goToQuestion}
          onUpdate={updateQuizData}
          onFinish={handleFinishQuiz}
          onBack={() => navigateTo("landing")}
          onSkipToLoading={process.env.NODE_ENV === "development" ? () => navigateTo("journey-generation") : undefined}
        />
      )}

      {currentSection === "journey-generation" && (
        <JourneyGeneration
          quizData={quizData}
          onComplete={handleJourneyComplete}
          onBack={process.env.NODE_ENV === "development" ? () => navigateTo("quiz") : undefined}
          onSkip={process.env.NODE_ENV === "development" ? () => navigateTo("paywall") : undefined}
        />
      )}

      {currentSection === "paywall" && (
        <Paywall 
          onSelectPlan={handleSelectPlan}
          onBackToLoading={process.env.NODE_ENV === "development" ? () => navigateTo("journey-generation") : undefined}
          onBackToQuiz={process.env.NODE_ENV === "development" ? () => navigateTo("quiz") : undefined}
          quizData={quizData}
        />
      )}

      {currentSection === "confirmation" && (
        <Confirmation onBack={() => {
          resetQuiz();
          navigateTo("landing");
        }} />
      )}
    </>
  );
}
