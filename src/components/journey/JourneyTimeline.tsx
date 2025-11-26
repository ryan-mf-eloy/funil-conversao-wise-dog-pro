"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Level } from "@/types/journey";

interface JourneyTimelineProps {
  levels: Level[];
  className?: string;
}

// Backgrounds temáticos para cada nível
const levelThemes = {
  home: {
    bg: "from-[#F8EBDD] via-[#F8F4EB] to-[#FAFAF9]",
    emoji: "🏠",
  },
  park: {
    bg: "from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7]",
    emoji: "🌳",
  },
  house: {
    bg: "from-[#FFF3E0] via-[#FFE0B2] to-[#FFCC80]",
    emoji: "🏡",
  },
  garden: {
    bg: "from-[#F1F8E9] via-[#DCEDC8] to-[#C5E1A5]",
    emoji: "🌿",
  },
  street: {
    bg: "from-[#EFEBE9] via-[#D7CCC8] to-[#BCAAA4]",
    emoji: "🛤️",
  },
  beach: {
    bg: "from-[#E0F2F1] via-[#B2DFDB] to-[#80CBC4]",
    emoji: "🏖️",
  },
  forest: {
    bg: "from-[#E8F5E9] via-[#A5D6A7] to-[#66BB6A]",
    emoji: "🌲",
  },
};

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  levels,
  className,
}) => {
  return (
    <div className={cn("relative", className)}>
      {/* Estrada de Terra - Linha vertical */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8B7355] via-[#A68B5B] to-[#8B7355] z-0">
        {/* Marcadores na estrada */}
        {levels.map((_, index) => (
          <div
            key={index}
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#6B5D4F] border-2 border-white shadow-sm"
            style={{
              top: `${(index / (levels.length - 1)) * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Níveis */}
      <div className="relative space-y-6">
        {levels.map((level, index) => {
          const theme = levelThemes[level.theme] || levelThemes.home;
          const completedLessons = level.lessons.filter((l) => l.completed).length;
          const totalLessons = level.lessons.length;

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20"
            >
              {/* Ponto na estrada */}
              <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-[#1C8C58] border-4 border-white shadow-lg z-10" />

              {/* Card do Nível */}
              <div
                className={cn(
                  "bg-gradient-to-br rounded-xl border-2 border-[#D4C4A8] p-4 shadow-md hover:shadow-lg transition-all",
                  `bg-gradient-to-br ${theme.bg}`
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1C8C58] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {level.id}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#2D2E29] flex items-center gap-2">
                        <span className="text-xl">{theme.emoji}</span>
                        {level.title}
                      </h4>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {level.description}
                      </p>
                    </div>
                  </div>
                  {level.completed && (
                    <CheckCircle2 className="w-5 h-5 text-[#1C8C58] flex-shrink-0" />
                  )}
                </div>

                {/* Lições do Nível */}
                <div className="ml-12 space-y-2">
                  {level.lessons.slice(0, 3).map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-2 text-sm text-[#6B7280] bg-white/50 rounded-lg px-2 py-1.5"
                    >
                      <span className="text-xs">
                        {lesson.type === "practice" && "🎯"}
                        {lesson.type === "theory" && "📚"}
                        {lesson.type === "qa" && "❓"}
                        {lesson.type === "checkpoint" && "✅"}
                        {lesson.type === "challenge" && "🏆"}
                      </span>
                      <span className="flex-1 truncate">{lesson.title}</span>
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{lesson.duration} min</span>
                      </div>
                    </div>
                  ))}
                  {level.lessons.length > 3 && (
                    <div className="text-xs text-[#6B7280] italic pl-2">
                      + {level.lessons.length - 3} lições...
                    </div>
                  )}
                </div>

                {/* Progresso */}
                <div className="mt-3 pt-3 border-t border-[#D4C4A8]/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6B7280]">
                      {completedLessons}/{totalLessons} lições
                    </span>
                    <div className="w-24 h-1.5 bg-[#E5E5E0] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#1C8C58] rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(completedLessons / totalLessons) * 100}%`,
                        }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

