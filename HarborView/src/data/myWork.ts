import { daysFromToday, formatShortDate, weekdayLabel } from './demoDate';
import type { WorkItem, WorkspaceRequest } from './types';

export type WorkTab = 'needs-me' | 'waiting' | 'completed';
export type WorkSort = 'due' | 'title';

// Demonstration context only. Status, dates and completion remain on the shared
// records; missing deadlines are never invented to make the mockup look busy.
const areas: Record<string, string> = {
  'expense-mileage-outreach': 'Community Outreach',
  'expense-consultant-payment': 'Finance',
  'intake-form-review': 'Food Pantry intake',
  'volunteer-hours-log': 'Community Outreach',
  'request-communications-support': 'Fall Food Drive',
  'request-laptop-access': 'IT support',
  'request-staffing-support': 'Community Outreach',
};

export const workTypeLabels: Record<WorkItem['kind'], string> = {
  expense: 'Expense approval', payment: 'Payment', intake: 'Review',
  volunteer_hours: 'Volunteer hours', report: 'Report', project: 'Project task',
};

export type QueueEntry =
  | { category: 'work'; record: WorkItem }
  | { category: 'request'; record: WorkspaceRequest };

export function entryArea(entry: QueueEntry): string {
  return areas[entry.record.id] ?? (entry.category === 'work' ? entry.record.sourceSystem : undefined) ?? 'General';
}

export function entryType(entry: QueueEntry): string {
  return entry.category === 'work' ? workTypeLabels[entry.record.kind] : 'Request';
}

export function selectQueue(items: WorkItem[], requests: WorkspaceRequest[], tab: WorkTab): QueueEntry[] {
  if (tab === 'waiting') return requests.map((record) => ({ category: 'request', record }));
  return items.filter((item) => tab === 'completed' ? item.completed : item.requiresAction && !item.completed)
    .map((record) => ({ category: 'work', record }));
}

export function filterQueue(entries: QueueEntry[], type: string, area: string, sort: WorkSort): QueueEntry[] {
  return entries.filter((entry) => (!type || entryType(entry) === type) && (!area || entryArea(entry) === area))
    .sort((a, b) => {
      if (sort === 'title') return a.record.title.localeCompare(b.record.title);
      const dateA = a.category === 'work' ? a.record.dueDate : a.record.submittedDate;
      const dateB = b.category === 'work' ? b.record.dueDate : b.record.submittedDate;
      return (dateA ?? '9999').localeCompare(dateB ?? '9999') || a.record.title.localeCompare(b.record.title);
    });
}

export function queueDate(entry: QueueEntry): string {
  if (entry.category === 'request') return `Sent ${formatShortDate(entry.record.submittedDate)}`;
  if (entry.record.completed) return 'Completed';
  if (!entry.record.dueDate) return 'No due date';
  const days = daysFromToday(entry.record.dueDate);
  if (days === 0) return 'Today';
  if (days < 0) return `${Math.abs(days)}d overdue`;
  return `${weekdayLabel(entry.record.dueDate).slice(0, 3)}, ${formatShortDate(entry.record.dueDate)}`;
}
