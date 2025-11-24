"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulação de envio (aqui você integraria com sua API)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simular sucesso
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ nome: "", email: "", assunto: "", mensagem: "" });

    // Resetar status após 5 segundos
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#EFE988] backdrop-blur-md border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-[#1C8C58] to-[#5BA67B] rounded-2xl flex items-center justify-center shadow-sm">
              <span className="text-2xl">🐕</span>
            </div>
            <span className="text-xl font-bold text-[#000000] tracking-tight">Wise Dog Pro</span>
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link href="/#blog" className="text-[#000000] hover:text-[#1C8C58] transition-colors">
              Blog
            </Link>
            <Link href="/#sobre" className="text-[#000000] hover:text-[#1C8C58] transition-colors">
              Sobre Nós
            </Link>
            <Link href="/contato" className="text-[#000000] hover:text-[#1C8C58] transition-colors font-bold">
              Fale Conosco
            </Link>
          </nav>
          <Link
            href="/"
            className="bg-[#000000] text-white px-7 py-2.5 rounded-full font-semibold text-sm hover:bg-[#1a1a1a] transition-all hover:scale-[1.02] shadow-sm"
          >
            Voltar
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#FAFAF9] to-[#F8F4EB] py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1C8C58]/5 text-[#1C8C58] px-4 py-2 rounded-full text-sm font-semibold border border-[#1C8C58]/10 mb-8">
            <span className="text-2xl">💬</span>
            Estamos aqui para ajudar
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-[#2D2E29] mb-6 tracking-tight">
            Fale Conosco
          </h1>
          <p className="text-xl text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
            Tem dúvidas, sugestões ou precisa de suporte? Envie sua mensagem e nossa equipe responderá em até 24 horas.
          </p>
        </div>
      </section>

      {/* FORMULÁRIO DE CONTATO */}
      <section className="py-16 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Coluna Esquerda - Informações */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#2D2E29] mb-6">
                  Como Podemos Ajudar?
                </h2>
                <p className="text-[#6B7280] leading-relaxed mb-8">
                  Nossa equipe está pronta para responder suas dúvidas sobre o Wise Dog Pro, ajudar com problemas técnicos ou ouvir suas sugestões.
                </p>
              </div>

              {/* Canais de Contato */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E5E5E0] hover:shadow-lg transition-all">
                  <div className="text-4xl">📧</div>
                  <div>
                    <h3 className="font-bold text-[#2D2E29] mb-1">Email</h3>
                    <p className="text-[#6B7280] text-sm mb-2">Resposta em até 24 horas</p>
                    <a href="mailto:suporte@wisedogpro.com" className="text-[#1C8C58] font-semibold hover:underline">
                      suporte@wisedogpro.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E5E5E0] hover:shadow-lg transition-all">
                  <div className="text-4xl">💬</div>
                  <div>
                    <h3 className="font-bold text-[#2D2E29] mb-1">Chat ao Vivo</h3>
                    <p className="text-[#6B7280] text-sm mb-2">Segunda a Sexta, 9h às 18h</p>
                    <button className="text-[#1C8C58] font-semibold hover:underline">
                      Iniciar Chat
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E5E5E0] hover:shadow-lg transition-all">
                  <div className="text-4xl">📱</div>
                  <div>
                    <h3 className="font-bold text-[#2D2E29] mb-1">Redes Sociais</h3>
                    <p className="text-[#6B7280] text-sm mb-3">Siga-nos e envie mensagem</p>
                    <div className="flex gap-3">
                      <a href="#" className="text-3xl hover:opacity-80 transition-opacity" aria-label="Facebook">
                        📘
                      </a>
                      <a href="#" className="text-3xl hover:opacity-80 transition-opacity" aria-label="Instagram">
                        📷
                      </a>
                      <a href="#" className="text-3xl hover:opacity-80 transition-opacity" aria-label="TikTok">
                        🎵
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Rápido */}
              <div className="bg-[#1C8C58]/5 p-6 rounded-2xl border border-[#1C8C58]/10">
                <h3 className="font-bold text-[#2D2E29] mb-3 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  Perguntas Frequentes
                </h3>
                <p className="text-sm text-[#6B7280] mb-3">
                  Antes de enviar sua mensagem, confira se sua dúvida já foi respondida:
                </p>
                <Link
                  href="/#faq"
                  className="inline-flex items-center gap-2 text-[#1C8C58] font-semibold text-sm hover:underline"
                >
                  Ver FAQ Completo
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Coluna Direita - Formulário */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E5E5E0]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label htmlFor="nome" className="block text-sm font-semibold text-[#2D2E29] mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#E5E5E0] rounded-xl focus:border-[#1C8C58] focus:outline-none transition-colors"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#2D2E29] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#E5E5E0] rounded-xl focus:border-[#1C8C58] focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Assunto */}
                <div>
                  <label htmlFor="assunto" className="block text-sm font-semibold text-[#2D2E29] mb-2">
                    Assunto *
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#E5E5E0] rounded-xl focus:border-[#1C8C58] focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="duvida">Dúvida sobre o App</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="cancelamento">Cancelamento</option>
                    <option value="parceria">Parceria</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                {/* Mensagem */}
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-semibold text-[#2D2E29] mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-[#E5E5E0] rounded-xl focus:border-[#1C8C58] focus:outline-none transition-colors resize-y"
                    placeholder="Descreva sua dúvida ou mensagem..."
                  />
                </div>

                {/* Status de Envio */}
                {submitStatus === "success" && (
                  <div className="bg-[#1C8C58]/10 border border-[#1C8C58] text-[#1C8C58] px-4 py-3 rounded-xl flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <p className="text-sm font-semibold">
                      Mensagem enviada com sucesso! Responderemos em breve.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <p className="text-sm font-semibold">
                      Erro ao enviar mensagem. Tente novamente.
                    </p>
                  </div>
                )}

                {/* Botão de Envio */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1C8C58] text-white py-4 rounded-full font-bold text-lg hover:bg-[#156B43] transition-all hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Enviando...
                    </span>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </button>

                <p className="text-xs text-[#9CA3AF] text-center">
                  Ao enviar, você concorda com nossa{" "}
                  <a href="#" className="text-[#1C8C58] hover:underline">
                    Política de Privacidade
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
                <li>
                  <Link href="/#blog" className="text-white/80 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/#sobre" className="text-white/80 hover:text-white transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="text-white/80 hover:text-white transition-colors">
                    Fale Conosco
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3 */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    Termos de Serviço
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
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
            <p className="text-sm text-white/70">© 2025 Wise Dog Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
