import HeroSection from "@/components/sections/HeroSection";
import MainToolsSection from "@/components/sections/MainToolsSection";
import FeaturedToolsSection from "@/components/sections/FeaturedToolsSection";
import CategorySection from "@/components/sections/CategorySection";
import FluidNav from "@/components/FluidNav";
import SiteFooter from "@/components/SiteFooter";
import InteractiveGradient from "@/components/InteractiveGradient";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <InteractiveGradient />
      <div className="relative z-10">
        <FluidNav />
        <HeroSection />
        <MainToolsSection />
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          <FeaturedToolsSection />
          <CategorySection />
        </div>
        <SiteFooter />
      </div>
    </div>
  );
};

export default Index;
