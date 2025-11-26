"use client";

import React from "react";
import { Header } from "@/components/common/Header";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "comandos-basicos-essenciais",
    title: "5 Comandos Básicos Essenciais que Todo Cão Deve Aprender",
    excerpt: "Descubra os comandos fundamentais que transformarão a convivência com seu pet e facilitarão o dia a dia.",
    content: "O adestramento básico é fundamental para uma convivência harmoniosa...",
    author: "Dr. Carlos Mendes",
    date: "15 de Janeiro, 2024",
    readTime: "8 min",
    category: "Treinamento Básico",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=500&fit=crop",
  },
  {
    id: "ansiedade-separacao",
    title: "Como Lidar com Ansiedade de Separação em Cães",
    excerpt: "Seu cão fica ansioso quando você sai de casa? Aprenda técnicas comprovadas para ajudá-lo a se sentir mais seguro.",
    content: "A ansiedade de separação é um dos problemas comportamentais mais comuns...",
    author: "Dra. Marina Silva",
    date: "10 de Janeiro, 2024",
    readTime: "10 min",
    category: "Comportamento",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=500&fit=crop",
  },
  {
    id: "socializacao-filhotes",
    title: "Guia Completo de Socialização para Filhotes",
    excerpt: "Os primeiros meses são cruciais. Saiba como socializar seu filhote corretamente e evitar problemas futuros.",
    content: "A socialização é o processo mais importante no desenvolvimento de um filhote...",
    author: "Prof. Ricardo Almeida",
    date: "5 de Janeiro, 2024",
    readTime: "12 min",
    category: "Filhotes",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=500&fit=crop",
  },
];

export default function BlogPage() {
  const handleStartClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF9]">
      <div className="flex-1">
        <Header onStartClick={handleStartClick} hideAnchorLinks={true} />
        {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#EFE988] to-[#D4C65D] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Blog Wise Dog Pro
          </h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Dicas, guias e insights de especialistas para você treinar seu cão com confiança e eficácia
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#EFE988] text-black text-sm font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#D4C65D] transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read Time & CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} de leitura</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="flex items-center gap-2 text-black font-semibold hover:text-[#D4C65D] transition-colors"
                    >
                      Ler mais
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pronto para Transformar seu Cão?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Comece hoje mesmo com um plano personalizado de treinamento
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Começar Agora - 7 Dias Grátis
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#EFE988] to-[#D4C65D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Receba Dicas Semanais
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Inscreva-se na nossa newsletter e receba conteúdos exclusivos sobre adestramento
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-6 py-4 rounded-lg border-2 border-black/10 focus:border-black focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Inscrever
            </button>
          </form>
          <p className="text-sm text-gray-700 mt-4">
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </section>
      </div>
      <FooterTapedDesign />
    </div>
  );
}
