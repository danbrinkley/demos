import { describe, expect, it } from 'vitest';
import { getMyOpenItems, getMyRequests } from './adapters';
import { filterQueue, queueDate, selectQueue } from './myWork';
import type { WorkItem } from './types';

describe('My Work queue selectors', () => {
  it('sorts overdue, upcoming, then undated records without mutating input', () => {
    const template = getMyOpenItems()[0];
    const items: WorkItem[] = [
      { ...template, id: 'undated', title: 'Undated', dueDate: undefined },
      { ...template, id: 'future', title: 'Future', dueDate: '2026-09-04' },
      { ...template, id: 'overdue', title: 'Overdue', dueDate: '2026-08-30' },
    ];
    const queue = selectQueue(items, [], 'needs-me');
    expect(filterQueue(queue, '', '', 'due').map((entry) => entry.record.id)).toEqual(['overdue', 'future', 'undated']);
    expect(queue.map((entry) => entry.record.id)).toEqual(['undated', 'future', 'overdue']);
    expect(queueDate(queue[0])).toBe('No due date');
    expect(queueDate(queue[2])).toBe('1d overdue');
  });

  it('separates completed work from actionable work and retains record identity', () => {
    const items = getMyOpenItems().map((item, i) => i === 0 ? { ...item, completed: true, requiresAction: false } : item);
    expect(selectQueue(items, [], 'needs-me')).toHaveLength(3);
    const complete = selectQueue(items, [], 'completed');
    expect(complete).toHaveLength(1);
    expect(complete[0].record).toBe(items[0]);
    expect(queueDate(complete[0])).toBe('Completed');
  });

  it('keeps all submitted requests in Waiting, including assigned requests', () => {
    const requests = getMyRequests();
    const waiting = selectQueue([], requests, 'waiting');
    expect(waiting).toHaveLength(requests.length);
    expect(waiting[0].record).toBe(requests[0]);
    expect(filterQueue(waiting, 'Request', 'Fall Food Drive', 'due')).toHaveLength(1);
  });
});
