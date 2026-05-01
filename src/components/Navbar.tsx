import { SALON_NAME } from '@/data/salonConfig';
import { Link, NavLink, useLocation } from 'react-router';
import type { ThemeMode } from '@/lib/types';
import { BrandMark } from './BrandMark';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  isDemoMode: boolean;
  onStartDemo: () => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
}

export function Navbar({ isDemoMode, onStartDemo, theme, onThemeToggle }: NavbarProps) {
  const location = useLocation();
  const navItems = [
    {
      to: '/customer',
      label: 'Customer View',
      isActive: location.pathname === '/' || location.pathname === '/customer'
    },
    {
      to: '/booking',
      label: 'Booking',
      isActive: location.pathname === '/booking'
    },
    {
      to: '/barber',
      label: 'Barber View',
      isActive: location.pathname === '/barber' || location.pathname === '/admin'
    },
    {
      to: '/owner',
      label: 'Owner View',
      isActive: location.pathname === '/owner'
    }
  ];

  return (
    <header className="site-nav">
      <Link className="wordmark" to="/" aria-label={`${SALON_NAME} home`}>
        <BrandMark theme={theme} placement="navbar" className="nav-logo" />
      </Link>
      <div className="site-nav__actions">
        <button type="button" className="secondary-action demo-trigger" onClick={onStartDemo}>
          {isDemoMode ? 'Restart Demo' : 'Start Demo'}
        </button>
        <nav className="segmented-control" aria-label="Role and route navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={item.isActive ? 'is-active' : ''}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>
    </header>
  );
}
