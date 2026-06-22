import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full px-6 flex justify-center" style={{ paddingTop: '80px', paddingBottom: '48px', marginTop: '64px' }}>
      {/* Gradient divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

      <div className="w-full max-w-6xl">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mb-16" style={{ gap: '56px', marginBottom: '48px' }}>
          {/* Brand */}
          <div className="text-center lg:text-left">
            <h3
              className="text-3xl font-black mb-4 tracking-tighter"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="gradient-text-white">ENIGMA </span>
              <span className="gradient-text">YAZILIM</span>
            </h3>
            <p
              className="text-sm max-w-xs leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-muted)",
              }}
            >
              Dijital dünyada kalıcı mülkler inşa ediyoruz.
              <br />
              Kod yazmıyoruz, geleceği şekillendiriyoruz.
            </p>
            <div className="flex items-center gap-2 mt-4 justify-center lg:justify-start">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[10px] font-mono text-white/20 tracking-wider">
                {"// SİSTEM AKTİF"}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-start gap-3.5">
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-1">
              {"// NAV_LINKS"}
            </span>
            {[
              { href: "/manifesto", label: "Manifesto" },
              { href: "/cozumler", label: "Çözümlerimiz" },
              { href: "/#portfolio", label: "Portföy" },
              { href: "/#chat", label: "AI Asistan Demo" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 hover:text-[var(--accent)] transition-all duration-300 animated-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center lg:items-end gap-3.5">
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-1">
              {"// CONTACT_STREAM"}
            </span>
            <a
              href="mailto:info@enigmayazilim.com"
              className="text-sm transition-all duration-300 hover:text-[var(--accent)] animated-underline"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)",
              }}
            >
              info@enigmayazilim.com
            </a>
            <a
              href="tel:+905001234567"
              className="text-sm transition-all duration-300 hover:text-[var(--accent)] animated-underline"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)",
              }}
            >
              +90 500 123 45 67
            </a>
            <span
              className="text-sm text-white/25"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Konya, Türkiye
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between" style={{ paddingTop: '32px', gap: '16px' }}>
          <p
            className="text-xs text-white/25"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © {new Date().getFullYear()} Enigma Yazılım. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-mono text-white/15 tracking-wider">
              {"// SYS_BUILD v2.0 — STABLE"}
            </p>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-[var(--accent)]/40" />
              <div className="w-1 h-1 rounded-full bg-[var(--accent)]/30" />
              <div className="w-1 h-1 rounded-full bg-[var(--accent)]/20" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
