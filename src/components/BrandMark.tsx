import primaryIconDark from '@/assets/logos/primary_icon_dark_cropped.png';
import primaryIconLight from '@/assets/logos/primary_icon_light_cropped.png';
import primaryLogoDark from '@/assets/logos/primary_logo_dark_cropped.png';
import primaryLogoLight from '@/assets/logos/primary_logo_light_cropped.png';
import mainLogoTransparent from '@/assets/logos/main_logo_transparent.png';
import type { ThemeMode } from '@/lib/types';

interface BrandMarkProps {
  alt?: string;
  className?: string;
  placement: 'navbar' | 'hero' | 'booking' | 'admin' | 'footer';
  theme: ThemeMode;
}

const logoMap = {
  'main-logo': {
    dark: mainLogoTransparent,
    light: mainLogoTransparent
  },
  'primary-logo': {
    dark: primaryLogoDark,
    light: primaryLogoLight
  },
  'primary-icon': {
    dark: primaryIconDark,
    light: primaryIconLight
  }
};

const placementMap = {
  // Compact placements use the cropped icon artwork so the visible mark size
  // is controlled by the wrapper rather than by the original transparent canvas.
  navbar: {
    variant: 'main-logo'
  },
  hero: {
    variant: 'primary-logo'
  },
  booking: {
    variant: 'primary-icon'
  },
  admin: {
    variant: 'primary-icon'
  },
  footer: {
    variant: 'primary-icon'
  }
} as const;

export function BrandMark({ alt = 'Scissorhands', className, placement, theme }: BrandMarkProps) {
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
