## 📱 Sobre o Projeto

**Nome**: Wise Dog Pro  
**Tipo**: Aplicativo Mobile (iOS + Android)  
**Plataforma**: React Native (Expo)  
**Objetivo**: App profissional de adestramento de cães com IA integrada

---

## 🎯 Visão do Produto

O Wise Dog Pro é um aplicativo de adestramento canino que combina:
- **Jornada personalizada** de treino gerada por IA (50-60 lições/ano)
- **Chat com IA** especializada em cães 24/7 (OpenAI GPT-4 - Mini ou Nano)
- **Ferramentas profissionais** (clicker, apito, timer)
- **Calendário de saúde** e atividades
- **Gamificação** e sistema de badges
- **Modelo Freemium** com assinatura Premium

**Diferenciais competitivos**:
1. Chat IA 24/7 (nenhum concorrente tem)
2. Jornada 100% personalizada gerada por IA (nenhum concorrente tem)

---

## 🏗️ Arquitetura Técnica

### Stack Principal
```
- React Native (Expo SDK 50+)
- TypeScript
- React Navigation 6
- Firebase (Auth, Firestore, Cloud Messaging)
- RevenueCat (Monetização)
- OpenAI API (Chat IA + Geração de Jornada)
- AsyncStorage (Persistência local)
```

### Estrutura de Pastas
```
/wise-dog-pro
├── /src
│   ├── /screens          # Telas do app
│   │   ├── /onboarding   # Splash, Onboarding, Quiz
│   │   ├── /auth         # Login, Cadastro
│   │   ├── /home         # Dashboard
│   │   ├── /training     # Lições e treinos
│   │   ├── /chat         # Chat IA
│   │   ├── /health       # Calendário de saúde
│   │   └── /profile      # Perfil e configurações
│   ├── /components       # Componentes reutilizáveis
│   │   ├── /common       # Button, Input, Card, etc.
│   │   ├── /training     # LessonCard, ProgressBar, etc.
│   │   ├── /lessons      # Componentes para cada tipo de lição
│   │   └── /health       # EventCard, Calendar, etc.
│   ├── /navigation       # Configuração de navegação
│   ├── /services         # APIs e integrações
│   │   ├── firebase.ts
│   │   ├── openai.ts
│   │   ├── journeyGenerator.ts
│   │   ├── revenuecat.ts
│   │   └── notifications.ts
│   ├── /hooks            # Custom hooks
│   ├── /context          # Context API (User, Pet, Subscription)
│   ├── /utils            # Funções auxiliares
│   ├── /constants        # Cores, fontes, configurações
│   ├── /types            # TypeScript types
│   └── /assets           # Imagens, ícones, fontes
├── /ios                  # Configurações iOS
├── /android              # Configurações Android
├── app.json              # Configuração Expo
├── package.json
└── tsconfig.json
```

---

## 🎨 Design System

### Cores
#### PRIMÁRIAS:
- Verde Main: #1C8C58 (botões, destaques)
- Verde Light: #5BA67B (hover, backgrounds)
- Verde Dark: #156B43 (texto, bordas)
- Amarelo #FBBF24
- Peach #FB923C
- Cream #FED7AA
- Laranja Main: #F97316 (CTAs secundárias)
- Neutro: Cream #FED7AA (backgrounds suaves)
- Branco: #FFFFFF (cards, backgrounds)
- Cinza: #6B7280 (texto secundário)
- Preto: #1F2937 (texto principal)

#### BACKGROUNDS:
- Branco: #FFFFFF
- Bege Claro: #F8F4EB (fundo padrão)
- Bege Sutil: #F8EBDD (áreas elevadas)

#### TEXTO:
- Escuro: #2D2E29 (headlines)
- Cinza Médio: #6B7280 (secundário)
- Cinza Claro: #9CA3AF (terciário)

#### BORDAS/TERRA:
- Light: #D4C4A8
- Medium: #B8A082
- Dark: #8B7355
- Earth: #C9B99B


### Tipografia
```typescript
const fonts = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};

const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};
```

