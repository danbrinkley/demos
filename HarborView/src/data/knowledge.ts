import type { Resource } from './types';

export const knowledgeTopics = [
  { id: 'programs', label: 'Programs', description: 'Delivery, volunteers, and reporting' },
  { id: 'people', label: 'People & HR', description: 'Benefits, leave, and onboarding' },
  { id: 'finance', label: 'Finance', description: 'Expenses, purchasing, and budgets' },
  { id: 'it', label: 'IT & tools', description: 'Access, software, and support' },
] as const;
export type KnowledgeTopic = typeof knowledgeTopics[number]['id'];
export interface KnowledgeResource extends Resource {
  topic: KnowledgeTopic;
  owner: string;
  reviewed: string;
  nextReview?: string;
  summary: string;
  keywords: string[];
  preview: string[];
  change?: string;
}

// Fictional, explicitly labelled demonstration guidance, not live org policy.
// These same records feed both the Knowledge page and workspace-wide search.
export const knowledgeResources: KnowledgeResource[] = [
  {
    id: 'expense-guide', title: 'Expense reporting guide', category: 'Guide', topic: 'finance', owner: 'Finance',
    reviewed: '2026-08-24', nextReview: '2026-11-24', href: '/knowledge/expense-reporting',
    summary: 'Prepare your expense, submit it with confidence, and know what happens next.',
    keywords: ['submit an expense', 'expense report', 'reimbursement', 'receipts', 'mileage'],
    change: 'Clarified what to include with your submission.', preview: [],
  },
  {
    id: 'expense-template', title: 'Expense report template', category: 'Template', topic: 'finance', owner: 'Finance', reviewed: '2026-08-24',
    summary: 'The information to prepare before submitting an expense.', keywords: ['receipts', 'reimbursement', 'form'],
    preview: ['Employee and report period', 'Project or program and business purpose', 'Expense date, description, category, and amount', 'Receipt reference for each expense', 'Total reimbursement requested and reviewer'],
  },
  {
    id: 'expense-example', title: 'Completed expense report', category: 'Example', topic: 'finance', owner: 'Finance', reviewed: '2026-08-24',
    summary: 'An illustrative report showing the level of detail to include.', keywords: ['reimbursement', 'sample', 'expense report'],
    preview: ['Program: Community Outreach', 'Purpose: Travel and materials for a community session', 'Description: Mileage and supplies, with supporting receipts', 'Total reimbursement requested: $184.50', 'Reviewer: Program coordinator; Finance processes after approval.'],
  },
  {
    id: 'expense-policy', title: 'Expense policy', category: 'Policy', topic: 'finance', owner: 'Finance', reviewed: '2026-08-24',
    summary: 'Sample guidance for checking an expense before submitting it.', keywords: ['eligibility', 'missing receipts', 'purchasing'],
    preview: ['Confirm that the expense was approved and relates to your work.', 'Document the business purpose and relevant project or program.', 'Include receipts or ask Finance what evidence is acceptable when a receipt is missing.', 'Ask Finance to confirm eligibility, applicable limits, and the correct reviewer. This demo does not establish actual policy limits.'],
  },
  {
    id: 'event-guide', title: 'Plan a program event', category: 'Guide', topic: 'programs', owner: 'Programs', reviewed: '2026-08-17',
    summary: 'Planning guidance, templates, and contacts.', keywords: ['event planning', 'partner', 'program'],
    preview: ['Clarify the event purpose, audience, and intended outcome.', 'Confirm an owner, delivery date, budget, and accessibility needs.', 'Agree partner responsibilities and communication steps.', 'Prepare the run of show and confirm who receives each handoff.'],
  },
  {
    id: 'volunteer-guide', title: 'Onboard a volunteer', category: 'Guide', topic: 'programs', owner: 'Programs', reviewed: '2026-08-20',
    summary: 'Everything to help someone get started.', keywords: ['volunteer onboarding', 'orientation'],
    preview: ['Confirm the role, availability, and point of contact.', 'Share orientation guidance and explain privacy expectations.', 'Arrange the tools and access needed for the role.', 'Introduce the team and schedule a first-week check-in.'],
  },
  {
    id: 'volunteer-checklist', title: 'Volunteer onboarding checklist', category: 'Checklist', topic: 'programs', owner: 'Programs', reviewed: '2026-08-21',
    summary: 'A first-week checklist for welcoming a volunteer.', keywords: ['orientation', 'first week'],
    change: 'Updated the first-week checklist.',
    preview: ['Confirm role and contact information.', 'Share orientation and relevant guidance.', 'Check that access and equipment are ready.', 'Introduce the volunteer to their team.', 'Arrange the first check-in.'],
  },
  {
    id: 'report-guide', title: 'Prepare a report', category: 'Guide', topic: 'programs', owner: 'Programs', reviewed: '2026-08-17',
    summary: 'The right template and a completed example.', keywords: ['program report', 'reporting', 'outcomes'],
    preview: ['Confirm the audience, reporting period, and intended decision.', 'Gather evidence of outcomes, not only a list of activities.', 'Use the program report template to organize the draft.', 'Ask the project owner to review the findings and next steps.'],
  },
  {
    id: 'report-template', title: 'Program report template', category: 'Template', topic: 'programs', owner: 'Programs', reviewed: '2026-08-18',
    summary: 'A reusable outline for a concise program update.', keywords: ['program templates', 'outcomes', 'reporting'],
    change: 'Added a completed example.',
    preview: ['Purpose and reporting period', 'Intended outcomes and supporting evidence', 'What changed, what was learned, and any risks', 'Decisions needed and next steps', 'Example: Community Outreach completed its session; the next report will compare participation with the intended audience and identify follow-up support.'],
  },
  {
    id: 'people-guidance', title: 'People & HR essentials', category: 'Reference', topic: 'people', owner: 'People & HR', reviewed: '2026-08-14',
    summary: 'Where to ask about benefits, time off, payroll, and onboarding.', keywords: ['leave', 'timesheets', 'benefits', 'payroll', 'time off'],
    preview: ['Start with the People & HR team for benefits and payroll questions.', 'Confirm the approval process before booking time off.', 'Ask your manager which time-recording process applies to your role.', 'Live HR systems and organization-specific policies are not connected in this demo.'],
  },
  {
    id: 'it-guidance', title: 'IT access and support', category: 'Reference', topic: 'it', owner: 'IT support', reviewed: '2026-08-13',
    summary: 'Prepare the information needed for an access or software request.', keywords: ['laptop', 'software', 'password', 'IT help', 'tools'],
    preview: ['Name the application or device and describe what you need to do.', 'Explain the impact on your work and when access is needed.', 'Include the error message, but never share passwords or access tokens.', 'A live IT service desk is not connected in this demo.'],
  },
];

