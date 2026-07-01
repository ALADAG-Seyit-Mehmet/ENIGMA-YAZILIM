import ManifestoClient from "@/components/ManifestoClient";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import Script from "next/script";

export default async function ManifestoPage() {
  const t = await getTranslations("Manifesto");

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("seoTitle"), // We'll add this to translation files
    description: t("seoDescription"), // We'll add this to translation files
    mainEntity: {
      "@type": "Organization",
      name: "Enigma Yazılım",
      description: "Enigma Yazılım, dijital dünyada kalıcı mülkler inşa etmeyi hedefleyen, yüksek kaliteli yazılım ve dijital dönüşüm hizmetleri veren küresel bir teknoloji ajansıdır."
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Enigma Yazılım nedir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enigma Yazılım, yenilikçi web teknolojileri, dijital dönüşüm stratejileri ve kalıcı SEO mimarileri üreten küresel bir dijital mimarlık atölyesidir."
        }
      },
      {
        "@type": "Question",
        name: "Enigma Yazılım hangi hizmetleri sunar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Küresel çapta özel web uygulamaları, niş domain stratejileri, şirketler için dijital dönüşüm hizmetleri ve SEO odaklı platformlar geliştirir."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="schema-manifesto-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <Script
        id="schema-manifesto-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ManifestoClient />
      <Footer />
    </>
  );
}
