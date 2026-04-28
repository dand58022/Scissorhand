import { AboutSection } from '@/sections/AboutSection';
import { GallerySection } from '@/sections/GallerySection';
import { Hero } from '@/sections/Hero';
import { LocationSection } from '@/sections/LocationSection';
import { ReservationsCtaSection } from '@/sections/ReservationsCtaSection';
import { ReviewsSection } from '@/sections/ReviewsSection';
import { ServicesSection } from '@/sections/ServicesSection';
import { StylistsSection } from '@/sections/StylistsSection';
import type { Service, Stylist, ThemeMode } from '@/lib/types';

interface HomePageProps {
  onStartDemo: () => void;
  services: Service[];
  stylists: Stylist[];
  theme: ThemeMode;
}

export function HomePage(props: HomePageProps) {
  return (
    <main className="view-shell" id="top">
      <Hero theme={props.theme} onStartDemo={props.onStartDemo} />
      <AboutSection />
      <ServicesSection services={props.services} />
      <GallerySection />
      <StylistsSection stylists={props.stylists} />
      <ReviewsSection />
      <LocationSection />
      <ReservationsCtaSection />
    </main>
  );
}
