"use client";

import Script from "next/script";

export default function SchemaMarkup() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ENIGMA YAZILIM",
    alternateName: "Enigma",
    url: "https://enigmayazilim.com",
    logo: "https://enigmayazilim.com/enigma-hero.png",
    description: "Enigma Yazılım, küresel ölçekte dijital mimarlık, web geliştirme ve dijital dönüşüm hizmetleri sunan öncü bir yazılım ajansıdır.",
    areaServed: "Worldwide",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Turkish", "English"]
    },
    sameAs: [
      "https://www.linkedin.com/company/enigmayazilim",
      "https://twitter.com/enigmayazilim",
      "https://instagram.com/enigmayazilim"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ENIGMA YAZILIM",
    url: "https://enigmayazilim.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://enigmayazilim.com/tr/portfoy?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy="afterInteractive"
      />
    </>
  );
}
