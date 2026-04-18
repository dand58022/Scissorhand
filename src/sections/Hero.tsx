import { Link } from 'react-router';
import { BrandMark } from '@/components/BrandMark';
import type { ThemeMode } from '@/lib/types';

interface HeroProps {
  theme: ThemeMode;
}

export function Hero({ theme }: HeroProps) {
  return (
    <section className="hero-section hero-section--centered">
      <div className="hero-divider" />
      <p className="eyebrow">Korean editorial salon in Raleigh</p>
      <BrandMark theme={theme} variant="primary-logo" className="hero-logo" />
      <p>Precision Korean hair design. Clean cuts, soft texture, and tailored styling.</p>
      <Link className="primary-action hero-cta" to="/booking">
        Book Appointment
      </Link>
      <div className="hero-divider hero-divider--muted" />
    </section>
  );
}
