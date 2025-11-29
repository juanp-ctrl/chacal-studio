import { HeroSection } from "@/components/sections/HeroSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PlantBasedTreatySection } from "@/components/sections/PlantBasedTreatySection";
import { SDGSection } from "@/components/sections/SDGSection";
import { PartnersSection } from "@/components/sections/PartnersSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <MethodSection />
      <ImpactSection />
      <ServicesSection />
      <PlantBasedTreatySection />
      <SDGSection />
      <PartnersSection />
    </div>
  );
}
