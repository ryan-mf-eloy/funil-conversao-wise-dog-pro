"use client";

import React, { useState } from "react";
import { JourneyView } from "@/components/journey/JourneyView";
import { LessonDetail } from "@/components/journey/LessonDetail";
import type { Journey, Level, Lesson } from "@/types/journey";

// Dados mockados para demonstração
const mockJourney: Journey = {
  id: "journey-1",
  userId: "user-1",
  petId: "pet-1",
  petName: "Thor",
  totalLessons: 9,
  completedLessons: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  levels: [
    {
      id: 1,
      title: "Fundamentos",
      description: "Comandos básicos e primeiros passos",
      theme: "home",
      backgroundColor: "#F8EBDD",
      lessons: [
        {
          id: "lesson-1-1",
          title: "Comando: Sentar",
          description: "Aprenda a ensinar seu cão a sentar com comandos claros",
          type: "practice",
          category: "basic",
          difficulty: 1,
          duration: 5,
          content: "<p>Esta é a primeira lição fundamental...</p>",
          order: 1,
        },
        {
          id: "lesson-1-2",
          title: "Reforço Positivo",
          description: "Entenda os princípios do reforço positivo",
          type: "theory",
          category: "basic",
          difficulty: 1,
          duration: 10,
          content: "<p>O reforço positivo é a base...</p>",
          order: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Comportamento",
      description: "Correção de comportamentos indesejados",
      theme: "park",
      backgroundColor: "#E8F5E9",
      lessons: [
        {
          id: "lesson-2-1",
          title: "Parar de Pular",
          description: "Ensine seu cão a não pular nas pessoas",
          type: "practice",
          category: "behavior",
          difficulty: 2,
          duration: 10,
          content: "<p>Para evitar que seu cão pule nas pessoas, você precisa...</p>",
          order: 1,
        },
        {
          id: "lesson-2-2",
          title: "Latidos Excessivos",
          description: "Controle os latidos do seu cão",
          type: "practice",
          category: "behavior",
          difficulty: 3,
          duration: 15,
          content: "<p>Latidos excessivos podem ser um problema...</p>",
          order: 2,
        },
      ],
    },
    {
      id: 3,
      title: "Passeios",
      description: "Aprenda a caminhar com seu cão",
      theme: "street",
      backgroundColor: "#EFEBE9",
      lessons: [
        {
          id: "lesson-3-1",
          title: "Caminhar na Coleira",
          description: "Ensine seu cão a andar corretamente na coleira",
          type: "practice",
          category: "basic",
          difficulty: 2,
          duration: 15,
          content: "<p>Um passeio tranquilo começa com...</p>",
          order: 1,
        },
      ],
    },
    {
      id: 4,
      title: "Truques",
      description: "Ensine truques divertidos ao seu cão",
      theme: "garden",
      backgroundColor: "#F1F8E9",
      lessons: [
        {
          id: "lesson-4-1",
          title: "Dar a Pata",
          description: "Ensine seu cão a dar a pata",
          type: "practice",
          category: "tricks",
          difficulty: 2,
          duration: 8,
          content: "<p>Dar a pata é um truque clássico...</p>",
          order: 1,
        },
      ],
    },
    {
      id: 5,
      title: "Socialização",
      description: "Ajude seu cão a se socializar",
      theme: "park",
      backgroundColor: "#E8F5E9",
      lessons: [
        {
          id: "lesson-5-1",
          title: "Interação com Outros Cães",
          description: "Ensine seu cão a interagir de forma saudável",
          type: "practice",
          category: "behavior",
          difficulty: 4,
          duration: 20,
          content: "<p>Socialização é fundamental para...</p>",
          order: 1,
        },
      ],
    },
    {
      id: 6,
      title: "Avançado",
      description: "Técnicas avançadas de treinamento",
      theme: "forest",
      backgroundColor: "#E8F5E9",
      lessons: [
        {
          id: "lesson-6-1",
          title: "Comandos à Distância",
          description: "Ensine comandos mesmo quando longe",
          type: "practice",
          category: "tricks",
          difficulty: 5,
          duration: 25,
          content: "<p>Comandos à distância requerem...</p>",
          order: 1,
        },
      ],
    },
    {
      id: 7,
      title: "Mestre",
      description: "Torne-se um mestre em adestramento",
      theme: "beach",
      backgroundColor: "#E0F2F1",
      lessons: [
        {
          id: "lesson-7-1",
          title: "Desafio Final",
          description: "Teste todas as habilidades aprendidas",
          type: "challenge",
          category: "general",
          difficulty: 5,
          duration: 30,
          content: "<p>Este é o desafio final da jornada...</p>",
          order: 1,
        },
      ],
    },
  ],
};

export default function JornadaPage() {
  const [selectedLesson, setSelectedLesson] = useState<{
    level: Level;
    lesson: Lesson;
  } | null>(null);

  const handleLessonClick = (levelId: number, lessonId: string) => {
    const level = mockJourney.levels.find((l) => l.id === levelId);
    if (level) {
      const lesson = level.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        setSelectedLesson({ level, lesson });
      }
    }
  };

  const handleLessonComplete = (lessonId: string) => {
    // Atualizar estado da lição como completa
    // Aqui você faria a chamada à API
    console.log("Lição completa:", lessonId);
  };

  if (selectedLesson) {
    return (
      <LessonDetail
        lesson={selectedLesson.lesson}
        levelId={selectedLesson.level.id}
        onBack={() => setSelectedLesson(null)}
        onComplete={handleLessonComplete}
      />
    );
  }

  return (
    <JourneyView
      journey={mockJourney}
      onLessonClick={handleLessonClick}
    />
  );
}

