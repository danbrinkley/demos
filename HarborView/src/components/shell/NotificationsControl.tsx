import { Bell } from 'lucide-react';
import { IconButton } from '../common/IconButton';
import { useHeaderPopover } from './useHeaderPopover';
import './HeaderPopover.css';

/**
 * Notifications affordance. The full notification center is out of Week 1
 * scope, so this offers a real, accessible control with an honest
 * placeholder destination rather than a non-functional decoration.
 */
export function NotificationsControl() {
  const { isOpen, setIsOpen, containerRef } = useHeaderPopover<HTMLDivElement>();

  return (
    <div className="hv-header-popover" ref={containerRef}>
      <IconButton
        icon={<Bell />}
        label="Notifications"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((open) => !open)}
      />
      {isOpen ? (
        <div className="hv-header-popover__panel" role="dialog" aria-label="Notifications">
          <p className="hv-header-popover__title">You're caught up</p>
          <p className="hv-header-popover__body">
            Harbor View's notification center is coming in a future update. Your open items live in What needs
            you.
          </p>
        </div>
      ) : null}
    </div>
  );
}
