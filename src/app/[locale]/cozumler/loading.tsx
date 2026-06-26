export default function Loading() {
  return (
    <main className="relative z-10 flex items-center justify-center min-h-[80vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--accent)]/20 border-t-[var(--accent)] rounded-full animate-spin" />
        <span className="text-[10px] font-mono text-white/30 tracking-wider">
          {"// ÇÖZÜMLER YÜKLENİYOR..."}
        </span>
      </div>
    </main>
  );
}
