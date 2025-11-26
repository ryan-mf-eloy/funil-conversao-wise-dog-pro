// Tipos para a Jornada de Treinamento

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'practice' | 'theory' | 'qa' | 'checkpoint' | 'challenge';
  category: 'basic' | 'behavior' | 'tricks' | 'health' | 'nutrition' | 'general';
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: number; // minutos
  illustration?: string;
  videoUrl?: string;
  content: string; // Markdown ou texto explicativo
  order: number; // Ordem dentro do nível
  completed?: boolean;
  completedAt?: Date;
}

export interface Level {
  id: number; // 1 a 7
  title: string;
  description: string;
  theme: 'home' | 'park' | 'house' | 'garden' | 'street' | 'beach' | 'forest';
  backgroundColor: string;
  backgroundImage?: string;
  lessons: Lesson[];
  completed?: boolean;
  completedAt?: Date;
}

export interface Journey {
  id: string;
  userId: string;
  petId: string;
  petName: string;
  levels: Level[];
  totalLessons: number;
  completedLessons: number;
  createdAt: Date;
  updatedAt: Date;
}

