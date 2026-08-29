import { Megaphone } from 'lucide-react';
import type { OrgAlert } from '../../data/types';
import './OrgAlertBanner.css';

interface OrgAlertBannerProps {
  alert: OrgAlert | null;
}

/**
 * Reserved, rare organizational alert slot. Renders nothing at all when
 * there's no alert — not a muted placeholder box — so an alert-absent day
 * (the common case) leaves no visual gap or dead space.
 */
export function OrgAlertBanner({ alert }: OrgAlertBannerProps) {
  if (!alert) return null;

  return (
    <div className="hv-org-alert" role="status">
      <Megaphone aria-hidden="true" className="hv-org-alert__icon" />
      <p className="hv-org-alert__message">{alert.message}</p>
    </div>
  );
}
