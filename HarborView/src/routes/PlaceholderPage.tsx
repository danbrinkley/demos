import type { ReactNode } from 'react';
import './PlaceholderPage.css';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: ReactNode;
}

/**
 * Shared shape for the Resources and News placeholders. Confirms the shell
 * and navigation work end to end without building either page's real
 * content — that's explicitly out of scope for Build Brief 001.
 */
export function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="hv-placeholder">
      <span className="hv-placeholder__icon" aria-hidden="true">
        {icon}
      </span>
      <h1 className="hv-placeholder__title">{title}</h1>
      <p className="hv-placeholder__description">{description}</p>
    </div>
  );
}
