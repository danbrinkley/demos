import { CheckSquare2, FileClock, FolderKanban } from 'lucide-react';
import type { WorkItem, WorkspaceProject, WorkspaceRequest } from '../../data/types';
import './WorkSummarySection.css';

interface WorkSummarySectionProps {
  tasks: WorkItem[];
  requests: WorkspaceRequest[];
  projects: WorkspaceProject[];
}

export function WorkSummarySection({ tasks, requests, projects }: WorkSummarySectionProps) {
  const pendingRequests = requests.filter((request) => request.status !== 'assigned').length;
  const projectsNeedingAttention = projects.filter((project) => project.health === 'needs_attention').length;

  const summaries = [
    { label: 'My tasks', value: tasks.length, detail: `${tasks.filter((task) => task.requiresAction).length} still open`, icon: CheckSquare2 },
    { label: 'My requests', value: requests.length, detail: `${pendingRequests} pending`, icon: FileClock },
    { label: 'Active projects', value: projects.length, detail: `${projectsNeedingAttention} needs attention`, icon: FolderKanban },
  ];

  return (
    <section className="hv-work-summary" aria-labelledby="hv-work-summary-heading">
      <div className="hv-work-summary__heading-row">
        <div>
          <p className="hv-section-eyebrow">Your workspace</p>
          <h2 id="hv-work-summary-heading" className="hv-section-heading">A clear view of your work</h2>
        </div>
        <p>See what you own, what you are waiting on, and what is moving.</p>
      </div>
      <div className="hv-work-summary__grid">
        {summaries.map(({ label, value, detail, icon: Icon }) => (
          <article className="hv-summary-card" key={label}>
            <span className="hv-summary-card__icon" aria-hidden="true"><Icon /></span>
            <span className="hv-summary-card__value">{value}</span>
            <span className="hv-summary-card__copy">
              <h3>{label}</h3>
              <span>{detail}</span>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
