import { Accessibility, BadgeDollarSign, BookOpenCheck, CalendarDays, Clock3, Headphones, ReceiptText, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { HarborLogo } from './HarborLogo';
import './WorkspaceFooter.css';

const essentials = [
  { label: 'Timesheets', icon: Clock3, hash: 'timesheets' },
  { label: 'Expense reporting', icon: ReceiptText, hash: 'expenses' },
  { label: 'Request time off', icon: CalendarDays, hash: 'time-off' },
  { label: 'Benefits & payroll', icon: BadgeDollarSign, hash: 'benefits' },
];

const support = [
  { label: 'IT help', icon: Headphones, hash: 'it-help' },
  { label: 'Staff directory', icon: Users, hash: 'directory' },
  { label: 'Policies & procedures', icon: BookOpenCheck, hash: 'policies' },
  { label: 'Accessibility', icon: Accessibility, hash: 'accessibility' },
];

export function WorkspaceFooter() {
  return (
    <footer className="hv-footer">
      <div className="hv-footer__inner">
        <div className="hv-footer__identity">
          <HarborLogo inverse />
          <p>Connecting people to food, housing, and community support.</p>
        </div>

        <nav className="hv-footer__group hv-footer__group--essentials" aria-label="Employee essentials">
          <h2>Employee essentials</h2>
          {essentials.map(({ label, icon: Icon, hash }) => (
            <NavLink to={`/resources#${hash}`} key={label}>
              <span className="hv-footer__icon-well" aria-hidden="true"><Icon /></span>
              {label}
            </NavLink>
          ))}
        </nav>

        <nav className="hv-footer__group hv-footer__group--support" aria-label="Employee support">
          <h2>Employee support</h2>
          {support.map(({ label, icon: Icon, hash }) => (
            <NavLink to={`/resources#${hash}`} key={label}>
              <Icon aria-hidden="true" />
              {label}
            </NavLink>
          ))}
          <p className="hv-footer__meta">© 2026 Harbor Community Services</p>
        </nav>
      </div>
    </footer>
  );
}
