import type { FAQItem, Stat, Benefit, Step, Review, Feature, Plan } from "@/types";
import { DOG_BREEDS } from "./dogBreeds";

export const FAQ_DATA: FAQItem[] = [
  {
    q: "Quanto custa Wise Dog Pro? Preciso pagar para começar?",
    a: "Não, você começa com 7 dias grátis, sem cartão de crédito. Depois, escolha entre:",
    details: [
      "R$ 29,90/mês (flexível, cancele quando quiser)",
      "R$ 199,90/ano (economize 45%, R$ 16,66/mês)",
    ],
    extra:
      "Se não gostar nos primeiros 7 dias, cancele gratuitamente. Nenhuma cobrança.",
    note: "Você recebe um email 1 dia antes do trial expirar, lembrando sobre a renovação. Assim, não há surpresas.",
  },
  {
    q: "E se não gostar? Posso cancelar sem multa?",
    a: "Sim, 100% sem complicação. Você cancela em 2 cliques dentro do app:",
    details: [
      "Vá para Configurações → Assinatura → Cancelar",
      "Pronto, sua assinatura encerra no final do período pago",
    ],
    extra: "Sem multa, sem atendimento ao cliente, sem perguntas.",
    note: "Se cancelar antes de 30 dias, devolvemos 100% do seu dinheiro. Garantia total.",
  },
  {
    q: "Como a IA sabe o que meu cão precisa? Não é só um treinamento genérico?",
    a: "Não é genérico. A IA faz um quiz detalhado (10 perguntas) sobre seu cão:",
    details: [
      "Foto, nome, sexo, aniversário, raça",
      "Saúde (alergias, artrite, ansiedade)",
      "Personalidade (dócil, energético, tímido)",
      "Desafio principal (não obedece, pula, puxa coleira)",
      "Tempo disponível para treinar",
    ],
    extra:
      "Com essas informações, a IA gera uma jornada 100% personalizada em segundos. Cada cão recebe um plano diferente.",
    note: "As lições também adaptam conforme seu cão progride. Se Max aprende rápido, a IA aumenta a dificuldade. Se Luna aprende devagar, a IA repete mais. É como ter um treinador particular.",
  },
  {
    q: "Meu cão é muito velho/filhote/agressivo/tímido. Funciona para ele?",
    a: "Sim! A IA se adapta a:",
    details: [
      "Todas as idades: Filhotes (até 3 meses), adultos e sênior (10+ anos)",
      "Todas as raças: Pequenas, médias, grandes, gigantes e SRD",
      "Todos os níveis: Nunca treinou, já treinou, precisa reaprender",
      "Todos os desafios: Agressividade, ansiedade, medo, hiperatividade, desobediência",
    ],
    extra:
      "A IA leva em conta as limitações do seu cão (artrite, cegueira, surdez) e adapta as lições.",
    note: "Se seu cão tem condição médica séria, recomendamos consultar um veterinário primeiro. Mas Wise Dog Pro funciona como complemento ao tratamento.",
  },
  {
    q: "Preciso de WiFi/internet para treinar? E se sair de casa?",
    a: "Parcialmente. As lições funcionam offline:",
    details: [
      "Você baixa a lição no app",
      "Treina sem internet (no parque, na rua, em casa)",
      "Seu progresso é salvo localmente",
    ],
    extra:
      "Mas o Chat IA precisa de internet (para respostas em tempo real). E a Comunidade também (para compartilhar progresso).",
    note: "Recomendamos ter internet ao menos 1x por dia para sincronizar dados e receber notificações de novas lições.",
  },
  {
    q: "Meu cão vai melhorar rápido? Quanto tempo leva?",
    a: "Depende do desafio e do cão, mas a maioria vê resultados em:",
    details: [
      "1-2 semanas: Mudanças de comportamento (menos latido, menos pulos)",
      "2-4 semanas: Obediência melhor (senta, fica, vem)",
      "4-8 semanas: Transformação completa (cão mais calmo, focado, feliz)",
    ],
    extra: "Tutores relatam melhora em média 2-3 semanas.",
    note: "Consistência é chave. Treinar 15-30 min/dia funciona melhor que 1 hora 1x por semana. A IA adapta as lições ao tempo que você tem disponível.",
  },
  {
    q: "O Chat IA responde de verdade ou é um bot que não entende?",
    a: "É um especialista IA real, treinado em comportamento canino, nutrição e saúde. Você pode perguntar:",
    details: [
      "'Por que meu cão come grama?'",
      "'Qual é a melhor alimentação para Luna?'",
      "'Meu cão está com diareia, o que fazer?'",
      "'Como socializar meu filhote?'",
    ],
    extra:
      "A IA responde em segundos com informações específicas, não genéricas. E aprende com suas perguntas.",
    note: "Se a pergunta é muito séria (suspeita de envenenamento, convulsão), a IA recomenda ir ao veterinário. Não substitui veterinário, mas é um suporte 24/7.",
  },
  {
    q: "Tem gente na comunidade? Ou vou estar sozinho?",
    a: "Sim, comunidade muito ativa! Temos:",
    details: [
      "50K+ tutores usando Wise Dog Pro",
      "Grupos por raça/desafio (ex: 'Agressividade', 'Filhotes', 'Labradores')",
      "Desafios semanais (ex: 'Semana do Sit', 'Semana da Socialização')",
      "Compartilhamento de vídeos de progresso (muito motivador!)",
      "Suporte entre tutores (dicas, experiências, apoio)",
    ],
    extra:
      "Você nunca está sozinho. Sempre tem alguém com o mesmo desafio que você.",
    note: "Moderadores garantem um ambiente seguro e respeitoso. Sem spam, sem venda de produtos, só tutores ajudando tutores.",
  },
  {
    q: "Meu cão tem artrite/ansiedade/outro problema. Posso treinar?",
    a: "Sim, com adaptações. A IA leva em conta:",
    details: [
      "Artrite: Lições com menos impacto, mais alongamento",
      "Ansiedade: Treinamento focado em calma, menos estímulo",
      "Cegueira/Surdez: Lições usando outros sentidos",
      "Agressividade: Técnicas seguras de dessensibilização",
    ],
    extra: "Você informa na quiz inicial, e a IA adapta tudo.",
    note: "Recomendamos sempre consultar seu veterinário antes de começar um novo programa de treinamento. Wise Dog Pro é complemento, não substitui cuidado médico.",
  },
  {
    q: "Vocês têm garantia? E se não funcionar?",
    a: "Sim, garantia de 30 dias de devolução do dinheiro!",
    details: [
      "1. Envie um email para suporte@wisedog.pro",
      "2. Conte o que tentou e qual foi o resultado",
      "3. Devolvemos 100% do seu dinheiro, sem perguntas",
    ],
    extra: "Nenhuma burocracia, nenhuma justificativa complicada.",
    note: "Mas sabemos que funciona. 94% dos tutores que completam o quiz e fazem as lições veem progresso. A maioria continua assinante.",
  },
];

