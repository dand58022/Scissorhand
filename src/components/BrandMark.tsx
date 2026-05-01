import mainLogo from '../../precision/main_logo.png';
import newLogo from '../../precision/new_logo_cropped.png';
import type { ThemeMode } from '@/lib/types';

interface BrandMarkProps {
  alt?: string;
  className?: string;
  placement: 'navbar' | 'hero' | 'booking' | 'admin' | 'footer';
  theme: ThemeMode;
}

const logoMap = {
  'main-logo': {
    dark: mainLogo,
    light: mainLogo
  },
  'nav-logo': {
    dark: newLogo,
    light: newLogo
  }
};

const placementMap = {
  navbar: {
    variant: 'nav-logo'
  },
  hero: {
    variant: 'main-logo'
  },
  booking: {
    variant: 'nav-logo'
  },
  admin: {
    variant: 'nav-logo'
  },
  footer: {
    variant: 'nav-logo'
  }
} as const;

export function BrandMark({ alt = 'Precision Barber Co.', className, placement, theme }: BrandMarkProps) {
  const { variant } = placementMap[placement];

  return (
    <span className={`brandmark brandmark--${placement} ${className ?? ''}`.trim()}>
      <img
        alt={alt}
        className="brandmark__image"
        src={logoMap[variant][theme]}
      />
    </span>
  );
}
