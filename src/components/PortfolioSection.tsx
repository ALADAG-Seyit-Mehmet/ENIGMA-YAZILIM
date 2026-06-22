"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const references = [
  { src: "/logos/logo1.jpg", alt: "Enigma Yazılım Referans 1" },
  { src: "/logos/logo3.jpg", alt: "Enigma Yazılım Referans 2" },
  { src: "/logos/logo6.jpg", alt: "Enigma Yazılım Referans 3" },
  { src: "/logos/logo2.jpg", alt: "Enigma Yazılım Referans 4" },
  { src: "/logos/logo4.jpg", alt: "Enigma Yazılım Referans 5" },
  { src: "/logos/logo5.jpg", alt: "Enigma Yazılım Referans 6" },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--accent)]/[0.02] blur-[120px] pointer-events-none" />

      <div
        ref={headingRef}
        className="text-center px-6 mb-12 md:mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03] mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span
            className="text-[11px] tracking-[0.25em] uppercase font-semibold"
            style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
          >
            REFERANSLAR
          </span>
        </div>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="gradient-text-white">
            Geleceği Birlikte İnşa Ettigimiz
          </span>
          <br />
          <span className="gradient-text">İş Ortaklarımız</span>
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div
        className="w-full max-w-[1400px] mx-auto relative z-10 marquee-wrapper overflow-hidden pb-10"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {/* Marquee Track */}
        <div className="marquee-track">
          {[...references, ...references, ...references].map((ref, idx) => (
            <div
              key={idx}
              className="mx-3 md:mx-6 flex items-center justify-center px-4 md:px-8 py-4 rounded-2xl bg-white/[0.01] backdrop-blur-md border border-white/5 hover:border-[var(--accent)]/30 transition-all duration-300 group cursor-default"
              style={{ minWidth: "160px", height: "100px" }}
            >
              <Image
                src={ref.src}
                alt={ref.alt}
                width={200}
                height={100}
                sizes="200px"
                className="w-full h-full object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{ mixBlendMode: "screen" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
