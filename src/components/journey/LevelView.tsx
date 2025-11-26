"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { LessonCard } from "./LessonCard";
import { RoadPath } from "./RoadPath";
import type { Level, Journey } from "@/types/journey";
import { cn } from "@/lib/utils";

interface LevelViewProps {
  level: Level;
  journey: Journey;
  onBack: () => void;
  onLessonClick?: (levelId: number, lessonId: string) => void;
}

// Backgrounds temáticos para cada nível - Design para público de pets
const levelThemes = {
  home: {
    bg: "bg-gradient-to-br from-[#F8EBDD] via-[#F8F4EB] to-[#FAFAF9]",
    pattern: "🏠",
    emoji: ["🏠", "🛋️", "🪑", "🪟"],
  },
  park: {
    bg: "bg-gradient-to-br from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7]",
    pattern: "🌳",
    emoji: ["🌳", "🌿", "🐕", "🌱"],
  },
  house: {
    bg: "bg-gradient-to-br from-[#FFF3E0] via-[#FFE0B2] to-[#FFCC80]",
    pattern: "🏡",
    emoji: ["🏡", "🚪", "🪴", "🛏️"],
  },
  garden: {
    bg: "bg-gradient-to-br from-[#F1F8E9] via-[#DCEDC8] to-[#C5E1A5]",
    pattern: "🌿",
    emoji: ["🌿", "🌸", "🦋", "🌺"],
  },
  street: {
    bg: "bg-gradient-to-br from-[#EFEBE9] via-[#D7CCC8] to-[#BCAAA4]",
    pattern: "🛤️",
    emoji: ["🛤️", "🚶", "🦮", "🌆"],
  },
  beach: {
    bg: "bg-gradient-to-br from-[#E0F2F1] via-[#B2DFDB] to-[#80CBC4]",
    pattern: "🏖️",
    emoji: ["🏖️", "🌊", "🐚", "☀️"],
  },
  forest: {
    bg: "bg-gradient-to-br from-[#E8F5E9] via-[#A5D6A7] to-[#66BB6A]",
    pattern: "🌲",
    emoji: ["🌲", "🦌", "🍄", "🦋"],
  },
};

export const LevelView: React.FC<LevelViewProps> = ({
  level,
  journey,
  onBack,
  onLessonClick,
}) => {
  const theme = levelThemes[level.theme] || levelThemes.home;

  return (
    <div className={cn("min-h-screen relative overflow-hidden", theme.bg)}>
      {/* Background Pattern Decorativo - Emojis temáticos */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        {theme.emoji.map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="absolute"
            style={{
              top: `${10 + i * 25}%`,
              left: `${10 + (i % 3) * 30}%`,
              fontSize: `${60 + i * 20}px`,
            }}
          >
            {emoji}
          </motion.div>
        ))}
        {/* Adicionar mais emojis espalhados */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`extra-${i}`}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${40 + Math.random() * 40}px`,
            }}
          >
            {theme.emoji[i % theme.emoji.length]}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 sticky top-0 bg-white/80 backdrop-blur-md border-b-2 border-[#D4C4A8] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#1C8C58] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Voltar para Jornada</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-[#1C8C58] text-white flex items-center justify-center font-bold text-xl">
                  {level.id}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#2D2E29]">
                  {level.title}
                </h1>
              </div>
              <p className="text-[#6B7280] ml-16">
                {level.description}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-[#6B7280]">Progresso do Nível</div>
              <div className="text-2xl font-bold text-[#1C8C58]">
                {level.lessons.filter((l) => l.completed).length}/{level.lessons.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo com Estrada */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="relative">
          {/* Estrada de Terra - SVG Path */}
          <RoadPath
            lessonsCount={level.lessons.length}
            className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 z-0"
          />

          {/* Lições com Estrada */}
          <div className="relative">
            {/* Estrada de Terra - SVG Path */}
            <RoadPath
              lessonsCount={level.lessons.length}
              className="absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 z-0"
            />

            {/* Lições */}
            <div className="relative space-y-16">
              {level.lessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={cn(
                    "relative z-10",
                    index % 2 === 0 ? "pr-[55%]" : "pl-[55%]"
                  )}
                >
                  <LessonCard
                    lesson={lesson}
                    levelId={level.id}
                    position={index % 2 === 0 ? "left" : "right"}
                    onClick={() => onLessonClick?.(level.id, lesson.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

