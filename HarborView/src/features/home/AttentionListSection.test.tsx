import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { WorkItem } from '../../data/types';
import { AttentionListSection } from './AttentionListSection';

const noop = () => {};

function makeItem(overrides: Partial<WorkItem>): WorkItem {
  return {
    id: 'item-1',
    tier: 'attention',
    kind: 'payment',
    title: 'Expense: consultant payment',
    status: 'ready_to_process',
    statusLabel: 'No due date — process when convenient',
    summary: 'Approved and ready to send.',
    detail: 'Detail.',
    primaryActionLabel: 'Process payment',
    requiresAction: true,
    ...overrides,
  };
}

describe('AttentionListSection', () => {
  it('lists every attention-tier item without duplicating their content', () => {
    const items = [makeItem({ id: 'a' }), makeItem({ id: 'b', title: 'Intake form awaiting review' })];
    render(<AttentionListSection items={items} expandedIds={new Set()} onToggle={noop} onComplete={noop} />);

    expect(screen.getByText('Expense: consultant payment')).toBeInTheDocument();
    expect(screen.getByText('Intake form awaiting review')).toBeInTheDocument();
  });

  it('shows a calm empty state instead of an empty list when nothing needs attention', () => {
    render(<AttentionListSection items={[]} expandedIds={new Set()} onToggle={noop} onComplete={noop} />);
    expect(screen.getByText('Nothing else needs a look today.')).toBeInTheDocument();
  });
});
