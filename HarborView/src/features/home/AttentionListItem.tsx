import { ChevronDown } from 'lucide-react';
import { useId } from 'react';
import type { WorkItem } from '../../data/types';
import { StatusIndicator } from '../../components/common/StatusIndicator';
import type { StatusTone } from '../../components/common/StatusIndicator';
import './AttentionListItem.css';
import { WorkItemDetailPanel } from './WorkItemDetailPanel';

interface AttentionListItemProps {
  item: WorkItem;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onComplete: (id: string) => void;
}

function toneFor(item: WorkItem): StatusTone {
  if (item.completed) return 'done';
  if (item.status === 'awaiting_review') return 'attention';
  return 'neutral';
}

export function AttentionListItem({ item, isExpanded, onToggle, onComplete }: AttentionListItemProps) {
  const panelId = useId();

  return (
    <li id={`work-item-${item.id}`} tabIndex={-1} className="hv-attention-item">
      <button
        type="button"
        className="hv-attention-item__row"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => onToggle(item.id)}
      >
        <span className="hv-attention-item__text">
          <span className="hv-attention-item__title">{item.title}</span>
          <StatusIndicator tone={toneFor(item)} label={item.statusLabel} compact />
        </span>
        <ChevronDown aria-hidden="true" className="hv-attention-item__chevron" />
      </button>
      {isExpanded ? (
        <div className="hv-attention-item__panel-wrap">
          <WorkItemDetailPanel item={item} id={panelId} onComplete={onComplete} />
        </div>
      ) : null}
    </li>
  );
}
