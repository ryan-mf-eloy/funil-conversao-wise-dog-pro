"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Meu Max era agressivo com outros cães. Em 2 semanas com Wise Dog Pro, melhorou 100%! A IA entendeu exatamente o que ele precisava.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    name: "Maria Silva",
    role: "Tutora de Max",
  },
  {
    text: "Chat IA é incrível! Perguntei sobre alergia da Luna e recebi resposta detalhada em 30 segundos. Melhor que veterinário online.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    name: "João Santos",
    role: "Tutor de Luna",
  },
  {
    text: "Comunidade é tão supportiva! Compartilhei progresso do Rex e recebi dicas de outros tutores. Sinto que não estou sozinha.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    name: "Ana Costa",
    role: "Tutora de Rex",
  },
  {
    text: "A jornada personalizada mudou tudo! Meu cão aprendeu comandos básicos em 3 semanas. Interface intuitiva e lições claras.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    name: "Carlos Mendes",
    role: "Tutor de Thor",
  },
  {
    text: "O sistema de badges e gamificação motiva muito! Meu filho adora ver o progresso do nosso cão. App muito bem feito!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
    name: "Patricia Lima",
    role: "Tutora de Bela",
  },
  {
    text: "Suporte excepcional! Tive dúvidas sobre treinamento e a equipe respondeu rapidamente. Vale cada centavo investido.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    name: "Roberto Alves",
    role: "Tutor de Spike",
  },
  {
    text: "Minha cadelinha tinha medo de fogos. Com as lições personalizadas, ela superou o medo em 1 mês. Incrível!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    name: "Fernanda Souza",
    role: "Tutora de Mel",
  },
  {
    text: "A IA realmente entende o comportamento do meu cão. As lições se adaptam conforme ele progride. Tecnologia de ponta!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    name: "Lucas Ferreira",
    role: "Tutor de Zeus",
  },
  {
    text: "Recomendo para todos os tutores! O app é completo, fácil de usar e os resultados aparecem rápido. Meu cão está muito mais obediente.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces",
    name: "Juliana Rocha",
    role: "Tutora de Nina",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsDemo() {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            O que nossos tutores dizem
          </h2>
          <p className="text-center mt-5 opacity-75">
            Veja o que nossos clientes têm a dizer sobre nós.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}

