"use client";

import React, { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface Position {
  left: number;
  width: number;
  top: number;
  height: number;
  opacity: number;
}

interface TabProps {
  children: React.ReactNode;
  setPosition: (position: Position) => void;
  onClick: () => void;
  href?: string;
  isActive?: boolean;
  isExternal?: boolean;
}

interface SlideTabsProps {
  tabs?: (string | React.ReactNode)[];
  defaultTab?: number;
  onTabChange?: (index: number) => void;
  links?: string[];
  asLinks?: boolean;
  externalLinks?: boolean[];
}

export const SlideTabs: React.FC<SlideTabsProps> = ({
  tabs = ["Home", "Pricing", "Features", "Docs", "Blog"],
  defaultTab = 0,
  onTabChange,
  links,
  asLinks = false,
  externalLinks,
}) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
    opacity: 0,
  });

  const [selected, setSelected] = useState(defaultTab);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);
  const isScrollingProgrammatically = useRef(false);
  const pathname = usePathname();

  // Atualizar selected quando defaultTab mudar
  useEffect(() => {
    setSelected(defaultTab);
  }, [defaultTab]);

  // Detectar página atual quando não há links de âncora (páginas externas)
  useEffect(() => {
    if (!links || links.length === 0) return;
    
    // Se os links não são âncoras, verificar qual corresponde ao pathname atual
    const hasAnchorLinks = links.some(link => link && (link.startsWith("#") || link.includes("#")));
    
    if (!hasAnchorLinks) {
      // Procurar qual link corresponde ao pathname atual
      const currentIndex = links.findIndex(link => {
        if (!link) return false;
        // Comparar pathname com o link (removendo / do início se necessário)
        const linkPath = link.startsWith("/") ? link : `/${link}`;
        return pathname === linkPath || pathname === link;
      });
      
      if (currentIndex !== -1 && currentIndex !== selected) {
        setSelected(currentIndex);
      }
    }
  }, [pathname, links, selected]);

  // Detectar seção visível durante scroll manual
  useEffect(() => {
    if (!links || links.length === 0) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Ignorar se o scroll foi causado por clique no menu
      if (isScrollingProgrammatically.current) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const headerOffset = 150; // Altura do header + margem
        const scrollPosition = window.scrollY + headerOffset;

        // Verificar cada seção em ordem reversa (da última para a primeira)
        for (let i = links.length - 1; i >= 0; i--) {
          const link = links[i];
          if (link && (link.startsWith("#") || link.includes("#"))) {
            const hash = link.includes("#")
              ? link.split("#")[1]
              : link.substring(1);
            if (hash) {
              const element = document.getElementById(hash);
              if (element) {
                const elementTop = element.offsetTop;
                const elementBottom = elementTop + element.offsetHeight;

                if (
                  scrollPosition >= elementTop &&
                  scrollPosition < elementBottom
                ) {
                  setSelected((prev) => (prev !== i ? i : prev));
                  return;
                }
              }
            }
          }
        }

        // Se estiver no topo, selecionar o primeiro item (home)
        if (window.scrollY < 100) {
          setSelected((prev) => (prev !== 0 ? 0 : prev));
        }
      }, 100); // Debounce de 100ms
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Verificar posição inicial

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [links]);

  useEffect(() => {
    // Pequeno delay para garantir que o DOM foi atualizado
    const timer = setTimeout(() => {
      const selectedTab = tabsRef.current[selected];
      if (selectedTab) {
        const { width, left, top, height } =
          selectedTab.getBoundingClientRect();
        const parent = selectedTab.offsetParent as HTMLElement;
        const offsetLeft = parent ? selectedTab.offsetLeft : left;
        const offsetTop = parent ? selectedTab.offsetTop : top;
        const parentHeight = parent?.getBoundingClientRect().height || height;

        // Centralizar verticalmente considerando o padding do container (p-1 = 4px)
        const containerPadding = 4;
        const barHeight = Math.min(height, parentHeight - containerPadding * 2);
        const centeredTop = offsetTop + (height - barHeight) / 2;

        setPosition({
          left: offsetLeft,
          width,
          top: centeredTop,
          height: barHeight,
          opacity: 1,
        });
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [selected]);

  const handleTabClick = (index: number) => {
    setSelected(index);
    onTabChange?.(index);

    // Marcar que o scroll é programático
    isScrollingProgrammatically.current = true;

    // Navegação suave para âncoras
    if (links && links[index]) {
      const link = links[index];
      if (link === "#") {
        // Home - scroll para o topo
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          isScrollingProgrammatically.current = false;
        }, 1000);
      } else if (link.startsWith("#") || link.includes("#")) {
        const hash = link.includes("#")
          ? link.split("#")[1]
          : link.substring(1);
        if (hash) {
          const element = document.getElementById(hash);
          if (element) {
            const headerOffset = 100; // Altura do header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
            setTimeout(() => {
              isScrollingProgrammatically.current = false;
            }, 1000);
          }
        }
      } else {
        isScrollingProgrammatically.current = false;
      }
    } else {
      isScrollingProgrammatically.current = false;
    }
  };

  return (
    <ul
      onMouseLeave={() => {
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          const { width, height } = selectedTab.getBoundingClientRect();
          const parent = selectedTab.offsetParent as HTMLElement;
          const parentHeight = parent?.getBoundingClientRect().height || height;
          const containerPadding = 4;
          const centeredTop =
            selectedTab.offsetTop +
            (height - Math.min(height, parentHeight - containerPadding * 2)) /
              2;

          setPosition({
            left: selectedTab.offsetLeft,
            width,
            top: centeredTop,
            height: Math.min(height, parentHeight - containerPadding * 2),
            opacity: 1,
          });
        }
      }}
      className="relative mx-auto flex items-center w-fit rounded-full bg-white/60 backdrop-blur-sm p-1 pb-1.5 border border-[#D4C4A8]/30"
    >
      {tabs.map((tab, i) => (
        <Tab
          key={typeof tab === "string" ? tab : `tab-${i}`}
          ref={(el) => (tabsRef.current[i] = el)}
          setPosition={setPosition}
          onClick={() => handleTabClick(i)}
          href={asLinks && links?.[i] ? links[i] : undefined}
          isActive={selected === i}
          isExternal={externalLinks?.[i] || false}
        >
          {tab}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  (
    {
      children,
      setPosition,
      onClick,
      href,
      isActive = false,
      isExternal = false,
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent) => {
      if (href) {
        if (href === "#") {
          e.preventDefault();
          onClick();
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (
          href.startsWith("#") ||
          (href.startsWith("/") && href.includes("#"))
        ) {
          e.preventDefault();
          onClick();

          // Navegação suave para âncoras
          const hash = href.includes("#")
            ? href.split("#")[1]
            : href.substring(1);
          if (hash) {
            setTimeout(() => {
              const element = document.getElementById(hash);
              if (element) {
                const headerOffset = 100; // Altura do header + margem
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition =
                  elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
            }, 100);
          }
        } else if (href.startsWith("/")) {
          // Para rotas normais ou links externos
          if (isExternal) {
            // Link externo - abrir em nova aba
            window.open(href, "_blank", "noopener,noreferrer");
            onClick();
          } else {
            // Navegação interna
            onClick();
          }
        } else if (isExternal && href) {
          // Link externo completo
          e.preventDefault();
          window.open(href, "_blank", "noopener,noreferrer");
          onClick();
        } else {
          e.preventDefault();
          onClick();
        }
      } else {
        onClick();
      }
    };

    const content = (
      <span
        onMouseEnter={() => {
          if (!ref || typeof ref === "function") return;
          if (!ref.current) return;

          const { width, height } = ref.current.getBoundingClientRect();
          const parent = ref.current.offsetParent as HTMLElement;
          const parentHeight = parent?.getBoundingClientRect().height || height;
          const containerPadding = 4;
          const barHeight = Math.min(
            height,
            parentHeight - containerPadding * 2
          );
          const centeredTop = ref.current.offsetTop + (height - barHeight) / 2;

          setPosition({
            left: ref.current.offsetLeft,
            width,
            top: centeredTop,
            height: barHeight,
            opacity: 1,
          });
        }}
        className={cn(
          "block transition-colors duration-200 flex items-center justify-center",
          isActive ? "text-white" : "text-[#6B7280] mix-blend-difference"
        )}
      >
        {children}
      </span>
    );

    return (
      <li
        ref={ref}
        onClick={handleClick}
        className="relative z-10 flex items-center justify-center cursor-pointer px-2 py-1 text-[10px] uppercase whitespace-nowrap md:px-3 md:py-1.5 md:text-xs"
      >
        {href ? (
          <a
            href={href}
            onClick={handleClick}
            className="block"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {content}
          </a>
        ) : (
          content
        )}
      </li>
    );
  }
);

Tab.displayName = "Tab";

interface CursorProps {
  position: Position;
}

const Cursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        top: position.top,
        height: position.height || 24,
        opacity: position.opacity,
      }}
      className="absolute z-0 rounded-full bg-[#1C8C58]"
      style={{
        height: position.height || 24,
      }}
    />
  );
};
