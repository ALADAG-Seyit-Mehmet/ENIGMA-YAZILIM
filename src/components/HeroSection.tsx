"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const particleData = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 17 + 7) % 100}%`,
  duration: 8 + ((i * 37) % 12),
  delay: (i * 23) % 8,
  width: 1 + ((i * 13) % 2),
  height: 1 + ((i * 11) % 2),
  opacity: 0.15 + (((i * 7) % 20) / 100),
}));

function Particles() {
  return (
    <div className="particles-container">
      {particleData.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;

    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.5;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setVideoFailed(true);
        });
      }
    }

    const ctx = gsap.context(() => {
      const overlay = overlayRef.current;
      if (overlay) {
        gsap.to(overlay, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "40% top",
            scrub: 1.5,
          },
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(5, 5, 5, 0.6)",
          ease: "none",
        });
      }

      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          titleRef.current,
          {
            y: 80,
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    // Sadece fallback (yüklenememe) durumunu dinliyoruz,
    // Geri sarma işlemi performansı inanılmaz yorduğu için kaldırıldı.
    // Video zaten native olarak 'loop' parametresi ile sonsuz döngüde oynayacaktır.
  }, [videoFailed]);

  return (
    <>
      <Particles />

      <div className="hero-video-container">
        {videoFailed ? (
          <div
            className="video-fallback w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, #0a0a0a 0%, #111 25%, #0d1117 50%, #111 75%, #0a0a0a 100%)",
            }}
          />
        ) : (
          <video
            ref={videoRef}
            playsInline
            muted
            loop
            autoPlay
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/arkaplan_video_15sn480p.mp4" type="video/mp4" media="(max-width: 768px)" />
            <source src="/arkaplan_video_15sn1080p.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <div ref={overlayRef} className="video-overlay" />

      <section
        id="hero"
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-[85dvh] md:min-h-[100dvh] pt-20 md:pt-0 px-6"
      >
        <div className="text-center max-w-5xl mx-auto">
          <div
            ref={badgeRef}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 md:mb-10"
          >
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)] opacity-60" />
            <span
              className="text-[11px] tracking-[0.35em] uppercase rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 backdrop-blur-sm"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--accent)",
                padding: "10px 24px"
              }}
            >
              {t("badge")}
            </span>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)] opacity-60" />
          </div>

          <h1
            ref={titleRef}
            className="font-black leading-[0.92] tracking-[-0.05em] mb-6 md:mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 10vw, 8rem)",
            }}
          >
            <span className="gradient-text-white">{t("title_1")}</span>
            <br />
            <span className="gradient-text">{t("title_2")}</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-6 md:mb-8"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            {t("subtitle")}
          </p>

        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-muted)",
            }}
          >
            {t("explore")}
          </span>
          <div className="w-[1px] h-12 relative overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(to bottom, var(--accent), transparent)",
                animation: "scroll-line 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
