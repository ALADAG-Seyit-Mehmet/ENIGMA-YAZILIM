"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import { gsap } from "@/lib/gsap";
import { useTranslations } from "next-intl";

const categories = [
  { id: "all", label: "Tümü" },
  { id: "web", label: "Web" },
  { id: "mobil", label: "Mobil" },
  { id: "sosyalmedya", label: "Sosyal Medya" },
  { id: "saas", label: "SaaS" },
  { id: "eticaret", label: "E-Ticaret" },
];

const solutionsData = [
  { id: "01", slug: "kurumsal-tanitim-siteleri", category: "web", status: "active" },
  { id: "02", slug: "ozel-yonetim-panelleri", category: "web", status: "active" },
  { id: "03", slug: "landing-page-kampanya", category: "web", status: "active" },

  { id: "07", slug: "musteri-sadakat-uygulamalari", category: "mobil", status: "active" },
  { id: "08", slug: "depo-stok-takip", category: "mobil", status: "active" },
  { id: "09", slug: "saha-operasyon-konum", category: "mobil", status: "active" },

  { id: "13", slug: "kurumsal-sosyal-medya", category: "sosyalmedya", status: "active" },
  { id: "14", slug: "interaktif-katalog-portallar", category: "sosyalmedya", status: "active" },
  { id: "15", slug: "kapali-devre-iletisim", category: "sosyalmedya", status: "active" },

  { id: "04", slug: "is-takip-crm", category: "saas", status: "active" },
  { id: "05", slug: "randevu-destek-sistemleri", category: "saas", status: "active" },
  { id: "06", slug: "sirket-ici-surec-otomasyonu", category: "saas", status: "active" },

  { id: "10", slug: "markaya-ozel-b2c", category: "eticaret", status: "active" },
  { id: "11", slug: "bayi-toptanci-b2b", category: "eticaret", status: "active" },
  { id: "12", slug: "entegrasyon-fatura-cozumleri", category: "eticaret", status: "active" }
];

