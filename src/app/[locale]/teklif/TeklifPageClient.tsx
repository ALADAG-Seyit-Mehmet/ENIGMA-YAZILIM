"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";

export default function TeklifPageClient() {
  const t = useTranslations("Teklif");
  const tSolutions = useTranslations("Solutions");
  const searchParams = useSearchParams();
  const initialService = searchParams.get("hizmet") || "";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: initialService,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // When form is submitted
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 min-h-[50vh] border border-white/[0.06] bg-[#0a0a0a]/50 rounded-3xl relative overflow-hidden backdrop-blur-md">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--accent)]/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/30 mb-6 relative z-10">
          <svg className="w-8 h-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          {t("success_title")}
        </h2>
        <p className="text-white/50 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          {t("success_message")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-white/80 transition-all text-sm font-medium relative z-10"
        >
          {t("back_to_home")}
        </Link>
      </div>
    );
  }

  return (
    <div 
      className="relative border border-white/[0.06] bg-[#0a0a0a]/50 rounded-3xl backdrop-blur-md overflow-hidden"
      style={{ padding: 'clamp(24px, 5vw, 48px)' }}
    >
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent)]/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-white/50 uppercase tracking-wider ml-1">{t("form_name")}</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="bg-[#050505] border border-white/[0.08] rounded-xl text-white/90 focus:outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/50 transition-all placeholder:text-white/20"
              style={{ padding: '14px 16px' }}
              placeholder={t("form_name_placeholder")}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-white/50 uppercase tracking-wider ml-1">{t("form_company")}</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="bg-[#050505] border border-white/[0.08] rounded-xl text-white/90 focus:outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/50 transition-all placeholder:text-white/20"
              style={{ padding: '14px 16px' }}
              placeholder={t("form_company_placeholder")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-white/50 uppercase tracking-wider ml-1">{t("form_email")}</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-[#050505] border border-white/[0.08] rounded-xl text-white/90 focus:outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/50 transition-all placeholder:text-white/20"
              style={{ padding: '14px 16px' }}
              placeholder={t("form_email_placeholder")}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-white/50 uppercase tracking-wider ml-1">{t("form_phone")}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-[#050505] border border-white/[0.08] rounded-xl text-white/90 focus:outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/50 transition-all placeholder:text-white/20"
              style={{ padding: '14px 16px' }}
              placeholder={t("form_phone_placeholder")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-wider ml-1">{t("form_service")}</label>
          <input
            type="text"
            name="service"
            readOnly
            value={formData.service ? (tSolutions(`sol_${formData.service}_title` as any) || `Solution ID: ${formData.service.toUpperCase()}`) : t("form_service_default")}
            className="bg-[#050505]/50 border border-white/[0.04] rounded-xl text-[var(--accent)]/80 focus:outline-none transition-all cursor-not-allowed font-mono text-sm"
            style={{ padding: '14px 16px' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-wider ml-1">{t("form_message")}</label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="bg-[#050505] border border-white/[0.08] rounded-xl text-white/90 focus:outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/50 transition-all placeholder:text-white/20 resize-none"
            style={{ padding: '16px' }}
            placeholder={t("form_message_placeholder")}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 flex items-center justify-center gap-3 w-full rounded-xl bg-[var(--accent)] text-[#050505] font-bold tracking-wide hover:bg-[var(--accent)]/90 hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--font-display)", padding: '18px 24px', fontSize: '16px' }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-[#050505]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{t("form_submitting")}</span>
            </>
          ) : (
            <>
              <span>{t("form_submit")}</span>
              <span className="text-xl leading-none">→</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
