import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantStyles = {
  primary: "bg-[#1C8C58] text-white hover:bg-[#156B43]",
  secondary: "bg-white text-[#1C8C58] hover:bg-gray-50",
  outline: "border-2 border-[#1C8C58] text-[#1C8C58] hover:bg-[#1C8C58]/5",
  ghost: "text-[#6B7280] hover:text-[#1C8C58] hover:bg-[#FAFAF9]",
};

const sizeStyles = {
  sm: "px-6 py-2.5 text-sm",
  md: "px-8 py-3.5 text-base",
  lg: "px-10 py-4 text-lg",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "font-semibold rounded-lg transition-all shadow-md hover:shadow-lg",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

