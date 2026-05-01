import { AboutSection } from '@/sections/AboutSection';
import { homepageServices } from '@/data/homepageData';
import { Hero } from '@/sections/Hero';
import { LocationSection } from '@/sections/LocationSection';
import { PhotoPlaceholdersSection } from '@/sections/PhotoPlaceholdersSection';
import { ReservationsCtaSection } from '@/sections/ReservationsCtaSection';
import { ServicesSection } from '@/sections/ServicesSection';
import type { ThemeMode } from '@/lib/types';

interface HomePageProps {
  theme: ThemeMode;
}

export function HomePage(props: HomePageProps) {
  return (
    <main className="view-shell home-shell" id="top">
      <Hero theme={props.theme} />
      <PhotoPlaceholdersSection />
      <AboutSection />
      <ServicesSection services={homepageServices} />
      <LocationSection />
      <ReservationsCtaSection />
    </main>
  );
}
