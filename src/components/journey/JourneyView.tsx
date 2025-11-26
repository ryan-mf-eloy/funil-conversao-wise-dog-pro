"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LevelView } from "./LevelView";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Journey } from "@/types/journey";
import { cn } from "@/lib/utils";

interface JourneyViewProps {
  journey: Journey;
  onLessonClick?: (levelId: number, lessonId: string) => void;
}

export const JourneyView: React.FC<JourneyViewProps> = ({
  journey,
  onLessonClick,
}) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [viewMode, setViewMode] = useState<"overview" | "level">("overview");

  const currentLevelData = journey.levels.find((l) => l.id === currentLevel);

  const handleNextLevel = () => {
    if (currentLevel < 7) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const handlePrevLevel = () => {
    if (currentLevel > 1) {
      setCurrentLevel(currentLevel - 1);
    }
  };

  const handleLevelClick = (levelId: number) => {
    setCurrentLevel(levelId);
    setViewMode("level");
  };

  if (viewMode === "level" && currentLevelData) {
    return (
      <LevelView
        level={currentLevelData}
        journey={journey}
        onBack={() => setViewMode("overview")}
        onLessonClick={onLessonClick}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] via-white to-[#F8F4EB]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-[#D4C4A8] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#2D2E29]">
                Jornada de Treinamento
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                {journey.petName} • {journey.completedLessons}/{journey.totalLessons} lições completas
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-[#E5E5E0] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#1C8C58] rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(journey.completedLessons / journey.totalLessons) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm font-semibold text-[#1C8C58]">
                {Math.round((journey.completedLessons / journey.totalLessons) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Níveis Overview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {journey.levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleLevelClick(level.id)}
              className={cn(
                "relative overflow-hidden rounded-xl border-2 border-[#D4C4A8] cursor-pointer group",
                "hover:border-[#1C8C58] hover:shadow-lg transition-all duration-300"
              )}
            >
              {/* Background temático */}
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                style={{
                  background: level.backgroundColor,
                }}
              />
              
              {/* Conteúdo */}
              <div className="relative p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#1C8C58] text-white flex items-center justify-center font-bold text-lg">
                      {level.id}
                    </div>
                    <h3 className="text-lg font-bold text-[#2D2E29]">
                      {level.title}
                    </h3>
                  </div>
                  {level.completed && (
                    <div className="text-2xl">✅</div>
                  )}
                </div>
                
                <p className="text-sm text-[#6B7280] mb-4">
                  {level.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">
                    {level.lessons.length} lições
                  </span>
                  <span className="text-xs font-semibold text-[#1C8C58] group-hover:translate-x-1 transition-transform">
                    Ver lições →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

