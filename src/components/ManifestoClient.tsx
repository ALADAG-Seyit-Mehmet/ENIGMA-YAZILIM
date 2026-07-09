"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ManifestoClient() {
  const t = useTranslations("Manifesto");

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 z-[-2] overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <main
        className="relative z-10 pb-37.5 px-6 min-h-screen text-white flex flex-col items-center"
        style={{ paddingTop: "calc(var(--navbar-height) + 80px)" }}
      >
        <div className="max-w-5xl w-full">
          {/* Header Section */}
          <section className="flex flex-col items-center justify-center text-center w-full" style={{ marginBottom: "64px" }}>
            <div 
              className="inline-flex items-center rounded-full border border-(--accent)/20 bg-(--accent)/3 backdrop-blur-sm" 
              style={{ padding: "10px 24px", marginBottom: "48px", gap: "10px" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
              <span
                className="text-[11px] tracking-[0.25em] uppercase font-semibold mr-[-0.25em]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--accent)",
                }}
              >
                {t("badge")}
              </span>
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase"
              style={{ fontFamily: "var(--font-display)", marginBottom: "24px" }}
            >
              <span className="gradient-text-white">{t("title_1")}</span>
              <span className="text-white/20 mx-2 md:mx-3">{"// "}</span>
              <span className="gradient-text">{t("title_2")}</span>
            </h1>
            <p className="text-lg md:text-2xl font-light text-white/60 max-w-max md:whitespace-nowrap text-center leading-relaxed">
              {t("subtitle")}
            </p>
          </section>

          {/* Banner Image */}
          <div className="w-full h-75 md:h-100 relative rounded-[2.5rem] overflow-hidden border border-white/6 shadow-[0_0_80px_rgba(200,255,0,0.04)]" style={{ marginBottom: "64px" }}>
            <Image
              src="/enigma-hero.png"
              alt="Enigma Digital Transformation"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/50 to-transparent opacity-95" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="w-12 h-px bg-(--accent)/40 mb-4" />
              <span className="text-[10px] font-mono text-white/30 tracking-widest">
                {t("banner_text")}
              </span>
            </div>
          </div>

          {/* Intro Text */}
          <div className="w-full flex justify-center px-6 md:px-4" style={{ marginTop: "64px", marginBottom: "96px" }}>
            <p className="max-w-4xl text-[17px] md:text-2xl text-white/50 leading-relaxed md:leading-loose font-light text-center">
              {t("intro_text")}
            </p>
          </div>

          {/* Cards Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" style={{ marginBottom: "112px" }}>
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="group relative bg-(--accent)/2 backdrop-blur-md border border-(--accent)/15 rounded-4xl transition-all duration-500 hover:bg-white/3 hover:border-(--accent)/25 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(200,255,0,0.04)] flex flex-col items-center justify-center text-center w-full"
                style={{ padding: "40px 24px" }}
              >
                <div
                  className="absolute top-6 right-8 text-7xl font-black text-(--accent)/[0.07] group-hover:text-(--accent)/10 transition-colors duration-500 pointer-events-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {`0${num}`}
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="w-11 h-11 rounded-xl bg-(--accent)/10 flex items-center justify-center border border-(--accent)/15 group-hover:scale-110 transition-transform duration-500" style={{ marginBottom: "20px" }}>
                    <span
                      className="text-accent font-bold text-sm"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {`0${num}`}
                    </span>
                  </div>
                  <h3
                    className="text-[22px] md:text-2xl font-bold text-accent group-hover:text-white transition-colors duration-300 w-full"
                    style={{ fontFamily: "var(--font-display)", marginBottom: "16px", lineHeight: "1.3" }}
                  >
                    {t(`card_${num}_title`)}
                  </h3>
                  <p className="text-white/50 leading-relaxed font-light text-[15px] md:text-base max-w-sm w-full">
                    {t(`card_${num}_desc`)}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Footer Quote */}
          <section className="relative w-full text-center" style={{ paddingTop: "64px", paddingBottom: "64px", marginTop: "16px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-linear-to-r from-transparent via-(--accent)/20 to-transparent" />
            <div className="relative">
              <div
                className="text-6xl text-(--accent)/20 mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;
              </div>
              <blockquote className="text-[17px] md:text-2xl font-light italic text-white/50 leading-relaxed max-w-4xl px-8 md:px-4" style={{ margin: "0 auto" }}>
                {t("footer_quote")}
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-(--accent)/30" />
                <span className="text-[10px] font-mono text-white/20 tracking-widest">
                  {t("enigma_yazilim")}
                </span>
                <div className="w-8 h-px bg-(--accent)/30" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
