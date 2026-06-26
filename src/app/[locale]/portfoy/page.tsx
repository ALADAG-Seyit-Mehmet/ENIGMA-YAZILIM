import type { Metadata } from "next";
import PortfolioPageClient from "./PortfolioPageClient";

export const metadata: Metadata = {
  title: "Enigma Portföy — Projelerimiz",
  description:
    "Enigma Yazılım olarak dijital dünyada inşa ettiğimiz kalıcı projeler. Web siteleri, SaaS platformları ve kurumsal dijital çözümler.",
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
