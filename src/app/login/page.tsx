"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  Apple,
  Bell,
  Sparkles,
  Trophy,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Redirecionar para home ou dashboard
    window.location.href = "/";
  };

  const handleSSO = (provider: "google" | "apple") => {
    // Implementar SSO
    console.log(`Login com ${provider}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF9]">
      <div className="flex-1 flex">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <Image
            src="/assets/bulldog-looking.jpg"
            alt="Cachorro treinando"
            fill
            className="object-cover"
            priority
            quality={70}
            unoptimized
          />
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C8C58]/20 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-[#FAFAF9]/10 z-0" />

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
                <h2 className="text-xl font-bold text-[#2D2E29]">
                  Wise Dog Pro
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Treinamento inteligente
                </p>
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
                    <p className="text-sm font-bold text-[#2D2E29]">
                      Wise Dog Pro
                    </p>
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
                    <p className="text-sm font-bold text-[#2D2E29]">
                      Wise Dog Pro
                    </p>
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
                    <p className="text-sm font-bold text-[#2D2E29]">
                      Wise Dog Pro
                    </p>
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
                    <p className="text-sm font-bold text-[#2D2E29]">
                      Wise Dog Pro
                    </p>
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
                Bem-vindo de volta!
              </h1>
              <p className="text-lg text-[#6B7280]">
                Entre na sua conta para continuar treinando seu cão
              </p>
            </motion.div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl border-2 border-[#D4C4A8]/20 shadow-xl p-8 lg:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-[#2D2E29] font-semibold"
                  >
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
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-[#2D2E29] font-semibold"
                    >
                      Senha
                    </Label>
                    <Link
                      href="/esqueci-senha"
                      className="text-sm text-[#1C8C58] hover:underline font-medium"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold"
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#D4C4A8]/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-[#6B7280]">
                    ou continue com
                  </span>
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

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-[#6B7280]">
                  Não tem uma conta?{" "}
                  <Link
                    href="/"
                    onClick={(e) => {
                      if (typeof window !== "undefined") {
                        sessionStorage.setItem("startQuiz", "true");
                      }
                    }}
                    className="text-[#1C8C58] hover:underline font-semibold"
                  >
                    Comece o quiz grátis
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