export default function SolutionsClient() {
  const t = useTranslations("Solutions");
  const [activeCategory, setActiveCategory] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const getCategoryLabel = (id: string) => {
    switch (id) {
      case "all": return t("cat_all");
      case "web": return t("cat_web");
      case "saas": return t("cat_saas");
      case "mobil": return t("cat_mobil");
      case "eticaret": return t("cat_eticaret");
      case "sosyalmedya": return t("cat_sosyalmedya");
      default: return id;
    }
  };

  const filteredSolutions = solutionsData.filter(
    (sol) => activeCategory === "all" || sol.category === activeCategory
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".solution-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            y: 40,
            opacity: 0,
            scale: 0.98,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [filteredSolutions]);

  return (
    <>
      {/* Background Deep Dark with Noise/Grid */}
      <div className="fixed inset-0 z-[-2] bg-[#050505]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(rgba(255, 255, 255, 0.05) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0 1px, transparent 1px 100%)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />
      </div>

      <main
        className="relative z-10 min-h-screen text-white flex flex-col items-center px-6 md:px-12 lg:px-20"
        style={{ paddingTop: "calc(var(--navbar-height) + 80px)", paddingBottom: '160px' }}
      >
        <div className="max-w-[1100px] w-full">
          {/* HERO / BAŞLIK ALANI */}
          <section className="text-center flex flex-col items-center" style={{ marginBottom: '80px' }}>
            <div
              className="inline-flex items-center gap-2.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03] backdrop-blur-sm"
              style={{ padding: '10px 24px', marginBottom: '40px' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span
                className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[var(--accent)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("badge")}
              </span>
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter"
              style={{ fontFamily: "var(--font-display)", marginBottom: '40px' }}
            >
              <span className="gradient-text-white">{t("title_1")}</span>
              <span className="text-white/20 mx-2 md:mx-3">{"// "}</span>
              <span className="gradient-text">{t("title_2")}</span>
            </h1>
            <p
              className="font-mono text-[11px] md:text-sm text-white/40 bg-white/[0.02] px-6 py-4 md:py-2.5 rounded-[2rem] md:rounded-full border border-white/[0.06] leading-relaxed md:leading-normal text-center max-w-[90vw] md:max-w-xl mx-auto"
              style={{ marginBottom: '56px' }}
            >
              {t("subtitle")}
            </p>

            {/* KATEGORİ FİLTRELEME BAR — hero içinde ortalı */}
            <div className="inline-flex flex-wrap items-center justify-center rounded-2xl border border-white/[0.04] bg-[#0a0a0a]/60 backdrop-blur-md" style={{ gap: '12px', padding: '16px 24px' }}>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative rounded-xl font-medium transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] ${
                      isActive
                        ? "text-[#050505] bg-[var(--accent)] shadow-[0_0_30px_rgba(200,255,0,0.2)]"
                        : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                    }`}
                    style={{ fontFamily: "var(--font-display)", fontSize: '15px', padding: '12px 24px' }}
                  >
                    {getCategoryLabel(cat.id)}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ÇÖZÜM KARTLARI IZGARASI */}
          <section className="w-full" ref={containerRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
              {filteredSolutions.map((sol) => (
                <article
                  key={sol.id}
                  className={`solution-card group flex flex-col rounded-3xl border border-white/[0.06] bg-[#0a0a0a] transition-all duration-500 hover:shadow-[0_0_50px_rgba(200,255,0,0.06)] hover:border-[var(--accent)]/20 hover:-translate-y-1 overflow-hidden ${
                    sol.status === "coming-soon"
                      ? "opacity-70 grayscale-[0.2]"
                      : ""
                  }`}
                >
                  <div 
                    className="flex w-full self-stretch items-center justify-between border-b border-white/[0.04] bg-gradient-to-br from-[#111] to-[#0a0a0a]"
                    style={{ padding: '24px 28px' }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center border border-white/[0.06] group-hover:border-[var(--accent)]/20 transition-colors duration-500">
                      <div className="w-2.5 h-2.5 bg-[var(--accent)] rounded-sm shadow-[0_0_12px_rgba(200,255,0,0.4)] rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                    </div>

                    {sol.status === "coming-soon" ? (
                      <span 
                        className="text-[11px] md:text-xs font-mono font-bold text-orange-400/80 bg-orange-400/[0.1] border border-orange-400/20 rounded-full animate-pulse whitespace-nowrap tracking-wide"
                        style={{ padding: '8px 18px' }}
                      >
                        {t("lab_badge")}
                      </span>
                    ) : (
                      <span 
                        className="text-[11px] md:text-xs font-mono font-bold text-[var(--accent)] bg-[var(--accent)]/[0.08] border border-[var(--accent)]/20 rounded-full whitespace-nowrap tracking-wide"
                        style={{ padding: '8px 18px' }}
                      >
                        {sol.category.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Kart İçeriği */}
                  <div 
                    className="grow flex flex-col w-full self-stretch"
                    style={{ padding: '32px 28px 12px 28px' }}
                  >

                    <h3
                      className="text-lg md:text-xl font-bold text-white/90 mb-5 tracking-tight group-hover:text-white transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {t(`sol_${sol.id}_title` as any)}
                    </h3>
                    <p 
                      className="text-white/50 text-sm md:text-[15px] leading-[1.8]"
                      style={{ marginBottom: '32px' }}
                    >
                      {t(`sol_${sol.id}_desc` as any)}
                    </p>

                    {/* Features */}
                    <div 
                      className="flex flex-col gap-4"
                      style={{ marginBottom: '32px', marginTop: 'auto' }}
                    >
                      {[t(`sol_${sol.id}_feat_1` as any), t(`sol_${sol.id}_feat_2` as any)].map((feat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-[15px] text-white/70 font-medium leading-none mt-[2px]">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Aksiyon Butonu */}
                    {sol.status === "coming-soon" ? (
                      <div className="mt-auto pt-5 border-t border-white/[0.04] flex items-center justify-between w-full">
                        <span className="text-[11px] font-mono text-white/25 tracking-wider">
                          {t("details_soon")}
                        </span>
                        <div className="flex gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={`/iletisim?hizmet=${sol.slug}`}
                        className="mt-auto flex w-full items-center justify-between group/btn bg-white/[0.02] hover:bg-[var(--accent)]/[0.08] border border-white/[0.04] hover:border-[var(--accent)]/30 rounded-xl transition-all duration-300"
                        style={{ padding: '16px 24px' }}
                      >
                        <span className="text-xs font-semibold text-white/70 group-hover/btn:text-[var(--accent)] transition-colors tracking-widest uppercase" style={{ fontFamily: "var(--font-body)" }}>
                          {t("request_quote")}
                        </span>
                        <span className="text-white/40 group-hover/btn:text-[var(--accent)] transition-all duration-300 transform group-hover/btn:translate-x-1 text-lg">
                          →
                        </span>
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