export const STATS: Stat[] = [
  { number: "50K+", label: "Cães Treinando" },
  { number: "4.8/5", label: "Avaliação" },
  { number: "10K+", label: "Lições Geradas" },
  { number: "2.5K+", label: "Tutores Felizes" },
];

export const BENEFITS: Benefit[] = [
  {
    emoji: "🤖",
    title: "IA 100% Personalizada",
    desc: "Não é genérico. Sua jornada é única para seu cão, baseada em quiz detalhado",
    tag: "Lições que se adaptam",
  },
  {
    emoji: "💬",
    title: "Chat Especialista 24/7",
    desc: "Dúvidas sobre saúde, nutrição, comportamento? IA responde na hora",
    tag: "Respostas em segundos",
  },
  {
    emoji: "👥",
    title: "Comunidade Ativa",
    desc: "Compartilhe progresso, celebre vitórias e aprenda com outros tutores",
    tag: "Suporte real",
  },
];

export const STEPS: Step[] = [
  {
    num: "1",
    emoji: "📋",
    title: "Responda o Quiz",
    time: "5 min",
    desc: "10 perguntas sobre seu cão",
  },
  {
    num: "2",
    emoji: "✨",
    title: "IA Gera Jornada",
    time: "Instantâneo",
    desc: "Plano 100% personalizado",
  },
  {
    num: "3",
    emoji: "🎯",
    title: "Comece a Treinar",
    time: "Hoje",
    desc: "Lições diárias e progresso",
  },
  {
    num: "4",
    emoji: "🏆",
    title: "Veja Resultados",
    time: "2-4 semanas",
    desc: "Seu cão melhora",
  },
];

export const REVIEWS: Review[] = [
  {
    emoji: "🐕",
    name: "Maria Silva",
    location: "São Paulo, SP",
    text: "Meu Max era agressivo com outros cães. Em 2 semanas com Wise Dog Pro, melhorou 100%! A IA entendeu exatamente o que ele precisava.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    role: "Tutora de Max",
  },
  {
    emoji: "🐶",
    name: "João Santos",
    location: "Rio de Janeiro, RJ",
    text: "Chat IA é incrível! Perguntei sobre alergia da Luna e recebi resposta detalhada em 30 segundos. Melhor que veterinário online.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    role: "Tutor de Luna",
  },
  {
    emoji: "🦮",
    name: "Ana Costa",
    location: "Belo Horizonte, MG",
    text: "Comunidade é tão supportiva! Compartilhei progresso do Rex e recebi dicas de outros tutores. Sinto que não estou sozinha.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    role: "Tutora de Rex",
  },
  {
    emoji: "🐩",
    name: "Carlos Mendes",
    location: "Curitiba, PR",
    text: "A jornada personalizada mudou tudo! Meu cão aprendeu comandos básicos em 3 semanas. Interface intuitiva e lições claras.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    role: "Tutor de Thor",
  },
  {
    emoji: "🐕",
    name: "Patricia Lima",
    location: "Porto Alegre, RS",
    text: "O sistema de badges e gamificação motiva muito! Meu filho adora ver o progresso do nosso cão. App muito bem feito!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
    role: "Tutora de Bela",
  },
  {
    emoji: "🐶",
    name: "Roberto Alves",
    location: "Brasília, DF",
    text: "Suporte excepcional! Tive dúvidas sobre treinamento e a equipe respondeu rapidamente. Vale cada centavo investido.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    role: "Tutor de Spike",
  },
  {
    emoji: "🦮",
    name: "Fernanda Souza",
    location: "Salvador, BA",
    text: "Minha cadelinha tinha medo de fogos. Com as lições personalizadas, ela superou o medo em 1 mês. Incrível!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    role: "Tutora de Mel",
  },
  {
    emoji: "🐩",
    name: "Lucas Ferreira",
    location: "Recife, PE",
    text: "A IA realmente entende o comportamento do meu cão. As lições se adaptam conforme ele progride. Tecnologia de ponta!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    role: "Tutor de Zeus",
  },
  {
    emoji: "🐕",
    name: "Juliana Rocha",
    location: "Fortaleza, CE",
    text: "Recomendo para todos os tutores! O app é completo, fácil de usar e os resultados aparecem rápido. Meu cão está muito mais obediente.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces",
    role: "Tutora de Nina",
  },
];

