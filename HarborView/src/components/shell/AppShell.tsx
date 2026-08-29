import { Menu, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useId, useState } from 'react';
import { useWorkspaceData } from '../../state/WorkspaceDataContext';
import { LiveRegion } from '../common/LiveRegion';
import './AppShell.css';
import { GlobalSearch } from './GlobalSearch';
import { HarborMark } from './HarborMark';
import { NotificationsControl } from './NotificationsControl';
import { PrimaryNav } from './PrimaryNav';
import { UserMenu } from './UserMenu';
import { WorkspaceFooter } from './WorkspaceFooter';

interface AppShellProps {
  children: ReactNode;
}

/**
 * Reusable Harbor View application shell: identity, primary navigation,
 * global search, notifications, and the account control. Every future
 * Harbor View screen mounts inside this same shell.
 */
export function AppShell({ children }: AppShellProps) {
  const { liveMessage, currentUser } = useWorkspaceData();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navId = useId();

  return (
    <div className="hv-shell">
      <a href="#hv-main-content" className="hv-skip-link">
        Skip to main content
      </a>

      <header className="hv-shell__header">
        <div className="hv-shell__header-inner">
          <div className="hv-shell__brand">
            <HarborMark />
            <span className="hv-brand__text">
              <span className="hv-brand__primary">Harbor View</span>
              <span className="hv-brand__secondary">Community Services Workspace</span>
            </span>
          </div>

          <div className="hv-shell__nav hv-shell__nav--desktop">
            <PrimaryNav />
          </div>

          <div className="hv-shell__actions">
            <div className="hv-shell__search">
              <GlobalSearch />
            </div>
            <NotificationsControl />
            <UserMenu firstName={currentUser.firstName} role={currentUser.role} />
            <button
              type="button"
              className="hv-shell__nav-toggle"
              aria-expanded={isMobileNavOpen}
              aria-controls={navId}
              onClick={() => setIsMobileNavOpen((open) => !open)}
            >
              {isMobileNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              <span className="hv-visually-hidden">{isMobileNavOpen ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>

        <div id={navId} className="hv-shell__nav hv-shell__nav--mobile" hidden={!isMobileNavOpen}>
          <GlobalSearch />
          <PrimaryNav onNavigate={() => setIsMobileNavOpen(false)} />
        </div>
      </header>

      <main id="hv-main-content" className="hv-shell__main">
        {children}
      </main>

      <WorkspaceFooter />

      <LiveRegion message={liveMessage} />
    </div>
  );
}
