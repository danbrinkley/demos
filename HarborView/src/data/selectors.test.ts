import { describe, expect, it } from 'vitest';
import { selectMyTasks, selectNeedsAttention, selectThisWeek, selectWhatNeedsYou, searchWorkspace } from './selectors';
import type { Commitment, Resource, StaffMember, WorkItem } from './types';

function makeWorkItem(overrides: Partial<WorkItem>): WorkItem {
  return {
    id: 'item-1',
    tier: 'primary',
    kind: 'expense',
    title: 'Sample item',
    status: 'pending_approval',
    statusLabel: 'Awaiting your approval',
    summary: 'Summary',
    detail: 'Detail',
    primaryActionLabel: 'Review',
    requiresAction: true,
    ...overrides,
  };
}

describe('selectWhatNeedsYou / selectNeedsAttention', () => {
  it('derives each view from tier, not from a separately maintained list', () => {
    const items: WorkItem[] = [
      makeWorkItem({ id: 'a', tier: 'primary' }),
      makeWorkItem({ id: 'b', tier: 'primary' }),
      makeWorkItem({ id: 'c', tier: 'attention' }),
    ];

    expect(selectWhatNeedsYou(items).map((i) => i.id)).toEqual(['a', 'b']);
    expect(selectNeedsAttention(items).map((i) => i.id)).toEqual(['c']);
  });

  it('excludes attention-tier items that no longer require action', () => {
    const items: WorkItem[] = [
      makeWorkItem({ id: 'a', tier: 'attention', requiresAction: true }),
      makeWorkItem({ id: 'b', tier: 'attention', requiresAction: false, completed: true }),
    ];

    expect(selectNeedsAttention(items).map((i) => i.id)).toEqual(['a']);
    expect(selectMyTasks(items).map((i) => i.id)).toEqual(['a', 'b']);
  });

  it('returns an empty array for the sparse and all-complete cases (no separate empty-state data needed)', () => {
    expect(selectWhatNeedsYou([])).toEqual([]);
    const allComplete = [makeWorkItem({ id: 'a', tier: 'primary', completed: true })];
    // Completed primary items still surface — completion is shown on the card, not hidden.
    expect(selectWhatNeedsYou(allComplete)).toHaveLength(1);
  });
});

describe('selectThisWeek', () => {
  it('sorts commitments chronologically regardless of input order', () => {
    const commitments: Commitment[] = [
      { id: 'c1', label: 'Later', date: '2026-09-03', source: 'travel' },
      { id: 'c2', label: 'Earlier', date: '2026-08-31', source: 'project' },
      { id: 'c3', label: 'Middle', date: '2026-09-02', source: 'org' },
    ];

    expect(selectThisWeek(commitments).map((c) => c.id)).toEqual(['c2', 'c3', 'c1']);
  });
});

describe('searchWorkspace', () => {
  const workItems: WorkItem[] = [makeWorkItem({ id: 'expense-1', title: 'Expense pending approval' })];
  const staff: StaffMember[] = [
    { id: 'staff-1', name: 'Priya Anand', role: 'Program Director, Housing Support', email: 'p@example.org' },
  ];
  const resources: Resource[] = [{ id: 'res-1', title: 'Volunteer Sign-Up Form', category: 'Program Forms' }];

  it('returns no results for an empty query', () => {
    expect(searchWorkspace('', { workItems, staff, resources })).toEqual([]);
    expect(searchWorkspace('   ', { workItems, staff, resources })).toEqual([]);
  });

  it('matches case-insensitively across work items, staff, and resources, labeling each by type', () => {
    expect(searchWorkspace('expense', { workItems, staff, resources })).toEqual([
      { type: 'work_item', id: 'expense-1', label: 'Expense pending approval', meta: 'Awaiting your approval' },
    ]);
    expect(searchWorkspace('PRIYA', { workItems, staff, resources })).toEqual([
      { type: 'person', id: 'staff-1', label: 'Priya Anand', meta: 'Program Director, Housing Support' },
    ]);
    expect(searchWorkspace('sign-up', { workItems, staff, resources })).toEqual([
      { type: 'resource', id: 'res-1', label: 'Volunteer Sign-Up Form', meta: 'Program Forms' },
    ]);
  });

  it('caps results at five', () => {
    const manyStaff: StaffMember[] = Array.from({ length: 8 }, (_, i) => ({
      id: `s${i}`,
      name: `Match Person ${i}`,
      role: 'Role',
      email: `s${i}@example.org`,
    }));

    expect(searchWorkspace('match', { workItems: [], staff: manyStaff, resources: [] })).toHaveLength(5);
  });
});
