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
    <section className="hv-this-week" aria-labelledby="hv-this-week-heading">
      <h2 id="hv-this-week-heading" className="hv-section-heading hv-section-heading--secondary">
        This week
      </h2>

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
