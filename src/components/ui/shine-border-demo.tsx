"use client";

import { ShineBorder, Timeline } from "@/components/ui/shine-border";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ShineBorderDemo() {
  return (
    <section className="relative p-6">
      <ShineBorder
        borderWidth={3}
        className="border bg-white/5 shadow-2xl backdrop-blur-md dark:bg-black/5"
        color={["#FF007F", "#39FF14", "#00FFFF"]}
      >
        <h1 className="my-8 text-2xl md:text-2xl">Como Funciona?</h1>
        <div className="grid p-10 gap-6">
          <Timeline />
        </div>
        <div className="z-10 mt-6 flex flex-col items-center text-center text-primary">
          <h1 className="text-lg font-semibold md:text-4xl">
            Design anything you need
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            No credit card required.
          </p>
          <div className="mb-8 mt-4 grid gap-2 md:flex">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "default",
                }),
                "group rounded-[2rem] px-6 md:mt-4"
              )}
            >
              Get Started
              <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
            </Link>
            <Link
              target="_blank"
              href="https://cal.com/aliimam/designali"
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "outline",
                }),
                "group rounded-[2rem] px-6 md:mt-4"
              )}
            >
              Book a call
              <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 rounded-full bg-background opacity-40 blur-xl" />
      </ShineBorder>
    </section>
  );
}

