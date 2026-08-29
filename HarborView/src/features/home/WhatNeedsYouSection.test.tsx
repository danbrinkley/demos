import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { WorkItem } from '../../data/types';
import { WhatNeedsYouSection } from './WhatNeedsYouSection';

function makeItem(overrides: Partial<WorkItem>): WorkItem {
  return {
    id: 'item-1',
    tier: 'primary',
    kind: 'expense',
    title: 'Expense pending approval',
    status: 'pending_approval',
    statusLabel: 'Awaiting your approval',
    summary: 'One manager approval required before submission.',
    detail: 'Detail text.',
    primaryActionLabel: 'Review expense',
    requiresAction: true,
    ...overrides,
  };
}

const noop = () => {};

describe('WhatNeedsYouSection', () => {
  it('renders a card per item in the populated case', () => {
    const items = [makeItem({ id: 'a' }), makeItem({ id: 'b', title: 'Program report due' })];
    render(<WhatNeedsYouSection items={items} expandedIds={new Set()} onToggle={noop} onComplete={noop} />);

    expect(screen.getByRole('heading', { name: 'Your top three' })).toBeInTheDocument();
    expect(screen.getByText('Expense pending approval')).toBeInTheDocument();
    expect(screen.getByText('Program report due')).toBeInTheDocument();
  });

  it('shows a calm, specific empty state when there are no primary items (sparse case)', () => {
    render(<WhatNeedsYouSection items={[]} expandedIds={new Set()} onToggle={noop} onComplete={noop} />);
    expect(screen.getByText('Nothing needs your attention right now.')).toBeInTheDocument();
  });

  it('shows a distinct, calm confirmation once every primary item is complete (all-complete case)', () => {
    const items = [makeItem({ id: 'a', completed: true, requiresAction: false })];
    render(<WhatNeedsYouSection items={items} expandedIds={new Set()} onToggle={noop} onComplete={noop} />);
    expect(screen.getByText("You're caught up.")).toBeInTheDocument();
  });

  it('calls onToggle with the item id when its primary action is activated', async () => {
    const onToggle = vi.fn();
    const items = [makeItem({ id: 'expense-1' })];
    render(<WhatNeedsYouSection items={items} expandedIds={new Set()} onToggle={onToggle} onComplete={noop} />);

    screen.getByRole('button', { name: /Review expense/ }).click();
    expect(onToggle).toHaveBeenCalledWith('expense-1');
  });
});
