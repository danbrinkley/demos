import { NavLink } from 'react-router-dom';
import './PrimaryNav.css';

interface NavItem {
  label: string;
  to: string;
}

/**
 * Visible Week 1 navigation. Future Harbor View areas (My Work, Projects,
 * Requests, People & Capacity, Insights, Leadership) are added here as more
 * entries — the shell itself doesn't change shape to accommodate them.
 */
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'My Work', to: '/my-work' },
  { label: 'Resources', to: '/resources' },
  { label: 'News', to: '/news' },
];

interface PrimaryNavProps {
  id?: string;
  onNavigate?: () => void;
}

export function PrimaryNav({ id, onNavigate }: PrimaryNavProps) {
  return (
    <nav aria-label="Primary" id={id} className="hv-primary-nav">
      <ul className="hv-primary-nav__list">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              onClick={onNavigate}
              className={({ isActive }) => `hv-primary-nav__link${isActive ? ' hv-primary-nav__link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
