import { CheckCircle2 } from 'lucide-react';
import type { WorkItem } from '../../data/types';
import './WorkItemDetailPanel.css';

interface WorkItemDetailPanelProps {
  item: WorkItem;
  id: string;
  onComplete: (id: string) => void;
}

/**
 * Progressive-disclosure detail region shared by both the primary work-item
 * cards and the attention list rows — a small expansion within the same
 * card, never a modal. Shows enough context to understand the request and,
 * when the item has a wired action, the button that changes its state.
 */
export function WorkItemDetailPanel({ item, id, onComplete }: WorkItemDetailPanelProps) {
  return (
    <div id={id} className="hv-detail-panel" role="region" aria-label={`Details for ${item.title}`}>
      <p className="hv-detail-panel__text">{item.detail}</p>

      {item.completed ? (
        <p className="hv-detail-panel__done">
          <CheckCircle2 aria-hidden="true" className="hv-detail-panel__done-icon" />
          {item.completedStatusLabel}
        </p>
      ) : item.detailActionLabel ? (
        <button type="button" className="hv-detail-panel__action" onClick={() => onComplete(item.id)}>
          {item.detailActionLabel}
        </button>
      ) : null}
    </div>
  );
}
