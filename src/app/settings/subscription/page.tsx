"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Calendar,
  X,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/common/Button";

export default function SubscriptionPage() {
  const router = useRouter();
  const [trialEndDate, setTrialEndDate] = useState<string>("");
  const [plan, setPlan] = useState<string>("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    // Buscar dados do trial do sessionStorage
    const trialEnd = sessionStorage.getItem("trialEndDate");
    const selectedPlan = sessionStorage.getItem("selectedPlan");
    const cancelled = sessionStorage.getItem("subscriptionCancelled");

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

    if (cancelled === "true") {
      setIsCancelled(true);
    }
  }, []);

  const handleCancel = () => {
    sessionStorage.setItem("subscriptionCancelled", "true");
    setIsCancelled(true);
    setShowCancelModal(false);
  };

  const handleReactivate = () => {
    sessionStorage.removeItem("subscriptionCancelled");
    setIsCancelled(false);
  };

  const daysUntilTrialEnd = () => {
    const trialEnd = sessionStorage.getItem("trialEndDate");
    if (!trialEnd) return 0;
    const end = new Date(trialEnd);
    const today = new Date();
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const planPrice = plan === "Anual" ? 39.9 : 49.9;
  const annualPrice = plan === "Anual" ? 478.8 : planPrice * 12;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] to-[#F8F4EB] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white dark:hover:bg-zinc-900 rounded-lg border-2 border-zinc-900 dark:border-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-900 dark:text-white" />
          </button>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Minha Assinatura
          </h1>
        </div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg p-8 mb-6"
        >
          {isCancelled ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                Assinatura Cancelada
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Você ainda pode usar até {trialEndDate || "03/12/2025"}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6">
                Não cobraremos mais nada.
              </p>
              <Button
                onClick={handleReactivate}
                className="bg-[#1C8C58] hover:bg-[#156B43] text-white"
              >
                Reativar Assinatura
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1C8C58] rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Status
                  </div>
                  <div className="text-xl font-bold text-zinc-900 dark:text-white">
                    Trial Gratuito 🎉
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border-2 border-zinc-900 dark:border-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Termina em
                    </div>
                  </div>
                  <div className="text-xl font-bold text-zinc-900 dark:text-white">
                    {trialEndDate || "03/12/2025"}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                    ({daysUntilTrialEnd()} dias restantes)
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border-2 border-zinc-900 dark:border-white">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    Plano Atual
                  </div>
                  <div className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                    Premium {plan || "Anual"}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-500">
                    {plan === "Anual"
                      ? `R$ ${planPrice.toFixed(2)}/mês (cobrado anualmente)`
                      : `R$ ${planPrice.toFixed(2)}/mês`}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-2 border-amber-200 dark:border-amber-800 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                      Próxima Cobrança
                    </div>
                    <div className="text-sm text-amber-800 dark:text-amber-200">
                      {trialEndDate || "03/12/2025"} - R${" "}
                      {plan === "Anual"
                        ? annualPrice.toFixed(2)
                        : planPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border-2 border-zinc-900 dark:border-white mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                      Método de Pagamento
                    </div>
                    <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                      •••• 4242 (Visa)
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert("Funcionalidade em desenvolvimento")}
                  >
                    Atualizar Cartão
                  </Button>
                </div>
              </div>

              <div className="border-t-2 border-zinc-900 dark:border-white pt-6">
                <Button
                  onClick={() => setShowCancelModal(true)}
                  variant="outline"
                  className="w-full border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Cancelar Assinatura
                </Button>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-3 text-center">
                  ⓘ Se cancelar agora, você ainda pode usar até{" "}
                  {trialEndDate || "03/12/2025"}
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Modal de Cancelamento */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg p-8 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Tem certeza que quer cancelar?
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-zinc-600 dark:text-zinc-400">
                  Se cancelar agora:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Você ainda usa até {trialEndDate || "03/12/2025"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-red-600" />
                    <span>Perderá plano personalizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-red-600" />
                    <span>Perderá chat assistente IA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-red-600" />
                    <span>Perderá progresso premium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-red-600" />
                    <span>Perderá modo offline</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-[#1C8C58] hover:bg-[#156B43] text-white"
                >
                  Manter Assinatura
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Cancelar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