export const knowledgeTasks = [
  { resourceId: 'expense-guide', title: 'Submit an expense', summary: 'Receipts, reimbursement, and approval steps.', icon: 'expense' },
  { resourceId: 'event-guide', title: 'Plan a program event', summary: 'Planning guidance, templates, and contacts.', icon: 'event' },
  { resourceId: 'volunteer-guide', title: 'Onboard a volunteer', summary: 'Everything to help someone get started.', icon: 'people' },
  { resourceId: 'report-guide', title: 'Prepare a report', summary: 'The right template and a completed example.', icon: 'report' },
] as const;

export function knowledgeHref(resource: Resource): string {
  return resource.href ?? `/knowledge/resource/${encodeURIComponent(resource.id)}`;
}

export function searchKnowledge(resources: KnowledgeResource[], query: string, topic: string): KnowledgeResource[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return resources.filter((resource) => {
    const text = `${resource.title} ${resource.summary} ${resource.category} ${resource.owner} ${resource.keywords.join(' ')}`.toLowerCase();
    return (!topic || resource.topic === topic) && words.every((word) => text.includes(word));
  });
}

export function recentlyUpdated(resources: KnowledgeResource[]): KnowledgeResource[] {
  return resources.filter((resource) => resource.change).sort((a, b) => b.reviewed.localeCompare(a.reviewed)).slice(0, 3);
}

export const expenseSteps = [
  { title: 'Gather the details', text: 'Have your receipts, expense dates, business purpose, and project or program ready.' },
  { title: 'Complete the expense report', text: 'Use the current template. The completed example shows how much detail to include.' },
  { title: 'Submit for review', text: 'Send your report with receipts attached. Your reviewer checks it before it moves to Finance.' },
];
