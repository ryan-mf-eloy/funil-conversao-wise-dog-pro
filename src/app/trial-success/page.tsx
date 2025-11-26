"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, CreditCard, Mail, Settings } from "lucide-react";
import { Button } from "@/components/common/Button";

export default function TrialSuccessPage() {
  const router = useRouter();
  const [trialEndDate, setTrialEndDate] = useState<string>("");
  const [plan, setPlan] = useState<string>("");

  useEffect(() => {
    // Buscar dados do trial do sessionStorage
    const trialEnd = sessionStorage.getItem("trialEndDate");
    const selectedPlan = sessionStorage.getItem("selectedPlan");

    if (trialEnd) {
      const date = new Date(trialEnd);
      setTrialEndDate(
        date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
    }

    if (selectedPlan) {
      setPlan(selectedPlan === "annual" ? "Anual" : "Mensal");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] to-[#F8F4EB] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg p-8 md:p-12 shadow-[4px_4px_0px_0px] shadow-zinc-900 dark:shadow-white"
      >
        {/* Ícone de Sucesso */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-[#1C8C58] rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white text-center mb-4">
          🎉 Bem-vindo ao Seu Trial!
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center mb-8">
          Seu trial gratuito começou!
        </p>

        {/* Detalhes do Trial */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border-2 border-zinc-900 dark:border-white">
            <CheckCircle2 className="w-5 h-5 text-[#1C8C58] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white">
                Acesso completo até {trialEndDate || "03/12/2025"}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Explore todas as features premium sem custo
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border-2 border-zinc-900 dark:border-white">
            <CreditCard className="w-5 h-5 text-[#1C8C58] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white">
                Não cobraremos nada hoje
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Seu cartão foi registrado com segurança
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border-2 border-zinc-900 dark:border-white">
            <Calendar className="w-5 h-5 text-[#1C8C58] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white">
                Lembrete 24h antes da cobrança
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Você receberá uma notificação antes da primeira cobrança
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-2 border-amber-200 dark:border-amber-800">
            <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-900 dark:text-amber-100">
                Confirmação enviada por email
              </div>
              <div className="text-sm text-amber-800 dark:text-amber-200">
                Verifique sua caixa de entrada para mais detalhes
              </div>
            </div>
          </div>
        </div>

        {/* Informações do Plano */}
        {plan && (
          <div className="bg-[#1C8C58]/10 dark:bg-[#1C8C58]/20 border-2 border-[#1C8C58] rounded-lg p-4 mb-8">
            <div className="text-center">
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                Plano selecionado
              </div>
              <div className="text-xl font-bold text-zinc-900 dark:text-white">
                Premium {plan}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                {plan === "Anual"
                  ? "R$ 39,90/mês (R$ 478,80/ano)"
                  : "R$ 49,90/mês"}
              </div>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="space-y-4">
          <Button
            onClick={() => router.push("/dashboard")}
            size="lg"
            className="w-full bg-[#1C8C58] hover:bg-[#156B43] text-white border-2 border-[#1C8C58] shadow-[4px_4px_0px_0px] shadow-[#1C8C58] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            Começar Treinamento →
          </Button>

          <button
            onClick={() => router.push("/settings/subscription")}
            className="w-full text-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-[#1C8C58] transition-colors flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Gerenciar assinatura
          </button>
        </div>
      </motion.div>
    </div>
  );
}

