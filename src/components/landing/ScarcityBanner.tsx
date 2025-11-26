"use client";

import React, { useState, useEffect } from "react";
import { X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScarcityBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    // Salvar o tempo inicial no localStorage
    const savedTime = localStorage.getItem("scarcityTimer");
    if (savedTime) {
      const parsed = JSON.parse(savedTime);
      const now = Date.now();
      const elapsed = Math.floor((now - parsed.startTime) / 1000);
      const totalSeconds = parsed.totalSeconds - elapsed;
      
      if (totalSeconds > 0) {
        setTimeLeft({
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        });
      }
    } else {
      // Inicializar timer (2h 30min = 9000 segundos)
      const totalSeconds = 2 * 3600 + 30 * 60;
      localStorage.setItem(
        "scarcityTimer",
        JSON.stringify({
          startTime: Date.now(),
          totalSeconds,
        })
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Mostrar apenas após 300px de scroll
      if (scrollY > 300 && !hasScrolled) {
        setHasScrolled(true);
        setIsVisible(true);
      } else if (scrollY <= 300) {
        setIsVisible(false);
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 w-full bg-[#FBBF24]/95 backdrop-blur-sm border-b border-[#000000]/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm">
            <Clock className="w-3.5 h-3.5 text-[#000000] flex-shrink-0" />
            <span className="font-semibold text-[#000000]">
              Oferta limitada:
            </span>
            <div className="flex items-center gap-1.5 bg-[#000000] px-2 py-0.5 rounded">
              <span className="font-bold text-[#FBBF24] tabular-nums text-xs">
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </span>
            </div>
            <span className="font-semibold text-[#000000] hidden sm:inline">
              • Apenas <span className="text-[#DC2626] font-bold">12 vagas</span> restantes
            </span>
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 p-0.5 hover:bg-[#000000]/10 rounded transition-colors ml-auto"
              aria-label="Fechar aviso"
            >
              <X className="w-3.5 h-3.5 text-[#000000]" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

