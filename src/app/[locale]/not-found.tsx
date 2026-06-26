import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03] mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
        <span
          className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[var(--accent)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          HATA 404
        </span>
      </div>
      <h1
        className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span className="gradient-text-white">4</span>
        <span className="gradient-text">0</span>
        <span className="gradient-text-white">4</span>
      </h1>
      <p
        className="text-lg text-white/50 mb-8 max-w-md"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Aradığınız sayfa bulunamadı veya taşınmış olabilir.
      </p>
      <Link href="/" className="btn-accent">
        Ana Sayfaya Dön
      </Link>
    </main>
  );
}
