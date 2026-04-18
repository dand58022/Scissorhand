import { Link } from 'react-router';
import type { ThemeMode } from '@/lib/types';
import { BrandMark } from './BrandMark';
import { ThemeToggle } from './ThemeToggle';
import { ViewToggle } from './ViewToggle';

interface NavbarProps {
  theme: ThemeMode;
  onThemeToggle: () => void;
}

export function Navbar({ theme, onThemeToggle }: NavbarProps) {
  return (
    <header className="site-nav">
      <Link className="wordmark" to="/" aria-label="Scissorhands home">
        <BrandMark theme={theme} variant="small-icon" className="nav-logo" />
        <span>Scissorhands</span>
      </Link>
      <div className="site-nav__actions">
        <ViewToggle />
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>
    </header>
  );
}
