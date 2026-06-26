"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useTranslations } from "next-intl";

const cards = [
  {
    code: "[ SYSTEM_LAUNCH // 01 ]",
    title: "01 // Dijital Dünyadaki Sınırlarınız",
    description:
      "Dünyanın en iyi ürününe veya hizmetine sahip olabilirsiniz; ancak doğru bir dijital vitrininiz yoksa sadece kendi çevrenizde dönersiniz. Next.js ve modern web teknolojileriyle, işletmenizi sadece erişilebilir kılmıyoruz; ona küresel standartlarda, hızlı ve prestijli bir dijital kimlik kazandırıyoruz.",
  },
  {
    code: "[ MOBILE_DEPLOY // 02 ]",
    title: "02 // Her Ekranda, Her An Yanlarında",
    description:
      "Dünya artık mobilde dönüyor. Kullanıcılarınızın cebine giremediğiniz her an, büyük bir pazarı rakiplerinize bırakıyorsunuz demektir. iOS ve Android platformları için yüksek performanslı, cihaz çeşitliliğine uyumlu ve store süreçleri eksiksiz yönetilmiş mobil uygulamalarla işinizi her an ulaşılabilir kılıyoruz.",
  },
  {
    code: "[ NETWORK_SETUP // 03 ]",
    title: "03 // Aracıları Devre Dışı Bırakın",
    description:
      "Sürekli yüksek komisyon ödediğiniz platformlara bağımlı kalmak, kendi işinizde kiracı olmaktır. İhtiyacınıza özel, güvenli, hızlı ve ölçeklenebilir e-ticaret altyapılarıyla dijital mağazanızı kuruyoruz. Tüm kontrolü ve geliri kendi elinizde toplayın.",
  },
  {
    code: "[ CORE_FLOW // 04 ]",
    title: "04 // İşletmenize Özel SaaS Çözümleri",
    description:
      "Hazır yazılımların sınırlarına sıkışıp kalmayın. Şirketinizin operasyonel yükünü hafifletecek, süreçlerinizi buluta taşıyacak ve işinizi her yerden yönetmenizi sağlayacak web tabanlı (SaaS) yönetim panelleri ve otomasyonlar geliştiriyoruz. Kendi kurallarınızı kendiniz yazın.",
  },
  {
    code: "[ AI_INTEGRATION // 05 ]",
    title: "05 // Operasyonel Zeka ve Yapay Zeka",
    description:
      "Excel tabloları, manuel veri girişleri ve insan hatasına açık operasyonlar işinizi yavaşlatır. Sistemlerinize akıllı kod blokları entegre ediyor, verilerinizi analiz eden ve rutin işleri tamamen devralan yapay zeka çözümleri kuruyoruz. Siz vizyona odaklanın, rutin işleri sistem halletsin.",
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
            className="font-black leading-[1.1] mb-10 w-full"
            style={{ 
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 8vw, 3.75rem)"
            }}
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

        </div>

        {/* Right — Scrollable Cards */}
        <div className="lg:w-7/12 flex flex-col gap-8 pb-10">
          {cards.map((card, index) => {
            const isLast = index === cards.length - 1;
            return (
            <div
              key={card.code}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-2xl transition-all duration-500 hover:bg-[#0a0f0a] hover:border-[var(--accent)]/30 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(200,255,0,0.06)] w-full flex flex-col items-center justify-center text-center overflow-hidden"
              style={{ padding: "40px 24px" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="mb-6">
                <span 
                  className="text-[11px] font-mono tracking-[0.25em] text-[var(--accent)]/50 group-hover:text-[var(--accent)] group-hover:drop-shadow-[0_0_8px_rgba(200,255,0,0.4)] transition-all duration-300 rounded-full border border-[var(--accent)]/10 bg-[var(--accent)]/5"
                  style={{ padding: "8px 20px" }}
                >
                  {card.code}
                </span>
              </div>
              <h3
                className="text-[22px] md:text-3xl font-bold mb-5 group-hover:text-white transition-colors duration-300 max-w-lg w-full mx-auto"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                  lineHeight: "1.3"
                }}
              >
                {t(`card_${index + 1}_title` as any)}
              </h3>
              <p
                className="text-[15px] md:text-base leading-relaxed text-white/60 group-hover:text-white/80 transition-colors duration-300 max-w-2xl w-full mx-auto"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t(`card_${index + 1}_desc` as any)}
              </p>

              <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                <span className="text-[10px] font-mono text-[var(--accent)]/60 tracking-wider">
                  {isLast ? (t("system_ready" as any) || "CORE SYSTEM READY") : (t("swipe_for_more" as any) || "DEVAMI İÇİN KAYDIRIN")}
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
