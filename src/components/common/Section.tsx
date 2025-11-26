import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "light" | "gradient";
  id?: string;
}

const backgroundStyles = {
  white: "bg-white",
  light: "bg-[#FAFAF9]",
  gradient: "bg-gradient-to-br from-[#FAFAF9] to-[#F8F4EB]",
};

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = "white",
  id,
}) => {
  return (
    <section id={id} className={cn("py-28", backgroundStyles[background], className)}>
      {children}
    </section>
  );
};

