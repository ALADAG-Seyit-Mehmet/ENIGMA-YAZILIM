import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import SchemaMarkup from "@/components/SchemaMarkup";
import Script from "next/script";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
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
  authors: [{ name: "Enigma Yazılım", url: "https://enigmayazilim.com" }],
  creator: "Enigma Yazılım",
  publisher: "Enigma Yazılım",
  alternates: {
    canonical: "/",
    languages: {
      "tr": "/tr",
      "en": "/en",
      "x-default": "/tr",
    },
  },
  openGraph: {
    title: "ENIGMA YAZILIM",
    description: "Dijital dünyada kalıcı mülkler inşa ediyoruz.",
    type: "website",
    siteName: "Enigma Yazılım",
    images: [
      {
        url: "/enigma-hero.png",
        width: 1200,
        height: 630,
        alt: "ENIGMA YAZILIM — Dijital Mimarlık Atölyesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ENIGMA YAZILIM",
    description: "Dijital dünyada kalıcı mülkler inşa ediyoruz.",
    images: ["/enigma-hero.png"],
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
      <head>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xffifjgh58");
          `}
        </Script>
        
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-GYQQXL927F" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GYQQXL927F');
          `}
        </Script>
      </head>
      <body className="min-h-full bg-[#050505]">
        <SchemaMarkup />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll />
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
