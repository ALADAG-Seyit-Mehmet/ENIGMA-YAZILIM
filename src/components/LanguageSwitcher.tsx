"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "tr" ? "en" : "tr";
    router.replace(pathname, { locale: nextLocale, scroll: false });
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.15em] border border-[var(--accent)]/30 rounded bg-accent/5 hover:bg-accent/15 text-white/80 hover:text-accent transition-all duration-300"
      style={{ height: "26px", padding: "0 12px", fontFamily: "var(--font-display)" }}
    >
      {locale === "tr" ? "EN" : "TR"}
    </button>
  );
}
