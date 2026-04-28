import { Link } from 'react-router';
import type { ThemeMode } from '@/lib/types';
import { BrandMark } from './BrandMark';
import { ThemeToggle } from './ThemeToggle';
import { ViewToggle } from './ViewToggle';

interface NavbarProps {
  isDemoMode: boolean;
  onStartDemo: () => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
}

export function Navbar({ isDemoMode, onStartDemo, theme, onThemeToggle }: NavbarProps) {
  return (
    <header className="site-nav">
      <Link className="wordmark" to="/" aria-label="Scissorhands home">
        <BrandMark theme={theme} placement="navbar" className="nav-logo" />
        <span>Scissorhands</span>
      </Link>
      <div className="site-nav__actions">
        <button type="button" className="secondary-action demo-trigger" onClick={onStartDemo}>
          {isDemoMode ? 'Restart Demo' : 'Start Demo'}
        </button>
        <ViewToggle />
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>
    </header>
  );
}
