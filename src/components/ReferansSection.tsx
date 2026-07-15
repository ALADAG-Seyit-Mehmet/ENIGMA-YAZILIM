"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useTranslations } from "next-intl";

const references = [
  { src: "/logos/logo1.jpg", alt: "Enigma Yazılım Referans 1" },
  { src: "/logos/logo3.jpg", alt: "Enigma Yazılım Referans 2" },
  { src: "/logos/logo6.jpg", alt: "Enigma Yazılım Referans 3" },
  { src: "/logos/logo2.jpg", alt: "Enigma Yazılım Referans 4" },
  { src: "/logos/logo4.jpg", alt: "Enigma Yazılım Referans 5" },
  { src: "/logos/logo5.jpg", alt: "Enigma Yazılım Referans 6" },
  { src: "/logos/ktu_logo_dark.png", alt: "Konya Teknik Üniversitesi" },
];

export default function ReferansSection() {
  const t = useTranslations("Referanslar");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative z-10 overflow-hidden py-16 flex flex-col items-center justify-center"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full bg-(--accent)/2 blur-[120px] pointer-events-none" />

      <div
        ref={headingRef}
        className="text-center px-6 relative z-10"
        style={{ marginBottom: "1.5rem" }}
      >
        <div 
          className="inline-flex items-center rounded-full border border-(--accent)/20 bg-(--accent)/3 backdrop-blur-sm"
          style={{ padding: '10px 24px', marginBottom: '20px', gap: '10px' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
          <span
            className="text-[11px] tracking-[0.25em] uppercase font-semibold mr-[-0.25em]"
            style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
          >
            {t("badge")}
          </span>
        </div>
        <h2 className="flex flex-col w-fit mx-auto gap-1 mb-2">
          <div className="flex justify-between w-full text-lg md:text-xl font-medium text-white/70 tracking-wide">
            {String(t("subtitle")).split(" ").map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </div>
          <span 
            className="text-3xl md:text-4xl font-black text-accent tracking-[0.08em] mr-[-0.08em] text-center w-full"
            style={{ wordSpacing: "8px" }}
          >
            {t("title")}
          </span>
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div
        className="w-full max-w-350 mx-auto relative z-10 marquee-wrapper overflow-hidden pb-16 pt-8"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {/* Marquee Track */}
        <div className="marquee-track">
          {[...references, ...references, ...references].map((ref, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center px-6 py-4 bg-[#121212] border border-white/4 overflow-hidden"
              style={{ 
                minWidth: "180px", 
                height: "100px",
                margin: "0 16px",
                borderRadius: "20px" 
              }}
            >
              <Image
                src={ref.src}
                alt={ref.alt}
                width={200}
                height={100}
                quality={100}
                unoptimized={true}
                priority={true}
                className="w-full h-full object-contain opacity-80"
                style={{ mixBlendMode: "lighten" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
