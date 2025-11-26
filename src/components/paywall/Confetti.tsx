"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
  endY: number;
  endX: number;
  size: number;
  shape: "leaf1" | "leaf2" | "leaf3" | "leaf4";
  rotationSpeed: number;
}

const COLORS = [
  "#1C8C58", // Verde principal
  "#156B43", // Verde escuro
  "#5BA67B", // Verde claro
  "#4ADE80", // Verde menta
  "#FBBF24", // Amarelo
  "#F59E0B", // Amarelo escuro
  "#FB923C", // Peach
  "#F97316", // Laranja
  "#DC2626", // Vermelho
  "#7C2D12", // Marrom
];

export const Confetti: React.FC<{ duration?: number }> = ({ duration = 3000 }) => {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setWindowHeight(window.innerHeight);

    // Criar 200 folhas
    const pieces: ConfettiPiece[] = Array.from({ length: 200 }, (_, i) => {
      const endX = (Math.random() - 0.5) * 300;
      const endY = window.innerHeight + 100;
      const shapes: ("leaf1" | "leaf2" | "leaf3" | "leaf4")[] = ["leaf1", "leaf2", "leaf3", "leaf4"];
      
      return {
        id: i,
        x: Math.random() * 100, // Posição X em porcentagem
        y: -10 - Math.random() * 20, // Começar acima da tela
        rotation: Math.random() * 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.8,
        endX,
        endY,
        size: 8 + Math.random() * 12, // Tamanho variado entre 8 e 20px
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotationSpeed: 180 + Math.random() * 360, // Rotação mais lenta e variada
      };
    });

    setConfettiPieces(pieces);

    // Limpar após a animação
    const timer = setTimeout(() => {
      setConfettiPieces([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  // Função para renderizar diferentes formas de folhas
  const renderLeaf = (shape: string, color: string, size: number) => {
    const baseStyle = {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      filter: `drop-shadow(0 2px 4px ${color}40)`,
    };

    switch (shape) {
      case "leaf1":
        // Folha oval/elíptica
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: "50% 0 50% 50%",
              clipPath: "ellipse(60% 80% at 50% 50%)",
            }}
          />
        );
      case "leaf2":
        // Folha pontiaguda
        return (
          <div
            style={{
              ...baseStyle,
              clipPath: "polygon(50% 0%, 0% 100%, 50% 80%, 100% 100%)",
            }}
          />
        );
      case "leaf3":
        // Folha arredondada
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: "50% 0",
              clipPath: "ellipse(70% 90% at 30% 50%)",
            }}
          />
        );
      case "leaf4":
        // Folha com ponta
        return (
          <div
            style={{
              ...baseStyle,
              clipPath: "polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)",
            }}
          />
        );
      default:
        return <div style={baseStyle} />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
          }}
          initial={{
            y: piece.y,
            x: 0,
            rotate: piece.rotation,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            y: piece.endY,
            x: piece.endX,
            rotate: piece.rotation + piece.rotationSpeed * (Math.random() > 0.5 ? 1 : -1),
            opacity: [1, 1, 0.8, 0],
            scale: [1, 1.1, 0.9, 0.7],
          }}
          transition={{
            duration: 2.5 + Math.random() * 2.5,
            delay: piece.delay,
            ease: [0.25, 0.46, 0.45, 0.94], // Ease out quad - movimento mais natural
          }}
        >
          {renderLeaf(piece.shape, piece.color, piece.size)}
        </motion.div>
      ))}
    </div>
  );
};

