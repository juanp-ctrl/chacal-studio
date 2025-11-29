import { HeroSection } from "@/components/sections/HeroSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PlantBasedTreatySection } from "@/components/sections/PlantBasedTreatySection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <MethodSection />
      <ImpactSection />
      <ServicesSection />
      <PlantBasedTreatySection />
    </div>
  );
}
