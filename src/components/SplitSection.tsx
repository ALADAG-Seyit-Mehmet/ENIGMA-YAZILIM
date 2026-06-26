"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useTranslations } from "next-intl";

const cards = [
  {
    code: "[ SYSTEM_ERROR // 01 ]",
    title: "01 // Google'da Yoksan, Aslında Yoksun",
    description:
      "İster şehrin en lüks caddesinde dükkanın olsun, ister en kaliteli ürünü sat. İnsanlar seni internette arattığında bulamıyorsa, o an sadece rakiplerin için çalışıyorsun demektir. Dijital vitrini olmayan işletme, kapısı kilitli dükkana benzer.",
  },
  {
    code: "[ ACCESS_DENIED // 02 ]",
    title: "02 // Ciroyu Ortaklarla Bölüşmek",
    description:
      "Yemek sepetlerine, emlak sitelerine veya büyük pazaryerlerine her ay binlerce lira komisyon yediriyorsun. Kendi yazılım otomasyonuna sahip olmadığın her gün, kendi işinin işçisi, aracı platformların gizli ortağı olursun.",
  },
  {
    code: "[ CRITICAL_WARNING // 03 ]",
    title: "03 // Manuel İşlerin Gizli Maliyeti",
    description:
      "'Biz işleri yıllardır böyle çözüyoruz' dediğin o Excel tabloları, defter notları aslında her gün sana zaman ve para kaybettiriyor. Süreçlerin otomatiğe bağlanmadıysa, insan hatası yüzünden para kaybetmeye mahkumsun demektir.",
  },
];

export default function SplitSection() {
  const t = useTranslations("SplitSection");
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [time, setTime] = useState({ h: "00", m: "00", s: "00", ms: "00" });

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();
      const ms = Math.floor(now.getMilliseconds() / 10);

      setTime({
        h: h.toString().padStart(2, "0"),
        m: m.toString().padStart(2, "0"),
        s: s.toString().padStart(2, "0"),
        ms: ms.toString().padStart(2, "0"),
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // GSAP Giriş Animasyonları (Kartlar)

  // Kartlar: giriş animasyonu (GSAP)
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: -40,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      id="split"
      className="relative z-10 w-full py-16 lg:py-24 px-6 flex justify-center"
    >
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left — Sticky */}
        <div
          ref={leftRef}
          className="lg:w-5/12 text-center lg:text-left flex flex-col items-center lg:items-start z-20 h-fit lg:sticky lg:top-32"
        >
          <div className="mb-8">
            <span
              className="text-[11px] tracking-[0.35em] uppercase rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 inline-block"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--accent)",
                padding: "10px 24px"
              }}
            >
              {t("time_never_stops")}
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="gradient-text-white">{t("title_1")}</span>
            <br />
            <span className="gradient-text">{t("title_2")}</span>
          </h2>

          {/* Chronometer */}
          <div
            className="glow-pulse inline-block px-8 py-5 rounded-2xl backdrop-blur-sm"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "var(--accent)",
              background: "rgba(200, 255, 0, 0.03)",
              border: "1px solid rgba(200, 255, 0, 0.12)",
              letterSpacing: "0.05em",
            }}
          >
            <span>{time.h}</span>
            <span className="opacity-40 mx-1.5">:</span>
            <span>{time.m}</span>
            <span className="opacity-40 mx-1.5">:</span>
            <span>{time.s}</span>
            <span className="opacity-40 mx-1.5">:</span>
            <span className="text-[0.7em] opacity-60">{time.ms}</span>
          </div>

          <p
            className="mt-8 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
            }}
          >
            {t("description")}
          </p>

          <div className="hidden lg:flex items-center gap-3 mt-8">
            <div className="w-8 h-[1px] bg-gradient-to-r from-[var(--accent)] to-transparent" />
            <span className="text-[10px] font-mono text-white/20 tracking-widest">
              {t("scroll")}
            </span>
          </div>
        </div>

        {/* Right — Scrollable Cards */}
        <div className="lg:w-7/12 flex flex-col gap-8 pb-10">
          {[1, 2, 3].map((num) => {
            const code = num === 1 ? "[ SYSTEM_ERROR // 01 ]" : num === 2 ? "[ ACCESS_DENIED // 02 ]" : "[ CRITICAL_WARNING // 03 ]";
            return (
            <div
              key={code}
              ref={(el) => {
                cardRefs.current[num - 1] = el;
              }}
              className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-6 md:p-10 rounded-2xl transition-all duration-500 hover:bg-[#0a0f0a] hover:border-[var(--accent)]/30 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(200,255,0,0.06)] w-full flex flex-col items-center justify-center text-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="mb-6">
                <span 
                  className="text-[11px] font-mono tracking-[0.25em] text-[var(--accent)]/50 group-hover:text-[var(--accent)] group-hover:drop-shadow-[0_0_8px_rgba(200,255,0,0.4)] transition-all duration-300 rounded-full border border-[var(--accent)]/10 bg-[var(--accent)]/5"
                  style={{ padding: "8px 20px" }}
                >
                  {code}
                </span>
              </div>
              <h3
                className="text-2xl md:text-3xl font-bold mb-5 group-hover:text-white transition-colors duration-300 max-w-lg mx-auto leading-snug"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                {t(`card_${num}_title`)}
              </h3>
              <p
                className="text-sm md:text-base leading-relaxed text-white/60 group-hover:text-white/80 transition-colors duration-300 max-w-2xl mx-auto"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t(`card_${num}_desc`)}
              </p>

              <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                <span className="text-[10px] font-mono text-[var(--accent)]/60 tracking-wider">
                  {t("swipe_for_more")}
                </span>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
