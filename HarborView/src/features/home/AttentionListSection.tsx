import { Inbox } from 'lucide-react';
import type { WorkItem } from '../../data/types';
import { EmptyState } from '../../components/common/EmptyState';
import { AttentionListItem } from './AttentionListItem';
import './AttentionListSection.css';

interface AttentionListSectionProps {
  items: WorkItem[];
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onComplete: (id: string) => void;
}

export function AttentionListSection({ items, expandedIds, onToggle, onComplete }: AttentionListSectionProps) {
  return (
    <section className="hv-attention-section" aria-labelledby="hv-tasks-heading">
      <div className="hv-panel-heading">
        <div>
          <p className="hv-panel-heading__eyebrow">Your working queue</p>
          <h2 id="hv-tasks-heading" className="hv-section-heading hv-section-heading--secondary">
            My tasks
          </h2>
        </div>
        <span className="hv-panel-heading__count">{items.filter((item) => item.requiresAction && !item.completed).length} open</span>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={<Inbox />} title="Your task list is clear." />
      ) : (
        <ul className="hv-attention-section__list">
          {items.map((item) => (
            <AttentionListItem
              key={item.id}
              item={item}
              isExpanded={expandedIds.has(item.id)}
              onToggle={onToggle}
              onComplete={onComplete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
