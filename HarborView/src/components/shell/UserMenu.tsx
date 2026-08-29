import { ChevronDown } from 'lucide-react';
import { useHeaderPopover } from './useHeaderPopover';
import './UserMenu.css';
import './HeaderPopover.css';

interface UserMenuProps {
  firstName: string;
  role: string;
}

function initialsFor(firstName: string): string {
  return firstName.slice(0, 1).toUpperCase();
}

export function UserMenu({ firstName, role }: UserMenuProps) {
  const { isOpen, setIsOpen, containerRef } = useHeaderPopover<HTMLDivElement>();

  return (
    <div className="hv-header-popover" ref={containerRef}>
      <button
        type="button"
        className="hv-user-menu__trigger"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="hv-user-menu__avatar" aria-hidden="true">
          {initialsFor(firstName)}
        </span>
        <span className="hv-visually-hidden">Account menu for {firstName}</span>
        <ChevronDown aria-hidden="true" className="hv-user-menu__chevron" />
      </button>
      {isOpen ? (
        <div className="hv-header-popover__panel hv-header-popover__panel--right" role="menu" aria-label="Account">
          <p className="hv-header-popover__title">{firstName}</p>
          <p className="hv-header-popover__body">{role} · Harbor Community Services</p>
        </div>
      ) : null}
    </div>
  );
}
