"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import { gsap } from "@/lib/gsap";
import { useTranslations } from "next-intl";

const categories = [
  { id: "all", label: "Tümü" },
  { id: "web", label: "Web" },
  { id: "saas", label: "SaaS" },
  { id: "mobil", label: "Mobil" },
  { id: "eticaret", label: "E-Ticaret" },
  { id: "yapayzeka", label: "Yapay Zekâ" },
];

const solutionsData = [
  {
    id: "01",
    slug: "kurumsal-web-siteleri",
    category: "web",
    title: "Kurumsal Web Siteleri",
    description:
      "Markanızın vizyonunu dijital dünyaya fütüristik çizgilerle taşıyan, yüksek performanslı ve SEO odaklı tanıtım siteleri.",
    status: "active",
    modalFeatures: [
      "Maksimum Performans: Google Lighthouse skorlarında %100 hız",
      "Siber Güvenlik: Statik üretim (SSG) altyapısıyla tam zırh",
      "Arama Motoru Dominasyonu: Gelişmiş SEO mimarisi",
      "Özgün Mimari: Fütüristik UI/UX tasarımı",
    ],
  },
  {
    id: "02",
    slug: "ozel-yonetim-panelleri",
    category: "web",
    title: "Özel Yönetim Panelleri (CMS)",
    description:
      "Sitenizdeki tüm dinamik içerikleri, veri akışlarını ve siber mimariyi kod bilmeden, uçtan uca kontrol edebileceğiniz esnek paneller.",
    status: "active",
    modalFeatures: [
      "Tam Kontrol: Anlık veri güncelleme",
      "Rol Yetkilendirme: Admin, editör ve moderatör izinleri",
      "Yüksek Güvenlik: Şifrelenmiş oturumlar ve API",
      "Hızlı Entegrasyon: Dış servislere kusursuz bağlantı",
    ],
  },
  {
    id: "03",
    slug: "acilis-sayfalari",
    category: "web",
    title: "Açılış Sayfaları (Landing Pages)",
    description:
      "Reklam kampanyalarınız veya spesifik ürün lansmanlarınız için optimize edilmiş, ziyaretçiyi doğrudan müşteriye dönüştüren tek sayfalık web araçları.",
    status: "active",
    modalFeatures: [
      "A/B Test Altyapısı: Dönüşüm oranlarını artırma",
      "Anlık Analiz: Heatmap ve tıklama izleme",
      "Yüksek Dönüşüm: Harekete geçirici (CTA) formlar",
      "Ultra Hızlı Yüklenme: Tıklama kayıplarını önleme",
    ],
  },
  {
    id: "04",
    slug: "web-tabanli-otomasyonlar",
    category: "web",
    title: "Web Tabanlı Otomasyonlar",
    description:
      "Şirket içi karmaşık iş süreçlerini, form onay mekanizmalarını ve manuel veri akışlarını buluta taşıyarak dijitalleştiren özel yazılımlar.",
    status: "active",
    modalFeatures: [
      "Süreç Standardizasyonu: Otomatik iş akışları",
      "Merkezi Veri Havuzu: Güvenli bulut arşivlemesi",
      "Performans Takibi: Aşama ve süre metrikleri",
      "Maliyet Optimizasyonu: Operasyonel verimlilik",
    ],
  },
  {
    id: "05",
    slug: "b2b-is-takip-crm",
    category: "saas",
    title: "B2B İş Takip & CRM Sistemleri",
    description:
      "Şirketinizin müşteri ilişkilerini, ekip görevlerini, projelerini ve operasyon hatlarını tek bir fütüristik merkezden yöneten bulut platformları.",
    status: "active",
    modalFeatures: [
      "Anlık Senkronizasyon: Gecikmesiz mesaj akışı",
      "Müşteri Yaşam Döngüsü: Pipeline yönetimi",
      "Abonelik/Modül Yönetimi: Özelleştirilebilir ekranlar",
      "Gelişmiş Raporlama: Ekip verimlilik analizleri",
    ],
  },
  {
    id: "06",
    slug: "ik-ve-finans-yonetim",
    category: "saas",
    title: "İK ve Finans Yönetim Araçları",
    description:
      "Personel izin hatlarını, maaş bordrolarını, kurumsal gelir-gider dengesini ve fatura süreçlerini otomatize eden güvenli bulut çözümleri.",
    status: "active",
    modalFeatures: [
      "Dijital İK Arşivi: Özellik ve izin onayları",
      "Finansal Şeffaflık: Bütçe ve nakit akışı",
      "Otomatik Bildirimler: Ödeme ve tatil uyarıları",
      "Veri Entegrasyonları: Otomatik API işleme",
    ],
  },
  {
    id: "07",
    slug: "rezervasyon-randevu",
    category: "saas",
    title: "Rezervasyon & Randevu Sistemleri",
    description:
      "Klinikler, oteller veya hizmet işletmeleri için abonelik (SaaS) modeliyle çalışan, çakışmaları önleyen akıllı takvim platformları.",
    status: "active",
    modalFeatures: [
      "Akıllı Çakışma Önleme: Çift rezervasyon engeli",
      "Entegre Ödeme Dünyası: Kapora ve tahsilat",
      "Hatırlatıcı Asistan: SMS ve WhatsApp uyarıları",
      "Esnek Takvim Yönetimi: Personel çalışma saatleri",
    ],
  },
  {
    id: "08",
    slug: "veri-analitigi-raporlama",
    category: "saas",
    title: "Veri Analitiği & Raporlama",
    description:
      "İşletmenizin ürettiği ham verileri işleyerek, karar mekanizmalarınızı güçlendiren, dark-mode uyumlu interaktif grafik panelleri (Dashboard).",
    status: "active",
    modalFeatures: [
      "Büyük Veri Desteği: Milyonlarca satırlık işleme",
      "Kişiselleştirilmiş Widgetlar: Özelleştirilebilir grafikler",
      "Anlık İzleme: Canlı sistem logları",
      "Dışa Aktarım: Tek tıkla PDF/CSV rapor",
    ],
  },
  {
    id: "09",
    slug: "kurumsal-hizmet-uygulamalari",
    category: "mobil",
    title: "Kurumsal / Hizmet Uygulamaları",
    description:
      "Müşterilerinizin cebine girerek kurye takibi, hızlı randevu veya saha servis kontrolü sunan, yüksek performanslı mobil uygulamalar.",
    status: "coming-soon",
    modalFeatures: [
      "Lokasyon Entegrasyonu: Canlı harita ve GPS",
      "Gelişmiş Bildirimler: Segmentasyonlu push",
      "Çevrimdışı Çalışma: Yerel veri eşitleme",
      "Cihaz Donanım Erişimi: FaceID entegrasyonu",
    ],
  },
  {
    id: "10",
    slug: "sosyal-medya-topluluk",
    category: "mobil",
    title: "Sosyal Medya / Topluluk",
    description:
      "Kendi markanız veya niş sektörünüz için anlık mesajlaşma, içerik paylaşımı ve topluluk etkileşimi odaklı kapalı devre mobil ekosistemler.",
    status: "coming-soon",
    modalFeatures: [
      "Gerçek Zamanlı Mesaj: Şifrelenmiş sohbet",
      "Medya Sıkıştırma: Kayıpsız hızlı yükleme",
      "Kullanıcı Akış Algoritması: Fütüristik keşfet",
      "Canlı Yayın: Sesli/görüntülü altyapı",
    ],
  },
  {
    id: "11",
    slug: "mobil-eticaret-uygulamalari",
    category: "mobil",
    title: "Mobil E-Ticaret Uygulamaları",
    description:
      "Mevcut online mağazanızla tam entegre çalışan, tek tıkla ödeme ve yüksek sepet dönüşümü odaklı iOS ve Android alışveriş araçları.",
    status: "coming-soon",
    modalFeatures: [
      "Hızlı Ödeme: 3 saniyede alışveriş",
      "Kişiselleştirilmiş Mağaza: Değişen vitrin",
      "Derin Link: Sosyal medyadan ürüne yönlendirme",
      "Sepet Hatırlatma: İndirimli anlık bildirim",
    ],
  },
  {
    id: "12",
    slug: "yonetim-saha-uygulamalari",
    category: "mobil",
    title: "Yönetim & Saha Uygulamaları",
    description:
      "Saha personeli, depo çalışanları veya lojistik ekipleri için barkod okuma, stok girmeyi sağlayan endüstriyel mobil çözümler.",
    status: "coming-soon",
    modalFeatures: [
      "Ultra Hızlı Barkod: Endüstriyel kamera tarayıcı",
      "Depo & Raf Eşleme: Canlı stok işleme",
      "Dijital İmza: Teslimat konumu mühürleme",
      "Zorlu Şartlara Uyum: Düşük pil tüketimi",
    ],
  },
  {
    id: "13",
    slug: "ozel-b2c-eticaret",
    category: "eticaret",
    title: "Özel B2C E-Ticaret",
    description:
      "Hazır ve hantal altyapılar yerine, tamamen markanızın hacmine ve hızına özel sıfırdan kodlanan devasa online mağaza sistemleri.",
    status: "active",
    modalFeatures: [
      "Milisaniyelik Arama: Akıllı arama motoru",
      "Yüksek Trafik Koruması: Çökmeyen mimari",
      "Sınırsız Özelleştirme: Özgün tasarım",
      "Gelişmiş Varyant: Esnek kombinasyon yönetimi",
    ],
  },
  {
    id: "14",
    slug: "b2b-bayi-altyapilari",
    category: "eticaret",
    title: "B2B Bayi Altyapıları",
    description:
      "Şirketinizin alt bayilerine, toptancılarına yönelik kapalı devre, özel fiyatlandırma, risk limitleri ve vadeli ödeme içeren ticari portallar.",
    status: "active",
    modalFeatures: [
      "Cari Hesap & Risk: Açık hesap limit takibi",
      "Kademeli Fiyat Matrisi: Özel iskonto tanımlama",
      "Toplu Sipariş Girişi: Excel/matris ile hızlı sepet",
      "Ticari Sistem: ERP entegrasyonu",
    ],
  },
  {
    id: "15",
    slug: "pazaryeri-entegrasyonlari",
    category: "eticaret",
    title: "Pazaryeri Entegrasyonları",
    description:
      "Trendyol, Hepsiburada, Amazon gibi dev kanallardaki sipariş, stok, fatura ve fiyat hareketlerini tek bir siber panelden eşitleyen entegratörler.",
    status: "active",
    modalFeatures: [
      "Anlık Stok Senkronu: Otomatik düşürme",
      "Merkezi Sipariş Havuzu: Tek ekranda kargolama",
      "Otomatik Faturalandırma: E-fatura entegrasyonu",
      "Dinamik Fiyat Motoru: Rakiplere göre fiyatlama",
    ],
  },
  {
    id: "16",
    slug: "ozel-odeme-sistemleri",
    category: "eticaret",
    title: "Özel Ödeme Sistemleri",
    description:
      "Küresel ve yerel ödeme ağlarının sitenize en üst düzey siber güvenlik standartlarında (PCI-DSS) bağlanması.",
    status: "active",
    modalFeatures: [
      "Üst Düzey Güvenlik: Yüksek şifreleme",
      "Akıllı Kart Yönlendirme: En uygun POS seçimi",
      "Küresel Tahsilat: Tüm para birimlerinde ödeme",
      "Tekrarlayan Ödeme: Abonelik motoru",
    ],
  },
  {
    id: "17",
    slug: "akilli-ai-chatbotlar",
    category: "yapayzeka",
    title: "Akıllı AI Chatbotlar",
    description:
      "Şirketinizin ürün listesi, destek dökümanları ve kurumsal hafızasıyla eğitilen, insan doğallığında 7/24 müşteri karşılayan asistanlar.",
    status: "coming-soon",
    modalFeatures: [
      "Kurumsal Hafıza: Yüklenen verilerden beslenme",
      "Aksiyon Alabilme: Randevu/kargo sorgulama",
      "Çoklu Dil Desteği: Anında çeviri ve yanıt",
      "Duygu Analizi: Canlı ekibe devretme",
    ],
  },
  {
    id: "18",
    slug: "veri-analizi-tahminleme",
    category: "yapayzeka",
    title: "Veri Analizi & Tahminleme",
    description:
      "Geçmiş satış, stok, operasyon ve kullanıcı verilerinizi inceleyerek gelecek dönem risklerini ve ciro fırsatlarını raporlayan yapay zeka motorları.",
    status: "coming-soon",
    modalFeatures: [
      "Akıllı Stok Tahmini: İdeal stok sipariş uyarısı",
      "Talep ve Ciro Öngörüsü: Gelecek talep hesabı",
      "Müşteri Kayıp Analizi: Riskli kullanıcı tespiti",
      "Anomali Tespiti: Sahtekarlık girişimlerini yakalama",
    ],
  },
  {
    id: "19",
    slug: "otomatik-icerik-gorsel",
    category: "yapayzeka",
    title: "Otomatik İçerik & Görsel",
    description:
      "Şirketinizin ürün gamına ve sosyal medya diline uygun pazarlama metinlerini, bültenleri ve görselleri yapay zekayla üreten araçlar.",
    status: "coming-soon",
    modalFeatures: [
      "Otomatik Ürün Açıklaması: SEO uyumlu metin",
      "Sosyal Medya Asistanı: İçerik takvimi üretimi",
      "Akıllı Görsel Varyasyonları: Fütüristik stüdyo",
      "Kişiselleştirilmiş Bültenler: Aboneye özel mail",
    ],
  },
  {
    id: "20",
    slug: "dogal-dil-isleme",
    category: "yapayzeka",
    title: "Doğal Dil İşleme (NLP)",
    description:
      "Müşterilerinizden gelen binlerce yorumu, anket cevabını veya e-postayı saniyeler içinde analiz ederek anlamlandıran dil motorları.",
    status: "coming-soon",
    modalFeatures: [
      "Otomatik Sınıflandırma: Destek ataması",
      "Müşteri Memnuniyeti: Net skor çıkarma",
      "Trend Analizi: Güncel şikayet yakalama",
      "Metin Özetleme: Uzun dökümanları özetleme",
    ],
  },
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
      case "yapayzeka": return t("cat_yapayzeka");
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
