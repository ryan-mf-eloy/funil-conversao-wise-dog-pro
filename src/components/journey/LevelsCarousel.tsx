"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Level {
  id: number;
  title: string;
  description: string;
  theme: string;
  color: string;
}

interface LevelsCarouselProps {
  levels: Level[];
  className?: string;
}

// Cores temáticas para cada nível
const levelColors = [
  {
    bg: "from-[#F8EBDD] to-[#FAFAF9]",
    border: "border-[#D4C4A8]",
    emoji: "🏠",
  }, // Nível 1 - Home
  {
    bg: "from-[#E8F5E9] to-[#C8E6C9]",
    border: "border-[#A5D6A7]",
    emoji: "🌳",
  }, // Nível 2 - Park
  {
    bg: "from-[#FFF3E0] to-[#FFE0B2]",
    border: "border-[#FFCC80]",
    emoji: "🏡",
  }, // Nível 3 - House
  {
    bg: "from-[#F1F8E9] to-[#DCEDC8]",
    border: "border-[#C5E1A5]",
    emoji: "🌿",
  }, // Nível 4 - Garden
  {
    bg: "from-[#EFEBE9] to-[#D7CCC8]",
    border: "border-[#BCAAA4]",
    emoji: "🛤️",
  }, // Nível 5 - Street
  {
    bg: "from-[#E0F2F1] to-[#B2DFDB]",
    border: "border-[#80CBC4]",
    emoji: "🏖️",
  }, // Nível 6 - Beach
  {
    bg: "from-[#E8F5E9] to-[#A5D6A7]",
    border: "border-[#66BB6A]",
    emoji: "🌲",
  }, // Nível 7 - Forest
];