export const FEATURES: Feature[] = [
  {
    icon: "🎯",
    title: "Jornada Personalizada",
    desc: "Lições adaptadas ao seu cão",
  },
  {
    icon: "💬",
    title: "Chat 24/7",
    desc: "Especialista IA sempre disponível",
  },
  {
    icon: "🏅",
    title: "Gamificação",
    desc: "Streaks, badges e progresso visual",
  },
  {
    icon: "🛠️",
    title: "Ferramentas",
    desc: "Clicker, apito, timer integrados",
  },
  {
    icon: "📍",
    title: "GPS Caminhadas",
    desc: "Rastreie distância e calorias",
  },
  {
    icon: "👥",
    title: "Comunidade",
    desc: "Conecte com outros tutores",
  },
];

export const PLANS: Plan[] = [
  {
    name: "Mensal",
    price: "R$ 29,90",
    period: "/mês",
    features: [
      "IA Personalizada",
      "Chat 24/7",
      "Comunidade",
      "Suporte por email",
    ],
  },
  {
    name: "Anual",
    price: "R$ 199,90",
    period: "/ano",
    pricePerMonth: "(R$ 16,66/mês)",
    features: [
      "IA Personalizada",
      "Chat 24/7",
      "Comunidade",
      "Suporte por email",
      "Acesso antecipado a novas features",
    ],
    badge: "Economize 45%",
    highlighted: true,
  },
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    type: "photo",
    title: "Tire uma foto do seu cão",
    placeholder: "Tire uma foto do seu cão ou faça upload",
  },
  {
    id: 2,
    type: "text",
    title: "Qual é o nome do seu cão?",
    placeholder: "Ex: Max, Luna, Rex...",
  },
  {
    id: 3,
    type: "radio",
    title: "Qual é o sexo do seu cão?",
    options: ["Macho", "Fêmea"],
  },
  {
    id: 4,
    type: "date",
    title: "Quando é o aniversário do seu cão?",
  },
  {
    id: 5,
    type: "select",
    title: "Qual é a raça do seu cão?",
    options: DOG_BREEDS,
  },
  {
    id: 6,
    type: "health",
    title: "Seu cão tem algum problema de saúde?",
    options: ["Nenhum problema", "Alergia", "Artrite", "Ansiedade", "Diabetes", "Displasia de quadril", "Problemas cardíacos", "Epilepsia", "Hipotiroidismo", "Obesidade", "Outro"],
  },
  {
    id: 7,
    type: "checkbox",
    title: "Como você descreveria a personalidade do seu cão?",
    options: ["Dócil", "Energético", "Tímido", "Agressivo", "Carinhoso", "Independente", "Brincalhão", "Calmo", "Protetor", "Sociável", "Teimoso", "Curioso", "Destemido", "Apegado"],
  },
  {
    id: 8,
    type: "textarea",
    title: "Há algo mais que devemos saber sobre seu cão?",
    placeholder: "Ex: Meu cão tem medo de fogos de artifício, é reativo com outros cães...",
  },
  {
    id: 9,
    type: "challenge",
    title: "Quais são os principais desafios com seu cão?",
    options: ["Não obedece", "Pula nas pessoas", "Puxa a coleira", "Latido excessivo", "Agressividade", "Ansiedade", "Destrutividade", "Fuga", "Medo", "Hiperatividade"],
  },
  {
    id: 10,
    type: "radio",
    title: "Quanto tempo você tem por dia para treinar?",
    options: ["15 min/dia", "30 min/dia", "1 hora/dia", "2+ horas/dia"],
  },
  {
    id: 11,
    type: "housing",
    title: "Qual é o espaço de convivência do seu cão?",
    options: ["Apartamento pequeno", "Apartamento médio/grande", "Casa com quintal pequeno", "Casa com quintal grande", "Sítio/Fazenda"],
  },
  {
    id: 12,
    type: "radio",
    title: "Existem outras pessoas no local?",
    options: ["Sim, família com crianças", "Sim, família sem crianças", "Sim, outros adultos", "Não, moro sozinho(a)"],
  },
];

