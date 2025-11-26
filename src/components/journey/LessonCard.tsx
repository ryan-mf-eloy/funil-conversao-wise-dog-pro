"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, BookOpen, CheckCircle2, Clock } from "lucide-react";
import type { Lesson } from "@/types/journey";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: Lesson;
  levelId: number;
  position: "left" | "right";
  onClick?: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  levelId,
  position,
  onClick,
}) => {
  const [showVideo, setShowVideo] = useState(false);

  const getTypeIcon = () => {
    switch (lesson.type) {
      case "practice":
        return "🎯";
      case "theory":
        return "📚";
      case "qa":
        return "❓";
      case "checkpoint":
        return "✅";
      case "challenge":
        return "🏆";
      default:
        return "📖";
    }
  };

  const getDifficultyColor = () => {
    switch (lesson.difficulty) {
      case 1:
        return "bg-green-100 text-green-800";
      case 2:
        return "bg-blue-100 text-blue-800";
      case 3:
        return "bg-yellow-100 text-yellow-800";
      case 4:
        return "bg-orange-100 text-orange-800";
      case 5:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative bg-white rounded-xl border-2 border-[#D4C4A8] shadow-lg cursor-pointer overflow-hidden group",
        "hover:border-[#1C8C58] hover:shadow-xl transition-all duration-300"
      )}
    >
      {/* Indicador de posição na estrada */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#8B7355] border-4 border-white shadow-lg z-20",
          position === "left" ? "-left-3" : "-right-3"
        )}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{getTypeIcon()}</div>
            <div>
              <h3 className="text-xl font-bold text-[#2D2E29] group-hover:text-[#1C8C58] transition-colors">
                {lesson.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-semibold",
                    getDifficultyColor()
                  )}
                >
                  Nível {lesson.difficulty}
                </span>
                <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                  <Clock className="w-3 h-3" />
                  <span>{lesson.duration} min</span>
                </div>
              </div>
            </div>
          </div>
          {lesson.completed && (
            <CheckCircle2 className="w-6 h-6 text-[#1C8C58] flex-shrink-0" />
          )}
        </div>

        {/* Descrição */}
        <p className="text-[#6B7280] mb-4 line-clamp-2">
          {lesson.description}
        </p>

        {/* Mídia */}
        <div className="space-y-3">
          {/* Ilustração */}
          {lesson.illustration && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-[#F8F4EB] border-2 border-[#D4C4A8]">
              <Image
                src={lesson.illustration}
                alt={lesson.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Vídeo */}
          {lesson.videoUrl && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-[#2D2E29] border-2 border-[#D4C4A8] group/video">
              {!showVideo ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVideo(true);
                  }}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover/video:bg-white transition-colors">
                    <Play className="w-8 h-8 text-[#1C8C58] ml-1" fill="currentColor" />
                  </div>
                </div>
              ) : (
                <iframe
                  src={lesson.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E5E5E0]">
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <BookOpen className="w-4 h-4" />
            <span>{lesson.category}</span>
          </div>
          <span className="text-sm font-semibold text-[#1C8C58] group-hover:translate-x-1 transition-transform">
            Ver lição →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

