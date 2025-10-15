import { HeroSection } from "@/components/hero-section";
import { SpecialsSection } from "@/components/specials-section";
import { AboutSection } from "@/components/about-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SpecialsSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
