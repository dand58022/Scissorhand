import { BrandMark } from '@/components/BrandMark';
import { SALON_ADDRESS, SALON_HOURS } from '@/data/salonConfig';
import type { ThemeMode } from '@/lib/types';

interface FooterProps {
  theme: ThemeMode;
}

export function Footer({ theme }: FooterProps) {
  return (
    <footer className="site-footer">
      <BrandMark theme={theme} placement="footer" className="footer-logo" />
      <div>
        <strong>Scissorhands</strong>
        <p>{SALON_ADDRESS}</p>
      </div>
      <div>
        <strong>Hours</strong>
        {SALON_HOURS.map((hours) => (
          <p key={hours.label}>{hours.label}, {hours.value}</p>
        ))}
      </div>
      <div>
        <strong>Contact</strong>
        <p>Contact integration coming soon</p>
      </div>
    </footer>
  );
}
