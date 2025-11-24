"use client";

import { useState } from "react";

export default function WiseDogPro() {
  const [currentSection, setCurrentSection] = useState<"landing" | "onboarding" | "quiz" | "paywall" | "confirmation">("landing");
  const [onboardingSlide, setOnboardingSlide] = useState(1);
  const [quizQuestion, setQuizQuestion] = useState(1);
  const [quizData, setQuizData] = useState<any>({});
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Navegação
  const navigateTo = (section: typeof currentSection) => {
    setCurrentSection(section);
    window.scrollTo(0, 0);
    if (section === "onboarding") setOnboardingSlide(1);
    if (section === "quiz") setQuizQuestion(1);
  };

  // FAQ Toggle
  const toggleFAQ = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  // Onboarding
  const nextOnboardingSlide = () => {
    if (onboardingSlide < 3) setOnboardingSlide(onboardingSlide + 1);
  };

  // Quiz
  const nextQuestion = () => {
    if (quizQuestion < 10) setQuizQuestion(quizQuestion + 1);
  };

  const prevQuestion = () => {
    if (quizQuestion > 1) setQuizQuestion(quizQuestion - 1);
  };

  const updateQuizData = (key: string, value: any) => {
    setQuizData({ ...quizData, [key]: value });
  };

  const finishQuiz = () => {
    navigateTo("paywall");
  };

  const selectPlan = (plan: string) => {
    setQuizData({ ...quizData, plan });
    navigateTo("confirmation");
  };

  // FAQ Data - Novo conteúdo completo
  const faqData = [
    {
      q: "Quanto custa Wise Dog Pro? Preciso pagar para começar?",
      a: "Não, você começa com 7 dias grátis, sem cartão de crédito. Depois, escolha entre:",
      details: [
        "R$ 29,90/mês (flexível, cancele quando quiser)",
        "R$ 199,90/ano (economize 45%, R$ 16,66/mês)"
      ],
      extra: "Se não gostar nos primeiros 7 dias, cancele gratuitamente. Nenhuma cobrança.",
      note: "Você recebe um email 1 dia antes do trial expirar, lembrando sobre a renovação. Assim, não há surpresas."
    },
    {
      q: "E se não gostar? Posso cancelar sem multa?",
      a: "Sim, 100% sem complicação. Você cancela em 2 cliques dentro do app:",
      details: [
        "Vá para Configurações → Assinatura → Cancelar",
        "Pronto, sua assinatura encerra no final do período pago"
      ],
      extra: "Sem multa, sem atendimento ao cliente, sem perguntas.",
      note: "Se cancelar antes de 30 dias, devolvemos 100% do seu dinheiro. Garantia total."
    },
    {
      q: "Como a IA sabe o que meu cão precisa? Não é só um treinamento genérico?",
      a: "Não é genérico. A IA faz um quiz detalhado (10 perguntas) sobre seu cão:",
      details: [
        "Foto, nome, sexo, aniversário, raça",
        "Saúde (alergias, artrite, ansiedade)",
        "Personalidade (dócil, energético, tímido)",
        "Desafio principal (não obedece, pula, puxa coleira)",
        "Tempo disponível para treinar"
      ],
      extra: "Com essas informações, a IA gera uma jornada 100% personalizada em segundos. Cada cão recebe um plano diferente.",
      note: "As lições também adaptam conforme seu cão progride. Se Max aprende rápido, a IA aumenta a dificuldade. Se Luna aprende devagar, a IA repete mais. É como ter um treinador particular."
    },
    {
      q: "Meu cão é muito velho/filhote/agressivo/tímido. Funciona para ele?",
      a: "Sim! A IA se adapta a:",
      details: [
        "Todas as idades: Filhotes (até 3 meses), adultos e sênior (10+ anos)",
        "Todas as raças: Pequenas, médias, grandes, gigantes e SRD",
        "Todos os níveis: Nunca treinou, já treinou, precisa reaprender",
        "Todos os desafios: Agressividade, ansiedade, medo, hiperatividade, desobediência"
      ],
      extra: "A IA leva em conta as limitações do seu cão (artrite, cegueira, surdez) e adapta as lições.",
      note: "Se seu cão tem condição médica séria, recomendamos consultar um veterinário primeiro. Mas Wise Dog Pro funciona como complemento ao tratamento."
    },
    {
      q: "Preciso de WiFi/internet para treinar? E se sair de casa?",
      a: "Parcialmente. As lições funcionam offline:",
      details: [
        "Você baixa a lição no app",
        "Treina sem internet (no parque, na rua, em casa)",
        "Seu progresso é salvo localmente"
      ],
      extra: "Mas o Chat IA precisa de internet (para respostas em tempo real). E a Comunidade também (para compartilhar progresso).",
      note: "Recomendamos ter internet ao menos 1x por dia para sincronizar dados e receber notificações de novas lições."
    },
    {
      q: "Meu cão vai melhorar rápido? Quanto tempo leva?",
      a: "Depende do desafio e do cão, mas a maioria vê resultados em:",
      details: [
        "1-2 semanas: Mudanças de comportamento (menos latido, menos pulos)",
        "2-4 semanas: Obediência melhor (senta, fica, vem)",
        "4-8 semanas: Transformação completa (cão mais calmo, focado, feliz)"
      ],
      extra: "Tutores relatam melhora em média 2-3 semanas.",
      note: "Consistência é chave. Treinar 15-30 min/dia funciona melhor que 1 hora 1x por semana. A IA adapta as lições ao tempo que você tem disponível."
    },
    {
      q: "O Chat IA responde de verdade ou é um bot que não entende?",
      a: "É um especialista IA real, treinado em comportamento canino, nutrição e saúde. Você pode perguntar:",
      details: [
        "'Por que meu cão come grama?'",
        "'Qual é a melhor alimentação para Luna?'",
        "'Meu cão está com diareia, o que fazer?'",
        "'Como socializar meu filhote?'"
      ],
      extra: "A IA responde em segundos com informações específicas, não genéricas. E aprende com suas perguntas.",
      note: "Se a pergunta é muito séria (suspeita de envenenamento, convulsão), a IA recomenda ir ao veterinário. Não substitui veterinário, mas é um suporte 24/7."
    },
    {
      q: "Tem gente na comunidade? Ou vou estar sozinho?",
      a: "Sim, comunidade muito ativa! Temos:",
      details: [
        "50K+ tutores usando Wise Dog Pro",
        "Grupos por raça/desafio (ex: 'Agressividade', 'Filhotes', 'Labradores')",
        "Desafios semanais (ex: 'Semana do Sit', 'Semana da Socialização')",
        "Compartilhamento de vídeos de progresso (muito motivador!)",
        "Suporte entre tutores (dicas, experiências, apoio)"
      ],
      extra: "Você nunca está sozinho. Sempre tem alguém com o mesmo desafio que você.",
      note: "Moderadores garantem um ambiente seguro e respeitoso. Sem spam, sem venda de produtos, só tutores ajudando tutores."
    },
    {
      q: "Meu cão tem artrite/ansiedade/outro problema. Posso treinar?",
      a: "Sim, com adaptações. A IA leva em conta:",
      details: [
        "Artrite: Lições com menos impacto, mais alongamento",
        "Ansiedade: Treinamento focado em calma, menos estímulo",
        "Cegueira/Surdez: Lições usando outros sentidos",
        "Agressividade: Técnicas seguras de dessensibilização"
      ],
      extra: "Você informa na quiz inicial, e a IA adapta tudo.",
      note: "Recomendamos sempre consultar seu veterinário antes de começar um novo programa de treinamento. Wise Dog Pro é complemento, não substitui cuidado médico."
    },
    {
      q: "Vocês têm garantia? E se não funcionar?",
      a: "Sim, garantia de 30 dias de devolução do dinheiro!",
      details: [
        "1. Envie um email para suporte@wisedog.pro",
        "2. Conte o que tentou e qual foi o resultado",
        "3. Devolvemos 100% do seu dinheiro, sem perguntas"
      ],
      extra: "Nenhuma burocracia, nenhuma justificativa complicada.",
      note: "Mas sabemos que funciona. 94% dos tutores que completam o quiz e fazem as lições veem progresso. A maioria continua assinante."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* LANDING PAGE */}
      {currentSection === "landing" && (
        <div>
          {/* HEADER - Menu com cor amarela elegante e botão preto */}
          <header className="sticky top-0 z-50 bg-[#EFE988] backdrop-blur-md border-b border-[#E5E5E0]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-[#1C8C58] to-[#5BA67B] rounded-2xl flex items-center justify-center shadow-sm">
                  <span className="text-2xl">🐕</span>
                </div>
                <span className="text-xl font-bold text-[#000000] tracking-tight">Wise Dog Pro</span>
              </div>
              <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
                <a href="#blog" className="text-[#000000] hover:text-[#1C8C58] transition-colors">Blog</a>
                <a href="#sobre" className="text-[#000000] hover:text-[#1C8C58] transition-colors">Sobre Nós</a>
                <a href="/contato" className="text-[#000000] hover:text-[#1C8C58] transition-colors">Fale Conosco</a>
              </nav>
              <button
                onClick={() => navigateTo("quiz")}
                className="bg-[#000000] text-white px-7 py-2.5 rounded-full font-semibold text-sm hover:bg-[#1a1a1a] transition-all hover:scale-[1.02] shadow-sm"
              >
                Começar
              </button>
            </div>
          </header>

          {/* HERO SECTION - Minimalista com ilustração cartoon */}
          <section className="relative bg-gradient-to-b from-[#FAFAF9] to-[#F8F4EB] overflow-hidden">
            {/* Elementos decorativos sutis */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute top-20 left-10 w-96 h-96 bg-[#1C8C58] rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5BA67B] rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Texto */}
                <div className="text-center lg:text-left space-y-8">
                  <div className="inline-flex items-center gap-2 bg-[#1C8C58]/5 text-[#1C8C58] px-4 py-2 rounded-full text-sm font-semibold border border-[#1C8C58]/10">
                    <span className="w-2 h-2 bg-[#1C8C58] rounded-full animate-pulse"></span>
                    Powered by AI
                  </div>
                  
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#2D2E29] leading-[1.1] tracking-tight">
                    Transforme<br />
                    Seu Cão em um<br />
                    <span className="text-[#1C8C58]">Wise Dog</span>
                  </h1>
                  
                  <p className="text-xl text-[#6B7280] leading-relaxed max-w-xl">
                    Plano de treinamento 100% personalizado com IA, chat especialista 24/7 e comunidade apaixonada
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      onClick={() => navigateTo("quiz")}
                      className="group bg-[#1C8C58] text-white px-9 py-4 rounded-full text-lg font-bold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Começar Quiz Grátis
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-8 pt-4 justify-center lg:justify-start flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-3">
                        {['🐕', '🐶', '🦮', '🐩'].map((emoji, i) => (
                          <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1C8C58] to-[#5BA67B] border-3 border-white flex items-center justify-center shadow-sm">
                            <span className="text-lg">{emoji}</span>
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-[#6B7280] font-medium">50K+ cães</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => (
                          <span key={i} className="text-[#FBBF24] text-lg">★</span>
                        ))}
                      </div>
                      <span className="text-sm text-[#6B7280] font-medium">4.8/5</span>
                    </div>
                  </div>

                  <p className="text-sm text-[#9CA3AF] flex items-center gap-2 justify-center lg:justify-start">
                    <span className="text-[#1C8C58]">✓</span>
                    7 dias grátis • Sem cartão • Cancele quando quiser
                  </p>
                </div>

                {/* Ilustração Cartoon */}
                <div className="relative flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-md">
                    {/* Card principal com cachorro cartoon */}
                    <div className="relative bg-white rounded-[2.5rem] p-12 shadow-2xl border border-[#E5E5E0]">
                      {/* Cachorro cartoon grande */}
                      <div className="text-[10rem] leading-none text-center animate-[bounce_3s_ease-in-out_infinite]">
                        🐕
                      </div>
                      
                      {/* Mini cards flutuantes */}
                      <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-[#E5E5E0] animate-[float_3s_ease-in-out_infinite]">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">🎯</span>
                          <div>
                            <p className="text-xs text-[#9CA3AF] font-medium">Progresso</p>
                            <p className="text-lg font-bold text-[#1C8C58]">85%</p>
                          </div>
                        </div>
                      </div>

                      <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-[#E5E5E0] animate-[float_3s_ease-in-out_infinite_0.5s]">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">🏆</span>
                          <div>
                            <p className="text-xs text-[#9CA3AF] font-medium">Badges</p>
                            <p className="text-lg font-bold text-[#1C8C58]">12</p>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-1/2 -right-10 bg-white rounded-2xl p-4 shadow-xl border border-[#E5E5E0] animate-[float_3s_ease-in-out_infinite_1s]">
                        <span className="text-4xl">💬</span>
                      </div>
                    </div>

                    {/* Círculo decorativo de fundo */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-gradient-to-br from-[#1C8C58]/5 to-[#5BA67B]/5 rounded-full blur-3xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TRUST BADGES - Minimalista */}
          <section className="py-16 bg-white border-y border-[#E5E5E0]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
                {[
                  { number: "50K+", label: "Cães Treinando" },
                  { number: "4.8/5", label: "Avaliação" },
                  { number: "10K+", label: "Lições Geradas" },
                  { number: "2.5K+", label: "Tutores Felizes" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-bold text-[#1C8C58] mb-2">{stat.number}</div>
                    <p className="text-sm text-[#6B7280] font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BENEFITS - Cards minimalistas com ícones cartoon */}
          <section id="sobre" className="py-24 bg-[#FAFAF9]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#2D2E29] mb-4 tracking-tight">
                  Por Que Escolher<br />Wise Dog Pro?
                </h2>
                <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                  Tecnologia de ponta + expertise em comportamento canino
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    emoji: "🤖",
                    title: "IA 100% Personalizada",
                    desc: "Não é genérico. Sua jornada é única para seu cão, baseada em quiz detalhado",
                    tag: "Lições que se adaptam"
                  },
                  {
                    emoji: "💬",
                    title: "Chat Especialista 24/7",
                    desc: "Dúvidas sobre saúde, nutrição, comportamento? IA responde na hora",
                    tag: "Respostas em segundos"
                  },
                  {
                    emoji: "👥",
                    title: "Comunidade Ativa",
                    desc: "Compartilhe progresso, celebre vitórias e aprenda com outros tutores",
                    tag: "Suporte real"
                  }
                ].map((benefit, i) => (
                  <div key={i} className="group bg-white p-10 rounded-3xl border border-[#E5E5E0] hover:border-[#1C8C58]/20 hover:shadow-xl transition-all duration-300">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {benefit.emoji}
                    </div>
                    <h3 className="text-2xl font-bold text-[#2D2E29] mb-4">{benefit.title}</h3>
                    <p className="text-[#6B7280] mb-6 leading-relaxed">
                      {benefit.desc}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-[#1C8C58] font-semibold">
                      <span>{benefit.tag}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS - Timeline minimalista */}
          <section id="como-funciona" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#2D2E29] mb-4 tracking-tight">
                  Como Funciona<br />em 4 Passos
                </h2>
                <p className="text-lg text-[#6B7280]">Simples, rápido e eficaz</p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 relative">
                {/* Linha conectora */}
                <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#1C8C58]/20 to-transparent"></div>

                {[
                  { num: "1", emoji: "📋", title: "Responda o Quiz", time: "5 min", desc: "10 perguntas sobre seu cão" },
                  { num: "2", emoji: "✨", title: "IA Gera Jornada", time: "Instantâneo", desc: "Plano 100% personalizado" },
                  { num: "3", emoji: "🎯", title: "Comece a Treinar", time: "Hoje", desc: "Lições diárias e progresso" },
                  { num: "4", emoji: "🏆", title: "Veja Resultados", time: "2-4 semanas", desc: "Seu cão melhora" }
                ].map((step, i) => (
                  <div key={i} className="relative text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1C8C58] to-[#5BA67B] rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 shadow-lg relative z-10">
                      {step.num}
                    </div>
                    <div className="text-5xl mb-4">{step.emoji}</div>
                    <h3 className="text-xl font-bold text-[#2D2E29] mb-2">{step.title}</h3>
                    <p className="text-sm text-[#1C8C58] font-semibold mb-2">{step.time}</p>
                    <p className="text-sm text-[#6B7280]">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-16">
                <button
                  onClick={() => navigateTo("quiz")}
                  className="bg-[#1C8C58] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                >
                  Começar Agora Grátis
                </button>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS - Cards minimalistas */}
          <section id="reviews" className="py-24 bg-[#FAFAF9]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#2D2E29] mb-4 tracking-tight">
                  Tutores Amam<br />Wise Dog Pro
                </h2>
                <p className="text-lg text-[#6B7280]">Mais de 2.500 avaliações positivas</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    emoji: "🐕",
                    name: "Maria Silva",
                    location: "São Paulo, SP",
                    text: "Meu Max era agressivo com outros cães. Em 2 semanas com Wise Dog Pro, melhorou 100%! A IA entendeu exatamente o que ele precisava."
                  },
                  {
                    emoji: "🐶",
                    name: "João Santos",
                    location: "Rio de Janeiro, RJ",
                    text: "Chat IA é incrível! Perguntei sobre alergia da Luna e recebi resposta detalhada em 30 segundos. Melhor que veterinário online."
                  },
                  {
                    emoji: "🦮",
                    name: "Ana Costa",
                    location: "Belo Horizonte, MG",
                    text: "Comunidade é tão supportiva! Compartilhei progresso do Rex e recebi dicas de outros tutores. Sinto que não estou sozinha."
                  }
                ].map((review, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-[#E5E5E0] hover:shadow-xl transition-all">
                    <div className="flex gap-1 mb-6">
                      {[1,2,3,4,5].map(star => (
                        <span key={star} className="text-[#FBBF24] text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-[#2D2E29] mb-8 leading-relaxed">
                      &quot;{review.text}&quot;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#1C8C58] to-[#5BA67B] rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                        {review.emoji}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#2D2E29]">{review.name}</h4>
                        <p className="text-sm text-[#6B7280]">{review.location}</p>
                      </div>
                      <span className="bg-[#1C8C58]/5 text-[#1C8C58] text-xs px-3 py-1.5 rounded-full font-semibold border border-[#1C8C58]/10">
                        Verificado
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURES - Grid minimalista */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#2D2E29] mb-4 tracking-tight">
                  Tudo que Você Precisa
                </h2>
                <p className="text-lg text-[#6B7280]">Ferramentas completas para treinar seu cão</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "🎯", title: "Jornada Personalizada", desc: "Lições adaptadas ao seu cão" },
                  { icon: "💬", title: "Chat 24/7", desc: "Especialista IA sempre disponível" },
                  { icon: "🏅", title: "Gamificação", desc: "Streaks, badges e progresso visual" },
                  { icon: "🛠️", title: "Ferramentas", desc: "Clicker, apito, timer integrados" },
                  { icon: "📍", title: "GPS Caminhadas", desc: "Rastreie distância e calorias" },
                  { icon: "👥", title: "Comunidade", desc: "Conecte com outros tutores" },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-[#FAFAF9] rounded-2xl border border-[#E5E5E0] hover:bg-white hover:shadow-lg transition-all">
                    <div className="text-4xl">{feature.icon}</div>
                    <div>
                      <h3 className="font-bold text-[#2D2E29] mb-1">{feature.title}</h3>
                      <p className="text-sm text-[#6B7280]">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* APP STORES - Mantida conforme solicitado */}
          <section className="py-24 bg-gradient-to-br from-[#1C8C58] to-[#5BA67B]">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Baixe Agora em<br />Seu Dispositivo
              </h2>
              <p className="text-lg text-white/90 mb-12">Disponível em iOS e Android</p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {/* Botão iOS */}
                <a
                  href="#"
                  className="flex items-center gap-4 bg-black text-white px-8 py-5 rounded-2xl hover:bg-gray-900 transition-all hover:scale-[1.02] shadow-2xl min-w-[240px]"
                >
                  <span className="text-4xl">🍎</span>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Baixar na</div>
                    <div className="text-xl font-bold">App Store</div>
                  </div>
                </a>

                {/* Botão Android */}
                <a
                  href="#"
                  className="flex items-center gap-4 bg-white text-[#1C8C58] px-8 py-5 rounded-2xl hover:bg-gray-50 transition-all hover:scale-[1.02] shadow-2xl min-w-[240px]"
                >
                  <span className="text-4xl">🤖</span>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Baixar no</div>
                    <div className="text-xl font-bold">Google Play</div>
                  </div>
                </a>
              </div>

              <p className="text-sm text-white/80 mt-10 flex items-center gap-2 justify-center">
                <span>✓</span>
                <span>7 dias grátis • Sem cartão de crédito • Cancele quando quiser</span>
              </p>
            </div>
          </section>

          {/* FAQ - Novo conteúdo completo e estruturado */}
          <section className="py-24 bg-[#FAFAF9]">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#2D2E29] text-center mb-6 tracking-tight">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-[#6B7280] text-center mb-16">
                Removendo objeções e respondendo suas dúvidas
              </p>

              <div className="space-y-4">
                {faqData.map((faq, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#E5E5E0] hover:shadow-lg transition-all">
                    <button
                      onClick={() => toggleFAQ(i)}
                      className="w-full p-6 flex justify-between items-start hover:bg-[#FAFAF9] transition-colors text-left"
                    >
                      <span className="font-bold text-[#2D2E29] text-lg pr-4 leading-snug">{faq.q}</span>
                      <span className={`text-[#1C8C58] text-xl transition-transform flex-shrink-0 ${faqOpen === i ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        faqOpen === i ? "max-h-[800px] px-6 pb-6" : "max-h-0"
                      }`}
                    >
                      <div className="space-y-4">
                        <p className="text-[#2D2E29] leading-relaxed font-medium">{faq.a}</p>
                        
                        {faq.details && faq.details.length > 0 && (
                          <ul className="space-y-2 ml-4">
                            {faq.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-[#1C8C58] mt-1 flex-shrink-0">•</span>
                                <span className="text-[#6B7280] leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        {faq.extra && (
                          <p className="text-[#2D2E29] leading-relaxed font-medium">{faq.extra}</p>
                        )}
                        
                        {faq.note && (
                          <div className="bg-[#1C8C58]/5 border-l-4 border-[#1C8C58] p-4 rounded-r-lg">
                            <p className="text-sm text-[#2D2E29] leading-relaxed">
                              <span className="font-semibold">💡 Detalhe adicional:</span> {faq.note}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button
                  onClick={() => navigateTo("quiz")}
                  className="bg-[#F97316] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#EA580C] transition-all hover:scale-[1.02] shadow-lg"
                >
                  Começar Quiz Grátis Agora
                </button>
              </div>
            </div>
          </section>

          {/* CTA FINAL - Minimalista e impactante */}
          <section className="py-24 bg-gradient-to-br from-[#2D2E29] to-[#156B43] text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight">
                Pronto para Transformar<br />seu Cão?
              </h2>
              <p className="text-xl mb-12 opacity-90">
                Junte-se a 50.000+ tutores que já estão vendo resultados
              </p>
              <button
                onClick={() => navigateTo("quiz")}
                className="bg-[#F97316] text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-[#EA580C] transition-all hover:scale-[1.02] shadow-2xl mb-6"
              >
                Começar Quiz Grátis
              </button>
              <p className="text-sm opacity-80">
                7 dias grátis • Sem cartão de crédito • Cancele quando quiser
              </p>
            </div>
          </section>

          {/* FOOTER - Cor #2D2E29 */}
          <footer className="bg-[#2D2E29] text-white py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-4 gap-12 mb-12">
                {/* Coluna 1 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                      <span className="text-xl">🐕</span>
                    </div>
                    <span className="text-xl font-bold">Wise Dog Pro</span>
                  </div>
                </div>

                {/* Coluna 2 */}
                <div>
                  <h4 className="font-bold mb-4">Links</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#blog" className="text-white/80 hover:text-white transition-colors">Blog</a></li>
                    <li><a href="#sobre" className="text-white/80 hover:text-white transition-colors">Sobre Nós</a></li>
                    <li><a href="/contato" className="text-white/80 hover:text-white transition-colors">Fale Conosco</a></li>
                  </ul>
                </div>

                {/* Coluna 3 */}
                <div>
                  <h4 className="font-bold mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Política de Privacidade</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Termos de Serviço</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Cookies</a></li>
                  </ul>
                </div>

                {/* Coluna 4 */}
                <div>
                  <h4 className="font-bold mb-4">Redes Sociais</h4>
                  <div className="flex gap-4">
                    <a href="#" className="text-4xl hover:opacity-80 transition-opacity" aria-label="Facebook">
                      📘
                    </a>
                    <a href="#" className="text-4xl hover:opacity-80 transition-opacity" aria-label="Instagram">
                      📷
                    </a>
                    <a href="#" className="text-4xl hover:opacity-80 transition-opacity" aria-label="TikTok">
                      🎵
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-8 text-center">
                <p className="text-sm text-white/70">
                  © 2025 Wise Dog Pro. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* ONBOARDING */}
      {currentSection === "onboarding" && (
        <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] to-[#F8F4EB] flex flex-col">
          <div className="p-6 flex items-center gap-4">
            <div className="flex-1 h-1.5 bg-[#E5E5E0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1C8C58] transition-all duration-300"
                style={{ width: `${(onboardingSlide / 3) * 100}%` }}
              />
            </div>
            {onboardingSlide < 3 && (
              <button onClick={() => navigateTo("quiz")} className="text-[#6B7280] text-sm hover:text-[#1C8C58] font-medium">
                Pular
              </button>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md text-center">
              {onboardingSlide === 1 && (
                <>
                  <div className="text-9xl mb-8 animate-[bounce_2s_ease-in-out_infinite]">⚡</div>
                  <h2 className="text-4xl font-bold text-[#2D2E29] mb-4">IA Personalizada</h2>
                  <p className="text-[#6B7280] mb-10 text-lg">Sua jornada de treinamento é única, assim como seu cão</p>
                  <button
                    onClick={nextOnboardingSlide}
                    className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                  >
                    Próximo
                  </button>
                </>
              )}
              {onboardingSlide === 2 && (
                <>
                  <div className="text-9xl mb-8 animate-[bounce_2s_ease-in-out_infinite]">💬</div>
                  <h2 className="text-4xl font-bold text-[#2D2E29] mb-4">Chat 24/7</h2>
                  <p className="text-[#6B7280] mb-10 text-lg">Dúvidas sobre saúde, nutrição ou adestramento? IA responde na hora</p>
                  <button
                    onClick={nextOnboardingSlide}
                    className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                  >
                    Próximo
                  </button>
                </>
              )}
              {onboardingSlide === 3 && (
                <>
                  <div className="text-9xl mb-8 animate-[bounce_2s_ease-in-out_infinite]">👥</div>
                  <h2 className="text-4xl font-bold text-[#2D2E29] mb-4">Comunidade</h2>
                  <p className="text-[#6B7280] mb-10 text-lg">Compartilhe progresso, dicas e celebre vitórias com outros tutores</p>
                  <button
                    onClick={() => navigateTo("quiz")}
                    className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                  >
                    Começar Quiz
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* QUIZ */}
      {currentSection === "quiz" && (
        <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
          <div className="bg-white p-6 shadow-sm border-b border-[#E5E5E0]">
            <div className="max-w-3xl mx-auto flex items-center gap-4">
              <span className="text-sm text-[#6B7280] min-w-[60px] font-medium">{quizQuestion}/10</span>
              <div className="flex-1 h-1.5 bg-[#E5E5E0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1C8C58] transition-all duration-300"
                  style={{ width: `${(quizQuestion / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-2xl w-full">
              {quizQuestion === 1 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2D2E29] mb-8 text-center">Tire uma foto do seu cão</h2>
                  <div className="bg-white p-16 rounded-3xl border-2 border-dashed border-[#E5E5E0] text-center mb-8 hover:border-[#1C8C58] transition-colors cursor-pointer">
                    <div className="text-6xl mb-4">📷</div>
                    <p className="text-[#6B7280]">Tire uma foto do seu cão ou faça upload</p>
                    <input type="file" accept="image/*" className="hidden" />
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => navigateTo("onboarding")}
                      className="px-8 py-3 text-[#6B7280] hover:bg-white rounded-full transition-colors font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}

              {quizQuestion === 2 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2D2E29] mb-8 text-center">Qual é o nome do seu cão?</h2>
                  <input
                    type="text"
                    placeholder="Ex: Max, Luna, Rex..."
                    className="w-full p-5 border-2 border-[#E5E5E0] rounded-2xl mb-8 focus:border-[#1C8C58] focus:outline-none text-lg"
                    onChange={(e) => updateQuizData("name", e.target.value)}
                  />
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={prevQuestion}
                      className="px-8 py-3 text-[#6B7280] hover:bg-white rounded-full transition-colors font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}

              {quizQuestion === 3 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2D2E29] mb-8 text-center">Qual é o sexo do seu cão?</h2>
                  <div className="space-y-3 mb-8">
                    {["Macho", "Fêmea"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center p-5 bg-white border-2 border-[#E5E5E0] rounded-2xl cursor-pointer hover:border-[#1C8C58] hover:bg-[#FAFAF9] transition-all"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          className="w-5 h-5 mr-4 accent-[#1C8C58]"
                          onChange={(e) => updateQuizData("gender", e.target.value)}
                        />
                        <span className="text-[#2D2E29] font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={prevQuestion}
                      className="px-8 py-3 text-[#6B7280] hover:bg-white rounded-full transition-colors font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}

              {quizQuestion === 4 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2D2E29] mb-8 text-center">Quando é o aniversário do seu cão?</h2>
                  <input
                    type="date"
                    className="w-full p-5 border-2 border-[#E5E5E0] rounded-2xl mb-8 focus:border-[#1C8C58] focus:outline-none text-lg"
                    onChange={(e) => updateQuizData("birthday", e.target.value)}
                  />
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={prevQuestion}
                      className="px-8 py-3 text-[#6B7280] hover:bg-white rounded-full transition-colors font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}

              {quizQuestion === 5 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2D2E29] mb-8 text-center">Qual é a raça do seu cão?</h2>
                  <select
                    className="w-full p-5 border-2 border-[#E5E5E0] rounded-2xl mb-8 focus:border-[#1C8C58] focus:outline-none bg-white text-[#2D2E29] text-lg"
                    onChange={(e) => updateQuizData("breed", e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    <option value="Labrador">Labrador</option>
                    <option value="Golden Retriever">Golden Retriever</option>
                    <option value="Poodle">Poodle</option>
                    <option value="Shih Tzu">Shih Tzu</option>
                    <option value="SRD">SRD (Sem Raça Definida)</option>
                    <option value="Outra">Outra</option>
                  </select>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={prevQuestion}
                      className="px-8 py-3 text-[#6B7280] hover:bg-white rounded-full transition-colors font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}

              {quizQuestion === 6 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2D2E29] mb-8 text-center">Seu cão tem algum problema de saúde?</h2>
                  <div className="space-y-3 mb-8">
                    {["Nenhum problema", "Alergia", "Artrite", "Ansiedade", "Outro"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center p-5 bg-white border-2 border-[#E5E5E0] rounded-2xl cursor-pointer hover:border-[#1C8C58] hover:bg-[#FAFAF9] transition-all"
                      >
                        <input type="checkbox" value={option} className="w-5 h-5 mr-4 accent-[#1C8C58]" />
                        <span className="text-[#2D2E29] font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={prevQuestion}
                      className="px-8 py-3 text-[#6B7280] hover:bg-white rounded-full transition-colors font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}

              {quizQuestion === 7 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2D2E29] mb-8 text-center">Como você descreveria a personalidade do seu cão?</h2>
                  <div className="space-y-3 mb-8">
                    {["Dócil", "Energético", "Tímido", "Agressivo", "Carinhoso", "Independente"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center p-5 bg-white border-2 border-[#E5E5E0] rounded-2xl cursor-pointer hover:border-[#1C8C58] hover:bg-[#FAFAF9] transition-all"
                      >
                        <input type="checkbox" value={option} className="w-5 h-5 mr-4 accent-[#1C8C58]" />
                        <span className="text-[#2D2E29] font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={prevQuestion}
                      className="px-8 py-3 text-[#6B7280] hover:bg-white rounded-full transition-colors font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}

              {quizQuestion === 8 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2D2E29] mb-8 text-center">Há algo mais que devemos saber sobre seu cão?</h2>
                  <textarea
                    placeholder="Ex: Meu cão tem medo de fogos de artifício, é reativo com outros cães..."
                    className="w-full p-5 border-2 border-[#E5E5E0] rounded-2xl mb-8 focus:border-[#1C8C58] focus:outline-none min-h-[140px] resize-y text-lg"
                    onChange={(e) => updateQuizData("special", e.target.value)}
                  />
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={prevQuestion}
                      className="px-8 py-3 text-[#6B7280] hover:bg-white rounded-full transition-colors font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}

              {quizQuestion === 9 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2D2E29] mb-8 text-center">Qual é o principal desafio com seu cão?</h2>
                  <div className="space-y-3 mb-8">
                    {["Não obedece", "Pula nas pessoas", "Puxa a coleira", "Latido excessivo", "Agressividade", "Outro"].map(
                      (option) => (
                        <label
                          key={option}
                          className="flex items-center p-5 bg-white border-2 border-[#E5E5E0] rounded-2xl cursor-pointer hover:border-[#1C8C58] hover:bg-[#FAFAF9] transition-all"
                        >
                          <input
                            type="radio"
                            name="challenge"
                            value={option}
                            className="w-5 h-5 mr-4 accent-[#1C8C58]"
                            onChange={(e) => updateQuizData("challenge", e.target.value)}
                          />
                          <span className="text-[#2D2E29] font-medium">{option}</span>
                        </label>
                      )
                    )}
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={prevQuestion}
                      className="px-8 py-3 text-[#6B7280] hover:bg-white rounded-full transition-colors font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}

              {quizQuestion === 10 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2D2E29] mb-8 text-center">Quanto tempo você tem por dia para treinar?</h2>
                  <div className="space-y-3 mb-8">
                    {["15 min/dia", "30 min/dia", "1 hora/dia", "2+ horas/dia"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center p-5 bg-white border-2 border-[#E5E5E0] rounded-2xl cursor-pointer hover:border-[#1C8C58] hover:bg-[#FAFAF9] transition-all"
                      >
                        <input
                          type="radio"
                          name="time"
                          value={option}
                          className="w-5 h-5 mr-4 accent-[#1C8C58]"
                          onChange={(e) => updateQuizData("time", e.target.value)}
                        />
                        <span className="text-[#2D2E29] font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={prevQuestion}
                      className="px-8 py-3 text-[#6B7280] hover:bg-white rounded-full transition-colors font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={finishQuiz}
                      className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg"
                    >
                      Finalizar Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PAYWALL */}
      {currentSection === "paywall" && (
        <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] to-[#F8F4EB] py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-[#2D2E29] mb-4 tracking-tight">Escolha seu plano</h1>
              <p className="text-xl text-[#6B7280]">Comece com 7 dias grátis, sem cartão de crédito</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Plano Mensal */}
              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all border border-[#E5E5E0]">
                <h3 className="text-3xl font-bold text-[#2D2E29] mb-6">Mensal</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-bold text-[#1C8C58]">R$ 29,90</span>
                  <span className="text-[#6B7280] text-lg">/mês</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {["IA Personalizada", "Chat 24/7", "Comunidade", "Suporte por email"].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="text-[#1C8C58] font-bold text-2xl">✓</span>
                      <span className="text-[#2D2E29] font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => selectPlan("monthly")}
                  className="w-full bg-[#1C8C58] text-white py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg text-lg"
                >
                  Começar Trial Grátis
                </button>
                <p className="text-xs text-[#9CA3AF] text-center mt-5">Renovação automática. Cancele a qualquer momento.</p>
              </div>

              {/* Plano Anual */}
              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all border-4 border-[#1C8C58] relative">
                <div className="absolute -top-4 right-8 bg-[#F97316] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                  Economize 45%
                </div>
                <h3 className="text-3xl font-bold text-[#2D2E29] mb-6">Anual</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-[#1C8C58]">R$ 199,90</span>
                  <span className="text-[#6B7280] text-lg">/ano</span>
                </div>
                <p className="text-sm text-[#6B7280] mb-8">(R$ 16,66/mês)</p>
                <ul className="space-y-4 mb-10">
                  {[
                    "IA Personalizada",
                    "Chat 24/7",
                    "Comunidade",
                    "Suporte por email",
                    "Acesso antecipado a novas features",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="text-[#1C8C58] font-bold text-2xl">✓</span>
                      <span className="text-[#2D2E29] font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => selectPlan("yearly")}
                  className="w-full bg-[#1C8C58] text-white py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg text-lg"
                >
                  Começar Trial Grátis
                </button>
                <p className="text-xs text-[#9CA3AF] text-center mt-5">Renovação automática. Cancele a qualquer momento.</p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto space-y-5 text-center">
              <div className="flex items-center justify-center gap-3 text-[#6B7280]">
                <span className="text-3xl">🔒</span>
                <span className="text-lg">Cancele a qualquer momento. Sem multa, sem complicação.</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-[#6B7280]">
                <span className="text-3xl">💳</span>
                <span className="text-lg">Sem cartão de crédito para começar o trial.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMAÇÃO */}
      {currentSection === "confirmation" && (
        <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] to-[#F8F4EB] flex items-center justify-center p-8">
          <div className="text-center max-w-lg">
            <div className="text-9xl mb-8 animate-[bounce_2s_ease-in-out_infinite]">🎉</div>
            <h1 className="text-5xl font-bold text-[#2D2E29] mb-6 tracking-tight">Bem-vindo ao<br />Wise Dog Pro!</h1>
            <p className="text-xl text-[#6B7280] mb-10 leading-relaxed">
              Sua jornada personalizada está sendo preparada. Em breve você receberá um email com os próximos passos.
            </p>
            <button
              onClick={() => navigateTo("landing")}
              className="bg-[#1C8C58] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg text-lg"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
