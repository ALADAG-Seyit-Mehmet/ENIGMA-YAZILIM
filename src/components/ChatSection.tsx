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

import { useTranslations } from "next-intl";

export default function ChatSection() {
  const t = useTranslations("Chat");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const sectorKeys = ["sector_1", "sector_2", "sector_3", "sector_4"];

  const getSectorData = (key: string): SectorData => ({
    customerQ: t(`${key}_q` as any),
    aiAnswer: t(`${key}_a` as any),
    followUps: [
      {
        label: t(`${key}_f1_label` as any),
        customerQ2: t(`${key}_f1_q` as any),
        aiAnswer2: t(`${key}_f1_a` as any),
      },
      {
        label: t(`${key}_f2_label` as any),
        customerQ2: t(`${key}_f2_q` as any),
        aiAnswer2: t(`${key}_f2_a` as any),
      },
    ],
  });
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

      const data = getSectorData(sectorName);
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
      setShowFollowUps(false); // Seçenekleri gizle
      setFollowUps((prev) => prev.filter((f) => f.label !== followUp.label));

      const t1 = setTimeout(() => {
        typeText("customer", followUp.customerQ2, () => {
          const t2 = setTimeout(() => {
            typeText("ai", followUp.aiAnswer2, () => {
              // Cevap bitince kalan seçenekleri göster
              const t3 = setTimeout(() => setShowFollowUps(true), 300);
              timersRef.current.push(t3);
            });
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
    if (!sectionRef.current) return;

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

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

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
            className="inline-flex items-center gap-2.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03] backdrop-blur-sm"
            style={{ padding: '10px 24px', marginBottom: '20px' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span
              className="text-[11px] tracking-[0.25em] uppercase font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--accent)",
              }}
            >
              {t("badge" as any) || "AI ASSISTANT DEMO"}
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "var(--font-display)", marginBottom: '12px' }}
          >
            <span className="gradient-text-white">{t("title_1" as any) || "SİZİN İÇİN NE YAPABİLECEĞİMİZİ"} </span>
            <span className="gradient-text">{t("title_2" as any) || "YAPAY ZEKAYA SORUN"}</span>
          </h2>
          <p
            className="text-base text-center max-w-lg mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            {t("subtitle" as any) || "Sektörünüzü seçin ve dijitalleşmenin işinizi nasıl dönüştürebileceğini keşfedin."}
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
              {t(`${name}_name` as any)}
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
                ? t(`${activeSector}_name` as any)
                : (t("select_sector" as any) || "Sektör Seçin")}
            </span>
          </div>

          {/* Messages */}
          <div className="p-6 flex flex-col gap-5">
            {!activeSector && (
              <div className="text-center py-6">
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--text-muted)",
                  }}
                >
                  {t("select_to_start" as any) || "↑ Yukarıdan bir sektör seçerek başlayın"}
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
                  className={`w-fit max-w-[90%] px-6 py-4 rounded-2xl text-base leading-loose break-words ${
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
              <div className="flex flex-wrap gap-2 pt-4 pb-8 ml-11 chat-bubble">
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
            {/* Bottom spacer to prevent text from sticking to the edge when scrolling */}
            <div className="h-6 flex-shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
