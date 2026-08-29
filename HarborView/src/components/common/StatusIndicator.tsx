import './StatusIndicator.css';

export type StatusTone = 'risk' | 'attention' | 'done' | 'neutral';

interface StatusIndicatorProps {
  tone: StatusTone;
  label: string;
  /** Visually smaller, for dense list rows. */
  compact?: boolean;
}

/**
 * Semantic status dot + text label. Status is never conveyed by color alone —
 * the label is always rendered, and the dot carries an accessible name too so
 * assistive tech announces the meaning, not just "colored circle".
 */
export function StatusIndicator({ tone, label, compact = false }: StatusIndicatorProps) {
  return (
    <span className={`hv-status hv-status--${tone}${compact ? ' hv-status--compact' : ''}`}>
      <span className="hv-status__dot" aria-hidden="true" />
      <span className="hv-status__label">{label}</span>
    </span>
  );
}
