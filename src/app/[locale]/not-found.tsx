import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="inline-flex items-center gap-3 px-10 py-2.5 rounded-full border border-(--accent)/20 bg-(--accent)/5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span
          className="text-[12px] tracking-[0.3em] uppercase font-semibold text-accent"
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
      <Link href="/" className="btn-accent w-full sm:w-55 text-center flex justify-center mt-4">
        ANA SAYFAYA DÖN
      </Link>
    </main>
  );
}
