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
    <div className="hv-org-alert">
      <div className="hv-org-alert__inner">
        <span className="hv-org-alert__label">Organization notice</span>
        <span className="hv-org-alert__divider" aria-hidden="true">·</span>
        <p className="hv-org-alert__message">{alert.message}</p>
        <span className="hv-org-alert__divider" aria-hidden="true">·</span>
        <a href="/resources#office-closure">View details</a>
      </div>
    </div>
  );
}
