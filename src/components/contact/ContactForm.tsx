"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/common/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, CheckCircle2, AlertCircle, Loader2, Check } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [aceitaPrivacidade, setAceitaPrivacidade] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, assunto: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação do assunto
    if (!formData.assunto) {
      setSubmitStatus("error");
      return;
    }

    // Validação da checkbox de privacidade
    if (!aceitaPrivacidade) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulação de envio (aqui você integraria com sua API)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simular sucesso
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
    setAceitaPrivacidade(false);

    // Resetar status após 5 segundos
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  return (
    <Card className="p-8 md:p-10 border-2 border-[#D4C4A8]/20 shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2E29] mb-2">
          Envie sua Mensagem
        </h2>
        <p className="text-[#6B7280]">
          Preencha o formulário abaixo e entraremos em contato o mais breve possível.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-semibold text-[#2D2E29] mb-2.5"
          >
            Nome Completo *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 border-2 border-[#D4C4A8]/30 rounded-xl focus:border-[#1C8C58] focus:outline-none focus:ring-2 focus:ring-[#1C8C58]/20 transition-all bg-white text-[#2D2E29] placeholder:text-[#9CA3AF]"
            placeholder="Seu nome completo"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[#2D2E29] mb-2.5"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 border-2 border-[#D4C4A8]/30 rounded-xl focus:border-[#1C8C58] focus:outline-none focus:ring-2 focus:ring-[#1C8C58]/20 transition-all bg-white text-[#2D2E29] placeholder:text-[#9CA3AF]"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="assunto"
            className="block text-sm font-semibold text-[#2D2E29] mb-2.5"
          >
            Assunto *
          </label>
          <Select
            value={formData.assunto}
            onValueChange={handleSelectChange}
            required
          >
            <SelectTrigger
              id="assunto"
              className="w-full h-[52px] px-4 py-3.5 border-2 border-[#D4C4A8]/30 rounded-xl focus:border-[#1C8C58] focus:outline-none focus:ring-2 focus:ring-[#1C8C58]/20 transition-all bg-white text-[#2D2E29] hover:border-[#1C8C58]/40 data-[placeholder]:text-[#9CA3AF]"
            >
              <SelectValue placeholder="Selecione um assunto" />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-[#D4C4A8]/30 rounded-xl shadow-lg">
              <SelectItem
                value="suporte"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Suporte Técnico
              </SelectItem>
              <SelectItem
                value="jornada"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Problema com Jornada Personalizada
              </SelectItem>
              <SelectItem
                value="chat-ia"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Problema com Chat IA
              </SelectItem>
              <SelectItem
                value="assinatura"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Dúvida sobre Assinatura/Planos
              </SelectItem>
              <SelectItem
                value="licoes"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Feedback sobre Lições
              </SelectItem>
              <SelectItem
                value="notificacoes"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Problema com Notificações
              </SelectItem>
              <SelectItem
                value="bug"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Relatar Bug/Erro
              </SelectItem>
              <SelectItem
                value="comunidade"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Dúvida sobre Comunidade
              </SelectItem>
              <SelectItem
                value="reembolso"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Solicitar Reembolso
              </SelectItem>
              <SelectItem
                value="cancelamento"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Cancelamento de Assinatura
              </SelectItem>
              <SelectItem
                value="sugestao"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Sugestão de Melhoria
              </SelectItem>
              <SelectItem
                value="parceria"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Parceria/Colaboração
              </SelectItem>
              <SelectItem
                value="outro"
                className="cursor-pointer focus:bg-[#1C8C58]/10 focus:text-[#1C8C58]"
              >
                Outro
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label
            htmlFor="mensagem"
            className="block text-sm font-semibold text-[#2D2E29] mb-2.5"
          >
            Mensagem *
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3.5 border-2 border-[#D4C4A8]/30 rounded-xl focus:border-[#1C8C58] focus:outline-none focus:ring-2 focus:ring-[#1C8C58]/20 transition-all resize-y bg-white text-[#2D2E29] placeholder:text-[#9CA3AF]"
            placeholder="Descreva sua dúvida ou mensagem em detalhes..."
          />
        </div>

        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#1C8C58]/10 to-[#5BA67B]/10 border-2 border-[#1C8C58] text-[#1C8C58] px-5 py-4 rounded-xl flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold mb-1">
                Mensagem enviada com sucesso!
              </p>
              <p className="text-xs text-[#1C8C58]/80">
                Responderemos em até 24 horas.
              </p>
            </div>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-300 text-red-700 px-5 py-4 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold mb-1">
                Erro ao enviar mensagem
              </p>
              <p className="text-xs text-red-600/80">
                Tente novamente ou entre em contato por email.
              </p>
            </div>
          </motion.div>
        )}

        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#F8F4EB] to-[#F8EBDD] rounded-xl border-2 border-[#D4C4A8]/30 shadow-sm hover:border-[#1C8C58]/30 transition-all">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              id="aceita-privacidade"
              checked={aceitaPrivacidade}
              onChange={(e) => setAceitaPrivacidade(e.target.checked)}
              required
              className="sr-only"
            />
            <label
              htmlFor="aceita-privacidade"
              className={`
                flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-all duration-200 cursor-pointer
                ${aceitaPrivacidade
                  ? "bg-gradient-to-br from-[#1C8C58] to-[#5BA67B] border-[#1C8C58] shadow-md shadow-[#1C8C58]/20"
                  : "bg-white border-[#D4C4A8] hover:border-[#1C8C58]/50 hover:bg-[#1C8C58]/5"
                }
              `}
            >
              {aceitaPrivacidade && (
                <Check className="w-4 h-4 text-white stroke-[3]" />
              )}
            </label>
          </div>
          <label
            htmlFor="aceita-privacidade"
            className="text-sm text-[#6B7280] leading-relaxed cursor-pointer flex-1"
          >
            Concordo com a{" "}
            <a
              href="/politica-privacidade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1C8C58] hover:underline font-semibold transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Política de Privacidade
            </a>
            {" "}e os{" "}
            <a
              href="/termos-condicoes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1C8C58] hover:underline font-semibold transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Termos & Condições
            </a>
            {" "}e autorizo o tratamento dos meus dados pessoais. *
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !aceitaPrivacidade}
          variant="default"
          size="lg"
          className="w-full mt-2"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Enviar Mensagem
            </span>
          )}
        </Button>
      </form>
    </Card>
  );
};

