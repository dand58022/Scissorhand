import { Link } from 'react-router';
import { BrandMark } from '@/components/BrandMark';
import { SALON_ADDRESS, SALON_HERO_COPY, SALON_HERO_EYEBROW } from '@/data/salonConfig';
import type { ThemeMode } from '@/lib/types';

interface HeroProps {
  theme: ThemeMode;
}

export function Hero({ theme }: HeroProps) {
  return (
    <section className="hero-section hero-section--split" data-demo="hero">
      <div className="hero-visual-card">
        <BrandMark theme={theme} placement="hero" className="hero-logo" />
        <div className="hero-logo-meta">
          <strong>Precision Barber Co.</strong>
          <span>{SALON_ADDRESS}</span>
          <small>Clean cuts, beard work, and sharp detailing in Quincy.</small>
        </div>
      </div>
      <div className="hero-copy hero-copy--compact">
        <div className="hero-copy__stack">
          <p className="eyebrow">{SALON_HERO_EYEBROW}</p>
          <h1>Sharp cuts. Clean service.</h1>
          <p>{SALON_HERO_COPY}</p>
          <div className="hero-actions hero-actions--left">
            <Link className="primary-action hero-cta" to="/booking" data-demo="home-booking-cta">
              Book Appointment
            </Link>
          </div>
          <div className="hero-trust-row" aria-label="Shop highlights">
            <span>Quincy, MA</span>
            <span>Clean cuts</span>
            <span>Beard work</span>
          </div>
        </div>
      </div>
    </section>
  );
}
