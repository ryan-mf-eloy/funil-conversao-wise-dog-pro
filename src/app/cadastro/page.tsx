"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, User, Chrome, Apple, Check, Bell, Sparkles, Trophy, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { DevNotification } from "@/components/dev/DevNotification";

export default function CadastroPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDev = process.env.NODE_ENV === "development";
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Verificar se o usuário veio do paywall
  useEffect(() => {
    setMounted(true);
    
    const checkAuthorization = () => {
      // Verificar sessionStorage apenas no cliente
      if (typeof window === "undefined") {
        setCheckingAuth(false);
        return;
      }

      // Verificar sessionStorage
      const plan = sessionStorage.getItem("selectedPlan");
      const planSelectedAt = sessionStorage.getItem("planSelectedAt");
      
      // Verificar query params
      const planFromQuery = searchParams.get("plan");

      // Verificar se o plano foi selecionado há menos de 1 hora (3600000ms)
      if (plan && planSelectedAt) {
        const timeDiff = Date.now() - parseInt(planSelectedAt);
        if (timeDiff < 3600000) { // 1 hora
          setIsAuthorized(true);
          setSelectedPlan(plan);
          setCheckingAuth(false);
          return;
        }
      }

      // Verificar query params como fallback
      if (planFromQuery) {
        setIsAuthorized(true);
        setSelectedPlan(planFromQuery);
        // Salvar no sessionStorage para consistência
        sessionStorage.setItem("selectedPlan", planFromQuery);
        sessionStorage.setItem("planSelectedAt", Date.now().toString());
        setCheckingAuth(false);
        return;
      }

      // Se não autorizado
      setIsAuthorized(false);
      setCheckingAuth(false);
    };

    checkAuthorization();
  }, [router, searchParams]);

  // Redirecionar para quiz se não autorizado
  useEffect(() => {
    if (mounted && !checkingAuth && !isAuthorized) {
      // Em modo de desenvolvimento, mostrar notificação mas não redirecionar
      if (isDev) {
        return;
      }
      
      // Em produção, redirecionar para quiz após um pequeno delay
      const timer = setTimeout(() => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("startQuiz", "true");
          window.location.href = "/";
        }
      }, 1500); // Pequeno delay para mostrar o loading
      
      return () => clearTimeout(timer);
    }
  }, [mounted, checkingAuth, isAuthorized, isDev]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    if (!formData.acceptTerms) {
      alert("Você precisa aceitar os termos e condições");
      return;
    }

    setIsLoading(true);
    // Simulação de cadastro
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    // Limpar sessionStorage após cadastro
    sessionStorage.removeItem("selectedPlan");
    sessionStorage.removeItem("planSelectedAt");
    
    // Redirecionar para confirmação ou dashboard
    router.push("/?section=confirmation");
  };

  // Redirecionar para quiz se não autorizado
  useEffect(() => {
    if (mounted && !checkingAuth && !isAuthorized) {
      // Em modo de desenvolvimento, mostrar notificação
      if (isDev) {
        // Não redirecionar em dev, apenas mostrar notificação
        return;
      }
      
      // Em produção, redirecionar para quiz
      const timer = setTimeout(() => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("startQuiz", "true");
          window.location.href = "/";
        }
      }, 1500); // Pequeno delay para mostrar o loading
      
      return () => clearTimeout(timer);
    }
  }, [mounted, checkingAuth, isAuthorized, isDev]);

  // Aguardar mount ou mostrar loading durante verificação/redirecionamento
  if (!mounted || checkingAuth || !isAuthorized) {
    return (
      <>
        {/* Notificação de Desenvolvimento */}
        {isDev && !isAuthorized && (
          <DevNotification
            title="Modo Desenvolvimento"
            message="Em produção, você seria redirecionado automaticamente para o quiz. Aqui você pode testar a página normalmente."
          />
        )}
        
        <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] to-[#F8F4EB] flex items-center justify-center p-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 border-4 border-[#1C8C58] border-t-transparent rounded-full animate-spin mx-auto mb-6"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#6B7280] font-medium"
            >
              Redirecionando...
            </motion.p>
          </div>
        </div>
      </>
    );
  }

  const handleSSO = (provider: "google" | "apple") => {
    // Implementar SSO
    console.log(`Cadastro com ${provider}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF9]">
      <div className="flex-1 flex">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/assets/sign-in-dog-background.jpg)'
            }}
          />
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C8C58]/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#FAFAF9]/10" />
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 z-10">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border-2 border-white/50">
              <div className="w-12 h-12 bg-[#1C8C58] rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/app-icon.webp"
                  alt="Wise Dog Pro"
                  width={48}
                  height={48}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#2D2E29]">Wise Dog Pro</h2>
                <p className="text-sm text-[#6B7280]">Treinamento inteligente</p>
              </div>
            </div>
          </div>

          {/* Notificações flutuantes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute top-32 right-10 z-10"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-white/50 p-4 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#1C8C58] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-[#2D2E29]">Wise Dog Pro</p>
                    <span className="text-xs text-[#9CA3AF]">Agora</span>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Hora de treinar com o Thor! 🐾
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute top-52 right-16 z-10"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-white/50 p-4 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#FBBF24] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-[#2D2E29]">Wise Dog Pro</p>
                    <span className="text-xs text-[#9CA3AF]">5 min</span>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Parabéns! Você desbloqueou o badge "Mestre" 🏆
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="absolute bottom-32 left-10 z-10"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-white/50 p-4 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#3B82F6] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-[#2D2E29]">Wise Dog Pro</p>
                    <span className="text-xs text-[#9CA3AF]">Ontem</span>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Vacina do Thor amanhã às 14:00 💉
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="absolute bottom-52 left-16 z-10"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-white/50 p-4 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#8B5CF6] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-[#2D2E29]">Wise Dog Pro</p>
                    <span className="text-xs text-[#9CA3AF]">2 dias</span>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Não perca seu streak de 7 dias! 🔥
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-[#FAFAF9]">
          <div className="w-full max-w-md">
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-[#2D2E29] mb-3">
                  Comece sua jornada
                </h1>
                <p className="text-lg text-[#6B7280]">
                  Crie sua conta e transforme o treinamento do seu cão
                </p>
              </motion.div>

              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-3xl border-2 border-[#D4C4A8]/20 shadow-xl p-8 lg:p-10"
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#2D2E29] font-semibold">
                      Nome Completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Seu nome completo"
                        className="pl-12 h-12 border-2 border-[#D4C4A8]/30 focus:border-[#1C8C58] focus:ring-2 focus:ring-[#1C8C58]/20"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#2D2E29] font-semibold">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="seu@email.com"
                        className="pl-12 h-12 border-2 border-[#D4C4A8]/30 focus:border-[#1C8C58] focus:ring-2 focus:ring-[#1C8C58]/20"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#2D2E29] font-semibold">
                      Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Mínimo 8 caracteres"
                        className="pl-12 pr-12 h-12 border-2 border-[#D4C4A8]/30 focus:border-[#1C8C58] focus:ring-2 focus:ring-[#1C8C58]/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1C8C58] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-[#2D2E29] font-semibold">
                      Confirmar Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Digite a senha novamente"
                        className="pl-12 pr-12 h-12 border-2 border-[#D4C4A8]/30 focus:border-[#1C8C58] focus:ring-2 focus:ring-[#1C8C58]/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1C8C58] transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#F8F4EB] to-[#F8EBDD] rounded-xl border-2 border-[#D4C4A8]/30">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        required
                        className="sr-only"
                      />
                      <label
                        htmlFor="acceptTerms"
                        className={`
                          flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-all duration-200 cursor-pointer
                          ${formData.acceptTerms
                            ? "bg-[#1C8C58] border-[#1C8C58] shadow-md shadow-[#1C8C58]/20"
                            : "bg-white border-[#D4C4A8] hover:border-[#1C8C58]/50 hover:bg-[#1C8C58]/5"
                          }
                        `}
                      >
                        {formData.acceptTerms && (
                          <Check className="w-4 h-4 text-white stroke-[3]" />
                        )}
                      </label>
                    </div>
                    <label
                      htmlFor="acceptTerms"
                      className="text-sm text-[#6B7280] leading-relaxed cursor-pointer flex-1"
                    >
                      Concordo com a{" "}
                      <Link
                        href="/politica-privacidade"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1C8C58] hover:underline font-semibold transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Política de Privacidade
                      </Link>
                      {" "}e os{" "}
                      <Link
                        href="/termos-condicoes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1C8C58] hover:underline font-semibold transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Termos & Condições
                      </Link>
                      . *
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base font-semibold"
                  >
                    {isLoading ? "Criando conta..." : "Criar Conta Grátis"}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#D4C4A8]/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-[#6B7280]">ou continue com</span>
                  </div>
                </div>

                {/* SSO Buttons */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSSO("google")}
                    className="w-full h-12 border-2 border-[#D4C4A8]/30 hover:border-[#1C8C58]/50 hover:bg-[#1C8C58]/5 transition-all"
                  >
                    <Chrome className="w-5 h-5" />
                    <span className="font-semibold">Continuar com Google</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSSO("apple")}
                    className="w-full h-12 border-2 border-[#D4C4A8]/30 hover:border-[#1C8C58]/50 hover:bg-[#1C8C58]/5 transition-all"
                  >
                    <Apple className="w-5 h-5" />
                    <span className="font-semibold">Continuar com Apple</span>
                  </Button>
                </div>

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-[#6B7280]">
                    Já tem uma conta?{" "}
                    <Link
                      href="/login"
                      className="text-[#1C8C58] hover:underline font-semibold"
                    >
                      Entrar
                    </Link>
                  </p>
                </div>
              </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