export const LevelsCarousel: React.FC<LevelsCarouselProps> = ({
  levels,
  className,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const cardWidth = 320; // Largura de cada card (aumentada para formato horizontal)
  const gap = 16; // Gap entre cards

  // Auto-scroll apenas quando não está sendo arrastado
  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      if (scrollRef.current && !isDragging) {
        const containerWidth = scrollRef.current.clientWidth;
        const totalWidth = scrollRef.current.scrollWidth;
        const maxScroll = totalWidth - containerWidth;

        setScrollPosition((prev) => {
          const scrollAmount = cardWidth + gap;

          if (direction === "forward") {
            const newPosition = prev + scrollAmount;
            if (newPosition >= maxScroll) {
              // Chegou ao final, inverte a direção
              setDirection("backward");
              return Math.max(0, prev - scrollAmount);
            }
            return Math.min(newPosition, maxScroll);
          } else {
            const newPosition = prev - scrollAmount;
            if (newPosition <= 0) {
              // Chegou ao início, inverte a direção
              setDirection("forward");
              return Math.min(scrollAmount, maxScroll);
            }
            return Math.max(0, newPosition);
          }
        });
      }
    }, 2000); // Muda a cada 2 segundos

    return () => clearInterval(interval);
  }, [direction, cardWidth, gap, isDragging]);

  useEffect(() => {
    if (scrollRef.current && !isDragging) {
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [scrollPosition, isDragging]);

  // Função para snap suave ao card mais próximo
  const snapToNearestCard = useCallback(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardTotalWidth = cardWidth + gap;
    const nearestIndex = Math.round(scrollLeft / cardTotalWidth);
    const targetScroll = nearestIndex * cardTotalWidth;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    // Atualiza a posição para sincronizar com auto-scroll
    setScrollPosition(targetScroll);
  }, [cardWidth, gap]);

  // Momentum scrolling
  const applyMomentum = useCallback(() => {
    if (!scrollRef.current || !isDragging) return;

    if (Math.abs(velocity) > 0.5) {
      const currentScroll = scrollRef.current.scrollLeft;
      const newScroll = currentScroll - velocity;

      scrollRef.current.scrollLeft = newScroll;
      setVelocity(velocity * 0.95); // Fricção

      animationFrameRef.current = requestAnimationFrame(applyMomentum);
    } else {
      setVelocity(0);
      snapToNearestCard();
    }
  }, [velocity, isDragging, snapToNearestCard]);

  // Handlers para drag suave com momentum
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setVelocity(0);
    setLastX(e.pageX);
    setLastTime(Date.now());
    const rect = scrollRef.current.getBoundingClientRect();
    setStartX(e.pageX - rect.left);
    setScrollLeft(scrollRef.current.scrollLeft);
    // Pausa o auto-scroll
    setScrollPosition(scrollRef.current.scrollLeft);

    // Cancela qualquer animação em andamento
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();

      const now = Date.now();
      const timeDelta = now - lastTime;

      if (timeDelta > 0) {
        const deltaX = e.pageX - lastX;
        const newVelocity = (deltaX / timeDelta) * 16; // Normaliza para 60fps

        setVelocity(newVelocity);
        setLastX(e.pageX);
        setLastTime(now);
      }

      const rect = scrollRef.current.getBoundingClientRect();
      const x = e.pageX - rect.left;
      const walk = (x - startX) * 1.2; // Velocidade suave do scroll
      scrollRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft, lastX, lastTime]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Aplica momentum se houver velocidade suficiente
    if (Math.abs(velocity) > 1) {
      applyMomentum();
    } else {
      snapToNearestCard();
    }
  }, [velocity, applyMomentum, snapToNearestCard]);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    if (Math.abs(velocity) > 1) {
      applyMomentum();
    } else {
      snapToNearestCard();
    }
  }, [velocity, applyMomentum, snapToNearestCard]);

  // Touch handlers para mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setVelocity(0);
    const touch = e.touches[0];
    setLastX(touch.pageX);
    setLastTime(Date.now());
    const rect = scrollRef.current.getBoundingClientRect();
    setStartX(touch.pageX - rect.left);
    setScrollLeft(scrollRef.current.scrollLeft);
    // Pausa o auto-scroll
    setScrollPosition(scrollRef.current.scrollLeft);

    // Cancela qualquer animação em andamento
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !scrollRef.current) return;

      const touch = e.touches[0];
      const now = Date.now();
      const timeDelta = now - lastTime;

      if (timeDelta > 0) {
        const deltaX = touch.pageX - lastX;
        const newVelocity = (deltaX / timeDelta) * 16; // Normaliza para 60fps

        setVelocity(newVelocity);
        setLastX(touch.pageX);
        setLastTime(now);
      }

      const rect = scrollRef.current.getBoundingClientRect();
      const x = touch.pageX - rect.left;
      const walk = (x - startX) * 1.2; // Velocidade suave do scroll
      scrollRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft, lastX, lastTime]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    // Aplica momentum se houver velocidade suficiente
    if (Math.abs(velocity) > 1) {
      applyMomentum();
    } else {
      snapToNearestCard();
    }
  }, [velocity, applyMomentum, snapToNearestCard]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Container com scroll horizontal */}
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-4 overflow-x-auto scrollbar-hide py-4 snap-x snap-mandatory select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
          "scroll-smooth"
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          scrollBehavior: isDragging ? "auto" : "smooth",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {levels.map((level, index) => {
          const colorConfig = levelColors[index % levelColors.length];
          const isFirst = index === 0;
          const isLast = index === levels.length - 1;

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={cn(
                "relative flex-shrink-0 w-[320px] h-[200px] rounded-2xl border-2 snap-start transition-all duration-300 overflow-hidden group",
                "hover:shadow-2xl hover:border-[#1C8C58]",
                isFirst && "border-[#1C8C58]/50 shadow-md",
                !isFirst && "border-[#D4C4A8]/30 shadow-sm"
              )}
              style={{ userSelect: "none", pointerEvents: "auto" }}
            >
              {/* Background com gradiente sutil */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br transition-opacity duration-300",
                  isFirst
                    ? "from-[#1C8C58]/5 to-[#F8F4EB]/30 opacity-100"
                    : "from-white to-[#F8F4EB]/20 opacity-0 group-hover:opacity-100"
                )}
              />

              {/* Conteúdo */}
              <div className="relative z-10 h-full flex flex-col p-4">
                {/* Linha 1 - Badge, Emoji e Título */}
                <div className="flex items-start gap-2.5 mb-2.5">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base shadow-md transition-all duration-300",
                        isFirst
                          ? "bg-gradient-to-br from-[#1C8C58] to-[#156B43] text-white"
                          : "bg-white border border-[#D4C4A8]/40 text-[#1C8C58] group-hover:bg-[#1C8C58] group-hover:text-white group-hover:border-[#1C8C58]"
                      )}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {level.id}
                    </motion.div>
                    {isFirst && (
                      <motion.div
                        className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#FBBF24] rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-[8px]">✨</span>
                      </motion.div>
                    )}
                  </div>

                  <motion.div
                    className="text-xl flex-shrink-0 mt-0.5"
                    animate={isFirst ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    {colorConfig.emoji}
                  </motion.div>

                  <h4
                    className={cn(
                      "text-base font-bold leading-snug transition-colors duration-300 flex-1 pt-0.5",
                      isFirst
                        ? "text-[#1C8C58]"
                        : "text-[#2D2E29] group-hover:text-[#1C8C58]"
                    )}
                  >
                    {level.title}
                  </h4>
                </div>

                {/* Linha 2 - Descrição */}
                <div className="flex-1 mb-2.5 min-h-0">
                  <p className="text-xs text-[#6B7280] leading-relaxed font-light line-clamp-2">
                    {level.description}
                  </p>
                </div>

                {/* Linha 3 - Indicador de progresso e seta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-300",
                          i < (isFirst ? 3 : 0)
                            ? "bg-[#1C8C58]"
                            : "bg-[#D4C4A8]/30 group-hover:bg-[#1C8C58]/30"
                        )}
                      />
                    ))}
                  </div>

                  {!isLast && (
                    <motion.div
                      className="text-[#D4C4A8] group-hover:text-[#1C8C58] transition-colors text-sm"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  )}

                  {isLast && (
                    <motion.div className="text-[10px] font-semibold text-[#1C8C58] opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver mais →
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
