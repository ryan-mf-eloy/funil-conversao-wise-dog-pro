"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Play, CheckCircle2, Clock, BookOpen } from "lucide-react";
import type { Lesson } from "@/types/journey";
import { cn } from "@/lib/utils";

interface LessonDetailProps {
  lesson: Lesson;
  levelId: number;
  onBack: () => void;
  onComplete?: (lessonId: string) => void;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({
  lesson,
  levelId,
  onBack,
  onComplete,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isCompleted, setIsCompleted] = useState(lesson.completed || false);

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

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete?.(lesson.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] via-white to-[#F8F4EB]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-[#D4C4A8] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#1C8C58] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Voltar</span>
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{getTypeIcon()}</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#2D2E29]">
                  {lesson.title}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm text-[#6B7280]">Nível {levelId}</span>
                  <span className="text-sm text-[#6B7280]">•</span>
                  <div className="flex items-center gap-1 text-sm text-[#6B7280]">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration} minutos</span>
                  </div>
                </div>
              </div>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 text-[#1C8C58]">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">Completa</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Ilustração */}
          {lesson.illustration && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden bg-[#F8F4EB] border-2 border-[#D4C4A8] shadow-lg"
            >
              <Image
                src={lesson.illustration}
                alt={lesson.title}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          )}

          {/* Vídeo */}
          {lesson.videoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#2D2E29] border-2 border-[#D4C4A8] shadow-lg"
            >
              {!showVideo ? (
                <div
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white transition-colors">
                    <Play className="w-10 h-10 text-[#1C8C58] ml-1" fill="currentColor" />
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
            </motion.div>
          )}

          {/* Texto Explicativo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border-2 border-[#D4C4A8] p-6 md:p-8 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-[#1C8C58]" />
              <h2 className="text-xl font-bold text-[#2D2E29]">Conteúdo da Lição</h2>
            </div>
            <div
              className="prose prose-sm max-w-none text-[#6B7280]"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </motion.div>

          {/* Botão de Completar */}
          {!isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <button
                onClick={handleComplete}
                className="px-8 py-4 bg-[#1C8C58] text-white rounded-xl font-semibold shadow-lg hover:bg-[#156B43] transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Marcar como Completa</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

