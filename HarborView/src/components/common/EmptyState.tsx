import type { ReactNode } from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
}

/**
 * Calm, specific empty state, reused for every section's sparse/complete
 * case (no urgent items, alert absent, everything done). Never filler —
 * copy is passed in by the caller so each section says something true and
 * specific rather than a generic "Nothing here".
 */
export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="hv-empty-state">
      <span className="hv-empty-state__icon" aria-hidden="true">
        {icon}
      </span>
      <p className="hv-empty-state__title">{title}</p>
      {description ? <p className="hv-empty-state__description">{description}</p> : null}
    </div>
  );
}
