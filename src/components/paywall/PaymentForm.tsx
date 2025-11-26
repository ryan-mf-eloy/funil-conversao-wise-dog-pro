"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CreditCard, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  validateCPF,
  validateCardNumber,
  validateCVV,
  validateExpiry,
  formatCPF,
  formatCardNumber,
  formatExpiry,
} from "@/lib/validators";

const paymentSchema = z.object({
  plan: z.enum(["monthly", "annual"]),
  cardNumber: z
    .string()
    .min(1, "Número do cartão é obrigatório")
    .refine(validateCardNumber, "Número de cartão inválido"),
  expiry: z
    .string()
    .min(1, "Data de validade é obrigatória")
    .refine(
      (val) => validateExpiry(val).valid,
      "Data de validade inválida ou expirada"
    ),
  cvv: z
    .string()
    .min(1, "CVV é obrigatório")
    .refine(validateCVV, "CVV deve ter 3 ou 4 dígitos"),
  cardName: z.string().min(1, "Nome no cartão é obrigatório"),
  cpf: z.string().refine(validateCPF, "CPF inválido"),
  terms: z.boolean().refine((val) => val === true, "Você precisa aceitar os termos"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => Promise<void>;
  isLoading?: boolean;
  trialEndDate?: Date;
  selectedPlan?: "monthly" | "annual";
  firstChargeAmount?: number;
  firstChargeDate?: Date;
}

export const PaymentForm: React.FC<PaymentFormProps> = (props) => {
  const {
    onSubmit,
    isLoading = false,
    trialEndDate,
    selectedPlan: selectedPlanProp = "annual",
    firstChargeAmount,
    firstChargeDate,
  } = props;
  const [cardNumberFocused, setCardNumberFocused] = useState(false);
  const [expiryFocused, setExpiryFocused] = useState(false);
  const [cvvFocused, setCvvFocused] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      plan: selectedPlanProp,
      cardNumber: "",
      expiry: "",
      cvv: "",
      cardName: "",
      cpf: "",
      terms: false,
    },
  });

  const formSelectedPlan = watch("plan");
  const planPrice = formSelectedPlan === "annual" ? 39.9 : 49.9;
  const planLabel = formSelectedPlan === "annual" ? "Anual" : "Mensal";

  const formatTrialEndDate = () => {
    if (!trialEndDate) return "03/12/2025";
    return trialEndDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatFirstChargeDate = () => {
    if (!trialEndDate) return "03/12/2025";
    return trialEndDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg p-8 mb-20"
    >
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-6 h-6 text-zinc-900 dark:text-white" />
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Informações de Pagamento
        </h2>
      </div>

      {/* Aviso de Transparência */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">
              IMPORTANTE - Leia com Atenção:
            </h3>
            <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Não cobraremos nada hoje
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Trial grátis até {formatTrialEndDate()}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Lembrete 24h antes da cobrança
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Cancele quando quiser
              </li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Seleção de Plano */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            Selecione seu plano:
          </Label>
          <Controller
            control={control}
            name="plan"
            render={({ field: { onChange, value } }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => onChange("monthly")}
                  className={cn(
                    "p-4 rounded-lg border-2 text-left transition-all",
                    value === "monthly"
                      ? "border-[#1C8C58] bg-[#1C8C58]/10 dark:bg-[#1C8C58]/20"
                      : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
                  )}
                >
                  <div className="font-semibold text-zinc-900 dark:text-white">
                    Mensal
                  </div>
                  <div className="text-lg font-bold text-zinc-900 dark:text-white">
                    R$ 49,90/mês
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => onChange("annual")}
                  className={cn(
                    "p-4 rounded-lg border-2 text-left transition-all relative",
                    value === "annual"
                      ? "border-[#1C8C58] bg-[#1C8C58]/10 dark:bg-[#1C8C58]/20"
                      : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
                  )}
                >
                  <div className="absolute top-2 right-2 bg-[#1C8C58] text-white text-xs px-2 py-1 rounded">
                    Economize
                  </div>
                  <div className="font-semibold text-zinc-900 dark:text-white">
                    Anual
                  </div>
                  <div className="text-lg font-bold text-zinc-900 dark:text-white">
                    R$ 39,90/mês
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    R$ 478,80/ano
                  </div>
                </button>
              </div>
            )}
          />
        </div>

        {/* Número do Cartão */}
        <div>
          <Label htmlFor="cardNumber" className="mb-2 block">
            Número do cartão:
          </Label>
          <Controller
            control={control}
            name="cardNumber"
            render={({ field: { onChange, value, onBlur } }) => (
              <div>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={formatCardNumber(value)}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    onChange(formatted);
                  }}
                  onFocus={() => setCardNumberFocused(true)}
                  onBlur={() => {
                    setCardNumberFocused(false);
                    onBlur();
                  }}
                  className={cn(
                    "w-full",
                    errors.cardNumber && "border-red-500"
                  )}
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Validade e CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry" className="mb-2 block">
              Validade:
            </Label>
            <Controller
              control={control}
              name="expiry"
              render={({ field: { onChange, value, onBlur } }) => (
                <div>
                  <Input
                    id="expiry"
                    type="text"
                    placeholder="MM/AA"
                    value={formatExpiry(value)}
                    onChange={(e) => {
                      const formatted = formatExpiry(e.target.value);
                      onChange(formatted);
                    }}
                    onFocus={() => setExpiryFocused(true)}
                    onBlur={() => {
                      setExpiryFocused(false);
                      onBlur();
                    }}
                    className={cn(
                      "w-full",
                      errors.expiry && "border-red-500"
                    )}
                    maxLength={5}
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.expiry.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div>
            <Label htmlFor="cvv" className="mb-2 block">
              CVV:
            </Label>
            <Controller
              control={control}
              name="cvv"
              render={({ field: { onChange, value, onBlur } }) => (
                <div>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="000"
                    value={value.replace(/\D/g, "")}
                    onChange={(e) => {
                      const numbers = e.target.value.replace(/\D/g, "");
                      onChange(numbers.substring(0, 4));
                    }}
                    onFocus={() => setCvvFocused(true)}
                    onBlur={() => {
                      setCvvFocused(false);
                      onBlur();
                    }}
                    className={cn(
                      "w-full",
                      errors.cvv && "border-red-500"
                    )}
                    maxLength={4}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cvv.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Nome no Cartão */}
        <div>
          <Label htmlFor="cardName" className="mb-2 block">
            Nome no cartão:
          </Label>
          <Controller
            control={control}
            name="cardName"
            render={({ field }) => (
              <div>
                <Input
                  id="cardName"
                  type="text"
                  placeholder="NOME COMO ESTÁ NO CARTÃO"
                  {...field}
                  className={cn(
                    "w-full uppercase",
                    errors.cardName && "border-red-500"
                  )}
                />
                {errors.cardName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardName.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* CPF */}
        <div>
          <Label htmlFor="cpf" className="mb-2 block">
            CPF:
          </Label>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <div>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={formatCPF(value)}
                  onChange={(e) => {
                    const formatted = formatCPF(e.target.value);
                    onChange(formatted);
                  }}
                  className={cn(
                    "w-full",
                    errors.cpf && "border-red-500"
                  )}
                  maxLength={14}
                />
                {errors.cpf && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cpf.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Checkbox Termos */}
        <div>
          <Controller
            control={control}
            name="terms"
            render={({ field: { onChange, value } }) => (
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-2 border-zinc-900 dark:border-white text-[#1C8C58] focus:ring-2 focus:ring-[#1C8C58]"
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Li e aceito os{" "}
                    <a
                      href="/termos-condicoes"
                      target="_blank"
                      className="text-[#1C8C58] underline hover:text-[#156B43]"
                    >
                      Termos de Uso
                    </a>{" "}
                    e{" "}
                    <a
                      href="/politica-privacidade"
                      target="_blank"
                      className="text-[#1C8C58] underline hover:text-[#156B43]"
                    >
                      Política de Cancelamento
                    </a>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.terms.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Resumo */}
        <div className="bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-900 dark:border-white rounded-lg p-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span className="text-zinc-600 dark:text-zinc-400">
                Trial termina: <strong>{trialEndDate ? trialEndDate.toLocaleDateString("pt-BR") : formatTrialEndDate()}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>💰</span>
              <span className="text-zinc-600 dark:text-zinc-400">
                1ª cobrança: <strong>R$ {firstChargeAmount ? firstChargeAmount.toFixed(2) : planPrice.toFixed(2)}</strong>{" "}
                {firstChargeDate ? `(${firstChargeDate.toLocaleDateString("pt-BR")})` : `(após trial, em ${formatFirstChargeDate()})`}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button
          type="submit"
          disabled={isLoading}
          size="lg"
          className="w-full bg-[#1C8C58] hover:bg-[#156B43] text-white border-2 border-[#1C8C58] shadow-[4px_4px_0px_0px] shadow-[#1C8C58] hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
        >
          {isLoading ? (
            "Processando..."
          ) : (
            <>
              Confirmar e Iniciar Trial
              <Lock className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-500 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          Pagamento seguro e criptografado
        </p>
      </form>
    </motion.div>
  );
};

