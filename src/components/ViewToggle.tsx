import { NavLink } from 'react-router';

export function ViewToggle() {
  return (
    <div className="segmented-control" aria-label="View switcher">
      {[
        { path: '/', label: 'Home' },
        { path: '/booking', label: 'Booking' },
        { path: '/admin', label: 'Admin' }
      ].map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => isActive ? 'is-active' : ''}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
