import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import SolutionsClient from "@/components/SolutionsClient";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions" });

  const title = `${t("title_1")} ${t("title_2")} | Enigma Yazılım`;
  const description = t("subtitle");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/cozumler`,
    },
  };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions" });

  // AEO & GEO için JSON-LD Yapısal Veri (Structured Data)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": t("sol_01_title"),
          "description": t("sol_01_desc")
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": t("sol_02_title"),
          "description": t("sol_02_desc")
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": t("sol_05_title"),
          "description": t("sol_05_desc")
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": t("sol_13_title"),
          "description": t("sol_13_desc")
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Service",
          "name": t("sol_17_title"),
          "description": t("sol_17_desc")
        }
      }
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SolutionsClient />
      <Footer />
    </>
  );
}
