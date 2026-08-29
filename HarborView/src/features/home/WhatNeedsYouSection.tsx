import { PartyPopper } from 'lucide-react';
import type { WorkItem } from '../../data/types';
import { EmptyState } from '../../components/common/EmptyState';
import { PriorityWorkItemCard } from './PriorityWorkItemCard';
import './WhatNeedsYouSection.css';

interface WhatNeedsYouSectionProps {
  items: WorkItem[];
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onComplete: (id: string) => void;
}

/**
 * The primary section and strongest visual priority on Home. Three ranked
 * focus items drawn from the normalized work queue.
 */
export function WhatNeedsYouSection({ items, expandedIds, onToggle, onComplete }: WhatNeedsYouSectionProps) {
  const remaining = items.filter((item) => !item.completed);

  return (
    <section className="hv-what-needs-you" aria-labelledby="hv-what-needs-you-heading">
      <div className="hv-section-intro">
        <div>
          <p className="hv-section-eyebrow">What needs you today</p>
          <h2 id="hv-what-needs-you-heading" className="hv-section-heading">
            Your top three
          </h2>
        </div>
        <p className="hv-section-intro__copy">The work most deserving of your focus right now.</p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<PartyPopper />}
          title="Nothing needs your attention right now."
          description="New priority items will show up here as they come in."
        />
      ) : remaining.length === 0 ? (
        <EmptyState
          icon={<PartyPopper />}
          title="You're caught up."
          description="Both priority items are complete. Nice work this morning."
        />
      ) : (
        <div className="hv-what-needs-you__grid">
          {items.map((item, index) => (
            <PriorityWorkItemCard
              key={item.id}
              item={item}
              emphasis={index === 0 ? 'primary' : 'secondary'}
              isExpanded={expandedIds.has(item.id)}
              onToggle={onToggle}
              onComplete={onComplete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
