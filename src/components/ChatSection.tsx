"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";

interface Message {
  sender: "customer" | "ai";
  text: string;
  isTyping?: boolean;
}

interface SectorData {
  customerQ: string;
  aiAnswer: string;
  followUps: { label: string; customerQ2: string; aiAnswer2: string }[];
}

const sectors: Record<string, SectorData> = {
  "Üretim/Fabrika": {
    customerQ:
      "Üretim hattında kayıplarımız var, ERP sistemimiz hantal. Dijitalleşme bize ne katar?",
    aiAnswer:
      "Kağıt üzerinde üretim takibi size her ay %15 fire ve zaman kaybettiriyor. Özel yazdığımız IoT destekli üretim takip yazılımıyla, makine duruşlarını anlık görür, verimsizliği sıfırlarsınız. Hantal paket programlara mahkum değilsiniz; tamamen operasyonunuza özel, hızlı ve esnek bir dijital omurga inşa ediyoruz.",
    followUps: [
      {
        label: "Mevcut ERP'ye entegre olabilir miyiz?",
        customerQ2:
          "Şu an kullandığımız eski bir ERP var, ona entegre olabilir mi?",
        aiAnswer2:
          "Kesinlikle. Eski sistemlerinizi çöpe atmak zorunda değilsiniz. API köprüleri kurarak, modern arayüzümüzü eski sisteminize entegre ediyoruz. Hem veri kaybı yaşamıyorsunuz hem de 2026 yılına uygun, ışık hızında bir yönetim paneline kavuşuyorsunuz.",
      },
      {
        label: "Personel bu yeni sistemi kullanabilir mi?",
        customerQ2:
          "Sahadaki işçiler karmaşık ekranları kullanamıyor. Ne yapacağız?",
        aiAnswer2:
          "İşte bu yüzden paket programlardan kaçmalısınız. Sahadaki personel için sadece 2 büyük butondan oluşan, tablet uyumlu ve sıfır hata toleranslı özel ekranlar tasarlıyoruz. Eğitime bile gerek kalmadan herkes anında kullanmaya başlıyor.",
      },
    ],
  },
  "Gayrimenkul/Emlak": {
    customerQ:
      "Sahibinden.com'a dünya kadar para ödüyoruz. Kurtulmanın yolu yok mu?",
    aiAnswer:
      "Kesinlikle var. Komisyon ve ilan ücretleriyle platformlara çalışıyorsunuz. Size ait niş domain, gelişmiş harita entegrasyonu ve SEO altyapısı ile kendi portföy mülkünüzü kuruyoruz. Kendi dijital mülkünüzü yaratarak dışa bağımlılıktan kurtuluyorsunuz.",
    followUps: [
      {
        label: "İnsanlar bizi nasıl bulacak?",
        customerQ2:
          "Müşteriler ilan platformları yerine neden bizim sitemize gelsin?",
        aiAnswer2:
          "Sadece isminizle değil, 'Konya lüks satılık daire' gibi anahtar kelimelerde sizi Google'da 1. sıraya taşıyoruz. Kalıcı SEO mimarimiz sayesinde reklam bütçesi yakmadan, müşteri doğrudan size ulaşıyor. Markanız, aracıları atlayıp direkt alıcıyla buluşuyor.",
      },
      {
        label: "Sitenin yönetimi zor olur mu?",
        customerQ2: "İlan girmek, güncellemek zor mu?",
        aiAnswer2:
          "Size özel tasarladığımız yönetim paneli sayesinde telefondan bile 10 saniyede ilan girebilir, fotoğrafları kırpabilir ve anında yayına alabilirsiniz. Hiçbir teknik bilgiye ihtiyacınız kalmıyor.",
      },
    ],
  },
  "Hizmet/Restoran": {
    customerQ:
      "Paket servis komisyonları çok yüksek, sadık müşteri yaratamıyoruz.",
    aiAnswer:
      "Yemeksepeti ve Getir gibi platformlara ödediğiniz %30 komisyonlarla kendi kârınızı eritiyorsunuz. Kendi markanıza özel sipariş altyapısı ve WhatsApp bot entegrasyonu kurduğumuzda, komisyonsuz satış yapar ve müşterinizin datasına sahip olursunuz.",
    followUps: [
      {
        label: "Müşteriyi kendi sitemize nasıl çekeriz?",
        customerQ2:
          "Müşteri neden platform yerine bizim sitemizi kullansın?",
        aiAnswer2:
          "İlk siparişleri platformlardan alırsınız, ancak siparişin yanına koyacağınız %10 indirimli özel karekodlar ile müşteriyi kendi sitenize yönlendirirsiniz. İkinci sipariş tamamen sizin sisteminizden, sıfır komisyonla gerçekleşir. Müşteri veri tabanı sizin elinizde büyür.",
      },
      {
        label: "Sistem hızı yoğunlukta çökmez mi?",
        customerQ2:
          "Cuma akşamları çok yoğun oluyoruz, sistem bunu kaldırır mı?",
        aiAnswer2:
          "Sistemlerimizi Vercel gibi global bulut altyapılarında, trafik anında otomatik genişleyecek (auto-scaling) şekilde kuruyoruz. İster 10, ister 10.000 kişi aynı anda sipariş versin, saniyenin altında tepki süresi garanti ediyoruz.",
      },
    ],
  },
  Lojistik: {
    customerQ:
      "Araç takibi, irsaliye karmaşası ve sevkiyat hataları yüzünden operasyon tıkanıyor.",
    aiAnswer:
      "WhatsApp grupları ve Excel tablolarıyla lojistik yönetilmez. Sürücülerin mobil uygulamadan anlık teslimat onayı verebildiği, otomatik rotalama yapan ve müşteriye canlı takip linki gönderen kapalı devre bir bulut sistemi kuruyoruz. Hata payı sıfırlanır, müşteri şikayetleri biter.",
    followUps: [
      {
        label: "Müşteriler teslimatı nasıl takip edecek?",
        customerQ2:
          "Müşteriler sürekli 'Kargom nerede?' diye arıyor. Çözümü var mı?",
        aiAnswer2:
          "Sistemimiz, sipariş yola çıktığı an müşteriye güvenli bir canlı takip linki SMS atar. Tıpkı büyük kargo firmaları gibi, harita üzerinden anlık takip yapabilirler. Operatörlerinizin telefon trafiği %80 oranında azalır.",
      },
      {
        label: "Araç rotaları optimize edilebilir mi?",
        customerQ2:
          "Şoförler kafalarına göre rota yapıyor, yakıt maliyetimiz çok yüksek.",
        aiAnswer2:
          "Sisteme entegre edeceğimiz akıllı algoritma, günlük teslimat noktalarını analiz edip trafik ve mesafe bazlı en optimum rotayı saniyeler içinde şoförün ekranına düşürür. Ayda %20'ye varan yakıt ve zaman tasarrufu sağlarsınız.",
      },
    ],
  },
};

