import { CalendarCheck } from 'lucide-react';
import type { Commitment } from '../../data/types';
import { EmptyState } from '../../components/common/EmptyState';
import { CommitmentListItem } from './CommitmentListItem';
import './ThisWeekSection.css';

interface ThisWeekSectionProps {
  commitments: Commitment[];
}

export function ThisWeekSection({ commitments }: ThisWeekSectionProps) {
  return (
    <section className="hv-this-week" aria-labelledby="hv-upcoming-heading">
      <div className="hv-panel-heading">
        <div>
          <p className="hv-panel-heading__eyebrow">What is ahead</p>
          <h2 id="hv-upcoming-heading" className="hv-section-heading hv-section-heading--secondary">
            Upcoming
          </h2>
        </div>
      </div>

      {commitments.length === 0 ? (
        <EmptyState icon={<CalendarCheck />} title="A light week — nothing else on the calendar." />
      ) : (
        <ul className="hv-this-week__list">
          {commitments.map((commitment) => (
            <CommitmentListItem key={commitment.id} commitment={commitment} />
          ))}
        </ul>
      )}
    </section>
  );
}
