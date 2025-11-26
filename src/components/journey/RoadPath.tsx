"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RoadPathProps {
  lessonsCount: number;
  className?: string;
}

export const RoadPath: React.FC<RoadPathProps> = ({
  lessonsCount,
  className,
}) => {
  // Calcular altura total baseada no número de lições
  const totalHeight = lessonsCount * 250; // ~250px por lição

  return (
    <div className={cn("relative", className)} style={{ height: `${totalHeight}px` }}>
      {/* Estrada de Terra - SVG Path mais realista */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ overflow: "visible" }}
        viewBox={`0 0 12 ${totalHeight}`}
        preserveAspectRatio="none"
      >
        {/* Estrada principal - cor de terra com textura */}
        <motion.rect
          initial={{ height: 0 }}
          animate={{ height: totalHeight }}
          transition={{ duration: 2, ease: "easeInOut" }}
          x="0"
          y="0"
          width="12"
          fill="#8B7355"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
          }}
        />
        
        {/* Textura da estrada - linhas horizontais */}
        {Array.from({ length: Math.floor(totalHeight / 20) }).map((_, i) => (
          <motion.line
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1 + i * 0.05 }}
            x1="0"
            y1={i * 20}
            x2="12"
            y2={i * 20}
            stroke="#A68B5B"
            strokeWidth="0.5"
          />
        ))}
        
        {/* Bordas da estrada */}
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          x1="0"
          y1="0"
          x2="0"
          y2={totalHeight}
          stroke="#A68B5B"
          strokeWidth="1"
        />
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          x1="12"
          y1="0"
          x2="12"
          y2={totalHeight}
          stroke="#A68B5B"
          strokeWidth="1"
        />
      </svg>

      {/* Marcadores de distância - Pedras na estrada */}
      {Array.from({ length: Math.floor(lessonsCount / 2) }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + i * 0.1 }}
          className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#6B5D4F] border-2 border-[#8B7355] shadow-md z-10"
          style={{
            top: `${((i + 1) * 2 * 250) / totalHeight}%`,
          }}
        />
      ))}
    </div>
  );
};

