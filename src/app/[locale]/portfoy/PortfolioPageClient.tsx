"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

/* ─── Portfolio Data ─── */
interface PortfolioItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  accentColor: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Akana Yacht",
    subtitle: "Yat & Denizcilik Web Sitesi",
    description:
      "Lüks yat kiralama ve denizcilik hizmetlerini dijital dünyaya taşıyan premium kurumsal web sitesi.",
    image: "/portfolio/akana-yacht.png",
    link: "https://www.akanayacht.com/tr",
    accentColor: "#4fc3f7",
  },
  {
    id: 2,
    title: "Butik Otel",
    subtitle: "Otel & Konaklama Web Sitesi",
    description:
      "Bodrum'un eşsiz atmosferini dijital dünyaya taşıyan, modern ve şık rezervasyon odaklı butik otel web projesi.",
    image: "/portfolio/bodrum-butik.png",
    link: "https://bodrumbutikotel.com/",
    accentColor: "#00acc1",
  },
  {
    id: 3,
    title: "Sedirkon Mobilya",
    subtitle: "Mobilya & E-Ticaret Platformu",
    description:
      "Sektörün öncü mobilya markası Sedirkon için tasarlanan, modern, estetik ve kullanıcı dostu yeni web platformu. (Şu anda yapım aşamasındadır 🚧)",
    image: "/portfolio/sedirkon.png",
    link: "#",
    accentColor: "#f59e0b",
  },
];

/* ═══════════════════════════════════════════════
   DESKTOP 3D CAROUSEL
   ═══════════════════════════════════════════════ */
function DesktopCarousel({ items }: { items: PortfolioItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);

  const goTo = useCallback(
    (direction: "prev" | "next") => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      setTimeout(() => (isTransitioning.current = false), 600);

      setActiveIndex((prev) => {
        if (direction === "next") return (prev + 1) % items.length;
        return (prev - 1 + items.length) % items.length;
      });
    },
    [items.length]
  );

  /* Keyboard navigation */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo("prev");
      if (e.key === "ArrowRight") goTo("next");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goTo]);

  /* Mouse wheel horizontal scroll */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 30) goTo("next");
        if (e.deltaX < -30) goTo("prev");
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [goTo]);

  /* Card positioning with 3D depth */
  const getCardStyle = (index: number): React.CSSProperties => {
    const total = items.length;
    let offset = index - activeIndex;

    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const isActive = offset === 0;
    const absOffset = Math.abs(offset);

    return {
      transform: `
        translateX(${offset * 420}px) 
        scale(${isActive ? 1 : 0.78 - absOffset * 0.05}) 
        perspective(1200px)
        rotateY(${offset * -8}deg)
      `,
      zIndex: 10 - absOffset,
      opacity: absOffset > 2 ? 0 : isActive ? 1 : 0.45 - absOffset * 0.1,
      filter: isActive ? "none" : `blur(${absOffset * 2}px)`,
      pointerEvents: isActive ? "auto" : "none",
      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    } as React.CSSProperties;
  };

  return (
    <div
      ref={containerRef}
      className="hidden md:flex items-center justify-center w-full relative"
      style={{ minHeight: "620px" }}
    >
      {/* Left Arrow */}
      <button
        type="button"
        onClick={() => goTo("prev")}
        className="absolute z-30 flex items-center justify-center group"
        style={{
          left: "6%",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          WebkitBackdropFilter: "blur(8px)",
          backdropFilter: "blur(8px)",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        aria-label="Önceki proje"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.background = "rgba(200,255,0,0.08)";
          e.currentTarget.style.boxShadow = "0 0 25px rgba(200,255,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/50 group-hover:text-[var(--accent)] transition-colors"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Cards */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: "100%", height: "580px" }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="absolute"
            style={getCardStyle(index)}
          >
            <PortfolioCard item={item} isActive={index === activeIndex} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={() => goTo("next")}
        className="absolute z-30 flex items-center justify-center group"
        style={{
          right: "6%",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          WebkitBackdropFilter: "blur(8px)",
          backdropFilter: "blur(8px)",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        aria-label="Sonraki proje"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.background = "rgba(200,255,0,0.08)";
          e.currentTarget.style.boxShadow = "0 0 25px rgba(200,255,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/50 group-hover:text-[var(--accent)] transition-colors"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-0 flex items-center gap-3 z-20">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="transition-all duration-500"
            style={{
              width: index === activeIndex ? "32px" : "10px",
              height: "10px",
              borderRadius: "999px",
              background:
                index === activeIndex
                  ? "var(--accent)"
                  : "rgba(255,255,255,0.15)",
              border: "none",
              cursor: "pointer",
              boxShadow:
                index === activeIndex
                  ? "0 0 15px rgba(200,255,0,0.4)"
                  : "none",
            }}
            aria-label={`Proje ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DESKTOP PORTFOLIO CARD
   ═══════════════════════════════════════════════ */
function PortfolioCard({
  item,
  isActive,
}: {
  item: PortfolioItem;
  isActive: boolean;
}) {
  const t = useTranslations("Portfolio");
  return (
    <div
      className="relative overflow-hidden group"
      style={{
        width: "760px",
        height: "560px",
        borderRadius: "20px",
        background: "rgba(8, 12, 20, 0.85)",
        border: `1px solid ${
          isActive
            ? "rgba(200, 255, 0, 0.15)"
            : "rgba(255, 255, 255, 0.06)"
        }`,
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)",
        boxShadow: isActive
          ? `0 0 60px rgba(200,255,0,0.06), 0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`
          : "0 15px 40px rgba(0,0,0,0.3)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Glow on hover */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${item.accentColor}10 0%, transparent 40%, transparent 60%, rgba(200,255,0,0.05) 100%)`,
          }}
        />
      )}

      {/* Screenshot Area */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "380px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Monitor frame */}
        <div
          className="absolute inset-3 rounded-[14px] overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#0a0a0a",
          }}
        >
          {/* Screenshot */}
          {item.id === 3 ? (
            <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
              <div className="flex flex-col items-center gap-4 text-center px-4 relative z-10">
                <div className="w-16 h-16 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                </div>
                <div>
                  <h4 className="text-[var(--text-primary)] text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>Yapım Aşamasında</h4>
                  <p className="text-[var(--text-secondary)] text-sm mt-1" style={{ fontFamily: "var(--font-body)" }}>Arayüz kodlaması devam ediyor</p>
                </div>
              </div>
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
              draggable={false}
            />
          )}
        </div>

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "80px",
            background: "linear-gradient(to top, rgba(8,12,20,0.95), transparent)",
          }}
        />
      </div>

      {/* Info Area */}
      <div className="flex items-end justify-between" style={{ height: "180px", padding: "0 36px 36px 36px" }}>
        {/* Left: Info */}
        <div className="flex flex-col gap-2 max-w-[460px]">
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-bold"
            style={{ color: item.accentColor, opacity: 0.8 }}
          >
            {t(`item_${item.id}_subtitle` as any)}
          </span>
          <span
            className="w-max text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            {item.title}
          </span>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)", opacity: 0.7 }}
          >
            {t(`item_${item.id}_description` as any)}
          </p>
        </div>

        {/* Right: CTA */}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 backdrop-blur-sm transition-all duration-300 hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/50 group"
          style={{ padding: "8px 20px", gap: "8px" }}
        >
          <span
            className="whitespace-nowrap text-sm font-medium tracking-[0.05em] text-[var(--accent)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("view_project")}
          </span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MOBILE VERTICAL LAYOUT
   ═══════════════════════════════════════════════ */