export default function ChatSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [followUps, setFollowUps] = useState<SectorData["followUps"]>([]);
  const [showFollowUps, setShowFollowUps] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cleanup = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setMessages((prev) => prev.filter((m) => !m.isTyping));
  }, []);

  const typeText = useCallback(
    (
      sender: "customer" | "ai",
      fullText: string,
      onComplete?: () => void
    ) => {
      let current = "";
      let i = 0;
      const speed = sender === "customer" ? 25 : 15;

      setMessages((prev) => [...prev, { sender, text: "", isTyping: true }]);

      const typeChar = () => {
        if (i < fullText.length) {
          current += fullText[i];
          i++;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { sender, text: current, isTyping: true };
            return copy;
          });
          const timer = setTimeout(typeChar, speed);
          timersRef.current.push(timer);
        } else {
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { sender, text: current, isTyping: false };
            return copy;
          });
          onComplete?.();
        }
      };

      const startTimer = setTimeout(typeChar, 100);
      timersRef.current.push(startTimer);
    },
    []
  );

  const startConversation = useCallback(
    (sectorName: string) => {
      cleanup();
      setMessages([]);
      setFollowUps([]);
      setShowFollowUps(false);
      setActiveSector(sectorName);

      const data = sectors[sectorName];
      if (!data) return;

      const t1 = setTimeout(() => {
        typeText("customer", data.customerQ, () => {
          const t2 = setTimeout(() => {
            typeText("ai", data.aiAnswer, () => {
              setFollowUps(data.followUps);
              const t3 = setTimeout(() => setShowFollowUps(true), 300);
              timersRef.current.push(t3);
            });
          }, 1000);
          timersRef.current.push(t2);
        });
      }, 400);
      timersRef.current.push(t1);
    },
    [cleanup, typeText]
  );

  const handleFollowUp = useCallback(
    (followUp: SectorData["followUps"][0]) => {
      cleanup();
      setFollowUps((prev) => prev.filter((f) => f.label !== followUp.label));

      const t1 = setTimeout(() => {
        typeText("customer", followUp.customerQ2, () => {
          const t2 = setTimeout(() => {
            typeText("ai", followUp.aiAnswer2);
          }, 1000);
          timersRef.current.push(t2);
        });
      }, 300);
      timersRef.current.push(t1);
    },
    [cleanup, typeText]
  );

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, showFollowUps]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const sectorKeys = Object.keys(sectors);

  return (
    <section
      ref={sectionRef}
      id="chat"
      className="relative z-10 w-full flex justify-center"
      style={{ paddingTop: '40px', paddingBottom: '40px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      <div className="w-full max-w-4xl">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col items-center text-center" style={{ marginBottom: '24px' }}>
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03] backdrop-blur-sm"
            style={{ marginBottom: '12px' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span
              className="text-[11px] tracking-[0.25em] uppercase font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--accent)",
              }}
            >
              İnteraktif Demo
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "var(--font-display)", marginBottom: '12px' }}
          >
            <span className="gradient-text-white">Neden </span>
            <span className="gradient-text">Dijitalleşmelisin?</span>
          </h2>
          <p
            className="text-base text-center max-w-lg mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            Sektörünü seç, sana özel dijital dönüşüm senaryosunu keşfet.
          </p>
        </div>

        {/* Sector Buttons */}
        <div className="flex flex-wrap justify-center gap-6" style={{ marginBottom: '16px' }}>
          {sectorKeys.map((name) => (
            <button
              key={name}
              className={`sector-btn ${activeSector === name ? "active" : ""}`}
              onClick={() => startConversation(name)}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Chat Box */}
        <div
          ref={chatBoxRef}
          className="rounded-2xl overflow-hidden transition-all duration-500 backdrop-blur-sm"
          style={{
            background: "rgba(10, 10, 10, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: activeSector
              ? "0 0 60px rgba(200, 255, 0, 0.03)"
              : "none",
            minHeight: activeSector ? "400px" : "100px",
            maxHeight: "600px",
            overflowY: "auto",
          }}
        >
          {/* Chat header */}
          <div
            className="px-6 py-4 flex items-center justify-center gap-3"
            style={{
              borderBottom: "1px solid var(--border-color)",
              background: "var(--bg-tertiary)",
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: activeSector ? "var(--accent)" : "var(--text-muted)",
                boxShadow: activeSector
                  ? "0 0 10px rgba(200,255,0,0.4)"
                  : "none",
              }}
            />
            <span
              className="text-xs font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-secondary)",
              }}
            >
              {activeSector
                ? `${activeSector} — Dijital Danışmanlık`
                : "Sektör Seçin"}
            </span>
          </div>

          {/* Messages */}
          <div className="p-6 space-y-5">
            {!activeSector && (
              <div className="text-center py-6">
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--text-muted)",
                  }}
                >
                  ↑ Yukarıdan bir sektör seçerek başlayın
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble flex gap-3 ${
                  msg.sender === "ai" ? "" : "justify-end"
                }`}
              >
                {msg.sender === "ai" && (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{
                      background: "var(--accent)",
                      color: "var(--bg-primary)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    AI
                  </div>
                )}
                <div
                  className={`w-fit max-w-[90%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed break-words ${
                    msg.isTyping ? "typing-cursor" : ""
                  }`}
                  style={{
                    fontFamily: "var(--font-body)",
                    background:
                      msg.sender === "customer"
                        ? "rgba(200, 255, 0, 0.1)"
                        : "var(--bg-tertiary)",
                    border: `1px solid ${
                      msg.sender === "customer"
                        ? "rgba(200, 255, 0, 0.2)"
                        : "var(--border-color)"
                    }`,
                    color: "var(--text-primary)",
                    borderTopRightRadius:
                      msg.sender === "customer" ? "4px" : "16px",
                    borderTopLeftRadius:
                      msg.sender === "ai" ? "4px" : "16px",
                  }}
                >
                  {msg.text}
                </div>
                {msg.sender === "customer" && (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs"
                    style={{
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-muted)",
                    }}
                  >
                    👤
                  </div>
                )}
              </div>
            ))}

            {/* Follow-up buttons */}
            {showFollowUps && followUps.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 chat-bubble">
                {followUps.map((fu, i) => (
                  <button
                    key={i}
                    className="btn-ghost text-left text-xs"
                    onClick={() => handleFollowUp(fu)}
                  >
                    {fu.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
