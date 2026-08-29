import { ArrowUpRight, CircleCheck, Clock3, UserRoundCheck } from 'lucide-react';
import type { WorkspaceRequest } from '../../data/types';
import './MyRequestsSection.css';

function RequestIcon({ status }: { status: WorkspaceRequest['status'] }) {
  if (status === 'assigned') return <UserRoundCheck aria-hidden="true" />;
  if (status === 'pending_approval') return <Clock3 aria-hidden="true" />;
  return <CircleCheck aria-hidden="true" />;
}

export function MyRequestsSection({ requests }: { requests: WorkspaceRequest[] }) {
  return (
    <section className="hv-requests" aria-labelledby="hv-requests-heading">
      <div className="hv-panel-heading">
        <div>
          <p className="hv-panel-heading__eyebrow">What you are waiting on</p>
          <h2 id="hv-requests-heading" className="hv-section-heading hv-section-heading--secondary">My requests</h2>
        </div>
        <span className="hv-panel-heading__count">{requests.length} open</span>
      </div>
      <ul className="hv-requests__list">
        {requests.map((request) => (
          <li className="hv-request" key={request.id}>
            <span className={`hv-request__icon hv-request__icon--${request.status}`}>
              <RequestIcon status={request.status} />
            </span>
            <span className="hv-request__copy">
              <span className="hv-request__title">{request.title}</span>
              <span className="hv-request__status">{request.statusLabel}</span>
            </span>
            <ArrowUpRight className="hv-request__arrow" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  );
}