function MobilePortfolio({ items }: { items: PortfolioItem[] }) {
  return (
    <div
      className="flex md:hidden flex-col w-full"
      style={{ gap: "24px", padding: "0 16px" }}
    >
      {items.map((item) => (
        <div key={item.id} className="w-full shrink-0" style={{ scrollSnapAlign: "center" }}>
          <MobilePortfolioCard item={item} />
        </div>
      ))}
    </div>
  );
}

function MobilePortfolioCard({ item }: { item: PortfolioItem }) {
  const t = useTranslations("Portfolio");
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "100%",
        borderRadius: "18px",
        background: "rgba(8, 12, 20, 0.85)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        WebkitBackdropFilter: "blur(16px)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 15px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Screenshot */}
      <div
        className="relative overflow-hidden"
        style={{ height: "280px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div
          className="absolute inset-2 rounded-[12px] overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#0a0a0a" }}
        >
          {item.id === 3 ? (
            <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
              <div className="flex flex-col items-center gap-3 text-center px-4 relative z-10">
                <div className="w-12 h-12 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                </div>
                <div>
                  <h4 className="text-[var(--text-primary)] text-base font-semibold" style={{ fontFamily: "var(--font-display)" }}>Yapım Aşamasında</h4>
                  <p className="text-[var(--text-secondary)] text-xs mt-1" style={{ fontFamily: "var(--font-body)" }}>Çok yakında</p>
                </div>
              </div>
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          )}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "60px", background: "linear-gradient(to top, rgba(8,12,20,0.95), transparent)" }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2" style={{ padding: "24px" }}>
        <span
          className="text-[9px] tracking-[0.2em] uppercase font-bold"
          style={{ color: item.accentColor, opacity: 0.8 }}
        >
          {t(`item_${item.id}_subtitle` as any)}
        </span>
        <h3
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
        >
          {item.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)", opacity: 0.7 }}
        >
          {t(`item_${item.id}_description` as any)}
        </p>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 backdrop-blur-sm transition-all duration-300 hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/50 group self-start"
          style={{ padding: "6px 16px", gap: "6px" }}
        >
          <span
            className="whitespace-nowrap text-xs font-medium tracking-[0.05em] text-[var(--accent)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("view_project")}
          </span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */
export default function PortfolioPageClient() {
  const t = useTranslations("Portfolio");
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  /* GSAP entrance */
  useEffect(() => {
    if (!carouselRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from(carouselRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.35,
        ease: "power3.out",
      });
    }, carouselRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative z-10 w-full min-h-screen pt-32 md:pt-48">
      {/* Page Content */}
      <section className="w-full flex flex-col items-center pb-16 md:pb-20">
        {/* Decorative glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(200,255,0,0.015) 0%, transparent 70%)",
          }}
        />

        {/* Heading */}
        <div ref={headingRef} className="text-center px-6 mb-16 relative z-10" style={{ paddingTop: '140px' }}>
          <div 
            className="inline-flex items-center rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03] backdrop-blur-sm mb-6"
            style={{ padding: '10px 24px', gap: '10px' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse flex-shrink-0" />
            <span
              className="text-[11px] tracking-[0.25em] uppercase font-semibold mr-[-0.25em]"
              style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
            >
              {t("badge")}
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase"
            style={{ fontFamily: "var(--font-display)", marginBottom: "40px" }}
          >
            <span className="gradient-text-white">{t("title")}</span>
            <span className="text-white/20 mx-2 md:mx-3">{"// "}</span>
            <span className="gradient-text">{t("title_highlight")}</span>
          </h1>

          <p
            className="mt-4 text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)", opacity: 0.6 }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="w-full relative z-10">
          <DesktopCarousel items={portfolioItems} />
          <MobilePortfolio items={portfolioItems} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
