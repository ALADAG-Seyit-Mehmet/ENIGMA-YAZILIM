"use client";

import { useState } from "react";
import Link from "next/link";

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
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSolutions = solutionsData.filter(
    (sol) => activeCategory === "all" || sol.category === activeCategory
  );

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
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03] backdrop-blur-sm"
              style={{ marginBottom: '40px' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span
                className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[var(--accent)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ÇÖZÜM MERKEZİ
              </span>
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter"
              style={{ fontFamily: "var(--font-display)", marginBottom: '40px' }}
            >
              <span className="gradient-text-white">ENIGMA</span>
              <span className="text-white/20 mx-2 md:mx-3">{"// "}</span>
              <span className="gradient-text">ÇÖZÜMLER</span>
            </h1>
            <p
              className="font-mono text-xs md:text-sm text-white/40 bg-white/[0.02] px-5 py-2.5 rounded-full border border-white/[0.06]"
              style={{ marginBottom: '56px' }}
            >
              {"// Sistem çözümleri ve aktif operasyonlar listeleniyor."}
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
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ÇÖZÜM KARTLARI IZGARASI */}
          <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
              {filteredSolutions.map((sol) => (
                <div
                  key={sol.id}
                  className={`group flex flex-col rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_50px_rgba(200,255,0,0.06)] hover:border-[var(--accent)]/20 overflow-hidden ${
                    sol.status === "coming-soon"
                      ? "opacity-70 grayscale-[0.2]"
                      : ""
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.04] bg-gradient-to-br from-[#111] to-[#0a0a0a]">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center border border-white/[0.06] group-hover:border-[var(--accent)]/20 transition-colors duration-500">
                      <div className="w-3 h-3 bg-[var(--accent)] rounded-sm shadow-[0_0_12px_rgba(200,255,0,0.4)] rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                    </div>

                    {sol.status === "coming-soon" ? (
                      <span className="text-[11px] font-mono font-bold text-orange-400/80 bg-orange-400/[0.06] border border-orange-400/15 px-3 py-1.5 rounded-md animate-pulse whitespace-nowrap">
                        LAB / AR-GE
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono font-bold text-[var(--accent)] bg-[var(--accent)]/[0.06] border border-[var(--accent)]/15 px-3 py-1.5 rounded-md whitespace-nowrap">
                        {sol.category.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Kart İçeriği */}
                  <div className="p-6 grow flex flex-col">
                    <div className="text-[11px] font-mono text-white/25 mb-4 tracking-widest">
                      {`// SYS_${sol.category.toUpperCase()}_${sol.id}`}
                    </div>
                    <h3
                      className="text-lg font-bold text-white/90 mb-4 tracking-tight group-hover:text-white transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {sol.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-[1.7] mb-6">
                      {sol.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-col gap-3 mb-6 mt-auto">
                      {sol.modalFeatures.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="text-[var(--accent)]/50 text-[9px] mt-0.5">
                            ▶
                          </span>
                          <span className="text-xs font-mono text-white/50 leading-relaxed">
                            {feat.split(":")[0]}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Aksiyon Butonu */}
                    {sol.status === "coming-soon" ? (
                      <div className="mt-auto pt-4 border-t border-white/[0.04] flex items-center justify-between w-full">
                        <span className="text-[11px] font-mono text-white/25 tracking-wider">
                          {"// DETAYLAR YAKINDA"}
                        </span>
                        <div className="flex gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        </div>
                      </div>
                    ) : (
                      <Link
                        href="/#chat"
                        className="mt-auto pt-4 border-t border-white/[0.04] flex items-center justify-between w-full group/btn"
                      >
                        <span className="text-xs font-mono text-white/40 group-hover/btn:text-[var(--accent)] transition-colors tracking-wide">
                          {"// İLETİŞİME GEÇİN_"}
                        </span>
                        <span className="text-white/20 group-hover/btn:text-[var(--accent)] transition-all duration-300 transform group-hover/btn:translate-x-1 text-lg">
                          →
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