### Espaçamento
```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

---

## 📋 Funcionalidades Principais

### 1. Onboarding e Personalização
- Splash screen com logo
- Onboarding (4 slides)
- **Quiz de personalização** (8 perguntas) - coleta dados para gerar jornada
- Cadastro de pet (nome, raça, idade, foto)
- **Geração de jornada personalizada** (IA analisa quiz e cria 50-60 lições)
- Paywall com trial de 7 dias

### 2. Jornada de Treino Personalizada

**Abordagem Híbrida**:
- **21 lições base** criadas manualmente (qualidade garantida)
- **IA organiza** a ordem ideal baseada no quiz
- **IA gera 15-20 lições extras** personalizadas (Q&A, teoria, dicas)
- **Total**: 40-60 lições distribuídas em 52 semanas (1 ano)

**5 Tipos de Lições**:
1. **Practice** (60%) - Treino hands-on com passos detalhados
2. **Theory** (20%) - Conteúdo educativo para o tutor
3. **Q&A** (12%) - Perguntas e respostas sobre tópicos específicos
4. **Checkpoint** (6%) - Avaliação de progresso a cada 4 semanas
5. **Challenge** (2%) - Desafios práticos em situações reais

### 3. Chat IA
- Assistente 24/7 especializado em cães
- Integração com OpenAI GPT-4
- Permite envio de fotos
- Histórico de conversas salvo
- Limitação: 5 mensagens/dia (gratuito), ilimitado (Premium)

### 4. Calendário de Saúde
- Registro de eventos:
  - Vacinas
  - Consultas veterinárias
  - Medicamentos
  - Banho/tosa
  - Exames
- Lembretes automáticos
- Visualização em calendário mensal

### 5. Ferramentas Profissionais
- **Clicker Virtual**: Som de click para treino
- **Apito Virtual**: Frequências ajustáveis (1-22kHz)
- **Timer**: Cronômetro de sessões de treino

### 6. Gamificação
- Sistema de badges/conquistas
- Streak de dias consecutivos
- Progresso visual (barras, gráficos)
- Compartilhamento social

### 7. Monetização
- Modelo Freemium
- Trial de 7 dias grátis
- Planos:
  - Mensal: R$ 29,90/mês
  - Anual: R$ 149,90/ano (25% OFF no lançamento)
- Integração com RevenueCat

---

## 📚 Estrutura de Dados das Lições

### Estrutura Base (Comum a Todos os Tipos)

```typescript
interface BaseLesson {
  // Identificação
  id: string;                    // Ex: "basic-sit" ou "custom-golden-1"
  type: 'practice' | 'theory' | 'qa' | 'checkpoint' | 'challenge';
  
  // Categorização
  category: 'basic' | 'behavior' | 'tricks' | 'health' | 'nutrition' | 'general';
  
  // Informações Básicas
  title: string;
  description: string;
  
  // Metadados
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: number;              // minutos
  
  // Controle de Acesso
  isPremium: boolean;
  
  // Mídia
  coverImage?: string;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Origem
  source: 'manual' | 'ai';
  
  // Conteúdo Específico
  content: PracticeContent | TheoryContent | QAContent | CheckpointContent | ChallengeContent;
}
```

---

### 1. Lição PRACTICE (Prática)

Treino hands-on com passos detalhados.

```typescript
interface PracticeLesson extends BaseLesson {
  type: 'practice';
  content: PracticeContent;
}

interface PracticeContent {
  materials: string[];           // Ex: ["Petiscos", "Guia", "Local calmo"]
  steps: PracticeStep[];
  tips: string[];
  commonMistakes?: CommonMistake[];
  faqs: FAQ[];
  progressIndicators?: string[];
}

interface PracticeStep {
  id: string;
  order: number;
  title: string;
  description: string;           // Markdown
  duration: number;
  mediaUrl?: string;
  mediaType?: 'image' | 'gif' | 'video';
  mediaThumbnail?: string;
  tips?: string[];
}

interface CommonMistake {
  mistake: string;
  why: string;
  solution: string;
}

interface FAQ {
  question: string;
  answer: string;
}
```

**Exemplo**: "Comando: Sentar", "Parar de Pular nas Pessoas"

---

### 2. Lição THEORY (Teoria)

Conteúdo educativo para o tutor.

```typescript
interface TheoryLesson extends BaseLesson {
  type: 'theory';
  content: TheoryContent;
}

interface TheoryContent {
  sections: TheorySection[];
  summary: string;               // TL;DR
  keyTakeaways: string[];
  resources?: Resource[];
  quiz?: Quiz;
}

interface TheorySection {
  id: string;
  order: number;
  title: string;
  content: string;               // Markdown
  imageUrl?: string;
  videoUrl?: string;
  examples?: string[];
}

interface Resource {
  type: 'article' | 'video' | 'book' | 'study';
  title: string;
  url?: string;
  description?: string;
}

