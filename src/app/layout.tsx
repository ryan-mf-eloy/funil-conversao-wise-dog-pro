import type { Metadata } from "next";
import { Space_Grotesk, Kalam } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../lib/fonts";
import { GlobalDevControls } from "@/components/dev/GlobalDevControls";
import { DevControlsProviderWrapper } from "@/components/dev/DevControlsProviderWrapper";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const kalam = Kalam({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Wise Dog Pro | Treinamento e cuidados com seu cão",
  description:
    "Plano de treinamento 100% personalizado com IA, chat especialista 24/7 e comunidade apaixonada",
  icons: {
    icon: [
      { url: "/assets/app-icon.webp", sizes: "any" },
      { url: "/assets/app-icon.webp", type: "image/webp" },
    ],
    apple: [
      { url: "/assets/app-icon.webp", sizes: "180x180", type: "image/webp" },
    ],
    shortcut: "/assets/app-icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script src="/lasy-bridge.js" strategy="beforeInteractive" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${kalam.variable} font-sans antialiased`}
      >
        <DevControlsProviderWrapper>
          {children}
          <GlobalDevControls />
        </DevControlsProviderWrapper>
      </body>
    </html>
  );
}
