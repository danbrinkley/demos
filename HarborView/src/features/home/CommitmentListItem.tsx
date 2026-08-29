import { Building2, CalendarClock, Plane, User } from 'lucide-react';
import { dayLabel } from '../../data/demoDate';
import type { Commitment, CommitmentSource } from '../../data/types';
import './CommitmentListItem.css';

const SOURCE_META: Record<CommitmentSource, { label: string; icon: typeof CalendarClock }> = {
  personal: { label: 'Personal calendar', icon: User },
  project: { label: 'Project schedule', icon: CalendarClock },
  travel: { label: 'Travel', icon: Plane },
  org: { label: 'Organizational', icon: Building2 },
};

interface CommitmentListItemProps {
  commitment: Commitment;
}

export function CommitmentListItem({ commitment }: CommitmentListItemProps) {
  const meta = SOURCE_META[commitment.source];
  const Icon = meta.icon;

  return (
    <li className="hv-commitment-item">
      <span className="hv-commitment-item__day">{dayLabel(commitment.date)}</span>
      <span className="hv-commitment-item__body">
        <span className="hv-commitment-item__label">{commitment.label}</span>
        <span className="hv-commitment-item__source">
          <Icon aria-hidden="true" className="hv-commitment-item__source-icon" />
          {meta.label}
        </span>
      </span>
    </li>
  );
}