interface Quiz {
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];             // 4 opções
  correctAnswer: number;         // Índice (0-3)
  explanation: string;
}
```

**Exemplo**: "Reforço Positivo: A Base do Adestramento"

---

### 3. Lição Q&A (Perguntas & Respostas)

Dúvidas comuns sobre raça, idade, situações.

```typescript
interface QALesson extends BaseLesson {
  type: 'qa';
  content: QAContent;
}

interface QAContent {
  introduction: string;
  questions: QAItem[];
  conclusion?: string;
  relatedLessons?: string[];     // IDs de outras lições
}

interface QAItem {
  id: string;
  order: number;
  question: string;
  answer: string;                // Markdown
  imageUrl?: string;
  videoUrl?: string;
  tags?: string[];
}
```

**Exemplo**: "10 Dúvidas Comuns sobre Golden Retrievers"

---

### 4. Lição CHECKPOINT (Avaliação)

Avaliação de progresso a cada 4 semanas.

```typescript
interface CheckpointLesson extends BaseLesson {
  type: 'checkpoint';
  content: CheckpointContent;
}

interface CheckpointContent {
  introduction: string;
  evaluationCriteria: EvaluationItem[];
  instructions: string;
  resultInterpretation: ResultInterpretation;
}

interface EvaluationItem {
  id: string;
  order: number;
  skill: string;
  description: string;
  passCriteria: string;
  checklistItems: string[];
}

interface ResultInterpretation {
  excellent: {
    message: string;
    nextSteps: string[];
  };
  good: {
    message: string;
    nextSteps: string[];
  };
  needsWork: {
    message: string;
    nextSteps: string[];
  };
}
```

**Exemplo**: "Checkpoint Semana 4: Comandos Básicos"

---

### 5. Lição CHALLENGE (Desafio)

Exercícios práticos em situações reais.

```typescript
interface ChallengeLesson extends BaseLesson {
  type: 'challenge';
  content: ChallengeContent;
}

interface ChallengeContent {
  challengeDescription: string;
  prerequisites: string[];       // IDs de lições necessárias
  goal: string;
  steps: string[];
  successCriteria: string[];
  tips: string[];
  reward?: {
    badgeId: string;
    badgeName: string;
    badgeDescription: string;
  };
}
```

**Exemplo**: "Desafio: Passeio Perfeito de 15 Minutos"

---

## 🗂️ Estrutura no Firestore

```
/baseLessons/{lessonId}
  - Lições criadas manualmente (21 lições)
  - Estrutura: BaseLesson (qualquer tipo)

/generatedLessons/{lessonId}
  - Lições geradas por IA
  - Específicas para cada usuário
  - Estrutura: BaseLesson (qualquer tipo)

/journeys/{userId}
  - userId: string
  - petId: string
  - createdAt: timestamp
  - journey: Week[]
    - week: number
    - theme: string
    - lessons: JourneyLesson[]
      - type: 'base' | 'generated'
      - lessonId: string (se base)
      - id: string (se generated)
      - category: string
      - title: string
      - content: string (se generated)
      - dayOfWeek: 1-7
      - completed: boolean
      - completedAt: timestamp
  - totalLessons: number
  - estimatedCompletion: string

/progress/{userId}/lessons/{lessonId}
  - lessonId: string
  - userId: string
  - status: 'not_started' | 'in_progress' | 'completed'
  - completedSteps: string[]
  - totalSteps: number
  - startedAt: timestamp
  - completedAt: timestamp
  - timeSpent: number (segundos)
  - checklistCompleted: { [stepId: string]: boolean }
