"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";

import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const t = useTranslations("Navigation");

  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}/manifesto`, rawHref: "/manifesto", label: t("manifesto") },
    { href: `/${locale}/cozumler`, rawHref: "/cozumler", label: t("services") },
    { href: `/${locale}/portfoy`, rawHref: "/portfoy", label: t("portfolio") },
    { href: `/${locale}/#chat`, rawHref: "/#chat", label: "Enigma Ai" },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const visible = !isHome || scrolled;

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          opacity: visible ? 1 : 0,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(5, 5, 5, 0.6)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="w-full h-20 flex items-center justify-between" style={{ padding: "0 clamp(24px, 5vw, 80px)" }}>
          {/* Left Side: Logo */}
          <div className="flex-1 flex justify-start">
            <Link
              href="/"
              className="font-black text-xl tracking-tighter transition-opacity hover:opacity-80"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              ENIGMA <span style={{ color: "var(--accent)" }}>YAZILIM</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.rawHref || (link.rawHref !== "/" && pathname.startsWith(link.rawHref) && !link.rawHref.includes("#"));
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] tracking-[0.15em] uppercase font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] rounded ${
                    isActive ? "text-accent drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]" : "text-white/40 hover:text-accent"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Side: Social Icons & Actions */}
          <div className="flex-1 flex justify-end items-center gap-3 md:gap-4">
            <div className="hidden md:flex items-center gap-3 mr-2">
              {/* Instagram and X removed temporarily */}
              <a
              href="https://www.linkedin.com/company/enigma-yazilim/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/40 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <span className="w-px h-4 bg-white/10 mx-1" />
            </div>

            <div className="flex items-center">
              <LanguageSwitcher />
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen ? true : false}
            >
              <span
                className={`w-5 h-[1.5px] bg-white/70 transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-white/70 transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-white/70 transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 translate-y-[-4.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(5, 5, 5, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.rawHref || (link.rawHref !== "/" && pathname.startsWith(link.rawHref) && !link.rawHref.includes("#"));
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-bold tracking-wider uppercase transition-colors ${
                  isActive ? "text-accent drop-shadow-[0_0_12px_rgba(204,255,0,0.5)]" : "text-white/60 hover:text-accent"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {link.label}
              </a>
            );
          })}
          <div className="flex items-center gap-6 mt-8">
            {/* Instagram removed temporarily */}
            <a
              href="https://www.linkedin.com/company/enigma-yazilim/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/40 hover:text-accent transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
