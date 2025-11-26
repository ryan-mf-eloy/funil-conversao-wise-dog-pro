import { useState, useCallback } from "react";
import type { QuizData } from "@/types";

export const useQuiz = () => {
  const [quizData, setQuizData] = useState<QuizData>({});

  const updateQuizData = useCallback((key: keyof QuizData, value: unknown) => {
    setQuizData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizData({});
  }, []);

  return {
    quizData,
    updateQuizData,
    resetQuiz,
  };
};