```

---

## 🤖 Geração de Jornada Personalizada

### Fluxo

1. **Usuário completa quiz** (8 perguntas)
2. **Usuário cadastra pet** (nome, raça, idade)
3. **IA gera jornada** (5-10 segundos)
   - Busca 21 lições base do Firestore
   - Analisa quiz e pet data
   - Organiza lições base na ordem ideal
   - Gera 15-20 lições extras personalizadas
   - Distribui em 52 semanas
4. **Salva jornada** no Firestore
5. **Usuário vê jornada** personalizada na Home

### Custo

- **Por usuário**: $0.15 (GPT-4-mini)
- **1.000 usuários**: $150/mês
- **Viável para MVP**: ✅ SIM

### Código de Geração

```typescript
// services/journeyGenerator.ts
import OpenAI from 'openai';
import firestore from '@react-native-firebase/firestore';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePersonalizedJourney = async (
  userId: string,
  quizAnswers: QuizAnswers,
  petData: PetData
) => {
  // 1. Buscar lições base
  const baseLessonsSnapshot = await firestore()
    .collection('baseLessons')
    .get();
  
  const baseLessons = baseLessonsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // 2. Criar prompt para IA
  const prompt = `
Crie uma jornada de treinamento personalizada de 1 ano para:

**Informações do Cão:**
- Nome: ${petData.name}
- Raça: ${petData.breed}
- Idade: ${petData.age}

**Contexto do Tutor:**
- Desafio principal: ${quizAnswers.mainChallenge}
- Objetivo: ${quizAnswers.goal}
- Tempo disponível: ${quizAnswers.timeAvailable}

**Lições Base Disponíveis:**
${baseLessons.map(l => `- ${l.id}: ${l.title}`).join('\n')}

**Tarefa:**
1. Organize as lições base na ordem ideal
2. Priorize lições que resolvem o desafio principal
3. Adicione 15-20 lições extras (Q&A, teoria, dicas)
4. Distribua em 52 semanas

**Formato JSON:**
{
  "journey": [
    {
      "week": 1,
      "theme": "Fundamentos",
      "lessons": [
        {
          "type": "base",
          "lessonId": "basic-sit",
          "dayOfWeek": 1,
          "notes": "..."
        },
        {
          "type": "generated",
          "id": "custom-1",
          "category": "qa",
          "title": "...",
          "content": "...",
          "dayOfWeek": 3
        }
      ]
    }
  ]
}
`;

  // 3. Chamar OpenAI
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Você é um especialista em adestramento canino.' },
      { role: 'user', content: prompt },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 8000,
    temperature: 0.7,
  });

  const journeyData = JSON.parse(response.choices[0].message.content);

  // 4. Salvar no Firestore
  await firestore()
    .collection('journeys')
    .doc(userId)
    .set({
      userId,
      petId: petData.id,
      createdAt: firestore.FieldValue.serverTimestamp(),
      journey: journeyData.journey,
      totalLessons: calculateTotalLessons(journeyData.journey),
    });

  return journeyData;
};
```

---

## 🔐 Autenticação e Dados

### Firebase Auth
- Email/senha (principal)
- Google Sign-In (opcional)
- Apple Sign-In (obrigatório iOS)

### Firestore Collections

```
/users/{userId}
  - email: string
  - createdAt: timestamp
  - subscriptionStatus: 'free' | 'trial' | 'premium'
  - subscriptionExpiry: timestamp

/pets/{petId}
  - userId: string
  - name: string
  - breed: string
  - birthDate: timestamp
  - sex: 'male' | 'female'
  - weight: number
  - photoUrl: string
  - neutered: boolean

/progress/{userId}
  - completedLessons: string[]
  - streak: number
  - lastTrainingDate: timestamp
  - badges: string[]
  - totalTrainingTime: number (minutes)

/healthEvents/{eventId}
  - petId: string
  - type: 'vaccine' | 'vet' | 'medication' | 'grooming' | 'exam'
  - title: string
  - date: timestamp
  - location: string
  - notes: string
  - reminderEnabled: boolean

/chatHistory/{userId}/messages/{messageId}
  - role: 'user' | 'assistant'
  - content: string
  - timestamp: timestamp
  - imageUrl: string (optional)
```

---

## 🤖 Integração OpenAI

### Chat IA

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
Você é um assistente especializado em cães, integrado ao app Wise Dog Pro.
Seu papel é ajudar tutores com:
- Dúvidas sobre adestramento e comportamento canino
- Questões de saúde (com disclaimer: não substitui veterinário)
- Recomendações de nutrição
- Análise de fotos (comportamento, sintomas visíveis)

Diretrizes:
- Seja amigável, encorajador e profissional
- Use linguagem clara e acessível
- Sempre reforce o uso de métodos positivos (nunca punição)
- Para questões graves de saúde, sempre recomende veterinário
- Cite o nome do cão quando possível (contexto fornecido)
- Respostas concisas (máximo 200 palavras)
`;
```

### Limitações
- Gratuito: 5 mensagens/dia
- Premium: Ilimitado
- Timeout: 30 segundos
- Max tokens: 500 (resposta)

---

## 📱 Navegação

### Stack Principal
```typescript
type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Quiz: undefined;
  PetRegistration: undefined;
  JourneyGeneration: { quizAnswers: QuizAnswers; petData: PetData };
  Paywall: { source?: string };
  MainTabs: undefined;
};
```

### Tab Navigator
```typescript
type MainTabParamList = {
  Home: undefined;
  Training: undefined;
  Chat: undefined;
  Health: undefined;
  Profile: undefined;
};
```

### Training Stack
```typescript
type TrainingStackParamList = {
  LessonLibrary: undefined;
  LessonDetail: { lessonId: string; lessonType: LessonType };
  LessonComplete: { lessonId: string; badgeUnlocked?: string };
};
```

---

## 🔔 Notificações

### Tipos de Notificações
1. **Treino Diário** (09:00)
   - "Hora de treinar com o [Nome do Pet]!"
2. **Streak em Risco** (20:00, se não treinou)
   - "Não perca seu streak de 7 dias! 🔥"
3. **Lembretes de Saúde**
   - "Vacina do [Pet] amanhã às 14:00"
4. **Badge Desbloqueado**
   - "Parabéns! Você desbloqueou o badge 'Mestre' 🏆"
5. **Inatividade** (após 2 dias)
   - "Sentimos sua falta! O [Pet] está esperando 🐾"

### Firebase Cloud Messaging
```typescript
import messaging from '@react-native-firebase/messaging';

