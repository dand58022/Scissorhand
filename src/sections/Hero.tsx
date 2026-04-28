import { Link } from 'react-router';
import { BrandMark } from '@/components/BrandMark';
import { SALON_HERO_COPY, SALON_HERO_EYEBROW } from '@/data/salonConfig';
import type { ThemeMode } from '@/lib/types';

interface HeroProps {
  onStartDemo: () => void;
  theme: ThemeMode;
}

export function Hero({ onStartDemo, theme }: HeroProps) {
  return (
    <section className="hero-section hero-section--centered" data-demo="hero">
      <div className="hero-divider" />
      <p className="eyebrow">{SALON_HERO_EYEBROW}</p>
      <BrandMark theme={theme} placement="hero" className="hero-logo" />
      <p>{SALON_HERO_COPY}</p>
      <div className="hero-actions">
        <Link className="primary-action hero-cta" to="/booking" data-demo="home-booking-cta">
          Book Appointment
        </Link>
        <button type="button" className="secondary-action hero-secondary-action" onClick={onStartDemo}>
          Start Demo
        </button>
      </div>
      <div className="hero-divider hero-divider--muted" />
    </section>
  );
}
