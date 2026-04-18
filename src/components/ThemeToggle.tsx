import type { ThemeMode } from '@/lib/types';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button type="button" className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
      <span className="theme-toggle__knob" />
    </button>
  );
}