// Request permission
await messaging().requestPermission();

// Get FCM token
const token = await messaging().getToken();

// Handle foreground messages
messaging().onMessage(async remoteMessage => {
  // Show in-app notification
});
```

---

## 💰 Monetização (RevenueCat)

### Configuração
```typescript
import Purchases from 'react-native-purchases';

// Initialize
await Purchases.configure({
  apiKey: 'YOUR_REVENUECAT_API_KEY',
});

// Check subscription status
const customerInfo = await Purchases.getCustomerInfo();
const isPremium = customerInfo.entitlements.active['premium'] !== undefined;

// Purchase
const offerings = await Purchases.getOfferings();
const product = offerings.current?.annual;
const { customerInfo } = await Purchases.purchasePackage(product);
```

### Entitlements
- **premium**: Acesso a todas as features Premium

### Products
- **monthly**: R$ 29,90/mês
- **annual**: R$ 149,90/ano

---

## 🧪 Testes

### Dados de Teste
```typescript
// Pet de teste
const testPet = {
  name: 'Thor',
  breed: 'Golden Retriever',
  birthDate: new Date('2022-01-15'),
  sex: 'male',
  weight: 30,
};

// Usuário de teste
const testUser = {
  email: 'teste@wisedog.pro',
  password: 'Test123!',
};

// Quiz de teste
const testQuizAnswers = {
  age: 'adult',
  mainChallenge: 'Puxa a guia no passeio',
  goal: 'Ensinar comandos básicos',
  timeAvailable: '10-20 minutos',
  previousExperience: 'Não, é minha primeira vez',
  livingSpace: 'Apartamento',
  otherPets: false,
};
```

### Cenários de Teste
1. Fluxo completo de onboarding
2. Geração de jornada personalizada
3. Completar uma lição (cada tipo)
4. Enviar mensagem no chat IA
5. Adicionar evento de saúde
6. Fazer upgrade para Premium
7. Receber notificação

---

## 🚀 Deployment

### iOS (App Store)
- Bundle ID: `com.wisedogpro.app`
- Versão mínima: iOS 13.0
- Certificados: Apple Developer Program

### Android (Google Play)
- Package name: `com.wisedogpro.app`
- Versão mínima: Android 6.0 (API 23)
- Keystore: Configurar para release

### Expo EAS Build
```bash
# Build iOS
eas build --platform ios --profile production

# Build Android
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

## 📝 Convenções de Código

### Naming
- **Componentes**: PascalCase (`LessonCard.tsx`)
- **Funções**: camelCase (`fetchLessons()`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`interface User {}`)

### Estrutura de Componente
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### Imports
```typescript
// 1. React e React Native
import React from 'react';
import { View, Text } from 'react-native';

// 2. Bibliotecas externas
import { useNavigation } from '@react-navigation/native';

// 3. Componentes locais
import { Button } from '@/components/common';

// 4. Utils e constants
import { colors } from '@/constants/colors';
import { formatDate } from '@/utils/date';

// 5. Types
import type { Lesson } from '@/types/lesson';
```

---

## 🐛 Debugging

### Logs
```typescript
// Use console.log com prefixo
console.log('[WiseDogPro] User logged in:', userId);
console.error('[WiseDogPro] Error fetching lessons:', error);
```

### React Native Debugger
- Instalar: https://github.com/jhen0409/react-native-debugger
- Usar Redux DevTools (se implementar Redux)

