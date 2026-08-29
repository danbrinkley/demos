import { ArrowRight } from 'lucide-react';
import { useId } from 'react';
import { relativeDueLabel } from '../../data/demoDate';
import type { WorkItem } from '../../data/types';
import { StatusIndicator } from '../../components/common/StatusIndicator';
import type { StatusTone } from '../../components/common/StatusIndicator';
import './PriorityWorkItemCard.css';
import { WorkItemDetailPanel } from './WorkItemDetailPanel';

/** Purely presentational — derived from list position, not stored on the item. */
export type CardEmphasis = 'primary' | 'secondary';

interface PriorityWorkItemCardProps {
  item: WorkItem;
  emphasis: CardEmphasis;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onComplete: (id: string) => void;
}

function toneFor(item: WorkItem): StatusTone {
  if (item.completed) return 'done';
  if (item.status === 'pending_approval') return 'attention';
  return 'neutral';
}

export function PriorityWorkItemCard({ item, emphasis, isExpanded, onToggle, onComplete }: PriorityWorkItemCardProps) {
  const panelId = useId();

  return (
    <article
      id={`work-item-${item.id}`}
      tabIndex={-1}
      className={`hv-priority-card${item.completed ? ' hv-priority-card--completed' : ''}`}
    >
      <div className="hv-priority-card__top">
        <div className="hv-priority-card__heading-group">
          {item.sourceSystem ? <p className="hv-priority-card__source">{item.sourceSystem}</p> : null}
          <h3 className="hv-priority-card__title">{item.title}</h3>
        </div>
        <StatusIndicator tone={toneFor(item)} label={item.statusLabel} />
      </div>

      <p className="hv-priority-card__summary">{item.summary}</p>

      {item.dueDate ? <p className="hv-priority-card__due">{relativeDueLabel(item.dueDate)}</p> : null}

      <button
        type="button"
        className={`hv-priority-card__toggle hv-priority-card__toggle--${emphasis}`}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => onToggle(item.id)}
      >
        {item.primaryActionLabel}
        <ArrowRight aria-hidden="true" className="hv-priority-card__arrow" />
      </button>

      {isExpanded ? <WorkItemDetailPanel item={item} id={panelId} onComplete={onComplete} /> : null}
    </article>
  );
}
