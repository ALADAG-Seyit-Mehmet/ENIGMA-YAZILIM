"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const cards = [
  {
    num: "01",
    title: "Çözüm Odaklı Yaklaşım",
    desc: "Sektörlerdeki zaman kayıplarını tespit eder, süreçleri pürüzsüz bir otomasyona dönüştürürüz.",
  },
  {
    num: "02",
    title: "Erişilebilir Teknoloji",
    desc: "İleri teknolojiyi devasa maliyetler olmadan, esnek ve bütçe dostu SaaS modelleriyle sunuyoruz.",
  },
  {
    num: "03",
    title: "Yüksek Performans",
    desc: "Hantal sistemlerin yerine, modern mimariler kurarak ışık hızında çalışan çözümler üretiyoruz.",
  },
  {
    num: "04",
    title: "Geleceği Kodluyoruz",
    desc: "Trendlerin her zaman bir adım önünde giderek, iş ortaklarımızı yarının teknolojisiyle buluşturuyoruz.",
  },
];

export default function ManifestoClient() {
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
          <section className="flex flex-col items-center justify-center text-center mb-24 md:mb-32 w-full">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03] mb-12 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span
                className="text-[11px] tracking-[0.25em] uppercase font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--accent)",
                }}
              >
                MANİFESTO
              </span>
            </div>
            <h1
              className="flex flex-col items-center justify-center text-5xl md:text-[5.5rem] lg:text-[7rem] font-black mb-12 tracking-tighter leading-[0.95]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="gradient-text-white">ENIGMA</span>
              <span className="gradient-text">MANIFESTO</span>
            </h1>
            <p className="text-lg md:text-2xl font-light text-white/60 max-w-max md:whitespace-nowrap text-center leading-relaxed">
              Biz şifreleri kırmak için değil; sektörün kurallarını yeniden
              yazmak için buradayız.
            </p>
          </section>

          {/* Banner Image */}
          <div className="w-full h-[400px] md:h-[600px] relative rounded-[2.5rem] overflow-hidden mb-20 md:mb-28 border border-white/[0.06] shadow-[0_0_80px_rgba(200,255,0,0.04)]">
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
                {"// ENIGMA DIGITAL TRANSFORMATION"}
              </span>
            </div>
          </div>

          {/* Intro Text */}
          <div className="w-full flex justify-center mt-16 md:mt-24 mb-24 md:mb-32 px-4">
            <p className="max-w-4xl text-xl md:text-2xl text-white/50 leading-loose font-light text-center">
              Enigma Yazılım, geleneksel sektörlerin kronikleşmiş sorunlarını
              çözmek, hantallaşmış iş süreçlerini dijitalleştirmek ve karmaşık
              operasyonları tek tıkla kolaylaştırmak amacıyla kurulmuş yeni
              nesil bir teknoloji stüdyosudur. Bizim için her sektör, optimize
              edilmeyi bekleyen büyük bir ekosistem; her iş problemi ise
              çözülmesi gereken bir şifredir.
            </p>
          </div>

          {/* Cards Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-28">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="group relative bg-[var(--accent)]/[0.02] backdrop-blur-md border border-[var(--accent)]/15 py-14 px-8 md:py-16 md:px-10 rounded-[2rem] transition-all duration-500 hover:bg-white/[0.03] hover:border-[var(--accent)]/25 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(200,255,0,0.04)] flex flex-col items-center justify-center text-center"
              >
                <div
                  className="absolute top-6 right-8 text-7xl font-black text-[var(--accent)]/[0.07] group-hover:text-[var(--accent)]/10 transition-colors duration-500 pointer-events-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {card.num}
                </div>

                <div className="relative z-10 mt-2 flex flex-col items-center justify-center h-full">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-7 border border-[var(--accent)]/15 group-hover:scale-110 transition-transform duration-500">
                    <span
                      className="text-[var(--accent)] font-bold text-sm"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {card.num}
                    </span>
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-bold mb-5 text-[var(--accent)] group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed font-light text-sm md:text-base max-w-sm px-2">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Footer Quote */}
          <section className="relative py-24 md:py-32 my-12 w-full text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
            <div className="relative">
              <div
                className="text-6xl text-[var(--accent)]/20 mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;
              </div>
              <blockquote className="text-xl md:text-2xl font-light italic text-white/50 leading-relaxed max-w-4xl mx-auto px-4">
                Müşterilerimiz için bir yazılım tedarikçisi değiliz; dijital
                dönüşüm yolculuğundaki en güçlü teknoloji partneriyiz.
                Görünmeyenin arkasındaki mühendislik, karmaşıklığın içindeki
                yalınlık.
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="w-8 h-[1px] bg-[var(--accent)]/30" />
                <span className="text-[10px] font-mono text-white/20 tracking-widest">
                  ENIGMA YAZILIM
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
