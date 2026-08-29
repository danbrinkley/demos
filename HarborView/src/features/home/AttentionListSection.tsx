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
    <section className="hv-attention-section" aria-labelledby="hv-attention-heading">
      <h2 id="hv-attention-heading" className="hv-section-heading hv-section-heading--secondary">
        Needs your attention
      </h2>

      {items.length === 0 ? (
        <EmptyState icon={<Inbox />} title="Nothing else needs a look today." />
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
