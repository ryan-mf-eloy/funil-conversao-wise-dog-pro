import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
  align?: "left" | "center" | "right";
}

const levelStyles = {
  1: "text-5xl sm:text-6xl lg:text-7xl font-bold",
  2: "text-4xl sm:text-5xl font-bold",
  3: "text-3xl md:text-4xl font-bold",
  4: "text-xl font-bold",
};

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  className,
  align = "center",
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={cn(
        "text-[#2D2E29] tracking-tight",
        levelStyles[level],
        alignStyles[align],
        className
      )}
    >
      {children}
    </Tag>
  );
};

