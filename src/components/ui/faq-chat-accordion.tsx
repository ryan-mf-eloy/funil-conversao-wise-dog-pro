"use client";

import * as React from "react";
import { motion } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export function FaqAccordion({
  data,
  className,
  timestamp = "Every day, 9:01 AM",
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <div className={cn("p-4", className)}>
      {timestamp && (
        <div className="mb-6 text-sm text-muted-foreground font-medium">{timestamp}</div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
        className="space-y-4"
      >
        {data.map((item) => (
          <Accordion.Item 
            value={item.id.toString()} 
            key={item.id} 
            className="mb-4"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-start gap-x-4">
                <div
                  className={cn(
                    "relative flex items-center space-x-3 rounded-xl transition-colors flex-1",
                    openItem === item.id.toString() 
                      ? "bg-primary/20 text-primary" 
                      : "bg-muted hover:bg-primary/10",
                    questionClassName
                  )}
                >
                  {item.icon && (
                    <span
                      className={cn(
                        "absolute text-2xl",
                        item.iconPosition === "right" ? "right-2 -bottom-2" : "left-2 -bottom-2"
                      )}
                      style={{
                        transform: item.iconPosition === "right" 
                          ? "rotate(12deg)" 
                          : "rotate(-12deg)",
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="font-medium leading-relaxed pr-8">{item.question}</span>
                </div>

                <span 
                  className={cn(
                    "text-muted-foreground flex-shrink-0 transition-colors",
                    openItem === item.id.toString() && "text-primary"
                  )}
                >
                  {openItem === item.id.toString() ? (
                    <Minus className="h-6 w-6" />
                  ) : (
                    <Plus className="h-6 w-6" />
                  )}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content asChild forceMount>
              <motion.div
                initial="collapsed"
                animate={openItem === item.id.toString() ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="ml-4 mt-3 md:ml-8">
                  <div
                    className={cn(
                      "relative rounded-2xl bg-primary text-primary-foreground whitespace-pre-line",
                      answerClassName
                    )}
                  >
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}

