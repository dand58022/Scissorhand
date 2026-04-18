import { BrandMark } from '@/components/BrandMark';
import type { ThemeMode } from '@/lib/types';

interface FooterProps {
  theme: ThemeMode;
}

export function Footer({ theme }: FooterProps) {
  return (
    <footer className="site-footer">
      <BrandMark theme={theme} variant="primary-icon" className="footer-logo" />
      <div>
        <strong>Scissorhands</strong>
        <p>214 Linden Walk, Raleigh, NC</p>
      </div>
      <div>
        <strong>Hours</strong>
        <p>Monday - Friday, 10:00 AM - 6:00 PM</p>
        <p>Saturday, 10:00 AM - 4:00 PM</p>
      </div>
      <div>
        <strong>Contact</strong>
        <p>Contact integration coming soon</p>
      </div>
    </footer>
  );
}
