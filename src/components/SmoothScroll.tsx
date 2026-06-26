"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as Record<string, unknown>);

    // GSAP ScrollTrigger ile Lenis'i senkronize et
    lenis.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0, 0);

    // Sayfa yüksekliği/pin değişikliklerinde ScrollTrigger'ı ve Lenis'i güncelle
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
      lenis.resize();
    });
    
    if (typeof document !== "undefined") {
      resizeObserver.observe(document.body);
    }

    // Hash değişikliklerinde veya sayfa yüklendiğinde hash'e gitmek için
    const scrollToHash = (hash: string) => {
      if (!hash) return;
      const id = hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        // Hedefe smooth scroll yap, offset ile header payı bırak
        lenis.scrollTo(target, { offset: -80, duration: 1.5 });
      }
    };

    // İlk yüklendiğinde url'de hash varsa
    if (window.location.hash) {
      setTimeout(() => {
        scrollToHash(window.location.hash);
      }, 500);
    }

    // Sayfa içindeki tüm <a> etiketlerine hash tıklama dinleyicisi ekle
    const handleHashClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      
      // Eğer href hash içeriyorsa
      if (href && href.includes("#")) {
        const urlObj = new URL(target.href);
        // Aynı sayfada isek ve sadece hash değişiyorsa
        if (urlObj.pathname === window.location.pathname) {
          e.preventDefault();
          const hash = urlObj.hash;
          // URL'i güncelle (scroll zıplamasını önlemek için pushState)
          window.history.pushState(null, "", hash);
          scrollToHash(hash);
        }
      }
    };

    const links = document.querySelectorAll("a");
    links.forEach(link => link.addEventListener("click", handleHashClick));

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
      resizeObserver.disconnect();
      links.forEach(link => link.removeEventListener("click", handleHashClick));
      lenis.destroy();
    };
  }, []);

  return null;
}
