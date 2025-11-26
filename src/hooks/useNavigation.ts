import { useState, useCallback } from "react";
import type { Section } from "@/types";

export const useNavigation = (initialSection: Section = "landing") => {
  const [currentSection, setCurrentSection] = useState<Section>(initialSection);
  const [quizQuestion, setQuizQuestion] = useState(1);

  const navigateTo = useCallback((section: Section) => {
    setCurrentSection(section);
    window.scrollTo(0, 0);
    if (section === "quiz") setQuizQuestion(1);
  }, []);

  const nextQuestion = useCallback(() => {
    setQuizQuestion((prev) => (prev < 12 ? prev + 1 : prev));
  }, []);

  const prevQuestion = useCallback(() => {
    setQuizQuestion((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const goToQuestion = useCallback((questionNumber: number) => {
    if (questionNumber >= 1 && questionNumber <= 12) {
      setQuizQuestion(questionNumber);
    }
  }, []);

  return {
    currentSection,
    quizQuestion,
    navigateTo,
    nextQuestion,
    prevQuestion,
    goToQuestion,
  };
};

