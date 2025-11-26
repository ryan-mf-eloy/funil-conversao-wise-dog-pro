"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { useDevControls } from "./DevControlsContext";

interface DevControlsProps {
  children: React.ReactNode;
  title?: string;
}

export const DevControls: React.FC<DevControlsProps> = ({
  children,
  title = "Dev Controls",
}) => {
  const id = useId();
  const { isActive, setActive } = useDevControls();
  const isThisActive = isActive(id);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Ativar este DevControls quando hover ou interação
  useEffect(() => {
    if (isHovered || isDragging) {
      setActive(id);
    }
  }, [isHovered, isDragging, id, setActive]);

  // Desativar quando não está mais interagindo (após um delay)
  useEffect(() => {
    if (!isHovered && !isDragging && isThisActive) {
      const timer = setTimeout(() => {
        setActive(null);
      }, 1000); // Desativa após 1 segundo sem interação
      return () => clearTimeout(timer);
    }
  }, [isHovered, isDragging, isThisActive, setActive]);

  useEffect(() => {
    // Carregar posição salva do localStorage ou usar padrão
    const savedPosition = localStorage.getItem("devControlsPosition");
    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition);
        setPosition(parsed);
      } catch (e) {
        // Ignorar erro de parsing, usar padrão
        setPosition({ x: 16, y: window.innerHeight - 200 }); // bottom-4 left-4
      }
    } else {
      // Posição padrão: bottom-4 left-4
      setPosition({ x: 16, y: window.innerHeight - 200 });
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Salvar posição no localStorage quando mudar
    localStorage.setItem("devControlsPosition", JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Limitar dentro da viewport
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Não renderizar até inicializar para evitar flash
  if (!isInitialized) {
    return null;
  }

  // Ocultar se não for o DevControls ativo (exceto durante interação)
  if (!isThisActive && !isDragging && !isHovered) {
    return null;
  }

  // Durante drag, usar div normal sem animações para resposta instantânea
  if (isDragging) {
    return (
      <div
        ref={containerRef}
        onMouseEnter={() => {
          setIsHovered(true);
          setActive(id);
        }}
        onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "fixed z-[9999] bg-white border-2 border-[#1C8C58] rounded-xl p-4 shadow-2xl max-w-xs min-w-[300px] cursor-grabbing"
      )}
        style={{
          left: position.x,
          top: position.y,
          userSelect: "none",
          transform: "none", // Sem transform durante drag, usa left/top direto
        }}
      >
        {/* Header com área de drag */}
        <motion.div
          onMouseDown={handleMouseDown}
          className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#E5E5E0] cursor-grab active:cursor-grabbing"
          whileHover={{ backgroundColor: "rgba(28, 140, 88, 0.05)" }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-sm font-bold text-[#1C8C58] flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-base"
            >
              🔧
            </motion.span>
            <span>{title}</span>
          </h3>
          <div className="flex items-center gap-1 text-[#9CA3AF] text-xs">
            <span>⋮⋮</span>
          </div>
        </motion.div>

        {/* Conteúdo */}
        <div className="transition-opacity duration-200">
          <div className="space-y-4">
            {children}
          </div>
          
          {/* Seção de Navegação Rápida - Apenas se não houver children customizados */}
          {React.Children.count(children) === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border-t-2 border-[#E5E5E0] pt-4 mt-4"
            >
              <div className="text-xs font-semibold text-[#1C8C58] mb-3 flex items-center gap-2">
                <span>🗺️</span>
                <span>Navegação Rápida</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5 max-h-[300px] overflow-y-auto">
                {[
                  { path: "/", label: "🏠 Home / Landing" },
                  { path: "/login", label: "🔐 Login" },
                  { path: "/cadastro", label: "✍️ Cadastro" },
                  { path: "/contato", label: "📧 Contato" },
                  { path: "/sobre-nos", label: "ℹ️ Sobre Nós" },
                  { path: "/blog", label: "📰 Blog" },
                  { path: "/politica-privacidade", label: "🔒 Política Privacidade" },
                  { path: "/termos-condicoes", label: "📄 Termos e Condições" },
                  { path: "/trial-success", label: "✅ Trial Success" },
                  { path: "/settings/subscription", label: "⚙️ Minha Assinatura" },
                ].map((page, index) => (
                  <motion.div
                    key={page.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.02 }}
                  >
                    <QuickNavLink path={page.path} label={page.label} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Quando não está arrastando, usar motion.div com animações suaves
  return (
    <motion.div
      ref={containerRef}
      initial={false}
      animate={{
        x: position.x,
        y: position.y,
        opacity: isHovered || isThisActive ? 1 : 0.4,
        scale: isHovered || isThisActive ? 1 : 0.98,
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setActive(id);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "fixed z-[9999] bg-white border-2 border-[#1C8C58] rounded-xl p-4 shadow-2xl max-w-xs min-w-[300px] cursor-grab"
      )}
      style={{
        left: 0,
        top: 0,
        userSelect: "none",
      }}
    >
        {/* Header com área de drag */}
        <motion.div
          onMouseDown={handleMouseDown}
          className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#E5E5E0] cursor-grab active:cursor-grabbing"
          whileHover={{ backgroundColor: "rgba(28, 140, 88, 0.05)" }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-sm font-bold text-[#1C8C58] flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-base"
            >
              🔧
            </motion.span>
            <span>{title}</span>
          </h3>
          <div className="flex items-center gap-1 text-[#9CA3AF] text-xs">
            <span>⋮⋮</span>
          </div>
        </motion.div>

      {/* Conteúdo */}
      <div className="transition-opacity duration-200">
        <div className="space-y-4">
          {children}
        </div>
        
        {/* Seção de Navegação Rápida - Apenas se não houver children customizados */}
        {React.Children.count(children) === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border-t-2 border-[#E5E5E0] pt-4 mt-4"
          >
            <div className="text-xs font-semibold text-[#1C8C58] mb-3 flex items-center gap-2">
              <span>🗺️</span>
              <span>Navegação Rápida</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 max-h-[300px] overflow-y-auto">
              {[
                { path: "/", label: "🏠 Home / Landing" },
                { path: "/login", label: "🔐 Login" },
                { path: "/cadastro", label: "✍️ Cadastro" },
                { path: "/contato", label: "📧 Contato" },
                { path: "/sobre-nos", label: "ℹ️ Sobre Nós" },
                { path: "/blog", label: "📰 Blog" },
                { path: "/politica-privacidade", label: "🔒 Política Privacidade" },
                { path: "/termos-condicoes", label: "📄 Termos e Condições" },
                { path: "/trial-success", label: "✅ Trial Success" },
                { path: "/settings/subscription", label: "⚙️ Minha Assinatura" },
              ].map((page, index) => (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.02 }}
                >
                  <QuickNavLink path={page.path} label={page.label} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

interface QuickNavLinkProps {
  path: string;
  label: string;
}

const QuickNavLink: React.FC<QuickNavLinkProps> = ({ path, label }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isCurrentPage = pathname === path;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <motion.a
      href={path}
      onClick={handleClick}
      whileHover={{ scale: 1.02, x: 2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "text-xs px-3 py-2 rounded-lg transition-all flex items-center justify-between gap-2 border-2",
        isCurrentPage
          ? "bg-[#1C8C58]/20 border-[#1C8C58] font-semibold text-[#1C8C58] shadow-sm"
          : "border-transparent hover:bg-[#1C8C58]/10 hover:border-[#1C8C58]/30 text-[#6B7280]"
      )}
    >
      <span className="truncate">{label}</span>
      <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-50" />
    </motion.a>
  );
};
