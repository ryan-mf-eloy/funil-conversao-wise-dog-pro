"use client";

import { motion } from "motion/react";

interface HandWrittenTitleProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

function HandWrittenTitle({
  title = "Hand Written",
  subtitle = "Optional subtitle",
  className = "",
}: HandWrittenTitleProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 3, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto py-8 ${className}`}>
      <div className="relative text-center lg:text-left z-10 flex flex-col items-center lg:items-start justify-center">
        <div className="relative inline-block">
          <div className="absolute -inset-6 lg:-inset-10 -top-2 lg:-top-4">
            <motion.svg
              width="100%"
              height="100%"
              viewBox="-20 -10 1040 200"
              initial="hidden"
              animate="visible"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <title>Wise Dog Pro</title>
              <motion.path
                d="M 0 108 
                   C -5 38, 130 23, 430 27
                   C 470 28, 510 30, 550 32
                   C 700 37, 1000 47, 1005 104
                   C 1008 142, 990 157, 960 167
                   C 890 182, 790 184, 690 180
                   C 540 177, 390 174, 240 170
                   C 140 167, 30 148, 25 113
                   C 20 118, 10 123, -5 120"
                fill="none"
                strokeWidth="7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={draw}
                className="text-[#1C8C58] opacity-50"
              />
            </motion.svg>
          </div>
          <motion.h1
            className="relative text-4xl md:text-5xl lg:text-6xl text-[#2D2E29] tracking-tighter flex items-center gap-2 font-bold px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {title}
          </motion.h1>
        </div>
        {subtitle && (
          <motion.p
            className="text-lg md:text-xl text-[#6B7280] mt-3 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export { HandWrittenTitle };
