import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-[#D4C4A8]/20",
        hover && "hover:shadow-lg transition-all",
        className
      )}
    >
      {children}
    </div>
  );
};

