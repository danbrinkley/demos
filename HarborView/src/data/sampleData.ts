import type {
  Commitment,
  CurrentUser,
  OrgAlert,
  Resource,
  StaffMember,
  WorkItem,
  WorkspaceProject,
  WorkspaceRequest,
} from './types';

/**
 * Deterministic Harbor Community Services sample data for the Week 1 demo.
 * Organization facts (name, programs, staff, palette) come from the Demo
 * Site Content Kit. Jordan and the day's specific work items come from the
 * approved Build Brief 001 scenario. Nothing here is randomly generated —
 * every date, status, and status change is fixed so the screen behaves the
 * same on every load.
 */

export const currentUser: CurrentUser = {
  id: 'jordan',
  firstName: 'Jordan',
  role: 'Program Coordinator',
};

/**
 * Empty most days by design (methodology doc: "empty most days by design").
 * Set to an OrgAlert object to demonstrate the alert-present state.
 */
export const orgAlert: OrgAlert | null = null;

export const sampleWorkItems: WorkItem[] = [
  {
    id: 'report-q3-program',
    tier: 'primary',
    kind: 'report',
    title: 'Complete the Q3 program report',
    sourceSystem: 'Community Impact Report',
    status: 'in_progress',
    statusLabel: 'In progress',
    summary: 'Finish the outcome summary before board materials are assembled.',
    detail:
      'The Q3 Community Outreach program report feeds directly into Wednesday’s board materials. Completing the outcome summary today gives the board packet room to come together.',
    dueDate: '2026-09-02',
    primaryActionLabel: 'Continue report',
    requiresAction: true,
  },
  {
    id: 'food-drive-partner-briefing',
    tier: 'primary',
    kind: 'project',
    title: 'Prepare the partner briefing',
    sourceSystem: 'Fall Food Drive',
    status: 'in_progress',
    statusLabel: 'In progress',
    summary: 'Confirm the distribution plan and partner responsibilities.',
    detail:
      'Tomorrow’s partner briefing needs the final distribution plan, contact list, and a clear handoff for each community site.',
    dueDate: '2026-09-01',
    primaryActionLabel: 'Open briefing',
    requiresAction: true,
  },
  {
    id: 'volunteer-intake-decisions',
    tier: 'primary',
    kind: 'intake',
    title: 'Review intake decisions',
    sourceSystem: 'Volunteer Intake Redesign',
    status: 'awaiting_review',
    statusLabel: 'Ready for review',
    summary: 'Resolve the final two questions before the form can be tested.',
    detail:
      'The redesigned volunteer intake form is nearly ready for testing. The team needs your decision on availability options and emergency-contact guidance.',
    dueDate: '2026-09-03',
    primaryActionLabel: 'Review decisions',
    requiresAction: true,
  },
  {
    id: 'expense-mileage-outreach',
    tier: 'attention',
    kind: 'expense',
    title: 'Expense pending approval',
    sourceSystem: 'Expense workflow',
    status: 'pending_approval',
    statusLabel: 'Awaiting your approval',
    summary: 'One manager approval required before submission.',
    detail:
      'Mileage and supplies for Community Outreach, $184.50. This needs your sign-off as program coordinator before it moves to Finance.',
    primaryActionLabel: 'Review expense',
    detailActionLabel: 'Approve',
    completedStatusLabel: 'Approved — sent to Finance',
    completedAnnouncement: 'Expense approved and sent to Finance.',
    requiresAction: true,
  },
  {
    id: 'expense-consultant-payment',
    tier: 'attention',
    kind: 'payment',
    title: 'Expense: consultant payment',
    sourceSystem: 'Expense workflow',
    status: 'ready_to_process',
    statusLabel: 'No due date — process when convenient',
    summary: 'Approved and ready to send.',
    detail:
      'The facilitator payment for last month’s volunteer training session is approved and waiting on you to release it for payment.',
    primaryActionLabel: 'Process payment',
    requiresAction: true,
  },
  {
    id: 'intake-form-review',
    tier: 'attention',
    kind: 'intake',
    title: 'Intake form awaiting review',
    sourceSystem: 'Food Pantry intake',
    status: 'awaiting_review',
    statusLabel: 'Submitted Friday · 3 days ago',
    summary: 'A new Food Pantry intake form needs a first read.',
    detail:
      'A household submitted a Food Pantry intake form Friday. It just needs a first read to confirm the household qualifies for weekly distribution.',
    primaryActionLabel: 'Review intake form',
    requiresAction: true,
  },
  {
    id: 'volunteer-hours-log',
    tier: 'attention',
    kind: 'volunteer_hours',
    title: 'Volunteer hours to log',
    sourceSystem: 'Volunteer tracking',
    status: 'not_logged',
    statusLabel: 'Log by Friday, Sept 4',
    summary: 'This month’s volunteer hours still need to be logged.',
    detail:
      'August’s volunteer hours for the outreach team haven’t been logged yet. Logging them by Friday keeps the monthly grant report on schedule.',
    dueDate: '2026-09-04',
    primaryActionLabel: 'Log volunteer hours',
    requiresAction: true,
  },
];

