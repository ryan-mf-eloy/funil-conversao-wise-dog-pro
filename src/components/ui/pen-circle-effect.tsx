"use client";

import React from "react";
import { motion } from "framer-motion";

interface PenCircleEffectProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  color?: string;
}

export const PenCircleEffect: React.FC<PenCircleEffectProps> = ({
  children,
  className = "",
  delay = 0.5,
  duration = 2.5,
  color = "#1C8C58",
}) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration,
          ease: [0.42, 0, 0.58, 1], // ease-in-out mais natural
          delay,
        },
        opacity: { duration: 0.2, delay },
      },
    },
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* SVG com traçado circular orgânico - estilo mão livre */}
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 200"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        initial="hidden"
        animate="visible"
        style={{ overflow: "visible" }}
      >
        <motion.path
          d="M 5 20 
             C 2 10, 8 3, 18 5
             C 28 7, 40 11, 55 9
             C 75 7, 100 5, 130 7
             C 160 9, 190 11, 220 9
             C 250 7, 280 5, 310 7
             C 340 9, 370 11, 400 9
             C 430 7, 460 5, 490 7
             C 520 9, 550 11, 580 9
             C 610 7, 640 5, 670 7
             C 700 9, 730 11, 760 9
             C 790 7, 820 5, 850 7
             C 875 9, 895 13, 910 20
             C 920 25, 925 33, 927 43
             C 928 50, 928 58, 928 66
             C 928 74, 928 82, 928 90
             C 928 98, 928 106, 928 114
             C 928 122, 928 130, 928 138
             C 928 146, 925 154, 910 161
             C 895 166, 875 164, 850 162
             C 820 160, 790 158, 760 160
             C 730 162, 700 164, 670 162
             C 640 160, 610 158, 580 160
             C 550 162, 520 164, 490 162
             C 460 160, 430 158, 400 160
             C 370 162, 340 164, 310 162
             C 280 160, 250 158, 220 160
             C 190 162, 160 164, 130 162
             C 100 160, 75 158, 55 160
             C 40 162, 28 166, 18 164
             C 8 162, 3 154, 5 144
             C 7 134, 7 124, 7 114
             C 7 104, 7 94, 7 84
             C 7 74, 7 64, 7 54
             C 7 44, 7 34, 7 24
             C 7 20, 5 20, 5 20"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          style={{
            filter: "drop-shadow(0 1px 3px rgba(28, 140, 88, 0.2))",
          }}
        />
      </motion.svg>

      {/* Conteúdo */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
