"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onStartClick?: () => void;
  variant?: "default" | "contact";
  showBackButton?: boolean;
  backHref?: string;
  hideAnchorLinks?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onStartClick,
  variant = "default",
  showBackButton = false,
  backHref = "/",
  hideAnchorLinks = false,
}) => {
  const isContactVariant = variant === "contact";
  const pathname = usePathname();

  // Determinar qual tab deve estar ativa quando hideAnchorLinks é true
  const getActiveTabIndex = () => {
    if (!hideAnchorLinks) return 0;

    if (pathname === "/sobre-nos") return 0;
    if (pathname === "/contato") return 1;
    if (pathname === "/blog") return 2;
    return 0;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-xl",
        isContactVariant ? "bg-[#EFE988]" : "bg-white/90"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 bg-[#1C8C58] rounded-xl flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/app-icon.webp"
              alt="Wise Dog Pro"
              width={40}
              height={40}
              className="object-contain"
              unoptimized
            />
          </div>
          <span
            className={cn(
              "text-lg font-semibold tracking-tight",
              isContactVariant ? "text-[#000000]" : "text-[#2D2E29]"
            )}
          >
            Wise Dog Pro
          </span>
        </Link>
        <nav className="hidden md:flex items-center flex-1 justify-center mx-4 min-w-0">
          <SlideTabs
            tabs={
              hideAnchorLinks
                ? ["Sobre Nós", "Contato", "Blog"]
                : isContactVariant
                ? [
                    <Home key="home" className="w-4 h-4 md:w-4.5 md:h-4.5" />,
                    "Por que Escolher",
                    "Como Funciona",
                    "Depoimentos",
                    "FAQ",
                    "Sobre Nós",
                    "Contato",
                    "Blog",
                  ]
                : [
                    <Home key="home" className="w-4 h-4 md:w-4.5 md:h-4.5" />,
                    "Por que Escolher",
                    "Como Funciona",
                    "Depoimentos",
                    "FAQ",
                    "Sobre Nós",
                    "Contato",
                    "Blog",
                  ]
            }
            links={
              hideAnchorLinks
                ? ["/sobre-nos", "/contato", "/blog"]
                : isContactVariant
                ? [
                    "#",
                    "#por-que-escolher",
                    "#como-funciona",
                    "#depoimentos",
                    "#faq",
                    "/sobre-nos",
                    "/contato",
                    "/blog",
                  ]
                : [
                    "#",
                    "#por-que-escolher",
                    "#como-funciona",
                    "#depoimentos",
                    "#faq",
                    "/sobre-nos",
                    "/contato",
                    "/blog",
                  ]
            }
            externalLinks={
              hideAnchorLinks
                ? [false, false, false]
                : [
                    false, // Home
                    false, // Por que Escolher
                    false, // Como Funciona
                    false, // Depoimentos
                    false, // FAQ
                    false, // Sobre Nós
                    false, // Contato
                    false, // Blog
                  ]
            }
            asLinks={true}
            defaultTab={hideAnchorLinks ? getActiveTabIndex() : 0}
          />
        </nav>
        <div className="flex items-center gap-3 flex-shrink-0">
          {showBackButton ? (
            <Link href={backHref}>
              <Button
                variant="default"
                size="sm"
                className={
                  isContactVariant
                    ? "bg-[#000000] text-white hover:bg-[#1a1a1a] border-[#000000] shadow-[4px_4px_0px_0px_#000000]"
                    : ""
                }
              >
                Voltar
              </Button>
            </Link>
          ) : onStartClick ? (
            <Button
              onClick={onStartClick}
              variant="default"
              size="sm"
              className="font-bold px-4 py-2"
            >
              Começar Agora
            </Button>
          ) : (
            <Link href="/">
              <Button
                variant="default"
                size="sm"
                className="font-bold px-4 py-2"
              >
                Começar Agora
              </Button>
            </Link>
          )}
          {!showBackButton && (
            <Link href="/login" className="hidden sm:flex">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-[#6B7280] hover:text-[#1C8C58] hover:bg-transparent",
                  isContactVariant && "text-[#000000]/70 hover:text-[#1C8C58]"
                )}
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden md:inline">Entrar</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
