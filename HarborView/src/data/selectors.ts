import type { Commitment, Resource, SearchResult, StaffMember, WorkItem } from './types';

/**
 * All three homepage views are derived from the same WorkItem[] / Commitment[]
 * arrays — nothing here duplicates an item into a second, independently
 * maintained list. Updating a WorkItem's status updates it everywhere any of
 * these selectors surface it.
 */

export function selectWhatNeedsYou(items: WorkItem[]): WorkItem[] {
  return items.filter((item) => item.tier === 'primary');
}

export function selectNeedsAttention(items: WorkItem[]): WorkItem[] {
  return items.filter((item) => item.tier === 'attention' && item.requiresAction);
}

/** Personal task queue retains just-completed items so actions do not vanish
 * the moment they are taken; their shared WorkItem status changes in place. */
export function selectMyTasks(items: WorkItem[]): WorkItem[] {
  return items.filter((item) => item.tier === 'attention');
}

export function selectThisWeek(commitments: Commitment[]): Commitment[] {
  return [...commitments].sort((a, b) => a.date.localeCompare(b.date));
}

const MAX_SEARCH_RESULTS = 5;

/**
 * Restrained local search across work items, staff, and resources. Case
 * insensitive substring match, capped at five results, each labeled by type
 * so the caller can render "Work item" / "Person" / "Resource" without
 * re-deriving it.
 */
export function searchWorkspace(
  query: string,
  data: { workItems: WorkItem[]; staff: StaffMember[]; resources: Resource[] },
): SearchResult[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const results: SearchResult[] = [];

  for (const item of data.workItems) {
    if (item.title.toLowerCase().includes(trimmed)) {
      results.push({ type: 'work_item', id: item.id, label: item.title, meta: item.statusLabel });
    }
  }
  for (const person of data.staff) {
    if (person.name.toLowerCase().includes(trimmed)) {
      results.push({ type: 'person', id: person.id, label: person.name, meta: person.role });
    }
  }
  for (const resource of data.resources) {
    if (resource.title.toLowerCase().includes(trimmed)) {
      results.push({ type: 'resource', id: resource.id, label: resource.title, meta: resource.category });
    }
  }

  return results.slice(0, MAX_SEARCH_RESULTS);
}
