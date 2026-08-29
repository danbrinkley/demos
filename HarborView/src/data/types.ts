/**
 * Normalized Harbor View data model.
 *
 * These shapes are intentionally source-agnostic: a WorkItem does not know
 * whether it came from a Planner task, an Asana item, a SharePoint list, or
 * (as in this build) local sample data. `sourceSystem` is a display label
 * only, never a discriminant the UI branches on. A future adapter can
 * populate this same shape from a real system without any component change
 * (see data/adapters.ts).
 */

export type WorkItemTier = 'primary' | 'attention';

export type WorkItemKind = 'expense' | 'report' | 'payment' | 'intake' | 'project' | 'volunteer_hours';

export type WorkItemStatus =
  | 'pending_approval'
  | 'approved'
  | 'in_progress'
  | 'awaiting_review'
  | 'ready_to_process'
  | 'not_logged';

export interface WorkItem {
  id: string;
  tier: WorkItemTier;
  kind: WorkItemKind;
  title: string;
  /** Originating system or work type — surfaced only when it helps orient the user. */
  sourceSystem?: string;
  status: WorkItemStatus;
  /** Short, human status phrase shown next to the status dot (e.g. "Awaiting your approval"). */
  statusLabel: string;
  /** One-line supporting detail shown on the compact card/row. */
  summary: string;
  /** Longer context shown only in the expanded detail panel. */
  detail: string;
  dueDate?: string;
  primaryActionLabel: string;
  /** Action offered inside the detail panel, when different from browsing. */
  detailActionLabel?: string;
  /** Status phrase to show once the detail action has been completed. */
  completedStatusLabel?: string;
  /** Full-sentence phrasing announced to assistive tech when the action completes. */
  completedAnnouncement?: string;
  requiresAction: boolean;
  /** Set locally once the detail action has been taken. Not part of the seed data. */
  completed?: boolean;
}

export type CommitmentSource = 'personal' | 'project' | 'travel' | 'org';

export interface Commitment {
  id: string;
  label: string;
  date: string;
  source: CommitmentSource;
  detail?: string;
}

export type RequestStatus = 'assigned' | 'pending_approval' | 'awaiting_review';

export interface WorkspaceRequest {
  id: string;
  title: string;
  submittedDate: string;
  status: RequestStatus;
  statusLabel: string;
}

export type ProjectHealth = 'on_track' | 'needs_attention' | 'nearing_completion';

export interface WorkspaceProject {
  id: string;
  title: string;
  program: string;
  progress: number;
  health: ProjectHealth;
  statusLabel: string;
  nextAction: string;
}

export type AlertSeverity = 'notice';

export interface OrgAlert {
  id: string;
  message: string;
  severity: AlertSeverity;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
}

export interface CurrentUser {
  id: string;
  firstName: string;
  role: string;
}

export type SearchResultType = 'work_item' | 'person' | 'resource';

export interface SearchResult {
  type: SearchResultType;
  id: string;
  label: string;
  meta: string;
}
