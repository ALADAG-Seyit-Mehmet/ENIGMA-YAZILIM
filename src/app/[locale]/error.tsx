"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="inline-flex items-center gap-3 px-10 py-2.5 rounded-full border border-red-500/20 bg-red-500/5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span
          className="text-[12px] tracking-[0.3em] uppercase font-semibold text-red-500"
          style={{ fontFamily: "var(--font-display)" }}
        >
          SİSTEM HATASI
        </span>
      </div>
      
      <h1
        className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span className="gradient-text-white">5</span>
        <span className="text-red-500">0</span>
        <span className="gradient-text-white">0</span>
      </h1>
      
      <p
        className="text-lg text-white/50 mb-8 max-w-md"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Üzgünüz, sunucularımızda beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin veya ana sayfaya dönün.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-md justify-center">
        <button 
          onClick={() => reset()} 
          className="btn-accent-outline w-full sm:w-55 text-center flex justify-center"
        >
          TEKRAR DENE
        </button>
        <Link href="/" className="btn-accent w-full sm:w-55 text-center flex justify-center">
          ANA SAYFAYA DÖN
        </Link>
      </div>
    </main>
  );
}
