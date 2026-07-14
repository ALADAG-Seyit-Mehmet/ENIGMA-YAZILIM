import { setRequestLocale, getTranslations } from "next-intl/server";
import TeklifPageClient from "./TeklifPageClient";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Teklif" });

  return {
    title: `${t("title_2")} | ENIGMA YAZILIM`,
    description: t("subtitle"),
  };
}

export default async function TeklifPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Teklif" });

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
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#050505]/80 to-[#050505]" />
      </div>

      <main
        className="relative z-10 min-h-screen text-white flex flex-col items-center px-6 md:px-12 lg:px-20"
        style={{ paddingTop: "calc(var(--navbar-height) + 80px)" }}
      >

      <div className="max-w-[800px] w-full mt-10">
        <section className="text-center flex flex-col items-center" style={{ marginBottom: '32px' }}>
          <div
            className="inline-flex items-center gap-2.5 rounded-full border border-(--accent)/20 bg-(--accent)/3 backdrop-blur-sm"
            style={{ padding: '10px 24px', marginBottom: '16px' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span
              className="text-[11px] tracking-[0.25em] uppercase font-semibold text-accent"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("title_1")}
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter"
            style={{ fontFamily: "var(--font-display)", marginBottom: '16px' }}
          >
            <span className="gradient-text">{t("title_2")}</span>
          </h1>
          <p
            className="text-[14px] md:text-[16px] text-white/50 leading-relaxed text-center max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </p>
        </section>

        <TeklifPageClient />
      </div>

      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