export const sampleRequests: WorkspaceRequest[] = [
  {
    id: 'request-communications-support',
    title: 'Fall Food Drive communications support',
    submittedDate: '2026-08-27',
    status: 'assigned',
    statusLabel: 'Assigned to Communications',
  },
  {
    id: 'request-laptop-access',
    title: 'Volunteer laptop access',
    submittedDate: '2026-08-26',
    status: 'pending_approval',
    statusLabel: 'Pending IT approval',
  },
  {
    id: 'request-staffing-support',
    title: 'September outreach staffing support',
    submittedDate: '2026-08-24',
    status: 'awaiting_review',
    statusLabel: 'Awaiting manager review',
  },
];

export const sampleProjects: WorkspaceProject[] = [
  {
    id: 'project-impact-report',
    title: 'Community Impact Report',
    program: 'Community Outreach',
    progress: 68,
    health: 'on_track',
    statusLabel: 'On track',
    nextAction: 'Complete the Q3 outcome summary',
  },
  {
    id: 'project-fall-food-drive',
    title: 'Fall Food Drive',
    program: 'Food Access',
    progress: 42,
    health: 'needs_attention',
    statusLabel: 'Partner briefing due',
    nextAction: 'Confirm partner responsibilities',
  },
  {
    id: 'project-volunteer-intake',
    title: 'Volunteer Intake Redesign',
    program: 'Volunteer & Outreach',
    progress: 81,
    health: 'nearing_completion',
    statusLabel: 'Nearing completion',
    nextAction: 'Review final form decisions',
  },
];

export const sampleCommitments: Commitment[] = [
  {
    id: 'commitment-program-checkin',
    label: 'Program check-in',
    date: '2026-08-31',
    source: 'project',
    detail: 'Weekly Community Outreach program schedule.',
  },
  {
    id: 'commitment-board-materials',
    label: 'Board materials due',
    date: '2026-09-02',
    source: 'org',
    detail: 'Organizational commitment ahead of the board meeting.',
  },
  {
    id: 'commitment-alvarez-ooo',
    label: 'Alvarez out of office',
    date: '2026-09-03',
    source: 'travel',
    detail: 'Colleague travel/out-of-office calendar.',
  },
];

/** Staff directory, from the Demo Site Content Kit — used for global search. */
export const sampleStaff: StaffMember[] = [
  { id: 'staff-mchen', name: 'Maria Chen', role: 'Executive Director', email: 'mchen@harborcommunityservices.org' },
  {
    id: 'staff-jwhitfield',
    name: 'James Whitfield',
    role: 'Program Director, Food Access',
    email: 'jwhitfield@harborcommunityservices.org',
  },
  {
    id: 'staff-panand',
    name: 'Priya Anand',
    role: 'Program Director, Housing Support',
    email: 'panand@harborcommunityservices.org',
  },
  {
    id: 'staff-dosei',
    name: 'Derek Osei',
    role: 'Volunteer & Outreach Coordinator',
    email: 'dosei@harborcommunityservices.org',
  },
  { id: 'staff-lmarsh', name: 'Linda Marsh', role: 'Operations Manager', email: 'lmarsh@harborcommunityservices.org' },
];

/** A small slice of the Resources taxonomy, from the Demo Site Content Kit — used for global search. */
export const sampleResources: Resource[] = [
  { id: 'resource-volunteer-signup', title: 'Volunteer Sign-Up Form', category: 'Program Forms' },
  { id: 'resource-food-pantry-intake', title: 'Food Pantry Intake Form', category: 'Program Forms' },
  { id: 'resource-grant-compliance', title: 'Grant Compliance Checklist', category: 'Grant Resources' },
  { id: 'resource-board-bylaws', title: 'Board Bylaws', category: 'Board Materials' },
  { id: 'resource-volunteer-onboarding', title: 'New Volunteer Onboarding SOP', category: 'Templates and SOPs' },
  { id: 'resource-client-confidentiality', title: 'Client Confidentiality Policy', category: 'Policies' },
];
