"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { DIcons, ValidIcon } from "dicons";

type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * @name Shine Border
 * @description It is an animated background border effect component with easy to use and configurable props.
 * @param borderRadius defines the radius of the border.
 * @param borderWidth defines the width of the border.
 * @param duration defines the animation duration to be applied on the shining border
 * @param color a string or string array to define border color.
 * @param className defines the class name to be applied to the component
 * @param children contains react node elements.
 */
function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
  style,
}: ShineBorderProps) {
  // Cria gradiente com paleta do Wise Dog Pro
  // Verde → Verde Claro → Amarelo → Peach → Laranja → Verde
  const paletteColors = [
    "#1C8C58", // Verde Main
    "#5BA67B", // Verde Light
    "#FBBF24", // Amarelo
    "#FB923C", // Peach
    "#F97316", // Laranja Main
    "#1C8C58", // Volta ao Verde
  ];

  // Se color for array, usa as cores fornecidas, senão usa a paleta completa
  let colorValue: string;
  if (color instanceof Array && color.length > 0) {
    // Se forneceu cores, usa elas
    colorValue = color.join(",");
  } else {
    // Usa a paleta completa do app
    colorValue = paletteColors.join(",");
  }

  const borderId = React.useMemo(
    () => `shine-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .shine-border-${borderId}::before {
            content: "";
            position: absolute;
            inset: 0;
            aspect-ratio: 1;
            width: 100%;
            height: 100%;
            border-radius: ${borderRadius}px;
            background-image: radial-gradient(transparent,transparent, ${colorValue},transparent,transparent);
            background-size: 300% 300%;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            -webkit-mask-composite: xor;
            padding: ${borderWidth}px;
            will-change: background-position;
            animation: shine-pulse ${duration}s infinite linear;
          }
        `,
        }}
      />
      <div
        style={
          {
            "--border-radius": `${borderRadius}px`,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          `shine-border-${borderId} relative grid h-full w-full place-items-center rounded-3xl bg-transparent p-3 text-black dark:text-white`,
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

export function TimelineContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center gap-3 md:order-2">
      {children}
    </div>
  );
}

export function TimelineEvent({
  label,
  message,
  icon,
  isLast = false,
}: Event & {
  isLast?: boolean;
}) {
  const Icon = DIcons[icon.name];
  return (
    <div className="group relative -m-2 flex gap-4 border border-transparent p-2">
      <div className="relative">
        <div
          className={cn(
            "rounded-full border bg-background p-2",
            icon.borderColor
          )}
        >
          <Icon className={cn("h-4 w-4", icon.textColor)} />
        </div>
        {!isLast ? (
          <div className="absolute inset-x-0 mx-auto h-full w-[2px] bg-muted" />
        ) : null}
      </div>
      <div className="mt-1 flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-semibold">{label}</p>
        </div>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

interface Event {
  label: string;
  message: string;
  icon: {
    name: ValidIcon;
    textColor: string;
    borderColor: string;
  };
}

export function Timeline({ events }: { events?: Event[] }) {
  const defaultEvents: Event[] = [
    {
      label: "Choose Your Design",
      message:
        "Browse and select a design that fits your needs, then access your personalized dashboard.",
      icon: {
        name: "Shapes",
        textColor: "text-orange-500",
        borderColor: "border-orange-500/40",
      },
    },
    {
      label: "Provide Your Brief",
      message: "Share your design preferences and requirements with us.",
      icon: {
        name: "Send",
        textColor: "text-amber-500",
        borderColor: "border-amber-500/40",
      },
    },
    {
      label: "Receive Your Designs",
      message: "Get your initial designs within 48 hours.",
      icon: {
        name: "Check",
        textColor: "text-blue-500",
        borderColor: "border-blue-500/40",
      },
    },
    {
      label: "Request Revisions",
      message:
        "We're committed to perfection—request as many revisions as needed until you're satisfied.",
      icon: {
        name: "Repeat",
        textColor: "text-green-500",
        borderColor: "border-green-500/40",
      },
    },
    {
      label: "Get Final Files",
      message: "Once approved, we'll deliver the final files to you.",
      icon: {
        name: "Download",
        textColor: "text-green-500",
        borderColor: "border-green-500/40",
      },
    },
  ];

  const timelineEvents = events || defaultEvents;

  return (
    <div className="w-3xl">
      <TimelineContainer>
        {timelineEvents.map((event, i) => (
          <TimelineEvent
            key={event.message}
            isLast={i === timelineEvents.length - 1}
            {...event}
          />
        ))}
      </TimelineContainer>
    </div>
  );
}

export { ShineBorder };