### Flipper (Recomendado)
- Network inspector
- AsyncStorage viewer
- Crash reporter

---

## 🔒 Segurança

### API Keys
```typescript
// Nunca commitar API keys no código
// Usar variáveis de ambiente (.env)

OPENAI_API_KEY=sk-...
FIREBASE_API_KEY=AIza...
REVENUECAT_API_KEY=...
```

### Validações
- Sempre validar inputs do usuário
- Sanitizar dados antes de enviar para APIs
- Usar HTTPS para todas as requisições
- Validar schema de lições geradas por IA (Zod ou Yup)

---

## 📚 Recursos Úteis

### Documentação
- React Native: https://reactnative.dev/
- Expo: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/
- Firebase: https://rnfirebase.io/
- RevenueCat: https://docs.revenuecat.com/
- OpenAI: https://platform.openai.com/docs/

### Comunidade
- Discord: React Native Community
- Stack Overflow: `react-native` tag
- Reddit: r/reactnative

---

## 🎯 Próximos Passos (Roadmap)

### V1.0 (MVP - 8 semanas)
- ✅ Onboarding e personalização
- ✅ Quiz de 8 perguntas
- ✅ Geração de jornada personalizada com IA
- ✅ 21 lições base (5 tipos)
- ✅ Chat IA
- ✅ Calendário de saúde
- ✅ Ferramentas (clicker, apito, timer)
- ✅ Gamificação básica
- ✅ Monetização (Freemium)

### V1.1 (Pós-lançamento)
- [ ] Identificação de raça com IA
- [ ] Cadastro de múltiplos pets
- [ ] Registro de atividades diárias
- [ ] Timeline de lembranças com fotos
- [ ] Modo offline
- [ ] Compartilhamento social avançado

### V2.0 (Futuro)
- [ ] Comunidade de usuários
- [ ] Desafios semanais
- [ ] Integração com wearables (coleira inteligente)
- [ ] Consultas com veterinários (marketplace)
- [ ] Expansão para gatos (Wise Cat Pro)

---

## 💡 Dicas para IAs Assistentes

### Ao gerar código:
1. **Use TypeScript**: Sempre tipar props, states, funções
2. **Siga o Design System**: Use cores, fontes e espaçamentos definidos
3. **Componentes reutilizáveis**: Evite duplicação de código
4. **Acessibilidade**: Adicione `accessibilityLabel` em botões/touchables
5. **Performance**: Use `React.memo`, `useMemo`, `useCallback` quando necessário
6. **Error handling**: Sempre trate erros (try/catch, error boundaries)
7. **Loading states**: Mostre loading durante operações assíncronas
8. **Validação**: Valide inputs antes de enviar para APIs
9. **Tipos de lições**: Considere os 5 tipos (Practice, Theory, Q&A, Checkpoint, Challenge)
10. **Jornada personalizada**: Lembre-se que cada usuário tem uma jornada única

### Ao responder dúvidas:
1. **Contextualize**: Considere a arquitetura do Wise Dog Pro
2. **Seja específico**: Forneça código pronto para usar
3. **Explique**: Comente trechos importantes do código
4. **Alternativas**: Sugira diferentes abordagens quando relevante
5. **Boas práticas**: Sempre recomende a melhor solução
6. **Estrutura de lições**: Sempre siga as estruturas TypeScript definidas

### Ao criar lições:
1. **Siga a estrutura**: Use exatamente as interfaces TypeScript definidas
2. **Markdown**: Use markdown em campos de texto longo
3. **Personalização**: Adapte para raça, idade e objetivos do cão
4. **Linguagem**: Clara, encorajadora e profissional
5. **Validação**: Garanta que todos os campos obrigatórios estejam preenchidos

---

## 📞 Contato

**Desenvolvedor**: [Seu Nome]  
**Email**: dev@wisedog.pro  
**Versão do Documento**: 2.0.0  
**Última Atualização**: 16 de Novembro de 2025

---

**Nota para IAs**: Este documento contém TODO o contexto necessário para auxiliar no desenvolvimento do Wise Dog Pro. Use-o como referência principal para gerar código, responder dúvidas e sugerir melhorias. Sempre priorize a consistência com a arquitetura, design system e estruturas de dados definidas aqui.

**Importante**: O Wise Dog Pro usa uma **abordagem híbrida** para lições: 21 lições base manuais + lições geradas por IA. Sempre considere os **5 tipos de lições** (Practice, Theory, Q&A, Checkpoint, Challenge) ao gerar código ou sugerir features.
