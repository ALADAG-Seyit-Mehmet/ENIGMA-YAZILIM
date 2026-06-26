import HeroSection from "@/components/HeroSection";
import SplitSection from "@/components/SplitSection";
import ReferansSection from "@/components/ReferansSection";
import ChatSection from "@/components/ChatSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 md:gap-24 pb-16 md:pb-24">
      <HeroSection />
      <SplitSection />
      <ReferansSection />
      <ChatSection />
      <Footer />
    </main>
  );
}
