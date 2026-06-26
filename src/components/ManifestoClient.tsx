"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ManifestoClient() {
  const t = useTranslations("Manifesto");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.8;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setVideoFailed(true));
      }
    }
  }, []);

  return (
    <>
      {/* Background Video */}
      <div className="fixed inset-0 z-[-2] overflow-hidden bg-[#050505]">
        {!videoFailed && (
          <video
            ref={videoRef}
            playsInline
            muted
            loop
            autoPlay
            className="w-full h-full object-cover opacity-10"
          >
            <source src="/arkaplan_video.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <main
        className="relative z-10 pb-[150px] px-6 min-h-screen text-white flex flex-col items-center"
        style={{ paddingTop: "calc(var(--navbar-height) + 80px)" }}
      >
        <div className="max-w-5xl w-full">
          {/* Header Section */}
          <section className="flex flex-col items-center justify-center text-center w-full" style={{ marginBottom: "64px" }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03] backdrop-blur-sm" style={{ marginBottom: "48px" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span
                className="text-[11px] tracking-[0.25em] uppercase font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--accent)",
                }}
              >
                {t("badge")}
              </span>
            </div>
            <h1
              className="flex flex-col items-center justify-center text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter leading-[0.95]"
              style={{ fontFamily: "var(--font-display)", marginBottom: "24px" }}
            >
              <span className="gradient-text-white">{t("title_1")}</span>
              <span className="gradient-text">{t("title_2")}</span>
            </h1>
            <p className="text-lg md:text-2xl font-light text-white/60 max-w-max md:whitespace-nowrap text-center leading-relaxed">
              {t("subtitle")}
            </p>
          </section>

          {/* Banner Image */}
          <div className="w-full h-[300px] md:h-[400px] relative rounded-[2.5rem] overflow-hidden border border-white/[0.06] shadow-[0_0_80px_rgba(200,255,0,0.04)]" style={{ marginBottom: "64px" }}>
            <Image
              src="/enigma-hero.png"
              alt="Enigma Digital Transformation"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent opacity-95" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="w-12 h-[1px] bg-[var(--accent)]/40 mb-4" />
              <span className="text-[10px] font-mono text-white/30 tracking-widest">
                {t("banner_text")}
              </span>
            </div>
          </div>

          {/* Intro Text */}
          <div className="w-full flex justify-center px-4" style={{ marginTop: "96px", marginBottom: "128px" }}>
            <p className="max-w-4xl text-xl md:text-2xl text-white/50 leading-loose font-light text-center">
              {t("intro_text")}
            </p>
          </div>

          {/* Cards Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" style={{ marginBottom: "112px" }}>
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="group relative bg-[var(--accent)]/[0.02] backdrop-blur-md border border-[var(--accent)]/15 rounded-[2rem] transition-all duration-500 hover:bg-white/[0.03] hover:border-[var(--accent)]/25 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(200,255,0,0.04)] flex flex-col items-center justify-center text-center"
                style={{ padding: "48px 32px" }}
              >
                <div
                  className="absolute top-6 right-8 text-7xl font-black text-[var(--accent)]/[0.07] group-hover:text-[var(--accent)]/10 transition-colors duration-500 pointer-events-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {`0${num}`}
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/15 group-hover:scale-110 transition-transform duration-500" style={{ marginBottom: "20px" }}>
                    <span
                      className="text-[var(--accent)] font-bold text-sm"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {`0${num}`}
                    </span>
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-bold text-[var(--accent)] group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)", marginBottom: "12px" }}
                  >
                    {t(`card_${num}_title`)}
                  </h3>
                  <p className="text-white/50 leading-relaxed font-light text-sm md:text-base max-w-sm px-2">
                    {t(`card_${num}_desc`)}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Footer Quote */}
          <section className="relative w-full text-center" style={{ paddingTop: "64px", paddingBottom: "64px", marginTop: "16px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
            <div className="relative">
              <div
                className="text-6xl text-[var(--accent)]/20 mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;
              </div>
              <blockquote className="text-xl md:text-2xl font-light italic text-white/50 leading-relaxed max-w-4xl px-4" style={{ margin: "0 auto" }}>
                {t("footer_quote")}
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="w-8 h-[1px] bg-[var(--accent)]/30" />
                <span className="text-[10px] font-mono text-white/20 tracking-widest">
                  {t("enigma_yazilim")}
                </span>
                <div className="w-8 h-[1px] bg-[var(--accent)]/30" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
