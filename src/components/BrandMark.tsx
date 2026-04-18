import primaryIconDark from '@/assets/logos/primary_icon_dark.png';
import primaryIconLight from '@/assets/logos/primary_icon_light.png';
import primaryLogoDark from '@/assets/logos/primary_logo_dark.png';
import primaryLogoLight from '@/assets/logos/primary_logo_light.png';
import smallIconDark from '@/assets/logos/small_icon_dark.png';
import smallIconLight from '@/assets/logos/small_icon_light.png';
import type { ThemeMode } from '@/lib/types';

interface BrandMarkProps {
  alt?: string;
  className?: string;
  theme: ThemeMode;
  variant: 'primary-logo' | 'primary-icon' | 'small-icon';
}

const logoMap = {
  'primary-logo': {
    dark: primaryLogoDark,
    light: primaryLogoLight
  },
  'primary-icon': {
    dark: primaryIconDark,
    light: primaryIconLight
  },
  'small-icon': {
    dark: smallIconDark,
    light: smallIconLight
  }
};

export function BrandMark({ alt = 'Scissorhands', className, theme, variant }: BrandMarkProps) {
  return (
    <img
      alt={alt}
      className={className}
      src={logoMap[variant][theme]}
    />
  );
}
