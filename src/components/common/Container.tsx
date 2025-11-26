import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = "xl",
}) => {
  return (
    <div className={cn("mx-auto px-6 lg:px-8", sizeStyles[size], className)}>
      {children}
    </div>
  );
};

