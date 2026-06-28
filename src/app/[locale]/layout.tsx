import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://enigmayazilim.com"),
  title: "ENIGMA YAZILIM — Dijital Dünyada Kalıcı Mülkler İnşa Ediyoruz",
  description:
    "Kod yazmıyoruz, dijital dünyada kalıcı mülkler inşa ediyoruz. Geleneksel ezberleri bozmak ve işletmenizi geleceğe taşımak için buradayız. Niş domain gücü, kalıcı SEO mimarisi ve sektörel dijital dönüşüm.",
  keywords: [
    "Enigma yazılım",
    "dijital dönüşüm",
    "web geliştirme",
    "SEO",
    "niş domain",
  ],
  openGraph: {
    title: "ENIGMA YAZILIM",
    description: "Dijital dünyada kalıcı mülkler inşa ediyoruz.",
    type: "website",
    images: [
      {
        url: "/enigma-hero.png",
        width: 1200,
        height: 630,
        alt: "ENIGMA YAZILIM — Dijital Mimarlık Atölyesi",
      },
    ],
  },
};

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-[#050505]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll />
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
